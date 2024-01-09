import { useEffect, useState } from "react"
import { getUsers } from "../lib/adminapi"

 

const AdminDashboardHome = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers()
        setUsers(response)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
   
  }, [])
  console.log("users",users)
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  )
}

export default AdminDashboardHome
