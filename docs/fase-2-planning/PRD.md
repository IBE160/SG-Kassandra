# ibe160 Product Requirements Document (PRD)

**Author:** BIP
**Date:** 2025-10-31
**Project Level:** 3
**Target Scale:** A single, mid-sized kite school with 5-15 instructors and up to 500 customers.

---

## Goals and Background Context

### Goals

*   **Streamline Operations:** Reduce the time spent on manual scheduling and coordination by at least 50%.
*   **Enhance Customer Experience:** Enable customers to book lessons in under 3 minutes and receive real-time updates.
*   **Optimize Resource Management:** Increase instructor utilization and reduce downtime due to weather.
*   **Drive Business Growth:** Increase revenue by 15% in the first year by optimizing bookings and reducing cancellations.

### Background Context

Kite schools operate in a dynamic environment where unpredictable weather makes scheduling a major challenge. The current process for managing bookings, instructors, and students is often manual, fragmented, and inefficient. This results in significant administrative overhead, scheduling conflicts, and a frustrating experience for both customers and staff.

KiteOps aims to solve this by providing a centralized, intelligent platform. It will automate the complex scheduling logic by integrating real-time weather data, instructor availability, and student needs. This will empower school managers to optimize their operations, allow instructors to easily manage their schedules, and provide customers with a seamless, reliable booking experience.

---

## Requirements

### Functional Requirements

**User Management & Authentication**
*   **FR001:** The system shall provide users with the ability to register for an account with roles for Customer, Instructor, and Manager.
*   **FR002:** The system shall provide all users with the ability to log in and out securely.
*   **FR003:** The system shall enforce role-based access control for all features.
*   **FR004:** The system shall provide Managers with the ability to manage user accounts.
*   **FR005:** The system shall provide Instructors with the ability to create and manage their professional profile.
*   **FR006:** The system shall provide Customers with the ability to create and manage their profile.
*   **FR007:** The system shall redirect users with incomplete profiles to the profile completion page after login.

**Guest & Customer Booking**
*   **FR008:** The system shall provide unregistered guests with the ability to book a lesson.
*   **FR009:** The system shall provide Customers with the ability to search for lessons.
*   **FR010:** The system shall display available time slots based on instructor availability and weather forecasts.
*   **FR011:** The system shall provide Customers with a booking summary for review before confirmation.
*   **FR012:** The system shall require Customers to accept school policies before confirming a booking.
*   **FR013:** The system shall send a confirmation notification upon booking.
*   **FR014:** The system shall send automated lesson reminders to customers.
*   **FR015:** The system shall provide a manual booking request option if no slots are available.
*   **FR016:** The system shall temporarily lock a selected time slot during booking to prevent conflicts.

**Dashboards & Notifications**
*   **FR017:** The system shall provide Customers with a dashboard to view their lesson history.
*   **FR018:** The system shall send all Customer-facing notifications via external channels (email/SMS).
*   **FR019:** The system shall use the dashboard as the primary notification source for Managers and Instructors.

**Scheduling & Availability**
*   **FR020:** The system shall include an intelligent scheduling engine with configurable rules and fallback logic.
*   **FR021:** The system shall automatically assign the best-matched instructor to a booking.
*   **FR022:** The system shall provide Instructors with the ability to manage their availability, including recurring schedules.
*   **FR023:** The system shall provide Instructors with the ability to block off personal time.
*   **FR024:** The system shall prevent and alert users to scheduling conflicts.
*   **FR025:** The system shall provide Managers with the ability to approve or modify instructor-submitted availability.

**Instructor & Manager Features**
*   **FR026:** The system shall provide Instructors with a dashboard summarizing their schedule and stats.
*   **FR027:** The system shall provide Instructors with the ability to manage lessons manually.
*   **FR028:** The system shall provide Instructors with visibility into student feedback.
*   **FR029:** The system shall provide Managers with a dashboard for operational oversight.
*   **FR030:** The system shall provide Managers with a master calendar view with filtering.
*   **FR031:** The system shall provide Managers with the ability to manage all bookings and assignments.
*   **FR032:** The system shall provide Managers with a central customer database with private notes.

**Manager Configuration**
*   **FR033:** The system shall allow Managers to configure lesson types (price, capacity).
*   **FR034:** The system shall allow Managers to configure the scheduling engine's rules.
*   **FR035:** The system shall allow Managers to configure school-wide weather parameters.
*   **FR036:** The system shall allow Managers to upload a school logo.
*   **FR037:** The system shall provide a secure area for Managers to manage external API keys.

**Communication & Rebooking**
*   **FR038:** The system shall automatically flag lessons impacted by bad weather.
*   **FR039:** The system shall provide Customers with a link to manage weather-related rebookings.
*   **FR040:** The system shall provide Managers with tools for broadcast and direct messaging.
*   **FR041:** The system shall notify Instructors of any changes to their submitted availability.

**System & Reliability**
*   **FR042:** The system shall cache weather data as a fallback.
*   **FR043:** The system shall provide Managers with the ability to manually override weather-based restrictions.
*   **FR044:** The system shall alert Managers of weather API failures.

### Non-Functional Requirements

*   **NFR01: Performance:** The booking process for customers must be completed in under 3 minutes. The instructor schedule and manager dashboard must load in under 3 seconds.
*   **NFR02: Security:** All user data, especially personal information and passwords, must be encrypted at rest and in transit. The system must be GDPR compliant.
*   **NFR03: Usability:** The user interface for all roles must be intuitive and require minimal training. Instructors must be able to manage their availability with no more than 2 clicks.
*   **NFR04: Reliability:** The system should have an uptime of 99.5% and the weather data should be refreshed at least every hour.

---

## User Journeys

**Journey 1: The Customer's Booking Experience (The Happy Path)**

1.  **Discovery:** A new customer, Alex, finds the kite school's website and clicks "Book a Lesson".
2.  **Search:** Alex, an intermediate kiter, searches for a private lesson for the upcoming Saturday. The system displays several available time slots, automatically filtering out times with unsuitable weather forecasts.
3.  **Selection:** Alex chooses a 2-hour slot in the afternoon. The system shows that a qualified instructor, Jane, is available.
4.  **Confirmation:** Alex reviews the booking summary (time, instructor, price, and a "Good" weather forecast) and confirms the booking after accepting the cancellation policy.
5.  **Notification:** Alex immediately receives an email confirmation with all the lesson details. Instructor Jane and the School Manager are also notified.

**Journey 2: The Weather Rebooking Scenario (A Common Edge Case)**

1.  **Forecast Change:** The day before Alex's lesson, the forecast changes, and the wind is now predicted to be dangerously high.
2.  **System Flag:** The KiteOps system automatically detects the conflict and flags Alex's lesson as "at risk".
3.  **Manager Alert:** The School Manager is alerted on their dashboard about the weather conflict.
4.  **Automated Suggestion:** The system identifies the next available suitable slot for both Alex and Instructor Jane, which is Sunday morning.
5.  **Customer Action:** Alex receives an automated email explaining the situation and proposing the new time. The message includes a link where Alex can either accept the new time with one click, view other available slots, or cancel.
6.  **Resolution:** Alex accepts the new time. The system automatically updates the calendar for everyone involved and sends a final confirmation.

**Journey 3: The Instructor's Weekly Management**

1.  **Availability:** On Monday, Instructor Jane opens her KiteOps dashboard. She sets her recurring availability for the next month and blocks off next Wednesday afternoon for a personal appointment.
2.  **New Booking:** Jane receives a notification on her dashboard about Alex's new booking for Saturday. She clicks on it to review Alex's profile, noting his intermediate skill level.
3.  **Daily Prep:** On Saturday morning, Jane checks her dashboard to see her schedule for the day. She sees her confirmed lesson with Alex and the favorable weather forecast, ready for the day.

**Journey 4: The Manager's Initial System Setup**

1.  **First Login:** A new School Manager, David, logs into KiteOps for the first time. He is automatically prompted to complete the initial school setup.
2.  **School Configuration:** David enters his school's name, location, and contact information. He also uploads the school's logo.
3.  **Define Lesson Types:** David defines the types of lessons his school offers (e.g., "Private Beginner," "Group Advanced"), setting the default duration and price for each.
4.  **Set Weather Rules:** David navigates to the weather settings and configures the operational wind speed range (e.g., 10-25 knots) and preferred wind directions for his location. This directly configures the intelligent scheduling engine.
5.  **System Live:** After saving the configuration, the system is now "live" and ready to accept bookings that adhere to these new rules. David is then redirected to his main dashboard.

---

## UX Design Principles

1.  **Efficiency First:** The platform's primary goal is to save time. All workflows, especially for instructors and managers, must be optimized for speed and clarity, minimizing clicks and cognitive load.
2.  **Clarity and Transparency:** Users should always have a clear, unambiguous understanding of schedules, booking status, and weather conditions. The system will prioritize showing, not telling.
3.  **Role-Specific Simplicity:** Each user role will have a unique, tailored dashboard that surfaces the most relevant information and actions for their specific needs.
    *   **For Customers:** The dashboard will focus on the next upcoming lesson and a clear call-to-action to book again.
    *   **For Instructors:** The dashboard will prioritize a simple, scannable list-view of the current day's schedule, especially for mobile.
    *   **For Managers:** The dashboard will feature a prominent "Action Items" or "Alerts" section at the top.
4.  **Responsive and Accessible:** The application will be designed for desktop but must be fully responsive and usable on mobile devices, as users will often access it on the go.

---

## User Interface Design Goals

*   **Clean and Modern:** The UI will have a clean, modern aesthetic using a design system built on **Tailwind CSS**. The focus will be on readability and intuitive navigation.
*   **Data-Rich Calendars:** The core of the UI will be interactive, color-coded calendars that provide rich, at-a-glance information about availability, bookings, and weather.
*   **Optimized for Mobile:** The calendar interface will be optimized for mobile, offering a simplified agenda or list view as the default on smaller screens to ensure readability and ease of use.
*   **Consistent Components:** The application will be built with a consistent set of UI components (forms, buttons, modals) to ensure a predictable and easy-to-learn user experience.
*   **Platform:** The application will be a responsive web app built on **Next.js**, ensuring a fast, modern user experience on any device.

---

## Epic List

**Epic 1: Foundation & Core User Management**
*   **Goal:** Establish the project infrastructure and allow all user types (Customer, Instructor, Manager) to register, log in, and manage their core profiles.
*   **Estimated Stories:** 8-10

**Epic 2: Instructor Availability & Manager Configuration**
*   **Goal:** Enable Instructors to manage their availability in the calendar and allow Managers to configure the core business rules of the school (lesson types, weather parameters, scheduling rules).
*   **Estimated Stories:** 7-9

**Epic 3: MVP Booking with Manual Assignment**
*   **Goal:** Launch the end-to-end customer booking flow where the system validates availability, but the final instructor assignment is a manual manager task.
*   **Estimated Stories:** 9-11

**Epic 4: Automation & Intelligence**
*   **Goal:** Introduce the intelligent auto-assignment engine, the automated weather-based rebooking workflow, and the role-specific dashboards.
*   **Estimated Stories:** 7-9

> **Note:** Detailed epic breakdown with full story specifications is available in [epics.md](./epics.md)

---

## Out of Scope

The following features and capabilities are explicitly **excluded** from the scope of the initial MVP. They have been identified as valuable future enhancements and will be prioritized for subsequent releases.

**Advanced AI & Automation (Future Innovations & Moonshots)**
*   **Predictive Operations:** Forecasting demand, instructor fatigue, or resource strain.
*   **Dynamic Learning Models:** Scheduling engines that learn and adapt over time based on lesson success or feedback.
*   **Autonomous Operations:** AI agents that run school logistics, handle approvals, or perform "self-healing" schedule changes without human intervention.
*   **Advanced Sentiment & Emotion Analysis:** Real-time tracking of user mood, or emotionally intelligent communication.
*   **Digital Twin Simulations** and **AR/VR Interfaces**.

**Payments & Commercial Features**
*   Direct payment processing for lessons or rentals.
*   Integrated gear rental and inventory tracking.
*   Creation and management of lesson packages or discounted bundles.
*   Instructor coupon codes or referral tracking.

**Extended User Roles & Features**
*   Additional user roles such as "Owner," "Receptionist," or "Beach Staff."
*   Public-facing instructor profile pages for marketing.
*   Waitlist management for fully booked time slots.
*   Google Calendar synchronization.

**Reporting**
*   Advanced financial dashboards and reporting.
