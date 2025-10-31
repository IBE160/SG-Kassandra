# ibe160 - Epic Breakdown

**Author:** BIP
**Date:** 2025-10-31
**Project Level:** 3
**Target Scale:** A single, mid-sized kite school with 5-15 instructors and up to 500 customers.

---

## Overview

This document provides the detailed epic breakdown for ibe160, expanding on the high-level epic list in the [PRD](./PRD.md).

Each epic includes:

- Expanded goal and value proposition
- Complete story breakdown with user stories
- Acceptance criteria for each story
- Story sequencing and dependencies

**Epic Sequencing Principles:**

- Epic 1 establishes foundational infrastructure and initial functionality
- Subsequent epics build progressively, each delivering significant end-to-end value
- Stories within epics are vertically sliced and sequentially ordered
- No forward dependencies - each story builds only on previous work

---

### Epic 1: Foundation & Core User Management

**Expanded Goal:**
This epic lays the complete groundwork for the KiteOps application. It establishes the frontend and backend project structure, sets up the database, and implements a robust authentication system for all three user roles. By the end of this epic, users will be able to securely register, log in, and manage their essential profile information, providing the necessary foundation for all future features.

**Story Breakdown:**

**Story 1.1: Project Scaffolding & Database Setup**
*   **As a** Developer, **I want to** set up the Next.js frontend, FastAPI backend, and Supabase database projects, **So that** we have a clean, organized, and connected foundation for the application.
*   **Acceptance Criteria:** 1. Next.js project is initialized. 2. FastAPI project is initialized. 3. Supabase project is created with initial user/profile tables. 4. Projects are connected to a Git repository.

**Story 1.2: User Registration**
*   **As a** new User, **I want to** create an account using my email and a password, **So that** I can get access to the KiteOps platform.
*   **Acceptance Criteria:** 1. A registration form is available. 2. A new user is created in Supabase Auth. 3. A corresponding profile is created with the correct role. 4. The user receives a verification email.

**Story 1.3: User Login & Logout**
*   **As a** registered User, **I want to** log in securely, **So that** I can access my role-specific information.
*   **Acceptance Criteria:** 1. A login form authenticates users. 2. Users are redirected to a placeholder dashboard on login. 3. Users can log out.

**Story 1.4: Role-Based Access Control (RBAC)**
*   **As the** System, **I want to** protect routes and data based on user roles, **So that** a Customer cannot access Manager-only pages.
*   **Acceptance Criteria:** 1. Frontend routes are protected. 2. Backend API endpoints validate the user's role. 3. Basic Row Level Security (RLS) is enabled on tables.

**Story 1.5: Customer Profile Management**
*   **As a** Customer, **I want to** view and edit my profile information, **So that** the school has my correct details.
*   **Acceptance Criteria:** 1. A profile page allows Customers to update their info. 2. Changes are saved to the database. 3. The form includes fields for name, age, gender (optional), skill level, and experience.

**Story 1.6: Instructor Profile Management**
*   **As an** Instructor, **I want to** complete my professional profile, **So that** managers can assign me appropriate lessons.
*   **Acceptance Criteria:** 1. A profile page allows Instructors to update their details. 2. Changes are saved to the database. 3. The form includes fields for name, bio, certifications, experience, spoken languages, and IKO profile link.

**Story 1.7: Profile Completion Guidance**
*   **As a** new User, **I want to** be prompted to complete my profile after my first login, **So that** the system has the data it needs.
*   **Acceptance Criteria:** 1. The system checks if a profile is incomplete on login. 2. If so, the user is redirected to their profile page.

---

### Epic 2: Instructor Availability & Manager Configuration

**Expanded Goal:**
This epic establishes the "supply side" and the "rules" of our marketplace. It empowers Instructors to define *when* they can teach and gives Managers the tools to define *what* can be taught and under *what conditions*. This is the critical setup required before any customer bookings can be intelligently handled.

**Story Breakdown:**

**Story 2.1: Calendar UI Foundation**
*   **As a** Developer, **I want to** integrate a robust calendar component into the frontend, **So that** we have a visual foundation for all schedules.
*   **Acceptance Criteria:** 1. A full-page calendar view is created. 2. It can display events. 3. Users can navigate between views (month, week, day). 4. It is responsive.

**Story 2.2: Instructor Availability Management**
*   **As an** Instructor, **I want to** add, edit, and delete my availability, including recurring schedules, **So that** the system knows when I can teach.
*   **Acceptance Criteria:** 1. Instructors can create/edit/delete availability blocks. 2. The form supports recurrence rules. 3. The system prevents overlapping availability. 4. Changes are reflected immediately on the calendar.

**Story 2.3: Instructor "Block Time"**
*   **As an** Instructor, **I want to** block off personal time, **So that** I am not booked for lessons.
*   **Acceptance Criteria:** 1. Instructors can create "Blocked" events. 2. Blocked time is visually distinct and treated as unavailable.

**Story 2.4: Manager Config - Lesson Types**
*   **As a** Manager, **I want to** create and manage my school's lesson types, **So that** they can be booked by customers.
*   **Acceptance Criteria:** 1. A settings page allows defining a lesson's name, duration, price, and capacity. 2. Managers can edit or deactivate lesson types.

**Story 2.5: Manager Config - Weather & Scheduling Rules**
*   **As a** Manager, **I want to** define my school's operational rules, **So that** the scheduling engine can make intelligent decisions.
*   **Acceptance Criteria:** 1. A settings page allows setting wind speed/direction rules. 2. Managers can define instructor qualifications needed for specific lesson types.

**Story 2.6: Manager Config - API Keys**
*   **As a** Manager, **I want** a secure place to enter external API keys, **So that** the system can connect to the weather API.
*   **Acceptance Criteria:** 1. A secure settings page exists for API keys. 2. The key is stored securely and used by the backend.

**Story 2.7: Manager View of All Calendars**
*   **As a** Manager, **I want to** view the calendars for all instructors, **So that** I have a complete overview of my team's schedule.
*   **Acceptance Criteria:** 1. The Manager's calendar can display events for all instructors. 2. A filter allows selecting specific instructors to view.

**Story 2.8: Manager Config - School Branding**
*   **As a** Manager, **I want to** upload my school's logo, **So that** the platform feels customized for my business.
*   **Acceptance Criteria:** 1. A settings page allows a Manager to upload an image file. 2. The uploaded logo is displayed on the main dashboards.

---

### Epic 3: MVP Booking with Manual Assignment

**Expanded Goal:**
This epic delivers the first core, revenue-generating workflow of the application. It allows a customer to find and book an available, weather-safe time slot. The system confirms the booking and places it in a queue for the Manager to manually assign the best instructor. This de-risks the initial launch by separating the complex auto-assignment logic into a later epic.

**Story Breakdown:**

**Story 3.1: Customer - Lesson Search & Filtering**
*   **As a** Customer, **I want to** search for available lessons by date, lesson type, and my skill level, **So that** I can find a suitable time to book.
*   **Acceptance Criteria:** 1. A public-facing booking page includes filters for date, lesson type, and skill level. 2. The system uses these filters to query for available time slots.

**Story 3.2: Backend - Availability & Weather Check**
*   **As the** System, **I want to** find all valid time slots by checking instructor availability and weather forecasts, **So that** I only show bookable options to the customer.
*   **Acceptance Criteria:** 1. The backend queries the database for instructor availability matching the date. 2. It calls the Weather API for the relevant time periods. 3. It filters out slots that conflict with the Manager's weather rules. 4. It returns a list of valid, available time slots.

**Story 3.3: Customer - View & Select Slot**
*   **As a** Customer, **I want to** see the available time slots on a calendar or list, **So that** I can choose the one that works best for me.
*   **Acceptance Criteria:** 1. The available slots returned from the backend are displayed visually. 2. The customer can select a single time slot to proceed with booking.

**Story 3.4: Customer - Booking Confirmation Screen**
*   **As a** Customer, **I want to** review all the details of my booking before I confirm it, **So that** I can be sure everything is correct.
*   **Acceptance Criteria:** 1. After selecting a slot, the user is taken to a summary screen. 2. The screen displays the selected lesson type, date, time, duration, and price. 3. A checkbox requires the user to agree to the school's policies.

**Story 3.5: Backend - Create Pending Booking**
*   **As the** System, **I want to** create a new booking record with a "Pending Assignment" status when the customer confirms, **So that** it can be processed by a Manager.
*   **Acceptance Criteria:** 1. A new record is created in the `bookings` table with a "Pending Assignment" status. 2. The selected time slot is now marked as unavailable for other customers.

**Story 3.6: Manager - Unassigned Bookings Queue**
*   **As a** Manager, **I want to** see a list of all new bookings that need an instructor assigned, **So that** I can process them efficiently.
*   **Acceptance Criteria:** 1. The Manager's dashboard has a section for "Pending Assignments". 2. This section lists all bookings with the "Pending Assignment" status.

**Story 3.7: Manager - Manual Instructor Assignment**
*   **As a** Manager, **I want to** assign an available and qualified instructor to a pending booking, **So that** the lesson can be confirmed.
*   **Acceptance Criteria:** 1. Clicking a pending booking opens an assignment interface. 2. The interface shows a list of available and qualified instructors. 3. The manager can select an instructor and confirm the assignment. 4. The booking status changes to "Confirmed".

**Story 3.8: Confirmation Notifications**
*   **As a** User (Customer, Instructor, Manager), **I want to** receive a notification once a booking is fully confirmed, **So that** I know it's locked in.
*   **Acceptance Criteria:** 1. When a booking is "Confirmed", a notification is triggered. 2. The Customer receives an email/SMS with the final details. 3. The assigned Instructor receives a notification. 4. The booking appears on the calendars of the Manager and the assigned Instructor.

---

### Epic 4: Automation & Intelligence

**Expanded Goal:**
This epic builds on the manual processes established in Epic 3 and delivers the "intelligent" part of the KiteOps vision. It automates the instructor assignment process to save managers time, implements the proactive weather-rebooking system to improve customer service, and provides all users with a dedicated dashboard to see the information that matters most to them.

**Story Breakdown:**

**Story 4.1: Intelligent Instructor Assignment Engine**
*   **As the** System, **I want to** automatically assign the best-matched instructor to a new booking based on manager-defined rules, **So that** managers no longer need to do it manually.
*   **Acceptance Criteria:** 1. The system auto-assigns a qualified instructor upon booking. 2. The assignment uses the Manager's configured rules. 3. The booking status is set to "Confirmed".

**Story 4.2: Customer Dashboard**
*   **As a** Customer, **I want** a personal dashboard, **So that** I can easily see my lesson history and notifications.
*   **Acceptance Criteria:** 1. The dashboard is the landing page after login. 2. It lists upcoming/past lessons. 3. It has a "Book New Lesson" button. 4. It includes a section for displaying notifications and messages.

**Story 4.3: Instructor Dashboard**
*   **As an** Instructor, **I want** a dashboard that summarizes my schedule and key info, **So that** I can manage my workday efficiently.
*   **Acceptance Criteria:** 1. The dashboard summarizes the daily/weekly schedule. 2. It shows a weather snapshot. 3. It includes key stats. 4. It includes a section for displaying notifications and messages.

**Story 4.4: Manager Dashboard**
*   **As a** Manager, **I want** a comprehensive dashboard for a full operational overview, **So that** I can monitor my business at a glance.
*   **Acceptance Criteria:** 1. The dashboard displays key operational metrics. 2. It has an "Action Items" section. 3. It summarizes instructor availability. 4. It includes a section for displaying notifications and messages.

**Story 4.5: Automated Weather Monitoring**
*   **As the** System, **I want to** periodically check the weather for all upcoming lessons, **So that** I can proactively identify at-risk bookings.
*   **Acceptance Criteria:** 1. A scheduled task runs periodically. 2. It compares forecasts against lesson rules. 3. It flags conflicting lessons as "Weather-Risk".

**Story 4.6: Automated Rebooking Workflow**
*   **As a** Customer, **I want to** be proactively notified with easy options when my lesson is impacted by bad weather, **So that** I don't have to call to reschedule.
*   **Acceptance Criteria:** 1. A notification is sent for "Weather-Risk" lessons. 2. It contains a link to a page with suggested alternative slots. 3. The customer can accept a new slot or cancel from that page.

**Story 4.7: Manager Rebooking Oversight**
*   **As a** Manager, **I want to** see and track all weather-risk lessons, **So that** I can intervene if a customer doesn't respond.
*   **Acceptance Criteria:** 1. The Manager's dashboard lists all "Weather-Risk" bookings. 2. The dashboard shows the status of the rebooking notification.

---

## Story Guidelines Reference

**Story Format:**

```
**Story [EPIC.N]: [Story Title]**

As a [user type],
I want [goal/desire],
So that [benefit/value].

**Acceptance Criteria:**
1. [Specific testable criterion]
2. [Another specific criterion]
3. [etc.]

**Prerequisites:** [Dependencies on previous stories, if any]
```
