# Event calendar

A month grid with event pills, overflow counts, and month navigation.

Generated from the @robr0/design-system registry and prop JSDoc, version 0.14.0. The same data ships in the package's .d.ts and is served by the MCP endpoint at https://robertritacca.com/api/mcp.

- Category: data-display
- Import: `import { EventCalendar } from '@robr0/design-system';`
- Deep import: `import { EventCalendar } from '@robr0/design-system/components/EventCalendar/EventCalendar';`
- Rendering: client component (declares 'use client')
- Live docs: https://robertritacca.com/components/event-calendar

## EventCalendar props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| events | `EventCalendarEvent[]` | no | `[]` | The events to place on the grid, including any that fall on the visible leading and trailing days of the neighbouring months. |
| month | `string` | no |  | Shown month (YYYY-MM) for controlled use. Pair with `onMonthChange`. |
| defaultMonth | `string` | no |  | Initially shown month (YYYY-MM) for uncontrolled use. Defaults to the current month. |
| onMonthChange | `((month: string) => void)` | no |  | Fires with the newly shown month (YYYY-MM) after prev/next navigation. |
| maxEventsPerDay | `number` | no | `3` | Event pills shown per day before the rest collapse into "+N more". |
| onEventClick | `((event: EventCalendarEvent) => void)` | no |  | Fires with the clicked event. Pills only render as buttons when this is set. |
| onDateClick | `((date: string) => void)` | no |  | Fires with the clicked day (YYYY-MM-DD) — from the day number, and from the "+N more" overflow row. Both only become buttons when this is set. |
| actions | `ReactNode` | no |  | Trailing header slot, e.g. a "New event" Button. |
| className | `string` | no | `` | Additional CSS classes |
