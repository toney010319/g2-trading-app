import { CardElement } from '@stripe/react-stripe-js';

const StripeCheckoutForm = () => {
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Handle payment submission here
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
    );
  };

  export default StripeCheckoutForm