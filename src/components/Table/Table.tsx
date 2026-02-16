import React from 'react';
import './Table.css';

export interface TableColumn {
  /** Unique column identifier, used as the key into each row's cells */
  key: string;
  /** Header label displayed in the column header */
  header: React.ReactNode;
  /** Optional column width (CSS value like '200px', '30%', 'auto') */
  width?: string;
  /** Text alignment for cells in this column */
  align?: 'left' | 'center' | 'right';
}

export interface TableRow {
  /** Unique row identifier */
  id: string;
  /** Cell values keyed by column key — each accepts any React node */
  cells: Record<string, React.ReactNode>;
}

export interface TableProps {
  /** Column definitions */
  columns: TableColumn[];
  /** Row data */
  rows: TableRow[];
  /** Visual size */
  size?: 'default' | 'compact';
  /** Alternating row background colours */
  striped?: boolean;
  /** Accessible caption for the table */
  caption?: string;
  /** Whether to visually hide the caption (still available to screen readers) */
  captionHidden?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Table component from Figma design system.
 * Data table with flexible cell content — supports text, icons,
 * inputs, buttons, and any other React nodes inside cells.
 */
export const Table = ({
  columns,
  rows,
  size = 'default',
  striped = false,
  caption,
  captionHidden = false,
  className = '',
}: TableProps) => {
  const baseClass = 'ds-table';
  const sizeClass = `${baseClass}--${size}`;
  const stripedClass = striped ? `${baseClass}--striped` : '';

  const classes = [baseClass, sizeClass, stripedClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <table className={classes}>
      {caption && (
        <caption
          className={
            captionHidden
              ? `${baseClass}__caption--hidden`
              : `${baseClass}__caption`
          }
        >
          {caption}
        </caption>
      )}

      <thead className={`${baseClass}__head`}>
        <tr className={`${baseClass}__row ${baseClass}__row--header`}>
          {columns.map((col) => (
            <th
              key={col.key}
              className={`${baseClass}__header-cell`}
              style={{
                width: col.width,
                textAlign: col.align || 'left',
              }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={`${baseClass}__body`}>
        {rows.map((row) => (
          <tr key={row.id} className={`${baseClass}__row`}>
            {columns.map((col) => (
              <td
                key={col.key}
                className={`${baseClass}__cell`}
              >
                <div
                  className={`${baseClass}__cell-content`}
                  style={{
                    justifyContent:
                      col.align === 'center'
                        ? 'center'
                        : col.align === 'right'
                          ? 'flex-end'
                          : 'flex-start',
                  }}
                >
                  {row.cells[col.key]}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
