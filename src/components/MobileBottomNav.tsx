"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Users, MessageSquare, Calendar, Sparkles, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { currentUser, conversations, requests, bookings } = useApp();

  const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const activeBookings = bookings.filter((b) => b.status === "confirmed").length;

  const tabs = [
    { label: "Search", href: "/", icon: Compass },
    { label: "Network", href: "/network", icon: Users },
    { label: "Chat", href: "/messages", icon: MessageSquare, badge: totalUnread > 0 ? totalUnread : undefined },
    { label: "Meets", href: "/meets", icon: Calendar, badge: activeBookings > 0 ? activeBookings : undefined },
    { label: "Events", href: "/events", icon: Sparkles },
    {
      label: "Profile",
      href: currentUser ? `/u/${currentUser.username}` : "/login",
      icon: User,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-grayAccent-border shadow-lg px-2 py-1.5 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-medium transition-all ${
              isActive
                ? "text-terracotta font-bold"
                : "text-brown-500 hover:text-charcoal"
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? "text-terracotta scale-110" : "text-brown-400"}`} />
              {tab.badge && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-terracotta text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="mt-0.5">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
