"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Profile,
  College,
  Goal,
  ConnectionRequest,
  Conversation,
  MessageItem,
  Booking,
  EventItem,
  COLLEGES,
  GOALS,
  PROFILES,
  CURRENT_USER_DEFAULT,
  INITIAL_REQUESTS,
  INITIAL_CONVERSATIONS,
  INITIAL_BOOKINGS,
  INITIAL_EVENTS,
} from "@/data/mockData";

interface WaitlistEntry {
  email: string;
  collegeName: string;
  createdAt: string;
}

interface AppContextType {
  currentUser: Profile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Profile | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  profiles: Profile[];
  colleges: College[];
  goals: Goal[];
  requests: ConnectionRequest[];
  conversations: Conversation[];
  bookings: Booking[];
  events: EventItem[];
  waitlist: WaitlistEntry[];
  dailyRequestsSent: number;
  maxDailyRequests: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeGoal: string;
  setActiveGoal: (g: string) => void;
  
  // Actions
  loginWithEmail: (email: string) => { success: boolean; error?: string; isWaitlisted?: boolean; college?: College };
  signupWithEmail: (email: string, college: College, isAlumnus?: boolean) => { success: boolean; error?: string };
  joinWaitlist: (email: string, collegeName: string) => void;
  logout: () => void;
  switchPersona: (personaId: string) => void;
  completeOnboarding: (newProfileData: Partial<Profile>) => void;
  sendConnectionRequest: (
    receiverId: string,
    goalTopic: string,
    message: string,
    preferredContact: "chat" | "15-min meet" | "either"
  ) => { success: boolean; error?: string };
  respondToRequest: (requestId: string, action: "accept" | "decline", reason?: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  bookMeeting: (
    helperId: string,
    sessionTitle: string,
    durationMinutes: 15 | 30,
    date: string,
    timeSlot: string,
    notes?: string
  ) => { success: boolean; bookingId: string };
  cancelBooking: (bookingId: string) => void;
  toggleEventRsvp: (eventId: string) => void;
  createEvent: (newEvent: Omit<EventItem, "id" | "attendeeCount" | "hasRsvpd" | "hostId" | "hostName" | "hostRole" | "hostCollege" | "hostAvatar">) => void;
  followGoal: (goalSlug: string) => void;
  followedGoals: string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Profile | null>(CURRENT_USER_DEFAULT);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [profiles, setProfiles] = useState<Profile[]>(PROFILES);
  const [colleges] = useState<College[]>(COLLEGES);
  const [goals] = useState<Goal[]>(GOALS);
  const [requests, setRequests] = useState<ConnectionRequest[]>(INITIAL_REQUESTS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([
    { email: "student@thapar.edu", collegeName: "Thapar Institute", createdAt: "2 days ago" },
  ]);
  const [dailyRequestsSent, setDailyRequestsSent] = useState<number>(1);
  const maxDailyRequests = 5;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeGoal, setActiveGoal] = useState<string>("");
  const [followedGoals, setFollowedGoals] = useState<string[]>(["Crack GATE CSE"]);

  // Login handler
  const loginWithEmail = (email: string) => {
    const domain = email.split("@")[1]?.toLowerCase().trim();
    if (!domain) {
      return { success: false, error: "Please enter a valid email address." };
    }

    // Match college domain
    const matchedCollege = colleges.find((c) =>
      c.emailDomains.some((d) => domain === d.toLowerCase())
    );

    if (!matchedCollege) {
      return {
        success: false,
        isWaitlisted: true,
        error: "Your college domain isn't on Aedo yet. Join the waitlist to unlock your campus network!",
      };
    }

    // Check if profile exists for this email
    const existing = profiles.find((p) => p.collegeDomain.toLowerCase() === domain);
    if (existing) {
      setCurrentUser(existing);
    } else {
      // Default to Rahul for DTU or create active user
      setCurrentUser({
        ...CURRENT_USER_DEFAULT,
        collegeId: matchedCollege.id,
        collegeName: matchedCollege.name,
        collegeDomain: domain,
      });
    }
    setIsAuthenticated(true);
    return { success: true, college: matchedCollege };
  };

  const signupWithEmail = (email: string, college: College, isAlumnus = false) => {
    const domain = email.split("@")[1]?.toLowerCase().trim();
    if (!domain && !isAlumnus) {
      return { success: false, error: "Invalid email." };
    }

    // Create draft user
    const draftUser: Profile = {
      ...CURRENT_USER_DEFAULT,
      id: `usr-${Date.now()}`,
      fullName: "New Member",
      username: `user_${Date.now().toString().slice(-4)}`,
      collegeId: college.id,
      collegeName: college.name,
      collegeDomain: domain || college.emailDomains[0],
      role: isAlumnus ? "alumnus" : "student",
      verificationStatus: isAlumnus ? "pending" : "verified",
      achievements: [],
      helpTopics: [],
      goals: [],
    };

    setCurrentUser(draftUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const joinWaitlist = (email: string, collegeName: string) => {
    setWaitlist((prev) => [
      { email, collegeName: collegeName || "Custom College", createdAt: "Just now" },
      ...prev,
    ]);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const switchPersona = (personaId: string) => {
    if (personaId === "usr-rahul") {
      setCurrentUser(CURRENT_USER_DEFAULT);
      setIsAuthenticated(true);
    } else {
      const match = profiles.find((p) => p.id === personaId);
      if (match) {
        setCurrentUser(match);
        setIsAuthenticated(true);
      }
    }
  };

  const completeOnboarding = (data: Partial<Profile>) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      ...data,
      verificationStatus: (currentUser.role === "alumnus" && !currentUser.collegeDomain.includes(".ac.in")) ? "pending" : "verified",
    } as Profile;
    setCurrentUser(updated);
    setProfiles((prev) => {
      const idx = prev.findIndex((p) => p.id === updated.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      }
      return [updated, ...prev];
    });
  };

  const sendConnectionRequest = (
    receiverId: string,
    goalTopic: string,
    message: string,
    preferredContact: "chat" | "15-min meet" | "either"
  ) => {
    if (!currentUser) return { success: false, error: "Please log in first." };
    if (dailyRequestsSent >= maxDailyRequests) {
      return { success: false, error: "Daily limit reached (5 requests/day). Resets at midnight." };
    }
    const receiver = profiles.find((p) => p.id === receiverId);
    if (!receiver) return { success: false, error: "Helper profile not found." };

    // Check existing pending request
    const existing = requests.find(
      (r) => r.senderId === currentUser.id && r.receiverId === receiverId && r.status === "pending"
    );
    if (existing) {
      return { success: false, error: "You already have a pending request with this helper." };
    }

    const newReq: ConnectionRequest = {
      id: `req-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderPhoto: currentUser.photoUrl,
      senderCollege: currentUser.collegeName,
      senderBranch: `${currentUser.branch} (${currentUser.graduationYear})`,
      senderYear: currentUser.graduationYear.toString(),
      receiverId: receiver.id,
      receiverName: receiver.fullName,
      goalTopic,
      message,
      preferredContact,
      status: "pending",
      createdAt: "Just now",
      expiresAt: "In 7 days",
    };

    setRequests((prev) => [newReq, ...prev]);
    setDailyRequestsSent((c) => c + 1);

    return { success: true };
  };

  const respondToRequest = (requestId: string, action: "accept" | "decline", reason?: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: action === "accept" ? "accepted" : "declined",
            declineReason: reason,
          };
        }
        return r;
      })
    );

    if (action === "accept") {
      const req = requests.find((r) => r.id === requestId);
      if (req) {
        const otherUserId = req.senderId === currentUser?.id ? req.receiverId : req.senderId;
        const otherProfile = profiles.find((p) => p.id === otherUserId) || CURRENT_USER_DEFAULT;

        // Check if conversation exists
        const exists = conversations.find((c) => c.otherUser.id === otherUserId);
        if (!exists) {
          const newConv: Conversation = {
            id: `conv-${Date.now()}`,
            requestId: req.id,
            otherUser: {
              id: otherProfile.id,
              name: otherProfile.fullName,
              photo: otherProfile.photoUrl,
              college: otherProfile.collegeName,
              role: otherProfile.achievements[0]?.title || otherProfile.branch,
              username: otherProfile.username,
            },
            lastMessage: req.message,
            lastMessageTime: "Just now",
            unreadCount: 0,
            messages: [
              {
                id: `msg-${Date.now()}`,
                conversationId: `conv-${Date.now()}`,
                senderId: req.senderId,
                senderName: req.senderName,
                text: req.message,
                createdAt: "Initial request",
                read: true,
              },
            ],
          };
          setConversations((c) => [newConv, ...c]);
        }
      }
    }
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!currentUser || !text.trim()) return;
    const newMsg: MessageItem = {
      id: `m-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      text: text.trim(),
      createdAt: "Just now",
      read: true,
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: text.trim(),
            lastMessageTime: "Just now",
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );
  };

  const bookMeeting = (
    helperId: string,
    sessionTitle: string,
    durationMinutes: 15 | 30,
    date: string,
    timeSlot: string,
    notes?: string
  ) => {
    const helper = profiles.find((p) => p.id === helperId);
    const bookingId = `bk-${Date.now()}`;
    const cleanUuid = Math.random().toString(36).substring(2, 9);
    const meetingUrl = `https://meet.jit.si/aedo-${cleanUuid}`;

    const newBooking: Booking = {
      id: bookingId,
      helperId,
      helperName: helper?.fullName || "Aedo Helper",
      helperCollege: helper?.collegeName || "Verified College",
      seekerId: currentUser?.id || "usr-anon",
      seekerName: currentUser?.fullName || "Student",
      sessionTitle,
      durationMinutes,
      date,
      timeSlot,
      meetingUrl,
      status: "confirmed",
      notes,
      createdAt: "Just now",
    };

    setBookings((prev) => [newBooking, ...prev]);
    return { success: true, bookingId };
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
    );
  };

  const toggleEventRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const isGoing = !ev.hasRsvpd;
          return {
            ...ev,
            hasRsvpd: isGoing,
            attendeeCount: isGoing ? ev.attendeeCount + 1 : Math.max(0, ev.attendeeCount - 1),
          };
        }
        return ev;
      })
    );
  };

  const createEvent = (newEvent: Omit<EventItem, "id" | "attendeeCount" | "hasRsvpd" | "hostId" | "hostName" | "hostRole" | "hostCollege" | "hostAvatar">) => {
    if (!currentUser) return;
    const cleanId = `ev-${Date.now()}`;
    const cleanUuid = Math.random().toString(36).substring(2, 9);
    const created: EventItem = {
      ...newEvent,
      id: cleanId,
      hostId: currentUser.id,
      hostName: currentUser.fullName,
      hostRole: currentUser.role === "alumnus" ? `${currentUser.currentRole || "Alumnus"} @ ${currentUser.currentCompany || currentUser.collegeName}` : `${currentUser.degree} ${currentUser.branch}`,
      hostCollege: currentUser.collegeName,
      hostAvatar: currentUser.photoUrl,
      meetingUrl: newEvent.meetingUrl || `https://meet.jit.si/aedo-event-${cleanUuid}`,
      attendeeCount: 1,
      hasRsvpd: true,
    };
    setEvents((prev) => [created, ...prev]);
  };

  const followGoal = (goalSlug: string) => {
    setFollowedGoals((prev) =>
      prev.includes(goalSlug) ? prev.filter((g) => g !== goalSlug) : [...prev, goalSlug]
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
        profiles,
        colleges,
        goals,
        requests,
        conversations,
        bookings,
        events,
        waitlist,
        dailyRequestsSent,
        maxDailyRequests,
        searchQuery,
        setSearchQuery,
        activeGoal,
        setActiveGoal,
        loginWithEmail,
        signupWithEmail,
        joinWaitlist,
        logout,
        switchPersona,
        completeOnboarding,
        sendConnectionRequest,
        respondToRequest,
        sendMessage,
        bookMeeting,
        cancelBooking,
        toggleEventRsvp,
        createEvent,
        followGoal,
        followedGoals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
