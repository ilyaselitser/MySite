import { getTranslations } from "next-intl/server";

export default async function DeliveryPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("footer");

  const content: Record<string, { sections: { title: string; body: string }[] }> = {
    bg: {
      sections: [
        { title: "Начини на доставка", body: "Доставяме чрез Еконт и Спиди до всяка точка на страната. Срокът за доставка е 1–3 работни дни след потвърждение на поръчката." },
        { title: "Цена на доставката", body: "Цената на доставката се изчислява според тарифите на избрания куриер. При поръчки над определена стойност доставката е безплатна." },
        { title: "Наложен платеж", body: "При наложен платеж плащате при получаване на пратката. Куриерът издава касов бон или фактура." },
        { title: "Право на връщане", body: "Можете да върнете продукт в рамките на 14 дни от получаването му. Продуктът трябва да е в оригиналната си опаковка и да не е използван." },
        { title: "Процедура за връщане", body: "За да върнете продукт, свържете се с нас на info@coolschool.bg. Ще ви изпратим инструкции за връщане." },
      ],
    },
    en: {
      sections: [
        { title: "Delivery Methods", body: "We deliver via Econt and Speedy to any address in the country. Delivery time is 1–3 business days after order confirmation." },
        { title: "Delivery Cost", body: "Delivery cost is calculated according to the selected courier's rates. Free delivery is available on orders above a certain value." },
        { title: "Cash on Delivery", body: "With cash on delivery you pay upon receipt of the parcel. The courier issues a receipt or invoice." },
        { title: "Right of Return", body: "You may return a product within 14 days of receipt. The product must be in its original packaging and unused." },
        { title: "Return Procedure", body: "To return a product, contact us at info@coolschool.bg. We will send you return instructions." },
      ],
    },
    ru: {
      sections: [
        { title: "Способы доставки", body: "Мы доставляем через Econt и Speedy по любому адресу в стране. Срок доставки — 1–3 рабочих дня после подтверждения заказа." },
        { title: "Стоимость доставки", body: "Стоимость доставки рассчитывается по тарифам выбранной курьерской службы. При заказах выше определённой суммы доставка бесплатна." },
        { title: "Наложенный платёж", body: "При наложенном платеже вы платите при получении посылки. Курьер выдаёт кассовый чек или счёт-фактуру." },
        { title: "Право на возврат", body: "Вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и не использован." },
        { title: "Процедура возврата", body: "Для возврата товара свяжитесь с нами по адресу info@coolschool.bg. Мы вышлем вам инструкции по возврату." },
      ],
    },
  };

  const locale = params.locale as "bg" | "en" | "ru";
  const { sections } = content[locale] ?? content.bg;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 font-display mb-8">{t("deliveryReturns")}</h1>
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
