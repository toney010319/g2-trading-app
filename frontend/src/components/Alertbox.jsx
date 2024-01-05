
// eslint-disable-next-line react/prop-types
const Alertbox = ({type, message, onClose}) => {

    let alertType;
    let icon;
    let alertColor;
   
    if(type === 'success') {
      alertType = 'alert-success';
      icon = 'https://www.svgrepo.com/show/500703/success-filled.svg';
      alertColor = 'bg-green-500';
   
    } else if(type === 'error') {
   
      alertType = 'alert-danger';
      icon = 'https://www.svgrepo.com/show/503021/error.svg';
      alertColor = 'bg-red-500';
    } else {
   
      alertType = 'alert-info';
      icon = 'https://www.svgrepo.com/show/480717/information-button.svg';
      alertColor = 'bg-blue-500';
    }
   
    return (
      <div className={`alert ${alertType}`} role="alert">
          <div className={`duration-300 ease-in-out flex text-white px-2 py-1 rounded-lg m-1 ${alertColor}`}>
              <div className={`flex flex-row`}>
                <img 
                src={icon} 
                alt={type}
                style={{width: '22px', height: '22px'}}
                />
                <p className="ml-1 text-white">{message}</p>
                <button
                    onClick={onClose}
                    aria-label="Close alert"
                >
                <span className="text-red-200 ml-1" aria-hidden="true">&times;</span>
                </button>
              </div>
        </div>
      </div>
    );
   }
   

export default Alertbox;