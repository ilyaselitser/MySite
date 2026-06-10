"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/currency";
import toast from "react-hot-toast";

interface Product {
  id: string;
  slug: string;
  nameBg: string;
  nameRu: string;
  nameEn: string;
  priceBgn: number;
  priceEur: number;
  images: string;
  stock: number;
}

export default function AddToCartButton({ product, locale }: { product: Product; locale: string }) {
  const t = useTranslations("product");
  const [qty, setQty] = useState(1);
  const { addItem } = useCartStore();

  const images: string[] = JSON.parse(product.images);

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        slug: product.slug,
        nameBg: product.nameBg,
        nameRu: product.nameRu,
        nameEn: product.nameEn,
        priceBgn: product.priceBgn,
        priceEur: product.priceEur,
        image: images[0] ?? "/images/placeholder.png",
      });
    }
    toast.success(
      locale === "ru" ? "Добавлено в корзину!" : locale === "en" ? "Added to cart!" : "Добавено в количката!"
    );
    window.dispatchEvent(new CustomEvent("openCart"));
  }

  return (
    <div className="space-y-4">
      {/* Price */}
      <div className="text-4xl font-extrabold text-brand-600 font-display">
        {formatPrice(product.priceBgn, product.priceEur, locale)}
      </div>

      {/* Qty */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-600">{t("quantity")}:</span>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 font-bold text-gray-900 min-w-[3rem] text-center">{qty}</span>
          <button
            onClick={() => setQty(Math.min(product.stock, qty + 1))}
            className="px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        className="w-full flex items-center justify-center gap-3 py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-200 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
      >
        <ShoppingCart className="w-5 h-5" />
        {product.stock > 0 ? t("addToCart") : t("outOfStock")}
      </button>
    </div>
  );
}
