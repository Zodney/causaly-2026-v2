"use client";

/**
 * FileDropzone - Kibo UI Wrapper
 *
 * This is a thin wrapper around the Kibo UI dropzone component.
 * Re-exports the dropzone building blocks from @/components/kibo-ui/dropzone
 *
 * DO NOT import this directly in app routes.
 * Use @/components/app/AppFileDropzone instead.
 */

export {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
  type DropzoneProps,
  type DropzoneContentProps,
  type DropzoneEmptyStateProps,
} from "@/components/kibo-ui/dropzone";
