# IAM Domain

Owns the business definition of identity and access — who is the current user.

## Mental Model

IAM answers one question: "Who is making this request?" It defines the `User` type that other domains reference by ID, and provides `IamService.getCurrentUser()` as the single entry point for authentication.

## Responsibilities

- Define the canonical `User` and `Session` types
- Provide `getCurrentUser()` to resolve the authenticated user
- Abstract away the authentication provider (better-auth) behind a repository

## Child Subsystems

- **objects/** — `User`, `Session` type definitions
- **repositories/** — `UserRepository` interface + infrastructure implementations
- **services/** — `IamService` entry point for API layer

## Known Impurities

None. The `UserRepository` uses the React `cache`-wrapped `getSession()` internally, keeping HTTP details out of the domain interface.
