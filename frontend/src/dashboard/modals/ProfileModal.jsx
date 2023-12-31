
import { getUserBalance } from "../../lib/api";
import { useState, useEffect, useMemo } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProfileModal = ({setShowModal}) => {
  const user_id = document.cookie.split('user_id=')[1];
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);


    const fetchBalanceMemoized = useMemo(() => async () => {
      try {
        const response = await getUserBalance(user_id);
        setBalance(response);
        setLoading(false);
        console.log(response.balance)
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
  }, [user_id]);

  useEffect(() => {
    fetchBalanceMemoized();
  }, [fetchBalanceMemoized]);


    return (     
      <div className="bg-white rounded-lg w-48">
        <div className="flex flex-row justify between">
          <span className="flex-1 text-center text-2xl font-bold w-full">Profile</span>
        </div>
      
        <div className="flex-1">
        <span className="flex justify-center text-gray-600 text-xl">Wallet Balance</span>
        {loading ? (
        <div className="flex justify-center w-full h-10">
          <Loading />
        </div>
        ) : (
          <span
            className="cursor-pointer flex justify-center text-green-500 hover:text-green-700 hover:underline font-bold border-b-2 text-lg"
            onClick={() => setShowModal(true)}
          >
            ₱{balance?.balance}
          </span>
        )}
      </div>
      

    
      <div className="flex flex-col pb-2">
        <Link to = 'myprofile'>
          <button className="text-blue-500 hover:text-blue-700">View Profile</button>
        </Link>
        <button className="text-blue-500 hover:text-blue-700">Change Password</button>
        <button className="text-blue-500 hover:text-blue-700">Settings</button>
      </div>
    </div>
  );
};

export default ProfileModal;