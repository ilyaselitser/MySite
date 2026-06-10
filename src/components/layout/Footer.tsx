"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white font-display">
                Cool<span className="text-brand-400">School</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">{t("tagline")}</p>
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-brand-400" />
                <span>info@coolschool.bg</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-brand-400" />
                <span>+359 88 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>София, България</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("shop")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/shop`} className="hover:text-white transition-colors">{t("shop")}</Link></li>
              <li><Link href={`/${locale}/shop?ageMin=3`} className="hover:text-white transition-colors">3–6 г.</Link></li>
              <li><Link href={`/${locale}/shop?ageMin=6`} className="hover:text-white transition-colors">6–9 г.</Link></li>
              <li><Link href={`/${locale}/shop?ageMin=9`} className="hover:text-white transition-colors">9+ г.</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("company")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{t("about")}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t("contact")}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("support")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t("faq")}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t("shipping")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} CoolSchool. {t("rights")}.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
            <Link href={`/${locale}/terms`} className="hover:text-gray-300 transition-colors">{t("terms")}</Link>
            <span className="text-gray-700">|</span>
            <Link href={`/${locale}/delivery`} className="hover:text-gray-300 transition-colors">{t("deliveryReturns")}</Link>
            <span className="text-gray-700">|</span>
            <Link href={`/${locale}/privacy`} className="hover:text-gray-300 transition-colors">{t("privacyPolicy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
