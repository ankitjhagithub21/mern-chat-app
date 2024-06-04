import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"



const Login = () => {
    const initialData = {
        username: "",
        password: "",
    }
    const [user, setUserState] = useState(initialData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserState({
            ...user,
            [name]: value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(user)
            })
            const data = await res.json()
            if (data.success) {
                toast.success(data.message)
                setUserState(initialData)
                navigate("/")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Login error:", error)
            toast.error("An unexpected error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen w-full flex items-center justify-center p-5'>
            <form className='flex flex-col gap-3 justify-center items-center lg:w-1/3 w-full' onSubmit={handleLogin}>
                <h2 className='text-2xl font-semibold'>Login to your account</h2>
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
                <button className='btn btn-success text-white text-lg w-full' type='submit'>
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <p>Don't have an account? <Link className='text-indigo-500 hover:underline' to={"/register"}>Register Here</Link></p>
            </form>
        </div>
    )
}

export default Login
