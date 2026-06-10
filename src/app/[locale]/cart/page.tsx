"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/currency";

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { items, removeItem, updateQty, totalBgn, totalEur } = useCartStore();

  function getName(item: (typeof items)[0]) {
    if (locale === "ru") return item.nameRu;
    if (locale === "en") return item.nameEn;
    return item.nameBg;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingCart className="w-20 h-20 text-gray-200 mx-auto mb-6" />
        <h1 className="text-2xl font-extrabold text-gray-900 font-display mb-2">{t("empty")}</h1>
        <p className="text-gray-500 mb-8">{t("emptySubtitle")}</p>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200"
        >
          {t("continueShopping")} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 font-display mb-8">{t("title")}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-brand-50 flex-shrink-0">
                <Image src={item.image} alt={getName(item)} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{getName(item)}</h3>
                <p className="text-brand-600 font-bold">
                  {formatPrice(item.priceBgn, item.priceEur, locale)}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2.5 py-1.5 hover:bg-gray-50">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1.5 font-bold text-sm min-w-[2rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2.5 py-1.5 hover:bg-gray-50">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  {formatPrice(item.priceBgn * item.quantity, item.priceEur * item.quantity, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-5">{t("subtotal")}</h2>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t("subtotal")}</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(totalBgn(), totalEur(), locale)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t("shipping")}</span>
                <span className="text-green-600 font-semibold">{t("freeShipping")}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                <span>{t("total")}</span>
                <span className="text-brand-600 text-lg">
                  {formatPrice(totalBgn(), totalEur(), locale)}
                </span>
              </div>
            </div>
            <Link
              href={`/${locale}/checkout`}
              className="block w-full text-center py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-brand-200"
            >
              {t("checkout")} <ArrowRight className="inline w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
