"use client";
import { useTranslations, useLocale } from "next-intl";
import { Star } from "lucide-react";

const testimonials = [
  {
    nameBg: "Мария Иванова",
    nameRu: "Мария Иванова",
    nameEn: "Maria Ivanova",
    textBg: "Дъщеря ми обожава математическия комплект! Учи с удоволствие и вече не се страхува от числата.",
    textRu: "Моя дочь обожает математический набор! Учится с удовольствием и больше не боится цифр.",
    textEn: "My daughter loves the math kit! She's learning with joy and no longer afraid of numbers.",
    rating: 5,
  },
  {
    nameBg: "Петър Георгиев",
    nameRu: "Пётр Георгиев",
    nameEn: "Peter Georgiev",
    textBg: "Перфектен подарък за рожден ден! Синът ми не може да спре да прави опити с научния комплект.",
    textRu: "Идеальный подарок на день рождения! Мой сын не может оторваться от научного набора.",
    textEn: "Perfect birthday gift! My son can't stop experimenting with the science kit.",
    rating: 5,
  },
  {
    nameBg: "Елена Стоянова",
    nameRu: "Елена Стоянова",
    nameEn: "Elena Stoyanova",
    textBg: "Качеството е отлично, а съдържанието е много добре обмислено. Препоръчвам на всеки родител!",
    textRu: "Качество отличное, а содержимое очень продуманное. Рекомендую каждому родителю!",
    textEn: "Excellent quality, and the content is very well thought out. I recommend to every parent!",
    rating: 5,
  },
];

export default function Testimonials() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display mb-3">
            {t("testimonialsTitle")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t("testimonialsSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => {
            const name = locale === "ru" ? item.nameRu : locale === "en" ? item.nameEn : item.nameBg;
            const text = locale === "ru" ? item.textRu : locale === "en" ? item.textEn : item.textBg;
            return (
              <div key={i} className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-3xl p-7">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm">
                    {name.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">{name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
