// app/profile/page.tsx
import { getSession } from "@/lib/getSession";
import { PrismaClient } from "generated/prisma";
import ProfileFormClient from "pages/profile-page";
import { anton } from "public/fonts";

const prisma = new PrismaClient();

export const metadata = {
  title: "Thông tin cá nhân - HaUIDOC",
  description: "Quản lý thông tin cá nhân, cập nhật hồ sơ và tùy chỉnh tài khoản HaUIDOC của bạn.",
  keywords: "thông tin cá nhân, hồ sơ, cập nhật, tài khoản, HaUIDOC",
  robots: {
    index: false,
    follow: false,
  },
};

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
      <div className="ring-secondary mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl ring-1">
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
