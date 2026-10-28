"use client";

import React, { useState } from "react";
import { X, Sparkles, Calendar, Clock, Video, Users, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface CreateEventModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateEventModal({ onClose, onSuccess }: CreateEventModalProps) {
  const { currentUser, createEvent } = useApp();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState<"webinar" | "group_meet" | "open_qa">("webinar");
  const [topicTag, setTopicTag] = useState("Internships & Placements");
  const [date, setDate] = useState("Saturday, Nov 2");
  const [time, setTime] = useState("6:00 PM - 7:00 PM IST");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [visibility, setVisibility] = useState<"all" | "college_only">("all");
  const [customLink, setCustomLink] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createEvent({
      title: title.trim(),
      description: description.trim() || "Join us for an interactive session and live Q&A.",
      eventType,
      topicTag,
      date,
      time,
      durationMinutes,
      meetingUrl: customLink.trim() || `https://meet.jit.si/aedo-event-${Math.random().toString(36).substring(2, 8)}`,
      visibility,
      collegeName: currentUser?.collegeName,
      capacity: eventType === "group_meet" ? 15 : 200,
    });

    setIsCreated(true);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-card border border-grayAccent-border overflow-hidden">
        {/* Header */}
        <div className="bg-cream-100 px-6 py-4 border-b border-grayAccent-border flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Host Student Meet or Webinar
            </span>
            <h3 className="text-base font-bold text-charcoal">
              Create an Event on Aedo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-brown-400 hover:text-charcoal hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCreated ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-charcoal">Event Published!</h4>
            <p className="text-sm text-brown-500 max-w-sm mx-auto">
              Your session "<strong>{title}</strong>" is now live on the cross-college events calendar with auto-generated Jitsi room links.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-semibold bg-terracotta text-white hover:bg-terracotta-600"
            >
              Done & View Events
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* Host Banner */}
            <div className="flex items-center gap-2.5 p-2.5 bg-cream-50 rounded-xl border border-grayAccent-border text-xs text-brown-600">
              <img
                src={currentUser?.photoUrl}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>
                Hosting as <strong>{currentUser?.fullName}</strong> ({currentUser?.collegeName})
              </span>
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                Event Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "webinar", label: "Webinar", desc: "1 Host, Many Attendees" },
                  { id: "open_qa", label: "Open Q&A", desc: "Senior AMA Session" },
                  { id: "group_meet", label: "Group Meet", desc: "Up to 15 peers" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setEventType(t.id as any)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      eventType === t.id
                        ? "bg-sand/15 border-sand font-bold text-charcoal shadow-xs"
                        : "border-grayAccent-border text-brown-500 hover:bg-cream-50"
                    }`}
                  >
                    <div className="text-charcoal font-semibold">{t.label}</div>
                    <div className="text-[10px] text-brown-400 leading-tight mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-[11px] font-semibold text-brown-500 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How to crack Off-Campus Tech Offers: Roadmap & Resume Q&A"
                className="w-full text-xs sm:text-sm bg-white border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* Topic & Visibility */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                  Topic Category
                </label>
                <select
                  value={topicTag}
                  onChange={(e) => setTopicTag(e.target.value)}
                  className="w-full text-xs bg-white border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                >
                  <option value="Internships & Placements">Internships & Placements</option>
                  <option value="Competitive exams">Competitive exams (GATE/CAT)</option>
                  <option value="Coding & DSA">Coding & DSA</option>
                  <option value="Higher studies">Higher studies & MS Abroad</option>
                  <option value="Startups & Hackathons">Startups & Hackathons</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                  Audience Scope
                </label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as any)}
                  className="w-full text-xs bg-white border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                >
                  <option value="all">All Verified Colleges (Cross-College)</option>
                  <option value="college_only">My College Only ({currentUser?.collegeName.split(" ")[0]})</option>
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                  Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. Saturday, Nov 2"
                  className="w-full text-xs bg-white border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 6:00 PM - 7:00 PM IST"
                  className="w-full text-xs bg-white border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                Description & Agenda
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="What will attendees learn? Share preparation tips, Q&A roadmap..."
                className="w-full text-xs bg-white border border-grayAccent-border rounded-xl p-3 text-charcoal focus:outline-none focus:border-terracotta"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-brown-500 hover:bg-cream-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-terracotta text-white shadow-soft hover:bg-terracotta-600"
              >
                Publish Event
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

