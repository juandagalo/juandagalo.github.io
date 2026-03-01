# Copilot Review Instructions

## Project Overview

Personal portfolio site built with Astro 5, Tailwind CSS v4, and TypeScript (strict mode). Static output deployed to GitHub Pages.

## Architecture

- **Framework**: Astro 5 with static output
- **Styling**: Tailwind CSS v4 (CSS-first config via `src/styles/global.css`, not `tailwind.config`)
- **i18n**: Astro built-in routing with `en` (default, no prefix) and `es` locales
- **Components**: `.astro` single-file components in `src/components/`
- **Pages**: file-based routing in `src/pages/` (English) and `src/pages/es/` (Spanish)

## Code Review Checklist

### i18n

- All user-facing text must use the translation system via `useTranslations(lang)` from `@/i18n/utils`
- Translation keys must be defined in both `en` and `es` in `src/i18n/ui.ts`
- Never hardcode user-facing strings directly in components or pages
- Use `getRelativeLocaleUrl(lang, path)` for internal links

### Dark Mode

- All components must support dark mode using Tailwind `dark:` variants
- Dark mode uses class-based strategy (`dark` class on `<html>`)
- Verify sufficient contrast in both light and dark themes
- Background, text, border, and accent colors must all have `dark:` counterparts

### Tailwind CSS v4

- Use Tailwind v4 CSS-first configuration (no `tailwind.config.js`)
- Custom theme values go in `@theme {}` blocks in `src/styles/global.css`
- Plugins use `@plugin` directive, not JS config
- Dark mode variant is defined via `@custom-variant dark (&:where(.dark, .dark *))`

### TypeScript

- Strict mode is enforced
- Use the `@/*` path alias for imports from `src/`
- Type all props, parameters, and return values
- Use `as const satisfies` for type-safe constant objects

### Components

- Prefer CSS-only interactivity (checkbox hack, hover states) over client-side JS
- Use `is:inline` scripts only when JS is strictly necessary (e.g., theme toggle)
- Shared/reusable components go in `src/components/shared/`
- Layout components go in `src/components/layout/`

### Git & Workflow

- Follow conventional commits: `type(scope): description`
- Valid types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `ci`
- All changes go through PRs to `master` -- no direct pushes
- PRs must pass: `npm run lint`, `npx astro check`, `npm run test`, `npm run build`

### General

- No emojis in code, comments, or commit messages
- Keep components focused and small
- Avoid over-engineering: no abstractions for one-time operations
- Prefer editing existing files over creating new ones
