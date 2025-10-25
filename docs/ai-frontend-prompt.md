# AI Frontend Prompt for KiteOps Application

## 1. Project Overview & Tech Stack

You are tasked with building a full-stack web application called "KiteOps". This application is a management platform for a kite surfing school, designed to streamline scheduling, communication, and operations for managers, instructors, and customers.

**Technology Stack:**
*   **Framework:** React (Next.js is preferred if you can)
*   **Styling:** Tailwind CSS
*   **Authentication:** Supabase (specifically, use the pre-built `supabase-auth-ui` for all authentication forms)
*   **Icons:** Use a modern icon library like Heroicons or Lucide.

## 2. Global Design System

Implement the following design system across the entire application.

### 2.1. Color Palette

*   **Primary (Brand):** `blue-600` (`#2563EB`) - For primary buttons, links, and active navigation.
*   **Secondary (Accent):** `green-500` (`#22C55E`) - For success messages and confirmations.
*   **Neutral (Text/Background):**
    *   `gray-800` (`#1F2937`) - Main text, headings.
    *   `gray-600` (`#4B5563`) - Secondary text, subtitles, borders.
    *   `gray-100` (`#F3F4F6`) - Page backgrounds.
    *   `white` (`#FFFFFF`) - Card backgrounds, modal backgrounds.
*   **Semantic Colors:**
    *   **Danger/Error:** `red-600` (`#DC2626`)
    *   **Warning:** `yellow-500` (`#EAB308`)
    *   **Info:** `cyan-500` (`#06B6D4`)

### 2.2. Typography

*   **Font Family:** Use a system sans-serif stack. `Inter` is preferred.
*   **Type Scale (using Tailwind classes):**
    *   **H1:** `text-4xl font-bold`
    *   **H2:** `text-3xl font-semibold`
    *   **H3:** `text-2xl font-semibold`
    *   **H4:** `text-xl font-medium`
    *   **Body Large:** `text-lg`
    *   **Body Base:** `text-base`
    *   **Small:** `text-sm`
    *   **Extra Small:** `text-xs`

### 2.3. Spacing & Layout

*   **Base Unit:** Use an 8-point grid system (Tailwind's default spacing scale is perfect).
*   **Layout:**
    *   Main content width should be constrained with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
    *   Use a 12-column grid for layout components where necessary.
*   **Responsiveness:** The application must be fully responsive. Use Tailwind's default breakpoints (`sm`, `md`, `lg`, `xl`).
    *   **Mobile Navigation:** On mobile screens (`sm` and below), supplement the hamburger menu with a **Bottom Navigation Bar** for quick access to 3-5 of the most critical functions for that user's role.

## 3. Application Structure & Pages

The application has three main user-facing portals and a public marketing site.

### 3.1. Page Layouts

*   **Public Layout:** A simple layout with a header and a footer for marketing pages.
*   **App Layout (for logged-in users):** A dashboard-style layout featuring a persistent sidebar for navigation and a main content area. The header should contain user profile information and notifications.

### 3.2. Public Pages

*   **Home Page:** Marketing page with a hero section, features overview, and a call-to-action to "Book a Lesson".
*   **Login Page:** Use the `supabase-auth-ui` component with the "magic link" and "email/password" providers. Style it to match the application's color palette.
*   **Registration Page:** Also use `supabase-auth-ui`.

### 3.3. Customer Portal

*   **Dashboard:** Main view after login. Should contain:
    *   A "Welcome, {User Name}" message.
    *   A card-based list of "Upcoming Lessons".
    *   A section for "Notifications".
    *   A prominent "Book a New Lesson" button.
*   **Book a Lesson Page:**
    *   A multi-step form or a single page with filters.
    *   Filters for date, lesson type, and skill level.
    *   A calendar or list view showing available slots.
    *   Clicking a slot leads to a confirmation modal.
*   **My Bookings Page:**
    *   A tabbed interface with "Upcoming" and "Past" bookings.
    *   Bookings are displayed as cards with options to view details or cancel.

### 3.4. Instructor Portal

*   **Dashboard:**
    *   Overview of upcoming lessons for the day/week.
    *   A view of their own availability.
    *   Notifications for new bookings or cancellations.
*   **My Availability Page:**
    *   A calendar interface (weekly or monthly view) where the instructor can click to add/remove/edit their available time slots.

### 3.5. Manager Portal

*   **Dashboard:**
    *   High-level overview of all school operations.
    *   Key metrics (e.g., total bookings, instructor utilization).
    *   A list of all upcoming lessons for all instructors.
*   **Scheduling & Resources Page:**
    *   A master calendar view showing all instructor schedules.
    *   Ability to click on lessons to reassign them to another instructor.
    *   Tools to manually adjust instructor availability.
*   **Administration Page:**
    *   Simple user management table (view users, change roles).

## 4. Core Components

Build the following reusable components.

*   **Button:**
    *   **Variants:** `primary` (blue), `secondary` (white with border), `destructive` (red).
    *   **States:** `default`, `hover`, `focus`, `disabled`, `loading` (with a spinner).
*   **Input Field:**
    *   Standard text, email, password inputs.
    *   **States:** `default`, `focus`, `error` (with a red border and message), `disabled`.
*   **Card:**
    *   A container with a white background, rounded corners (`rounded-lg`), and a subtle shadow (`shadow-md`). Used for lessons, user profiles, etc.
*   **Modal:**
    *   A centered dialog with a backdrop overlay. Used for confirmations, forms, etc.
*   **Calendar:**
    *   A component to display dates.
    *   **States:** `default`, `selected`, `unavailable`, `hover`.
    *   Should allow navigation between months.
*   **Navigation:**
    *   **Header:** Contains the app logo and user menu (profile, settings, logout).
    *   **Sidebar (App Layout):** A vertical navigation bar with links to the different pages within a portal. The active link should be highlighted using the primary color.
    *   **Breadcrumbs:** Implement a breadcrumb component just below the header in the main content area on nested pages. It should follow the format: `Home > Portal > Page > Sub-page`.
*   **Notifications/Alerts:**
    *   Toast-style notifications for success, error, and info messages.

## 5. User Flow Implementation

### 5.1. Customer Booking Flow

1.  **Access & Search:** A customer logs in and from their dashboard, clicks a prominent "Book a Lesson" button. They are taken to the "Book a Lesson" page which features search filters for date, lesson type, and skill level.
2.  **View & Select:** Based on the filters, a calendar or list view displays available lesson slots. Slots that are booked or unavailable are clearly marked and disabled.
3.  **Review & Confirm:** Clicking an available slot opens a modal dialog displaying detailed lesson information (instructor, time, price). The user must log in or register at this point if they haven't already (use the Supabase Auth UI for this). After login, they can click a "Confirm Booking" button within the modal.
4.  **Confirmation:** Upon successful booking, the system shows a success toast notification ("Lesson Booked!"). The user is then redirected to their "My Bookings" page, where the newly booked lesson appears at the top of the "Upcoming" list.
5.  **Notifications:** The system should be designed to send proactive notifications (e.g., via email or an in-app notification center) for weather changes or if an instructor becomes unavailable, offering rebooking options.

### 5.2. Instructor Management Flow

1.  **Login & Dashboard:** An instructor logs in and lands on their dashboard. The dashboard displays a summary of their upcoming lessons for the day/week, a snapshot of their current availability, and a feed of recent notifications (new bookings, cancellations). An integrated weather forecast widget is also visible.
2.  **Manage Availability:** From the dashboard, the instructor navigates to the "My Availability" page. This page features a weekly calendar view.
3.  **Update Schedule:** The instructor can click on any day or time block in the calendar. This opens a modal where they can define or edit their availability for that period (e.g., set 9am-5pm as "Available"). Saving this change immediately updates the calendar view, visually showing the new available/unavailable blocks.
4.  **View Lesson Details:** From the dashboard's "Upcoming Lessons" list, an instructor can click on a lesson to view its details. This detail view includes student information and the ability to update the lesson's status (e.g., "Completed", "Cancelled").

### 5.3. Manager Operations Flow

1.  **Login & Overview:** The manager logs in to their dashboard, which provides a high-level overview of the entire school's operations. This includes key metrics (total bookings, revenue), a consolidated schedule of all instructor assignments, and a list of system-flagged potential conflicts (e.g., weather warnings, double-bookings).
2.  **Identify & Adjust:** The manager spots a weather conflict flagged by the system on the "Scheduling & Resources" page. They click on the flagged lesson in the master calendar view.
3.  **Resolve Conflict:** A modal or side panel appears, showing details of the conflict. The system suggests rule-based solutions, such as "Reassign to Instructor B" or "Move to 2 PM". The manager can accept a suggestion or manually choose a different instructor or time slot from available options.
4.  **Confirm & Notify:** After the manager approves the change, they click "Save". The system automatically sends notifications to all affected parties (the original instructor, the new instructor, and the customer) informing them of the schedule change. The master calendar view updates instantly to reflect the resolution.

This prompt provides a comprehensive guide. Please generate the full application based on these specifications.
