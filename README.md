# Travel Guide App

A mobile application built with **React Native + Expo** for exploring tourist places by city. The project is designed with a clean architecture approach and advanced software engineering practices to ensure scalability, maintainability, and testability.

---

## Features

- Clean architecture (hexagonal) with SOLID principles
- Dark/light theme with persistent state using Zustand + AsyncStorage
- Scalable design system with Tailwind CSS
- Offline support for city list using Zustand + AsyncStorage
- Advanced testing: unit, integration
- Local mock API using `json-graphql-server`
- State management with dependency injection via Zustand stores
- Continuous Integration with GitHub Actions

---

## Getting Started

### Prerequisites

- Node.js >= 22
- Expo CLI

### Installation

```bash
git clone https://github.com/damian-bolatti/travel-guide-app.git
cd travel-guide-app
npm install
```

### Run the App

- Start the Expo development server:

```bash
npx expo start
```

- Start the local mock API (GraphQL):

```bash
npm run start:api
```

- To run on specific platforms:

```bash
npm run android # ✅ Tested
npm run ios # ⚠️ Not tested
npm run web # ⚠️ Not tested
```

- Note: The application has been tested only on Android. iOS and Web support is expected but not officially tested.

---

## Project Structure

```bash
.
├── app/                    # Navigation and layout entry points (App Router)
│   ├── (stack)/            # Screens organized by stack groups
│   │   ├── cities/         # Screens related to cities
│   │   └── settings/       # Screens related to app settings
│   ├── _layout.tsx         # Layout definition for routing
│   ├── global.css          # Global styles
│   └── index.tsx           # Entry point of the app
├── assets/                 # Fonts and images
│   ├── fonts/              # Custom fonts used in the app
│   └── images/             # Static image assets
├── core/                   # Core domain and application logic
│   ├── domain/             # Domain layer (business logic)
│   │   ├── dtos/           # Data Transfer Objects for external/internal mapping
│   │   ├── entities/       # Domain entities
│   │   ├── mappers/        # Transformations between layers
│   │   ├── repositories/   # Repository interfaces (contracts)
│   │   └── usecases/       # Application use cases
│   ├── infrastructure/     # Implementation details of interfaces
│   │   ├── graphql/        # GraphQL queries
│   │   └── repositories/   # Repository implementations
│   ├── interface/          # Interface to external tools (Zustand stores)
│   └── utils/              # Shared utility functions
├── interface/              # UI layer
│   ├── components/         # UI components
│   ├── hooks/              # Custom React hooks
│   ├── screens/            # Screen-level components
│   ├── shared/             # Shared UI resources
│   └── theme/              # Theme configuration
├── __mocks__/              # Manual mocks for testing
├── __tests__/integration/  # Integration tests
├── .github/                # GitHub-specific configuration for Actions
```

---

## Scripts

```bash
npm run start             # Start Expo development server
npm run start:api         # Start local GraphQL mock API on port 4000
npm run android           # Run on Android emulator
npm run ios               # Run on iOS simulator
npm run web               # Run in browser
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
npm run lint              # Run ESLint
npm run format            # Format code with Prettier
```

---

## Testing

- **Unit Testing**: `jest-expo` + `@testing-library/react-native`
- **Integration Testing**: Component interaction with mocks and real behavior

```bash
npm test
```

---

## Mock API (GraphQL)

A mock GraphQL API is served using `json-graphql-server` with a `db.js` file:

```bash
npm run start:api
```

This simulates the backend and allows development/testing without a real API.

---

## Theme (Dark/Light)

- Configurable via Zustand store
- Stored persistently with AsyncStorage
- Tailwind-based styling system

---

## CI/CD

This project uses **GitHub Actions** for continuous integration. Tests are run automatically on every push to the `main` branch to ensure code quality and reliability.
