/**
 * Home Dashboard Component
 *
 * The main dashboard component that displays personalized content for authenticated users.
 * Shows recent documents, viewed documents, liked documents, and user's own documents
 * in organized sections with view-all links to detailed pages.
 *
 * Features:
 * - Personalized content based on user activity
 * - Multiple document sections (recent, viewed, liked, user docs)
 * - Responsive grid layout
 * - Navigation to detailed document lists
 *
 * Data Structure:
 * homeSection: {
 *   recently: { title, data, viewAllString, href, metaData },
 *   viewed: { ... },
 *   liked: { ... },
 *   user: { ... }
 * }
 *
 * @component
 * @param {Object} props.homeSection - Section data from server
 */

import HomeSection from "components/HomeSection";

const HomePage = ({ homeSection }) => {
  return (
    <>
      <HomeSection
        title={homeSection.recently.title}
        data={homeSection.recently.data}
        viewAllString={homeSection.recently.viewAllString}
        href={homeSection.recently.href}
        metaData={homeSection.recently.metaData}
      />
      <HomeSection
        title={homeSection.viewed.title}
        data={homeSection.viewed.data}
        viewAllString={homeSection.viewed.viewAllString}
        href={homeSection.viewed.href}
        metaData={homeSection.viewed.metaData}
      />
      <HomeSection
        title={homeSection.liked.title}
        data={homeSection.liked.data}
        viewAllString={homeSection.liked.viewAllString}
        href={homeSection.liked.href}
      />
      <HomeSection
        title={homeSection.user.title}
        data={homeSection.user.data}
        viewAllString={homeSection.user.viewAllString}
        href={homeSection.user.href}
        metaData={homeSection.user.metaData}
      />
    </>
  );
};

export default HomePage;
