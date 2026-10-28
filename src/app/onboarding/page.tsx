"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Calendar,
  Clock,
  Plus,
  Trash2,
  HelpCircle,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Achievement, AvailabilitySlot } from "@/data/mockData";

export default function OnboardingPage() {
  const router = useRouter();
  const { currentUser, completeOnboarding, goals } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Basics
  const [fullName, setFullName] = useState(currentUser?.fullName || "Rahul Sharma");
  const [collegeName, setCollegeName] = useState(currentUser?.collegeName || "Delhi Technological University (DTU)");
  const [branch, setBranch] = useState(currentUser?.branch || "Computer Science");
  const [degree, setDegree] = useState(currentUser?.degree || "B.Tech");
  const [startYear, setStartYear] = useState<number>(currentUser?.startYear || 2023);
  const [graduationYear, setGraduationYear] = useState<number>(currentUser?.graduationYear || 2027);
  const [homeState, setHomeState] = useState(currentUser?.homeState || "Delhi");

  // Step 2: Goals (what I want)
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    currentUser?.goals || ["Get a Google Internship", "Crack GATE CSE"]
  );
  const [helpNote, setHelpNote] = useState<string>("");

  // Step 3: Achievements (what I have done - cannot skip!)
  const [achievements, setAchievements] = useState<Achievement[]>(
    currentUser?.achievements.length
      ? currentUser.achievements
      : [
          {
            id: "ach-init-1",
            profileId: currentUser?.id || "usr-self",
            title: "GATE CSE 2024",
            detail: "AIR 120 (Score: 842 / 1000)",
            year: 2024,
            category: "Competitive exams",
          },
        ]
  );
  const [journeyNote, setJourneyNote] = useState<string>(
    currentUser?.journeyNote ||
      "Prepared consistently alongside semester exams using standard textbooks and test series analysis."
  );

  // Form fields for adding new achievement
  const [newAchTitle, setNewAchTitle] = useState("");
  const [newAchDetail, setNewAchDetail] = useState("");
  const [newAchYear, setNewAchYear] = useState(2024);
  const [newAchCategory, setNewAchCategory] = useState("Competitive exams");

  // Step 4: Helping and availability
  const [openToHelp, setOpenToHelp] = useState<boolean>(true);
  const [helpTopics, setHelpTopics] = useState<string[]>(
    currentUser?.helpTopics.length
      ? currentUser.helpTopics
      : ["Crack GATE CSE", "Coding & DSA Interviews"]
  );
  const [maxRequestsPerWeek, setMaxRequestsPerWeek] = useState<number>(8);
  const [weeklyAvailability, setWeeklyAvailability] = useState<AvailabilitySlot[]>([
    { dayOfWeek: 2, dayName: "Tuesday", startTime: "19:00", endTime: "21:00" },
    { dayOfWeek: 6, dayName: "Saturday", startTime: "16:00", endTime: "19:00" },
  ]);

  const toggleGoal = (name: string) => {
    setSelectedGoals((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    );
  };

  const toggleHelpTopic = (name: string) => {
    setHelpTopics((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const handleAddAchievement = () => {
    if (!newAchTitle.trim() || !newAchDetail.trim()) return;
    const item: Achievement = {
      id: `ach-${Date.now()}`,
      profileId: currentUser?.id || "usr-self",
      title: newAchTitle.trim(),
      detail: newAchDetail.trim(),
      year: newAchYear,
      category: newAchCategory,
    };
    setAchievements([...achievements, item]);
    setNewAchTitle("");
    setNewAchDetail("");
  };

  const handleRemoveAchievement = (id: string) => {
    setAchievements(achievements.filter((a) => a.id !== id));
  };

  const handleFinish = () => {
    // Auto-set role based on grad year per Section 5.2
    const currentYear = new Date().getFullYear();
    const role = graduationYear > currentYear ? "student" : "alumnus";

    completeOnboarding({
      fullName,
      collegeName,
      branch,
      degree,
      startYear,
      graduationYear,
      role,
      homeState,
      goals: selectedGoals,
      achievements,
      journeyNote,
      openToHelp,
      helpTopics,
      maxRequestsPerWeek,
      weeklyAvailability,
    });

    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-card border border-grayAccent-border overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-cream-100 p-6 border-b border-grayAccent-border">
          <div className="flex items-center justify-between text-xs font-semibold text-brown-500 mb-2">
            <span>Step {step} of 4: {step === 1 ? "Basics" : step === 2 ? "Goals (What I want)" : step === 3 ? "Achievements (What I've done)" : "Helping & Availability"}</span>
            <span className="text-terracotta font-bold">{step * 25}%</span>
          </div>
          <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-terracotta h-full transition-all duration-300 rounded-full"
              style={{ width: `${step * 25}%` }}
            ></div>
          </div>
        </div>

        {/* Step Contents */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-charcoal">Profile Basics</h3>
                <p className="text-xs text-brown-400 mt-0.5">
                  Your college details are verified by email domain.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brown-400 mb-1">
                    College (Verified)
                  </label>
                  <div className="text-xs bg-cream-100 border border-grayAccent-border/80 rounded-xl px-3 py-2 text-charcoal font-semibold truncate">
                    {collegeName}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown-400 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="B.Tech, B.Sc, MBA, etc."
                    className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brown-400 mb-1">
                    Branch / Major
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science & Engg"
                    className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown-400 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(parseInt(e.target.value) || 2027)}
                    className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                  />
                  <div className="text-[10px] text-brown-400 mt-1">
                    Role auto-set: {graduationYear >= 2026 ? "Currently Enrolled Student" : "Alumnus"}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-400 mb-1">
                  Home State (Optional for relatable matching)
                </label>
                <input
                  type="text"
                  value={homeState}
                  onChange={(e) => setHomeState(e.target.value)}
                  placeholder="e.g. Maharashtra, Delhi, Karnataka"
                  className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                >
                  <span>Next: Set Goals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: GOALS (WHAT I WANT) */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-charcoal">What are you aiming for?</h3>
                <p className="text-xs text-brown-400 mt-0.5">
                  Select the goals you want guidance on. Aedo will match you with seniors who did it.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {goals.map((g) => {
                  const isSelected = selectedGoals.includes(g.name);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => toggleGoal(g.name)}
                      className={`text-xs px-3.5 py-2 rounded-xl font-medium transition-all ${
                        isSelected
                          ? "bg-terracotta text-white shadow-soft font-semibold"
                          : "bg-cream-100 text-charcoal border border-grayAccent-border hover:bg-gold/40"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {g.name}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3">
                <label className="block text-xs font-semibold text-brown-400 mb-1">
                  What do you need help with right now? (Optional, max 200 chars)
                </label>
                <textarea
                  value={helpNote}
                  onChange={(e) => setHelpNote(e.target.value)}
                  maxLength={200}
                  rows={2}
                  placeholder="e.g. In 2nd year CSE, looking for roadmaps to crack off-campus internships..."
                  className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl p-3 text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-brown-400 hover:text-charcoal"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                >
                  <span>Next: Achievements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ACHIEVEMENTS (WHAT I HAVE DONE) - CANNOT BE SKIPPED */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-3.5 bg-sand/15 border border-sand/60 rounded-2xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brown-800 uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4 text-terracotta" />
                  Why this step is mandatory (Section 5.2):
                </div>
                <p className="text-xs text-brown-600 leading-relaxed">
                  Aedo is built around real achievements and journey notes, not corporate job titles. This step is what directly powers the goal-based search algorithm so peers can find and trust you.
                </p>
              </div>

              {/* Existing Achievements list */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-charcoal">
                  Your Listed Achievements ({achievements.length}/10):
                </label>
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-3 rounded-xl bg-cream-50 border border-grayAccent-border flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-xs text-charcoal flex items-center gap-1.5">
                        {ach.title}
                        <span className="text-[10px] text-brown-400 font-normal">({ach.year})</span>
                      </div>
                      <div className="text-[11px] text-brown-500">{ach.detail}</div>
                    </div>
                    {achievements.length > 1 && (
                      <button
                        onClick={() => handleRemoveAchievement(ach.id)}
                        className="p-1 text-brown-300 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Achievement Box */}
              <div className="p-3.5 bg-white border border-dashed border-sand rounded-2xl space-y-2.5">
                <div className="text-xs font-bold text-charcoal flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5 text-terracotta" /> Add Achievement
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newAchTitle}
                    onChange={(e) => setNewAchTitle(e.target.value)}
                    placeholder="Title (e.g. GATE CSE 2024)"
                    className="text-xs bg-cream-50 border border-grayAccent-border rounded-lg px-2.5 py-1.5"
                  />
                  <input
                    type="text"
                    value={newAchDetail}
                    onChange={(e) => setNewAchDetail(e.target.value)}
                    placeholder="Result (e.g. AIR 120 or Google STEP)"
                    className="text-xs bg-cream-50 border border-grayAccent-border rounded-lg px-2.5 py-1.5"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={newAchCategory}
                    onChange={(e) => setNewAchCategory(e.target.value)}
                    className="text-xs bg-cream-50 border border-grayAccent-border rounded-lg px-2 py-1.5 flex-1"
                  >
                    <option value="Competitive exams">Competitive exams</option>
                    <option value="Internships">Internships</option>
                    <option value="Placements">Placements</option>
                    <option value="Skills">Skills / Coding</option>
                    <option value="Startups and projects">Startups and projects</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddAchievement}
                    className="px-3 py-1.5 bg-sand text-white text-xs font-bold rounded-lg hover:bg-sand-dark"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Journey Note (max 400 chars) */}
              <div>
                <label className="block text-xs font-semibold text-brown-400 mb-1">
                  Short Journey Note: "How I did it" (max 400 characters) *
                </label>
                <textarea
                  value={journeyNote}
                  onChange={(e) => setJourneyNote(e.target.value)}
                  maxLength={400}
                  rows={3}
                  required
                  placeholder="Share a short summary of how you achieved this so students understand your background..."
                  className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl p-3 text-charcoal focus:outline-none focus:border-terracotta font-medium"
                />
                <div className="text-[10px] text-right text-brown-400 mt-1">
                  {journeyNote.length}/400
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-brown-400 hover:text-charcoal"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={achievements.length === 0 || !journeyNote.trim()}
                  onClick={() => setStep(4)}
                  className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold transition-all ${
                    achievements.length > 0 && journeyNote.trim()
                      ? "bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                      : "bg-grayAccent-border text-brown-300 cursor-not-allowed"
                  }`}
                >
                  <span>Next: Helping & Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: HELPING AND AVAILABILITY */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-charcoal">Helping & 1:1 Availability</h3>
                <p className="text-xs text-brown-400 mt-0.5">
                  Control how students can reach you. You can set weekly caps and time windows.
                </p>
              </div>

              {/* Open to help toggle */}
              <div className="p-4 bg-cream-50 rounded-2xl border border-grayAccent-border flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-charcoal">
                    "Open to Help" Switch
                  </div>
                  <div className="text-xs text-brown-400">
                    Appear in goal-based search for topics you select.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={openToHelp}
                  onChange={(e) => setOpenToHelp(e.target.checked)}
                  className="w-5 h-5 rounded text-terracotta focus:ring-terracotta cursor-pointer"
                />
              </div>

              {openToHelp && (
                <>
                  {/* Select Help Topics */}
                  <div>
                    <label className="block text-xs font-semibold text-brown-400 mb-1.5">
                      Topics You Can Help With
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {goals.map((g) => {
                        const isSelected = helpTopics.includes(g.name);
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => toggleHelpTopic(g.name)}
                            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                              isSelected
                                ? "bg-sand text-white font-bold"
                                : "bg-cream-100 text-charcoal border border-grayAccent-border"
                            }`}
                          >
                            {isSelected ? "✓ " : "+ "}
                            {g.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Weekly Incoming Requests Cap */}
                  <div>
                    <label className="block text-xs font-semibold text-brown-400 mb-1">
                      Max Incoming Requests Per Week: <strong>{maxRequestsPerWeek}</strong>
                    </label>
                    <input
                      type="range"
                      min={2}
                      max={20}
                      value={maxRequestsPerWeek}
                      onChange={(e) => setMaxRequestsPerWeek(parseInt(e.target.value))}
                      className="w-full accent-terracotta"
                    />
                    <div className="flex justify-between text-[10px] text-brown-400">
                      <span>2 requests (Light)</span>
                      <span>10 requests (Default)</span>
                      <span>20 requests (Active)</span>
                    </div>
                  </div>

                  {/* Availability Windows */}
                  <div>
                    <label className="block text-xs font-semibold text-brown-400 mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sand" />
                      Weekly 1:1 Availability Windows (Asia/Kolkata):
                    </label>
                    <div className="space-y-1.5">
                      {weeklyAvailability.map((slot, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-cream-100 rounded-xl flex items-center justify-between text-xs font-medium"
                        >
                          <span className="font-semibold text-charcoal">{slot.dayName}</span>
                          <span className="text-brown-600">{slot.startTime} - {slot.endTime} IST</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-brown-400 hover:text-charcoal"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                >
                  <span>Complete & Enter Aedo</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

