# Building with @robr0/design-system

The rules for using this design system in your own project. Hand this file to a
teammate or to an AI assistant and they can build interfaces that match the
system without reading the source.

This is not the contributor guide. `CLAUDE.md` describes how to maintain the
system's own repository, and following it in your project will send you looking
for registries and validators you do not have. This file is the one you want.

Install, dark mode, fonts, and re-theming are covered in the
[README](https://www.npmjs.com/package/@robr0/design-system) and the
[setup guide](https://robertritacca.com/docs/get-started).

## Style every element with semantic tokens

Never write a raw colour, radius, or spacing value into your CSS. Every visual
decision in this system is a token, and the tokens are what make re-theming and
dark mode work.

```css
/* Yes */
.my-panel { background-color: var(--color-bg-container-secondary); }

/* No: bypasses theming, breaks in dark mode */
.my-panel { background-color: #f1f1f1; }
```

Tokens come in three tiers. Use the **semantic** tier (`--color-*`, `--radius-*`,
`--gap-*`, `--padding-*`, `--border-*`, `--font-*`, `--motion-*`, `--icon-size-*`,
`--shadow-*`) in your components. Do not reference `--primitive-*` values
directly: primitives are the raw palette, and the semantic layer is what gives
them meaning. Overriding a primitive is how you re-theme, which only works if
nothing reads primitives directly.

## Teal is the action colour, and nothing else

`--color-action-primary-bg` marks primary calls to action and focus rings. Using
it for decoration, headings, or illustration dilutes the one signal that tells
someone where to click.

## Shape is fixed by element type

Buttons are always fully rounded. Inputs are always `--radius-md`. Card and
EntityCard navigation tiles are the exception at `--radius-xl`. These are not
per-instance choices, so do not override the radius on an individual button to
make it match a mockup.

## There are five status variants

`info`, `positive`, `warning`, `error`, and `neutral`. Badge, Alert, Toast, and
ProgressBar all read the same `--color-status-*` set, so a status means the same
thing everywhere. If you need a sixth, you need a different pattern.

## Depth comes from colour, not shadow

The page floor is white and containers step through a neutral ramp
(`container-primary`, then `secondary`, then `tertiary`). Do not add box shadows
to ordinary containers. The system defines only two: `--shadow-floating` for
popovers, dropdowns, chart tooltips and toasts, and `--shadow-modal` for dialogs.

## Size icons with the scale

Icons are Material Symbols Rounded on a four-step scale (20, 24, 32 and 48px;
24px is the default and 20px the compact size). Set `--icon-size` to a step
rather than setting `font-size` on the icon, which breaks the font's optical
sizing below 20px.

## One typeface, weight carries hierarchy

The system uses a single typeface across everything. Consecutive heading levels
never share a weight: `h2` is light at 30px, `h3` is semibold at 22px. If two
heading levels look alike, change the weight rather than the size.

## Dark mode is a data attribute

Set `data-theme="dark"` on the root element. Every semantic token has a value in
both themes, so components need no dark-mode branch of their own. Do not write
`prefers-color-scheme` queries against system tokens: they will fight the
attribute and leave you with mixed themes.

## Components are provider-free, with one exception

Drop any component into your tree and it works. The single exception is the toast
queue: wrap your app in `ToastProvider` if, and only if, you call `useToast`.

## Props follow one shape

Every component takes the same contract, so what you learn from one carries to
the rest.

- Native attributes pass through. If a component renders an `<input>`, it accepts
  every native input attribute, and your attributes win over the component's own.
- Refs forward to the primary element. For portal components such as Dialog and
  Drawer, that is the panel.
- `variant` selects the visual treatment. `disabled` is a real boolean.
- Native event names keep native signatures: `onChange` is a
  `ChangeEventHandler`. Alongside it, a convenience callback named for the value
  fires too: `onValueChange` for a string or number, `onCheckedChange` for a
  boolean, `onValuesChange` for an array.
- Deprecated props still work and say what replaced them in their JSDoc. Prefer
  the replacement in new code.

## Disabled states look the same everywhere

`opacity: 0.4` and `cursor: not-allowed`. Interactive elements carry ARIA roles
and keyboard navigation already, so do not re-implement them on top.
