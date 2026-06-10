"use client";
import { useTranslations } from "next-intl";
import { Search, Lightbulb, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, color: "bg-brand-100 text-brand-600", num: "01" },
  { icon: Lightbulb, color: "bg-accent-100 text-accent-600", num: "02" },
  { icon: TrendingUp, color: "bg-sky-100 text-sky-600", num: "03" },
];

export default function HowItWorks() {
  const t = useTranslations("home");
  const hw = useTranslations("howItWorks");

  const items = [
    { title: hw("step1Title"), desc: hw("step1Desc") },
    { title: hw("step2Title"), desc: hw("step2Desc") },
    { title: hw("step3Title"), desc: hw("step3Desc") },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display mb-3">
            {t("howItWorksTitle")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t("howItWorksSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow text-center relative">
                <div className="absolute top-5 right-5 text-5xl font-extrabold text-gray-50 font-display select-none">
                  {step.num}
                </div>
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-5`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 font-display">{items[i].title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{items[i].desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
