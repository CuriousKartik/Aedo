"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Mail,
  Lock,
  Upload,
  UserCheck,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "login";

  const {
    loginWithEmail,
    signupWithEmail,
    joinWaitlist,
    switchPersona,
    colleges,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"login" | "signup" | "alumni">(
    initialTab as any
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlumniMode, setIsAlumniMode] = useState(false);
  const [alumniCollege, setAlumniCollege] = useState("Delhi Technological University (DTU)");
  const [docUploaded, setDocUploaded] = useState(false);

  // Status feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [waitlistPrompt, setWaitlistPrompt] = useState<{
    show: boolean;
    domain: string;
    email: string;
  }>({ show: false, domain: "", email: "" });
  const [waitlistDone, setWaitlistDone] = useState(false);
  const [customCollegeName, setCustomCollegeName] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setWaitlistPrompt({ show: false, domain: "", email: "" });

    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMsg("Please enter your college email address.");
      return;
    }

    const domain = trimmed.split("@")[1]?.toLowerCase();
    const result = loginWithEmail(trimmed);

    if (result.success) {
      router.push("/");
    } else if (result.isWaitlisted) {
      setWaitlistPrompt({ show: true, domain: domain || "unknown", email: trimmed });
    } else {
      setErrorMsg(result.error || "Login failed.");
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setWaitlistPrompt({ show: false, domain: "", email: "" });

    const trimmed = email.trim();
    const domain = trimmed.split("@")[1]?.toLowerCase();

    // Check if domain is allowed
    const matchedCollege = colleges.find((c) =>
      c.emailDomains.some((d) => domain === d.toLowerCase())
    );

    if (!matchedCollege && !isAlumniMode) {
      setWaitlistPrompt({ show: true, domain: domain || "unknown", email: trimmed });
      return;
    }

    const selectedCollegeObj =
      matchedCollege ||
      colleges.find((c) => c.name === alumniCollege) ||
      colleges[0];

    signupWithEmail(trimmed, selectedCollegeObj, isAlumniMode);
    // Route to 4-step onboarding per Section 5.1 & 5.2
    router.push("/onboarding");
  };

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    joinWaitlist(waitlistPrompt.email, customCollegeName || waitlistPrompt.domain);
    setWaitlistDone(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card border border-grayAccent-border/90 overflow-hidden">
        {/* Brand Header */}
        <div className="bg-gradient-to-br from-cream-100 to-gold/20 p-6 sm:p-8 text-center border-b border-grayAccent-border/70 relative">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-terracotta flex items-center justify-center text-white font-extrabold text-2xl shadow-soft mb-3">
            A
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal tracking-tight">
            Welcome to Aedo
          </h2>
          <p className="text-xs text-brown-500 mt-1 max-w-xs mx-auto">
            The college-verified network where students connect with verified achievers & alumni.
          </p>

          {/* Supported Domains Badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full text-brown-600 border border-sand/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pilot: IIT Bombay, BITS, DTU, IITD, NITK, IIITH</span>
          </div>
        </div>

        {/* Quick Demo Persona Switcher for Evaluation */}
        <div className="bg-cream-50 px-6 py-2.5 border-b border-grayAccent-border text-xs flex items-center justify-between">
          <span className="font-semibold text-brown-600 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-terracotta" />
            Quick Demo Login:
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => {
                switchPersona("usr-rahul");
                router.push("/");
              }}
              className="text-[11px] px-2 py-0.5 bg-white border border-grayAccent-border hover:border-terracotta rounded text-charcoal font-medium"
            >
              Rahul (Seeker)
            </button>
            <button
              onClick={() => {
                switchPersona("usr-arjun");
                router.push("/");
              }}
              className="text-[11px] px-2 py-0.5 bg-white border border-grayAccent-border hover:border-sand rounded text-charcoal font-medium"
            >
              Arjun (GATE AIR 120)
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-grayAccent-border">
          <button
            onClick={() => {
              setActiveTab("login");
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === "login"
                ? "border-terracotta text-terracotta bg-white"
                : "border-transparent text-brown-400 hover:text-charcoal bg-cream-50"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setActiveTab("signup");
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === "signup"
                ? "border-terracotta text-terracotta bg-white"
                : "border-transparent text-brown-400 hover:text-charcoal bg-cream-50"
            }`}
          >
            Student Sign Up
          </button>
          <button
            onClick={() => {
              setActiveTab("alumni");
              setIsAlumniMode(true);
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === "alumni"
                ? "border-terracotta text-terracotta bg-white"
                : "border-transparent text-brown-400 hover:text-charcoal bg-cream-50"
            }`}
          >
            Alumni Verify
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-4">
          {/* Waitlist Modal Prompt (Section 5.1 Requirement) */}
          {waitlistPrompt.show ? (
            <div className="bg-sand/15 border border-sand/50 rounded-2xl p-5 text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 mx-auto rounded-full bg-sand/20 text-brown-700 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-charcoal text-sm sm:text-base">
                  Your college isn't on the platform yet.
                </h4>
                <p className="text-xs text-brown-500 mt-1">
                  We're launching college networks in cohorts. Enter your institution name to join the priority campus waitlist!
                </p>
              </div>

              {waitlistDone ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You're on the waitlist! We'll notify @{waitlistPrompt.email}.</span>
                </div>
              ) : (
                <form onSubmit={handleJoinWaitlist} className="space-y-2 text-left">
                  <label className="block text-[11px] font-semibold text-brown-400">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customCollegeName}
                    onChange={(e) => setCustomCollegeName(e.target.value)}
                    placeholder="e.g. Thapar University, Manipal, RVCE..."
                    className="w-full text-xs bg-white border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setWaitlistPrompt({ show: false, domain: "", email: "" })}
                      className="px-3 py-2 rounded-xl text-xs text-brown-500 hover:bg-cream-100"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-terracotta text-white hover:bg-terracotta-600 shadow-soft"
                    >
                      Join Campus Waitlist
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : activeTab === "login" ? (
            /* Log In Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brown-500 mb-1">
                  College Email (@iitb.ac.in, @dtu.ac.in, etc.)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brown-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@dtu.ac.in"
                    className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl pl-9 pr-3 py-2.5 text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-brown-400">
                  <span>Try: rahul@dtu.ac.in or arjun@iitb.ac.in</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-500 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brown-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl pl-9 pr-3 py-2.5 text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-terracotta hover:bg-terracotta-600 text-white shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Aedo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : activeTab === "signup" ? (
            /* Student Sign Up Form */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brown-500 mb-1">
                  Official College Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brown-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@iitb.ac.in"
                    className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl pl-9 pr-3 py-2.5 text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <p className="text-[10px] text-brown-400 mt-1">
                  🔒 We verify the domain of your college to keep conversations authentic and free from fake profiles.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-500 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brown-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl pl-9 pr-3 py-2.5 text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-terracotta hover:bg-terracotta-600 text-white shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <span>Verify & Start Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Alumni Verification Form (Section 5.1 Requirement) */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="p-3 bg-cream-50 rounded-xl border border-grayAccent-border text-xs text-brown-600">
                🎓 <strong>Alumni with lapsed college email:</strong> You can sign up using your personal email + upload your degree certificate or student ID card for admin verification.
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-500 mb-1">
                  Alma Mater (Your College)
                </label>
                <select
                  value={alumniCollege}
                  onChange={(e) => setAlumniCollege(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                >
                  {colleges.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-500 mb-1">
                  Personal / Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com or name@company.com"
                  className="w-full text-xs sm:text-sm bg-cream-50 border border-grayAccent-border rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-500 mb-1">
                  Degree Certificate or ID Card (Manual Verification)
                </label>
                <div
                  onClick={() => setDocUploaded(true)}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    docUploaded
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                      : "border-grayAccent-border hover:border-sand bg-cream-50"
                  }`}
                >
                  <Upload className="w-5 h-5 mx-auto mb-1 text-terracotta" />
                  <span className="text-xs font-medium">
                    {docUploaded ? "✓ Degree Certificate Attached" : "Click to upload alumni proof (PDF / JPG)"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-terracotta hover:bg-terracotta-600 text-white shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Alumni Verification & Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Privacy Note compliant with Section 10 */}
          <p className="text-[10px] text-center text-brown-400">
            By continuing, you agree to Aedo's Terms & Community Guidelines. Compliant with India's DPDP Act. No public display of phone numbers or personal emails.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-brown-400 text-sm">Loading verification...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
