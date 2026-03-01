---
title: "I Built a ZSH Plugin That Screams FAAAH When Your Command Fails"
description: How a silly weekend project turned into a cross-platform shell plugin with Homebrew support and what I learned along the way
date: '2026-03-01'
draft: false
slug: '/pensieve/faahzsh-terminal-error-sound'
tags:
  - Open Source
  - ZSH
  - Bash
  - Developer Tools
  - Terminal
---

## I Built a ZSH Plugin That Screams FAAAH When Your Command Fails

It started with a joke. I was pair programming late one evening and a build failed for the third time in a row. I leaned back and let out a long dramatic faaah. My friend laughed and said someone should make the terminal do that automatically. I could not stop thinking about it. By the next morning faahzsh was born.

The idea is dead simple. Every time a command exits with a non-zero status code your terminal plays a faaah sound. That is it. No dashboards no analytics no AI. Just a sound that tells you something broke. And honestly it is one of the most useful things I have built in a while.

Let me tell you why. As developers we run hundreds of commands a day. We type and switch tabs and type again. Sometimes a command fails silently and we do not notice until five steps later. By then we are confused and frustrated. A sound changes that. Your ears catch what your eyes miss. It sounds silly but it works. Feedback loops matter and the fastest feedback loop is one that does not need you to read anything at all.

## How It Works

The plugin hooks into your shell's prompt cycle. In zsh it uses the `precmd` hook. In bash it uses `PROMPT_COMMAND`. Both run just before your next prompt appears. At that moment the plugin checks the exit code of the last command. If it is not zero it plays the sound in the background so your shell is never blocked.

```zsh
# The core logic is surprisingly simple
_faahzsh_precmd() {
  local last_exit=$?
  [[ "$FAAHZSH_ENABLED" != true ]] && return
  [[ $last_exit -eq 0 ]] && return
  _faahzsh_play
}
```

The sound plays asynchronously. You can keep typing. No lag no interruption. Just a gentle reminder that something went wrong.

## Cross-Platform Because Why Not

I wanted this to work everywhere. On macOS it uses `afplay` which ships with the system. On Linux it looks for `paplay` or `aplay` or `ffplay` in that order. On Windows through WSL or MSYS2 it calls `powershell.exe` to play the sound. The plugin detects your platform on load and picks the right player automatically.

Volume is configurable from 0 to 10. You can go from silent to very loud depending on how much you want to punish yourself for typos.

```sh
faahzsh volume 8    # Turn it up
faahzsh volume 2    # Keep it subtle
faahzsh off         # Had enough for today
faahzsh on          # Back to accountability
```

## Installing It

I made sure installation is easy no matter how you manage your shell. If you use antigen it is one line.

```zsh
antigen bundle dgr8akki/faahzsh
```

If you prefer Homebrew I set up a tap for that too.

```sh
brew tap dgr8akki/faahzsh
brew install faahzsh
```

Bash users can clone the repo and source the bash version. Oh-My-Zsh and Zinit are supported as well. I wanted zero friction. If someone thinks this is funny enough to try they should not have to fight their package manager to get it running.

## What I Learned Building This

Building faahzsh taught me a few things I did not expect.

First shell plugins are deceptively tricky. Zsh and bash handle hooks differently. Path resolution is different. Even the way you print floating point numbers differs between shells. I had to use `awk` in the bash version because bash does not do float arithmetic natively. Small details like these eat time if you are not careful.

Second shipping a Homebrew formula was easier than I thought. You create a separate tap repository with a Ruby formula file. Homebrew downloads your source archive and installs the files. The caveats block prints setup instructions after install. It is a clean system once you understand the structure.

Third I learned that fun projects get attention. Serious tools are important but people share things that make them smile. A terminal that screams at you is inherently shareable. Never underestimate the power of a good laugh in developer tools.

## Why Silly Projects Matter

There is a culture in tech that says every side project must be serious. It must solve a real problem. It must have a business case. I disagree. Some of the best tools started as jokes. Some of the best learning happens when stakes are low and curiosity is high.

faahzsh will not change the world. But building it made me better at shell scripting cross-platform compatibility and open source packaging. It also reminded me that coding can just be fun. We forget that sometimes.

If you are a developer feeling stuck or burnt out try building something useless. Something that makes you laugh. You will learn more than you expect and you might make someone else's day a little better too.

## Try It Out

The project is open source on GitHub. Star it fork it or just install it and see how many faaahs you hear in a day. You might be surprised.

GitHub: [github.com/dgr8akki/faahzsh](https://github.com/dgr8akki/faahzsh)

```sh
# Quick start
brew tap dgr8akki/faahzsh && brew install faahzsh

# Or with antigen
antigen bundle dgr8akki/faahzsh

# Test it
faahzsh test
```

If you build something fun because of this I would love to hear about it. The best developer tools are the ones that make hard days a little easier. Even if they do it by screaming faaah at you.
