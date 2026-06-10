import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import AccountClient from "./AccountClient";

export default async function AccountPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${params.locale}/auth/login`);
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  const t = await getTranslations("account");

  return (
    <AccountClient
      user={session.user}
      orders={orders}
      locale={params.locale}
    />
  );
}
