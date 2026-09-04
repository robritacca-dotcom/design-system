# AI button

The AI entry point: icon and label on a transparent field, ringed by a slowly turning gradient and a soft glow.

Generated from the @robr0/design-system registry and prop JSDoc, version 0.14.0. The same data ships in the package's .d.ts and is served by the MCP endpoint at https://robertritacca.com/api/mcp.

- Category: ai
- Import: `import { AiButton } from '@robr0/design-system';`
- Deep import: `import { AiButton } from '@robr0/design-system/components/AiButton/AiButton';`
- Rendering: client component (declares 'use client')
- Live docs: https://robertritacca.com/components/ai-button

## AiButton props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| label | `string` | no | `Ask AI` | Button text content |
| icon | `ReactNode` | no | `auto_awesome` | Leading icon — Material Symbol name (string) or custom element (ReactNode) |
| size | `"default" \| "compact"` | no | `default` | Button size |
| disabled | `boolean` | no |  | Whether the button is disabled |
| href | `string` | no |  | Optional href — renders as <a> instead of <button> |
| target | `string` | no |  | Optional target attribute for links |
| rel | `string` | no |  | Optional rel attribute for links |
| className | `string` | no | `` | Additional CSS classes |
