"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import RequestModal from "@/components/RequestModal";
import BookingModal from "@/components/BookingModal";
import { Profile } from "@/data/mockData";

export default function NetworkPage() {
  const {
    currentUser,
    requests,
    respondToRequest,
    profiles,
    conversations,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"pending" | "connections" | "suggested" | "browse">("pending");
  const [targetHelper, setTargetHelper] = useState<Profile | null>(null);
  const [modalType, setModalType] = useState<"request" | "booking" | null>(null);

  // Filter requests
  const pendingReceived = requests.filter(
    (r) => r.receiverId === currentUser?.id && r.status === "pending"
  );
  const pendingSent = requests.filter(
    (r) => r.senderId === currentUser?.id && r.status === "pending"
  );
  const acceptedRequests = requests.filter((r) => r.status === "accepted");

  // Suggested for you (Section 5.11: rule-based, shares at least one goal or same branch/college)
  const suggestedPeople = profiles.filter((p) => {
    if (p.id === currentUser?.id) return false;
    const sharesGoal = p.goals.some((g) => currentUser?.goals.includes(g)) ||
      p.helpTopics.some((t) => currentUser?.goals.includes(t));
    const sharesCollege = p.collegeId === currentUser?.collegeId;
    return sharesGoal || sharesCollege;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-terracotta flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Cross-College Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            My Network & Connections
          </h1>
          <p className="text-xs sm:text-sm text-brown-400 mt-0.5">
            Built on verified achievements and shared goals, never vanity titles.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex bg-white p-1 rounded-2xl border border-grayAccent-border shadow-xs text-xs font-semibold">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "pending"
                ? "bg-terracotta text-white shadow-soft"
                : "text-brown-500 hover:text-charcoal"
            }`}
          >
            <span>Requests</span>
            {pendingReceived.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-terracotta text-[10px] font-bold flex items-center justify-center">
                {pendingReceived.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("connections")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "connections"
                ? "bg-terracotta text-white shadow-soft"
                : "text-brown-500 hover:text-charcoal"
            }`}
          >
            Connections ({acceptedRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("suggested")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "suggested"
                ? "bg-terracotta text-white shadow-soft"
                : "text-brown-500 hover:text-charcoal"
            }`}
          >
            Suggested
          </button>
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "browse"
                ? "bg-terracotta text-white shadow-soft"
                : "text-brown-500 hover:text-charcoal"
            }`}
          >
            Browse All ({profiles.length})
          </button>
        </div>
      </div>

      {/* TAB 1: PENDING REQUESTS (RECEIVED & SENT) */}
      {activeTab === "pending" && (
        <div className="space-y-6">
          {/* Received Requests */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-terracotta" />
              Incoming Requests ({pendingReceived.length})
            </h2>

            {pendingReceived.length > 0 ? (
              <div className="space-y-3">
                {pendingReceived.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 bg-white rounded-2xl border border-grayAccent-border shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <img
                        src={req.senderPhoto}
                        alt={req.senderName}
                        className="w-12 h-12 rounded-xl object-cover border border-sand"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-charcoal text-sm">{req.senderName}</span>
                          <span className="text-[10px] bg-sand/20 text-brown-800 px-2 py-0.5 rounded-full font-semibold">
                            {req.goalTopic}
                          </span>
                        </div>
                        <div className="text-xs text-brown-500">
                          {req.senderCollege} • {req.senderBranch}
                        </div>
                        <div className="mt-2 p-3 bg-cream-50 rounded-xl text-xs text-charcoal border border-grayAccent-border/70 italic">
                          "{req.message}"
                        </div>
                        <div className="text-[11px] text-brown-400 mt-1 flex items-center gap-2">
                          <span>Preferred: <strong>{req.preferredContact}</strong></span>
                          <span>•</span>
                          <span>{req.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => respondToRequest(req.id, "decline", "Too busy this week")}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => respondToRequest(req.id, "accept")}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-terracotta hover:bg-terracotta-600 text-white shadow-soft transition-all"
                      >
                        Accept & Start Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-2xl border border-grayAccent-border text-center text-xs text-brown-400">
                No pending incoming requests. When students ask you questions, they'll appear here.
              </div>
            )}
          </div>

          {/* Outgoing / Sent Requests */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-sand" />
              Sent Requests ({pendingSent.length})
            </h2>

            {pendingSent.length > 0 ? (
              <div className="space-y-3">
                {pendingSent.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 bg-white rounded-2xl border border-grayAccent-border shadow-xs flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-charcoal">
                        Request to <strong>{req.receiverName}</strong> on "{req.goalTopic}"
                      </div>
                      <div className="text-brown-500 italic mt-0.5 line-clamp-1">
                        "{req.message}"
                      </div>
                      <div className="text-[10px] text-brown-400 mt-1">
                        Expires in 7 days if unanswered.
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shrink-0">
                      Pending Helper Reply
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-2xl border border-grayAccent-border text-center text-xs text-brown-400">
                You have no active pending outgoing requests. (Daily limit: 5/day).
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ACCEPTED CONNECTIONS */}
      {activeTab === "connections" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {conversations.map((c) => (
              <div
                key={c.id}
                className="p-5 bg-white rounded-2xl border border-grayAccent-border shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={c.otherUser.photo}
                      alt={c.otherUser.name}
                      className="w-12 h-12 rounded-xl object-cover border border-sand"
                    />
                    <div>
                      <h4 className="font-bold text-charcoal text-sm">{c.otherUser.name}</h4>
                      <div className="text-xs text-brown-500">{c.otherUser.college}</div>
                      <div className="text-[11px] text-terracotta font-medium">{c.otherUser.role}</div>
                    </div>
                  </div>
                  <div className="p-2.5 bg-cream-50 rounded-xl text-xs text-brown-600 line-clamp-2 italic mb-3">
                    "{c.lastMessage}"
                  </div>
                </div>

                <div className="pt-2 border-t border-grayAccent-border/60 flex gap-2">
                  <Link
                    href="/messages"
                    className="flex-1 py-2 text-center rounded-xl font-bold text-xs bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                  >
                    Open Chat
                  </Link>
                  <Link
                    href={`/u/${c.otherUser.username}`}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-cream-100 hover:bg-cream-200 text-charcoal border border-grayAccent-border"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SUGGESTED */}
      {activeTab === "suggested" && (
        <div className="space-y-4">
          <div className="p-4 bg-sand/15 border border-sand/40 rounded-2xl text-xs text-brown-700">
            💡 <strong>Rule-based matching:</strong> Verified students and alumni who share your goal topics ({currentUser?.goals.join(", ")}) or belong to your campus.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedPeople.map((person) => (
              <div
                key={person.id}
                className="p-5 bg-white rounded-2xl border border-grayAccent-border shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={person.photoUrl}
                      alt={person.fullName}
                      className="w-12 h-12 rounded-xl object-cover border border-sand"
                    />
                    <div>
                      <h4 className="font-bold text-charcoal text-sm">{person.fullName}</h4>
                      <div className="text-xs text-brown-500">{person.collegeName}</div>
                      <div className="text-[11px] text-terracotta font-semibold">
                        {person.achievements[0]?.title || person.branch}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {person.helpTopics.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] bg-cream-100 text-brown-700 px-2 py-0.5 rounded-md font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-grayAccent-border/60 flex gap-2">
                  <button
                    onClick={() => {
                      setTargetHelper(person);
                      setModalType("request");
                    }}
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                  >
                    Request Connect
                  </button>
                  <Link
                    href={`/u/${person.username}`}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-cream-100 hover:bg-cream-200 text-charcoal border border-grayAccent-border"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BROWSE ALL DIRECTORY */}
      {activeTab === "browse" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((person) => (
            <div
              key={person.id}
              className="p-5 bg-white rounded-2xl border border-grayAccent-border shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={person.photoUrl}
                    alt={person.fullName}
                    className="w-12 h-12 rounded-xl object-cover border border-sand"
                  />
                  <div>
                    <h4 className="font-bold text-charcoal text-sm">{person.fullName}</h4>
                    <div className="text-xs text-brown-500">{person.collegeName}</div>
                    <div className="text-[11px] text-brown-400 capitalize">{person.role} • {person.branch}</div>
                  </div>
                </div>
                <div className="p-2 bg-cream-50 rounded-xl text-xs text-brown-600 italic line-clamp-2 mb-3">
                  "{person.journeyNote}"
                </div>
              </div>

              <div className="pt-2 border-t border-grayAccent-border/60 flex gap-2">
                <button
                  onClick={() => {
                    setTargetHelper(person);
                    setModalType("request");
                  }}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                >
                  Request Connect
                </button>
                <Link
                  href={`/u/${person.username}`}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-cream-100 hover:bg-cream-200 text-charcoal border border-grayAccent-border"
                >
                  Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {modalType === "request" && targetHelper && (
        <RequestModal
          helper={targetHelper}
          onClose={() => {
            setModalType(null);
            setTargetHelper(null);
          }}
        />
      )}

      {modalType === "booking" && targetHelper && (
        <BookingModal
          helper={targetHelper}
          onClose={() => {
            setModalType(null);
            setTargetHelper(null);
          }}
        />
      )}
    </div>
  );
}

