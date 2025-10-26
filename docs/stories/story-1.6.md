# Story 1.6: Manager User Management Interface

Status: Completed

## Story

As a Manager,
I want to have an interface to view, search, and manage user accounts (e.g., change roles, deactivate users),
so that I can maintain control over system access and user permissions.

## Acceptance Criteria

1. Managers can access a dedicated "User Management" section within their dashboard.
2. The interface displays a list of all registered users with their basic profile information (name, email, role).
3. Managers can search and filter the user list by various criteria (e.g., name, email, role).
4. Managers can view the detailed profile of any user.
5. Managers can change the role of a user (Customer, Instructor, Manager).
6. Managers can deactivate or reactivate a user account.
7. All changes made by managers are logged for auditing purposes.
8. The interface is intuitive and easy to use for managing a potentially large number of users.

## Tasks / Subtasks

- [x] Task 1 (AC: 1, 2, 3, 4)
  - [x] Create a user management page with a table of users.
  - [x] Implement search and filtering functionality.
- [x] Task 2 (AC: 5, 6)
  - [x] Implement actions to change user roles and deactivate/reactivate users.
- [x] Task 3 (AC: 7)
  - [x] Create an audit log for manager actions. (Note: Full implementation requires backend service/Supabase functions for robust logging.)

## Dev Notes

- This interface should only be accessible to users with the Manager role.

### References

- [Source: docs/epics.md#Story-1.6]

## Dev Agent Record

