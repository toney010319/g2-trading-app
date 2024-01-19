import { getProfile } from '../../../frontend/src/lib/api';
import { useState, useEffect } from 'react';
import Loading from '../../../frontend/src/components/Loading';

// Default profile picture URL
const defaultProfilePicture = 'https://www.svgrepo.com/show/498301/profile-circle.svg';

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
    <div className="container mx-auto p-6 font-mono">
      <div className="max-w-4xl mx-auto bg-white rounded-md overflow-hidden shadow-lg">
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Loading />
            </div>
          ) : profile ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <img
                    src={profile.profile_picture_url || defaultProfilePicture}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h1 className="text-2xl font-bold">{profile.username}</h1>
                    <p className="text-gray-600">Joined on {profile.created_at}</p>
                  </div>
                </div>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                  Edit Profile
                </button>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                <form>
                  <div className="mb-4">
                    <p className="text-gray-900">{`Email: ${profile.email}`}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-900">{`Username: ${profile.username}`}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-900">{`First Name: ${profile.first_name}`}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-900">{`Middle Name: ${profile.middle_name}`}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-900">{`Last Name: ${profile.last_name}`}</p>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <p className="text-center">No Profile</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
