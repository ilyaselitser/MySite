"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function SortSelect({
  locale,
  currentSort,
  currentCategory,
}: {
  locale: string;
  currentSort?: string;
  currentCategory?: string;
}) {
  const t = useTranslations("shop");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams();
    if (e.target.value && e.target.value !== "newest") params.set("sort", e.target.value);
    if (currentCategory) params.set("category", currentCategory);
    const query = params.toString();
    router.push(`/${locale}/shop${query ? `?${query}` : ""}`);
  }

  return (
    <select
      defaultValue={currentSort ?? "newest"}
      onChange={handleChange}
      className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-600 focus:outline-none focus:border-brand-400"
    >
      <option value="newest">{t("sortNewest")}</option>
      <option value="price_asc">{t("sortPriceLow")}</option>
      <option value="price_desc">{t("sortPriceHigh")}</option>
    </select>
  );
}
