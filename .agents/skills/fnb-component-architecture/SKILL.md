---
name: fnb-component-architecture
description: Use when adding or refactoring FNB Next.js pages, sections, providers, reusable components, service-page families, team views, media systems, or Server-Client component boundaries.
---

# FNB Component Architecture

## Core rule
Keep pages compositional, sections focused, primitives reusable, provider ownership explicit, and Server/Client boundaries intentional.

## Use when
- Adding FNB routes, sections, providers, reusable UI, team pages, service pages, media systems, or refactoring large React/Next.js files.

## Architecture rules
1. Follow the existing repository shape first. Do not force a `src/` migration if the Fable build uses root `app/` and `components/`.
2. Page files should mostly compose focused sections and provide metadata/data boundaries.
3. A section owns its layout and section-specific interaction; shared patterns move into reusable primitives only when genuinely reused.
4. Keep browser-only behavior inside Client Components. Keep static layout, metadata and non-interactive composition server-side when practical.
5. Do not duplicate service-page markup eight times; create reusable page/section families while allowing intentional visual variants.
6. Global capabilities belong in providers only when they truly need global scope.
7. Avoid one giant homepage/client component.
8. Keep business content/data separate from image filenames and presentation components.

## FNB-specific modules to prefer
- typed media registry;
- team data registry;
- services data registry;
- shared page hero/media primitives;
- route-safe navigation configuration.

## Reference
Read `reference.md` for the uploaded component organization and provider/SSR examples.
