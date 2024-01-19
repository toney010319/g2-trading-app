import ExpandedSidebar from "./subcomponents/sidebar/ExpandedSidebar";
import NotExpandedSidebar from "./subcomponents/sidebar/!ExpandedSidebar";
import { useState } from "react";
const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    return (
    <>
        <div className={`bg-gradient-to-b from-gray-400 to-gray-800 h-full p-3 ${expanded ? 'w-60' : 'w-20'} duration-300 relative rounded-br-lg`}>
            {expanded ? (
                <ExpandedSidebar expanded={expanded} setExpanded={setExpanded} />
            ) : (
                <NotExpandedSidebar expanded={expanded} setExpanded={setExpanded} />
            )}
        </div>
        <button 
                className="ml-1 bg-gray-300 p-1 rounded-full absolute -left-4 top-1/2 -translate-y-1/2"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? <img src="https://www.svgrepo.com/show/500756/arrow-left-bold.svg" width="30" /> : <img src="https://www.svgrepo.com/show/390864/arrow-right-bold.svg" width="30" />}
        </button>
    </>
    )
}

export default Sidebar;