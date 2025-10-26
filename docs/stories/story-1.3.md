# Story 1.3: Basic User Profile Management

Status: Ready

## Story

As a registered user,
I want to be able to view and update my basic profile information (e.g., name, email, contact number),
so that my personal details are accurate and up-to-date within the system.

## Acceptance Criteria

1. Users can access a dedicated "Profile" section or page after logging in.
2. The profile page displays the user's current name, email, and contact number.
3. Users can edit their name and contact number.
4. Changes to profile information are validated (e.g., valid phone number format).
5. Upon successful update, the system provides confirmation to the user.
6. Email address changes require a re-verification process (e.g., sending a confirmation link to the new email).
7. User profile data is stored securely and in compliance with GDPR.

## Tasks / Subtasks

- [ ] Task 1 (AC: 1, 2)
  - [ ] Create a profile page.
  - [ ] Fetch and display user profile data.
- [ ] Task 2 (AC: 3, 4, 5)
  - [ ] Create an edit profile form.
  - [ ] Implement form validation.
  - [ ] Update profile information in the database.
- [ ] Task 3 (AC: 6)
  - [ ] Implement email change verification flow.

## Dev Notes

- Use Supabase to store user profiles.

### References

- [Source: docs/epics.md#Story-1.3]

## Dev Agent Record

