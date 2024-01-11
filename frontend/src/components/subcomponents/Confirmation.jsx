// ConfirmationPage.js
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
    const { confirmation_token } = useParams(); // Adjust based on your routing params
    const navigate = useNavigate();

    useEffect(() => {
        // Send the confirmation token to the Rails API
        fetch(`http://localhost:3000/confirmation?confirmation_token=${confirmation_token}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Redirect to the login page if confirmation was successful
                    navigate('http://127.0.0.1:5173/');
                } else {
                    // Handle any errors or show a message
                    console.error(data.message);
                }
            })
            .catch(error => {
                console.error('Error confirming account:', error);
            });
    }, [confirmation_token, navigate]);

    return (
        <div>
            <p>Confirming your account...</p>
        </div>
    );
};

export default ConfirmationPage;