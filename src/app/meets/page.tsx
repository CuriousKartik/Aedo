"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Video,
  Clock,
  ExternalLink,
  Download,
  AlertCircle,
  Star,
  CheckCircle2,
  X,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function MeetsPage() {
  const { bookings, cancelBooking, currentUser } = useApp();

  const [feedbackBookingId, setFeedbackBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [wasHelpful, setWasHelpful] = useState(true);
  const [feedbackNote, setFeedbackNote] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const upcoming = bookings.filter((b) => b.status === "confirmed");
  const past = bookings.filter((b) => b.status === "completed" || b.status === "cancelled");

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackBookingId(null);
      setFeedbackSubmitted(false);
      setFeedbackNote("");
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-sand flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> Topmate-Style 1:1 Meets
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
          Your 1:1 Sessions & Meeting Links
        </h1>
        <p className="text-xs sm:text-sm text-brown-400 mt-0.5">
          Free 15 and 30-minute video sessions powered by auto-generated Jitsi rooms.
        </p>
      </div>

      {/* Upcoming Meets Section */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-charcoal flex items-center gap-2">
          <Video className="w-4 h-4 text-emerald-600" />
          Confirmed Upcoming Meets ({upcoming.length})
        </h2>

        {upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((meet) => (
              <div
                key={meet.id}
                className="bg-white rounded-2xl p-5 border border-sand/60 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-charcoal text-base">
                      {meet.sessionTitle}
                    </span>
                    <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      Confirmed • {meet.durationMinutes} mins
                    </span>
                  </div>

                  <div className="text-xs text-brown-500 font-medium">
                    With <strong>{meet.helperName}</strong> ({meet.helperCollege})
                  </div>

                  <div className="flex items-center gap-3 text-xs text-charcoal font-semibold pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sand" />
                      {meet.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sand" />
                      {meet.timeSlot}
                    </span>
                  </div>

                  {meet.notes && (
                    <div className="text-[11px] text-brown-400 italic">
                      Topic note: "{meet.notes}"
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <a
                    href={meet.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft transition-all"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Jitsi Call</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => alert("Calendar .ics file downloaded.")}
                    className="p-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-charcoal border border-grayAccent-border text-xs"
                    title="Add to Google / Apple Calendar"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => cancelBooking(meet.id)}
                    className="px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => setFeedbackBookingId(meet.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-terracotta hover:bg-cream-100 border border-terracotta/40"
                  >
                    Leave Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white rounded-2xl border border-grayAccent-border text-center text-xs text-brown-400 space-y-2">
            <p>You have no upcoming 1:1 meets booked right now.</p>
            <Link
              href="/"
              className="inline-block text-terracotta font-bold underline"
            >
              Browse verified helpers to book a session →
            </Link>
          </div>
        )}
      </div>

      {/* Feedback Modal (Section 5.8) */}
      {feedbackBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-card border border-grayAccent-border p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-grayAccent-border pb-3">
              <h3 className="font-bold text-charcoal text-base flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                Session Feedback & Rating
              </h3>
              <button
                onClick={() => setFeedbackBookingId(null)}
                className="text-brown-400 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedbackSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-charcoal">Thank You!</h4>
                <p className="text-xs text-brown-400">
                  Your review directly updates the helper's public rating and helped count badge.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-semibold text-brown-400 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-2 rounded-xl border text-base font-bold flex items-center gap-1 ${
                          rating >= star
                            ? "bg-amber-50 border-amber-300 text-amber-600"
                            : "border-grayAccent-border text-brown-300"
                        }`}
                      >
                        <Star className={`w-4 h-4 ${rating >= star ? "fill-amber-400" : ""}`} />
                        <span>{star}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown-400 mb-1">
                    Was this session helpful?
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setWasHelpful(true)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                        wasHelpful
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                          : "border-grayAccent-border text-brown-500"
                      }`}
                    >
                      ✓ Yes, very helpful
                    </button>
                    <button
                      type="button"
                      onClick={() => setWasHelpful(false)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                        !wasHelpful
                          ? "bg-rose-50 border-rose-300 text-rose-800"
                          : "border-grayAccent-border text-brown-500"
                      }`}
                    >
                      Needs Improvement
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown-400 mb-1">
                    Public Thank-You Note (Appears on helper's profile)
                  </label>
                  <textarea
                    value={feedbackNote}
                    onChange={(e) => setFeedbackNote(e.target.value)}
                    rows={2}
                    placeholder="e.g. Arjun gave great actionable tips on mock test analysis..."
                    className="w-full text-xs bg-cream-50 border border-grayAccent-border rounded-xl p-2.5 text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
