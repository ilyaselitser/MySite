"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { ShoppingCart, Menu, X, GraduationCap, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/lib/store";
import clsx from "clsx";

const locales = [
  { code: "bg", label: "БГ", flag: "🇧🇬" },
  { code: "ru", label: "РУ", flag: "🇷🇺" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const itemCount = useCartStore((s) => s.itemCount());
  const { data: session } = useSession();

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  const navLinks = [
    { href: `/${locale}/shop`, label: t("shop") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:shadow-brand-300 transition-shadow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900 font-display">
              Cool<span className="text-brand-600">School</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-semibold transition-colors",
                  pathname.startsWith(link.href)
                    ? "text-brand-600"
                    : "text-gray-600 hover:text-brand-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={clsx(
                    "px-2 py-1.5 text-xs font-bold transition-colors",
                    locale === l.code
                      ? "bg-brand-600 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>

            {/* Cart */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openCart"))}
              className="relative p-2 rounded-xl hover:bg-brand-50 transition-colors"
              aria-label={t("cart")}
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* User / Auth */}
            {session ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                    {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 max-w-[80px] truncate">
                    {session.user.name}
                  </span>
                  <ChevronDown className={clsx("w-3.5 h-3.5 text-gray-400 transition-transform", userMenuOpen && "rotate-180")} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 z-50">
                    <Link
                      href={`/${locale}/account`}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      {t("account")}
                    </Link>
                    <button
                      onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: `/${locale}` }); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t("logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href={`/${locale}/auth/login`}
                  className="text-sm font-semibold text-gray-600 hover:text-brand-600 transition-colors px-2"
                >
                  {t("login")}
                </Link>
                <Link
                  href={`/${locale}/auth/register`}
                  className="text-sm font-bold px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-colors shadow-md shadow-brand-200"
                >
                  {t("register")}
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-semibold text-gray-700 py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile auth */}
          {session ? (
            <>
              <Link
                href={`/${locale}/account`}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-semibold text-gray-700 py-2"
              >
                {t("account")} ({session.user.name})
              </Link>
              <button
                onClick={() => { setMobileOpen(false); signOut({ callbackUrl: `/${locale}` }); }}
                className="block text-sm font-semibold text-red-600 py-2"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link
                href={`/${locale}/auth/login`}
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-bold border border-gray-200 rounded-xl"
              >
                {t("login")}
              </Link>
              <Link
                href={`/${locale}/auth/register`}
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-bold bg-brand-600 text-white rounded-xl"
              >
                {t("register")}
              </Link>
            </div>
          )}

          {/* Mobile lang switcher */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => { switchLocale(l.code); setMobileOpen(false); }}
                className={clsx(
                  "px-3 py-1.5 text-xs font-bold rounded-lg transition-colors",
                  locale === l.code ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600"
                )}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
