import axios from 'axios';
export const registerUser = async (event) => {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        return {errors:['Passwords do not match']};
    }
    const newUser = {
      first_name: formData.get('firstName'),
      middle_name: formData.get('middleName'),
      last_name: formData.get('lastName'),
        username: formData.get('username'),
        password: formData.get('password'),
        birthday: formData.get('birthday'),
        email: formData.get('email'),
    }
    try {
        const res = await axios.post('http://localhost:3000/api/v1/users', newUser);
        return res
    } catch (error) {
        if (error.response) {
          return error.response.data;
        } else {
          return error;
        }
      }
};

export const loginUser = async (event) => {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const user = {
      email: formData.get('email'),
        password: formData.get('password'),
       
    }
   
  try {
      const res = await axios.post('http://localhost:3000/api/v1/users/sign_in', user)
      console.log("res",res.data)
      return res
  } catch (error) {
    if (error.response) {
      console.log('error', error.response.data)
      return error.response.data;
    } else {
      return error;
    }
  }    
}