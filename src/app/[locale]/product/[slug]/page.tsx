import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/product/AddToCartButton";
import { Package, Tag, Users } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const t = await getTranslations("product");

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  const images: string[] = JSON.parse(product.images);
  const name = locale === "ru" ? product.nameRu : locale === "en" ? product.nameEn : product.nameBg;
  const description = locale === "ru" ? product.descriptionRu : locale === "en" ? product.descriptionEn : product.descriptionBg;
  const categoryName = locale === "ru" ? product.category.nameRu : locale === "en" ? product.category.nameEn : product.category.nameBg;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-sky-50 mb-4">
            <Image
              src={images[0] ?? "/images/placeholder.png"}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-brand-50">
                  <Image src={img} alt={`${name} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="text-sm text-brand-600 font-semibold mb-2">{categoryName}</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display mb-4">{name}</h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-xl text-sm font-semibold">
              <Users className="w-4 h-4" />
              {t("ageRange")}: {product.ageMin}–{product.ageMax} {t("years")}
            </div>
            <div className="flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-2 rounded-xl text-sm font-semibold">
              <Tag className="w-4 h-4" />
              {categoryName}
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
              product.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
              <Package className="w-4 h-4" />
              {product.stock > 0 ? t("inStock") : t("outOfStock")}
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
            <h3 className="font-bold text-gray-900 mb-2">{t("description")}</h3>
            <p>{description}</p>
          </div>

          {/* Add to cart */}
          <AddToCartButton product={product} locale={locale} />
        </div>
      </div>
    </div>
  );
}
