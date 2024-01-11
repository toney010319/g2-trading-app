
import AdminNavigationBar from "./components/AdminNavigationBar";
// eslint-disable-next-line react/prop-types
const AdminDashboardLayout = ({ children, addAlert }) => {
  return (
    <div className="flex h-screen">


      <div className="w-screen">
        <div className="flex-1">
          <AdminNavigationBar addAlert={addAlert} />
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
