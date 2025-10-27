# Story 2.1: Instructor Availability Management

**Status:** Ready

## Story

As an instructor, I need a calendar to set my teaching availability and block out personal time, ensuring students can only book lessons during approved slots.

## Acceptance Criteria

### 1. View Availability
- The instructor’s calendar view loads and displays all existing availability, blocked-out times, and bookings by default.
- A legend clearly explains the color-coding for different event types.

### 2. Add Availability
- The instructor can select a date or time range on the calendar to open an “Add Availability” modal.
- The modal includes fields for **Start Time** and **End Time**.
- The system validates that the **End Time** is after the **Start Time**.
- The instructor can optionally set a recurrence rule (e.g., repeats weekly until a specified end date).
- Upon saving, the new availability slot(s) appear immediately on the calendar, marked in green.

### 3. Block a Day
- The instructor can use a “Block Day” button to open a modal for selecting a date.
- After confirming, the entire day is immediately marked as unavailable (red) on the calendar.
- Any existing availability slots for that day are automatically removed to prevent conflicts.

### 4. Manage Recurrence
- When a recurring availability is created, the system generates all individual slots up to the recurrence end date.
- The instructor can select any slot in a recurring series and choose to edit or delete the entire series.

### 5. UI & Feedback
- A confirmation message (e.g., toast or banner) appears after successfully saving availability or blocking a day.
- The UI provides clear error messages for validation failures (e.g., "End time must be after start time") or save failures.
- Action buttons (e.g., "Save") are disabled during processing to prevent duplicate submissions.

### 6. Persistence and Data Ownership
- All availability and blocked-time entries are stored in the database and associated with the instructor’s unique `instructor_id`.
- The data reloads correctly each time the instructor visits their availability page.

## Tasks / Subtasks

- [ ] **Task 1: Calendar UI Setup**
  - [ ] Integrate a week-view calendar component (e.g., FullCalendar, DayPilot).
  - [ ] Implement “Add Availability” and “Block Day” buttons.
  - [ ] Style the calendar to display color-coded events according to the legend.

- [ ] **Task 2: Add Availability Modal**
  - [ ] Build the modal with time pickers and a recurrence type dropdown (None, Daily, Weekly).
  - [ ] Add a date picker for the recurrence end date.
  - [ ] Implement client-side validation for time and recurrence fields.

- [ ] **Task 3: Block Day Modal**
  - [ ] Create a simple modal with a date picker to select one or more days to block.

- [ ] **Task 4: Persistence and API Integration**
  - [ ] Create API endpoints to handle CRUD (Create, Read, Update, Delete) operations for availability.
  - [ ] Implement backend logic to expand recurring availability rules into individual timeslot records.
  - [ ] Configure Supabase RLS policies to ensure instructors can only access and manage their own data.

- [ ] **Task 5: UI Feedback & Validation**
  - [ ] Integrate a toast or banner library for displaying success and error messages.
  - [ ] Add logic to handle and display API-driven validation errors.
  - [ ] Implement loading states for all asynchronous actions.

- [ ] **Task 6: QA and Testing**
  - [ ] Write unit tests for business logic (e.g., recurrence expansion, conflict detection).
  - [ ] Conduct end-to-end testing to verify the user flow for adding, blocking, and managing availability.
  - [ ] Test edge cases, such as leap years for recurrence and timezone handling.

## Dev Notes

- **Tech Stack:**
  - **Frontend:** Next.js, React, TypeScript
  - **Backend:** Supabase (PostgreSQL, Auth, and API)
  - **Calendar Library:** FullCalendar.io is recommended for its robustness and feature set.

- **Data Model (Supabase Tables):**
  - `instructor_availability`:
    - `id` (bigint, primary key, auto-incrementing)
    - `instructor_id` (uuid, foreign key to `auth.users`)
    - `start_time` (timestamptz, not null)
    - `end_time` (timestamptz, not null)
    - `status` (text, not null - e.g., 'available', 'blocked', 'booked')
    - `recurrence` (text, optional - e.g., "RRULE:FREQ=WEEKLY;...")
    - `recurrence_end_date` (date, optional)
    - `created_at` (timestamptz, defaults to now())

- **Security:**
  - Row Level Security (RLS) will be enabled on the `instructor_availability` table.
  - Policies will ensure that a user can only perform actions (SELECT, INSERT, UPDATE, DELETE) on rows where the `instructor_id` matches their own `auth.uid()`.

- **UI Color Codes (Legend):**
  - **Green:** `#28a745` (Available)
  - **Red:** `#dc3545` (Blocked / Unavailable)
  - **Green (bordered):** `#28a745` with a `#218838` border (Confirmed Booking)
  - **Yellow:** `#ffc107` (Pending Booking Confirmation)
  - **Blue:** `#007bff` (Completed Lesson)
  - **Red (bordered):** `#dc3545` with a `#c82333` border (Canceled Booking)

### References

- [Source: docs/epics.md#Story-2.1]

## Dev Agent Record
