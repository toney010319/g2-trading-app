import axios from 'axios';
const token = document.cookie.split('token=')[1]; 
axios.defaults.headers.common['Authorization'] = token;


export const getUsers = async () => {
    try {
        const res = await axios.get('http://localhost:3000/admins')
        return res.data
    } catch (error) {
        return error
        
    }
}

// export const showUser = async (user_id) => {
    
//     try {
      
//         const res = await axios.get(`http://localhost:3000/admins/${user_id}`)
        
//         return res.data
//     } catch (error) {
//         return error
        
//     }
// }

export const deleteUser = async (user_id) => {
    try {
        const res = await axios.delete(`http://localhost:3000/admins/${user_id}`)
        return res.data
    } catch (error) {
        return error
    }
}


export const createUser = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
  
    if (password !== confirmPassword) {
      // return {errors:['Passwords do not match']};
      return {
        response: {
          data: { status: { code: 422, message: "Passwords do not match" } },
        },
      };
    }
  
    const newUser = {
      user: {
        first_name: formData.get("firstName"),
        middle_name: formData.get("middleName"),
        last_name: formData.get("lastName"),
        username: formData.get("username"),
        password: formData.get("password"),
        birthday: formData.get("birthday"),
        email: formData.get("email"),
        role: formData.get("role"),
        status: "active",
        email_confirmed: true,
      },
    };
    try {
      const res = await axios.post("http://localhost:3000/admins", newUser);
      return res;
    } catch (error) {
      if (error.response) {
        return error;
      } else {
        return error;
      }
    }
  };

  export const updateUser = async (event, user_id) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser = {
        user: {
          username: formData.get("username"),
          email: formData.get("email"),
          first_name: formData.get("firstName"),
          middle_name: formData.get("middleName"),
          last_name: formData.get("lastName"),
          birthday: formData.get("birthday"),
          role: formData.get("role"),
          balance_attributes: {
            id: user_id,
            balance: formData.get("balance"),
            crypto: formData.get("crypto"),
            stocks: formData.get("stocks"),
            forex: formData.get("forex"),
          }
        }
      }
      try {
        const res = await axios.patch(`http://localhost:3000/admins/${user_id}`, newUser);
        return res;
      } catch (error) {
        if (error.response) {
          return error;
        } else {
          return error;
        }
      }
    };

 
  export const AdminApproval = async (user_id) => {
    try {
      const res = await axios.post(`http://localhost:3000/user/${user_id}/approve`)
      return res
    } catch (error) {
      return error
    }
  }


  export const AdminDisapproval = async (message,user_id) => {
    try {
      const res = await axios.post(`http://localhost:3000/user/${user_id}/disapprove`,{message})   
      return res
    } catch (error) {
      return error
    }
  }

  export const getTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:3000/all_users_transactions')
      return res.data
    } catch (error) {
      return error
    }
  }

  export const ContactSupport = async (message,subject,user_id,support) => {
    try {
      const res = await axios.post(`http://localhost:3000/user/${user_id}/contact_support`,{message,subject,support})
      return res
    } catch (error) {
      return error
    }
  }