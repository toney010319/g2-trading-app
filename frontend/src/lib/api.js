import axios from 'axios';
const token = document.cookie.split('token=')[1]; 
console.log('Token', token)
axios.defaults.headers.post['Authorization'] = token;
axios.defaults.headers.get['Authorization'] = token;



export const registerUser = async (event) => {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      // return {errors:['Passwords do not match']};
      return { response: { data: { status: { code: 422, message: 'Passwords do not match' } } } };
    }


    const newUser = {user:{
      first_name: formData.get('firstName'),
      middle_name: formData.get('middleName'),
      last_name: formData.get('lastName'),
        username: formData.get('username'),
        password: formData.get('password'),
        birthday: formData.get('birthday'),
        email: formData.get('email'),
    }}
    try {
        const res = await axios.post('http://localhost:3000/signup', newUser);
        console.log(res)
        return res
    } catch (error) {
        if (error.response) {
          console.log(error)
          return error 
        } else {
          return error;
        }
      }
};

export const logoutUser = async (event) => {
  event.preventDefault()
  
  const formData = new FormData(event.target)
  const user = {user:{
    email: formData.get('email'),
      password: formData.get('password'),
  }
  }
 
try {
    const res = await axios.post('http://localhost:3000/login', user)
    delete axios.defaults.headers.common['Authorization'];
    return res.data
} catch (error){
    return error;
}
}

export const addBalance = async (balance, user_id, transactionData) => {
  const token = document.cookie.split('token=')[1];
  try {
    const addBalanceResponse = await axios.post('http://localhost:3000/add_balance', {
      headers: {
        Authorization: token,
      },
      balance,
      user_id,
    });

    const transactionResponse = await axios.post('http://localhost:3000/transactions', {
      headers: {
        Authorization: token,
      },
      balance,
      user_id,
      ...transactionData,
    });

    return {
      addBalanceResponse: addBalanceResponse.data,
      transactionResponse: transactionResponse.data,
    };
  } catch (error) {
    return error;
  }
};

export const getTransactions = async (user_id) => {
  try {
    const token = document.cookie.split('token=')[1];
    const response = await axios.get(`http://localhost:3000/transactions?user_id=${user_id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};