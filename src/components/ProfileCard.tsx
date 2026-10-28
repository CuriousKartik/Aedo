"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  Clock,
  MessageCircle,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { Profile } from "@/data/mockData";
import RequestModal from "@/components/RequestModal";
import BookingModal from "@/components/BookingModal";

interface ProfileCardProps {
  profile: Profile;
  highlightGoal?: string;
}

export default function ProfileCard({ profile, highlightGoal }: ProfileCardProps) {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Badge tier calculation from Section 5.8:
  // Bronze: 10, Silver: 50, Gold: 100
  const getHelperBadge = (count: number) => {
    if (count >= 100) return { label: "Gold Helper (100+)", color: "badge-gold" };
    if (count >= 50) return { label: "Silver Helper (50+)", color: "bg-gray-100 text-charcoal border-gray-300" };
    if (count >= 10) return { label: "Bronze Helper (10+)", color: "bg-amber-50 text-amber-900 border-amber-300" };
    return null;
  };

  const helperBadge = getHelperBadge(profile.stats.helpedCount);

  // Find matching achievement for highlightGoal
  const matchingAchievement = profile.achievements.find((ach) =>
    highlightGoal
      ? ach.title.toLowerCase().includes(highlightGoal.toLowerCase()) ||
        ach.detail.toLowerCase().includes(highlightGoal.toLowerCase()) ||
        (ach.category && ach.category.toLowerCase().includes(highlightGoal.toLowerCase()))
      : true
  ) || profile.achievements[0];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-grayAccent-border/80 hover:border-sand hover:shadow-lg transition-all flex flex-col justify-between group">
      <div>
        {/* Top Meta: College & Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profile.photoUrl}
                alt={profile.fullName}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-cream-200 group-hover:border-terracotta transition-colors shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="Verified College Student/Alumnus">
                <CheckCircle className="w-3 h-3 text-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link
                  href={`/u/${profile.username}`}
                  className="font-bold text-charcoal hover:text-terracotta text-base leading-tight"
                >
                  {profile.fullName}
                </Link>
                {helperBadge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${helperBadge.color}`}>
                    {helperBadge.label}
                  </span>
                )}
              </div>

              {/* College & Role */}
              <div className="flex items-center gap-1.5 text-xs text-brown-500 mt-0.5 flex-wrap">
                <span className="font-semibold text-charcoal flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
                  {profile.collegeName}
                </span>
                <span>•</span>
                <span className="capitalize font-medium">
                  {profile.role === "alumnus"
                    ? `${profile.currentRole || "Alumnus"} ${profile.currentCompany ? `@ ${profile.currentCompany}` : ""}`
                    : `${profile.branch.split(" ")[0]} '${profile.graduationYear.toString().slice(-2)}`}
                </span>
              </div>
            </div>
          </div>

          {/* Availability Status */}
          <div className="shrink-0">
            {profile.weeklyAvailability.length > 0 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Available this week
              </span>
            ) : (
              <span className="text-[11px] text-brown-400 font-medium">
                Requests open
              </span>
            )}
          </div>
        </div>

        {/* Highlighted Achievement - Core Idea of Aedo */}
        {matchingAchievement && (
          <div className="my-3 p-3 rounded-xl bg-gold/25 border border-gold/70 flex items-start gap-2.5">
            <div className="p-1 rounded-lg bg-gold text-brown-700 shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-brown-800 uppercase tracking-wider flex items-center gap-1">
                Verified Achievement
                <span className="text-[10px] font-normal text-brown-500">({matchingAchievement.year})</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-charcoal">
                {matchingAchievement.title}
              </div>
              <div className="text-xs text-brown-600 font-medium">
                {matchingAchievement.detail}
              </div>
            </div>
          </div>
        )}

        {/* Journey Note Excerpt */}
        <p className="text-xs text-brown-600 italic line-clamp-2 mb-3 bg-cream-50 p-2.5 rounded-xl border border-grayAccent-border/50">
          "{profile.journeyNote}"
        </p>

        {/* Help Topics Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {profile.helpTopics.map((topic) => (
            <span
              key={topic}
              className="text-[11px] px-2.5 py-0.5 rounded-lg font-medium bg-cream-100 text-brown-700 border border-grayAccent-border/60"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Stats & Action Buttons */}
      <div className="pt-3 border-t border-grayAccent-border/70 space-y-3">
        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-brown-500">
          <div className="flex items-center gap-1 font-semibold text-charcoal">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{profile.stats.averageRating}</span>
            <span className="text-brown-400 text-[11px]">({profile.stats.helpedCount} helped)</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-brown-400">
            <Clock className="w-3.5 h-3.5 text-sand" />
            <span>{profile.stats.responseRate}% reply rate (~{profile.stats.medianResponseHours}h)</span>
          </div>
        </div>

        {/* CTAs: Request to Connect & Book Meet */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setIsRequestOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-cream-100 hover:bg-cream-200 text-charcoal border border-grayAccent-border transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-terracotta" />
            <span>Request Connect</span>
          </button>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-terracotta hover:bg-terracotta-600 text-white shadow-soft transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book 1:1 Meet</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {isRequestOpen && (
        <RequestModal
          helper={profile}
          initialGoal={highlightGoal}
          onClose={() => setIsRequestOpen(false)}
        />
      )}

      {isBookingOpen && (
        <BookingModal
          helper={profile}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}

