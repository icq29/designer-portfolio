# Figma -> HTML+CSS Playbook (MCP)

## Purpose

Reusable top-level workflow for transferring any section from Figma to `HTML+CSS` with a stable style mapping, so design updates are fast to sync into code.

## Scope

- Input: one Figma section/frame (`fileKey + nodeId`)
- Output: semantic HTML + maintainable CSS architecture + mapping table between design tokens and CSS variables/classes
- Tools: Figma MCP (`get_design_context`, `get_screenshot`, `get_metadata` when needed)

## 0) Working Agreement Before Coding

- Lock the source of truth: use one exact Figma node (`nodeId`) and one implementation path in the repo.
- Define update mode: "design-first" (code follows Figma) or "system-first" (Figma adapts to existing design system).
- Set acceptance criteria up front: visual parity, responsive behavior, and token coverage.

## 1) Extract Design Data via MCP

1. Parse Figma URL:
  - `fileKey`: value after `/design/`
  - `nodeId`: query param `node-id` (convert `-` to `:` when passing to tools if required by workflow)
2. Fetch context:
  - `get_design_context(fileKey, nodeId)`
  - `get_screenshot(fileKey, nodeId)`
3. If payload is large/truncated:
  - `get_metadata(fileKey, nodeId)`
  - split section into child nodes and fetch each child with `get_design_context`
4. Download all assets exactly from MCP-returned sources (icons, images, SVG).

## 2) Define Token Contract (Critical for Fast Future Updates)

Create a token contract before layout coding:

- **Color tokens** -> CSS variables (`--color-`*)
- **Typography tokens** -> CSS variables (`--font-`*, `--text-`*, `--line-*`, `--weight-*`)
- **Spacing tokens** -> CSS variables (`--space-`*)
- **Radius/shadow/border tokens** -> CSS variables (`--radius-`*, `--shadow-`*, `--border-*`)
- **Sizing/breakpoints** -> CSS variables where appropriate + media rules

Rules:

- Never hardcode values that exist in design tokens.
- One token name should represent one semantic purpose, not one random number.
- Preserve a direct "Figma token -> CSS token" mapping document.

## 3) Project CSS Structure (Recommended Baseline)

Use three layers:

1. `tokens.css` - only variables (design contract)
2. `base.css` - reset/base/typography defaults
3. `section-name.css` - section-specific styles (BEM or another consistent naming convention)

Minimum structure:

- `:root { ... }` for global tokens
- Optional theme scopes (`[data-theme="dark"] { ... }`)
- Section namespace class (example: `.case-hero`, `.case-hero__title`, `.case-hero__cta`)

## 4) HTML Strategy for Stable Styling

- Write semantic layout first (`section`, `header`, `h1-h6`, `p`, `ul/li`, `button`, `a`).
- Use predictable class naming (namespace + element + modifier).
- Keep DOM shallow and readable; avoid wrapper noise unless required by layout behavior.
- Separate structure classes from state classes (`is-active`, `is-disabled`, etc.).

## 5) Build Sequence (Per Section)

1. Skeleton HTML
2. Layout (display, flow, gap, align)
3. Spacing and sizing
4. Typography
5. Colors/backgrounds/borders/shadows
6. States (hover/focus/active/disabled)
7. Responsive behavior based on Figma constraints

At each step compare with screenshot from MCP, not by memory.

## 6) Mapping Artifact (Mandatory)

For each implemented section, keep a compact mapping artifact (in markdown near the section):

- Figma node: `nodeId`
- CSS namespace: `.section-name`
- Token map:
  - `Figma: color/Primary/500` -> `CSS: --color-primary-500`
  - `Figma: spacing/24` -> `CSS: --space-24`
  - `Figma: text/H2` -> `CSS: --text-h2-size`, `--text-h2-line`, `--text-h2-weight`
- Component map:
  - `Figma layer: CTA Button` -> `HTML: .section-name__cta`

This is the key artifact that makes redesign sync fast.

## 7) Update Workflow When Design Changes

1. Re-fetch changed node via MCP (`get_design_context`, `get_screenshot`).
2. Diff only three things first:
  - Token values
  - Layout constraints
  - Asset changes
3. Apply updates in this order:
  - Token variables
  - Shared classes
  - Section-specific classes
4. Run visual check against fresh screenshot.
5. Update mapping artifact and change log.

## 8) Quality Gates (Definition of Done)

- Visual parity with Figma screenshot at target breakpoints.
- No unmanaged hardcoded style values where tokens exist.
- Hover/focus/active/disabled states implemented.
- Assets loaded from approved sources.
- Mapping artifact updated and readable by another developer.

## 9) Anti-Patterns to Avoid

- Copy-paste raw generated code without adapting to project conventions.
- Inline styles for static design values.
- Random one-off spacing/color values that bypass token contract.
- Deep selector chains that couple CSS to fragile DOM nesting.
- Mixing multiple naming systems in one section.

## 10) Reuse Checklist (Copy for Any New Project)

- Figma URL parsed into `fileKey` + `nodeId`
- MCP context + screenshot fetched
- Token contract defined before styling
- Semantic HTML scaffolded
- Section CSS namespace applied
- Mapping artifact created (`Figma -> CSS`)
- Responsive + interaction states verified
- Final parity check done against screenshot

## Optional: Starter Naming Convention

- Colors: `--color-{role}-{scale}` (example: `--color-brand-600`)
- Spacing: `--space-{n}` (example: `--space-24`)
- Radius: `--radius-{sm|md|lg|xl}`
- Typography:
  - `--font-family-base`
  - `--text-body-size`, `--text-body-line`, `--text-body-weight`
  - `--text-h1-size`, `--text-h1-line`, `--text-h1-weight`

---

Use this playbook as a base template. Adapt naming to local project conventions, but keep the token contract + mapping artifact mandatory for maintainability.