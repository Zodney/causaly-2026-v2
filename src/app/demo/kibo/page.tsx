"use client";

import { useState } from "react";
import { AppDataTable, type ColumnDef } from "@/components/app/AppDataTable";
import { AppFileDropzone } from "@/components/app/AppFileDropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for the table
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
};

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Developer",
    status: "active",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    role: "Designer",
    status: "inactive",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "Manager",
    status: "active",
  },
  {
    id: "5",
    name: "Eve Davis",
    email: "eve@example.com",
    role: "Developer",
    status: "active",
  },
];

// Column definitions for the table
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

export default function KiboDemoPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
    console.log("Files selected:", files);
  };

  const handleFileError = (error: Error) => {
    console.error("File upload error:", error);
    alert(error.message);
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    console.log("Row clicked:", user);
  };

  return (
    <div className="container mx-auto min-h-screen py-12 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Kibo UI Components
          </h1>
          <p className="text-muted-foreground text-lg">
            Advanced components built on shadcn/ui primitives, wrapped for our
            application architecture.
          </p>
        </div>

        {/* Data Table Section */}
        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Table Component</CardTitle>
              <CardDescription>
                A sortable table with automatic theming. Click column headers to
                sort. Click rows to select.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppDataTable
                data={mockUsers}
                columns={userColumns}
                onRowClick={handleRowClick}
              />
              {selectedUser && (
                <div className="mt-4 rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm font-medium">Selected User:</p>
                  <p className="text-muted-foreground text-sm">
                    {selectedUser.name} ({selectedUser.email})
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* File Dropzone Section */}
        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>File Dropzone Component</CardTitle>
              <CardDescription>
                Drag and drop files or click to upload. Supports file type and
                size validation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div>
                <h3 className="mb-3 text-lg font-semibold">Image Upload</h3>
                <AppFileDropzone
                  label="Upload profile picture"
                  accept={{
                    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
                  }}
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024} // 5MB
                  onFilesSelected={handleFilesSelected}
                  onError={handleFileError}
                />
              </div>

              {/* Multiple Files Upload */}
              <div>
                <h3 className="mb-3 text-lg font-semibold">
                  Multiple Documents Upload
                </h3>
                <AppFileDropzone
                  label="Upload documents (up to 5 files)"
                  accept={{
                    "application/pdf": [".pdf"],
                    "application/msword": [".doc"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                      [".docx"],
                  }}
                  maxFiles={5}
                  maxSize={10 * 1024 * 1024} // 10MB
                  onFilesSelected={(files) => {
                    console.log("Documents uploaded:", files);
                  }}
                  onError={handleFileError}
                />
              </div>

              {/* Uploaded Files Display */}
              {uploadedFiles.length > 0 && (
                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="mb-2 text-sm font-medium">Uploaded Files:</p>
                  <ul className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground text-sm"
                      >
                        {file.name} (
                        {(file.size / 1024).toFixed(2)} KB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Architecture Info */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Component Architecture</CardTitle>
              <CardDescription>
                How Kibo UI integrates with our design system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">1. Kibo UI Layer</h3>
                  <p className="text-muted-foreground text-sm">
                    Raw components from{" "}
                    <code className="text-xs">@/components/kibo-ui/</code>
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">2. Wrapper Layer</h3>
                  <p className="text-muted-foreground text-sm">
                    Re-exported from{" "}
                    <code className="text-xs">@/components/kibo/</code>
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">3. App Layer</h3>
                  <p className="text-muted-foreground text-sm">
                    Simplified API in{" "}
                    <code className="text-xs">@/components/app/</code>
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="mb-2 text-sm font-medium">Import Rule:</p>
                <p className="text-muted-foreground text-sm">
                  App routes only import from{" "}
                  <code className="text-xs">@/components/app</code> or{" "}
                  <code className="text-xs">@/components/ui</code>. Never
                  directly from Kibo UI packages.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Links */}
        <section className="flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="default">
            <a href="/">Back to Home</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/demo/viz">View Visualizations</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/demo/ai">Try AI Chat</a>
          </Button>
        </section>
      </div>
    </div>
  );
}
