import Sidebar from "../components/Sidebar";
import Navigationbar from "../components/Navigationbar";
// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children, addAlert }) => {


  return (
    <div className="flex h-screen bg-green-200">
      <div className="flex ease-in-out duration-300">
      <Sidebar />
      </div>

      <div className="w-screen">
        <div className="flex">
          <Navigationbar addAlert={addAlert}/> 
        </div>

        <div className="grid grid-cols-12 grid-rows-10 gap-2 ml-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;