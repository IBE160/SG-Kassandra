## Epic 1: Core Platform Foundation & User Management
*   **Status:** **Story Breakdown Complete.**
*   **Estimated Story Count:** 7 stories (to be detailed)

### Story Breakdown (Initial)

**Story 1.0: Project Repository & CI/CD Setup**
*   **Goal:** Initialize the project repository and set up continuous integration/continuous deployment pipelines to ensure a robust development environment.
*   **Acceptance Criteria:**
    1.  A new Next.js project is initialized using `npx create-next-app@latest kiteops --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`.
    2.  The project is committed to a version control system (e.g., Git).
    3.  Basic CI/CD pipelines are configured for automated testing and deployment to a staging environment.
    4.  All necessary development dependencies are installed and configured.

**Story 1.1: User Registration & Login**
*   **Goal:** As a new user (Customer, Instructor, or Manager), I want to be able to securely register for an account and log in, so that I can access the platform's features relevant to my role.
*   **Acceptance Criteria:**
    1.  The system provides a clear and intuitive registration interface for new users.
    2.  Users can register using their email address and a secure password.
    3.  The system enforces strong password policies (e.g., minimum length, complexity).
    4.  Upon successful registration, a confirmation email is sent to the user's provided email address.
    5.  Users can securely log in using their registered email and password.
    6.  The system provides appropriate feedback for successful login, incorrect credentials, or locked accounts.
    7.  The system handles password reset functionality.
    8.  User data is stored securely and in compliance with GDPR (NFR001).

**Story 1.2: Role-Based Access Control (RBAC)**
*   **Goal:** As a system administrator (or manager with appropriate permissions), I want to define and assign specific roles (Customer, Instructor, Manager) to users, and as a user, I want to access only the functionalities and data permitted by my assigned role, so that the system maintains security and provides a tailored user experience.
*   **Acceptance Criteria:**
    1.  The system supports three distinct roles: Customer, Instructor, and Manager.
    2.  Upon registration, a default role (e.g., Customer) is assigned to new users.
    3.  Managers (or administrators) can view and modify user roles.
    4.  Access to specific features, modules, or data within the application is restricted based on the user's assigned role.
    5.  Users attempting to access unauthorized features are gracefully denied access and informed.
    6.  The UI adapts to display only the relevant menu items and functionalities for the logged-in user's role.
    7.  Role assignments are stored securely in the database.

**Story 1.3: Basic User Profile Management**
*   **Goal:** As a registered user, I want to be able to view and update my basic profile information (e.g., name, email, contact number), so that my personal details are accurate and up-to-date within the system.
*   **Acceptance Criteria:**
    1.  Users can access a dedicated "Profile" section or page after logging in.
    2.  The profile page displays the user's current name, email, and contact number.
    3.  Users can edit their name and contact number.
    4.  Changes to profile information are validated (e.g., valid phone number format).
    5.  Upon successful update, the system provides confirmation to the user.
    6.  Email address changes require a re-verification process (e.g., sending a confirmation link to the new email).
    7.  User profile data is stored securely and in compliance with GDPR.

**Story 1.4: Supabase Database & Auth Setup**
*   **Goal:** As a developer, I want to set up the Supabase database schema and integrate Supabase Authentication, so that the backend infrastructure supports user registration, login, role management, and secure data storage.
*   **Acceptance Criteria:**
    1.  A Supabase project is initialized and configured for the KiteOps application.
    2.  The necessary database tables (e.g., `profiles`, `roles`) are created with appropriate columns and relationships to support user profiles and role-based access.
    3.  Row-Level Security (RLS) policies are implemented for all sensitive tables to ensure data privacy and access control based on user roles.
    4.  Supabase Authentication is integrated, allowing for email/password sign-up and sign-in.
    5.  The application can successfully connect to the Supabase database and authentication services.
    6.  Basic CRUD operations (Create, Read, Update, Delete) for user profiles are functional via Supabase.
    7.  Environment variables for Supabase connection are securely configured.

**Story 1.5: User Password Management**
*   **Goal:** As a registered user, I want to be able to securely change my password after logging in, so that I can maintain the security of my account.
*   **Acceptance Criteria:**
    1.  Users can access a "Change Password" option within their profile or account settings.
    2.  The system requires the user to enter their current password before setting a new one.
    3.  The new password must meet the defined strong password policies.
    4.  The system provides appropriate feedback for successful password changes or errors (e.g., incorrect current password).
    5.  Upon successful password change, the user is notified (e.g., via email).
    6.  The system securely stores the new password (e.g., hashed).

**Story 1.6: Manager User Management Interface**
*   **Goal:** As a Manager, I want to have an interface to view, search, and manage user accounts (e.g., change roles, deactivate users), so that I can maintain control over system access and user permissions.
*   **Acceptance Criteria:**
    1.  Managers can access a dedicated "User Management" section within their dashboard.
    2.  The interface displays a list of all registered users with their basic profile information (name, email, role).
    3.  Managers can search and filter the user list by various criteria (e.g., name, email, role).
    4.  Managers can view the detailed profile of any user.
    5.  Managers can change the role of a user (Customer, Instructor, Manager).
    6.  Managers can deactivate or reactivate a user account.
    7.  All changes made by managers are logged for auditing purposes.
    8.  The interface is intuitive and easy to use for managing a potentially large number of users.

## Epic 2: Intelligent Booking & Scheduling Engine (MVP)
*   **Goal:** Implement the core calendar-based booking system, enable instructors to manage their availability, and integrate the initial rule-based intelligent scheduling engine.
*   **Status:** **Story Breakdown Complete.**
*   **Estimated Story Count:** 9 stories (to be detailed)

### Story Breakdown (Initial)

**Story 2.1: Instructor Availability Management**
*   **Goal:** As an Instructor, I want to be able to easily set and manage my availability for lessons on a calendar, so that the system accurately reflects when I am free to teach and prevents double-bookings.
*   **Acceptance Criteria:**
    1.  Instructors can access a dedicated "My Availability" section within their dashboard.
    2.  The interface displays a calendar view (e.g., weekly or monthly).
    3.  Instructors can select specific time slots on the calendar to mark themselves as available or unavailable.
    4.  Instructors can set recurring availability patterns (e.g., "available every Monday and Wednesday from 9 AM to 5 PM").
    5.  Instructors can block out specific dates or times for personal appointments or holidays.
    6.  Changes to availability are immediately reflected in the system and prevent new bookings during unavailable times.
    7.  The system provides visual confirmation of saved availability changes.

**Story 2.2: Customer Lesson Search & Filtering**
*   **Goal:** As a Customer, I want to be able to search for available kite lessons and filter them by criteria such as date, lesson type, and skill level, so that I can easily find a suitable lesson.
*   **Acceptance Criteria:**
    1.  The system provides a clear and accessible interface for searching lessons (e.g., on the public site or customer dashboard).
    2.  Customers can specify a desired date or date range for lessons.
    3.  Customers can filter lessons by type (e.g., beginner, intermediate, advanced).
    4.  Customers can filter lessons by required skill level.
    5.  The search results display available lesson slots, considering instructor availability and skill match.
    6.  The system provides clear feedback when no lessons match the search criteria.
    7.  The search and filter functionality is responsive and performs efficiently.

**Story 2.3: Customer Lesson Booking Confirmation**
*   **Goal:** As a Customer, after finding a suitable lesson, I want to be able to select it, review the details, and confirm my booking, so that my spot is secured and I receive confirmation.
*   **Acceptance Criteria:**
    1.  From the lesson search results, customers can select a specific lesson slot.
    2.  A clear summary of the selected lesson (date, time, instructor, price, location) is presented for review.
    3.  Customers are prompted to log in or register if they are not already authenticated.
    4.  Upon confirmation, the system processes the booking and reserves the slot.
    5.  The system provides immediate on-screen confirmation of the successful booking.
    6.  The booked lesson appears in the customer's "My Bookings" section.
    7.  The instructor's availability is updated to reflect the booked slot.

**Story 2.4: Rule-Based Intelligent Slot Suggestion**
*   **Goal:** As a system, I want to suggest optimal lesson slots to customers based on predefined rules (e.g., instructor skill, student skill, weather conditions, instructor load balancing), so that bookings are efficient, safe, and maximize resource utilization.
*   **Acceptance Criteria:**
    1.  The system integrates with an external weather API to retrieve real-time weather forecasts for lesson locations (NFR003), including parameters such as `min_wind_speed`, `max_wind_speed`, `preferred_directions`, `allow_precipitation`, `latitude`, and `longitude`.
    2.  When a customer searches for lessons, the system filters available slots based on:
        *   Instructor availability (from Story 2.1).
        *   Instructor's skill level matching the lesson type/student's skill level.
        *   Weather conditions (e.g., wind speed within acceptable range for the lesson type), applying **dynamic weighting for weather suitability based on the booking horizon (e.g., reduced or zero weight for bookings more than 1 week out, with skill match and load balancing taking precedence for longer-term bookings).**
    3.  The system prioritizes suggestions to balance instructor workload, considering factors such as **current hours booked and expertise**.
    4.  The suggested slots are presented clearly to the customer.
    5.  The rules for slot suggestion are configurable by a manager (e.g., acceptable wind ranges, instructor-to-student ratios).
    6.  The system provides a mechanism to handle scenarios where no optimal slots are found (e.g., suggest alternative dates or notify when slots become available).

**Story 2.5: Customer My Bookings View**
*   **Goal:** As a Customer, I want to be able to view a list of my upcoming and past booked lessons, so that I can keep track of my schedule and review my lesson history.
*   **Acceptance Criteria:**
    1.  Customers can access a dedicated "My Bookings" section within their customer portal.
    2.  The "My Bookings" section displays a clear list of upcoming lessons, including details such as date, time, instructor, lesson type, and status.
    3.  Customers can view details of past lessons.
    4.  The interface clearly distinguishes between upcoming and past lessons.
    5.  Each lesson entry provides a link or button to view more detailed information about that specific booking.
    6.  The view is responsive and easy to navigate on various devices.

## Epic 3: Real-time Communication & Manager Overview

**Expanded Goal:** This epic focuses on developing essential notification mechanisms to keep all users informed of booking statuses and changes, and providing managers with a comprehensive, real-time overview of bookings and resource utilization. This will enhance communication efficiency and enable proactive management of operations.
*   **Status:** **Story Breakdown Complete.**

### Story Breakdown

**Story 3.1: Booking Confirmation Notifications**

As a customer, I want to receive immediate email and in-app notifications upon successful booking, so that I have a record of my lesson details.

**Acceptance Criteria:**
1.  Email confirmation sent to customer with lesson details.
2.  In-app notification displayed to customer.
3.  Instructor receives notification of new booking.
4.  Manager receives notification of new booking.

**Story 3.2: Booking Change/Cancellation Notifications**

As a user (Customer, Instructor, Manager), I want to receive timely notifications when a booking is changed or cancelled, so that I am always aware of my schedule.

**Acceptance Criteria:**
1.  Email and in-app notifications sent to all affected parties (customer, instructor, manager) for changes/cancellations.
2.  Notifications clearly state the change and any required actions.

**Story 3.3: Manager Operational Dashboard**

As a manager, I want a comprehensive dashboard that provides a real-time overview of all active bookings, instructor availability, and key operational metrics, so that I can effectively monitor and manage the school's operations.

**Acceptance Criteria:**
1.  Dashboard displays current day's bookings.
2.  Dashboard shows instructor availability status.
3.  Key metrics (e.g., lessons booked, instructors available) are visible.
4.  Ability to filter dashboard view by date or instructor.

**Story 3.4: Real-time Updates for Booking Status**

As a user, I want to see real-time updates to booking statuses on my dashboard/calendar, so that I always have the most current information.

**Acceptance Criteria:**
1.  Booking status changes (e.g., confirmed, cancelled, rebooked) are reflected instantly on relevant user interfaces.
2.  Supabase Realtime client is effectively used for these updates.

**Story 3.5: Manager Initiated Schedule Adjustments**

As a manager, I want to be able to manually adjust or reassign lessons from the dashboard, so that I can respond to unforeseen circumstances (e.g., instructor illness, sudden weather changes).

**Acceptance Criteria:**
1.  Manager can select a booked lesson and reassign it to another available instructor.
2.  Manager can cancel a lesson.
3.  System prompts for notification to affected parties upon adjustment.
