import React, { useState, useRef, useEffect, useCallback } from 'react';
import './DropdownMenu.css';
import '../../fonts/material-symbols.css';

/* ============================================
   TYPES
   ============================================ */

export interface DropdownMenuItem {
  type?: 'item';
  /** Display label */
  label: string;
  /** Keyboard shortcut hint (e.g. "⇧ ⌘ P") */
  shortcut?: string;
  /** Material Symbol icon name */
  icon?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Destructive / danger styling (red text) for delete, remove, etc. */
  destructive?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Nested sub-menu items */
  children?: DropdownMenuEntry[];
}

export interface DropdownMenuSeparator {
  type: 'separator';
}

export interface DropdownMenuGroup {
  type: 'group';
  /** Section heading */
  label: string;
  /** Items within the group */
  items: DropdownMenuEntry[];
}

export type DropdownMenuEntry =
  | DropdownMenuItem
  | DropdownMenuSeparator
  | DropdownMenuGroup;

export interface DropdownMenuProps {
  /** Trigger element that opens the menu */
  trigger: React.ReactNode;
  /** Menu entries (items, groups, separators) */
  items: DropdownMenuEntry[];
  /** Horizontal alignment of the panel */
  align?: 'start' | 'end';
  /** Component size */
  size?: 'default' | 'compact';
  /** Additional CSS classes */
  className?: string;
}

/* ============================================
   HELPERS
   ============================================ */

/** Flatten all actionable items from entries for keyboard navigation */
function collectItems(entries: DropdownMenuEntry[]): DropdownMenuItem[] {
  const result: DropdownMenuItem[] = [];
  for (const entry of entries) {
    if (entry.type === 'separator') continue;
    if (entry.type === 'group') {
      result.push(...collectItems(entry.items));
    } else {
      result.push(entry);
    }
  }
  return result;
}

/* ============================================
   SUB-MENU ITEM
   ============================================ */

interface SubMenuItemProps {
  item: DropdownMenuItem;
  baseClass: string;
  focused: boolean;
  size: 'default' | 'compact';
  onActivate: () => void;
}

const SubMenuItem = ({ item, baseClass, focused, size, onActivate }: SubMenuItemProps) => {
  const [subOpen, setSubOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSubOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setSubOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Open sub-menu when focused via keyboard
  useEffect(() => {
    if (focused && item.children && item.children.length > 0) {
      setSubOpen(true);
    }
  }, [focused, item.children]);

  const classes = [
    `${baseClass}__item`,
    focused ? `${baseClass}__item--focused` : '',
    item.disabled ? `${baseClass}__item--disabled` : '',
    item.destructive ? `${baseClass}__item--destructive` : '',
    `${baseClass}__item--has-submenu`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li
      className={classes}
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={subOpen}
      aria-disabled={item.disabled || undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        e.stopPropagation();
        if (!item.disabled) setSubOpen((prev) => !prev);
      }}
    >
      <span className={`${baseClass}__item-label`}>
        {item.icon && (
          <span className={`${baseClass}__item-icon material-symbols-rounded`} aria-hidden="true">
            {item.icon}
          </span>
        )}
        {item.label}
      </span>
      <span className={`${baseClass}__submenu-icon material-symbols-rounded`} aria-hidden="true">
        chevron_right
      </span>
      {subOpen && item.children && (
        <MenuPanel
          entries={item.children}
          baseClass={baseClass}
          size={size}
          isSubmenu
          onItemActivate={onActivate}
        />
      )}
    </li>
  );
};

/* ============================================
   MENU PANEL (reusable for root + sub-menus)
   ============================================ */

interface MenuPanelProps {
  entries: DropdownMenuEntry[];
  baseClass: string;
  size: 'default' | 'compact';
  isSubmenu?: boolean;
  onItemActivate: () => void;
}

const MenuPanel = ({
  entries,
  baseClass,
  size,
  isSubmenu = false,
  onItemActivate,
}: MenuPanelProps) => {
  const panelClasses = [
    `${baseClass}__panel`,
    isSubmenu ? `${baseClass}__submenu` : '',
    size === 'compact' ? `${baseClass}__panel--compact` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderEntry = (entry: DropdownMenuEntry, index: number) => {
    if (entry.type === 'separator') {
      return <li key={`sep-${index}`} className={`${baseClass}__separator`} role="separator" />;
    }

    if (entry.type === 'group') {
      return (
        <li key={`group-${index}`} className={`${baseClass}__group`} role="group" aria-label={entry.label}>
          <span className={`${baseClass}__group-label`}>{entry.label}</span>
          <ul className={`${baseClass}__group-list`} role="group">
            {entry.items.map((subEntry, subIndex) => renderEntry(subEntry, subIndex))}
          </ul>
        </li>
      );
    }

    // Item with children → sub-menu
    if (entry.children && entry.children.length > 0) {
      return (
        <SubMenuItem
          key={`submenu-${index}`}
          item={entry}
          baseClass={baseClass}
          focused={false}
          size={size}
          onActivate={onItemActivate}
        />
      );
    }

    // Regular item
    const itemClasses = [
      `${baseClass}__item`,
      entry.disabled ? `${baseClass}__item--disabled` : '',
      entry.destructive ? `${baseClass}__item--destructive` : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <li
        key={`item-${index}`}
        className={itemClasses}
        role="menuitem"
        aria-disabled={entry.disabled || undefined}
        onClick={(e) => {
          e.stopPropagation();
          if (!entry.disabled) {
            entry.onClick?.();
            onItemActivate();
          }
        }}
      >
        <span className={`${baseClass}__item-label`}>
          {entry.icon && (
            <span className={`${baseClass}__item-icon material-symbols-rounded`} aria-hidden="true">
              {entry.icon}
            </span>
          )}
          {entry.label}
        </span>
        {entry.shortcut && (
          <span className={`${baseClass}__shortcut`}>{entry.shortcut}</span>
        )}
      </li>
    );
  };

  return (
    <ul className={panelClasses} role="menu">
      {entries.map((entry, index) => renderEntry(entry, index))}
    </ul>
  );
};

/* ============================================
   DROPDOWN MENU — ROOT COMPONENT
   ============================================ */

export const DropdownMenu = ({
  trigger,
  items,
  align = 'start',
  size = 'default',
  className = '',
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLUListElement | null>(null);

  const baseClass = 'ds-dropdown-menu';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const flatItems = collectItems(items);

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (!prev) setFocusedIndex(-1);
      return !prev;
    });
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  /* Click outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [handleClose]);

  /* Keyboard navigation */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          const item = flatItems[focusedIndex];
          if (item && !item.disabled && !item.children) {
            item.onClick?.();
            handleClose();
          }
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => {
            let next = prev + 1;
            while (next < flatItems.length && flatItems[next].disabled) next++;
            return next < flatItems.length ? next : prev;
          });
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && flatItems[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
        }
        break;
      case 'Escape':
      case 'Tab':
        handleClose();
        break;
    }
  };

  /* Scroll focused item into view */
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && panelRef.current) {
      const allItems = panelRef.current.querySelectorAll(`[role="menuitem"]`);
      const el = allItems[focusedIndex] as HTMLElement | undefined;
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  /* Render the panel with focus tracking */
  const renderPanelEntry = (entry: DropdownMenuEntry, index: number, itemCounter: { count: number }) => {
    if (entry.type === 'separator') {
      return <li key={`sep-${index}`} className={`${baseClass}__separator`} role="separator" />;
    }

    if (entry.type === 'group') {
      return (
        <li key={`group-${index}`} className={`${baseClass}__group`} role="none">
          <span className={`${baseClass}__group-label`} role="presentation">{entry.label}</span>
          <ul className={`${baseClass}__group-list`} role="group" aria-label={entry.label}>
            {entry.items.map((subEntry, subIndex) =>
              renderPanelEntry(subEntry, subIndex, itemCounter)
            )}
          </ul>
        </li>
      );
    }

    const myIndex = itemCounter.count;
    itemCounter.count++;
    const isFocused = myIndex === focusedIndex;

    // Sub-menu item
    if (entry.children && entry.children.length > 0) {
      return (
        <SubMenuItem
          key={`submenu-${index}`}
          item={entry}
          baseClass={baseClass}
          focused={isFocused}
          size={size}
          onActivate={handleClose}
        />
      );
    }

    // Regular item
    const itemClasses = [
      `${baseClass}__item`,
      isFocused ? `${baseClass}__item--focused` : '',
      entry.disabled ? `${baseClass}__item--disabled` : '',
      entry.destructive ? `${baseClass}__item--destructive` : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <li
        key={`item-${index}`}
        className={itemClasses}
        role="menuitem"
        aria-disabled={entry.disabled || undefined}
        onClick={(e) => {
          e.stopPropagation();
          if (!entry.disabled) {
            entry.onClick?.();
            handleClose();
          }
        }}
      >
        <span className={`${baseClass}__item-label`}>
          {entry.icon && (
            <span className={`${baseClass}__item-icon material-symbols-rounded`} aria-hidden="true">
              {entry.icon}
            </span>
          )}
          {entry.label}
        </span>
        {entry.shortcut && (
          <span className={`${baseClass}__shortcut`}>{entry.shortcut}</span>
        )}
      </li>
    );
  };

  const panelClasses = [
    `${baseClass}__panel`,
    align === 'end' ? `${baseClass}__panel--align-end` : '',
    size === 'compact' ? `${baseClass}__panel--compact` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const itemCounter = { count: 0 };

  return (
    <div className={classes} ref={rootRef}>
      <div
        className={`${baseClass}__trigger`}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        {trigger}
      </div>
      {isOpen && (
        <ul
          className={panelClasses}
          role="menu"
          ref={(el) => {
            panelRef.current = el;
          }}
        >
          {items.map((entry, index) => renderPanelEntry(entry, index, itemCounter))}
        </ul>
      )}
    </div>
  );
};
