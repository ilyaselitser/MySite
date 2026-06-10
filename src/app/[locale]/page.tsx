import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import ProductCard from "@/components/shop/ProductCard";
import { ArrowRight } from "lucide-react";

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("home");

  const featured = await prisma.product.findMany({
    where: { featured: true },
    take: 4,
    include: { category: true },
  });

  const categories = await prisma.category.findMany({ take: 6 });

  return (
    <>
      <Hero />

      {/* Featured products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display mb-2">
                {t("featuredTitle")}
              </h2>
              <p className="text-gray-500">{t("featuredSubtitle")}</p>
            </div>
            <Link
              href={`/${locale}/shop`}
              className="hidden sm:flex items-center gap-2 text-brand-600 font-semibold text-sm hover:gap-3 transition-all"
            >
              {t("viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">
                {locale === "bg"
                  ? "Скоро ще добавим продукти!"
                  : locale === "ru"
                  ? "Скоро добавим товары!"
                  : "Products coming soon!"}
              </p>
            </div>
          )}
          <div className="text-center mt-8 sm:hidden">
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center gap-2 text-brand-600 font-semibold"
            >
              {t("viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display mb-3">
                {t("categoriesTitle")}
              </h2>
              <p className="text-gray-500">{t("categoriesSubtitle")}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {categories.map((cat) => {
                const name =
                  locale === "ru" ? cat.nameRu : locale === "en" ? cat.nameEn : cat.nameBg;
                return (
                  <Link
                    key={cat.id}
                    href={`/${locale}/shop?category=${cat.slug}`}
                    className="group bg-gradient-to-br from-brand-50 to-sky-50 hover:from-brand-100 hover:to-sky-100 border border-brand-100 rounded-3xl p-6 flex items-center gap-4 transition-all hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">
                      {cat.image ?? "📦"}
                    </div>
                    <span className="font-bold text-gray-800 font-display">{name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Testimonials />

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display mb-4">
            {locale === "bg"
              ? "Готови да вдъхновите детето си?"
              : locale === "ru"
              ? "Готовы вдохновить своего ребёнка?"
              : "Ready to inspire your child?"}
          </h2>
          <p className="text-brand-100 mb-8">
            {locale === "bg"
              ? "Разгледайте нашата пълна колекция от образователни комплекти."
              : locale === "ru"
              ? "Просмотрите нашу полную коллекцию образовательных наборов."
              : "Browse our full collection of educational kits."}
          </p>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-bold rounded-2xl hover:bg-brand-50 transition-colors shadow-xl"
          >
            {locale === "bg" ? "Към магазина" : locale === "ru" ? "В магазин" : "Go to shop"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
