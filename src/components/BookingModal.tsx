"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, Video, CheckCircle2, Download, ExternalLink, Sparkles } from "lucide-react";
import { Profile, SessionType } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

interface BookingModalProps {
  helper: Profile;
  onClose: () => void;
  onSuccess?: (bookingId: string) => void;
}

export default function BookingModal({ helper, onClose, onSuccess }: BookingModalProps) {
  const { bookMeeting } = useApp();

  // Pick first session type or create fallback
  const defaultSession: SessionType = helper.sessionTypes[0] || {
    id: "st-default",
    helperId: helper.id,
    title: "15-min 1:1 Mentorship & Strategy",
    description: "Get direct 1:1 guidance, ask questions about your preparation roadmap, and discuss next steps.",
    durationMinutes: 15,
    requiresApproval: false,
    allowDirectBooking: true,
    priceInr: 0,
    topicGoal: helper.helpTopics[0] || "Mentorship",
  };

  const [selectedSession, setSelectedSession] = useState<SessionType>(defaultSession);
  const [selectedDate, setSelectedDate] = useState<string>("Tomorrow, Oct 30");
  const [selectedSlot, setSelectedSlot] = useState<string>("7:00 PM - 7:15 PM IST");
  const [notes, setNotes] = useState<string>("");
  const [isBooked, setIsBooked] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>("");
  const [generatedMeetingUrl, setGeneratedMeetingUrl] = useState<string>("");

  const availableDates = [
    { label: "Tomorrow, Oct 30", day: "Wed" },
    { label: "Thursday, Oct 31", day: "Thu" },
    { label: "Friday, Nov 1", day: "Fri" },
    { label: "Saturday, Nov 2", day: "Sat" },
  ];

  const availableSlots = selectedSession.durationMinutes === 15
    ? ["7:00 PM - 7:15 PM IST", "7:20 PM - 7:35 PM IST", "8:00 PM - 8:15 PM IST", "8:30 PM - 8:45 PM IST"]
    : ["7:00 PM - 7:30 PM IST", "8:00 PM - 8:30 PM IST", "9:00 PM - 9:30 PM IST"];

  const handleConfirm = () => {
    const res = bookMeeting(
      helper.id,
      selectedSession.title,
      selectedSession.durationMinutes,
      selectedDate,
      selectedSlot,
      notes
    );
    if (res.success) {
      setConfirmedBookingId(res.bookingId);
      setGeneratedMeetingUrl(`https://meet.jit.si/aedo-${Math.random().toString(36).substring(2, 8)}`);
      setIsBooked(true);
      if (onSuccess) onSuccess(res.bookingId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-card border border-grayAccent-border overflow-hidden">
        {/* Header */}
        <div className="bg-cream-100 px-6 py-4 border-b border-grayAccent-border flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sand flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 1:1 Video Session (Topmate-style)
            </span>
            <h3 className="text-base font-bold text-charcoal">
              Book a 1:1 with {helper.fullName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-brown-400 hover:text-charcoal hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-charcoal">Session Confirmed!</h4>
            <p className="text-xs sm:text-sm text-brown-500 max-w-sm mx-auto">
              Your 1:1 meet with <strong>{helper.fullName}</strong> is scheduled for{" "}
              <span className="text-charcoal font-semibold">{selectedDate}</span> at{" "}
              <span className="text-charcoal font-semibold">{selectedSlot}</span>.
            </p>

            <div className="p-3.5 bg-cream-50 rounded-xl border border-grayAccent-border text-left space-y-2">
              <div className="text-[11px] font-semibold text-brown-400 uppercase tracking-wider">
                Instant Jitsi Meeting Room Link:
              </div>
              <div className="flex items-center justify-between gap-2 p-2 bg-white rounded-lg border border-sand/40 text-xs font-mono text-charcoal">
                <span className="truncate">{generatedMeetingUrl}</span>
                <a
                  href={generatedMeetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-terracotta font-sans text-xs font-bold hover:underline shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open
                </a>
              </div>
              <div className="text-[11px] text-brown-400 flex items-center gap-1">
                <span>Free in MVP (₹0 INR). Calendar .ics invite automatically generated.</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert("Calendar .ics file downloaded with Jitsi meeting link.");
                }}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-cream-100 hover:bg-cream-200 text-charcoal border border-grayAccent-border flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Add to Calendar (.ics)
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-terracotta hover:bg-terracotta-600 text-white shadow-soft"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="p-6 space-y-4 text-xs sm:text-sm">
            {/* Helper Quick Card */}
            <div className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl border border-grayAccent-border/60">
              <img
                src={helper.photoUrl}
                alt={helper.fullName}
                className="w-12 h-12 rounded-full object-cover border border-sand"
              />
              <div>
                <div className="font-bold text-charcoal text-sm flex items-center gap-2">
                  {helper.fullName}
                  <span className="badge-gold text-[10px] px-2 py-0.5 rounded-full font-semibold">
                    ⭐ {helper.stats.averageRating} ({helper.stats.helpedCount} helped)
                  </span>
                </div>
                <div className="text-xs text-brown-500">
                  {helper.collegeName} • {helper.role === "alumnus" ? helper.currentRole || "Alumnus" : helper.branch}
                </div>
              </div>
            </div>

            {/* Session Type Options */}
            <div>
              <label className="block text-[11px] font-semibold text-brown-400 mb-1.5">
                Select Session Type (Free in MVP)
              </label>
              <div className="space-y-2">
                {helper.sessionTypes.map((st) => {
                  const isSelected = selectedSession.id === st.id;
                  return (
                    <div
                      key={st.id}
                      onClick={() => setSelectedSession(st)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-sand/15 border-sand shadow-xs"
                          : "border-grayAccent-border hover:bg-cream-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-charcoal">{st.title}</span>
                        <span className="text-[11px] font-semibold text-terracotta bg-terracotta-50 px-2 py-0.5 rounded-full">
                          {st.durationMinutes} mins • FREE
                        </span>
                      </div>
                      <p className="text-[11px] text-brown-500 mt-1">{st.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-[11px] font-semibold text-brown-400 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sand" /> Select Date
              </label>
              <div className="grid grid-cols-4 gap-2">
                {availableDates.map((d) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setSelectedDate(d.label)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-medium transition-all ${
                      selectedDate === d.label
                        ? "bg-terracotta text-white border-terracotta shadow-xs font-semibold"
                        : "border-grayAccent-border text-brown-600 hover:bg-cream-100"
                    }`}
                  >
                    <div className="text-[10px] uppercase opacity-80">{d.day}</div>
                    <div className="truncate text-[11px]">{d.label.split(",")[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-[11px] font-semibold text-brown-400 mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sand" /> Open Availability Slots (Asia/Kolkata)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2.5 text-center rounded-xl border text-xs font-medium transition-all ${
                      selectedSlot === slot
                        ? "bg-brown-500 text-white border-brown-500 shadow-xs font-semibold"
                        : "border-grayAccent-border text-brown-600 hover:bg-cream-100"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* One question from helper */}
            <div>
              <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                What do you want to cover? (Optional note for {helper.fullName.split(" ")[0]})
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Quick review of my 5th sem revision plan or resume"
                className="w-full text-xs sm:text-sm bg-white border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-brown-500 hover:bg-cream-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-terracotta text-white shadow-soft hover:bg-terracotta-600 transition-all"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Confirm Free 1:1 Meet</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

