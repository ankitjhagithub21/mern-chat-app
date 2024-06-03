const handleLogout = async() =>{

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/logout`)
      const data = await res.json()
      return data
  }

  export default handleLogout