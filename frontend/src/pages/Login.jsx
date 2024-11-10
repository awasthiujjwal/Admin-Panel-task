import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let nameRef = useRef()
    let passwordRef = useRef()
    let navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        let obj = {
            userName:nameRef.current.value, 
            password:passwordRef.current.value
        }
     try {
        let res = await axios.post('http://localhost:8080/users/login',obj);
        console.log(res)
        if(res.status == 200 || res.status == 201){
            console.log("good")
            navigate('/dashboard')
        }
        else{
            alert('something went wrong')
        }
     } catch (error) {
            alert(error.message)
     }
       
    }
  return (
    <div  className='h-[80vh] flex items-center'>
     

<form className="max-w-sm mx-auto dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-md p-7" >
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
    <input ref={nameRef} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username..." required />
  </div> 
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input ref={passwordRef} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>


    </div>
  )
}

export default Login
