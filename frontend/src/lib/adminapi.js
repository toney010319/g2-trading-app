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

export const showUser = async (user_id) => {
    
    try {
      
        const res = await axios.get(`http://localhost:3000/admins/${user_id}`)
        
        return res.data
    } catch (error) {
        return error
        
    }
}