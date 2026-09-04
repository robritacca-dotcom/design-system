# Composer

An auto-growing message input with send and stop states, an attachment slot, and Enter-to-send.

Generated from the @robr0/design-system registry and prop JSDoc, version 0.15.0. The same data ships in the package's .d.ts and is served by the MCP endpoint at https://robertritacca.com/api/mcp.

- Category: ai
- Import: `import { Composer } from '@robr0/design-system';`
- Deep import: `import { Composer } from '@robr0/design-system/components/Composer/Composer';`
- Rendering: client component (declares 'use client')
- Live docs: https://robertritacca.com/components/composer

## Composer props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| value | `string` | no |  | Current value for controlled use. Pair with `onValueChange`. |
| defaultValue | `string` | no |  | Initial value for uncontrolled use. |
| onValueChange | `((value: string) => void)` | no |  | Convenience callback receiving the value directly. Fires alongside `onChange`, which keeps the standard React event signature so form libraries work unmodified. |
| onSubmit | `((value: string) => void)` | no |  | Fires with the current value on Enter (without Shift) and on the send button — never while `streaming`, and never when the trimmed value is empty. Composer does not clear the value: the consumer owns it and clears it after a successful submit. Shadows the native `onSubmit` attribute, which never fires on a textarea anyway. |
| streaming | `boolean` | no | `false` | A response is streaming: the send button becomes a stop button, submit is blocked, and Enter is inert. On a glowing composer (`aiGlow`) the gradient ring also stays lit and keeps turning while this is true. |
| onStop | `(() => void)` | no |  | Fires when the stop button is pressed while `streaming`. |
| maxRows | `number` | no | `8` | Growth cap in text rows before the textarea scrolls internally. |
| aiGlow | `boolean` | no | `false` | While focused, the shell wears AiButton's slowly rotating gradient ring and glow in place of the plain selected border — the system's "a model answers here" signal, for composers whose messages are answered by one. While `streaming`, the ring stays lit and turning whether or not the field holds focus. Off by default. |
| attachments | `ReactNode` | no |  | Attachment row rendered above the textarea (DocumentChips). Fully controlled by the caller — Composer never owns the list. |
| actions | `ReactNode` | no |  | Leading actions on the left of the action bar (attach button, model picker). |
| trailingActions | `ReactNode` | no |  | Trailing actions on the right of the action bar, just before the send button (dictation, voice mode). |
| sendLabel | `string` | no | `Send message` | Accessible label for the send button. |
| stopLabel | `string` | no | `Stop generating` | Accessible label for the stop button. |
| className | `string` | no | `` | Additional CSS classes — applied to the shell, not the <textarea>. |
