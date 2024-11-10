import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav';
import { Button, Modal } from 'antd';

const GetEmployees = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }).replace(/ /g, '-'); // Replaces spaces with hyphens
  };
    const [employee, setemployee] = useState([]);
    const fetchEmployees = async() => {
        let res = await fetch('http://localhost:8080/employees/all')
        let data = await res.json()
        console.log(data.employee)
        setemployee(data.employee)
    }
    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleDelete = async(id) => {
      console.log(id)
        let res = await axios.delete(`http://localhost:8080/employees/delete/${id}`)
        let data = res.data
        console.log(data)
        fetchEmployees()
    }

    //modal code starts from here 
    const [isModalOpen, setIsModalOpen] = useState(false);
   
 

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (employee) => {
    console.log(employee)
    setdetails(employee)
    setIsModalOpen(true);
  }

  //update functionality starts here
  const [details, setdetails] = useState({
    name:'',
    email:'',
    mobileno:'',
    designation:'',
    gender:'',
    course:'',
    image:''
});
const handleFileChanger = (e)=>{
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image);
    reader.onloadend = () => {  
        setdetails({...details, image:reader.result})
    }
    reader.onerror = (error) => {
        console.log(error)
    }
    
}

const handleInputChanger = (e)=>{
    console.log(e.target.value)
    setdetails({...details, [e.target.name]:e.target.value})
}

const handleSubmit = async(e) => {
  e.preventDefault()
  console.log(details)
try {
  let res = await axios.put(`http://localhost:8080/employees/update/${details._id}`,details)
  console.log(res.data)
  if(res.status == 200 || res.status == 201){
    fetchEmployees()
      setdetails({name:'',email:'',mobileno:'',designation:'',gender:'',course:'',image:''})
      setIsModalOpen(false);
      alert('updated successfully')

  }
} catch (error) {
  console.log(error)
}
}
  return (
    <div>
       <AdminNav/> 

  <div class="relative overflow-x-auto">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          sno
        </th>
        <th scope="col" className="px-6 py-3">
          image
        </th>
        <th scope="col" className="px-6 py-3">
          name
        </th>
        <th scope="col" className="px-6 py-3">
          email
        </th>
        <th scope="col" className="px-6 py-3">
          mobileno
        </th>
        <th scope="col" className="px-6 py-3">
          designation
        </th>
        <th scope="col" className="px-6 py-3">
          gender
        </th>
        <th scope="col" className="px-6 py-3">
          course
        </th>
        <th scope="col" className="px-6 py-3">
          create date
        </th>
        <th scope="col" className="px-6 py-3">
          action
        </th>
      </tr>
    </thead>
    <tbody>
     {
        employee.map((employee, index)=>{
            return (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {index+1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <img src={employee.image} alt="image" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {employee.mobileno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {employee.designation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {employee.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {employee.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(employee.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className='bg-blue-950 me-4 text-white px-4 py-2 rounded-md hover:bg-blue-800' onClick={()=>handleEdit(employee)}>Edit</button>
                        <button onClick={()=>handleDelete(employee._id)} className='bg-red-950 text-white px-4 py-2 rounded-md hover:bg-red-800'>Delete</button>
                    </td>
                </tr>
            )
        })
     }
    
    </tbody>
  </table>
</div>


      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <form action="" className='flex p-4 rounded-md dark:bg-slate-800 flex-col text-white'>
            <label htmlFor="name">Name</label>
            <input onChange={handleInputChanger} value={details.name} className='text-black' type="text" id="name" required={false} name="name" placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input required={false} onChange={handleInputChanger} value={details.email} className='text-black' type="email" id="email" name="email" placeholder="Enter your email" />
            <label htmlFor="mobileno">Mobile Number</label>
            <input required={false} onChange={handleInputChanger} value={details.mobileno} className='text-black' type="number" id="mobileno" name="mobileno" placeholder="Enter your mobile number" />
            <label htmlFor="designation">Designation</label>
            <select onChange={handleInputChanger} value={details.designation} id="designation" name="designation" className='text-black'>
                <option value="">Select your designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
           <div>
           <label  htmlFor="gender">Gender</label>
            <label htmlFor="male">Male</label>
            <input required={false} onChange={handleInputChanger} value={'male'} type="radio" id="male" name="gender" className='text-black' />
            <label htmlFor="female">Female</label>
            <input required={false} onChange={handleInputChanger} type="radio" id="female" value={'female'} name="gender" className='text-black' />
           </div>
           <div>
           <label htmlFor="">Course</label>
            <input required={false} onChange={handleInputChanger} type="checkbox" value={'MCA'} id="mca" name="course" className='text-black' />
            <label htmlFor="mcs">MCS</label>
            <input onChange={handleInputChanger} value={'BCA'} type="checkbox" id="bca" name="course" className='text-black' />
            <label htmlFor="bca">BCA</label>
            <input onChange={handleInputChanger} value={'BSC'} type="checkbox" id="bsc" name="course" className='text-black' />
            <label htmlFor="bsc">BSC</label>
           </div>
            <label htmlFor="image">Image upload</label>
           {details.image && <img src={details.image} alt="image" className="w-20 h-20 " />}
           
            <input onChange={handleFileChanger} type="file" id="image" accept='jpg/png' name="image" placeholder="Enter your image" />

          
            <button onClick={handleSubmit} type="submit">Submit</button>
        </form>
      </Modal>


    </div>
  )
}

export default GetEmployees
