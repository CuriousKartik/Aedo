"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Compass,
  Users,
  MessageSquare,
  Calendar,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  LogOut,
  UserCheck,
  ChevronDown,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";

interface NavbarProps {
  onOpenCreateEvent?: () => void;
}

export default function Navbar({ onOpenCreateEvent }: NavbarProps) {
  const pathname = usePathname();
  const {
    currentUser,
    isAuthenticated,
    logout,
    switchPersona,
    profiles,
    requests,
    conversations,
    bookings,
  } = useApp();

  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Unread messages and pending requests count
  const pendingRequestsCount = requests.filter(
    (r) => r.receiverId === currentUser?.id && r.status === "pending"
  ).length;

  const totalUnreadMessages = conversations.reduce(
    (acc, c) => acc + (c.unreadCount || 0),
    0
  );

  const navItems = [
    { label: "Search & Goal Match", href: "/", icon: Compass },
    { label: "My Network", href: "/network", icon: Users },
    {
      label: "Messages",
      href: "/messages",
      icon: MessageSquare,
      badge: totalUnreadMessages > 0 ? totalUnreadMessages : undefined,
    },
    {
      label: "1:1 Meets",
      href: "/meets",
      icon: Calendar,
      badge: bookings.filter((b) => b.status === "confirmed").length || undefined,
    },
    { label: "Events & Q&A", href: "/events", icon: Sparkles },
    {
      label: "Alumni Directory",
      href: `/colleges/${currentUser?.collegeId ? currentUser.collegeId.replace("col-", "") : "dtu"}/alumni`,
      icon: GraduationCap,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-grayAccent-border shadow-xs">
      {/* Top Banner: Showcase & Persona Switcher */}
      <div className="bg-brown-500 text-cream-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-medium bg-sand/30 text-gold px-2 py-0.5 rounded-full text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-sand" /> Verified College Network MVP
          </span>
          <span className="hidden sm:inline text-cream-300">
            Reach the people who have already done it.
          </span>
        </div>

        {/* Demo Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsPersonaOpen(!isPersonaOpen)}
            className="flex items-center gap-1.5 bg-brown-600 hover:bg-brown-700 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors text-cream-100 border border-brown-400/40"
          >
            <UserCheck className="w-3 h-3 text-sand" />
            <span>Viewing as: <strong className="text-gold">{currentUser?.fullName || "Guest"}</strong> ({currentUser?.collegeName?.split(" ")[0] || "None"})</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>

          {isPersonaOpen && (
            <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-xl shadow-card border border-grayAccent-border py-2 text-charcoal z-50">
              <div className="px-3 py-1.5 border-b border-grayAccent-border/60 text-[11px] font-semibold text-brown-500">
                Switch Interactive Showcase Persona
              </div>
              <button
                onClick={() => {
                  switchPersona("usr-rahul");
                  setIsPersonaOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-cream-100 ${
                  currentUser?.id === "usr-rahul" ? "bg-cream-200/60 font-semibold" : ""
                }`}
              >
                <div>
                  <div className="text-charcoal font-medium">Rahul Sharma (Seeker)</div>
                  <div className="text-[11px] text-brown-400">2nd Year CSE @ DTU</div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-terracotta-100 text-terracotta rounded">Student</span>
              </button>

              <button
                onClick={() => {
                  switchPersona("usr-arjun");
                  setIsPersonaOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-cream-100 ${
                  currentUser?.id === "usr-arjun" ? "bg-cream-200/60 font-semibold" : ""
                }`}
              >
                <div>
                  <div className="text-charcoal font-medium">Arjun Mehta (Helper)</div>
                  <div className="text-[11px] text-brown-400">GATE AIR 120 @ IIT Bombay</div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-gold text-brown-600 font-medium rounded">Top Helper</span>
              </button>

              <button
                onClick={() => {
                  switchPersona("usr-priya");
                  setIsPersonaOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-cream-100 ${
                  currentUser?.id === "usr-priya" ? "bg-cream-200/60 font-semibold" : ""
                }`}
              >
                <div>
                  <div className="text-charcoal font-medium">Priya Nair (Alumna)</div>
                  <div className="text-[11px] text-brown-400">SWE II @ Google (BITS Pilani)</div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-sand-light text-brown-700 rounded">Alumna</span>
              </button>

              <div className="mt-2 pt-2 border-t border-grayAccent-border/60 px-2 flex justify-between">
                <Link
                  href="/onboarding"
                  onClick={() => setIsPersonaOpen(false)}
                  className="text-[11px] text-terracotta font-medium hover:underline flex items-center gap-1"
                >
                  <PlusCircle className="w-3 h-3" /> Create custom profile
                </Link>
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      logout();
                      setIsPersonaOpen(false);
                    }}
                    className="text-[11px] text-charcoal-50 hover:text-charcoal flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" /> Log out
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-terracotta flex items-center justify-center text-cream-50 font-bold text-xl shadow-soft group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-charcoal flex items-center gap-1">
                  Aedo
                  <span className="text-[10px] font-semibold bg-sand/20 text-brown-600 px-1.5 py-0.2 rounded uppercase tracking-wider">
                    MVP
                  </span>
                </span>
                <span className="text-[11px] text-brown-400 hidden md:inline leading-none">
                  Reach the people who have already done it
                </span>
              </div>
            </Link>

            {/* Current User College Pill */}
            {currentUser && (
              <div className="hidden lg:flex items-center gap-1.5 bg-cream-200/80 px-2.5 py-1 rounded-full text-xs text-charcoal border border-grayAccent-border">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium truncate max-w-[160px]">{currentUser.collegeName}</span>
                <span className="text-[10px] text-brown-400">(@{currentUser.collegeDomain})</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-terracotta text-white shadow-soft font-semibold"
                      : "text-brown-500 hover:text-charcoal hover:bg-cream-200/70"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-white text-terracotta" : "bg-terracotta text-white"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: User Menu or Login */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href={`/u/${currentUser.username}`}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-cream-200 border border-transparent hover:border-grayAccent-border transition-all"
                  title="View your Topmate-style public profile"
                >
                  <img
                    src={currentUser.photoUrl}
                    alt={currentUser.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-sand"
                  />
                  <div className="hidden xl:block text-left text-xs">
                    <div className="font-semibold text-charcoal leading-tight">
                      {currentUser.fullName}
                    </div>
                    <div className="text-[10px] text-terracotta font-medium">
                      /u/{currentUser.username}
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-charcoal hover:text-terracotta transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/login?tab=signup"
                  className="px-3.5 py-1.5 text-xs font-semibold bg-terracotta text-white rounded-lg shadow-soft hover:bg-terracotta-600 transition-colors"
                >
                  Join with College Email
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-brown-500 hover:text-charcoal hover:bg-cream-200"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cream-100 border-b border-grayAccent-border px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-terracotta text-white font-semibold"
                    : "text-brown-500 hover:bg-cream-200 hover:text-charcoal"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-terracotta text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-grayAccent-border mt-2">
            {currentUser ? (
              <div className="space-y-2">
                <Link
                  href={`/u/${currentUser.username}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-charcoal font-medium hover:bg-cream-200 rounded-lg"
                >
                  <img
                    src={currentUser.photoUrl}
                    alt={currentUser.fullName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>My Public Profile (/u/{currentUser.username})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-terracotta hover:bg-cream-200 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold text-charcoal bg-white border border-grayAccent-border rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  href="/login?tab=signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold text-white bg-terracotta rounded-lg"
                >
                  Join with College Email
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
