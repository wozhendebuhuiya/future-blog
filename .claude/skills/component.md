---
name: component
description: Scaffold a new React component following project conventions (Tailwind CSS, TypeScript, folder structure)
---

# Component Skill

Generate a new React component that follows the project's existing conventions.

## Project Conventions

Before writing any component, first read one of the existing components to match the exact style (import pattern, naming, Tailwind usage):

- **Layout components**: `src/components/layout/`
- **Auth components**: `src/components/auth/`
- **Providers**: `src/components/providers/`
- **Pages**: `src/pages/`

## Component Template

Create components with this structure:

```tsx
import React from 'react';

interface ComponentNameProps {
  // Define props here
}

const ComponentName: React.FC<ComponentNameProps> = ({ ...props }) => {
  return (
    <div className="">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

## Key Conventions

1. **TypeScript interfaces** for props (not inline types)
2. **Default exports** for components
3. **Tailwind CSS classes** (no CSS modules or styled-components)
4. **React.FC<Props>** type annotation
5. Components go in `src/components/<category>/` (layout, auth, providers, or a new folder)
6. Pages go in `src/pages/`
7. Use `lucide-react` for icons (already installed)
8. Use `framer-motion` for animations (already installed)
9. Use `class-variance-authority` or `clsx` + `tailwind-merge` for variant-based styling

## Router

When creating a new page, also update `src/router/index.tsx` to add the route.
The project uses `react-router-dom` v7.

## When Creating

1. Ask the user for the component name and category
2. Read an existing similar component to match the exact coding style
3. Create the file in the correct directory
4. If it's a page, offer to update the router
