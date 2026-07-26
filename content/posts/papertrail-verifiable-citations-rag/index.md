---
title: "I Built a RAG Pipeline From Scratch So I Could Stop Trusting LLM Citations"
description: What building a PDF Q&A tool taught me about chunking, retrieval, and why a word-overlap check beats trusting the model to cite itself correctly
date: '2026-07-26'
draft: false
slug: '/pensieve/papertrail-verifiable-citations-rag'
tags:
  - AI
  - Open Source
  - Python
  - Software Development
  - Testing
---

## I Built a RAG Pipeline From Scratch So I Could Stop Trusting LLM Citations

I wanted to actually understand retrieval-augmented generation instead of just knowing the acronym. Every tutorial I found wired up LangChain in twenty lines and called it done, which teaches you how to call a library, not how retrieval works. So I built a PDF Q&A tool by hand first, and only wrote the LangChain version afterward, once I already knew what it was hiding from me. I called it PaperTrail.

## The part every demo skips

Ask any "chat with your PDF" tool where an answer came from and it will happily print `[1]` next to a page number. What it will not tell you is whether that citation is real. The model is asked to cite its sources and it does, in the same way it answers everything else: by producing text that looks like a correct citation. Nobody checks if the chunk it points to actually contains the claim.

That is the whole premise of this project. After the model answers with numbered markers, PaperTrail's code checks whether the chunk it cited actually shares content with the sentence it is attached to, at least three words of five or more characters in common. If it does not, the citation gets dropped and the answer is flagged as ungrounded. It is a blunt heuristic, not semantic entailment, but it catches the failure mode that matters most: a model citing `[2]` for a claim that lives nowhere near chunk 2.

```python
def _verified(claim: str, chunk_text: str) -> bool:
    claim_words = {w for w in claim.lower().split() if len(w) >= 5}
    chunk_words = {w for w in chunk_text.lower().split() if len(w) >= 5}
    return len(claim_words & chunk_words) >= 3
```

A page number you have to trust is not the same thing as a page number the code checked.

## Chunking is the boring decision that matters most

Everyone wants to talk about embeddings and vector databases. The setting that actually shapes your results is how you cut the document up. Chunks too small and you lose the surrounding meaning a sentence needs. Too big and retrieval gets fuzzy, and half your context window goes to text the question never needed.

PaperTrail extracts text block by block with pymupdf, keeping each block's page number and bounding box, then merges those blocks into roughly 800-character chunks with 100 characters of overlap. The one rule I did not compromise on: no chunk crosses a page boundary. That constraint costs you a little context continuity at page breaks, but it means every chunk maps to exactly one page and one rectangle you can draw on an image. Without that, the highlighted citation feature in the UI does not exist. The metadata decision made two features later possible, or impossible, depending on which way you go.

## Retrieval is nearest-neighbor search, nothing more

This was the part that felt like a magic trick until I built it and realized it is not one. You embed every chunk once and store the vectors in Chroma, keyed by a hash of the PDF bytes so re-uploading the same file skips re-embedding. At query time you embed the question and pull back the five closest chunks by cosine similarity. That is the entire retrieval step. No hidden reasoning, no clever routing, just distance in vector space.

The obvious gap: pure vector search misses exact strings. Ask about a part number or a specific name and semantic similarity can miss it if the surrounding wording differs enough. The standard fix is hybrid search, combining a keyword method like BM25 with the vector search and merging the results. I skipped it here on purpose, since the citation verification step was the actual point of the project, but it is the first thing I would add if I turned this into something people used daily.

## Two ways to build the same pipeline

Once the hand-rolled version worked, I rebuilt it in LangChain to see what the abstraction costs. The LangChain chain is about 60 lines against roughly 150 for the original, and it is genuinely less code to read. But the retriever interface hands you a page number and calls it done. Getting the bounding box out so you can highlight the exact paragraph would mean reaching past the abstraction into implementation details LangChain does not expose as part of its contract. Citation verification runs into the same wall. LangChain's chain interface is built around "produce an answer," not "prove where the answer came from," so checking a claim against its source chunk means bolting logic onto the outside of the chain rather than using anything the framework gives you.

Neither version is the right answer in isolation. The framework version is what you reach for when you need something working by Friday. The hand-rolled version is what you build when the thing you are shipping depends on controlling what happens between retrieval and the final answer.

## The eval numbers I do not have

I wrote twelve question-answer pairs against the "Attention Is All You Need" paper and set up Ragas to score faithfulness, context precision, and context recall, judged by a Groq model. First run: half the judge calls timed out under Groq's rate limits, so I throttled concurrency down to two workers. Second run, 45 minutes later: every score came back NaN.

The real cause turned up in the error log:

```
openai.RateLimitError: Error code: 429 - tokens per day (TPD): Limit 100000, Used 99503, Requested 905
```

Groq's free tier caps requests per minute, which I expected, and also caps total tokens per model per day, which I did not check for until it hit me. Running the eval a few times while debugging burned through the daily allowance for `llama-3.3-70b-versatile` before I got a clean run. I split the Ragas judge onto a smaller model on a separate quota so judging would not compete with generation for the same bucket, but by the time I made that change the day's quota was already gone for both.

I could have left placeholder numbers in the README and nobody would have checked. I left it saying "pending" instead, with the actual error message included, because a made-up 0.94 faithfulness score is worse than admitting the free tier ran out mid-project. If you are building on Groq's free tier, budget one full eval run per day per model. Not three while you iterate.

## The deploy plan that fell apart twice

I built the UI in Streamlit first because that is what Hugging Face Spaces runs natively. Then I actually opened the Spaces creation page and found two free options: a static site with no Python backend, or Docker, gated behind a Pro subscription. Gradio Spaces on free CPU hardware need Pro too. None of that is documented anywhere obvious. I found it by hitting a `402 Payment Required` from the API after trying to create the Space directly.

So the UI got rewritten in Gradio, since it is lighter to run outside of Spaces, and the app moved to Render's free tier instead, with a `render.yaml` blueprint and the Groq key set as a dashboard secret rather than committed anywhere. Free-tier Render spins down after fifteen minutes of no traffic, so the first request after a quiet stretch takes thirty to sixty seconds to wake back up. That is a cold start, not a bug, but it will look like one the first time you hit it.

## What I would build next

Hybrid search is the obvious first addition. A reranking step between retrieval and generation is the second. Right now PaperTrail only handles one document at a time, and the citation check is a word-overlap heuristic rather than anything that reasons about meaning, so it catches outright fabrication but not a subtler kind of misattribution where the cited chunk is topically close but wrong. All of that is fixable. None of it was necessary to answer the question I actually started with, which was whether a RAG pipeline could be made to show its work instead of asking to be believed.

## Try it

The code, the LangChain comparison, and the eval setup are all in the repo.

GitHub: [github.com/dgr8akki/papertrail](https://github.com/dgr8akki/papertrail)
Live demo: [papertrail-ljg4.onrender.com](https://papertrail-ljg4.onrender.com/)
