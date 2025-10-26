# Story 1.2: Role-Based Access Control (RBAC)

Status: Completed

## Story

As a system administrator (or manager with appropriate permissions),
I want to define and assign specific roles (Customer, Instructor, Manager) to users, and as a user,
I want to access only the functionalities and data permitted by my assigned role,
so that the system maintains security and provides a tailored user experience.

## Acceptance Criteria

1. The system supports three distinct roles: Customer, Instructor, and Manager.
2. Upon registration, a default role (e.g., Customer) is assigned to new users.
3. Managers (or administrators) can view and modify user roles.
4. Access to specific features, modules, or data within the application is restricted based on the user's assigned role.
5. Users attempting to access unauthorized features are gracefully denied access and informed.
6. The UI adapts to display only the relevant menu items and functionalities for the logged-in user's role.
7. Role assignments are stored securely in the database.

## Tasks / Subtasks

- [x] Task 1 (AC: 1, 2, 7)
  - [x] Create a `roles` table in the database.
  - [x] Create a `user_roles` table to link users and roles.
  - [x] Assign a default role on user registration.
- [x] Task 2 (AC: 3)
  - [x] Create a user management interface for managers.
  - [x] Implement functionality to change user roles.
- [x] Task 3 (AC: 4, 5, 6)
  - [x] Implement middleware or route protection to restrict access based on roles.
  - [x] Dynamically render UI components based on user roles.

## Dev Notes

- Use Supabase for database and RLS for access control.

### References

- [Source: docs/epics.md#Story-1.2]

## Dev Agent Record

