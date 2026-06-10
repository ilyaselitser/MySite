import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { items, locale } = await req.json();
    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    const lineItems = items.map((item: {
      nameBg: string;
      nameEn: string;
      priceBgn: number;
      priceEur: number;
      quantity: number;
      image: string;
    }) => ({
      price_data: {
        currency: "bgn",
        product_data: {
          name: locale === "en" ? item.nameEn : item.nameBg,
          images: [item.image].filter((img) => img.startsWith("http")),
        },
        unit_amount: Math.round(item.priceBgn * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/${locale}/checkout/success?order={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
