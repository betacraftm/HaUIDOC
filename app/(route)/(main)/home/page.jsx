export const dynamic = 'force-dynamic';

import SearchBar from "components/SearchBar";
import { getHomeDocuments } from "@/lib/data";
import HomePage from "components/HomePageComponent";
import { Suspense } from "react";
import SearchResult from "components/SearchResult";
import SearchSkeleton from "components/skeletons/SearchSkeleton";
import { auth } from "auth";

const page = async ({ searchParams }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const params = await searchParams;
  const query = params?.query || "";
  const page = Number(params?.page) || 1;

  const { recentlyDocuments, viewedDocument, likedDocument, userDocument } =
    await getHomeDocuments(userId);
  const homeSection = {
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
    <main className="bg-gray-50">
      <div className="container mx-auto max-w-7xl bg-white px-4 py-8">
        <SearchBar />
        {query ? (
          <Suspense fallback={<SearchSkeleton />}>
            <SearchResult query={query} page={page} />
          </Suspense>
        ) : (
          <HomePage homeSection={homeSection} />
        )}
      </div>
    </main>
  );
};

export default page;
