"use client";

import React, { useState } from "react";
import { Search, Sparkles, Filter, Check, SlidersHorizontal, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface SearchBarProps {
  onSearchChange?: (val: string) => void;
  selectedCollege: string;
  setSelectedCollege: (c: string) => void;
  selectedRole: string;
  setSelectedRole: (r: string) => void;
  availableOnly: boolean;
  setAvailableOnly: (a: boolean) => void;
  sameStateOnly: boolean;
  setSameStateOnly: (s: boolean) => void;
}

export default function SearchBar({
  onSearchChange,
  selectedCollege,
  setSelectedCollege,
  selectedRole,
  setSelectedRole,
  availableOnly,
  setAvailableOnly,
  sameStateOnly,
  setSameStateOnly,
}: SearchBarProps) {
  const { searchQuery, setSearchQuery, activeGoal, setActiveGoal, colleges, goals } = useApp();
  const [showFilters, setShowFilters] = useState(false);

  const popularChips = [
    { label: "Crack GATE CSE", query: "GATE" },
    { label: "Get a Google Internship", query: "Google" },
    { label: "GRE and MS Abroad", query: "GRE" },
    { label: "Crack CAT / IIMs", query: "CAT" },
    { label: "Campus Placements Prep", query: "Placement" },
    { label: "Coding & DSA Interviews", query: "Coding" },
    { label: "Start a Startup", query: "Startup" },
    { label: "Amazon SDE Intern", query: "Amazon" },
  ];

  const handleChipClick = (label: string, query: string) => {
    if (activeGoal === label) {
      setActiveGoal("");
      setSearchQuery("");
      if (onSearchChange) onSearchChange("");
    } else {
      setActiveGoal(label);
      setSearchQuery(query);
      if (onSearchChange) onSearchChange(query);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setActiveGoal("");
    if (onSearchChange) onSearchChange(val);
  };

  const clearAllFilters = () => {
    setSelectedCollege("all");
    setSelectedRole("all");
    setAvailableOnly(false);
    setSameStateOnly(false);
    setSearchQuery("");
    setActiveGoal("");
  };

  const hasActiveFilters =
    selectedCollege !== "all" ||
    selectedRole !== "all" ||
    availableOnly ||
    sameStateOnly ||
    searchQuery !== "" ||
    activeGoal !== "";

  return (
    <div className="w-full">
      {/* Primary Goal Search Box */}
      <div className="relative rounded-2xl bg-white p-2.5 sm:p-3 shadow-card border border-grayAccent-border/80 transition-all focus-within:border-terracotta focus-within:ring-2 focus-within:ring-terracotta/20">
        <div className="flex items-center gap-3">
          <div className="pl-2 text-terracotta">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleTextChange}
            placeholder='What do you want to achieve? (e.g. "Crack GATE", "Get Google internship", "MS in US")'
            className="w-full bg-transparent text-charcoal placeholder-brown-300 text-sm sm:text-base font-medium focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveGoal("");
                if (onSearchChange) onSearchChange("");
              }}
              className="p-1 rounded-full text-brown-300 hover:text-charcoal hover:bg-cream-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              showFilters || hasActiveFilters
                ? "bg-sand text-white shadow-xs"
                : "bg-cream-100 text-brown-500 hover:bg-cream-200"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Popular Goal Chips */}
        <div className="mt-3 pt-3 border-t border-grayAccent-border/60">
          <div className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold text-brown-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sand" />
            <span>Popular Goals (Tap to match verified achievers):</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {popularChips.map((chip) => {
              const isSelected = activeGoal === chip.label || searchQuery.toLowerCase().includes(chip.query.toLowerCase());
              return (
                <button
                  key={chip.label}
                  onClick={() => handleChipClick(chip.label, chip.query)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    isSelected
                      ? "bg-terracotta text-white shadow-soft font-semibold scale-102"
                      : "bg-cream-100 text-brown-600 hover:bg-gold/40 border border-grayAccent-border/50"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expandable Filters Panel */}
      {showFilters && (
        <div className="mt-3 p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-grayAccent-border shadow-soft animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-grayAccent-border/60">
            <span className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-terracotta" />
              Ranking & Search Filters
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-terracotta hover:underline font-medium"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {/* College Filter */}
            <div>
              <label className="block text-[11px] font-medium text-brown-400 mb-1">
                College
              </label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full text-xs bg-cream-50 border border-grayAccent-border rounded-lg px-2.5 py-2 text-charcoal focus:outline-none focus:border-terracotta"
              >
                <option value="all">All Colleges (Cross-College)</option>
                {colleges.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-[11px] font-medium text-brown-400 mb-1">
                Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full text-xs bg-cream-50 border border-grayAccent-border rounded-lg px-2.5 py-2 text-charcoal focus:outline-none focus:border-terracotta"
              >
                <option value="all">All (Students & Alumni)</option>
                <option value="student">Currently Enrolled Students</option>
                <option value="alumnus">Graduated Alumni</option>
              </select>
            </div>

            {/* Availability Checkbox */}
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="rounded text-terracotta focus:ring-terracotta"
                />
                <span>Available for 1:1 meets this week</span>
              </label>
            </div>

            {/* Same State Checkbox */}
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal">
                <input
                  type="checkbox"
                  checked={sameStateOnly}
                  onChange={(e) => setSameStateOnly(e.target.checked)}
                  className="rounded text-terracotta focus:ring-terracotta"
                />
                <span>Same Home State (Relatable match)</span>
              </label>
            </div>
          </div>

          {/* Ranking Logic Explanation Note from Section 5.3 */}
          <div className="mt-3 pt-2 text-[11px] text-brown-400 bg-cream-100/70 p-2.5 rounded-lg flex items-center justify-between">
            <span>
              ⚖️ <strong>Aedo Smart Ranking Formula:</strong> 40% Goal Match + 20% Recency + 15% College/Branch + 10% Responsiveness + 10% Helpr Rating + 5% Availability (with load-balancing penalty to protect helpers from being flooded).
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
