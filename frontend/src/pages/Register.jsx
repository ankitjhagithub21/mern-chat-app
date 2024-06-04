import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { passwordValidator } from '../helpers/passwordValidator'


const Register = () => {
    const initialData = {
        fullName: "",
        username: "",
        password: "",

    }
    const [user, setUser] = useState(initialData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
      
        if (user.fullName.length < 3 || user.fullName.length > 20) {
            return toast.error("Name should be min 3 char long and max 20 char long.")
        }

        if (user.username.length < 5 || user.username.length > 20) {
            return toast.error("Username should be min 5 char long and max 20 char long.")
        }
        
        let result = passwordValidator(user.password)
        if (result.success) {

            try {
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                const data = await res.json()
                if (data.success) {
                    toast.success(data.message)
                    setUser(initialData)
                    navigate("/login")

                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        } else {
            toast.error(result.msg)
        }






    }

    return (
        <div className='h-screen w-full flex items-center justify-center p-5'>
            <form className='flex flex-col gap-3 justify-center items-center lg:w-1/3 w-full' onSubmit={handleRegister}>
                <h2 className='text-2xl font-semibold'>Create an account</h2>
                <input
                    type="text"
                    name='fullName'
                    value={user.fullName}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="text"
                    value={user.username}
                    name='username'
                    onChange={handleChange}
                    placeholder="Enter Your Username"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="password"
                    name='password'
                    placeholder="Enter Your Password"
                    value={user.password}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <button className='btn btn-success text-white text-lg w-full' type='submit'>{loading ? 'Loading...' : 'Register'}</button>
                <p>Already have an account ? <Link className='text-indigo-500 hover:underline' to={"/login"}>Login Here</Link></p>
            </form>

        </div>
    )
}

export default Register
