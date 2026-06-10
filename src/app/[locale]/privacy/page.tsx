import { getTranslations } from "next-intl/server";

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("footer");

  const content: Record<string, { sections: { title: string; body: string }[] }> = {
    bg: {
      sections: [
        { title: "Събиране на данни", body: "CoolSchool събира лични данни (имe, имейл, адрес, телефон) само при регистрация или направена поръчка. Данните се използват единствено за обработка на поръчките и комуникация с клиентите." },
        { title: "Съхранение на данни", body: "Личните данни се съхраняват сигурно и не се предоставят на трети страни, освен на куриерски фирми за целите на доставката." },
        { title: "Бисквитки", body: "Сайтът използва технически необходими бисквитки за функционирането на количката и сесията. Не използваме проследяващи или рекламни бисквитки без вашето съгласие." },
        { title: "Вашите права", body: "Имате право да поискате достъп, коригиране или изтриване на вашите лични данни. За запитвания се свържете с нас на info@coolschool.bg." },
        { title: "Промени в политиката", body: "Запазваме правото да актуализираме тази политика. При съществени промени ще ви уведомим по имейл." },
      ],
    },
    en: {
      sections: [
        { title: "Data Collection", body: "CoolSchool collects personal data (name, email, address, phone) only during registration or when placing an order. Data is used solely for order processing and customer communication." },
        { title: "Data Storage", body: "Personal data is stored securely and not shared with third parties, except with courier companies for delivery purposes." },
        { title: "Cookies", body: "The site uses technically necessary cookies for cart and session functionality. We do not use tracking or advertising cookies without your consent." },
        { title: "Your Rights", body: "You have the right to request access, correction, or deletion of your personal data. For inquiries contact us at info@coolschool.bg." },
        { title: "Policy Changes", body: "We reserve the right to update this policy. In case of significant changes we will notify you by email." },
      ],
    },
    ru: {
      sections: [
        { title: "Сбор данных", body: "CoolSchool собирает персональные данные (имя, email, адрес, телефон) только при регистрации или оформлении заказа. Данные используются исключительно для обработки заказов и общения с клиентами." },
        { title: "Хранение данных", body: "Персональные данные надёжно хранятся и не передаются третьим сторонам, кроме курьерских служб для целей доставки." },
        { title: "Файлы cookie", body: "Сайт использует технически необходимые файлы cookie для работы корзины и сессии. Мы не используем отслеживающие или рекламные cookie без вашего согласия." },
        { title: "Ваши права", body: "Вы имеете право запросить доступ, исправление или удаление ваших персональных данных. По вопросам обращайтесь на info@coolschool.bg." },
        { title: "Изменения политики", body: "Мы оставляем за собой право обновлять данную политику. При существенных изменениях мы уведомим вас по электронной почте." },
      ],
    },
  };

  const locale = params.locale as "bg" | "en" | "ru";
  const { sections } = content[locale] ?? content.bg;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 font-display mb-8">{t("privacyPolicy")}</h1>
      <div className="prose prose-gray max-w-none space-y-6">
        {sections.map((s, i) => (
          <div key={i}>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h2>
            <p className="text-gray-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
