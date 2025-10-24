
## Epic 3: Real-time Communication & Manager Overview

**Expanded Goal:** This epic focuses on developing essential notification mechanisms to keep all users informed of booking statuses and changes, and providing managers with a comprehensive, real-time overview of bookings and resource utilization. This will enhance communication efficiency and enable proactive management of operations.

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
