# Thread panel

The session-history rail for chat products: brand header, new-thread action, standing controls, grouped threads, and a profile footer.

Generated from the @robr0/design-system registry and prop JSDoc, version 0.17.0. The same data ships in the package's .d.ts and is served by the MCP endpoint at https://robertritacca.com/api/mcp.

- Category: ai
- Import: `import { ThreadPanel } from '@robr0/design-system';`
- Deep import: `import { ThreadPanel } from '@robr0/design-system/components/ThreadPanel/ThreadPanel';`
- Rendering: server-renderable (no 'use client')
- Live docs: https://robertritacca.com/components/thread-panel

## ThreadPanel props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| groups | `ThreadPanelGroup[]` | yes |  | The history, in display order. A flat list is one group with no label. |
| activeThreadId | `string` | no |  | Id of the thread on stage. Its row renders filled and carries `aria-current`. |
| onThreadSelect | `((id: string) => void)` | no |  | Fires with the clicked thread's id. Rows with an `href` navigate as well. |
| logo | `ReactNode` | no |  | Brand mark slot at the top, e.g. a logo `<img>`. While collapsed it doubles as the expand button, AppSidebar's contract. |
| logoText | `string` | no |  | Brand name beside the logo. The header row renders only when `logo`, `logoText`, or `onExpandedChange` is given. |
| newThreadLabel | `string` | no |  | Text for the new-thread row. The row renders when this, `onNewThread`, or `newThreadHref` is given. |
| newThreadIcon | `string` | no | `edit_square` | Material Symbol for the new-thread row. Defaults to the pen-in-a-box `edit_square`, the same glyph chat headers use for New chat. |
| newThreadShortcut | `string[]` | no |  | Keyboard hint rendered as compact Kbds at the row's trailing edge, e.g. `["Ctrl", "N"]`. Decorative — the host owns the actual binding. |
| onNewThread | `(() => void)` | no |  | Fires when the new-thread row is clicked. |
| newThreadHref | `string` | no |  | Optional href — the new-thread row renders as an `<a>`. |
| controls | `ThreadPanelControl[]` | no |  | Standing rows between the new-thread action and the history, e.g. Projects or Settings. |
| onControlSelect | `((id: string) => void)` | no |  | Fires with the clicked control's id. Rows with an `href` navigate as well. |
| moreLabel | `string` | no |  | Text for the quiet trailing row that reveals older threads, e.g. "Show 20 more". Renders only when given. |
| onShowMore | `(() => void)` | no |  | Fires when the more row is clicked. |
| historyLabel | `string` | no | `Thread history` | Accessible name for the scrollable history region. |
| expanded | `boolean` | no | `true` | Whether the panel is expanded (280px, labels and history showing). Collapsed it is AppSidebar's 64px icon rail: circular icon rows, the history faded out, the avatar alone in the footer. |
| onExpandedChange | `((expanded: boolean) => void)` | no |  | Fires with the next state when the toggle (or, collapsed, the logo) is pressed. The toggle renders only when this is given; the panel is controlled, so the host owns the state. |
| collapseLabel | `string` | no | `Collapse the panel` | Accessible name for the header toggle while expanded. |
| expandLabel | `string` | no | `Expand the panel` | Accessible name for the expand affordance while collapsed. |
| profile | `ThreadPanelProfile` | no |  | The signed-in person, rendered as the footer's Avatar row. |
| footerSlot | `ReactNode` | no |  | Rendered in the footer above the profile row — a theme toggle, a storage meter. Fades out while collapsed, AppSidebar's contract. |
| className | `string` | no | `` | Additional CSS classes |
