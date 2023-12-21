import Sidebar from "../components/Sidebar";
import Navigationbar from "../components/Navigationbar";
// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children, addAlert }) => {


  return (
    <div className="flex h-screen">
      <div className="flex-1 ease-in-out duration-300">
        <Sidebar />
      </div>

      <div className="w-screen">
        <div className="flex-1">
          <Navigationbar addAlert={addAlert}/> 
        </div>

        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;