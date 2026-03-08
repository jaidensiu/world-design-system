"use client";

import { useState, useEffect } from "react";
import {
  primitiveColors,
  specialtyColors,
  semanticTokens,
  typographyTokens,
  spacingTokens,
  fontWeightLabels,
} from "./tokens";
import pkg from "@jaidensiu/world-design-system/package.json";

const TOKENS_VERSION = pkg.version;
const GITHUB_URL = "https://github.com/jaidensiu/world-design-system";

type Tab = "colors" | "semantic" | "typography" | "spacing";
type Theme = "light" | "dark";

function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("wds-theme") as Theme | null;
    const initial =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("wds-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return { theme, toggle };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="ml-2 shrink-0 rounded px-1.5 py-0.5 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/5 hover:bg-foreground/10"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ColorCard({
  groupName,
  name,
  value,
}: {
  groupName: string;
  name: string;
  value: string;
}) {
  const groupKey = groupName.replace(/\s+/g, "");
  const fullName = groupName === "Other" ? name : `${groupKey.charAt(0).toLowerCase() + groupKey.slice(1)}.${name}`;
  return (
    <div className="group flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 hover:bg-surface transition-colors">
      <div
        className="h-10 w-10 rounded-md border border-black/10 shrink-0"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium truncate">{fullName}</div>
        <div className="text-xs font-mono text-muted">{value}</div>
      </div>
      <CopyButton text={value} />
    </div>
  );
}

function ColorsSection() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold mb-1">Primitive Colors</h2>
        <p className="text-sm text-muted mb-6">
          Theme-agnostic base palette. These are referenced by semantic tokens.
        </p>
        {primitiveColors.map((group) => (
          <div key={group.name} className="mb-8">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
              {group.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {group.colors.map((c) => (
                <ColorCard
                  key={c.name}
                  groupName={group.name}
                  name={c.name}
                  value={c.value}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-1">Specialty Colors</h2>
        <p className="text-sm text-muted mb-6">
          Brand and product-specific colors with loud/silent variants.
        </p>
        {specialtyColors.map((group) => (
          <div key={group.name} className="mb-8">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
              {group.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {group.colors.map((c) => (
                <ColorCard
                  key={c.name}
                  groupName={group.name}
                  name={c.name}
                  value={c.value}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SemanticSection() {
  const groups = Array.from(new Set(semanticTokens.map((t) => t.group)));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Semantic Tokens</h2>
        <p className="text-sm text-muted mb-6">
          Role-based color tokens that change between light and dark themes.
        </p>
      </div>
      {groups.map((group) => (
        <div key={group}>
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
            {group}
          </h3>
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="px-4 py-2 font-medium">Token</th>
                  <th className="px-4 py-2 font-medium">Light</th>
                  <th className="px-4 py-2 font-medium">Dark</th>
                </tr>
              </thead>
              <tbody>
                {semanticTokens
                  .filter((t) => t.group === group)
                  .map((token) => (
                    <tr
                      key={token.name}
                      className="border-t border-border group"
                    >
                      <td className="px-4 py-2.5 font-mono text-xs">
                        {token.name}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2 group/cell">
                          <div
                            className="h-6 w-6 rounded border border-black/10 shrink-0"
                            style={{ backgroundColor: token.light }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-xs text-muted">
                                {token.light}
                              </span>
                              <CopyButton text={token.light} />
                            </div>
                            {token.lightRef && (
                              <span className="text-[10px] text-muted/60 font-mono">
                                {token.lightRef}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2 group/cell">
                          <div
                            className="h-6 w-6 rounded border border-black/10 shrink-0"
                            style={{ backgroundColor: token.dark }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-xs text-muted">
                                {token.dark}
                              </span>
                              <CopyButton text={token.dark} />
                            </div>
                            {token.darkRef && (
                              <span className="text-[10px] text-muted/60 font-mono">
                                {token.darkRef}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function TypographySection() {
  const categories = Array.from(
    new Set(typographyTokens.map((t) => t.category))
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Typography</h2>
        <p className="text-sm text-muted mb-6">
          Type scale with size, weight, letter spacing, and line height.
        </p>
      </div>
      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
            {cat}
          </h3>
          <div className="space-y-3">
            {typographyTokens
              .filter((t) => t.category === cat)
              .map((token) => (
                <div
                  key={token.name}
                  className="group border border-border rounded-xl px-5 py-4 hover:bg-surface transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span
                      className="truncate"
                      style={{
                        fontSize: `${Math.min(token.fontSize, 48)}px`,
                        fontWeight: token.fontWeight,
                        letterSpacing: `${token.letterSpacing}em`,
                        lineHeight: token.lineHeightMultiplier,
                      }}
                    >
                      {token.name.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-muted shrink-0">
                      {token.fontSize}px
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted font-mono">
                    <span>
                      weight: {token.fontWeight} (
                      {fontWeightLabels[token.fontWeight]})
                    </span>
                    <span>
                      tracking:{" "}
                      {token.letterSpacing === 0
                        ? "0"
                        : `${token.letterSpacing}em`}
                    </span>
                    <span>
                      line-height: {token.lineHeightMultiplier}x (
                      {(token.fontSize * token.lineHeightMultiplier).toFixed(1)}
                      px)
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SpacingSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Spacing</h2>
        <p className="text-sm text-muted mb-6">
          Consistent spacing scale in pixels.
        </p>
      </div>
      <div className="space-y-3">
        {spacingTokens.map((token) => (
          <div
            key={token.name}
            className="group flex items-center gap-4 border border-border rounded-xl px-5 py-3 hover:bg-surface transition-colors"
          >
            <span className="w-12 text-sm font-semibold">{token.name}</span>
            <div className="flex-1 flex items-center gap-3">
              <div
                className="h-4 rounded bg-foreground/80 transition-all"
                style={{ width: `${token.value * 4}px` }}
              />
              <span className="text-xs font-mono text-muted">
                {token.value}px
              </span>
            </div>
            <span className="text-xs font-mono text-muted">
              --wds-spacing-{token.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeToggle({
  theme,
  toggle,
}: {
  theme: Theme;
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-border p-2 hover:bg-surface transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}

export default function Home() {
  const { theme, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("colors");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "colors", label: "Colors" },
    { id: "semantic", label: "Semantic" },
    { id: "typography", label: "Typography" },
    { id: "spacing", label: "Spacing" },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              World Design System
            </h1>
            <p className="text-xs text-muted">
              Design tokens reference &middot; v{TOKENS_VERSION} &middot;{" "}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </p>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-surface p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <ThemeToggle theme={theme} toggle={toggle} />
          </div>
          {/* Mobile hamburger + theme toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle theme={theme} toggle={toggle} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg border border-border p-2 hover:bg-surface transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Mobile fullscreen menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-background flex flex-col overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-border">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                World Design System
              </h1>
              <p className="text-xs text-muted">
                Design tokens reference &middot; v{TOKENS_VERSION} &middot;{" "}
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle theme={theme} toggle={toggle} />
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-border p-2 hover:bg-surface transition-colors"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          <nav className="flex-1 flex flex-col gap-1 px-6 py-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                }}
                className={`rounded-md px-4 py-3 text-lg font-medium text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-surface text-foreground"
                    : "text-muted hover:text-foreground hover:bg-surface/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}
      <main className="mx-auto max-w-5xl px-6 py-8">
        {activeTab === "colors" && <ColorsSection />}
        {activeTab === "semantic" && <SemanticSection />}
        {activeTab === "typography" && <TypographySection />}
        {activeTab === "spacing" && <SpacingSection />}
      </main>
      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-muted text-center">
          World Design System &mdash; Tokens for Android, iOS, and Web
          <br />
          v{TOKENS_VERSION} &middot;{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
