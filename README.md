# Foodie Fusion API

This project showcases the use of Domain-Driven Design (DDD) principles, TypeScript, and dependency injection for building a flexible and maintainable application. It emphasizes the separation of concerns between business logic and infrastructure components.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Domain-Driven Design (DDD)](#domain-driven-design-ddd)
- [Dependency Injection](#dependency-injection)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project demonstrates the implementation of DDD principles in a TypeScript application. It focuses on decoupling the business logic (domain) from infrastructure components (e.g., databases, APIs) to improve maintainability and flexibility.

## Technologies Used

- **TypeScript**: The project is written in TypeScript, providing type safety and enhanced developer experience.
- **Dependency Injection**: We use dependency injection to manage the application's components and their dependencies.
- **MongoDB**: For persistence, we support MongoDB as a data storage option.
- **Express**: The project uses Express.js for building web APIs.

## Folder Structure

The project follows a structured folder layout to organize different parts of the application:

- **Application Layer**: Contains use cases, services, and application-specific logic.
- **Domain Layer**: Defines the core domain entities, aggregates, and value objects.
- **Infrastructure Layer**: Contains implementation details for data storage, external services, etc.
- **Shared**: Houses shared code, DTOs, and cross-cutting concerns.
- **Tests**: Includes unit and integration tests for verifying the application's behavior.

## Domain-Driven Design (DDD)

DDD is a fundamental principle used to design the core domain of the application. It separates the domain logic from other concerns and places the focus on business rules and entities. In this project:

- Entities represent core domain objects with unique identities.
- Aggregates group related entities and ensure consistency.
- Value objects represent properties that do not have an identity but are still crucial for the domain.

## Dependency Injection

Dependency injection is used to manage component dependencies and achieve a loosely coupled architecture. We leverage a dependency injection container (e.g., InversifyJS) to:

- Register and resolve dependencies.
- Decouple business logic from infrastructure components (e.g., repositories).
- Facilitate unit testing and mocking.

## Usage

To run the application:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. configure your environment variables inside the root directory in the environments folder with dev.env and test.env, with the variables as in the .env.example file.
4. Start the application with `npm run dev`.
