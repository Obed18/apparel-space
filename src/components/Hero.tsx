import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronDownCircle,
  ChevronDown as ArrowDown,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuthModal } from "../contexts/AuthModalContext";
import "../styles/HeroSection.css";

export default function HeroSection() {
  const { openAuthModal } = useAuthModal();

  return (
    <section className="hero-root">
      <div className="hero-media">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          // replace with your video source or poster image for fallback
          src="/hero-bg.mp4"
        />
        <div className="hero-overlay" />
      </div>

      {/* Content center */}
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "circOut" }}
        >
          Designed for those who stand out.
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Wear Confidence. Define Your Space. Premium fashion crafted for those who stand out.
        </motion.p>

        <motion.div
          className="hero-down"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <button
            className="chev-btn"
            aria-label="scroll down"
            onClick={() => {
              const el = document.getElementById("next-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

        <div className="hero-actions">
            <button
              type="button"
              className="hero-btn hero-green-btn"
              onClick={openAuthModal}
              >Get Started</button>

          <button
            type="button"
            className="hero-btn hero-outline-btn"
            onClick={openAuthModal}
          >
            Sign In
          </button>
        </div>
        </motion.div>
      </div>

      {/* Placeholder next section id for scroll */}
      <div id="next-section" style={{ height: "120vh" }}></div>
    </section>
  );
}
