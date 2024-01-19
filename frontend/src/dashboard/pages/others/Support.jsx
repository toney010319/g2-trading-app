import { useState, useEffect } from "react";
import { getProfile } from "../../../lib/api";
import { ContactSupport } from "../../../lib/adminapi";
const Support = ({ addAlert }) => {
    const user_id = document.cookie.split('user_id=')[1];
    const [profile, setProfile] = useState({});
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');


    const fetchProfile = async () => {
        try {
            let response = await getProfile(user_id);
            setProfile(response);

        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleSubmit = async () => {
        const res = await ContactSupport(message, subject, profile.id)

        if (res?.status == "200") {
            addAlert('success', res?.data?.message)

        }
        else (addAlert('error', res?.response?.data?.status?.message))
    }

    useEffect(() => {
        fetchProfile();
    }, []);


    return (
        <>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white p-10 rounded-md shadow-lg">
                    <span className="flex justify-center w-full text-3xl font-bold">Contact Us</span>
                    <span className="flex italic w-full justify-center text-xs mt-1">If you have any complaints or suggestions please fill out the form</span>
                    <div className="mb-5">
                        <label
                            className="mb-3 block text-base font-medium"
                        >
                            Full Name
                        </label>
                        <input
                            value={`${profile.first_name} ${profile.middle_name} ${profile.last_name}`}
                            className="cursor-not-allowed w-full rounded-md border  bg-white py-3 px-6 text-base font-medium  focus:shadow-md"
                            disabled
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="mb-3 block text-base font-medium"
                        >
                            Email Address
                        </label>
                        <input
                            value={profile.email}
                            placeholder="example@domain.com"
                            className="cursor-not-allowed w-full rounded-md border  bg-white py-3 px-6 text-base font-medium  outline-none  focus:shadow-md"
                            disabled
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="mb-3 block text-base font-medium"
                        >
                            Subject
                        </label>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter your subject"
                            className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="mb-3 block text-base font-medium"
                        >
                            Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message"
                            className="w-full resize-none rounded-md border  bg-white py-3 px-6 text-base font-medium outline-none focus:shadow-md"
                        ></textarea>
                    </div>
                    <div>
                        <button
                            className="hover:shadow-form rounded-md bg-azure-500 hover:bg-azure-700 py-3 px-8 text-base font-semibold text-white outline-none"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Support;