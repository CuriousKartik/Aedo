"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Award,
  Video,
  ArrowRight,
  GraduationCap,
  Calendar,
  MessageCircle,
  Bell,
  CheckCircle2,
  Users,
  Search,
  BookOpen,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import CreateEventModal from "@/components/CreateEventModal";

export default function HomePage() {
  const {
    currentUser,
    profiles,
    searchQuery,
    setSearchQuery,
    activeGoal,
    setActiveGoal,
    requests,
    bookings,
    events,
    toggleEventRsvp,
    followGoal,
    followedGoals,
  } = useApp();

  const [selectedCollege, setSelectedCollege] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [sameStateOnly, setSameStateOnly] = useState<boolean>(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState<boolean>(false);

  // Ranked Search Results computation (Section 5.3)
  const rankedHelpers = useMemo(() => {
    let list = profiles.filter((p) => p.openToHelp && p.id !== currentUser?.id);

    // Filter by college
    if (selectedCollege !== "all") {
      list = list.filter((p) => p.collegeName === selectedCollege);
    }

    // Filter by role
    if (selectedRole !== "all") {
      list = list.filter((p) => p.role === selectedRole);
    }

    // Filter by availability
    if (availableOnly) {
      list = list.filter((p) => p.weeklyAvailability.length > 0);
    }

    // Filter by same state
    if (sameStateOnly && currentUser?.homeState) {
      list = list.filter((p) => p.homeState.toLowerCase() === currentUser.homeState.toLowerCase());
    }

    // Query / Goal matching
    const query = searchQuery.trim().toLowerCase();
    const targetGoal = activeGoal.toLowerCase();

    return list
      .map((profile) => {
        let score = 0;

        // 1. Goal match (40 pts)
        const hasExactGoal = profile.achievements.some((ach) =>
          ach.title.toLowerCase().includes(query) ||
          ach.detail.toLowerCase().includes(query) ||
          (query && ach.category && ach.category.toLowerCase().includes(query))
        ) || profile.helpTopics.some((t) => t.toLowerCase().includes(query));

        const hasGoalFilter = targetGoal
          ? profile.helpTopics.some((t) => t.toLowerCase().includes(targetGoal)) ||
            profile.achievements.some((a) => a.title.toLowerCase().includes(targetGoal))
          : false;

        if (query) {
          if (hasExactGoal) score += 40;
        } else if (targetGoal) {
          if (hasGoalFilter) score += 40;
        } else {
          score += 20; // default baseline
        }

        // 2. Recency (20 pts)
        const latestYear = Math.max(...profile.achievements.map((a) => a.year || 2023), 2022);
        if (latestYear >= 2024) score += 20;
        else if (latestYear >= 2023) score += 15;
        else score += 10;

        // 3. Background match (15 pts: same college/branch)
        if (currentUser) {
          if (profile.collegeId === currentUser.collegeId) score += 8;
          if (profile.branch.toLowerCase().includes(currentUser.branch.toLowerCase().split(" ")[0])) score += 7;
          if (profile.homeState && profile.homeState === currentUser.homeState) score += 5;
        }

        // 4. Responsiveness (10 pts)
        score += (profile.stats.responseRate / 100) * 10;

        // 5. Helpfulness (10 pts)
        const helpfulnessScore = Math.min(10, (profile.stats.averageRating / 5) * 5 + (profile.stats.helpedCount / 10));
        score += helpfulnessScore;

        // 6. Availability (5 pts)
        if (profile.weeklyAvailability.length > 0) score += 5;

        return { profile, score, hasMatch: query || targetGoal ? hasExactGoal || hasGoalFilter : true };
      })
      .filter((item) => (query || targetGoal ? item.hasMatch : true))
      .sort((a, b) => b.score - a.score)
      .map((item) => item.profile);
  }, [
    profiles,
    searchQuery,
    activeGoal,
    selectedCollege,
    selectedRole,
    availableOnly,
    sameStateOnly,
    currentUser,
  ]);

  // Alumni from current user's college (Section 5.6)
  const alumniFromCollege = useMemo(() => {
    return profiles.filter(
      (p) =>
        p.role === "alumnus" &&
        p.collegeId === (currentUser?.collegeId || "col-dtu") &&
        p.id !== currentUser?.id
    );
  }, [profiles, currentUser]);

  // Pending user actions
  const pendingRequests = requests.filter(
    (r) => r.receiverId === currentUser?.id && r.status === "pending"
  );
  const upcomingMeets = bookings.filter((b) => b.status === "confirmed");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cream-100 via-cream-50 to-gold/20 border border-grayAccent-border/80 p-6 sm:p-10 shadow-soft">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-brown-600 border border-sand/40 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
            <span>A College-Verified Community Network</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-charcoal tracking-tight leading-tight">
            Reach the people who have{" "}
            <span className="text-terracotta relative">
              already done it.
              <svg
                className="absolute left-0 -bottom-1 w-full text-sand/40 -z-10"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M1 5.5C40 2 120 2 199 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-sm sm:text-base text-brown-500 leading-relaxed max-w-2xl">
            Instead of searching by job title or getting lost on generic platforms, search by <strong>specific goal</strong>. Talk to verified seniors from top colleges and your own alumni through structured requests and short 1:1 meets.
          </p>

          {/* Quick Stats / Highlights */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-charcoal font-medium">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-grayAccent-border">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% College Domain Verified</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-grayAccent-border">
              <Award className="w-4 h-4 text-terracotta" />
              <span>Achievement & Help Topics, No Job Titles</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-grayAccent-border">
              <Video className="w-4 h-4 text-sand" />
              <span>Free 1:1 Video Sessions</span>
            </div>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-sand/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Pending Actions (Alert Bar if any incoming requests / meetings) */}
      {(pendingRequests.length > 0 || upcomingMeets.length > 0) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingRequests.length > 0 && (
            <div className="bg-sand/15 border border-sand/40 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sand text-white flex items-center justify-center font-bold">
                  {pendingRequests.length}
                </div>
                <div>
                  <div className="font-bold text-charcoal text-sm">
                    {pendingRequests.length} Connection Request{pendingRequests.length > 1 ? "s" : ""} Received
                  </div>
                  <div className="text-xs text-brown-500">
                    Students are seeking your guidance.
                  </div>
                </div>
              </div>
              <Link
                href="/network"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-brown-700 hover:bg-cream-100 border border-grayAccent-border"
              >
                Review Requests
              </Link>
            </div>
          )}

          {upcomingMeets.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-charcoal text-sm">
                    Upcoming Meet: {upcomingMeets[0].sessionTitle}
                  </div>
                  <div className="text-xs text-emerald-800">
                    {upcomingMeets[0].date} at {upcomingMeets[0].timeSlot}
                  </div>
                </div>
              </div>
              <a
                href={upcomingMeets[0].meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
              >
                Join Jitsi Room
              </a>
            </div>
          )}
        </section>
      )}

      {/* Core Feature 1: Goal-Based Search & Discovery Bar */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-charcoal flex items-center gap-2">
              <Compass className="w-5 h-5 text-terracotta" />
              Goal-Based Helper Match
            </h2>
            <p className="text-xs sm:text-sm text-brown-400">
              Pick a goal or type what you're working towards to match verified students and alumni.
            </p>
          </div>
        </div>

        <SearchBar
          onSearchChange={() => {}}
          selectedCollege={selectedCollege}
          setSelectedCollege={setSelectedCollege}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          availableOnly={availableOnly}
          setAvailableOnly={setAvailableOnly}
          sameStateOnly={sameStateOnly}
          setSameStateOnly={setSameStateOnly}
        />
      </section>

      {/* Search Results / Ranked Helpers Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-charcoal">
            <span>
              Showing {rankedHelpers.length} verified helper{rankedHelpers.length === 1 ? "" : "s"}
            </span>
            {(searchQuery || activeGoal) && (
              <span className="bg-sand-light text-brown-800 px-2 py-0.5 rounded-md text-xs font-medium">
                Matching "{searchQuery || activeGoal}"
              </span>
            )}
          </div>
          <span className="text-xs text-brown-400">
            Sorted by Aedo Smart Ranking
          </span>
        </div>

        {rankedHelpers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rankedHelpers.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                highlightGoal={searchQuery || activeGoal}
              />
            ))}
          </div>
        ) : (
          /* Empty state from Section 5.3 & 7 */
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-grayAccent-border shadow-soft space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-cream-200 text-brown-400 flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-charcoal">
              No one has listed this goal yet.
            </h3>
            <p className="text-sm text-brown-400 max-w-md mx-auto">
              Post it and get notified when a helper joins from top colleges!
            </p>
            <div className="pt-2">
              <button
                onClick={() => followGoal(searchQuery || activeGoal || "Custom Goal")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-terracotta text-white hover:bg-terracotta-600 transition-colors shadow-soft"
              >
                <Bell className="w-4 h-4" />
                <span>
                  {followedGoals.includes(searchQuery || activeGoal)
                    ? "✓ Following this Goal"
                    : `Follow "${searchQuery || activeGoal}" for Alerts`}
                </span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Core Feature 4: "Alumni from your college" Carousel (Section 5.6) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-grayAccent-border shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-terracotta flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Per-College Alumni Directory
            </div>
            <h2 className="text-xl font-bold text-charcoal">
              Alumni from your college ({currentUser?.collegeName})
            </h2>
            <p className="text-xs text-brown-400">
              Verified graduates who walked the same campus hallways and are open to mentoring.
            </p>
          </div>
          <Link
            href={`/colleges/${currentUser?.collegeId.replace("col-", "") || "dtu"}/alumni`}
            className="text-xs font-bold text-terracotta hover:underline flex items-center gap-1"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alumniFromCollege.map((alumnus) => (
            <div
              key={alumnus.id}
              className="p-4 rounded-2xl bg-cream-50 border border-grayAccent-border hover:border-sand transition-all flex items-start gap-3.5"
            >
              <img
                src={alumnus.photoUrl}
                alt={alumnus.fullName}
                className="w-12 h-12 rounded-xl object-cover border border-sand"
              />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-charcoal text-sm truncate">
                  {alumnus.fullName}
                </div>
                <div className="text-xs text-brown-600 font-medium truncate">
                  {alumnus.currentRole} @ {alumnus.currentCompany}
                </div>
                <div className="text-[11px] text-brown-400 mt-0.5">
                  Class of {alumnus.graduationYear} • {alumnus.branch}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Link
                    href={`/u/${alumnus.username}`}
                    className="text-[11px] font-bold text-terracotta hover:underline"
                  >
                    View 1:1 Page →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Feature 2: Lightweight Events & Webinars (Section 5.10 & 5.14) */}
      <section className="bg-cream-50 rounded-3xl p-6 sm:p-8 border border-grayAccent-border shadow-soft space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-sand flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Live Cross-College Knowledge Sharing
            </div>
            <h2 className="text-xl font-bold text-charcoal">
              Upcoming Webinars & Open Q&A Sessions
            </h2>
            <p className="text-xs text-brown-400">
              Free sessions hosted by verified seniors and alumni with auto-generated Jitsi video links.
            </p>
          </div>

          <button
            onClick={() => setIsCreateEventOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-terracotta text-white shadow-soft hover:bg-terracotta-600 transition-all"
          >
            <span>+ Host an Event / AMA</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl p-5 border border-grayAccent-border shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[11px] font-semibold text-terracotta bg-terracotta-50 px-2 py-0.5 rounded-full">
                    {ev.eventType === "webinar" ? "Webinar" : ev.eventType === "open_qa" ? "Open Q&A" : "Group Meet"}
                  </span>
                  <span className="text-[11px] text-brown-400">
                    {ev.visibility === "all" ? "Cross-College" : ev.collegeName}
                  </span>
                </div>

                <h4 className="font-bold text-charcoal text-sm mb-1.5 line-clamp-2">
                  {ev.title}
                </h4>

                <p className="text-xs text-brown-500 line-clamp-2 mb-3">
                  {ev.description}
                </p>

                {/* Host Info */}
                <div className="flex items-center gap-2 p-2 bg-cream-50 rounded-xl mb-3 text-xs">
                  <img
                    src={ev.hostAvatar}
                    alt={ev.hostName}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-charcoal truncate">{ev.hostName}</div>
                    <div className="text-[10px] text-brown-400 truncate">{ev.hostRole}</div>
                  </div>
                </div>

                <div className="text-xs text-brown-500 space-y-1 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sand" />
                    <span>{ev.date} • {ev.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-sand" />
                    <span>{ev.attendeeCount} students attending</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-grayAccent-border/60 flex items-center gap-2">
                <button
                  onClick={() => toggleEventRsvp(ev.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    ev.hasRsvpd
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                  }`}
                >
                  {ev.hasRsvpd ? "✓ Attending (RSVP'd)" : "RSVP for Free"}
                </button>
                <a
                  href={ev.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl border border-grayAccent-border text-brown-600 hover:bg-cream-100"
                  title="Open Jitsi room"
                >
                  <Video className="w-4 h-4 text-terracotta" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder's 6 Core Ideas Overview - Architectural Integrity Showcase */}
      <section className="bg-charcoal text-cream-100 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-sand text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Aedo Architecture & Founder's Core Ideas</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Why Aedo is built differently than existing networks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-charcoal-300 border border-charcoal-200 space-y-1.5">
            <div className="text-xs font-bold text-sand">1. Goal-Based, Not Job Titles</div>
            <p className="text-xs text-cream-300 leading-relaxed">
              Search by "Crack GATE CSE" or "Get Google Internship". Results rank by real achievements, verified college badge, and proven track record.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-300 border border-charcoal-200 space-y-1.5">
            <div className="text-xs font-bold text-sand">2. Request-First Connection</div>
            <p className="text-xs text-cream-300 leading-relaxed">
              No empty "Hi, let's connect" spam. Every connection requires a 30-300 char specific question and topic, backed by a 5 requests/day cap.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-300 border border-charcoal-200 space-y-1.5">
            <div className="text-xs font-bold text-sand">3. Topmate-Style 1:1 Meets</div>
            <p className="text-xs text-cream-300 leading-relaxed">
              Helpers set weekly availability windows. Seekers book 15 or 30-minute slots with instant Jitsi video links (100% free in MVP).
            </p>
          </div>
        </div>
      </section>

      {/* Host Event Modal */}
      {isCreateEventOpen && (
        <CreateEventModal
          onClose={() => setIsCreateEventOpen(false)}
        />
      )}
    </div>
  );
}
