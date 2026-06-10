"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Star, Package } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-50 pt-16 pb-24">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-brand-400 text-brand-400" />
              {t("badge")}
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 font-display mb-6">
              {t("title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">
                {t("titleHighlight")}
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/shop`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg shadow-brand-200 transition-all hover:-translate-y-0.5"
              >
                {t("cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-all"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-gray-100">
              {[
                { value: "500+", label: locale === "bg" ? "Доволни семейства" : locale === "ru" ? "Счастливых семей" : "Happy families" },
                { value: "30+", label: locale === "bg" ? "Продукта" : locale === "ru" ? "Продуктов" : "Products" },
                { value: "5★", label: locale === "bg" ? "Средна оценка" : locale === "ru" ? "Средняя оценка" : "Avg. rating" },
              ].map((stat) => (
                <div key={stat.value}>
                  <div className="text-2xl font-extrabold text-brand-600 font-display">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex justify-center relative">
            <div className="relative w-full max-w-md aspect-square">
              {/* Main card */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-[3rem] shadow-2xl shadow-brand-300/50 flex items-center justify-center">
                <div className="text-center text-white px-8">
                  <Package className="w-24 h-24 mx-auto mb-4 opacity-90" />
                  <p className="text-2xl font-extrabold font-display">CoolSchool</p>
                  <p className="text-brand-100 mt-1">
                    {locale === "bg" ? "Образователни комплекти" : locale === "ru" ? "Образовательные наборы" : "Educational Kits"}
                  </p>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 font-semibold text-sm">
                <span className="text-xl">🎓</span>
                <span className="text-gray-700">{locale === "bg" ? "Педагогически одобрено" : locale === "ru" ? "Одобрено педагогами" : "Educator approved"}</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 font-semibold text-sm">
                <span className="text-xl">🏆</span>
                <span className="text-gray-700">{locale === "bg" ? "Над 500 продадени" : locale === "ru" ? "500+ продаж" : "500+ sold"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
