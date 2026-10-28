# Aedo — Cross-College Student Community Platform (MVP)

> **"Reach the people who have already done it."**

A college-verified network where students find and talk to people who have already achieved what they want, including seniors at top colleges and their own college's alumni, through goal-based search, direct requests, and short 1:1 meets.

---

## 🎨 Design System & Color Palette
Built strictly to match the requested design aesthetic:
- **Terracotta** (`#DE7356`): Primary brand color, key CTAs, highlights
- **Cream** (`#F4F3EE`): Background canvas, card interiors, warm tone
- **Charcoal** (`#1A1A1A`): Primary headings and typography
- **Gray** (`#B1ADA1`): Borders, muted icons, timestamps
- **Brown** (`#5A4535`): Deep earth-tone subtitles, top navigation banner
- **Gold** (`#E8D5B0`): Achievement badges, top helper recognition
- **Sand** (`#D4955A`): Secondary action buttons, tags, availability badges

---

## 🚀 Key Features Implemented

### 1. Simple, Smooth Authentication & College Domain Verification
- **Student Sign-Up / Log In** (`/login`): Verifies college email domains (e.g., `@iitb.ac.in`, `@dtu.ac.in`, `@bits-pilani.ac.in`, `@nitk.edu.in`, `@iiit.ac.in`, `@iitd.ac.in`).
- **Waitlist Flow**: Unrecognized college email domains trigger a friendly waitlist prompt (*"Your college isn't on the platform yet. Join the waitlist."*).
- **Alumni Verification**: Graduates with lapsed college emails can sign up with personal email and upload degree or ID proof for manual review.
- **1-Click Demo Persona Switcher**: Instantly test as **Rahul Sharma** (Seeker, DTU), **Arjun Mehta** (GATE AIR 120, IIT Bombay), or **Priya Nair** (SWE @ Google, BITS Pilani).

### 2. 4-Step Onboarding Flow (`/onboarding`)
- **Step 1: Basics**: College auto-filled from email, branch, degree, start/graduation year, auto-calculated student vs. alumnus role, home state.
- **Step 2: Goals (What I Want)**: Multi-select target goals + free-text inquiry.
- **Step 3: Achievements (What I've Done)**: Mandatory step powering search ranking. Add achievements with title, detail, year, proof link, plus short journey note (*"How I did it"*).
- **Step 4: Helping & Availability**: Toggle *"Open to help"*, select help topics, set weekly availability windows, and max weekly incoming request caps.

### 3. Goal-Based Search & Smart Ranking
- Search by goal (*"Crack GATE CSE"*, *"Get a Google Internship"*, *"MS abroad"*, *"Coding & DSA"*) rather than job titles.
- 6-factor weighted ranking formula: Goal match (40) + Recency (20) + Background match (15) + Responsiveness (10) + Helpfulness rating (10) + Weekly availability (5), with load-balancing protection against helper flooding.
- Filter by college, role, weekly availability, and same home state.
- Empty state with goal follow notifications.

### 4. Structured Request-First Connection Modal
- Prevents spam: direct messages require an accepted structured request.
- Fields: Topic, pre-filled student branch/year, specific question (30–300 characters), preferred mode (`Chat`, `15-min meet`, or `Either`).
- Daily outgoing cap: 5 requests per day.

### 5. Topmate-Style 1:1 Video Meet Booking (`/u/[username]`)
- Helper public booking profile with shareable URL (`/u/arjunmehta`, `/u/priyanair`).
- 15-minute and 30-minute session types (100% free in MVP).
- Auto-generates instant Jitsi video links: `https://meet.jit.si/aedo-<unique-id>`.
- Calendar `.ics` invite download simulation and post-meet feedback prompts.

### 6. Direct Messaging & Chat (`/messages`)
- Real-time simulated messaging between connected pairs.
- *"Request a Meet"* button in chat header.
- Safety options (Report spam, Block user).

### 7. Per-College Alumni Directory (`/colleges/[slug]/alumni`)
- Filter by graduation year, branch, company, and *"Open to mentoring"*.
- Featured *"Alumni from your college"* carousel on home screen.

### 8. Webinars & Open Q&A Sessions (`/events`)
- Host Webinars, Open Q&A AMAs, or Group Meets.
- Cross-college or single-college visibility.
- RSVP tracking and Jitsi video integration.

---

## 🛠️ How to Run Locally

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```
