# Prospect Domain

Manages contact records owned by users. A prospect represents a person or lead that belongs to a specific user (owner).

## Responsibilities

- CRUD operations on contacts
- Ownership enforcement: users can only access their own contacts

## Child Subsystems

- **objects** - Contact types (Contact, ContactCreateInput, ContactUpdateInput)
- **repositories** - ContactRepository interface + Drizzle implementation
- **actions** - Pure business logic functions (ownership checks, delegation to repository)
- **services** - ContactService wiring actions with the Drizzle repository
