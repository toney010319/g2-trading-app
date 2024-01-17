import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Checkout = () => {
    return (
    <div className="w-full h-full">
      <Elements stripe={stripePromise}>
        <StripeCheckoutForm />
      </Elements>
    </div>
    );
  };

    export default Checkout