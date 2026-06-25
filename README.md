# sportigy-arbree

Scaffolded with ⚒️ **Nexstruct**

## Stack

- **Framework:** Next.js 15 + TypeScript
- **UI Library:** shadcn
- **State Management:** zustand
- **API Layer:** fetch
- **Auth:** none
- **Forms:** react-hook-form

## Getting Started

```bash
npm install
npm run dev
```

## Cleanup

When you're ready to remove example/demo files:

```bash
npm run cleanup
```

## Conventions

Files follow the `[name].[category].ts` naming convention:

| Extension | Type |
|-----------|------|
| `.component.tsx` | UI components |
| `.store.ts` | State management |
| `.api.ts` | API layer |
| `.hook.ts` | React hooks |
| `.service.ts` | Auth/services |
| `.util.ts` | Utilities |
| `.type.ts` | TypeScript types |
| `.provider.tsx` | Context providers |

## Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
│   ├── ui/       # Base UI primitives
│   └── common/   # Common components (navbar, fields, etc.)
├── hooks/        # Custom React hooks
├── lib/          # Library configs & utilities
├── providers/    # Provider wrappers
├── store/        # State management
├── api/          # API layer
├── auth/         # Authentication
├── forms/        # Form handling
└── types/        # TypeScript types
```
