import { getTranslations } from "next-intl/server";
import { GraduationCap, Heart, Star, Users } from "lucide-react";

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("about");

  const values = [
    {
      icon: GraduationCap,
      color: "bg-brand-100 text-brand-600",
      title: locale === "bg" ? "Образование" : locale === "ru" ? "Образование" : "Education",
      desc: locale === "bg" ? "Всеки продукт е разработен с педагогическа цел." : locale === "ru" ? "Каждый продукт разработан с педагогической целью." : "Every product is developed with an educational purpose.",
    },
    {
      icon: Heart,
      color: "bg-red-100 text-red-500",
      title: locale === "bg" ? "Страст" : locale === "ru" ? "Страсть" : "Passion",
      desc: locale === "bg" ? "Обичаме да правим ученето забавно и запомнящо се." : locale === "ru" ? "Мы любим делать обучение веселым и запоминающимся." : "We love making learning fun and memorable.",
    },
    {
      icon: Star,
      color: "bg-accent-100 text-accent-600",
      title: locale === "bg" ? "Качество" : locale === "ru" ? "Качество" : "Quality",
      desc: locale === "bg" ? "Използваме само безопасни, висококачествени материали." : locale === "ru" ? "Мы используем только безопасные, высококачественные материалы." : "We use only safe, high-quality materials.",
    },
    {
      icon: Users,
      color: "bg-sky-100 text-sky-600",
      title: locale === "bg" ? "Общност" : locale === "ru" ? "Сообщество" : "Community",
      desc: locale === "bg" ? "Изграждаме общност от родители и деца учещи заедно." : locale === "ru" ? "Мы строим сообщество родителей и детей, учащихся вместе." : "We build a community of parents and children learning together.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-200">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 font-display mb-4">{t("title")}</h1>
        <p className="text-xl text-brand-600 font-semibold">{t("subtitle")}</p>
      </div>

      {/* Story */}
      <div className="bg-gradient-to-br from-brand-50 to-sky-50 rounded-3xl p-8 mb-12">
        <h2 className="text-2xl font-extrabold text-gray-900 font-display mb-4">{t("mission")}</h2>
        <p className="text-gray-700 leading-relaxed text-lg mb-4">{t("story")}</p>
        <p className="text-gray-600 leading-relaxed">{t("missionText")}</p>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 font-display mb-8 text-center">{t("values")}</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-display">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-3 gap-6 text-center">
        {[
          { value: "500+", label: locale === "bg" ? "Доволни семейства" : locale === "ru" ? "Счастливых семей" : "Happy families" },
          { value: "30+", label: locale === "bg" ? "Продукта" : locale === "ru" ? "Продуктов" : "Products" },
          { value: "3", label: locale === "bg" ? "Езика" : locale === "ru" ? "Языка" : "Languages" },
        ].map((stat, i) => (
          <div key={i} className="bg-brand-50 rounded-2xl p-6">
            <div className="text-3xl font-extrabold text-brand-600 font-display mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
