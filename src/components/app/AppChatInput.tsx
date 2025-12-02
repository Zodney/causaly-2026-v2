/**
 * AppChatInput Component
 *
 * Enhanced chat input area with advanced controls following AI SDK Elements design pattern.
 * Features:
 * - Auto-resizing textarea with rounded design (28px border radius)
 * - Expert Agents dropdown (radio selection)
 * - Deep Research toggle button
 * - Data Sources multi-select menu with count badge
 * - Send button with loading state
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ai-elements/loader";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  ClockFading,
  Settings,
  ArrowUp,
  MessageSquare,
  Lightbulb,
  Code,
  BarChart,
} from "lucide-react";

// Types
export interface AgentOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface DataSourceOption {
  id: string;
  label: string;
}

export interface AppChatInputProps {
  // Required props for controlled input
  value: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  // Optional customization
  placeholder?: string;

  // Feature toggles
  showAgentSelector?: boolean;
  showDeepResearch?: boolean;
  showDataSources?: boolean;

  // Agent selector props
  selectedAgent?: string | null;
  onAgentChange?: (agentId: string | null) => void;
  agentOptions?: AgentOption[];

  // Deep research props
  deepResearchEnabled?: boolean;
  onDeepResearchChange?: (enabled: boolean) => void;

  // Data sources props
  selectedDataSources?: string[];
  onDataSourcesChange?: (sources: string[]) => void;
  dataSourceOptions?: DataSourceOption[];
}

// Default agent options
const DEFAULT_AGENT_OPTIONS: AgentOption[] = [
  { id: "general", label: "General Assistant", icon: MessageSquare },
  { id: "research", label: "Research Expert", icon: Lightbulb },
  { id: "code", label: "Code Analyst", icon: Code },
  { id: "data", label: "Data Scientist", icon: BarChart },
];

// Default data source options
const DEFAULT_DATA_SOURCE_OPTIONS: DataSourceOption[] = [
  { id: "pubmed", label: "PubMed" },
  { id: "arxiv", label: "ArXiv" },
  { id: "scholar", label: "Google Scholar" },
  { id: "web", label: "Web Search" },
];

export function AppChatInput({
  value,
  isLoading,
  onChange,
  onSubmit,
  placeholder = "Type your message...",
  showAgentSelector = true,
  showDeepResearch = true,
  showDataSources = true,
  selectedAgent = null,
  onAgentChange,
  agentOptions = DEFAULT_AGENT_OPTIONS,
  deepResearchEnabled = false,
  onDeepResearchChange,
  selectedDataSources = [],
  onDataSourcesChange,
  dataSourceOptions = DEFAULT_DATA_SOURCE_OPTIONS,
}: AppChatInputProps) {
  // Internal state (used when component is uncontrolled)
  const [internalAgent, setInternalAgent] = useState<string | null>(null);
  const [internalDeepResearch, setInternalDeepResearch] = useState(false);
  const [internalDataSources, setInternalDataSources] = useState<string[]>([]);

  // Use controlled state if provided, otherwise use internal state
  const currentAgent = selectedAgent !== undefined ? selectedAgent : internalAgent;
  const currentDeepResearch = deepResearchEnabled !== undefined ? deepResearchEnabled : internalDeepResearch;
  const currentDataSources = selectedDataSources !== undefined ? selectedDataSources : internalDataSources;

  // Handlers
  const handleAgentChange = (agentId: string) => {
    // If clicking the currently selected agent, deselect it
    const newAgent = currentAgent === agentId ? null : agentId;

    if (onAgentChange) {
      onAgentChange(newAgent);
    } else {
      setInternalAgent(newAgent);
    }
  };

  const handleDeepResearchToggle = () => {
    const newValue = !currentDeepResearch;
    if (onDeepResearchChange) {
      onDeepResearchChange(newValue);
    } else {
      setInternalDeepResearch(newValue);
    }
  };

  const toggleDataSource = (sourceId: string) => {
    const newSources = currentDataSources.includes(sourceId)
      ? currentDataSources.filter((id) => id !== sourceId)
      : [...currentDataSources, sourceId];

    if (onDataSourcesChange) {
      onDataSourcesChange(newSources);
    } else {
      setInternalDataSources(newSources);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as any);
    }
  };

  return (
    <div className="sticky bottom-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-5 pb-4 pt-0">
      <div className="mx-auto w-full max-w-[800px]">
        <form onSubmit={onSubmit} className="w-full">
          <InputGroup className="relative flex w-full flex-col rounded-2xl border border-input shadow-xs overflow-hidden bg-white">
          {/* Auto-resizing Textarea */}
          <InputGroupTextarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={isLoading}
            className="min-h-12 max-h-48 resize-none p-4 text-base order-first"
            onKeyDown={handleKeyDown}
          />

          {/* Button Row - Bottom of Input */}
          <InputGroupAddon
            data-align="block-end"
            className="flex w-full items-center justify-between gap-1 p-4 order-last !has-[>button]:ml-0 !has-[>kbd]:ml-0"
          >
            {/* Left Side: Configuration Buttons */}
            <div className="flex items-center gap-1">
              {/* 1. Expert Agents Dropdown */}
              {showAgentSelector && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "font-medium transition-all duration-200 cursor-pointer",
                        currentAgent
                          ? "bg-secondary text-secondary-foreground border-secondary-foreground hover:bg-secondary hover:text-secondary-foreground"
                          : "bg-background text-foreground border-input hover:text-muted-foreground hover:bg-accent"
                      )}
                    >
                      <Sparkles className="size-4" strokeWidth={1.5} />
                      <span>
                        {currentAgent
                          ? agentOptions.find((a) => a.id === currentAgent)?.label
                          : "Expert Agents"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Select Agent</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={currentAgent || ""}
                      onValueChange={handleAgentChange}
                    >
                      {agentOptions.map((agent) => (
                        <DropdownMenuRadioItem key={agent.id} value={agent.id}>
                          <agent.icon className="mr-2 size-4" />
                          {agent.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* 2. Deep Research Toggle */}
              {showDeepResearch && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDeepResearchToggle}
                  className={cn(
                    "font-medium transition-all duration-200 cursor-pointer",
                    currentDeepResearch
                      ? "bg-secondary text-secondary-foreground border-secondary-foreground hover:bg-secondary hover:text-secondary-foreground"
                      : "bg-background text-foreground border-input hover:text-muted-foreground hover:bg-accent"
                  )}
                >
                  <ClockFading className="size-4" strokeWidth={1.5} />
                  <span>Deep Research</span>
                </Button>
              )}

              {/* 3. Data Sources Menu */}
              {showDataSources && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "font-medium cursor-pointer",
                        currentDataSources.length > 0 && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Settings className="size-4" />
                      {currentDataSources.length > 0 && (
                        <span className="text-xs">
                          ({currentDataSources.length}/{dataSourceOptions.length})
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Data Sources</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {dataSourceOptions.map((source) => (
                      <DropdownMenuCheckboxItem
                        key={source.id}
                        checked={currentDataSources.includes(source.id)}
                        onCheckedChange={() => toggleDataSource(source.id)}
                      >
                        {source.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Right Side: Send Button */}
            <Button
              type="submit"
              size="sm"
              disabled={!value.trim() || isLoading}
              className="font-medium bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer disabled:cursor-not-allowed disabled:bg-secondary disabled:text-foreground"
            >
              {isLoading ? (
                <Loader size={16} />
              ) : (
                <ArrowUp className="size-4" />
              )}
            </Button>
          </InputGroupAddon>
        </InputGroup>
        </form>
      </div>
    </div>
  );
}
