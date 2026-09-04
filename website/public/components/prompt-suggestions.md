# Prompt suggestions

A horizontal row of tappable prompt suggestions to start or steer a conversation.

Generated from the @robr0/design-system registry and prop JSDoc, version 0.15.0. The same data ships in the package's .d.ts and is served by the MCP endpoint at https://robertritacca.com/api/mcp.

- Category: ai
- Import: `import { PromptSuggestions } from '@robr0/design-system';`
- Deep import: `import { PromptSuggestions } from '@robr0/design-system/components/PromptSuggestions/PromptSuggestions';`
- Rendering: server-renderable (no 'use client')
- Live docs: https://robertritacca.com/components/prompt-suggestions

## PromptSuggestions props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| suggestions | `PromptSuggestion[]` | yes |  | The suggestions to render, in order. |
| onValueChange | `((id: string) => void)` | no |  | Fires with the tapped suggestion's `id`. |
| layout | `"wrap" \| "scroll" \| "stack"` | no |  | How the suggestions are arranged. `scroll` is one line that scrolls sideways behind edge fades. `wrap` runs them across as many lines as they need, for empty-state hero placements. `stack` gives each one its own line, for narrow columns where a wrapped row breaks unevenly and the ragged right edge reads as an accident. |
| wrap | `boolean` | no | `false` | Legacy alias for `layout="wrap"`; ignored when `layout` is set. Deprecated: Use `layout` instead, which also covers `stack`. |
| size | `"default" \| "compact"` | no | `default` | Row scale. `default` sits at the body-paragraph scale, so a suggestion reads at the same weight as the messages it will become; `compact` is the quieter row for placements alongside a live conversation. |
| ariaLabel | `string` | no | `Suggested prompts` | Accessible name for the list. |
| className | `string` | no | `` | Additional CSS classes |
