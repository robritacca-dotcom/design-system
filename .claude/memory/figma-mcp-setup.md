---
name: figma-mcp-setup
description: Figma Dev Mode MCP server connection for building the design-system site
metadata: 
  node_type: memory
  type: reference
  originSessionId: bdb3e7c6-f534-4a96-838b-06344412181d
---

Rob builds his [[design-system-project]] site from a Figma file via the **Figma Dev Mode MCP server**, which Figma's desktop app exposes locally at `http://127.0.0.1:3845/mcp` (streamable HTTP). Requires Figma desktop running with the local MCP server enabled (Preferences → "Enable Dev Mode MCP server").

Configured in `~/Documents/Projects/.mcp.json` as server name `figma`, `"type": "http"`. Verified handshake returns "Figma Dev Mode MCP Server" v1.0.0. Tools: `get_design_context`, `get_variable_defs`, `get_screenshot`, `get_metadata`, `get_figjam`.

Usage: select a frame/component in Figma desktop, then ask Claude to implement it. **Project-scoped MCP servers load at session start and need trust-approval** — after editing `.mcp.json`, restart the Claude Code session and approve the `figma` server (check with `/mcp`). On the second computer, replicate `.mcp.json` and run Figma desktop there too.
