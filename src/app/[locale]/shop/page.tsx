import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";
import SortSelect from "@/components/shop/SortSelect";

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string; ageMin?: string; sort?: string };
}) {
  const { locale } = params;
  const t = await getTranslations("shop");

  const categories = await prisma.category.findMany();

  const where: Record<string, unknown> = {};
  if (searchParams.category) where.category = { slug: searchParams.category };
  if (searchParams.ageMin) where.ageMin = { gte: parseInt(searchParams.ageMin) };

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (searchParams.sort === "price_asc") orderBy = { priceBgn: "asc" };
  if (searchParams.sort === "price_desc") orderBy = { priceBgn: "desc" };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: { category: true },
  });

  const ageGroups = [
    { label: "0–3", min: 0, max: 3 },
    { label: "3–6", min: 3, max: 6 },
    { label: "6–9", min: 6, max: 9 },
    { label: "9–12", min: 9, max: 12 },
    { label: "12+", min: 12, max: 99 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display">{t("title")}</h1>
        <p className="text-gray-500 mt-2">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-6">
            {/* Category filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">{t("filterCategory")}</h3>
              <div className="space-y-1">
                <a
                  href={`/${locale}/shop`}
                  className={`block text-sm px-3 py-2 rounded-xl transition-colors ${
                    !searchParams.category ? "bg-brand-600 text-white font-semibold" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {t("filterAll")}
                </a>
                {categories.map((cat) => {
                  const name = locale === "ru" ? cat.nameRu : locale === "en" ? cat.nameEn : cat.nameBg;
                  return (
                    <a
                      key={cat.id}
                      href={`/${locale}/shop?category=${cat.slug}`}
                      className={`block text-sm px-3 py-2 rounded-xl transition-colors ${
                        searchParams.category === cat.slug
                          ? "bg-brand-600 text-white font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {name}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Age filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">{t("filterAge")}</h3>
              <div className="space-y-1">
                {ageGroups.map((ag) => (
                  <a
                    key={ag.label}
                    href={`/${locale}/shop?ageMin=${ag.min}`}
                    className={`block text-sm px-3 py-2 rounded-xl transition-colors ${
                      searchParams.ageMin === String(ag.min)
                        ? "bg-brand-600 text-white font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {ag.label} {t("years")}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {/* Sort */}
          <div className="flex justify-end mb-6">
            <SortSelect locale={locale} currentSort={searchParams.sort} currentCategory={searchParams.category} />
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">{t("noProducts")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
