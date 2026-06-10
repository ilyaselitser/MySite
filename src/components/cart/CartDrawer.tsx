"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/currency";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("cart");
  const locale = useLocale();
  const { items, removeItem, updateQty, totalBgn, totalEur } = useCartStore();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openCart", handler);
    return () => window.removeEventListener("openCart", handler);
  }, []);

  function getName(item: (typeof items)[0]) {
    if (locale === "ru") return item.nameRu;
    if (locale === "en") return item.nameEn;
    return item.nameBg;
  }

  const formattedTotal = formatPrice(totalBgn(), totalEur(), locale);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-brand-600" />
            <h2 className="text-lg font-bold font-display">{t("title")}</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-200 mb-4" />
              <p className="font-semibold text-gray-500">{t("empty")}</p>
              <p className="text-sm text-gray-400 mt-1">{t("emptySubtitle")}</p>
              <Link
                href={`/${locale}/shop`}
                onClick={() => setOpen(false)}
                className="mt-6 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors"
              >
                {t("continueShopping")}
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 bg-gray-50 rounded-2xl p-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                  <Image
                    src={item.image}
                    alt={getName(item)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">{getName(item)}</p>
                  <p className="text-sm font-bold text-brand-600 mt-1">
                    {formatPrice(item.priceBgn, item.priceEur, locale)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-brand-400 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-brand-400 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t("subtotal")}</span>
              <span className="font-semibold text-gray-900">{formattedTotal}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900">
              <span>{t("total")}</span>
              <span className="text-brand-600">{formattedTotal}</span>
            </div>
            <Link
              href={`/${locale}/checkout`}
              onClick={() => setOpen(false)}
              className="block w-full text-center py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-brand-200"
            >
              {t("checkout")}
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="block w-full text-center py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t("continueShopping")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
