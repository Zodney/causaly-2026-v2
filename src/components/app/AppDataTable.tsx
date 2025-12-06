"use client";

/**
 * AppDataTable - Application-level data table component
 *
 * A simplified, opinionated data table built on Kibo UI's table primitives.
 * This component provides a clean API for displaying sortable, filterable data.
 *
 * Usage in app routes:
 * ```tsx
 * import { AppDataTable } from "@/components/app/AppDataTable";
 *
 * <AppDataTable
 *   data={users}
 *   columns={[
 *     { accessorKey: "name", header: "Name" },
 *     { accessorKey: "email", header: "Email" },
 *   ]}
 * />
 * ```
 *
 * Features:
 * - Automatic sorting with column headers
 * - Responsive design using Tailwind tokens
 * - Type-safe with TypeScript generics
 * - Accessible keyboard navigation
 *
 * Theming:
 * All colors use CSS variables from globals.css:
 * - border: --border
 * - muted-foreground: --muted-foreground
 * - background: --background
 */

import {
  TableProvider,
  TableHeader,
  TableHeaderGroup,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  type ColumnDef,
} from "@/components/kibo/DataTable";

export interface AppDataTableProps<TData, TValue = unknown> {
  /**
   * The data array to display in the table
   */
  data: TData[];

  /**
   * Column definitions with accessors and headers
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Optional callback when a row is clicked
   */
  onRowClick?: (row: TData) => void;
}

/**
 * AppDataTable Component
 *
 * Displays data in a sortable table with automatic theming.
 */
export function AppDataTable<TData, TValue = unknown>({
  data,
  columns,
  className,
  onRowClick,
}: AppDataTableProps<TData, TValue>) {
  return (
    <div className="w-full overflow-auto rounded-md border">
      <TableProvider columns={columns} data={data} className={className}>
        <TableHeader>
          {({ headerGroup }) => (
            <TableHeaderGroup headerGroup={headerGroup}>
              {({ header }) => <TableHead header={header} />}
            </TableHeaderGroup>
          )}
        </TableHeader>

        <TableBody>
          {({ row }) => (
            <TableRow
              row={row}
              className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
              onClick={() => onRowClick?.(row.original as TData)}
            >
              {({ cell }) => <TableCell cell={cell} />}
            </TableRow>
          )}
        </TableBody>
      </TableProvider>
    </div>
  );
}

// Export type for external use
export type { ColumnDef } from "@/components/kibo/DataTable";
