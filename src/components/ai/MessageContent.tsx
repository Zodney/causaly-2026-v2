"use client";

/**
 * MessageContent - AI Primitive Component
 *
 * Markdown rendering component with automatic chart detection.
 * Parses markdown content and renders Mermaid/Vega-Lite charts automatically.
 *
 * Features:
 * - GitHub Flavored Markdown support
 * - Automatic chart detection via code fences (```mermaid, ```vega, ```vega-lite)
 * - Renders charts using ChartContainer component
 * - Handles regular code blocks normally
 * - Preserves all markdown formatting (bold, italic, lists, links, etc.)
 *
 * Should NOT be imported directly by app routes - use via ChatMessage instead.
 */

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChartContainer } from '@/components/ai/ChartContainer';
import type { Components } from 'react-markdown';

export interface MessageContentProps {
  /**
   * Markdown content to render
   */
  content: string;

  /**
   * Optional class name for the container
   */
  className?: string;
}

export function MessageContent({ content, className }: MessageContentProps) {
  // Custom components for react-markdown
  const components: Components = {
    // Custom code block renderer for chart detection
    code: ({ node, className: codeClassName, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(codeClassName || '');
      const language = match ? match[1] : '';
      const inline = props.inline;

      // Detect chart code blocks
      if (!inline && ['mermaid', 'vega', 'vega-lite'].includes(language)) {
        const definition = String(children).replace(/\n$/, '').trim();

        return (
          <ChartContainer
            type={language as 'mermaid' | 'vega' | 'vega-lite'}
            definition={definition}
          />
        );
      }

      // Regular code block
      if (!inline) {
        return (
          <pre className="my-4 overflow-x-auto rounded-lg border border-border bg-muted p-4">
            <code
              className={`${codeClassName || ''} text-sm font-mono`}
              {...props}
            >
              {children}
            </code>
          </pre>
        );
      }

      // Inline code
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    },

    // Style other markdown elements to match theme
    p: ({ children }) => (
      <p className="my-2 leading-relaxed text-foreground">{children}</p>
    ),

    h1: ({ children }) => (
      <h1 className="mb-4 mt-6 text-2xl font-bold text-foreground">{children}</h1>
    ),

    h2: ({ children }) => (
      <h2 className="mb-3 mt-5 text-xl font-bold text-foreground">{children}</h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-2 mt-4 text-lg font-semibold text-foreground">{children}</h3>
    ),

    ul: ({ children }) => (
      <ul className="my-2 ml-6 list-disc space-y-1 text-foreground">{children}</ul>
    ),

    ol: ({ children }) => (
      <ol className="my-2 ml-6 list-decimal space-y-1 text-foreground">{children}</ol>
    ),

    li: ({ children }) => <li className="text-foreground">{children}</li>,

    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary underline underline-offset-2 hover:text-primary/80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          {children}
        </table>
      </div>
    ),

    thead: ({ children }) => (
      <thead className="bg-muted">{children}</thead>
    ),

    tbody: ({ children }) => <tbody>{children}</tbody>,

    tr: ({ children }) => (
      <tr className="border-b border-border">{children}</tr>
    ),

    th: ({ children }) => (
      <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="border border-border px-4 py-2 text-foreground">
        {children}
      </td>
    ),

    hr: () => <hr className="my-6 border-t border-border" />,

    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),

    em: ({ children }) => (
      <em className="italic text-foreground">{children}</em>
    ),
  };

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
