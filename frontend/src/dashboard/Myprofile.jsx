import { getProfile } from '../../../frontend/src/lib/api';
import { useState, useEffect } from 'react';
import Loading from '../../../frontend/src/components/Loading';

const MyProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const user_id = document.cookie.split('user_id=')[1];

  const fetchProfile = async () => {
    try {
      let response = await getProfile(user_id);
      setProfile(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <section className="container mx-auto p-6 font-mono">
        <div className="max-w-2xl mx-auto bg-white rounded-md overflow-hidden shadow-lg">
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loading />
              </div>
            ) : profile ? (
              <form>
                <div className="mb-4">
                  <label className="block text-gray-1000 text-sm font-bold mb-2">Registration Date</label>
                  <p className="text-gray-900">{profile.created_at}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-1000 text-sm font-bold mb-2">Email</label>
                  <p className="text-gray-900">{profile.email}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-1000 text-sm font-bold mb-2">Username</label>
                  <p className="text-gray-900">{profile.username}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-1000 text-sm font-bold mb-2">First Name</label>
                  <p className="text-gray-900">{profile.first_name}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-1000 text-sm font-bold mb-2">Second Name</label>
                  <p className="text-gray-900">{profile.middle_name}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-1000 text-sm font-bold mb-2">Last Name</label>
                  <p className="text-gray-900">{profile.last_name}</p>
                </div>
              </form>
            ) : (
              <p className="text-center">No Profile</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyProfile;
