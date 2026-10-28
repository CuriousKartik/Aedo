"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  Clock,
  Video,
  Award,
  Share2,
  Copy,
  Check,
  Calendar,
  MessageCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import BookingModal from "@/components/BookingModal";
import RequestModal from "@/components/RequestModal";

export default function UserPublicProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const { profiles, currentUser } = useApp();

  // Find profile by username, or fallback to current user or Arjun
  const profile =
    profiles.find((p) => p.username.toLowerCase() === username.toLowerCase()) ||
    (currentUser?.username === username ? currentUser : profiles[0]);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold">Profile not found</h2>
        <Link href="/" className="text-terracotta underline text-sm mt-2 block">
          Return to search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Banner & Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-grayAccent-border shadow-card relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profile.photoUrl}
                alt={profile.fullName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-sand shadow-soft"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
                  {profile.fullName}
                </h1>
                <span className="text-xs font-mono text-terracotta bg-terracotta-50 px-2 py-0.5 rounded-full">
                  /u/{profile.username}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-brown-500 mt-1 flex-wrap">
                <span className="font-semibold text-charcoal flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {profile.collegeName}
                </span>
                <span>•</span>
                <span>
                  {profile.role === "alumnus"
                    ? `${profile.currentRole || "Alumnus"} @ ${profile.currentCompany || "Industry"}`
                    : `${profile.branch} (Class of ${profile.graduationYear})`}
                </span>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-3 mt-3 text-xs flex-wrap">
                <span className="inline-flex items-center gap-1 font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {profile.stats.averageRating} Rating ({profile.stats.ratingsCount} reviews)
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-charcoal bg-cream-100 px-2.5 py-1 rounded-full border border-grayAccent-border">
                  <Award className="w-3.5 h-3.5 text-terracotta" />
                  {profile.stats.helpedCount} students helped
                </span>
                <span className="inline-flex items-center gap-1 text-brown-400">
                  <Clock className="w-3.5 h-3.5 text-sand" />
                  {profile.stats.responseRate}% reply rate (~{profile.stats.medianResponseHours}h)
                </span>
              </div>
            </div>
          </div>

          {/* Share button */}
          <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cream-100 hover:bg-cream-200 text-charcoal border border-grayAccent-border transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-sand" />}
              <span>{copiedLink ? "Link Copied!" : "Copy Booking Link"}</span>
            </button>
          </div>
        </div>

        {/* Journey Note ("How I did it") - Section 5.2 */}
        <div className="mt-6 p-4 rounded-2xl bg-cream-50 border border-grayAccent-border/80">
          <div className="text-[11px] font-bold text-brown-800 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            My Journey & Preparation Note:
          </div>
          <p className="text-xs sm:text-sm text-brown-600 leading-relaxed italic">
            "{profile.journeyNote}"
          </p>
        </div>
      </div>

      {/* Grid: Left Column (Achievements & Thank You Notes) vs Right Column (1:1 Session Booking) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Achievements & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Achievements Block */}
          <div className="bg-white rounded-3xl p-6 border border-grayAccent-border shadow-card space-y-4">
            <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
              <Award className="w-4 h-4 text-terracotta" />
              Verified Achievements (What I've Done)
            </h3>
            <div className="space-y-3">
              {profile.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-3.5 rounded-2xl bg-cream-50 border border-grayAccent-border/70 flex items-start justify-between"
                >
                  <div>
                    <div className="font-bold text-sm text-charcoal flex items-center gap-2">
                      {ach.title}
                      <span className="text-[10px] font-semibold bg-sand/20 text-brown-700 px-2 py-0.5 rounded-full">
                        {ach.year}
                      </span>
                    </div>
                    <div className="text-xs text-brown-600 mt-0.5">{ach.detail}</div>
                  </div>
                  {ach.proofUrl && (
                    <a
                      href={ach.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-terracotta hover:underline text-xs flex items-center gap-1 shrink-0"
                    >
                      <ExternalLink className="w-3 h-3" /> Proof
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Help Topics */}
          <div className="bg-white rounded-3xl p-6 border border-grayAccent-border shadow-card space-y-3">
            <h3 className="text-base font-bold text-charcoal">
              Topics I Help Students With
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.helpTopics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-xl bg-gold/30 text-brown-800 text-xs font-semibold border border-gold"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Public Thank You Notes (Section 5.8 & 5.13) */}
          {profile.thankYouNotes && profile.thankYouNotes.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-grayAccent-border shadow-card space-y-4">
              <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
                <Heart className="w-4 h-4 text-terracotta fill-terracotta/20" />
                Notes from Students Helped
              </h3>
              <div className="space-y-3">
                {profile.thankYouNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3.5 rounded-2xl bg-cream-50 border border-grayAccent-border/60 text-xs"
                  >
                    <div className="flex items-center justify-between font-semibold text-charcoal mb-1">
                      <span>
                        {note.fromName} ({note.fromCollege})
                      </span>
                      <span className="text-[10px] text-brown-400 font-normal">
                        {note.date}
                      </span>
                    </div>
                    <p className="text-brown-600 italic">"{note.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Topmate-Style 1:1 Booking Card (Idea 3) */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-sand shadow-card space-y-4 sticky top-24">
            <div className="border-b border-grayAccent-border/70 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                1:1 Mentorship Session
              </span>
              <h3 className="text-lg font-bold text-charcoal">
                Book a Video Session
              </h3>
              <p className="text-xs text-brown-400 mt-0.5">
                100% Free during Aedo pilot. Instant Jitsi link.
              </p>
            </div>

            {/* Session Types */}
            <div className="space-y-2.5">
              {profile.sessionTypes.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setIsBookingOpen(true)}
                  className="p-3 rounded-2xl border border-grayAccent-border hover:border-terracotta hover:bg-cream-50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-charcoal group-hover:text-terracotta">
                      {st.title}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      FREE • {st.durationMinutes}m
                    </span>
                  </div>
                  <p className="text-[11px] text-brown-500 mt-1 line-clamp-2">
                    {st.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-3 rounded-xl font-bold text-xs bg-terracotta hover:bg-terracotta-600 text-white shadow-soft transition-all flex items-center justify-center gap-1.5"
              >
                <Video className="w-4 h-4" />
                <span>Book 1:1 Video Meet (Free)</span>
              </button>

              <button
                onClick={() => setIsRequestOpen(true)}
                className="w-full py-2.5 rounded-xl font-semibold text-xs bg-cream-100 hover:bg-cream-200 text-charcoal border border-grayAccent-border transition-all flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-terracotta" />
                <span>Send Structured Question</span>
              </button>
            </div>

            <div className="text-[11px] text-brown-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified college account • No spam policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking & Request Modals */}
      {isBookingOpen && (
        <BookingModal
          helper={profile}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

      {isRequestOpen && (
        <RequestModal
          helper={profile}
          onClose={() => setIsRequestOpen(false)}
        />
      )}
    </div>
  );
}
