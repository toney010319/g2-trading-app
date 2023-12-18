import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";


const Dashboard = () => {
    return (
    <div className="grid grid-cols-12 grid-rows-12 gap-2 w-screen h-screen">
        <div className="col-span-2 row-span-12 bg-red-200 h-full">
            <Sidebar />
        </div>
        <div className="col-span-10 col-start-3 bg-blue-200">Header Navigation Bar</div>
        <div className="col-span-10 col-start-3 row-start-2 bg-cyan-200">Ads</div>
        <div className="col-span-10 row-span-6 col-start-3 row-start-3 bg-yellow-200">Content Area</div>
        <div className="col-span-10 row-span-4 col-start-3 row-start-9 bg-purple-200">
        <div className="h-full flex flex-col justify-between">
            Sub Content Area with Footer
            <div className="self-start"> 
                <Footer />  
            </div>
        </div>
      </div>
    </div>
    )
}

export default Dashboard;