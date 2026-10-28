"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  Clock,
  Video,
  Users,
  Plus,
  Filter,
  CheckCircle,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import CreateEventModal from "@/components/CreateEventModal";

export default function EventsPage() {
  const { events, toggleEventRsvp, currentUser } = useApp();

  const [filterTopic, setFilterTopic] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredEvents = events.filter((ev) => {
    if (filterTopic !== "all" && !ev.topicTag.toLowerCase().includes(filterTopic.toLowerCase())) {
      return false;
    }
    if (filterType !== "all" && ev.eventType !== filterType) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-sand flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Cross-College Knowledge Sharing
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            Webinars & Open Q&A Calendar
          </h1>
          <p className="text-xs sm:text-sm text-brown-400 mt-0.5">
            Free community sessions hosted by verified achievers and alumni.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-terracotta text-white shadow-soft hover:bg-terracotta-600 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Session</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-grayAccent-border shadow-xs text-xs font-medium">
        <span className="text-brown-400 px-2 font-semibold">Filter:</span>
        {[
          { id: "all", label: "All Sessions" },
          { id: "webinar", label: "Webinars" },
          { id: "open_qa", label: "Open Q&A" },
          { id: "group_meet", label: "Group Meets" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterType === tab.id
                ? "bg-sand text-white font-bold"
                : "text-brown-600 hover:bg-cream-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl p-5 border border-grayAccent-border shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[10px] font-bold text-terracotta bg-terracotta-50 px-2 py-0.5 rounded-full uppercase">
                  {ev.eventType === "webinar" ? "Webinar" : ev.eventType === "open_qa" ? "Open Q&A" : "Group Meet"}
                </span>
                <span className="text-[11px] text-brown-400">
                  {ev.visibility === "all" ? "Cross-College" : ev.collegeName}
                </span>
              </div>

              <h3 className="font-bold text-charcoal text-base mb-1.5 leading-snug">
                {ev.title}
              </h3>

              <p className="text-xs text-brown-500 line-clamp-3 mb-4 leading-relaxed">
                {ev.description}
              </p>

              {/* Host Box */}
              <div className="flex items-center gap-2.5 p-2.5 bg-cream-50 rounded-xl mb-3 text-xs">
                <img
                  src={ev.hostAvatar}
                  alt={ev.hostName}
                  className="w-8 h-8 rounded-full object-cover border border-sand"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-charcoal truncate">{ev.hostName}</div>
                  <div className="text-[10px] text-brown-400 truncate">{ev.hostRole}</div>
                </div>
              </div>

              {/* Meta */}
              <div className="text-xs text-brown-600 space-y-1 mb-4">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-sand" />
                  <span>{ev.date} • {ev.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sand" />
                  <span>{ev.attendeeCount} students attending</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-grayAccent-border/60 flex items-center gap-2">
              <button
                onClick={() => toggleEventRsvp(ev.id)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  ev.hasRsvpd
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                }`}
              >
                {ev.hasRsvpd ? "✓ You are RSVP'd" : "RSVP for Free"}
              </button>

              <a
                href={ev.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-grayAccent-border text-brown-600 hover:bg-cream-100"
                title="Join room"
              >
                <Video className="w-4 h-4 text-terracotta" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {isCreateOpen && (
        <CreateEventModal onClose={() => setIsCreateOpen(false)} />
      )}
    </div>
  );
}

