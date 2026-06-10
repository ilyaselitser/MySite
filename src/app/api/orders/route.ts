import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { items, paymentMethod, form } = await req.json();

    const subtotal = items.reduce(
      (sum: number, i: { priceBgn: number; quantity: number }) => sum + i.priceBgn * i.quantity,
      0
    );
    const orderNumber = `CS-${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: "pending",
        paymentMethod,
        paymentStatus: "unpaid",
        currency: "BGN",
        subtotal,
        shippingCost: 0,
        total: subtotal,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        notes: form.notes ?? "",
        userId: session?.user?.id ?? null,
        items: {
          create: items.map((item: {
            id: string;
            nameBg: string;
            nameEn: string;
            priceBgn: number;
            priceEur: number;
            quantity: number;
          }) => ({
            productId: item.id,
            quantity: item.quantity,
            priceBgn: item.priceBgn,
            priceEur: item.priceEur,
            nameBg: item.nameBg,
            nameEn: item.nameEn,
          })),
        },
      },
    });

    return NextResponse.json({ orderNumber: order.orderNumber });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
