"use client";

import React, { useState } from "react";
import { X, Send, Sparkles, AlertCircle, CheckCircle2, Clock, MessageSquare, Video } from "lucide-react";
import { Profile } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

interface RequestModalProps {
  helper: Profile;
  initialGoal?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RequestModal({
  helper,
  initialGoal,
  onClose,
  onSuccess,
}: RequestModalProps) {
  const { currentUser, sendConnectionRequest, dailyRequestsSent, maxDailyRequests } = useApp();

  const [selectedGoal, setSelectedGoal] = useState<string>(
    initialGoal || helper.helpTopics[0] || "General Guidance"
  );
  const [question, setQuestion] = useState<string>("");
  const [contactType, setContactType] = useState<"chat" | "15-min meet" | "either">("15-min meet");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  const charCount = question.length;
  const isQuestionValid = charCount >= 30 && charCount <= 300;
  const remainingDaily = maxDailyRequests - dailyRequestsSent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isQuestionValid) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const res = sendConnectionRequest(helper.id, selectedGoal, question, contactType);
    setIsSubmitting(false);

    if (!res.success) {
      setErrorMessage(res.error || "Unable to send request.");
    } else {
      setIsDone(true);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-card border border-grayAccent-border overflow-hidden">
        {/* Header */}
        <div className="bg-cream-100 px-6 py-4 border-b border-grayAccent-border flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Structured Connection Request
            </span>
            <h3 className="text-base font-bold text-charcoal">
              Request to Connect with {helper.fullName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-brown-400 hover:text-charcoal hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-charcoal">Request Sent Successfully!</h4>
            <p className="text-sm text-brown-500 max-w-sm mx-auto leading-relaxed">
              <strong>{helper.fullName}</strong> will be notified on Aedo. On acceptance, a 1:1 chat will automatically open and you can finalize your session slot.
            </p>
            <div className="p-3 bg-cream-50 rounded-xl border border-grayAccent-border/80 text-xs text-brown-500">
              ⚡ Helpers on Aedo have an average response time of under 24 hours.
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-semibold bg-terracotta text-white hover:bg-terracotta-600 transition-colors"
            >
              Done & Return to Feed
            </button>
          </div>
        ) : (
          /* Request Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* Daily Quota Notice */}
            <div className="flex items-center justify-between bg-cream-50 p-2.5 rounded-xl border border-grayAccent-border/70 text-xs">
              <span className="text-brown-500 font-medium">Daily Outgoing Cap:</span>
              <span className={`font-bold ${remainingDaily > 0 ? "text-emerald-700" : "text-rose-600"}`}>
                {remainingDaily} of {maxDailyRequests} requests remaining today
              </span>
            </div>

            {/* Helper Summary Header */}
            <div className="flex items-center gap-3 p-3 bg-cream-100/60 rounded-xl border border-grayAccent-border/60">
              <img
                src={helper.photoUrl}
                alt={helper.fullName}
                className="w-11 h-11 rounded-full object-cover border border-sand"
              />
              <div className="min-w-0">
                <div className="font-bold text-charcoal text-sm truncate flex items-center gap-1.5">
                  {helper.fullName}
                  <span className="text-[10px] font-medium bg-sand/30 text-brown-700 px-1.5 py-0.2 rounded-full">
                    {helper.collegeName.split(" ")[0]}
                  </span>
                </div>
                <div className="text-[11px] text-brown-500 truncate">
                  {helper.achievements[0]?.title || helper.currentRole || helper.branch}
                </div>
              </div>
            </div>

            {/* Pre-filled sender info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                  Your College & Branch
                </label>
                <div className="p-2 bg-cream-50 rounded-lg border border-grayAccent-border/70 text-charcoal font-medium text-xs truncate">
                  {currentUser?.collegeName.split(" ")[0]} - {currentUser?.branch}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                  Graduation Batch
                </label>
                <div className="p-2 bg-cream-50 rounded-lg border border-grayAccent-border/70 text-charcoal font-medium text-xs">
                  Class of {currentUser?.graduationYear || "2027"}
                </div>
              </div>
            </div>

            {/* Topic Select */}
            <div>
              <label className="block text-[11px] font-semibold text-brown-400 mb-1">
                Help Topic / Goal
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full text-xs sm:text-sm bg-white border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
              >
                {helper.helpTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
                <option value="General Campus Guidance">Other / General Guidance</option>
              </select>
            </div>

            {/* Specific Question (min 30, max 300 chars) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-semibold text-brown-500">
                  Your Specific Question or Goal <span className="text-terracotta">*</span>
                </label>
                <span className={`text-[10px] ${charCount < 30 ? "text-amber-600 font-medium" : "text-brown-400"}`}>
                  {charCount}/300 {charCount < 30 ? `(min 30, ${30 - charCount} more needed)` : ""}
                </span>
              </div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                placeholder="Be specific! E.g.: 'I am in 3rd sem CSE preparing for GATE 2025. I wanted to ask your advice on standard books for OS and how you analyzed mock tests without coaching...'"
                className="w-full text-xs sm:text-sm bg-white border border-grayAccent-border rounded-xl p-3 text-charcoal focus:outline-none focus:border-terracotta"
                maxLength={300}
              />
              <p className="text-[10px] text-brown-400 mt-1">
                💡 Aedo rule: Structured questions prevent spam and help verified achievers give you high-yield advice.
              </p>
            </div>

            {/* Preferred Contact Type */}
            <div>
              <label className="block text-[11px] font-semibold text-brown-400 mb-1.5">
                Preferred Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "15-min meet", label: "15-min Meet", icon: Video },
                  { id: "chat", label: "Direct Chat", icon: MessageSquare },
                  { id: "either", label: "Either Mode", icon: Clock },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = contactType === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setContactType(mode.id as any)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-sand/20 border-sand text-brown-800 font-bold shadow-xs"
                          : "border-grayAccent-border text-brown-500 hover:bg-cream-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1 text-terracotta" />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

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
                disabled={!isQuestionValid || remainingDaily <= 0 || isSubmitting}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isQuestionValid && remainingDaily > 0 && !isSubmitting
                    ? "bg-terracotta text-white shadow-soft hover:bg-terracotta-600"
                    : "bg-grayAccent-border text-brown-300 cursor-not-allowed"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Sending..." : "Send Request"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

