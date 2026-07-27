---
title: "I Built an Email Triage Agent to Understand What 'Agent' Actually Means"
description: What building a Gmail triage bot from scratch taught me about tool calling as a form-fill, idempotent state without a database, and why an LLM's confidence score isn't a real probability
date: '2026-07-28'
draft: false
slug: '/pensieve/inbox-clerk-llm-email-triage'
tags:
  - AI
  - Agentic AI
  - Automation
  - Python
  - Open Source
---

## I Built an Email Triage Agent to Understand What "Agent" Actually Means

I kept using the word "agent" without being able to explain what separates it from a chatbot with extra steps. So I built the smallest one I could think of: a script that reads my unread Gmail, decides what each message needs, and labels it accordingly. I called it Inbox Clerk, because that's exactly what it does. It sorts the mail. It doesn't sign anything.

## The brain never touches the inbox

The part that actually clarified things for me: the LLM can only produce text. It has no hands. So instead of letting it write a paragraph and hoping I could parse intent out of it, I forced it to fill out a form.

```python
def classify(email):
    user_prompt = f"From: {email['from']}\nSubject: {email['subject']}\nSnippet: {email['snippet']}"
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"},
        temperature=0,
    )
    return json.loads(completion.choices[0].message.content)
```

That's the entire interface between the model and the world: a JSON object with a category and a confidence number. My own plain, boring, non-AI code reads that object and decides what to do with it. The model never calls the Gmail API directly, and it never will, not even once I trust it more. Every agent that does something real, not just says something plausible, is built on this same trick: keep the unpredictable part behind a strict output shape, and let deterministic code hold the lever.

## No database, because Gmail already has one

The obvious next question once you have a loop that runs repeatedly is state. If the agent runs again tomorrow, how does it know it already sorted today's mail? The lazy answer turned out to be the correct one: don't build a database, use the one that's already sitting there.

```python
def already_triaged(message_label_ids, label_ids):
    return bool(set(message_label_ids) & set(label_ids.values()))
```

Every message the agent has ever acted on carries one of its own labels. Checking for that intersection before doing any work makes the whole thing idempotent for free. Run it on a cron job every fifteen minutes and it costs nothing extra to re-scan messages it already handled, because it skips them in one set operation before ever calling the classifier.

## Confidence is not a probability, and I stopped pretending otherwise

I originally wanted to gate actions on the model's self-reported confidence: skip anything under some threshold, act automatically above it. Then I actually thought about what that number represents. It's the model estimating how sure it sounds, not a calibrated frequency of being right, and LLMs are reliably overconfident about exactly the answers they get wrong. Building a threshold around a number I didn't trust yet would have been designing in the dark.

So for now the agent logs confidence next to every decision and acts on the category regardless. Once there's a real week of data sitting in that log, I'll know what a trustworthy number actually looks like for my own inbox, and the threshold can get built on top of something observed instead of guessed.

## The hosting gotcha nobody puts in the Gmail API docs

If you ever want to run something like this unattended, on GitHub Actions instead of your own laptop, there's a trap waiting for you. While your OAuth consent screen sits in "Testing" mode, Google expires your refresh token after seven days. Your cron job will run fine for a week and then silently start failing with an auth error that looks like nothing you did wrong. The fix is flipping the consent screen to "In Production," which removes the cap, at the cost of a one-time "Google hasn't verified this app" warning you click through for your own account. Nobody warns you about the seven-day clock until you hit it.

## What's still missing on purpose

It only labels and archives right now. No drafting replies, no sending, no deleting. That's not a limitation I'm rushing to fix. I'd rather trust its sorting against a week of real logs first, the same way you'd let a new hire handle the filing cabinet before you hand them your outbox.

## Try it

Gmail API for the read/label access, Groq's free tier for the model, no server. The whole thing runs on a laptop for zero dollars.

GitHub: [github.com/dgr8akki/inbox-clerk](https://github.com/dgr8akki/inbox-clerk)
