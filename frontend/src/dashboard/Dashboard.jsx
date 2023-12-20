import Navigationbar from "../components/Navigationbar";
import Sidebar from "../components/Sidebar";

// eslint-disable-next-line react/prop-types
const Dashboard = ({addAlert}) => {
    return (
    <div className="flex h-screen bg-green-200">
        <div className="flex">
            <Sidebar />
        </div>
        
        <div className="w-screen">
            <div className="flex">
                <Navigationbar addAlert={addAlert} />
            </div>

            <div className="grid grid-cols-12 grid-rows-10 gap-2 ml-1">
                <div className="col-span-12 bg-red-200 justify-self-stretch">2</div>
                <div className="col-span-12 row-start-2 bg-yellow-200">3</div>
                <div className="col-span-12 row-span-5 row-start-3 bg-indigo-200">7</div>
                <div className="col-span-12 row-span-3 row-start-8 bg-red-200">8</div>
            </div>

        </div>
    </div>
    
    )
}

export default Dashboard;