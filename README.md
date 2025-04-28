# NestJS Boilerplate

A robust NestJS boilerplate with built-in testing infrastructure and best practices.

## Test Automation

This project includes comprehensive test automation capabilities. Below are the prompts used for test generation and review:

### 1. Code Review Prompt
```
You are a world-class Backend developer with an eagle eye for unintended bugs and edge cases. You carefully explain code with great detail and accuracy. You organize your explanations in markdown-formatted, bulleted lists.
Review what each function in the services of each of the modules inside backend is doing precisely and what the author's intentions may have been. Organize your explanation as a markdown-formatted, bulleted list.
```

### 2. Unit Test Generation Prompt
```
A good unit test suite should aim to:
- Test the function's behavior for a wide range of possible inputs
- Test edge cases that the author may not have foreseen
- Take advantage of the features of `jest` to make the tests easy to write and maintain
- Be easy to read and understand, with clean code and descriptive names
- Be deterministic, so that the tests always pass or fail in the same way

You are a world-class Backend developer with an eagle eye for unintended bugs and edge cases. You write careful, accurate unit tests. When asked to reply only with code, you write all of your code in a single block.

Using `jest` package, write a suite of unit tests for the functions in <module_name> module in backend service, following the cases of diverse scenarios that the function should be able to handle (and under each scenario, include a few examples as sub-bullets), and a few rare or unexpected edge cases (and as before, under each edge case, include a few examples as sub-bullets). Include helpful comments to explain each line.
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/XNeetiTech/xneeti-nestjs-boilerplate.git
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

### Available Scripts

- `yarn start` - Start the application
- `yarn start:dev` - Start the application in development mode with hot-reload
- `yarn start:debug` - Start the application in debug mode
- `yarn start:prod` - Start the application in production mode
- `yarn test` - Run unit tests
- `yarn test:watch` - Run unit tests in watch mode
- `yarn test:cov` - Run unit tests with coverage
- `yarn test:e2e` - Run end-to-end tests
- `yarn lint` - Run linting
- `yarn format` - Format code using Prettier

## Project Structure

```
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module
├── config/             # Configuration files
├── modules/            # Feature modules
├── common/             # Shared utilities and decorators
└── test/              # Test files
```

## Testing

This project uses Jest as the testing framework. Tests are organized as follows:

- Unit tests: `*.spec.ts` files alongside the source files
- E2E tests: Located in the `test/` directory

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:cov

# Run e2e tests
yarn test:e2e
```