import React, { useState, useEffect } from "react";
import { Languages } from "lucide-react";

/**
 * LanguageToggle
 * Uses the googtrans cookie approach — most reliable method for Google Translate.
 * Sets the cookie and reloads the page so translation applies instantly on load.
 */

function getCookieLang() {
  // Read the googtrans cookie: value is like "/en/ta"
  const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
  return match ? match[1] : "en";
}

function setGoogTransCookie(lang) {
  const value = lang === "en" ? "" : `/en/${lang}`;
  const expiry = lang === "en"
    ? "expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    : "";
  // Set for both root domain and hostname
  document.cookie = `googtrans=${value}; ${expiry} path=/`;
  document.cookie = `googtrans=${value}; ${expiry} path=/; domain=${window.location.hostname}`;
}

export const LanguageToggle = ({ compact = false }) => {
  const [lang, setLang] = useState(() => getCookieLang());

  const toggle = () => {
    const next = lang === "en" ? "ta" : "en";
    setGoogTransCookie(next);
    setLang(next);
    // Small delay to let cookie write, then reload
    setTimeout(() => window.location.reload(), 80);
  };

  const isTamil = lang === "ta";
  const btnSize = compact ? "w-7 h-7" : "w-8 h-8";

  return (
    <button
      onClick={toggle}
      title={isTamil ? "Switch to English" : "Switch to Tamil"}
      className={`relative ${btnSize} flex items-center justify-center rounded-full border-2 transition-all hover:scale-110 active:scale-95 shadow-sm`}
      style={{
        backgroundColor: isTamil ? "#9B111E" : "#FFD700",
        borderColor:     isTamil ? "#FFD700" : "#9B111E",
        color:           isTamil ? "#FFD700" : "#9B111E",
      }}
    >
      <Languages className="w-4 h-4" />
      {/* tiny language badge */}
      <span
        className="absolute -bottom-0.5 -right-0.5 text-[7px] font-black leading-none px-0.5 rounded-sm"
        style={{
          backgroundColor: isTamil ? "#FFD700" : "#9B111E",
          color:           isTamil ? "#9B111E" : "#FFD700",
        }}
      >
        {isTamil ? "EN" : "த"}
      </span>
    </button>
  );
};
