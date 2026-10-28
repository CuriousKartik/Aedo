"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Building,
  Briefcase,
  Star,
  Award,
  Filter,
  MessageCircle,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import RequestModal from "@/components/RequestModal";
import BookingModal from "@/components/BookingModal";
import { Profile } from "@/data/mockData";

export default function CollegeAlumniPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { colleges, profiles, currentUser } = useApp();

  const college =
    colleges.find((c) => c.slug === slug) ||
    colleges.find((c) => c.id.replace("col-", "") === slug) ||
    colleges[0];

  const [filterBatch, setFilterBatch] = useState<string>("all");
  const [filterMentoring, setFilterMentoring] = useState<boolean>(true);
  const [targetAlumnus, setTargetAlumnus] = useState<Profile | null>(null);
  const [modalType, setModalType] = useState<"request" | "booking" | null>(null);

  // Filter alumni
  const alumniList = profiles.filter((p) => {
    const isAlum = p.role === "alumnus";
    const matchesCollege = p.collegeId === college.id;
    const matchesMentoring = filterMentoring ? p.openToHelp : true;
    const matchesBatch = filterBatch !== "all" ? p.graduationYear.toString() === filterBatch : true;
    return isAlum && matchesCollege && matchesMentoring && matchesBatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* College Banner Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-grayAccent-border shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl sm:text-5xl p-3 bg-cream-100 rounded-2xl border border-grayAccent-border">
            {college.logo}
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-terracotta flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified College Alumni Network
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
              {college.name} Alumni Directory
            </h1>
            <p className="text-xs sm:text-sm text-brown-500 mt-1">
              Connect directly with verified graduates at Google, Microsoft, Stanford, Swiggy and beyond.
            </p>
          </div>
        </div>

        {/* Quick College Stats */}
        <div className="flex gap-4 border-t md:border-t-0 md:border-l border-grayAccent-border pt-3 md:pt-0 md:pl-6 text-center">
          <div>
            <div className="text-xl font-bold text-charcoal">{college.alumniCount}+</div>
            <div className="text-[11px] text-brown-400">Verified Alumni</div>
          </div>
          <div>
            <div className="text-xl font-bold text-terracotta">{college.studentsCount}+</div>
            <div className="text-[11px] text-brown-400">Active Students</div>
          </div>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-grayAccent-border shadow-xs text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1.5 font-semibold text-charcoal cursor-pointer">
            <input
              type="checkbox"
              checked={filterMentoring}
              onChange={(e) => setFilterMentoring(e.target.checked)}
              className="rounded text-terracotta focus:ring-terracotta"
            />
            <span>Open to Mentoring Only</span>
          </label>

          <div className="flex items-center gap-1.5">
            <span className="text-brown-400 font-medium">Batch:</span>
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="bg-cream-50 border border-grayAccent-border rounded-lg px-2.5 py-1 text-charcoal focus:outline-none"
            >
              <option value="all">All Batches</option>
              <option value="2023">Class of 2023</option>
              <option value="2022">Class of 2022</option>
              <option value="2021">Class of 2021</option>
            </select>
          </div>
        </div>

        <span className="text-brown-400">
          Showing {alumniList.length} verified graduate{alumniList.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {alumniList.map((alumnus) => (
          <div
            key={alumnus.id}
            className="bg-white rounded-2xl p-5 border border-grayAccent-border shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={alumnus.photoUrl}
                    alt={alumnus.fullName}
                    className="w-13 h-13 rounded-2xl object-cover border border-sand"
                  />
                  <div>
                    <h3 className="font-bold text-charcoal text-base">
                      {alumnus.fullName}
                    </h3>
                    <div className="text-xs text-brown-500 font-semibold flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-terracotta" />
                      {alumnus.currentRole}
                    </div>
                    <div className="text-[11px] text-brown-400 flex items-center gap-1">
                      <Building className="w-3 h-3 text-sand" />
                      {alumnus.currentCompany}
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch & Batch */}
              <div className="text-[11px] text-brown-500 mb-3 bg-cream-50 p-2 rounded-xl border border-grayAccent-border/60">
                Class of {alumnus.graduationYear} • {alumnus.branch}
              </div>

              {/* Journey Excerpt */}
              <p className="text-xs text-brown-600 italic line-clamp-2 mb-3">
                "{alumnus.journeyNote}"
              </p>

              {/* Help Topics */}
              <div className="flex flex-wrap gap-1 mb-4">
                {alumnus.helpTopics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-cream-100 text-brown-700 font-medium border border-grayAccent-border/60"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-grayAccent-border/60 space-y-2">
              <div className="flex items-center justify-between text-xs text-brown-400">
                <span className="flex items-center gap-1 font-semibold text-charcoal">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {alumnus.stats.averageRating} ({alumnus.stats.helpedCount} helped)
                </span>
                <span>{alumnus.stats.responseRate}% reply rate</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setTargetAlumnus(alumnus);
                    setModalType("request");
                  }}
                  className="py-2 rounded-xl text-xs font-bold bg-cream-100 hover:bg-cream-200 text-charcoal border border-grayAccent-border flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-terracotta" />
                  <span>Request</span>
                </button>

                <button
                  onClick={() => {
                    setTargetAlumnus(alumnus);
                    setModalType("booking");
                  }}
                  className="py-2 rounded-xl text-xs font-bold bg-terracotta text-white hover:bg-terracotta-600 shadow-soft flex items-center justify-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book 1:1</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalType === "request" && targetAlumnus && (
        <RequestModal
          helper={targetAlumnus}
          onClose={() => {
            setModalType(null);
            setTargetAlumnus(null);
          }}
        />
      )}

      {modalType === "booking" && targetAlumnus && (
        <BookingModal
          helper={targetAlumnus}
          onClose={() => {
            setModalType(null);
            setTargetAlumnus(null);
          }}
        />
      )}
    </div>
  );
}
