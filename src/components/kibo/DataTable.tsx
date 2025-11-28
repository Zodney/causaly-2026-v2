"use client";

/**
 * DataTable - Kibo UI Wrapper
 *
 * This is a thin wrapper around the Kibo UI table component.
 * Re-exports the table building blocks from @/components/kibo-ui/table
 *
 * DO NOT import this directly in app routes.
 * Use @/components/app/AppDataTable instead.
 */

export {
  TableProvider,
  TableHeader,
  TableHeaderGroup,
  TableHead,
  TableColumnHeader,
  TableBody,
  TableRow,
  TableCell,
  type TableProviderProps,
  type TableHeaderProps,
  type TableHeaderGroupProps,
  type TableHeadProps,
  type TableColumnHeaderProps,
  type TableBodyProps,
  type TableRowProps,
  type TableCellProps,
  type ColumnDef,
} from "@/components/kibo-ui/table";
