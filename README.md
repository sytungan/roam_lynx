# Roam - LynxJS App

A modern LynxJS application with a well-organized folder structure, built with jotai for state management and React Query for data fetching.

## Project Structure

```
src/
├── assets/          # Static assets like images, fonts
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── providers/       # React context providers
├── screens/         # Screen components
├── services/        # API services and other external services
├── store/           # State management with jotai
├── translations/    # Internationalization files
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main application component
└── index.tsx        # Entry point
```

## Key Features

- **State Management**: Using jotai for lightweight and flexible state management
- **Data Fetching**: Using React Query for efficient API data fetching, caching, and state updates
- **Internationalization**: Multi-language support with a simple translation system
- **Component Library**: Reusable components with consistent styling
- **Theme Support**: Light and dark mode theming
- **TypeScript**: Full TypeScript support for better development experience

## Getting Started

1. Install dependencies:
   ```
   pnpm install
   ```

2. Start development server:
   ```
   pnpm dev
   ```

3. Build for production:
   ```
   pnpm build
   ```

## Dependencies

- LynxJS React
- jotai
- TanStack React Query

## License

MIT
