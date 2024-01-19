
// eslint-disable-next-line react/prop-types
const TermsAndConditions = ({handleClose}) => {

  return (
    <> 
         
         <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md max-w-lg max-h-96 overflow-y-auto text-left relative">
        <button
          className="absolute top-2 right-2 text-gray-600 text-2xl cursor-pointer"
          onClick={handleClose}
        >
          &times;
        </button>
              <h1 className="text-3xl font-bold mb-4">Stellar Markets Terms and Conditions</h1>

                <section>
                  <h2 className="font-bold text-2xl mb-1">1. Introduction</h2>
                  <p>Welcome to Stellar Markets! These Terms and Conditions govern your use of the Stellar Markets website and mobile application (collectively, the Platform). By accessing or using the Platform, you agree to comply with and be bound by these Terms.</p>
                </section>

                <section>
                  <h2 className="font-bold text-2xl mb-1">2. Account Registration</h2>
                  <p>To use certain features of the Platform, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                </section>

                <section>
                  <h2 className="font-bold text-2xl mb-1">3. User Conduct</h2>
                  <p>You agree to use the Platform in accordance with all applicable laws and regulations. You will not engage in any conduct that may disrupt or interfere with the operation of the Platform or compromise its security.</p>
                </section>

                <section>
                  <h2 className="font-bold text-2xl mb-1">4. Trading</h2>
                  <p>Stellar Markets provides a platform for trading various financial instruments. You acknowledge and understand the risks associated with trading and agree to make independent investment decisions at your own risk.</p>
                </section>

                <section>
                  <h2 className="font-bold text-2xl mb-1">5. Privacy</h2>
                  <p>Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and disclose your personal information.</p>
                </section>

                <section>
                  <h2 className="font-bold text-2xl mb-1">6. Intellectual Property</h2>
                  <p>All content on the Platform, including but not limited to text, graphics, logos, and software, is the property of Stellar Markets or its licensors and is protected by intellectual property laws.</p>
                </section>

                <section>
                  <h2 className="font-bold text-2xl mb-1">7. Limitation of Liability</h2>
                  <p>Stellar Markets shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.</p>
                </section>

                <section>
                  <h2 className="font-bold text-2xl mb-1">8. Termination</h2>
                  <p>Stellar Markets reserves the right to terminate or suspend your account and access to the Platform at its sole discretion, without notice, for any reason.</p>
                </section>

                <section>
                  <h2 className="font-bold text-2xl mb-1">9. Changes to Terms</h2>
                  <p>Stellar Markets may update these Terms from time to time. It is your responsibility to review these Terms periodically. Continued use of the Platform after any changes indicates your acceptance of the revised Terms.</p>
                </section>

                <section>
                  <h2 className="font-bold text-2xl mb-1">10. Governing Law</h2>
                  <p>These Terms are governed by and construed in accordance with the laws of [your jurisdiction].</p>
                </section>
              </div>
            </div>
            
        </>
  );
}

export default TermsAndConditions;