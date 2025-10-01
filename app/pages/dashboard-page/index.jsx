import DashBoardSection from "./DashBoardSection";

const DashBoard = ({ dashboardSection }) => {
  return (
    <>
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
    </>
  );
};

export default DashBoard;
