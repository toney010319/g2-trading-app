const Navigationbar = () => {
 return (
    <>
        <div className="flex min-w-full justify-between bg-gray-200">
            <span>
                Deposit
            </span>
            
            <span>
                Withdraw
            </span>

            <div className="flex flex-row ml-2">
                <span>
                    My Profile
                </span>

                <span className="">
                    Logout
                </span>
            </div>
        </div>
    </>
 );
};

export default Navigationbar;