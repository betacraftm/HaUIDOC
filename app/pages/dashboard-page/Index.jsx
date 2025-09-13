import { Search } from "lucide-react";
import DashBoardSection from "./DashBoardSection";
import { getDashboardDocument } from "@/lib/data";

const DashBoard = async () => {
  const { recentlyDocuments, viewedDocument, likedDocument, userDocument } =
    await getDashboardDocument();
  const dashboardSection = {
    recently: {
      title: "Tài liệu mới nhất",
      data: recentlyDocuments,
      viewAllString: "Xem tất cả tài liệu mới nhất",
      metaData: {
        createdAtShow: true,
      },
      href: "/documents?section=recently&page=1",
    },
    viewed: {
      title: "Tài liệu bạn đã xem gần đây",
      data: viewedDocument,
      viewAllString: "Xem tất cả các tài liệu đã xem gần đây",
      metaData: {
        viewedAtShow: true,
      },
      href: "/documents?section=viewed&page=1",
    },
    liked: {
      title: "Tài liệu bạn đã thích gần đây",
      data: likedDocument,
      viewAllString: "Xem tất cả các tài liệu đã thích",
      href: "/documents?section=liked&page=1",
    },
    user: {
      title: "Tài liệu của bạn",
      data: userDocument,
      viewAllString: "Xem tất cả tài liệu của bạn",
      metaData: {
        createdAtShow: true,
      },
      href: "/documents?section=user-doc&page=1",
    },
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-7xl bg-white px-4 py-8">
        <div className="relative mb-8 overflow-hidden rounded-full bg-white shadow-md">
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu, khóa học, hoặc đề tài..."
            className="focus:ring-primary-light w-full rounded-full py-3 pr-12 pl-5 text-lg transition-all duration-200 focus:ring-2 focus:outline-none"
          />
          <button className="text-primary absolute top-0 right-0 flex h-full w-12 items-center justify-center rounded-full bg-white transition-colors duration-200 hover:bg-gray-50">
            <Search className="h-6 w-6" />
          </button>
        </div>

        <DashBoardSection
          title={dashboardSection.recently.title}
          data={dashboardSection.recently.data}
          viewAllString={dashboardSection.recently.viewAllString}
          href={dashboardSection.recently.href}
          metaData={dashboardSection.recently.metaData}
        />
        <DashBoardSection
          title={dashboardSection.viewed.title}
          data={dashboardSection.viewed.data}
          viewAllString={dashboardSection.viewed.viewAllString}
          href={dashboardSection.viewed.href}
          metaData={dashboardSection.viewed.metaData}
        />
        <DashBoardSection
          title={dashboardSection.liked.title}
          data={dashboardSection.liked.data}
          viewAllString={dashboardSection.liked.viewAllString}
          href={dashboardSection.liked.href}
        />
        <DashBoardSection
          title={dashboardSection.user.title}
          data={dashboardSection.user.data}
          viewAllString={dashboardSection.user.viewAllString}
          href={dashboardSection.user.href}
          metaData={dashboardSection.user.metaData}
        />
      </div>
    </div>
  );
};

export default DashBoard;
