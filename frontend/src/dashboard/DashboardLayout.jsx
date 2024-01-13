import Navigationbar from "../components/Navigationbar";
import Sidebar from "../components/Sidebar";
// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children, addAlert }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-screen">
        <div className="flex-1">
          <Navigationbar addAlert={addAlert} />
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
