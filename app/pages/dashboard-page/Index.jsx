import { Search } from "lucide-react";
import {
  recentlyViewed,
  latestDocuments,
  likedDocuments,
  myDocuments,
} from "@/lib/seeded-data";
import DashBoardSection from "./DashBoardSection";
import { getDashboardDocument } from "@/lib/data";

const DashBoard = async () => {
  const { recentlyDocuments, viewedDocument } = await getDashboardDocument();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
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
        title={"Tài liệu mới nhất"}
        data={recentlyDocuments}
        viewAllString={"Xem tất cả các tài liệu mới nhất"}
      />
      <DashBoardSection
        title={"Tài liệu bạn đã xem gần đây"}
        data={viewedDocument}
        viewAllString={"Xem tất cả các tài liệu đã xem gần đây"}
      />
      {/* <DashBoardSection
        title={"Tài liệu đã thích"}
        data={likedDocuments}
        viewAllString={"Xem tất cả các tài liệu đã thích"}
      />
      <DashBoardSection
        title={"Tài liệu của tôi"}
        data={myDocuments}
        viewAllString={"Xem tất cả các tài liệu của tôi"}
      /> */}
    </div>
  );
};

export default DashBoard;

// TODO: refactor DashboardSection to custom ui for each dashboard section, like viewed 4s ago etc..

// TODO: build document detail page, find solution for view file, like, comment etc...
