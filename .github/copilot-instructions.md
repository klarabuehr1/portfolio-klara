# Copilot Instructions

## Project

This is an Angular 21 portfolio template using TypeScript and SCSS. It is a **UI-only** project with no backend — all data is static or stored locally in the codebase (e.g. TypeScript constants or JSON files).

## Architecture

- No backend, no HTTP calls, no API integration
- All content (projects, skills, bio, etc.) is defined as static TypeScript data models in `src/app/data/`
- Use Angular `signal`s for state management, avoid NgRx or other state libraries
- Use Angular Router for navigation between sections/pages

## Coding style

- Use SCSS for all component styles
- Use standalone Angular components
- Follow Angular best practices and naming conventions
- Follow Google Code Style Guide for TypeScript
- Use `async`/`await` over `.subscribe()` where possible
- Keep components small and single-responsibility
- Use Angular `input()` and `output()` functions over `@Input()` and `@Output()` decorators

## File structure

- Shared/reusable components go in `src/shared/`
  - like header-component, footer-component, navbar, etc.
- Feature components go in `src/app/components/`
- Static data models and content go in `src/app/data/`
- TypeScript interfaces and types go in `src/app/models/`
- Resources like images and icons go in `src/assets/`
  - icons like GitHub, LinkedIn, etc. go in `src/assets/icons/`
  - images go in `src/assets/images/`

## Styling

- Always style components with SCSS, no inline styles in HTML files
- Use descriptive BEM-style classes for SCSS, avoid generic names like `.container` or `.box`
- Use SCSS variables for colors, fonts, spacing, and breakpoints — define them in `src/styles/`
- Support both light and dark mode using CSS custom properties
- Ensure the layout is fully responsive (mobile-first approach)

## General

- Always add types, avoid `any`
- Write descriptive variable and function names
- Prefer `const` over `let` where possible
