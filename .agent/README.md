# .agent Documentation Index

Welcome to the Causaly 2026 documentation hub. This folder contains all critical information for engineers to understand and work with the codebase.

---

## 📂 Documentation Structure

```
.agent/
├── README.md                    # This file - documentation index
├── system/                      # System & architecture documentation
│   └── project_architecture.md  # Complete project architecture
├── sop/                         # Standard Operating Procedures
│   └── coding_patterns.md       # Detailed coding patterns & how-tos
└── tasks/                       # Feature specifications
    └── (PRDs & plans)           # To be added per feature
```

---

## 📚 Available Documentation

### System & Architecture

#### [project_architecture.md](system/project_architecture.md)
**Complete project architecture and technical overview**

**When to read:** First thing when joining the project, or when understanding overall system design

**Contains:**
- Project overview and goals
- Complete tech stack breakdown
- Detailed project structure
- Architecture principles (3-layer component model)
- Theme system architecture
- Visualization integration
- Component usage patterns
- Data flow diagrams
- Integration points (APIs, external services)
- Performance and security considerations
- Scalability guidelines

**Key Topics:**
- Next.js 16 App Router architecture
- Component layering (Routes → App Wrappers → Raw Libraries)
- Theme-first design with CSS variables
- Kibo UI, AI SDK, and visualization integration
- File organization and import rules

---

### Standard Operating Procedures (SOP)

#### [coding_patterns.md](sop/coding_patterns.md)
**Detailed coding patterns, procedures, and troubleshooting**

**When to read:** When implementing features, adding components, or troubleshooting issues

**Contains:**
- Before making changes checklist
- Adding new pages
- Adding shadcn/ui components
- Creating app wrappers (Kibo & AI)
- Creating custom visualizations (Vega-Lite & Mermaid)
- Extension guidelines
- Common patterns (cards, charts, forms)
- Troubleshooting guide

**Future SOPs:**
- How to add database models (when DB is added)
- How to create database migrations (when DB is added)
- How to write and run tests (when testing is set up)

---

### Tasks & Features

**Status:** To be created per feature

**Structure:**
Each feature should have:
- PRD (Product Requirements Document)
- Technical design
- Implementation plan
- Test plan

**Example:**
```
tasks/
├── user-authentication/
│   ├── prd.md
│   ├── design.md
│   └── implementation-plan.md
└── data-export/
    ├── prd.md
    ├── design.md
    └── implementation-plan.md
```

---

## 🎯 Quick Reference

### Quick Start for New Developers

1. **Start here:** [CLAUDE.md](../CLAUDE.md) - Quick reference for AI agents
2. **Understand system:** [project_architecture.md](system/project_architecture.md) - Complete architecture
3. **Learn patterns:** [coding_patterns.md](sop/coding_patterns.md) - Detailed how-to guides
4. **See examples:** `src/app/demo/` - Working demos of all components

### New to the Project?
1. Read [project_architecture.md](system/project_architecture.md) for complete overview
2. Review [CLAUDE.md](../CLAUDE.md) for quick reference
3. Study [coding_patterns.md](sop/coding_patterns.md) for implementation details
4. Check [package.json](../package.json) for dependencies
5. Look at demo pages in `src/app/demo/` for working examples

### Adding a New Feature?
1. Check if there's a task document in `tasks/`
2. Review architecture principles in [project_architecture.md](system/project_architecture.md)
3. Follow component layering rules
4. Use CSS variables for theming

### Need to Understand...?

#### **Component Architecture**
→ [project_architecture.md](system/project_architecture.md) - "Architecture Principles" section

#### **Import Rules**
→ [CLAUDE.md](../CLAUDE.md) - "Critical Import Rules" section
→ [coding_patterns.md](sop/coding_patterns.md) - Detailed examples
→ [project_architecture.md](system/project_architecture.md) - "Layered Component Architecture"

#### **Theme System**
→ [project_architecture.md](system/project_architecture.md) - "Theme-First Design" section
→ [src/styles/tokens.css](../src/styles/tokens.css) - CSS variable definitions

#### **API Integration**
→ [project_architecture.md](system/project_architecture.md) - "Integration Points" section
→ [src/app/api/chat/route.ts](../src/app/api/chat/route.ts) - Example API route

#### **Visualizations**
→ [coding_patterns.md](sop/coding_patterns.md) - "Creating Custom Visualizations" section
→ [project_architecture.md](system/project_architecture.md) - "Visualization Integration" section
→ [src/app/demo/viz/page.tsx](../src/app/demo/viz/page.tsx) - Working examples

#### **AI Features**
→ [project_architecture.md](system/project_architecture.md) - "AI Integration" section
→ [src/app/demo/ai/page.tsx](../src/app/demo/ai/page.tsx) - Working chat example

---

## 🔄 Documentation Maintenance

### When to Update Documentation

**project_architecture.md:**
- When adding major new dependencies
- When changing component architecture
- When adding new integration points
- When modifying theme system
- When adding new component layers

**SOP documents:**
- When establishing new best practices
- When solving common problems with a repeatable solution
- When onboarding reveals missing procedures

**Task documents:**
- When planning new features
- When documenting implementation decisions
- When creating technical designs

### How to Update

1. Make changes to relevant documentation files
2. Update this README.md if structure changes
3. Update "Last Updated" date at bottom of modified docs
4. Keep documentation DRY (Don't Repeat Yourself) - reference other docs when needed

---

## 📖 External Documentation

### Official Documentation
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Radix UI Docs](https://www.radix-ui.com/)
- [TanStack Table Docs](https://tanstack.com/table/)
- [AI SDK Docs](https://sdk.vercel.ai/docs)
- [Vega-Lite Docs](https://vega.github.io/vega-lite/)
- [Mermaid Docs](https://mermaid.js.org/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### Project-Specific Guides
- [CLAUDE.md](../CLAUDE.md) - Complete AI agent & developer guide
- [README.md](../README.md) - Project README and setup
- [src/styles/README.md](../src/styles/README.md) - Design tokens guide

---

## 🤝 Contributing to Documentation

### Guidelines
1. **Be clear and concise** - Documentation should be scannable
2. **Use examples** - Show, don't just tell
3. **Keep it updated** - Outdated docs are worse than no docs
4. **Link related content** - Help readers find what they need
5. **Follow structure** - Use the established patterns

### Documentation Style
- Use Markdown for all documentation
- Include code examples with syntax highlighting
- Add diagrams where helpful (Mermaid is available)
- Use emoji sparingly for visual organization (📂, 🎯, etc.)
- Keep line length reasonable (80-100 characters when possible)

---

## 📞 Questions or Issues?

If you can't find what you need in the documentation:
1. Check [CLAUDE.md](../CLAUDE.md) for additional context
2. Review demo pages in `src/app/demo/` for working examples
3. Search the codebase for similar patterns
4. Ask the team or create an issue

---

**Last Updated:** 2025-11-28
**Maintainers:** Development Team
**Version:** 1.0.0
