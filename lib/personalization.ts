"use client";

/**
 * Personalization Hook
 * Tracks user behavior and provides personalized CTAs
 */

import { useState, useEffect } from "react";
import { generatePersonalizedCTA } from "./aiTools";

export interface PageVisit {
  path: string;
  timestamp: Date;
}

export function usePersonalization() {
  const [pagesVisited, setPagesVisited] = useState<string[]>([]);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [personalizedCTA, setPersonalizedCTA] = useState<string>("Ready to start your project?");

  useEffect(() => {
    // Track page visits
    const currentPath = window.location.pathname;
    setPagesVisited((prev) => {
      if (!prev.includes(currentPath)) {
        return [...prev, currentPath];
      }
      return prev;
    });

    // Infer project type from path
    if (currentPath.includes("kitchen")) {
      setProjectType("kitchen");
    } else if (currentPath.includes("basement")) {
      setProjectType("basement");
    } else if (currentPath.includes("bathroom")) {
      setProjectType("bathroom");
    }
  }, []);

  useEffect(() => {
    // Generate personalized CTA
    const generateCTA = async () => {
      const cta = await generatePersonalizedCTA(pagesVisited, projectType || undefined);
      setPersonalizedCTA(cta);
    };

    if (pagesVisited.length > 0) {
      generateCTA();
    }
  }, [pagesVisited, projectType]);

  return {
    pagesVisited,
    projectType,
    personalizedCTA,
    setProjectType,
  };
}

/**
 * Store project interest in localStorage for persistence
 */
export function trackProjectInterest(projectType: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("project_interest", projectType);
  }
}

export function getProjectInterest(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("project_interest");
  }
  return null;
}

