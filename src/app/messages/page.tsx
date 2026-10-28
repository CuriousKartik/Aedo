"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Calendar,
  ShieldAlert,
  MoreVertical,
  CheckCircle,
  Video,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import BookingModal from "@/components/BookingModal";
import { Profile } from "@/data/mockData";

export default function MessagesPage() {
  const { conversations, sendMessage, currentUser, profiles } = useApp();

  const [activeConvId, setActiveConvId] = useState<string>(
    conversations[0]?.id || ""
  );
  const [inputText, setInputText] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  const otherUserProfile: Profile | undefined = profiles.find(
    (p) => p.id === activeConversation?.otherUser.id
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;
    sendMessage(activeConvId, inputText);
    setInputText("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 h-[85vh]">
      <div className="bg-white rounded-3xl border border-grayAccent-border shadow-card h-full flex overflow-hidden">
        {/* Left Sidebar: Conversations List */}
        <div className={`w-full md:w-80 border-r border-grayAccent-border flex flex-col ${activeConvId && "hidden md:flex"}`}>
          <div className="p-4 border-b border-grayAccent-border/80 bg-cream-50 flex items-center justify-between">
            <h2 className="font-bold text-charcoal text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-terracotta" />
              Connected Chats
            </h2>
            <span className="text-[11px] bg-terracotta-50 text-terracotta font-semibold px-2 py-0.5 rounded-full">
              {conversations.length} Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-grayAccent-border/50">
            {conversations.length > 0 ? (
              conversations.map((conv) => {
                const isSelected = conv.id === activeConvId;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-cream-100/90 font-medium border-l-4 border-terracotta"
                        : "hover:bg-cream-50"
                    }`}
                  >
                    <img
                      src={conv.otherUser.photo}
                      alt={conv.otherUser.name}
                      className="w-11 h-11 rounded-xl object-cover border border-sand"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-charcoal truncate">
                          {conv.otherUser.name}
                        </span>
                        <span className="text-[10px] text-brown-400">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <div className="text-[11px] text-brown-500 truncate">
                        {conv.otherUser.college}
                      </div>
                      <p className="text-xs text-brown-600 truncate mt-1">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-brown-400">
                No active conversations yet. Once a connection request is accepted, your chat will open here.
              </div>
            )}
          </div>
        </div>

        {/* Right Main Pane: Active Chat */}
        {activeConversation ? (
          <div className="flex-1 flex flex-col h-full bg-cream-50/50">
            {/* Chat Header */}
            <div className="p-3.5 bg-white border-b border-grayAccent-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConvId("")}
                  className="md:hidden p-1 text-brown-400 hover:text-charcoal"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <img
                  src={activeConversation.otherUser.photo}
                  alt={activeConversation.otherUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-sand"
                />
                <div>
                  <div className="font-bold text-charcoal text-sm flex items-center gap-1.5">
                    {activeConversation.otherUser.name}
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-[11px] text-brown-500">
                    {activeConversation.otherUser.college} • {activeConversation.otherUser.role}
                  </div>
                </div>
              </div>

              {/* Chat Actions */}
              <div className="flex items-center gap-2 relative">
                {otherUserProfile && (
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-terracotta text-white shadow-soft hover:bg-terracotta-600 transition-all"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Request a Meet</span>
                  </button>
                )}

                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-1.5 rounded-lg text-brown-400 hover:text-charcoal hover:bg-cream-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {showOptions && (
                  <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-card border border-grayAccent-border py-1.5 text-xs z-20 animate-fade-in">
                    <button
                      onClick={() => {
                        alert("Safety report logged. Our team reviews all reports within 2 hours.");
                        setShowOptions(false);
                      }}
                      className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 font-medium"
                    >
                      Report user / spam
                    </button>
                    <button
                      onClick={() => {
                        alert("User blocked. Conversation hidden.");
                        setShowOptions(false);
                      }}
                      className="w-full text-left px-3 py-2 text-charcoal hover:bg-cream-100"
                    >
                      Block user
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="text-center">
                <span className="text-[10px] font-semibold bg-cream-200/80 text-brown-500 px-3 py-1 rounded-full border border-grayAccent-border/60">
                  🔒 College-verified direct conversation • End-to-end moderated
                </span>
              </div>

              {activeConversation.messages.map((msg) => {
                const isMe = msg.senderId === currentUser?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isMe
                          ? "bg-terracotta text-white rounded-br-xs"
                          : "bg-white text-charcoal border border-grayAccent-border rounded-bl-xs"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-brown-400 mt-1 px-1">
                      {msg.createdAt}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white border-t border-grayAccent-border flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={1000}
                placeholder="Type your message here (max 1000 characters)..."
                className="flex-1 bg-cream-50 border border-grayAccent-border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-terracotta"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2.5 rounded-xl font-bold transition-all ${
                  inputText.trim()
                    ? "bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                    : "bg-grayAccent-border text-brown-300 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-brown-400 text-sm">
            Select a conversation to start chatting.
          </div>
        )}
      </div>

      {/* Booking Modal Opened from Chat */}
      {isBookingOpen && otherUserProfile && (
        <BookingModal
          helper={otherUserProfile}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}

