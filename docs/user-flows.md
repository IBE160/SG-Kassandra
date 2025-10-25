# User Flows

This document outlines the user flows for the key features in the `ibe160` project.

---

## Flow 1: User Registration & Login

**Actor:** New or Returning User

**Goal:** To securely access their account or create a new one.

**Trigger:** User visits the application and is not logged in.

---

### Steps:

1.  **Landing Page:** User arrives at the site. The page presents options to "Log In" or "Sign Up".

2.  **User chooses "Sign Up":**
    a.  **Registration Form:** User is presented with a form asking for:
        *   Full Name
        *   Email Address (used for login)
        *   Password (with complexity requirements shown)
        *   Confirm Password
        *   User Role (e.g., "Customer" or "Instructor") - *Initial thought, might simplify to just "Customer" for MVP registration.*
    b.  **Validation:**
        *   Client-side validation provides real-time feedback on input (e.g., email format, password match).
        *   Server-side validation checks if the email is already registered.
    c.  **Submission:** User clicks "Sign Up".
    d.  **Confirmation:**
        *   **Success:** A confirmation email is sent to the user's email address. The UI informs the user to check their email to verify their account.
        *   **Failure (Email exists):** An error message is displayed: "An account with this email already exists. Please log in."

3.  **User chooses "Log In":**
    a.  **Login Form:** User is presented with a form asking for:
        *   Email Address
        *   Password
    b.  **Submission:** User clicks "Log In".
    c.  **Authentication:**
        *   **Success:** User is authenticated and redirected to their personalized dashboard (e.g., Customer Dashboard or Instructor Schedule).
        *   **Failure (Invalid Credentials):** An error message is displayed: "Invalid email or password."
        *   **Failure (Unverified Email):** A message is displayed: "Please verify your email address before logging in. Resend verification email?"

4.  **Post-Login:**
    *   The user's session is created.
    *   The UI updates to show the user's logged-in state (e.g., showing their name and a "Log Out" button).

---

## Flow 2: Basic User Profile Management

**Actor:** Logged-in User (Customer or Instructor)

**Goal:** To view and update their basic profile information.

**Trigger:** User navigates to their "Profile" or "Account" section from the main navigation.

---

### Steps:

1.  **Navigate to Profile:** User clicks on their name or a "Profile" link in the application's header or menu.

2.  **View Profile:**
    a.  The user is taken to their profile page.
    b.  The page displays their current information, such as:
        *   Full Name
        *   Email Address (read-only)
        *   Profile Picture (placeholder if not set)
        *   (For Instructors) Availability status, certifications, etc.
        *   (For Customers) Upcoming lessons, booking history, etc.

3.  **Initiate Edit:** User clicks an "Edit Profile" button.

4.  **Edit Mode:**
    a.  The profile fields that are editable (e.g., Full Name, Profile Picture) become input fields.
    b.  The user modifies the desired information.
    c.  The user can upload a new profile picture.

5.  **Submit Changes:**
    a.  User clicks a "Save Changes" button.
    b.  **Validation:** Client-side validation ensures the data is in the correct format.
    c.  **Confirmation:**
        *   **Success:** The system saves the new information. The page exits edit mode and displays the updated profile with a success message (e.g., "Profile updated successfully!").
        *   **Failure:** An error message is displayed if the update fails (e.g., "Failed to upload image.").

6.  **Cancel Edit:**
    a.  If the user clicks a "Cancel" button while in edit mode, the changes are discarded, and the profile page reverts to view mode.

---

## Flow 3: Customer Lesson Search & Filtering

**Actor:** Logged-in Customer

**Goal:** To find available lessons based on specific criteria.

**Trigger:** User navigates to the "Find a Lesson" or "Book a Lesson" page.

---

### Steps:

1.  **Initial View:**
    a.  The user lands on the search page.
    b.  A list of all available upcoming lessons is displayed by default, sorted chronologically.
    c.  Prominent filtering and search options are visible.

2.  **Filtering:**
    a.  The user interacts with filter controls. Available filters include:
        *   **Date Range:** From and To dates.
        *   **Time of Day:** Morning, Afternoon, Evening.
        *   **Instructor:** A multi-select dropdown of available instructors.
        *   **Lesson Type:** (e.g., Beginner, Intermediate, Wave Riding).
        *   **Location:** If there are multiple lesson locations.
    b.  As the user applies filters, the list of lessons updates in real-time.

3.  **Searching:**
    a.  A search bar allows the user to enter keywords (e.g., an instructor's name, a specific skill).
    b.  The lesson list dynamically filters as the user types.

4.  **Viewing Results:**
    a.  Each item in the results list is a "Lesson Card" containing key information:
        *   Lesson Title/Type
        *   Instructor Name & Profile Picture
        *   Date & Time
        *   Duration
        *   Price
        *   Remaining Slots
    b.  A clear "Book Now" or "View Details" button is on each card.

5.  **No Results:**
    a.  If no lessons match the criteria, a user-friendly message is displayed, e.g., "No lessons found. Try adjusting your filters."

6.  **Select a Lesson:**
    a.  The user clicks "Book Now" or "View Details" on a lesson card to proceed to the booking confirmation step (Flow 4).

---

## Flow 4: Customer Booking Confirmation

**Actor:** Logged-in Customer

**Goal:** To finalize and pay for a selected lesson.

**Trigger:** User clicks "Book Now" or "View Details" on a lesson from the search results page.

---

### Steps:

1.  **Lesson Details Review:**
    a.  The user is taken to a booking confirmation page.
    b.  This page displays a detailed summary of the selected lesson:
        *   Lesson Name, Date, Time, Location
        *   Instructor
        *   Number of people booking (default to 1, with option to change if group bookings are allowed)
        *   Detailed Description
        *   Cancellation Policy
    c.  A clear price breakdown is shown:
        *   Price per person
        *   Subtotal
        *   Taxes
        *   **Total Price**

2.  **Payment Information:**
    a.  The user is prompted to enter or confirm their payment details.
    b.  For a new user, a form will request credit card information (Card Number, Expiry, CVC).
    c.  For a returning user, they can select a saved payment method.
    d.  An option to "Save payment method for future use" is provided.

3.  **Confirm Booking:**
    a.  The user clicks a "Confirm & Pay" button.
    b.  The button might be temporarily disabled until all required fields are filled.

4.  **Processing:**
    a.  The system attempts to process the payment.
    b.  The system checks if slots are still available for the lesson to prevent double-booking.

5.  **Booking Confirmation:**
    a.  **Success:**
        *   The user is redirected to a "Booking Confirmed!" page.
        *   This page shows all the booking details, a thank you message, and information about what to expect next.
        *   A confirmation email and notification (in-app) are sent to the customer.
        *   The instructor is notified of the new booking.
    b.  **Failure (Payment Declined):**
        *   An error message is displayed on the payment form: "Your payment was declined. Please check your card details or try a different card."
    c.  **Failure (No Slots Left):**
        *   A message is displayed: "Sorry, this lesson was just booked by someone else. Please search for another lesson." The user is redirected back to the search page.

---

## Flow 5: Instructor Availability Management

**Actor:** Logged-in Instructor

**Goal:** To set and update their teaching availability.

**Trigger:** Instructor navigates to their "Availability" or "Calendar" section.

---

### Steps:

1.  **Navigate to Availability:** Instructor clicks on the "My Availability" or "Calendar" link in their dashboard.

2.  **Calendar View:**
    a.  A calendar interface is displayed (e.g., weekly or monthly view).
    b.  Existing available slots are clearly marked.
    c.  Booked lessons are also marked and are not editable.

3.  **Set New Availability:**
    a.  The instructorcan click on a date or time slot on the calendar.
    b.  A modal or form appears allowing them to:
        *   Set a recurring availability (e.g., "Every Monday from 9am to 5pm").
        *   Set a one-time availability for a specific date and time range.
        *   Define the types of lessons they can teach during that slot (e.g., "Beginner" only).
    c.  Instructor saves the new availability. The calendar view updates to reflect the changes.

4.  **Edit Existing Availability:**
    a.  Instructor clicks on an existing *unbooked* availability slot.
    b.  The same modal/form appears, pre-filled with the existing details.
    c.  The instructor can modify the time, date, or lesson types.
    d.  Instructor saves the changes.

5.  **Remove Availability:**
    a.  Instructor clicks on an existing *unbooked* availability slot.
    b.  A "Delete" or "Remove" button is present.
    c.  A confirmation prompt appears: "Are you sure you want to remove this availability? This will not affect already booked lessons."
    d.  Upon confirmation, the slot is removed from their availability, and the calendar updates.

6.  **Blocked-out Time:**
    a.  Booked lessons are visually distinct and cannot be edited or removed from the availability calendar (they must be managed as bookings).
    b.  This prevents instructors from accidentally creating conflicts.

---

## Flow 6: Customer Cancels a Booking

**Actor:** Logged-in Customer

**Goal:** To cancel a previously booked lesson.

**Trigger:** User navigates to their "My Bookings" or "Dashboard" and selects a booking to cancel.

---

### Steps:

1.  **Navigate to Bookings:**
    a.  User logs in and goes to their personal dashboard or a "My Bookings" page.
    b.  A list of their upcoming and past lessons is displayed.

2.  **Select Booking to Cancel:**
    a.  User finds the upcoming booking they wish to cancel.
    b.  User clicks a "Cancel" or "Manage Booking" button associated with that booking.

3.  **Review Cancellation Policy:**
    a.  The user is taken to a cancellation confirmation screen.
    b.  This screen clearly displays the details of the booking they are about to cancel.
    c.  Crucially, the **Cancellation Policy** is shown, explaining any potential refund or credit implications based on how far in advance the cancellation is being made (e.g., "Full refund if cancelled more than 48 hours in advance," "50% fee if cancelled within 24-48 hours," "No refund if cancelled with less than 24 hours notice.").

4.  **Confirm Cancellation:**
    a.  The user must check a box like "I understand the cancellation policy and wish to proceed."
    b.  A final "Confirm Cancellation" button is clicked.

5.  **Cancellation Processed:**
    a.  **Success:**
        *   The system processes the cancellation.
        *   Any applicable refund is initiated automatically.
        *   The user is shown a "Booking Cancelled" confirmation message.
        *   A cancellation confirmation email is sent to the customer.
        *   The instructor is notified that their slot has been freed up.
        *   The manager is notified of the cancellation.
    b.  **Failure:**
        *   If the cancellation cannot be processed for any reason (e.g., it's too close to the lesson time and manual approval is needed), a message explains the situation and provides contact information for support.

6.  **View Updated Bookings:**
    a.  The user is returned to their "My Bookings" list, where the cancelled lesson is now marked as "Cancelled" or removed from the upcoming list.

---

## Flow 7: Manager Views Instructor Schedules

**Actor:** Logged-in Manager

**Goal:** To view the schedules of all instructors to understand availability and bookings.

**Trigger:** Manager navigates to the "Instructor Schedules" or "Team Calendar" section of the Manager Dashboard.

---

### Steps:

1.  **Navigate to Schedules:**
    a.  Manager logs in and is taken to their main dashboard.
    b.  Manager clicks on a link for "Instructor Schedules".

2.  **Aggregated Calendar View:**
    a.  A master calendar is displayed, showing all instructors' schedules combined.
    b.  Each entry on the calendar is color-coded by instructor.
    c.  The view can be toggled between Daily, Weekly, and Monthly views.
    d.  Entries clearly distinguish between "Available" slots and "Booked" lessons.

3.  **Filtering and Searching:**
    a.  The manager can filter the calendar view by one or more instructors to reduce noise.
    b.  A date picker allows jumping to a specific date.
    c.  A search bar could allow searching for a specific customer's booking across all schedules.

4.  **View Booking Details:**
    a.  Manager can click on any booked lesson in the calendar.
    b.  A modal or pop-up appears showing the full details of that booking:
        *   Customer Name and Contact Info
        *   Instructor Name
        *   Lesson Type, Date, Time
        *   Booking Status (Confirmed, Cancelled, etc.)
        *   Payment Status

5.  **View Availability Details:**
    a.  Manager can click on an "Available" slot.
    b.  The pop-up shows the details of that availability:
        *   Instructor Name
        *   Time Range
        *   Lesson types the instructor can teach during that time.

6.  **Take Action (Future Scope):**
    a.  From this view, a manager might be able to perform actions like:
        *   Re-assigning a lesson to another instructor (with notifications).
        *   Contacting a customer directly.
        *   Blocking out a time slot for an instructor (e.g., for a meeting).
    b.  For MVP, this view is read-only. Actions are handled separately.

---

## Flow 8: Manager Operational Dashboard

**Actor:** Logged-in Manager

**Goal:** To get a high-level, real-time overview of the business operations.

**Trigger:** Manager logs into the application.

---

### Steps:

1.  **Landing Page:**
    a.  Upon login, the manager is presented with their operational dashboard.
    b.  The dashboard is composed of several widgets or cards, each displaying key information.

2.  **Key Metrics Widgets:**
    a.  **Today's Snapshot:**
        *   Number of bookings for today.
        *   Total revenue for today.
        *   Number of new customers today.
    b.  **Upcoming Week:**
        *   A chart showing bookings for the next 7 days.
        *   Projected revenue for the week.
    c.  **Instructor Status:**
        *   A list of all instructors and their current status (e.g., "Teaching", "Available", "Off-duty").
        *   Shows how many hours each instructor is booked for in the current week.

3.  **Real-time Activity Feed:**
    a.  A widget showing a live feed of important events as they happen:
        *   "New Booking: [Customer Name] booked a [Lesson Type] with [Instructor Name]."
        *   "Cancellation: [Customer Name] cancelled their lesson on [Date]."
        *   "New Customer: [Customer Name] just signed up."

4.  **Navigation from Dashboard:**
    a.  Each widget on the dashboard is a gateway to more detailed views.
    b.  For example, clicking on the "Instructor Status" widget will navigate the manager to the detailed "Instructor Schedules" view (Flow 7).
    c.  Clicking on a specific booking in the activity feed will open the details for that booking.

5.  **Customization (Future Scope):**
    a.  In a future version, managers could be able to rearrange, add, or remove widgets from their dashboard to suit their needs.
    b.  They could also change the date ranges for the metrics (e.g., "This Month" instead of "This Week").

---