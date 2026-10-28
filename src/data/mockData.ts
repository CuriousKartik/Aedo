export interface College {
  id: string;
  name: string;
  slug: string;
  emailDomains: string[];
  city: string;
  state: string;
  logo: string;
  isActive: boolean;
  alumniCount: number;
  studentsCount: number;
}

export interface Goal {
  id: string;
  slug: string;
  name: string;
  category: string;
  synonyms: string[];
  isPopular?: boolean;
}

export interface Achievement {
  id: string;
  profileId: string;
  goalId?: string;
  title: string;
  detail: string;
  year: number;
  proofUrl?: string;
  category?: string;
}

export interface AvailabilitySlot {
  dayOfWeek: number; // 0: Sun, 1: Mon, ... 6: Sat
  dayName: string;
  startTime: string; // "18:00"
  endTime: string;   // "20:00"
}

export interface SessionType {
  id: string;
  helperId: string;
  title: string;
  description: string;
  durationMinutes: 15 | 30;
  requiresApproval: boolean;
  allowDirectBooking: boolean;
  priceInr: number;
  topicGoal: string;
}

export interface Profile {
  id: string;
  fullName: string;
  username: string;
  photoUrl: string;
  collegeId: string;
  collegeName: string;
  collegeDomain: string;
  branch: string;
  degree: string;
  startYear: number;
  graduationYear: number;
  role: "student" | "alumnus" | "admin";
  homeState: string;
  journeyNote: string;
  currentCompany?: string;
  currentRole?: string;
  openToHelp: boolean;
  maxRequestsPerWeek: number;
  timezone: string;
  verificationStatus: "verified" | "pending" | "rejected";
  achievements: Achievement[];
  helpTopics: string[];
  goals: string[];
  weeklyAvailability: AvailabilitySlot[];
  sessionTypes: SessionType[];
  stats: {
    helpedCount: number;
    averageRating: number;
    responseRate: number; // percentage
    medianResponseHours: number;
    ratingsCount: number;
  };
  thankYouNotes: Array<{
    id: string;
    fromName: string;
    fromCollege: string;
    date: string;
    content: string;
  }>;
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  senderCollege: string;
  senderBranch: string;
  senderYear: string;
  receiverId: string;
  receiverName: string;
  goalTopic: string;
  message: string;
  preferredContact: "chat" | "15-min meet" | "either";
  status: "pending" | "accepted" | "declined" | "expired";
  declineReason?: string;
  createdAt: string;
  expiresAt: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  requestId: string;
  otherUser: {
    id: string;
    name: string;
    photo: string;
    college: string;
    role: string;
    username: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: MessageItem[];
}

export interface Booking {
  id: string;
  helperId: string;
  helperName: string;
  helperCollege: string;
  seekerId: string;
  seekerName: string;
  sessionTitle: string;
  durationMinutes: 15 | 30;
  date: string;
  timeSlot: string;
  meetingUrl: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
  createdAt: string;
}

export interface EventItem {
  id: string;
  hostId: string;
  hostName: string;
  hostRole: string;
  hostCollege: string;
  hostAvatar: string;
  title: string;
  description: string;
  eventType: "webinar" | "group_meet" | "open_qa";
  topicTag: string;
  date: string;
  time: string;
  durationMinutes: number;
  meetingUrl: string;
  visibility: "all" | "college_only";
  collegeName?: string;
  capacity?: number;
  attendeeCount: number;
  hasRsvpd?: boolean;
}

export const COLLEGES: College[] = [
  {
    id: "col-dtu",
    name: "Delhi Technological University (DTU)",
    slug: "dtu",
    emailDomains: ["dtu.ac.in", "dtu.edu.in"],
    city: "New Delhi",
    state: "Delhi",
    logo: "🏛️",
    isActive: true,
    alumniCount: 342,
    studentsCount: 1850,
  },
  {
    id: "col-iitb",
    name: "IIT Bombay",
    slug: "iit-bombay",
    emailDomains: ["iitb.ac.in"],
    city: "Mumbai",
    state: "Maharashtra",
    logo: "🎓",
    isActive: true,
    alumniCount: 890,
    studentsCount: 2400,
  },
  {
    id: "col-bits",
    name: "BITS Pilani",
    slug: "bits-pilani",
    emailDomains: ["bits-pilani.ac.in", "pilani.bits-pilani.ac.in", "goa.bits-pilani.ac.in", "hyderabad.bits-pilani.ac.in"],
    city: "Pilani",
    state: "Rajasthan",
    logo: "🔬",
    isActive: true,
    alumniCount: 650,
    studentsCount: 1980,
  },
  {
    id: "col-iitd",
    name: "IIT Delhi",
    slug: "iit-delhi",
    emailDomains: ["iitd.ac.in"],
    city: "New Delhi",
    state: "Delhi",
    logo: "📐",
    isActive: true,
    alumniCount: 780,
    studentsCount: 2200,
  },
  {
    id: "col-nitk",
    name: "NIT Karnataka (Surathkal)",
    slug: "nit-karnataka",
    emailDomains: ["nitk.edu.in", "nitk.ac.in"],
    city: "Mangalore",
    state: "Karnataka",
    logo: "🌊",
    isActive: true,
    alumniCount: 410,
    studentsCount: 1600,
  },
  {
    id: "col-iiith",
    name: "IIIT Hyderabad",
    slug: "iiit-hyderabad",
    emailDomains: ["iiit.ac.in"],
    city: "Hyderabad",
    state: "Telangana",
    logo: "💻",
    isActive: true,
    alumniCount: 520,
    studentsCount: 1400,
  },
];

export const GOALS: Goal[] = [
  // Competitive exams
  { id: "g-gate-cse", slug: "gate-cse", name: "Crack GATE CSE", category: "Competitive exams", synonyms: ["gate", "gate cse", "air gate", "mtech entrance", "psu"], isPopular: true },
  { id: "g-cat", slug: "cat", name: "Crack CAT / IIMs", category: "Competitive exams", synonyms: ["cat", "iim", "mba", "percentile"], isPopular: true },
  { id: "g-jee", slug: "jee-adv", name: "Crack JEE Advanced", category: "Competitive exams", synonyms: ["jee", "iit jee", "advanced"], isPopular: true },
  { id: "g-gre", slug: "gre-ms", name: "GRE and MS Abroad", category: "Higher studies", synonyms: ["gre", "toefl", "ms abroad", "us masters", "sop"], isPopular: true },
  
  // Internships
  { id: "g-intern-google", slug: "google-internship", name: "Get a Google Internship", category: "Internships", synonyms: ["google", "step intern", "swe intern", "faang"], isPopular: true },
  { id: "g-first-intern", slug: "first-internship", name: "Get a First Tech Internship", category: "Internships", synonyms: ["internship", "first job", "startup intern", "remote"], isPopular: true },
  { id: "g-amazon-sde", slug: "amazon-internship", name: "Amazon SDE Intern", category: "Internships", synonyms: ["amazon", "sde 1", "aws"], isPopular: false },

  // Placements & Jobs
  { id: "g-placements", slug: "placements", name: "Campus Placements Prep", category: "Placements", synonyms: ["placement", "campus jobs", "on campus", "off campus", "resume"], isPopular: true },
  { id: "g-coding", slug: "coding-interviews", name: "Coding & DSA Interviews", category: "Skills", synonyms: ["dsa", "leetcode", "algorithms", "cp", "codeforces"], isPopular: true },
  { id: "g-pm", slug: "product-management", name: "Product Management (APM)", category: "Placements", synonyms: ["pm", "apm", "product", "case study"], isPopular: false },

  // Startups & Projects
  { id: "g-startup", slug: "start-a-startup", name: "Start a Startup & Co-founder", category: "Startups and projects", synonyms: ["startup", "founder", "y combinator", "mvp", "venture"], isPopular: true },
  { id: "g-hackathons", slug: "smart-india-hackathon", name: "Win SIH & Hackathons", category: "Startups and projects", synonyms: ["hackathon", "sih", "devfolio", "open source"], isPopular: false },

  // College Life
  { id: "g-branch-change", slug: "branch-change", name: "Branch Change Guide", category: "College life", synonyms: ["branch change", "cgpa", "first year"], isPopular: false },
  { id: "g-cgpa", slug: "balancing-cgpa-clubs", name: "Balancing CGPA & Skills", category: "College life", synonyms: ["cgpa", "clubs", "college life"], isPopular: false },
];

export const PROFILES: Profile[] = [
  {
    id: "usr-arjun",
    fullName: "Arjun Mehta",
    username: "arjunmehta",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    collegeId: "col-iitb",
    collegeName: "IIT Bombay",
    collegeDomain: "iitb.ac.in",
    branch: "Computer Science & Engineering",
    degree: "B.Tech",
    startYear: 2021,
    graduationYear: 2025,
    role: "student",
    homeState: "Maharashtra",
    journeyNote: "Started GATE preparation from 5th semester while maintaining an 8.9 CGPA. Did 12 full mock tests, analyzed every wrong question, and followed standard references.",
    openToHelp: true,
    maxRequestsPerWeek: 8,
    timezone: "Asia/Kolkata",
    verificationStatus: "verified",
    achievements: [
      {
        id: "ach-1",
        profileId: "usr-arjun",
        goalId: "g-gate-cse",
        title: "GATE CSE 2024",
        detail: "AIR 120 (Score: 842 / 1000)",
        year: 2024,
        category: "Competitive exams",
        proofUrl: "https://gate2024.iisc.ac.in",
      },
      {
        id: "ach-2",
        profileId: "usr-arjun",
        goalId: "g-coding",
        title: "Google Summer of Code (GSoC)",
        detail: "Selected Contributor for Apache Software Foundation",
        year: 2023,
        category: "Skills",
      },
      {
        id: "ach-3",
        profileId: "usr-arjun",
        goalId: "g-hackathons",
        title: "Smart India Hackathon 2023",
        detail: "1st Place - Hardware & AI Edition",
        year: 2023,
        category: "Startups and projects",
      },
    ],
    helpTopics: ["Crack GATE CSE", "Coding & DSA Interviews", "Campus Placements Prep"],
    goals: ["Get a Google Internship", "MS in US/Europe"],
    weeklyAvailability: [
      { dayOfWeek: 2, dayName: "Tuesday", startTime: "19:00", endTime: "21:00" },
      { dayOfWeek: 4, dayName: "Thursday", startTime: "19:00", endTime: "21:00" },
      { dayOfWeek: 6, dayName: "Saturday", startTime: "15:00", endTime: "18:00" },
    ],
    sessionTypes: [
      {
        id: "st-1",
        helperId: "usr-arjun",
        title: "15-min GATE CSE Prep Strategy",
        description: "Quick breakdown of subject weightage, standard booklist, and mock test revision schedule.",
        durationMinutes: 15,
        requiresApproval: false,
        allowDirectBooking: true,
        priceInr: 0,
        topicGoal: "Crack GATE CSE",
      },
      {
        id: "st-2",
        helperId: "usr-arjun",
        title: "30-min Deep Dive & Mock Evaluation",
        description: "Review your preparation progress, mock test percentiles, and doubt-clearing strategy.",
        durationMinutes: 30,
        requiresApproval: true,
        allowDirectBooking: false,
        priceInr: 0,
        topicGoal: "Crack GATE CSE",
      },
    ],
    stats: {
      helpedCount: 38,
      averageRating: 4.9,
      responseRate: 98,
      medianResponseHours: 3,
      ratingsCount: 34,
    },
    thankYouNotes: [
      {
        id: "tn-1",
        fromName: "Kavya S.",
        fromCollege: "DTU",
        date: "2 days ago",
        content: "Arjun bhai gave me the exact revision blueprint for Algorithms & DBMS. Saved me at least 50 hours of aimless study!",
      },
      {
        id: "tn-2",
        fromName: "Sahil Verma",
        fromCollege: "NIT Karnataka",
        date: "1 week ago",
        content: "The 15-min call was super crisp. Directly told me which test series to avoid.",
      },
    ],
  },
  {
    id: "usr-priya",
    fullName: "Priya Nair",
    username: "priyanair",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    collegeId: "col-bits",
    collegeName: "BITS Pilani",
    collegeDomain: "bits-pilani.ac.in",
    branch: "Electrical & Electronics Engineering",
    degree: "B.E.",
    startYear: 2019,
    graduationYear: 2023,
    role: "alumnus",
    homeState: "Karnataka",
    currentCompany: "Google",
    currentRole: "Software Engineer II",
    journeyNote: "Coming from non-CS, I built projects from scratch, contributed to Chromium, and cracked Google STEP & then full-time PPO. Passionate about helping tier-2/3 & non-CS folks crack FAANG.",
    openToHelp: true,
    maxRequestsPerWeek: 6,
    timezone: "Asia/Kolkata",
    verificationStatus: "verified",
    achievements: [
      {
        id: "ach-4",
        profileId: "usr-priya",
        goalId: "g-intern-google",
        title: "Google STEP & SWE Intern",
        detail: "Converted both internships into Full-Time PPO at Google Bangalore",
        year: 2022,
        category: "Internships",
      },
      {
        id: "ach-5",
        profileId: "usr-priya",
        goalId: "g-coding",
        title: "LeetCode Knight (2140 rating)",
        detail: "Solved 600+ problems with focus on Graphs, DP and Tree patterns",
        year: 2023,
        category: "Skills",
      },
      {
        id: "ach-6",
        profileId: "usr-priya",
        goalId: "g-placements",
        title: "IEEE NLP Research Paper",
        detail: "First-author paper on Low-Resource Indian Language Summarization",
        year: 2023,
        category: "Higher studies",
      },
    ],
    helpTopics: ["Get a Google Internship", "Campus Placements Prep", "Coding & DSA Interviews", "Resume Review & ATS"],
    goals: ["Start a Startup & Co-founder"],
    weeklyAvailability: [
      { dayOfWeek: 0, dayName: "Sunday", startTime: "11:00", endTime: "14:00" },
      { dayOfWeek: 6, dayName: "Saturday", startTime: "17:00", endTime: "20:00" },
    ],
    sessionTypes: [
      {
        id: "st-3",
        helperId: "usr-priya",
        title: "15-min FAANG Resume Roast & ATS Tips",
        description: "I'll review your 1-page resume live and give you actionable bullet-point tweaks that recruiters look for.",
        durationMinutes: 15,
        requiresApproval: false,
        allowDirectBooking: true,
        priceInr: 0,
        topicGoal: "Get a Google Internship",
      },
      {
        id: "st-4",
        helperId: "usr-priya",
        title: "30-min Google Mock Coding & Feedback",
        description: "Simulated 30-min technical interview covering algorithmic problem solving, edge cases & communication.",
        durationMinutes: 30,
        requiresApproval: true,
        allowDirectBooking: false,
        priceInr: 0,
        topicGoal: "Coding & DSA Interviews",
      },
    ],
    stats: {
      helpedCount: 84,
      averageRating: 5.0,
      responseRate: 96,
      medianResponseHours: 5,
      ratingsCount: 78,
    },
    thankYouNotes: [
      {
        id: "tn-3",
        fromName: "Adarsh K.",
        fromCollege: "IIT Delhi",
        date: "3 days ago",
        content: "Priya helped me reframe my project impact metrics. Got shortlisted for 3 off-campus interviews within a week!",
      },
      {
        id: "tn-4",
        fromName: "Meghna Roy",
        fromCollege: "BITS Pilani",
        date: "2 weeks ago",
        content: "Alumni like Priya are why BITS network is gold. She spent 30 mins walking me through the Google hiring committee process.",
      },
    ],
  },
  {
    id: "usr-rohan",
    fullName: "Rohan Varma",
    username: "rohanvarma",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    collegeId: "col-dtu",
    collegeName: "Delhi Technological University (DTU)",
    collegeDomain: "dtu.ac.in",
    branch: "Information Technology",
    degree: "B.Tech",
    startYear: 2021,
    graduationYear: 2025,
    role: "student",
    homeState: "Delhi",
    journeyNote: "Final year DTUite. Cracked Microsoft on-campus SDE offer (48 LPA). Cleared 5 rounds with heavy focus on LLD, OS, and System Design basics.",
    openToHelp: true,
    maxRequestsPerWeek: 10,
    timezone: "Asia/Kolkata",
    verificationStatus: "verified",
    achievements: [
      {
        id: "ach-7",
        profileId: "usr-rohan",
        goalId: "g-placements",
        title: "Microsoft Campus Placement Offer",
        detail: "Selected for SDE-1 role (48 LPA Package)",
        year: 2024,
        category: "Placements",
      },
      {
        id: "ach-8",
        profileId: "usr-rohan",
        goalId: "g-first-intern",
        title: "Top 10 - HackWithInfy National Finals",
        detail: "Direct interview shortlist among 180,000+ pan-India participants",
        year: 2023,
        category: "Skills",
      },
    ],
    helpTopics: ["Campus Placements Prep", "Coding & DSA Interviews", "Get a First Tech Internship"],
    goals: ["Start a Startup & Co-founder"],
    weeklyAvailability: [
      { dayOfWeek: 1, dayName: "Monday", startTime: "20:00", endTime: "22:00" },
      { dayOfWeek: 3, dayName: "Wednesday", startTime: "20:00", endTime: "22:00" },
      { dayOfWeek: 5, dayName: "Friday", startTime: "19:00", endTime: "21:00" },
    ],
    sessionTypes: [
      {
        id: "st-5",
        helperId: "usr-rohan",
        title: "15-min DTU On-Campus Placement Playbook",
        description: "How companies shortlist at DTU/NSUT, which coding platforms matter, and OA cutoff secrets.",
        durationMinutes: 15,
        requiresApproval: false,
        allowDirectBooking: true,
        priceInr: 0,
        topicGoal: "Campus Placements Prep",
      },
    ],
    stats: {
      helpedCount: 41,
      averageRating: 4.88,
      responseRate: 94,
      medianResponseHours: 4,
      ratingsCount: 39,
    },
    thankYouNotes: [
      {
        id: "tn-5",
        fromName: "Chirag Singla",
        fromCollege: "DTU",
        date: "Yesterday",
        content: "Rohan bhaiya gave me the exact recurring questions Microsoft asked our college batch. Cracked the round!",
      },
    ],
  },
  {
    id: "usr-vikram",
    fullName: "Vikramaditya Rao",
    username: "vikramrao",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    collegeId: "col-iitd",
    collegeName: "IIT Delhi",
    collegeDomain: "iitd.ac.in",
    branch: "Computer Science",
    degree: "B.Tech",
    startYear: 2017,
    graduationYear: 2021,
    role: "alumnus",
    homeState: "Delhi",
    currentCompany: "Stanford University",
    currentRole: "MS CS Graduate / AI Researcher",
    journeyNote: "Graduated IIT Delhi in 2021, went to Stanford MS CS with research assistantship. Analyzed over 80 SOPs and admissions profiles for US top-10 univs.",
    openToHelp: true,
    maxRequestsPerWeek: 5,
    timezone: "America/Los_Angeles",
    verificationStatus: "verified",
    achievements: [
      {
        id: "ach-9",
        profileId: "usr-vikram",
        goalId: "g-gre",
        title: "Stanford MS CS Admit + RA Fellowship",
        detail: "GRE 334 (Q170, V164, AWA 4.5), Full Tuition Waiver",
        year: 2022,
        category: "Higher studies",
      },
      {
        id: "ach-10",
        profileId: "usr-vikram",
        goalId: "g-coding",
        title: "ACM ICPC World Finals 2020",
        detail: "Represented IIT Delhi at World Finals Moscow",
        year: 2020,
        category: "Competitive exams",
      },
    ],
    helpTopics: ["GRE and MS Abroad", "Coding & DSA Interviews"],
    goals: [],
    weeklyAvailability: [
      { dayOfWeek: 0, dayName: "Sunday", startTime: "21:00", endTime: "23:00" },
      { dayOfWeek: 6, dayName: "Saturday", startTime: "21:00", endTime: "23:00" },
    ],
    sessionTypes: [
      {
        id: "st-6",
        helperId: "usr-vikram",
        title: "15-min US MS Profile Evaluation",
        description: "Candid evaluation of your GPA, research, GRE targets, and university tiers (Safe/Target/Ambitious).",
        durationMinutes: 15,
        requiresApproval: true,
        allowDirectBooking: false,
        priceInr: 0,
        topicGoal: "GRE and MS Abroad",
      },
    ],
    stats: {
      helpedCount: 65,
      averageRating: 4.95,
      responseRate: 99,
      medianResponseHours: 6,
      ratingsCount: 61,
    },
    thankYouNotes: [
      {
        id: "tn-6",
        fromName: "Tanvi S.",
        fromCollege: "IIT Bombay",
        date: "4 days ago",
        content: "Vikram's critique of my SOP draft made all the difference between a generic essay and a compelling research narrative.",
      },
    ],
  },
  {
    id: "usr-sneha",
    fullName: "Sneha Mukherjee",
    username: "snehamukherjee",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    collegeId: "col-iiith",
    collegeName: "IIIT Hyderabad",
    collegeDomain: "iiit.ac.in",
    branch: "Computer Science",
    degree: "B.Tech",
    startYear: 2018,
    graduationYear: 2022,
    role: "alumnus",
    homeState: "West Bengal",
    currentCompany: "Swiggy",
    currentRole: "Product Manager (Search & Discovery)",
    journeyNote: "Scored 99.85 percentile in CAT, chose Product Management over consulting. Helped 50+ engineers transition into product roles.",
    openToHelp: true,
    maxRequestsPerWeek: 8,
    timezone: "Asia/Kolkata",
    verificationStatus: "verified",
    achievements: [
      {
        id: "ach-11",
        profileId: "usr-sneha",
        goalId: "g-cat",
        title: "CAT 2022 - 99.85 Percentile",
        detail: "Calls from IIM Ahmedabad, Bangalore, Calcutta",
        year: 2022,
        category: "Competitive exams",
      },
      {
        id: "ach-12",
        profileId: "usr-sneha",
        goalId: "g-pm",
        title: "APM to PM Promotion in 18 Months",
        detail: "Led Swiggy's conversational search overhaul for 12M monthly active users",
        year: 2024,
        category: "Placements",
      },
    ],
    helpTopics: ["Crack CAT / IIMs", "Product Management (APM)", "Campus Placements Prep"],
    goals: ["Start a Startup & Co-founder"],
    weeklyAvailability: [
      { dayOfWeek: 0, dayName: "Sunday", startTime: "16:00", endTime: "19:00" },
      { dayOfWeek: 5, dayName: "Friday", startTime: "19:00", endTime: "21:00" },
    ],
    sessionTypes: [
      {
        id: "st-7",
        helperId: "usr-sneha",
        title: "15-min PM Transition Quick Assessment",
        description: "Are you ready for APM cohorts? We'll assess your product sense and portfolio projects.",
        durationMinutes: 15,
        requiresApproval: false,
        allowDirectBooking: true,
        priceInr: 0,
        topicGoal: "Product Management (APM)",
      },
    ],
    stats: {
      helpedCount: 52,
      averageRating: 4.92,
      responseRate: 94,
      medianResponseHours: 4,
      ratingsCount: 47,
    },
    thankYouNotes: [],
  },
  {
    id: "usr-ananya",
    fullName: "Ananya Gupta",
    username: "ananyagupta",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    collegeId: "col-nitk",
    collegeName: "NIT Karnataka (Surathkal)",
    collegeDomain: "nitk.edu.in",
    branch: "Electronics & Communication Engineering",
    degree: "B.Tech",
    startYear: 2022,
    graduationYear: 2026,
    role: "student",
    homeState: "Karnataka",
    journeyNote: "3rd-year student who cracked Amazon SDE Summer 2024. LeetCode Candidate Master. ECE to software pathway enthusiast.",
    openToHelp: true,
    maxRequestsPerWeek: 12,
    timezone: "Asia/Kolkata",
    verificationStatus: "verified",
    achievements: [
      {
        id: "ach-13",
        profileId: "usr-ananya",
        goalId: "g-amazon-sde",
        title: "Amazon SDE Intern 2024 Offer",
        detail: "Selected via off-campus Amazon WOW initiative with 100% scholarship",
        year: 2024,
        category: "Internships",
      },
      {
        id: "ach-14",
        profileId: "usr-ananya",
        goalId: "g-coding",
        title: "Codeforces Candidate Master (1920)",
        detail: "Top 2% pan-India collegiate competitive programmer",
        year: 2024,
        category: "Skills",
      },
    ],
    helpTopics: ["Amazon SDE Intern", "Coding & DSA Interviews", "Get a first tech internship"],
    goals: ["Get a Google Internship", "Start a Startup & Co-founder"],
    weeklyAvailability: [
      { dayOfWeek: 3, dayName: "Wednesday", startTime: "18:00", endTime: "20:00" },
      { dayOfWeek: 6, dayName: "Saturday", startTime: "14:00", endTime: "17:00" },
    ],
    sessionTypes: [
      {
        id: "st-8",
        helperId: "usr-ananya",
        title: "15-min Amazon WOW & OA Preparation",
        description: "Guidance for female engineering students on Amazon WOW OA rounds and interview prep.",
        durationMinutes: 15,
        requiresApproval: false,
        allowDirectBooking: true,
        priceInr: 0,
        topicGoal: "Amazon SDE Intern",
      },
    ],
    stats: {
      helpedCount: 29,
      averageRating: 4.86,
      responseRate: 91,
      medianResponseHours: 5,
      ratingsCount: 26,
    },
    thankYouNotes: [],
  },
];

export const CURRENT_USER_DEFAULT: Profile = {
  id: "usr-rahul",
  fullName: "Rahul Sharma",
  username: "rahulsharma",
  photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
  collegeId: "col-dtu",
  collegeName: "Delhi Technological University (DTU)",
  collegeDomain: "dtu.ac.in",
  branch: "Computer Science",
  degree: "B.Tech",
  startYear: 2023,
  graduationYear: 2027,
  role: "student",
  homeState: "Delhi",
  journeyNote: "2nd-year CSE student exploring software internships and competitive programming. Eager to connect with seniors who cracked FAANG or top GATE scores.",
  openToHelp: false,
  maxRequestsPerWeek: 5,
  timezone: "Asia/Kolkata",
  verificationStatus: "verified",
  achievements: [
    {
      id: "ach-self-1",
      profileId: "usr-rahul",
      title: "DTU Hackathon 2024",
      detail: "Runner up in Web3 & Fintech Track",
      year: 2024,
      category: "Startups and projects",
    },
  ],
  helpTopics: ["First-Year Roadmap", "Balancing CGPA & Skills"],
  goals: ["Get a Google Internship", "Crack GATE CSE", "Coding & DSA Interviews"],
  weeklyAvailability: [],
  sessionTypes: [],
  stats: {
    helpedCount: 3,
    averageRating: 5.0,
    responseRate: 100,
    medianResponseHours: 2,
    ratingsCount: 2,
  },
  thankYouNotes: [],
};

export const INITIAL_REQUESTS: ConnectionRequest[] = [
  {
    id: "req-1",
    senderId: "usr-rahul",
    senderName: "Rahul Sharma",
    senderPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
    senderCollege: "Delhi Technological University (DTU)",
    senderBranch: "Computer Science (2nd Year)",
    senderYear: "2027",
    receiverId: "usr-arjun",
    receiverName: "Arjun Mehta",
    goalTopic: "Crack GATE CSE",
    message: "Hey Arjun, I'm starting my GATE CSE preparation in 3rd sem. Wanted to know your view on whether self-study with standard textbooks is sufficient for Top 100 rank, or is Made Easy coaching mandatory?",
    preferredContact: "15-min meet",
    status: "accepted",
    createdAt: "Yesterday at 4:30 PM",
    expiresAt: "In 6 days",
  },
  {
    id: "req-2",
    senderId: "usr-rahul",
    senderName: "Rahul Sharma",
    senderPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
    senderCollege: "Delhi Technological University (DTU)",
    senderBranch: "Computer Science (2nd Year)",
    senderYear: "2027",
    receiverId: "usr-priya",
    receiverName: "Priya Nair",
    goalTopic: "Get a Google Internship",
    message: "Hello Priya ma'am! I have a question on the Google STEP interview format. Is the focus mostly on Arrays/Strings, or should I also be ready for Trees/Graphs for 2nd years?",
    preferredContact: "chat",
    status: "pending",
    createdAt: "Today at 10:15 AM",
    expiresAt: "In 7 days",
  },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    requestId: "req-1",
    otherUser: {
      id: "usr-arjun",
      name: "Arjun Mehta",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
      college: "IIT Bombay",
      role: "GATE AIR 120",
      username: "arjunmehta",
    },
    lastMessage: "Sure Rahul! Feel free to book a 15-min slot using the button above so we can jump on a quick Jitsi call.",
    lastMessageTime: "2:45 PM",
    unreadCount: 1,
    messages: [
      {
        id: "m-1",
        conversationId: "conv-1",
        senderId: "usr-rahul",
        senderName: "Rahul Sharma",
        text: "Hey Arjun, I'm starting my GATE CSE preparation in 3rd sem. Wanted to know your view on whether self-study with standard textbooks is sufficient for Top 100 rank, or is Made Easy coaching mandatory?",
        createdAt: "Yesterday 4:30 PM",
        read: true,
      },
      {
        id: "m-2",
        conversationId: "conv-1",
        senderId: "usr-arjun",
        senderName: "Arjun Mehta",
        text: "Hey Rahul! Absolutely possible with self study. 80% of questions test fundamental concepts from standard books (Galvin for OS, Cormen for Algo, Korth for DBMS). Coaching is only useful for practice tests.",
        createdAt: "Yesterday 5:12 PM",
        read: true,
      },
      {
        id: "m-3",
        conversationId: "conv-1",
        senderId: "usr-arjun",
        senderName: "Arjun Mehta",
        text: "Sure Rahul! Feel free to book a 15-min slot using the button above so we can jump on a quick Jitsi call.",
        createdAt: "Today 2:45 PM",
        read: false,
      },
    ],
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "bk-1",
    helperId: "usr-arjun",
    helperName: "Arjun Mehta",
    helperCollege: "IIT Bombay",
    seekerId: "usr-rahul",
    seekerName: "Rahul Sharma",
    sessionTitle: "15-min GATE CSE Prep Strategy",
    durationMinutes: 15,
    date: "Tomorrow, Oct 30",
    timeSlot: "7:00 PM - 7:15 PM IST",
    meetingUrl: "https://meet.jit.si/aedo-gate-strategy-arjun-rahul",
    status: "confirmed",
    notes: "Reviewing Galvin OS chapters and mock schedule.",
    createdAt: "Today",
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "ev-1",
    hostId: "usr-priya",
    hostName: "Priya Nair",
    hostRole: "SWE II @ Google (BITS Pilani Alumna)",
    hostCollege: "BITS Pilani",
    hostAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    title: "Off-Campus FAANG Blueprint: How to get shortlisted without a referral",
    description: "A comprehensive 45-minute live masterclass covering open-source contributions, cold emailing engineering managers with project demos, and passing the automated ATS filter.",
    eventType: "webinar",
    topicTag: "Internships & Placements",
    date: "Friday, Nov 1",
    time: "7:30 PM - 8:30 PM IST",
    durationMinutes: 60,
    meetingUrl: "https://meet.jit.si/aedo-event-faang-blueprint",
    visibility: "all",
    capacity: 250,
    attendeeCount: 184,
    hasRsvpd: true,
  },
  {
    id: "ev-2",
    hostId: "usr-arjun",
    hostName: "Arjun Mehta",
    hostRole: "AIR 120 GATE CSE (IIT Bombay)",
    hostCollege: "IIT Bombay",
    hostAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    title: "Open Q&A: GATE 2025 - Last 90 Days High-Yield Subject Strategy",
    description: "Answering student questions live on which subjects yield the highest marks per hour invested (TOC, Compiler, DBMS vs Maths).",
    eventType: "open_qa",
    topicTag: "Competitive exams",
    date: "Sunday, Nov 3",
    time: "5:00 PM - 6:00 PM IST",
    durationMinutes: 60,
    meetingUrl: "https://meet.jit.si/aedo-event-gate-qa",
    visibility: "all",
    capacity: 100,
    attendeeCount: 68,
    hasRsvpd: false,
  },
  {
    id: "ev-3",
    hostId: "usr-rohan",
    hostName: "Rohan Varma",
    hostRole: "Microsoft SDE-1 Offer (DTU)",
    hostCollege: "Delhi Technological University (DTU)",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    title: "DTU Placement Cell Insider: Company Shortlists & OA Walkthrough",
    description: "Exclusive to DTU students: breaking down round-by-round selection criteria, CGPA cutoffs, and mock coding tests.",
    eventType: "group_meet",
    topicTag: "Campus Placements Prep",
    date: "Saturday, Nov 2",
    time: "6:00 PM - 7:00 PM IST",
    durationMinutes: 60,
    meetingUrl: "https://meet.jit.si/aedo-event-dtu-placements",
    visibility: "college_only",
    collegeName: "Delhi Technological University (DTU)",
    capacity: 40,
    attendeeCount: 38,
    hasRsvpd: false,
  },
];

