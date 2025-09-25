import DashBoardSection from "./DashBoardSection";
import { getDashboardDocument, searchDocuments } from "@/lib/data";
import SearchBar from "@/components/SearchBar";

const DashBoard = async ({ searchParams }) => {
  // const params = await searchParams;
  // const query = params?.query || "";
  // const page = Number(params?.page) || 1;
  // console.log(query, page);

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
        <SearchBar />

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
