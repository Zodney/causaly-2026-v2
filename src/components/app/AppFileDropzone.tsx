"use client";

/**
 * AppFileDropzone - Application-level file upload component
 *
 * A simplified file dropzone built on Kibo UI's dropzone primitives.
 * Provides drag-and-drop file upload with preview and validation.
 *
 * Usage in app routes:
 * ```tsx
 * import { AppFileDropzone } from "@/components/app/AppFileDropzone";
 *
 * <AppFileDropzone
 *   onFilesSelected={(files) => console.log(files)}
 *   accept={{ 'image/*': ['.png', '.jpg'] }}
 *   maxFiles={5}
 *   maxSize={5 * 1024 * 1024} // 5MB
 * />
 * ```
 *
 * Features:
 * - Drag-and-drop support
 * - File type validation
 * - Size limits
 * - File preview
 * - Accessible with keyboard support
 *
 * Theming:
 * All colors use CSS variables from globals.css:
 * - muted: --muted
 * - muted-foreground: --muted-foreground
 * - ring: --ring
 */

import { useState } from "react";
import type { DropEvent, FileRejection } from "react-dropzone";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/kibo/FileDropzone";

export interface AppFileDropzoneProps {
  /**
   * Callback fired when files are successfully selected
   */
  onFilesSelected?: (files: File[]) => void;

  /**
   * Callback fired when there's an error (e.g., file too large)
   */
  onError?: (error: Error) => void;

  /**
   * Accepted file types
   * Example: { 'image/*': ['.png', '.jpg'], 'application/pdf': ['.pdf'] }
   */
  accept?: Record<string, string[]>;

  /**
   * Maximum number of files allowed
   * @default 1
   */
  maxFiles?: number;

  /**
   * Maximum file size in bytes
   * Example: 5 * 1024 * 1024 for 5MB
   */
  maxSize?: number;

  /**
   * Minimum file size in bytes
   */
  minSize?: number;

  /**
   * Whether the dropzone is disabled
   */
  disabled?: boolean;

  /**
   * Optional className for custom styling
   */
  className?: string;

  /**
   * Optional label to display
   */
  label?: string;
}

/**
 * AppFileDropzone Component
 *
 * A file upload component with drag-and-drop support.
 * Automatically validates files and provides visual feedback.
 */
export function AppFileDropzone({
  onFilesSelected,
  onError,
  accept,
  maxFiles = 1,
  maxSize,
  minSize,
  disabled,
  className,
  label,
}: AppFileDropzoneProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>();

  const handleDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    if (fileRejections.length > 0) {
      const errorMessage =
        fileRejections[0]?.errors[0]?.message || "File validation failed";
      onError?.(new Error(errorMessage));
      return;
    }

    setSelectedFiles(acceptedFiles);
    onFilesSelected?.(acceptedFiles);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium">{label}</label>
      )}
      <Dropzone
        src={selectedFiles}
        accept={accept}
        maxFiles={maxFiles}
        maxSize={maxSize}
        minSize={minSize}
        disabled={disabled}
        onDrop={handleDrop}
        onError={onError}
        className={className}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  );
}
