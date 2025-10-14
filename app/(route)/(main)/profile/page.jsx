// app/profile/page.tsx
import { getSession } from "@/lib/getSession";
import { PrismaClient } from "generated/prisma";
import ProfileFormClient from "pages/profile-page/ProfileFormClient";
import { anton } from "public/fonts";

const prisma = new PrismaClient();

export default async function page() {
  const session = await getSession();
  const userId = session?.user?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { majors: true },
  });

  const majors = await prisma.major.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-md">
        <h1
          className={`text-primary mb-6 text-center ${anton.className} text-3xl font-bold`}
        >
          Thông tin cá nhân
        </h1>
        <ProfileFormClient user={user} majors={majors} />
      </div>
    </main>
  );
}
