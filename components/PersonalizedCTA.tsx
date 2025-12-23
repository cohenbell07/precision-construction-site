"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePersonalization } from "@/lib/personalization";

interface PersonalizedCTAProps {
  className?: string;
  variant?: "default" | "outline";
}

export function PersonalizedCTA({ className, variant = "default" }: PersonalizedCTAProps) {
  const { personalizedCTA } = usePersonalization();

  return (
    <Button asChild variant={variant} className={className}>
      <Link href="/get-quote">{personalizedCTA}</Link>
    </Button>
  );
}

