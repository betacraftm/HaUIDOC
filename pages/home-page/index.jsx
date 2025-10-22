import HomeSection from "./HomeSection";

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
