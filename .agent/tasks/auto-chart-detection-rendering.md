# Task: Automatic Chart Detection and Rendering in AI Chat Messages

**Status:** In Progress
**Created:** 2025-12-04
**Estimated Time:** 4.5 hours
**Priority:** High

---

## Overview

Implement automatic detection and rendering of Mermaid diagrams and Vega-Lite charts within AI chat message responses. When the AI returns markdown code blocks with ````mermaid`, ````vega`, or ````vega-lite`, the system should automatically parse and render them as interactive, theme-aware visualizations with toolbar controls.

## Success Criteria

✅ AI responses containing ` ```mermaid ` code blocks render as interactive diagrams
✅ AI responses containing ` ```vega ` or ` ```vega-lite ` render as data charts
✅ Charts adapt to light/dark theme automatically
✅ Toolbar allows toggling code view and downloading images (SVG/PNG choice)
✅ Invalid syntax shows user-friendly error messages
✅ Plain text messages render normally without markdown processing
✅ Multiple charts in one message render independently
✅ All styling uses CSS variables, no hardcoded colors

---

## Implementation Plan

### Phase 1: Dependencies
- Install `react-markdown` and `remark-gfm` for markdown parsing
- Verify existing chart dependencies (mermaid, react-vega, vega-embed)

### Phase 2: Utility Functions
- Create `/src/lib/utils/chart-sanitization.ts`
  - Mermaid sanitization (remove parentheses in brackets)
  - Vega-Lite JSON extraction and validation
- Create `/src/lib/utils/chart-download.ts`
  - Mermaid: SVG export (native) and PNG export (canvas conversion)
  - Vega-Lite: PNG export (native) and SVG export (native)

### Phase 3: Core Components
- Create `/src/components/ai/ChartContainer.tsx`
  - Collapsible container with themed styling
  - Toolbar with "View Code" and "Download" dropdown
  - Error boundaries for failed renders
  - Integration with MermaidChart and VegaChart
- Create `/src/components/ai/MessageContent.tsx`
  - Markdown rendering with react-markdown
  - Custom code renderer for chart detection
  - Pass chart definitions to ChartContainer

### Phase 4: Integration
- Update `/src/components/ai/ChatMessage.tsx`
  - Replace plain text div with MessageContent component
  - Minimal changes (3 lines modified, 1 import)

### Phase 5: Testing
- Test various chart types (Mermaid flowcharts, Vega bar charts, etc.)
- Test error handling (invalid syntax, malformed JSON)
- Test theme switching (light/dark mode)
- Test download functionality (SVG/PNG for both types)
- Browser compatibility testing

---

## Technical Details

### Reference Implementation
Based on UserScript v0.24 ("Robust Mermaid"):
- Sanitization patterns (lines 274-279)
- Validation logic (lines 37-57)
- JSON extraction (lines 263-268)
- PNG conversion for Mermaid (lines 219-251)
- Error handling approach (lines 140-157)

### Architecture
```
ChatMessage (Modified - minimal changes)
  └── MessageContent (New - Raw AI component)
      ├── ReactMarkdown (Library)
      │   └── Custom Code Renderer
      │       └── ChartContainer (New - Raw AI component)
      │           ├── ChartToolbar
      │           ├── MermaidChart (Existing)
      │           └── VegaChart (Existing)
```

### Files Created (4 new)
1. `/src/lib/utils/chart-sanitization.ts` (~100 lines)
2. `/src/lib/utils/chart-download.ts` (~120 lines)
3. `/src/components/ai/ChartContainer.tsx` (~250 lines)
4. `/src/components/ai/MessageContent.tsx` (~100 lines)

### Files Modified (1)
1. `/src/components/ai/ChatMessage.tsx` (4 lines changed)

---

## Design Decisions

1. **Markdown Library:** `react-markdown` - Provides React components with custom renderers
2. **Chart Visibility:** Always visible by default, collapsible code view
3. **Download Options:** Dropdown menu with SVG/PNG choice for both chart types
4. **Code Display:** Simple monospace text (no syntax highlighting)
5. **Toolbar Position:** Above chart as header

---

## Dependencies

### New
- `react-markdown` - Markdown parsing
- `remark-gfm` - GitHub Flavored Markdown support

### Existing (Already Installed)
- `mermaid` - Dynamically imported in MermaidChart.tsx
- `react-vega`, `vega-embed` - Already in package.json

### UI Components (shadcn/ui)
- `@/components/ui/collapsible` - Code view toggle
- `@/components/ui/button` - Toolbar actions
- `@/components/ui/dropdown-menu` - Download format selection
- `lucide-react` - Icons (Code, Download, BarChart3, GitBranch, ChevronDown)

---

## Related Documentation

- [Plan File](../../.claude/plans/hazy-wiggling-star.md)
- [Vega-Lite Integration SOP](../sop/vega-lite-integration.md)
- [Project Architecture](../system/project_architecture.md)
- [Coding Patterns](../sop/coding_patterns.md)

---

## Notes

- Follows three-layer architecture pattern
- All styling uses CSS variables for theme compatibility
- Error handling based on UserScript v0.24 patterns
- Backward compatible with plain text messages
- No breaking changes to existing chat functionality
