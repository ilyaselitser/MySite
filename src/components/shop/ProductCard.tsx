"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/currency";
import toast from "react-hot-toast";
import clsx from "clsx";

interface Product {
  id: string;
  slug: string;
  nameBg: string;
  nameRu: string;
  nameEn: string;
  priceBgn: number;
  priceEur: number;
  images: string;
  ageMin: number;
  ageMax: number;
  stock: number;
  featured: boolean;
  category: { nameBg: string; nameRu: string; nameEn: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("shop");
  const locale = useLocale();
  const { addItem } = useCartStore();

  const images: string[] = JSON.parse(product.images);
  const image = images[0] ?? "/images/placeholder.png";

  const name =
    locale === "ru" ? product.nameRu : locale === "en" ? product.nameEn : product.nameBg;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      nameBg: product.nameBg,
      nameRu: product.nameRu,
      nameEn: product.nameEn,
      priceBgn: product.priceBgn,
      priceEur: product.priceEur,
      image,
    });
    toast.success(
      locale === "ru" ? "Добавлено в корзину!" : locale === "en" ? "Added to cart!" : "Добавено в количката!"
    );
  }

  return (
    <Link href={`/${locale}/product/${product.slug}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/30 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-50 to-sky-50">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.featured && (
            <div className="absolute top-3 left-3 bg-accent-400 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              {locale === "bg" ? "Популярен" : locale === "ru" ? "Хит" : "Popular"}
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="bg-gray-800 text-white text-sm font-bold px-4 py-2 rounded-full">
                {t("outOfStock")}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="text-xs text-brand-500 font-semibold mb-1">
            {locale === "ru"
              ? product.category.nameRu
              : locale === "en"
              ? product.category.nameEn
              : product.category.nameBg}
            {" · "}
            {product.ageMin}–{product.ageMax} {t("years")}
          </div>
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-3 font-display">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-extrabold text-brand-600">
              {formatPrice(product.priceBgn, product.priceEur, locale)}
            </span>
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={clsx(
                "p-2.5 rounded-xl transition-all",
                product.stock > 0
                  ? "bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-200 hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              )}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
