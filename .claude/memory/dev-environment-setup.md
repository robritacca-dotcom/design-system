---
name: dev-environment-setup
description: "How this Mac's dev toolchain is installed (nvm, gh, vercel) and where things live"
metadata: 
  node_type: memory
  type: reference
  originSessionId: bdb3e7c6-f534-4a96-838b-06344412181d
---

This Mac (Apple Silicon, zsh) was set up from scratch on 2026-06-03. Toolchain:

- **Node** via **nvm** (`~/.nvm`), default = LTS (v24 at setup). `~/.zshrc` sources nvm. No Homebrew installed.
- **GitHub CLI** `gh` is a standalone binary at `~/.local/bin/gh` (not brew-managed); `~/.local/bin` is on PATH via `~/.zshrc`. Update by re-downloading the release binary.
- **Vercel CLI** installed globally via npm (`npm i -g vercel`).
- Git identity: name `robr0-mac`, email `rob.ritacca@gmail.com`. Default branch `main`, `pull.rebase=false`.
- `gh auth` logged in as `robritacca-dotcom`; git uses gh as HTTPS credential helper (`gh auth setup-git`).

To upgrade Node later: `nvm install --lts && nvm alias default 'lts/*'`. See [[design-system-project]].
