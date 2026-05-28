"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { IoMenu, IoClose, IoSparkles, IoWalletOutline, IoAlbumsOutline } from "react-icons/io5";
import { SiVercel } from "react-icons/si";

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[150] w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Name */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-95 transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 shadow-lg shadow-fuchsia-500/10">
            <IoSparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <span className="font-outfit text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
            AI Wedding Photo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-200">
            Workspace
          </Link>
          <Link href="/gallery" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-200">
            Gallery
          </Link>
          <Link href="/pricing" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-200">
            Pricing
          </Link>
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Vercel Deploy Button */}
          <a
            href="https://vercel.com/new/clone?repository-url=https://github.com/SamurAIGPT/ai-wedding-photo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 px-3.5 py-1.5 text-xs font-bold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-all duration-200"
          >
            <SiVercel className="h-3 w-3 text-white" />
            Deploy
          </a>

          {status === "authenticated" ? (
            <>
              {/* Credits Badge */}
              <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 shadow-inner">
                <IoWalletOutline className="h-4 w-4 text-fuchsia-500" />
                <span>Credits:</span>
                <span className="font-bold text-fuchsia-400 font-mono">
                  {session.user.credits ?? 0}
                </span>
              </div>

              {/* Profile / Sign Out */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-xl bg-zinc-900 hover:bg-zinc-800 hover:text-white text-zinc-300 border border-zinc-800 px-4.5 py-2 text-sm font-semibold tracking-tight transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold px-5.5 py-2 text-sm tracking-tight shadow-lg shadow-fuchsia-500/10 hover:brightness-110 active:scale-98 transition-all"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-3">
          {status === "authenticated" && (
            <div className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-300 shadow-inner">
              <span className="font-bold text-fuchsia-400 font-mono">{session.user.credits ?? 0}</span>
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <IoClose className="h-6 w-6" /> : <IoMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Absolute Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 z-[200] border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-lg px-4 py-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-xl p-3 text-base font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all"
            >
              <IoSparkles className="h-5 w-5 text-fuchsia-500" />
              Editor Workspace
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-xl p-3 text-base font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all"
            >
              <IoAlbumsOutline className="h-5 w-5 text-fuchsia-500" />
              Creations Gallery
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-xl p-3 text-base font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all"
            >
              <IoWalletOutline className="h-5 w-5 text-fuchsia-500" />
              Buy Credits
            </Link>

            <div className="my-2 border-t border-zinc-800"></div>

            {status === "authenticated" ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full rounded-xl bg-zinc-900 hover:bg-zinc-800 py-3 text-center text-sm font-bold text-zinc-300 hover:text-white transition-all"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signIn("google");
                }}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-center text-sm font-bold text-white tracking-tight shadow-md hover:brightness-110 active:scale-98 transition-all"
              >
                Sign In with Google
              </button>
            )}

            {/* Vercel Deploy in Mobile Menu */}
            <a
              href="https://vercel.com/new/clone?repository-url=https://github.com/SamurAIGPT/ai-wedding-photo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-4 rounded-xl border border-zinc-800 p-3 text-xs font-semibold text-zinc-400 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-all"
            >
              <SiVercel className="h-3 w-3" />
              Deploy on Vercel
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
