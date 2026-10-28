# Aedo MVP - Architectural Decisions & Build Log

This document tracks implementation decisions made in accordance with the **Aedo MVP Build Spec (Cross-College Student Community Platform)** and user design directives.

## 1. Color Palette Implementation
The design strictly follows the user's bespoke color palette:
- **Terracotta** (`#DE7356`): Primary action buttons, badges, brand accents.
- **Cream** (`#F4F3EE`): Background warmth, soft containers, card fills.
- **Charcoal** (`#1A1A1A`): Primary headings, crisp typography, dark accents.
- **Gray** (`#B1ADA1`): Borders, muted captions, subtle dividers.
- **Brown** (`#5A4535`): Earth-tone secondary headers, body text contrast, top showcase bar.
- **Gold** (`#E8D5B0`): Achievement highlights, top helper tier badges.
- **Sand** (`#D4955A`): Secondary action buttons, tags, availability badges.

## 2. Founder's 6 Core Ideas Implementation

| # | Founder's Idea | Delivery in Aedo MVP | Spec Reference |
|---|----------------|----------------------|----------------|
| 1 | **Cross-College Student Network** | College email domain verification (`@iitb.ac.in`, `@dtu.ac.in`, `@bits-pilani.ac.in`, etc.). Verified badges on all profiles. No ranked college tiers. | 5.1, 5.2, 5.4, 5.11 |
| 2 | **Webinars & Group Meets** | Any verified user can host Webinars, Group Meets (up to 15), or Open Q&A AMA sessions. RSVP toggle and Jitsi video links. | 5.10, 5.14 |
| 3 | **Personal 1:1 Meets (Topmate-Style)** | Helpers set weekly availability windows. Seekers book 15 or 30-min slots with auto-generated Jitsi room links (`https://meet.jit.si/aedo-<id>`). Free in MVP (price ₹0). Shareable link at `/u/[username]`. | 5.7, 5.13 |
| 4 | **Per-College Alumni Directory** | Dedicated alumni directory at `/colleges/[slug]/alumni` with batch, company, and mentoring filters. Spotlight carousel on home screen. | 5.6 |
| 5 | **Senior Connect Across Colleges** | Any student can view full profiles from other colleges (achievements, journey notes, ratings) before sending a structured request or booking a meet. | 5.3, 5.4, 5.12 |
| 6 | **Goal-Based Search** | Search by goal (e.g. "Crack GATE", "Get Google Internship", "MS Abroad") instead of corporate job titles. Uses the 6-factor weighted ranking score formula. | 5.3 |

## 3. Request-First Connection Policy
- Direct messaging without a connection request is blocked.
- Senders must specify:
  1. Topic or Goal.
  2. Year and Branch (auto-filled).
  3. Specific question (min 30, max 300 characters).
  4. Preferred contact mode: `Chat`, `15-min meet`, or `Either`.
- Daily limit: 5 outgoing requests per user per day.
- Helpers have incoming weekly caps to prevent flood.

## 4. Interactive Showcase & Persona Switcher
To allow immediate end-to-end evaluation without requiring external database provisioning:
- **Rahul Sharma**: 2nd Year B.Tech CSE student at DTU (Seeker exploring GATE & internships).
- **Arjun Mehta**: Final Year B.Tech CSE at IIT Bombay (Helper, GATE CSE AIR 120, GSoC Contributor).
- **Priya Nair**: BITS Pilani Alumna, Software Engineer II at Google (Top Helper with 84 students helped).
- Users can switch instantly via the top navigation bar or create custom accounts via the Login / Sign Up and 4-step onboarding flow.

