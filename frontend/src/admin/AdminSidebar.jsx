 
import { useState } from "react";
import AdminExpandedSidebar from "./components/AdminExpandedSidebar";
import NotAdminExpandedSidebar from "./components/!AdminExpandedSidebar";
const AdminSidebar = () => {
    const [expanded, setExpanded] = useState(false);
    return (
    <>
        <div className={`bg-gradient-to-b from-azure-400 to-azure-900 h-full p-3 ${expanded ? 'w-60' : 'w-20'} duration-300 relative rounded-br-lg`}>
            {expanded ? (
                <AdminExpandedSidebar expanded={expanded} setExpanded={setExpanded} />
            ) : (
                <NotAdminExpandedSidebar expanded={expanded} setExpanded={setExpanded} />
            )}
        </div>
        <button 
                className="ml-1 bg-azure-300 p-2 rounded-full absolute -left-3 top-1/2 -translate-y-1/2"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? '<' : '>'}
        </button>
    </>
    )
}

export default AdminSidebar;