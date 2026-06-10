"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/currency";
import { CreditCard, Building2, Truck, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import clsx from "clsx";

type PaymentMethod = "stripe" | "bank_transfer" | "cod_econt" | "cod_speedy";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

const paymentOptions: { value: PaymentMethod; icon: React.ElementType; labelKey: string; infoKey: string }[] = [
  { value: "stripe", icon: CreditCard, labelKey: "payStripe", infoKey: "" },
  { value: "bank_transfer", icon: Building2, labelKey: "payBank", infoKey: "bankDetails" },
  { value: "cod_econt", icon: Truck, labelKey: "payCodEcont", infoKey: "codDetails" },
  { value: "cod_speedy", icon: Truck, labelKey: "payCodSpeedy", infoKey: "codDetails" },
];

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const router = useRouter();
  const { items, totalBgn, totalEur, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod_econt");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", postalCode: "", notes: "",
  });

  function getName(item: (typeof items)[0]) {
    if (locale === "ru") return item.nameRu;
    if (locale === "en") return item.nameEn;
    return item.nameBg;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);

    try {
      if (paymentMethod === "stripe") {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, locale, form }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        throw new Error("No checkout URL");
      } else {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, paymentMethod, form }),
        });
        const data = await res.json();
        if (data.orderNumber) {
          clearCart();
          router.push(`/${locale}/checkout/success?order=${data.orderNumber}`);
        } else {
          throw new Error("Order failed");
        }
      }
    } catch {
      toast.error(locale === "ru" ? "Ошибка при оформлении заказа" : locale === "en" ? "Error placing order" : "Грешка при поръчката");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 text-lg">
          {locale === "bg" ? "Количката е празна" : locale === "ru" ? "Корзина пуста" : "Your cart is empty"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 font-display mb-8">{t("title")}</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-5">{t("personalInfo")}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {(["firstName", "lastName", "email", "phone"] as const).map((field) => (
                  <div key={field} className={field === "email" || field === "phone" ? "" : ""}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t(field)} *</label>
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      required
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-400 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-5">{t("shippingAddress")}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("address")} *</label>
                  <input
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-400 text-sm"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t("city")} *</label>
                    <input
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t("postalCode")} *</label>
                    <input
                      required
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-400 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("notes")}</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-400 text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-5">{t("paymentMethod")}</h2>
              <div className="space-y-3">
                {paymentOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <label
                      key={opt.value}
                      className={clsx(
                        "flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        paymentMethod === opt.value
                          ? "border-brand-500 bg-brand-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={paymentMethod === opt.value}
                        onChange={() => setPaymentMethod(opt.value)}
                        className="mt-0.5 accent-brand-600"
                      />
                      <Icon className={clsx("w-5 h-5 mt-0.5 flex-shrink-0", paymentMethod === opt.value ? "text-brand-600" : "text-gray-400")} />
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{t(opt.labelKey as "payStripe")}</p>
                        {opt.infoKey && paymentMethod === opt.value && (
                          <p className="text-xs text-gray-500 mt-1">{t(opt.infoKey as "bankDetails")}</p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-5">{t("orderSummary")}</h2>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-50 flex-shrink-0">
                      <Image src={item.image} alt={getName(item)} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 line-clamp-2">{getName(item)}</p>
                      <p className="text-xs text-gray-500">×{item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                      {formatPrice(item.priceBgn * item.quantity, item.priceEur * item.quantity, locale)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t("orderSummary")}</span>
                  <span className="font-semibold">{formatPrice(totalBgn(), totalEur(), locale)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{locale === "bg" ? "Общо" : locale === "ru" ? "Итого" : "Total"}</span>
                  <span className="text-brand-600 text-lg">{formatPrice(totalBgn(), totalEur(), locale)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-brand-200"
              >
                {loading ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <ShieldCheck className="w-5 h-5" />
                )}
                {loading ? t("processing") : t("placeOrder")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
