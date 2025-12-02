/**
 * Design System Page
 *
 * Visual cheat sheet displaying all components in the application.
 * Organized by category with live examples of each component.
 */

"use client";

import { useState } from "react";
import Link from "next/link";

// UI Primitives
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CausalyLogo } from "@/components/ui/CausalyLogo";

// App Components
import { AppDataTable, type ColumnDef } from "@/components/app/AppDataTable";
import { AppFileDropzone } from "@/components/app/AppFileDropzone";
import { AppReasoningPanel } from "@/components/app/AppReasoningPanel";
import { type ReasoningStep } from "@/components/ai/ReasoningPanel";

// AI Elements
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Loader } from "@/components/ai-elements/loader";
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion";

// Icons
import { Search, Mail, Lock, ChevronDown, Settings, User } from "lucide-react";

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  // Sample data for AppDataTable
  type SampleData = {
    id: string;
    name: string;
    email: string;
    status: string;
  };

  const sampleTableData: SampleData[] = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "active" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", status: "inactive" },
    { id: "3", name: "Carol White", email: "carol@example.com", status: "active" },
  ];

  const sampleTableColumns: ColumnDef<SampleData>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "status", header: "Status" },
  ];

  // Sample reasoning steps
  const sampleReasoningSteps: ReasoningStep[] = [
    {
      id: "1",
      type: "thought",
      content: "Analyzing the user's question to understand the context.",
    },
    {
      id: "2",
      type: "decision",
      content: "Decided to provide a comprehensive answer with examples.",
    },
    {
      id: "3",
      type: "action",
      content: "Gathering relevant information from the knowledge base.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Design System
          </h1>
          <p className="text-lg text-muted-foreground">
            Visual cheat sheet of all components in the application
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <div className="space-y-16">
          {/* PRIMITIVES SECTION */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground border-b border-border pb-3">
                Primitives
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                shadcn/ui components - import from @/components/ui/
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Button */}
              <Card>
                <CardHeader>
                  <CardTitle>Button</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Variants:</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="default">Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Sizes:</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badge */}
              <Card>
                <CardHeader>
                  <CardTitle>Badge</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Card</CardTitle>
                  <CardDescription>
                    Container with header, content, and footer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is card content. Cards can contain any elements.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>

              {/* Dialog */}
              <Card>
                <CardHeader>
                  <CardTitle>Dialog</CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                          This is a dialog description. Dialogs are used for important confirmations.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                          Dialog content goes here.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Dropdown Menu */}
              <Card>
                <CardHeader>
                  <CardTitle>Dropdown Menu</CardTitle>
                </CardHeader>
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Open Menu
                        <ChevronDown className="ml-2 size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>

              {/* Input */}
              <Card>
                <CardHeader>
                  <CardTitle>Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input type="text" placeholder="Text input" />
                  <Input type="email" placeholder="Email input" />
                  <Input type="password" placeholder="Password input" />
                  <Input disabled placeholder="Disabled input" />
                </CardContent>
              </Card>

              {/* Textarea */}
              <Card>
                <CardHeader>
                  <CardTitle>Textarea</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Enter your message here..." rows={4} />
                </CardContent>
              </Card>

              {/* Select */}
              <Card>
                <CardHeader>
                  <CardTitle>Select</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Label */}
              <Card>
                <CardHeader>
                  <CardTitle>Label</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="input1">Email address</Label>
                    <Input id="input1" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input2">Password</Label>
                    <Input id="input2" type="password" placeholder="••••••••" />
                  </div>
                </CardContent>
              </Card>

              {/* Separator */}
              <Card>
                <CardHeader>
                  <CardTitle>Separator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">Content above</p>
                  <Separator />
                  <p className="text-sm">Content below</p>
                  <div className="flex items-center gap-4">
                    <p className="text-sm">Left</p>
                    <Separator orientation="vertical" className="h-4" />
                    <p className="text-sm">Right</p>
                  </div>
                </CardContent>
              </Card>

              {/* Skeleton */}
              <Card>
                <CardHeader>
                  <CardTitle>Skeleton</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>

              {/* Hover Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Hover Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">Hover over me</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Hover Card</h4>
                        <p className="text-sm text-muted-foreground">
                          This is a hover card with additional information.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardContent>
              </Card>

              {/* Tooltip */}
              <Card>
                <CardHeader>
                  <CardTitle>Tooltip</CardTitle>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover for tooltip</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
              </Card>

              {/* Button Group */}
              <Card>
                <CardHeader>
                  <CardTitle>Button Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <ButtonGroup>
                    <Button variant="outline">Left</Button>
                    <Button variant="outline">Middle</Button>
                    <Button variant="outline">Right</Button>
                  </ButtonGroup>
                </CardContent>
              </Card>

              {/* Input Group */}
              <Card>
                <CardHeader>
                  <CardTitle>Input Group</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InputGroup>
                    <InputGroupAddon>
                      <Search className="size-4" />
                    </InputGroupAddon>
                    <Input placeholder="Search..." />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail className="size-4" />
                    </InputGroupAddon>
                    <Input type="email" placeholder="Email" />
                    <InputGroupAddon>.com</InputGroupAddon>
                  </InputGroup>
                </CardContent>
              </Card>

              {/* Command */}
              <Card>
                <CardHeader>
                  <CardTitle>Command</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setCommandOpen(true)}>
                    Open Command
                  </Button>
                  <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </CommandDialog>
                </CardContent>
              </Card>

              {/* Causaly Logo */}
              <Card>
                <CardHeader>
                  <CardTitle>Causaly Logo</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                  <CausalyLogo className="text-foreground" />
                </CardContent>
              </Card>
            </div>

            {/* Table - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle>Table</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Alice Johnson</TableCell>
                      <TableCell>alice@example.com</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bob Smith</TableCell>
                      <TableCell>bob@example.com</TableCell>
                      <TableCell>Developer</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Inactive</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Carol White</TableCell>
                      <TableCell>carol@example.com</TableCell>
                      <TableCell>Designer</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Scroll Area - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle>Scroll Area</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full border border-border rounded-lg p-4">
                  <div className="space-y-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <p key={i} className="text-sm">
                        Item {i + 1} - This is scrollable content in a constrained area.
                      </p>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </section>

          {/* APP COMPONENTS SECTION */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground border-b border-border pb-3">
                App Components
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Application wrappers - import from @/components/app/
              </p>
            </div>

            <div className="space-y-6">
              {/* AppDataTable */}
              <Card>
                <CardHeader>
                  <CardTitle>AppDataTable</CardTitle>
                  <CardDescription>
                    Sortable data table with row click handling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AppDataTable
                    data={sampleTableData}
                    columns={sampleTableColumns}
                    onRowClick={(row) => console.log("Clicked:", row)}
                  />
                </CardContent>
              </Card>

              {/* AppFileDropzone */}
              <Card>
                <CardHeader>
                  <CardTitle>AppFileDropzone</CardTitle>
                  <CardDescription>
                    Drag and drop file upload with validation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AppFileDropzone
                    label="Upload files"
                    accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                    maxFiles={3}
                    maxSize={5 * 1024 * 1024}
                    onFilesSelected={(files) => console.log("Files:", files)}
                    onError={(error) => console.error("Error:", error)}
                  />
                </CardContent>
              </Card>

              {/* AppReasoningPanel */}
              <Card>
                <CardHeader>
                  <CardTitle>AppReasoningPanel</CardTitle>
                  <CardDescription>
                    Display AI reasoning steps with different types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AppReasoningPanel
                    steps={sampleReasoningSteps}
                    title="Reasoning Trace"
                  />
                </CardContent>
              </Card>

              {/* AppNavBar Note */}
              <Card>
                <CardHeader>
                  <CardTitle>AppNavBar</CardTitle>
                  <CardDescription>
                    Global navigation bar - visible at the top of every page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The AppNavBar is rendered globally in the root layout and appears at the top of this page.
                    It contains the Causaly logo, navigation links, the Design System button, and user menu.
                  </p>
                </CardContent>
              </Card>

              {/* AppChatInput Note */}
              <Card>
                <CardHeader>
                  <CardTitle>AppChatInput</CardTitle>
                  <CardDescription>
                    Enhanced chat input with file upload and model selection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The AppChatInput component is used on the main Agentic Research page.
                    It provides an integrated input field with file attachment support, model selection,
                    and data source configuration.
                  </p>
                </CardContent>
              </Card>

              {/* AppChat Note */}
              <Card>
                <CardHeader>
                  <CardTitle>AppChat</CardTitle>
                  <CardDescription>
                    Full chat interface with message rendering and streaming support
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The AppChat component is demonstrated on the{" "}
                    <Link href="/demo/ai" className="text-primary hover:underline">
                      AI Demo page
                    </Link>
                    . It handles message display, streaming responses, and integrates with the AI SDK.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* AI ELEMENTS SECTION */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground border-b border-border pb-3">
                AI Elements
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                AI SDK Elements - specialized components for AI interfaces
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Message */}
              <Card>
                <CardHeader>
                  <CardTitle>Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Message from="user">
                    <MessageContent>
                      <MessageResponse>
                        This is a user message example.
                      </MessageResponse>
                    </MessageContent>
                  </Message>
                  <Message from="assistant">
                    <MessageContent>
                      <MessageResponse>
                        This is an assistant message example with a response.
                      </MessageResponse>
                    </MessageContent>
                  </Message>
                </CardContent>
              </Card>

              {/* Loader */}
              <Card>
                <CardHeader>
                  <CardTitle>Loader</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                  <Loader size={32} />
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle>Suggestion</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suggestions className="flex flex-wrap gap-2">
                    <Suggestion
                      suggestion="Analyze market trends"
                      onClick={(s) => console.log("Clicked:", s)}
                    >
                      Analyze market trends
                    </Suggestion>
                    <Suggestion
                      suggestion="Summarize research papers"
                      onClick={(s) => console.log("Clicked:", s)}
                    >
                      Summarize research papers
                    </Suggestion>
                    <Suggestion
                      suggestion="Generate insights"
                      onClick={(s) => console.log("Clicked:", s)}
                    >
                      Generate insights
                    </Suggestion>
                  </Suggestions>
                </CardContent>
              </Card>

              {/* PromptInput Note */}
              <Card>
                <CardHeader>
                  <CardTitle>PromptInput</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The PromptInput component from AI SDK Elements is integrated into AppChatInput
                    and used throughout the application for chat interfaces with file attachment support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
