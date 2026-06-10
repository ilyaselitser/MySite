import { getTranslations } from "next-intl/server";

export default async function TermsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("footer");

  const content: Record<string, { sections: { title: string; body: string }[] }> = {
    bg: {
      sections: [
        { title: "1. Общи разпоредби", body: "Настоящите общи условия уреждат отношенията между CoolSchool и потребителите на онлайн магазина." },
        { title: "2. Поръчки", body: "Поръчките се приемат през уебсайта. След потвърждение на поръчката ще получите имейл с детайли." },
        { title: "3. Цени и плащане", body: "Всички цени са посочени в EUR и BGN с включен ДДС. Плащането се извършва с карта (Stripe), банков превод или наложен платеж." },
        { title: "4. Доставка", body: "Доставките се извършват чрез Еконт или Спиди в рамките на 1–3 работни дни." },
        { title: "5. Право на отказ", body: "Имате право да се откажете от поръчката в рамките на 14 дни от получаването й, без да посочвате причина." },
      ],
    },
    en: {
      sections: [
        { title: "1. General Provisions", body: "These terms and conditions govern the relationship between CoolSchool and users of the online shop." },
        { title: "2. Orders", body: "Orders are accepted through the website. After confirming your order you will receive an email with details." },
        { title: "3. Prices & Payment", body: "All prices are shown in EUR and BGN inclusive of VAT. Payment is by card (Stripe), bank transfer, or cash on delivery." },
        { title: "4. Delivery", body: "Deliveries are made via Econt or Speedy within 1–3 business days." },
        { title: "5. Right of Withdrawal", body: "You have the right to withdraw from the order within 14 days of receipt, without giving a reason." },
      ],
    },
    ru: {
      sections: [
        { title: "1. Общие положения", body: "Настоящие общие условия регулируют отношения между CoolSchool и пользователями интернет-магазина." },
        { title: "2. Заказы", body: "Заказы принимаются через веб-сайт. После подтверждения заказа вы получите электронное письмо с деталями." },
        { title: "3. Цены и оплата", body: "Все цены указаны в EUR и BGN с учётом НДС. Оплата производится картой (Stripe), банковским переводом или наложенным платежом." },
        { title: "4. Доставка", body: "Доставка осуществляется через Econt или Speedy в течение 1–3 рабочих дней." },
        { title: "5. Право на отказ", body: "Вы имеете право отказаться от заказа в течение 14 дней с момента получения без указания причины." },
      ],
    },
  };

  const locale = params.locale as "bg" | "en" | "ru";
  const { sections } = content[locale] ?? content.bg;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 font-display mb-8">{t("terms")}</h1>
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
