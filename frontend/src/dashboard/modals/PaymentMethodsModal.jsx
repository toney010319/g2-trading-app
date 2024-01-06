import { useNavigate } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const PaymentMethodsModal = ({handleClose, addAlert}) => {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [amount, setAmount] = useState('')
  const navigate = useNavigate()

  const handleNext = () => {
    if (!amount) {
      addAlert('error', 'Please enter an amount')
      return
    }

    if (!selectedMethod) {
      addAlert('error', 'Please choose a payment method')
      return
    }

    if (selectedMethod === 'card') {
      navigate('/deposit')
      return
    }
  
    if (selectedMethod === 'paypal' || selectedMethod === 'stripe') {
      addAlert('error', 'This payment method is currently unavailable')
      return
    }
  }

  return (
    <> 
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <span className="text-2xl font-semibold">
                    Order Details
                  </span>
              </div>

              <div className="flex justify-between">

                  <div className="flex m-2">
                    <label htmlFor="amount">Amount:</label>
                    <input 
                      className="ml-2 border-1 border border-black"
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)} 
                    />
                  </div>

                  <div className="flex m-2 mr-4">
                    <label htmlFor="amount">Email:</label>
                    <span className="text-gray-500 text-sm font-serif mt-1 ml-1">email@email.com</span> 
                  </div>
              </div>
              
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <span className="text-2xl font-semibold">
                    Choose a payment method
                  </span>
                  <sub className="flex text-xs italic mt-2 ml-1">
                    (Click one of the options below)
                  </sub>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
              
                <div className="relative flex flex-col gap-2 ml-4">
                
                  <div className="flex items-center">
                    <input 
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={selectedMethod === 'card'}
                      onChange={e => setSelectedMethod(e.target.value)}
                    />
                    <label htmlFor="card">
                      <img 
                        src="https://www.kindpng.com/picc/m/116-1162634_credit-card-icons-hd-png-download.png" 
                        width="150" 
                        alt="Card" 
                      />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio" 
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={selectedMethod === 'paypal'}
                      onChange={e => setSelectedMethod(e.target.value)}  
                      disabled
                    />
                    <label htmlFor="paypal">
                      <img
                        src="https://tap2pay.me/wp-content/uploads/2018/12/PayPal-Header-720x480-1.jpg"
                        width="150"
                        alt="Paypal" 
                      />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio" 
                      id="stripe"
                      name="paymentMethod"
                      value="stripe"
                      checked={selectedMethod === 'stripe'}
                      onChange={e => setSelectedMethod(e.target.value)}
                      disabled  
                    />
                    <label htmlFor="paypal">
                      <img
                        src="https://www.cairnskangarooms.com/wp-content/uploads/2018/07/Stripe-Payment-Logo.png"
                        width="150"
                        alt="Stripe" 
                      />
                    </label>
                  </div>

                </div>
               
                <div className="flex justify-between p-5 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>

                  <button
                    className="text-white px-5 py-1 bg-azure-500 rounded-md hover:bg-azure-700"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  );
}

export default PaymentMethodsModal;