import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Kbd } from '../Kbd/Kbd';
import './ThreadPanel.css';
import '../../fonts/material-symbols.css';

export interface ThreadPanelThread {
  /** Stable identifier: `activeThreadId` matches against it and `onThreadSelect` reports it. */
  id: string;
  /** The thread's one-line title. Overflow truncates with an ellipsis; the full text stays readable in the row's native tooltip. */
  title: string;
  /** Optional href — the row renders as an `<a>` for real navigation instead of a `<button>`. */
  href?: string;
  /** Small trailing annotation in the caption face, e.g. a relative timestamp. */
  meta?: string;
}

export interface ThreadPanelGroup {
  /** Group heading in the overline face, e.g. a project or repo name. Omit for an unlabelled run of threads. */
  label?: string;
  /** The group's threads, in display order. */
  threads: ThreadPanelThread[];
}

export interface ThreadPanelControl {
  /** Stable identifier reported through `onControlSelect`. */
  id: string;
  /** Material Symbol name for the row's leading icon. */
  icon: string;
  /** Row text. */
  label: string;
  /** Optional href — the row renders as an `<a>` instead of a `<button>`. */
  href?: string;
}

export interface ThreadPanelProfile {
  /** The signed-in person's display name; also seeds the Avatar's initials. */
  name: string;
  /** Quiet caption beside the name, e.g. the plan or workspace. */
  meta?: string;
  /** Replace the initials Avatar with a custom element, e.g. an `<Avatar src>`. */
  avatar?: React.ReactNode;
}

/** Props owned by ThreadPanel itself — everything else falls through to the root `<div>`. */
type ThreadPanelOwnProps = {
  /** The history, in display order. A flat list is one group with no label. */
  groups: ThreadPanelGroup[];
  /** Id of the thread on stage. Its row renders filled and carries `aria-current`. */
  activeThreadId?: string;
  /** Fires with the clicked thread's id. Rows with an `href` navigate as well. */
  onThreadSelect?: (id: string) => void;
  /** Brand mark slot at the top, e.g. a logo `<img>`. While collapsed it doubles as the expand button, AppSidebar's contract. */
  logo?: React.ReactNode;
  /** Brand name beside the logo. The header row renders only when `logo`, `logoText`, or `onExpandedChange` is given. */
  logoText?: string;
  /** Text for the new-thread row. The row renders when this, `onNewThread`, or `newThreadHref` is given. */
  newThreadLabel?: string;
  /** Material Symbol for the new-thread row. Defaults to the pen-in-a-box `edit_square`, the same glyph chat headers use for New chat. */
  newThreadIcon?: string;
  /** Keyboard hint rendered as compact Kbds at the row's trailing edge, e.g. `["Ctrl", "N"]`. Decorative — the host owns the actual binding. */
  newThreadShortcut?: string[];
  /** Fires when the new-thread row is clicked. */
  onNewThread?: () => void;
  /** Optional href — the new-thread row renders as an `<a>`. */
  newThreadHref?: string;
  /** Standing rows between the new-thread action and the history, e.g. Projects or Settings. */
  controls?: ThreadPanelControl[];
  /** Fires with the clicked control's id. Rows with an `href` navigate as well. */
  onControlSelect?: (id: string) => void;
  /** Text for the quiet trailing row that reveals older threads, e.g. "Show 20 more". Renders only when given. */
  moreLabel?: string;
  /** Fires when the more row is clicked. */
  onShowMore?: () => void;
  /** Accessible name for the scrollable history region. */
  historyLabel?: string;
  /** Whether the panel is expanded (280px, labels and history showing). Collapsed it is AppSidebar's 64px icon rail: circular icon rows, the history faded out, the avatar alone in the footer. */
  expanded?: boolean;
  /** Fires with the next state when the toggle (or, collapsed, the logo) is pressed. The toggle renders only when this is given; the panel is controlled, so the host owns the state. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Accessible name for the header toggle while expanded. */
  collapseLabel?: string;
  /** Accessible name for the expand affordance while collapsed. */
  expandLabel?: string;
  /** The signed-in person, rendered as the footer's Avatar row. */
  profile?: ThreadPanelProfile;
  /** Rendered in the footer above the profile row — a theme toggle, a storage meter. Fades out while collapsed, AppSidebar's contract. */
  footerSlot?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
};

export interface ThreadPanelProps
  extends ThreadPanelOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof ThreadPanelOwnProps> {}

const baseClass = 'ds-thread-panel';

/** A row that is a `<button>`, or an `<a>` when an href is supplied (Button's pattern). */
function ActionRow({
  className,
  href,
  onClick,
  ariaCurrent,
  title,
  children,
}: {
  className: string;
  href?: string;
  onClick?: () => void;
  ariaCurrent?: 'page' | 'true';
  title?: string;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <a
        className={className}
        href={href}
        onClick={onClick}
        aria-current={ariaCurrent === 'true' ? 'page' : ariaCurrent}
        title={title}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-current={ariaCurrent}
      title={title}
    >
      {children}
    </button>
  );
}

/**
 * ThreadPanel is the session-history rail of a chat or agent product: brand
 * header, a new-thread action with an optional shortcut hint, standing
 * control rows, the grouped thread history (the one region that scrolls),
 * and a footer for the profile row and host furniture like a theme toggle.
 *
 * Fully controlled and stateless: the host owns the active thread, the
 * navigation, the expanded state, and what selecting a row means. Every
 * section is optional, so the panel scales from a bare thread list to the
 * full anatomy. Expand and collapse follow AppSidebar's choreography: the
 * panel owns its width (280px expanded, a 64px icon rail collapsed), the
 * sweeping clip and the labels' opacity fades carry the transition, rows
 * collapse to circular icon buttons, and while collapsed the logo doubles
 * as the expand button. Carries no `'use client'` directive — rendered
 * without callbacks (href navigation only) it works from a React Server
 * Component.
 *
 * Forwards a ref to the root `<div>` and spreads unrecognised props onto it.
 */
export const ThreadPanel = React.forwardRef<HTMLDivElement, ThreadPanelProps>(
  (
    {
      groups,
      activeThreadId,
      onThreadSelect,
      logo,
      logoText,
      newThreadLabel,
      newThreadIcon = 'edit_square',
      newThreadShortcut,
      onNewThread,
      newThreadHref,
      controls,
      onControlSelect,
      moreLabel,
      onShowMore,
      historyLabel = 'Thread history',
      expanded = true,
      onExpandedChange,
      collapseLabel = 'Collapse the panel',
      expandLabel = 'Expand the panel',
      profile,
      footerSlot,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const classes = [
      baseClass,
      expanded && `${baseClass}--expanded`,
      className,
    ]
      .filter(Boolean)
      .join(' ');
    const iconClass = 'material-symbols-rounded';

    const showHeader = Boolean(logo || logoText || onExpandedChange);
    const showNew = Boolean(newThreadLabel || onNewThread || newThreadHref);
    const showFooter = Boolean(footerSlot || profile);

    /* Collapsed, the logo is the expand affordance (AppSidebar's pattern);
       the toggle carries it only while expanded, or always when there is
       no logo to hand the job to. */
    const logoExpands = Boolean(logo && !expanded && onExpandedChange);
    const toggle = onExpandedChange && (
      <button
        type="button"
        className={[
          `${baseClass}__toggle`,
          !logo && `${baseClass}__toggle--standalone`,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={expanded ? collapseLabel : expandLabel}
        aria-expanded={expanded}
        onClick={() => onExpandedChange(!expanded)}
      >
        <span className={iconClass} aria-hidden="true">
          {expanded ? 'left_panel_close' : 'left_panel_open'}
        </span>
      </button>
    );

    /* Collapsed, the whole rail is an expand target: a click on its dead
       space opens it, while clicks on the rows keep their own jobs. Only
       attached when it can fire, so a callback-less render stays valid in
       a Server Component. */
    const expandOnClick =
      !expanded && onExpandedChange
        ? (e: React.MouseEvent<HTMLDivElement>) => {
            rest.onClick?.(e);
            const target = e.target as HTMLElement;
            if (target.closest("button, a, [role='button']")) return;
            onExpandedChange(true);
          }
        : undefined;

    return (
      <div
        {...rest}
        ref={ref}
        className={classes}
        onClick={expandOnClick ?? rest.onClick}
      >
        {showHeader && (
          <div
            className={[
              `${baseClass}__header`,
              !logo && `${baseClass}__header--bare`,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div
              className={`${baseClass}__header-inner`}
              onClick={logoExpands ? () => onExpandedChange?.(true) : undefined}
              role={logoExpands ? 'button' : undefined}
              tabIndex={logoExpands ? 0 : undefined}
              aria-label={logoExpands ? expandLabel : undefined}
              onKeyDown={
                logoExpands
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onExpandedChange?.(true);
                      }
                    }
                  : undefined
              }
            >
              {logo && (
                <span className={`${baseClass}__logo`} aria-hidden="true">
                  {logo}
                </span>
              )}
              {logoText && (
                <span className={`${baseClass}__brand`}>{logoText}</span>
              )}
            </div>
            {toggle}
          </div>
        )}

        {showNew && (
          <ActionRow
            className={`${baseClass}__new`}
            href={newThreadHref}
            onClick={onNewThread}
          >
            <span
              className={`${baseClass}__new-icon ${iconClass}`}
              aria-hidden="true"
            >
              {newThreadIcon}
            </span>
            <span className={`${baseClass}__new-label`}>
              {newThreadLabel ?? 'New thread'}
            </span>
            {newThreadShortcut && newThreadShortcut.length > 0 && (
              <span className={`${baseClass}__new-kbd`} aria-hidden="true">
                {newThreadShortcut.map((key) => (
                  <Kbd key={key} size="compact">
                    {key}
                  </Kbd>
                ))}
              </span>
            )}
          </ActionRow>
        )}

        {controls && controls.length > 0 && (
          <div className={`${baseClass}__controls`}>
            {controls.map((control) => (
              <ActionRow
                key={control.id}
                className={`${baseClass}__control`}
                href={control.href}
                onClick={
                  onControlSelect
                    ? () => onControlSelect(control.id)
                    : undefined
                }
              >
                <span
                  className={`${baseClass}__control-icon ${iconClass}`}
                  aria-hidden="true"
                >
                  {control.icon}
                </span>
                <span className={`${baseClass}__control-label`}>
                  {control.label}
                </span>
              </ActionRow>
            ))}
          </div>
        )}

        <nav className={`${baseClass}__history`} aria-label={historyLabel}>
          {groups.map(
            (group, index) =>
              group.threads.length > 0 && (
                <div
                  key={group.label ?? index}
                  className={`${baseClass}__group`}
                >
                  {group.label && (
                    <span className={`${baseClass}__group-label`}>
                      {group.label}
                    </span>
                  )}
                  <ul
                    className={`${baseClass}__list`}
                    aria-label={group.label}
                  >
                    {group.threads.map((thread) => {
                      const active = thread.id === activeThreadId;
                      return (
                        <li key={thread.id}>
                          <ActionRow
                            className={[
                              `${baseClass}__thread`,
                              active && `${baseClass}__thread--active`,
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            href={thread.href}
                            onClick={
                              onThreadSelect
                                ? () => onThreadSelect(thread.id)
                                : undefined
                            }
                            ariaCurrent={
                              active
                                ? thread.href
                                  ? 'page'
                                  : 'true'
                                : undefined
                            }
                            title={thread.title}
                          >
                            <span className={`${baseClass}__title`}>
                              {thread.title}
                            </span>
                            {thread.meta && (
                              <span className={`${baseClass}__meta`}>
                                {thread.meta}
                              </span>
                            )}
                          </ActionRow>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ),
          )}
          {moreLabel && (
            <button
              type="button"
              className={`${baseClass}__more`}
              onClick={onShowMore}
            >
              {moreLabel}
            </button>
          )}
        </nav>

        {showFooter && (
          <div className={`${baseClass}__footer`}>
            {footerSlot && (
              <div className={`${baseClass}__footer-slot`}>{footerSlot}</div>
            )}
            {profile && (
              <div
                className={`${baseClass}__profile`}
                title={expanded ? undefined : profile.name}
              >
                {profile.avatar ?? <Avatar name={profile.name} size="sm" />}
                <span className={`${baseClass}__profile-name`}>
                  {profile.name}
                </span>
                {profile.meta && (
                  <span className={`${baseClass}__profile-meta`}>
                    {profile.meta}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

ThreadPanel.displayName = 'ThreadPanel';
