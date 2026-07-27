---
date: '2026-07-28'
title: 'Inbox Clerk'
github: 'https://github.com/dgr8akki/inbox-clerk'
tech:
  - Python
  - Gmail API
  - Groq
  - LLM Agents
order: 1
showInProjects: true
---

An agent that reads unread Gmail, classifies each message with an LLM, and labels it accordingly, archiving the obvious noise. It never sends, deletes, or drafts anything on its own, and Gmail's own labels double as the only state it keeps, so re-running it against an already-triaged inbox is a no-op instead of a re-classify.
