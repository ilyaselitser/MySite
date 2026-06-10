"use client";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { User, Package, LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  currency: string;
  total: number;
  createdAt: Date;
  items: { id: string; nameBg: string; nameEn: string; quantity: number }[];
}

interface Props {
  user: { id: string; name?: string | null; email?: string | null };
  orders: Order[];
  locale: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AccountClient({ user, orders, locale }: Props) {
  const t = useTranslations("account");

  function getStatusLabel(status: string) {
    const map: Record<string, string> = {
      pending: t("statusPending"),
      paid: t("statusPaid"),
      shipped: t("statusShipped"),
      delivered: t("statusDelivered"),
      cancelled: t("statusCancelled"),
    };
    return map[status] ?? status;
  }

  function getItemName(item: Order["items"][0]) {
    return locale === "en" ? item.nameEn : item.nameBg;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-display">{t("title")}</h1>
          <p className="text-gray-500 mt-1">
            {t("hello")}, <span className="font-semibold text-gray-700">{user.name}</span>
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: `/${locale}` })}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-gray-200"
        >
          <LogOut className="w-4 h-4" />
          {t("logout")}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-brand-500" />
              {t("profileSection")}
            </h2>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-4">
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                {orders.length}{" "}
                {locale === "ru" ? "заказов" : locale === "en" ? "orders" : "поръчки"}
              </p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="md:col-span-2">
          <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-500" />
            {t("ordersSection")}
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">{t("noOrders")}</p>
              <Link
                href={`/${locale}/shop`}
                className="inline-block mt-4 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-xl transition-colors"
              >
                {locale === "bg" ? "Към магазина" : locale === "ru" ? "В магазин" : "Go to shop"}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">
                        {t("orderNumber")}{order.orderNumber}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString(
                          locale === "bg" ? "bg-BG" : locale === "ru" ? "ru-RU" : "en-GB"
                        )}
                      </p>
                    </div>
                    <span className={clsx("text-xs font-bold px-3 py-1 rounded-full", statusColors[order.status] ?? "bg-gray-100 text-gray-600")}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    {order.items.map((item) => (
                      <p key={item.id} className="text-sm text-gray-600">
                        {getItemName(item)} × {item.quantity}
                      </p>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <span className="font-bold text-brand-600">
                      {order.total.toFixed(2)} BGN
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
