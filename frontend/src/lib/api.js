import axios from 'axios';
const token = document.cookie.split('token=')[1]; 
axios.defaults.headers.common['Authorization'] = token;


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

export const loginUser = async (event) => {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const user = {user:{
      email: formData.get('email'),
        password: formData.get('password'),
    }
    }
   
  try {
      const res = await axios.post('http://localhost:3000/login', user)
      console.log(res)
      return res
  } catch (error){
    console.log(error)
      return error;
  }
}


export const logoutUser = async (event) => {
  event.preventDefault()
  
  const formData = new FormData(event.target)
  const user = {user:{
    email: formData.get('email'),
      password: formData.get('password'),
  }
  }
 
try {
    const res = await axios.delete('http://localhost:3000/logout', user)
    console.log(res)
    return res.data
} catch (error){
    return error;
}
}

export const addBalance = async (balance, user_id) => {
  const response = await axios.post('http://localhost:3000/add_balance', {
    balance,
    user_id
  });

  return response.data;
}
