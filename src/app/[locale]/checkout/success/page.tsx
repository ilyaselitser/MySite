import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default async function OrderSuccessPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { order?: string };
}) {
  const { locale } = params;
  const t = await getTranslations("orderSuccess");

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 font-display mb-3">{t("title")}</h1>
      <p className="text-gray-500 mb-4">{t("subtitle")}</p>
      {searchParams.order && (
        <p className="text-sm text-gray-600 mb-8">
          {t("orderNumber")}: <span className="font-bold text-brand-600">#{searchParams.order}</span>
        </p>
      )}
      <Link
        href={`/${locale}/shop`}
        className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-brand-200"
      >
        {t("continueShopping")} <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
