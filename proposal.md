## Case Title

KiteOps: Intelligent rule-based Booking System for Kite Schools

## Executive Summary

KiteOps is an intelligent, rule-based booking and management platform designed for kite schools. It streamlines the coordination of students, instructors, and managers by integrating real-time weather data, Instructor expertise, and automated scheduling logic. The system optimizes lesson allocation, minimizes manual coordination, and enhances the overall booking experience for customers and staff alike.

By leveraging AI-assisted recommendations and weather-aware scheduling, KiteOps reduces operational overhead and enables kite schools to offer more efficient, reliable, and personalized services.

## Background

Kite schools often face challenges in managing bookings, aligning Instructor schedules with weather conditions, and providing a smooth Customer experience. Existing tools are fragmented, requiring manual coordination between booking, communication, and weather monitoring. KiteOps aims to deliver an integrated, intelligent booking and management platform specifically tailored to the needs of kite schools.

## Purpose

Create a booking and management platform for kite schools where students can book courses and gear, while instructors and managers can efficiently handle scheduling, resources, and communication. The intelligent rule-based booking system optimizes schedules based on Instructor knowledge, student levels, and weather conditions.

## Target Users

- Students/customers booking lessons
- Instructors managing availability and lesson details
- School staff (Manager role initially) coordinating schedules, resources, and operations
- Administrators overseeing operations

## User Stories

1. As a Customer, I want to find instructors suited to my age and skill level and receive automatic updates if weather conditions change, so I can plan my day effectively.
2. As an Instructor, I want to manage my availability and access student details so I can prepare appropriate lessons. I also want to share my professional profile to build trust with clients.
3. As a school Manager, I want a clear overview of resources, schedules, and communications so I can minimize manual coordination and improve operational efficiency.

## Core Functionality

**Must Have (MVP)**

- Role-based access: Manager, Instructor, and Customer
- Secure user registration and login
- Calendar-based booking system
- Instructor-managed availability
- Intelligent scheduling engine that accounts for skill level, weather, and Instructor experience

**For Customer:**

- Account & Authentication:
  - Secure registration with email verification
  - Profile setup including name, age, skill level, and experience
- Booking System:
  - Intuitive search and filtering:
    - Skill level: Beginner / Intermediate / Advanced
    - Lesson duration (hours)
  - Real-time availability updates based on weather forecasts and Instructor calendars
  - Interactive calendar view for booking
  - Booking summary with date, time, and Instructor preview before confirmation
  - Automated booking confirmation via email/SMS
  - Automatic notifications for any changes, cancellations, or rebookings
- Dashboard:
  - Overview of upcoming and past lessons
  - Notifications and Instructor messages
  - General announcements from the school

**For Instructor:**

- Account & Authentication:
  - Secure registration with email verification
  - Profile setup including certifications, experience (Beginner / Intermediate / Advanced), IKO profile link, and availability preferences
- Dashboard:
  - Daily and weekly summary of lessons
  - Quick overview of assigned students and upcoming sessions
- Calendar Management:
  - Switch between weekly and monthly views
  - Add or modify personal availability
  - View all assigned courses and corresponding students
  - Clickable lesson entries showing:
    - Student details (skill level, experience, age, gender)
    - Lesson type, duration, and weather conditions
- Lesson Management:
  - Create bookings for new or existing students
  - Modify or rebook lessons directly from the calendar
  - Automatic visibility into student skill progression and feedback

**For Manager:**

- Account & Authentication
  - Manager-level registration with email verification and elevated permissions
- Calendar Overview:
  - Weekly and monthly calendar views with full visibility of instructors, students, and lesson details
  - Quick access to lesson, Instructor, and Customer profiles
  - Color-coded schedules for easy resource management
- Booking Management:
  - Add or edit bookings (new or existing students)
  - Rebook or reassign lessons based on weather or Instructor availability
  - Approve or modify Instructor-submitted availability

**Nice to Have (Optional Extensions)**

- AI-powered schedule optimization
- Extended roles: owner, receptionist, beach staff
- Payment integration for lessons and rentals
- Smart notifications and reminders
- Instructor profile pages with introductions and IKO links
- Instructor coupon codes and referral tracking
- Automated timetable messaging (pre-lesson and same-day updates)
- Automatic rebooking for no-wind conditions
- Integrated gear rental and inventory tracking
- Lesson packages and discounted bundles
- Waitlist management for fully booked sessions
- Chatbot assistant trained on historical FAQs and messages
- Automated review invitations
- Google Calendar synchronization
- Personalized recommendations by age, skill level, and preferences
- Financial dashboards for owners, managers, and instructors

## Data Requirements

**User Management:**

- Users: Managed by Supabase Auth (`auth.users` table) with user_id (UUID), email, encrypted_password, created_at, last_login
- User Profiles: user_id (FK to auth.users), role (Customer/Instructor/Manager/admin), full_name, phone_number, language_preference, profile_image_url, metadata (JSONB), created_at, updated_at
- Customers: customer_id, user_id (FK to auth.users), age, gender (optional), skill_level (beginner/intermediate/advanced), experience_hours, preferred_instructors (array), notes
- Instructors: instructor_id, user_id (FK to auth.users), certifications (array/JSON), experience_years, languages_spoken (array), IKO_profile_link, bio, coupon_code (optional), rating_average, total_lessons_taught, created_at, updated_at
- Managers: manager_id, user_id (FK to auth.users), school_name, contact_info (JSON), timezone, default_lesson_duration, permissions (JSON), created_at, updated_at

**Lesson & Booking:**

- Lessons: lesson_id, lesson_type (private/group/refresher/advanced), duration_hours, price, capacity, status (scheduled/completed/canceled/rebooked), created_at, updated_at
- Bookings: booking_id, customer_id (FK), instructor_id (FK), lesson_id (FK), manager_id (FK), scheduled_start, scheduled_end, status (pending/confirmed/completed/canceled/rebooked), weather_check_id (FK), payment_status (unpaid/paid/refunded), created_at, updated_at
- Waitlists: waitlist_id, lesson_id (FK), customer_id (FK), requested_date, status (waiting/notified/confirmed), created_at

**Scheduling & Automation:**

- Availability Calendar: availability_id, instructor_id (FK), date, time_slot_start, time_slot_end, status (available/booked/unavailable), auto_generated (boolean)
- Scheduling Rules: rule_id, parameter_type (skill_match/weather/time/instructor_load), threshold_value (numeric/JSON), priority_weight, active_status (boolean)
- Weather Logs: weather_check_id, timestamp, location (lat, lon), wind_speed, wind_direction, temperature, precipitation (boolean), source_api (e.g., OpenWeatherMap), data_payload (JSONB)

**Payments & Discounts:**

- Payments: payment_id, booking_id (FK), amount, currency, payment_method (stripe/paypal/onsite), transaction_id, payment_date, status (pending/completed/refunded)
- Discount Codes: coupon_id, instructor_id (FK, optional), code (unique), discount_percentage, valid_from, valid_to, usage_limit, used_count

**Notifications & Messaging:**

- Notifications: notification_id, recipient_id (FK to Users), type (booking_confirmation/rebooking_alert/lesson_reminder/system_update), message_title, message_body, delivery_method (email/sms/in_app), status (pending/sent/read), created_at
- Messages: message_id, sender_id (FK to Users), receiver_id (FK to Users), subject, body, related_booking_id (nullable FK), timestamp, read_status (boolean)

**Analytics & Reporting:**

- Performance Metrics: metric_id, instructor_id (FK), lesson_count, hours_taught, average_rating, cancellations, student_feedback_score, revenue_generated, generated_at
- Operational Reports: report_id, manager_id (FK), time_period, summary_data (JSON), export_type (PDF/CSV), generated_at

## Technical Constraints

### Scheduling Engine Logic

The rule-based scheduling engine operates on a weighted decision model considering three primary factors:

- **Skill Match** – Aligns student skill levels with Instructor expertise and certifications.
- **Weather Suitability** – Analyzes forecast data to select optimal lesson windows.
- **Instructor Load Balancing** – Distributes sessions evenly among available instructors.

If weather API data is unavailable, KiteOps uses cached forecasts or allows manual Manager override to maintain continuity.

See scheduling logic brainstorming: @docs/fase-1-analysis/brainstorming-session-results-scheduling-logic.md

- Must support GDPR-compliant data handling
- Must use encryption for all user and payment data
- Must integrate with weather APIs for real-time forecasts
- Must be responsive for desktop
- Must support role-based access control

## User Flows

Detailed userflows: @docs/fase-1-analysis/brainstorming-session-results-user-flows-detailed.md
Communication: @docs/fase-1-analysis/brainstorming-session-results-communication.md

### 1. Customer User Story Map (MVP - Guest Booking Only)

**Backbone:**

1.  Discover & Start Booking (as Guest)
2.  Find a Lesson
3.  Book a Lesson
4.  Manage Booking (via Email/Separate Page)
5.  Attend Lesson

### 2. Instructor User Story Map (MVP)

**Backbone:**

1.  Discover & Sign Up
2.  Set Up Profile
3.  Instructor Dashboard
4.  Calendar View
5.  Manage Availability
6.  View & Manage Lessons
7.  Handle Changes (Rebooking/Cancellations)
8.  Daily Overview

### 3. Manager User Story Map (MVP)

**Backbone:**

1.  Discover & Sign Up
2.  Kite School Settings
3.  Manager Dashboard
4.  Calendar Overview
5.  Manage Bookings
6.  Handle Rebooking Workflow
7.  Instructor Coordination
8.  View Customers
9.  Communication
10. AI Functionality (Nice-to-Have)

## Technical Specifications

### Frontend Specification

- **Framework**: Next.js 14+ with App Router for server-side rendering and optimal performance
- **Language**: TypeScript for type safety and better AI-assisted development
- **Styling**: Tailwind CSS for rapid, responsive UI development
- **Calender**: Next.js (with React and interactive calendar libraries such as React Big Calendar or FullCalendar).
- **Forms**: React Hook Form with Zod validation for robust form handling
- **Authentication UI**: Supabase Auth UI components + custom styling
- **Real-time Updates**: Supabase Realtime client for live booking system
- **API Communication**: Axios with interceptors for authenticated requests
- **Deployment**: Vercel for frontend hosting with automatic CI/CD

### Backend Specification

- **Framework**: FastAPI (Python) for high-performance RESTful API development
- **Language**: Python for AI integration compatibility and rapid development
- **Calender**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL) for managed database and real-time capabilities
- **Authentication**: Supabase Auth for built-in user management, JWT tokens, and email verification
- **Authorization**: Row Level Security (RLS) policies in Supabase + role-based middleware (Customer/Instructor/Manager roles)
- **AI Integration**: Model: Gemini 2.5 pro/flash +
  Library: Pydantic AI see research report: @docs/fase-1-analysis/research-technical-2025-10-31.md
- **Payment Processing**: Stripe API for subscription management and payment processing
- **Email Service**: Supabase Auth for authentication emails + SendGrid for custom transactional emails
- **Real-time Communication**: Supabase Realtime for live booking monitoring and updates
- **API Documentation**: FastAPI automatic OpenAPI/Swagger documentation
- **Testing**: Pytest for unit and integration tests
- **Build Tool**: UV for fast Python package management
- **Deployment**: Vercel (FastAPI supports Vercel deployment)
- **Weather API**: OpenWeatherMap API

See report: @docs/fase-1-analysis/research-technical-2025-10-29.md

## Success Criteria

### Success Criteria

- **Customers** can register, book lessons, and receive real-time weather-based updates.
- **Instructors** can manage availability, view schedules, and communicate with students.
- **Managers** can monitor operations and resource utilization efficiently.
- **System** provides faster, automated booking and communication compared to current manual workflows.

**Key Performance Indicators (KPIs):**

- ≥ 90% booking completion within three steps.
- ≥ 4.5/5 average user satisfaction from post-launch surveys.
- < 5% of bookings affected by weather conflicts after automation.

---

## Security & Compliance

- GDPR-compliant data handling and user consent tracking.
- All user and payment data encrypted in transit and at rest.
- Supabase Auth for secure authentication (JWT-based).
- Role-based access control ensures data visibility is limited by role.
- Optional Sentry integration for error monitoring.

## Timeline and Milestones

**Total Duration**: 5 weeks following BMAD-methodology (4-phase model)

This timeline follows the 4-phase model of the BMAD-methodology, where phases 1 and 2 are completed in 1 week, phase 3 in 2 weeks, and phase 4 in 2 weeks.

| Phase                                           | Duration | Week                                         | Focus                                                        |
| ----------------------------------------------- | -------- | -------------------------------------------- | ------------------------------------------------------------ |
| Phase 1 & 2: Analyze and Planning               | 1 week   | Week 44 _(calendar reference: late October)_ | Requirements analysis, stakeholder alignment, MVP definition |
| Phase 3: Solution Architecture and UI/UX Design | 2 weeks  | Week 45–46                                   | Database design, rule-based scheduling logic, UI/UX design   |
| Phase 4: Development and Deployment             | 2 weeks  | Week 47–48                                   | Implementation, testing, and deployment of the MVP           |

---

### Phase 1 & 2: Analyze and Planning (Week 44 _(calendar reference: late October)_)

**Lead Agents**: Product Manager (PM), Analyst  
**Supporting Agents**: UX Researcher, Technical Lead

**Activities**:

- Requirements gathering and stakeholder interviews (school managers, instructors, and customers)
- Analysis of existing kite school booking tools
- Competitive analysis (Airbnb, Treatwell, Mindbody)
- User research and persona creation for customers, instructors, and managers
- MVP scope definition and feature prioritization
- Risk assessment and mitigation strategy (weather API dependencies, Instructor availability)
- Initial architecture and project planning
- Budget and timeline validation

**Deliverables**:

- Requirements documentation and user personas
- Competitive analysis report
- MVP scope and prioritized backlog
- Risk register and mitigation strategies
- Project charter and resource allocation plan
- Initial Gantt/timeline chart

---

### Phase 3: Solution Architecture and UI/UX Design (Week 45–46)

**Lead Agents**: Technical Architect, UX Designer  
**Supporting Agents**: PM, Frontend Developer

#### Week 45: Solution Architecture

**Activities**:

- Database schema design (user, lesson, booking, weather, and notification tables)
- Definition of rule-based scheduling engine logic (weather, skill match, Instructor load)
- API endpoint design (RESTful structure with versioning)
- Technical stack validation (Next.js, Supabase, Tailwind, Python)
- Authentication and authorization flow (Supabase Auth with role-based control)
- Payment flow design (Stripe Checkout)
- Security architecture (JWT, role-based access control, encryption)
- Development environment setup and CI/CD pipeline configuration

**Deliverables**:

- Entity Relationship Diagram (ERD)
- API specification (Swagger/OpenAPI)
- System architecture diagrams (frontend, backend, integrations)
- Technology stack documentation
- Security and authentication flow documentation
- Development environment setup guide

#### Week 46: UI/UX Design

**Activities**:

- Information architecture and sitemap for each user type (Customer, Instructor, Manager)
- Wireframes for:
  - Landing and registration pages
  - Role-specific dashboards (Customer, Instructor, Manager)
  - Lesson booking and calendar management flows
  - Notification and messaging interfaces
- High-fidelity mockups and design system setup (Tailwind components)
- Responsive design breakpoints for mobile and desktop
- User flow diagrams for booking, scheduling, and rebooking
- Accessibility and usability checks

**Deliverables**:

- Complete wireframe and mockup set
- Interactive prototype for user testing
- UI style guide (colors, typography, spacing, iconography)
- Component library and layout documentation
- User flow diagrams for key interactions

---

### Phase 4: Development and Deployment (Week 47–48)

**Lead Agents**: Scrum Master, Developers (Frontend & Backend)  
**Supporting Agents**: QA Engineer, PM

#### Week 47: Core Development Sprint 1

**Day 1–2: Project Setup**

- Initialize project structure (Next.js + Supabase + Tailwind)
- Setup Supabase Auth and role-based access
- Implement registration/login for all roles (Customer, Instructor, Manager)
- Establish database tables and seed initial data
- Connect weather API (OpenWeatherMap)

**Day 3–5: Core Functionality**

- Build Customer booking workflow (search, availability, confirmation)
- Implement Instructor availability management and dashboard
- Implement Manager calendar and booking overview
- Configure intelligent scheduling logic (weather + Instructor match)
- Implement notifications and email confirmations

**Day 6–7: Testing & Refinement**

- Unit testing for API endpoints
- Integration testing for booking workflows
- Review data sync between roles
- Adjust UI consistency across dashboards

**Deliverables**:

- Working MVP with role-based login
- Functional booking system (with weather-based logic)
- Connected dashboards for all user roles
- Internal QA report

#### Week 48: Final Sprint and Deployment

**Day 1–3: Advanced Features**

- Implement messaging center between roles
- Add automated rebooking and weather alerts
- Integrate Stripe for test payments
- Build performance and activity dashboards (basic analytics)

**Day 4–5: Testing & QA**

- End-to-end testing (Customer–Instructor–Manager flows)
- Security and access validation (JWT and RBAC)
- Payment testing in Stripe test mode
- Responsive and browser compatibility testing
- Load and performance tests (target: 100 concurrent users)

**Day 6: Deployment Preparation**

- Setup production environment (Vercel + Supabase)
- Configure environment variables and secrets
- Migrate database and seed production data
- Connect error monitoring (Sentry or Logflare)
- Final code review and merge to main branch

**Day 7: Launch**

- Deploy production version
- Run smoke tests in production
- Finalize technical and user documentation
- Announce internal launch and prepare for onboarding

**Deliverables**:

- Fully functional, tested MVP in production
- Documentation (setup, API, user guides)
- Post-launch monitoring and feedback channels

---

### Post-Launch (Ongoing)

**Activities**:

- Collect user feedback and usage analytics
- Address bugs, hotfixes, and minor UX improvements
- Add performance dashboards and AI optimization (Phase 2+)
- Release minor features (Google Calendar sync, chat assistant)
- Continuous documentation updates
- Weekly retrospectives and improvement tracking

**Deliverables**:

- Post-launch report
- Feedback backlog
- Updated roadmap for next release cycle

---

### Monitoring and Logging

- Monitoring: Sentry or Logflare for error and performance tracking
- Logging: Supabase Log Drain or custom endpoint logging for event auditing

## Roadmap (Next 6–12 Months)

- **Phase 2:** AI-based Instructor assignment optimization
- **Phase 3:** Payment automation and gear rental module
- **Phase 4:** Multi-school management and franchise support
- **Phase 5:** Data-driven analytics and Instructor performance insights
  Git switch -c branch-name
