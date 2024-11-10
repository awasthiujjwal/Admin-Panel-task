import React, { useState } from 'react'
import AdminNav from '../components/AdminNav';
import axios from 'axios';

const Dashboard = () => {
    
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
        let res = await axios.post('http://localhost:8080/employees/create',details)
        console.log(res.data)
        if(res.status == 200 || res.status == 201){
            setdetails({name:'',email:'',mobileno:'',designation:'',gender:'',course:'',image:''})
            alert('created successfully')
        }
      } catch (error) {
        console.log(error)
      }
    }
    //form--->//name,email,mobileno, designation[hr, manager, sales],gender-->radio button,course-->checkbox(mcs,bca bsc),image--accept jpg,png
  return (
    <div>
        <AdminNav/>
        <form action="" className='flex p-4 rounded-md dark:bg-slate-800 flex-col text-white'>
            <label htmlFor="name">Name</label>
            <input onChange={handleInputChanger} value={details.name} className='text-black' type="text" id="name" name="name" placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input onChange={handleInputChanger} value={details.email} className='text-black' type="email" id="email" name="email" placeholder="Enter your email" />
            <label htmlFor="mobileno">Mobile Number</label>
            <input onChange={handleInputChanger} value={details.mobileno} className='text-black' type="number" id="mobileno" name="mobileno" placeholder="Enter your mobile number" />
            <label htmlFor="designation">Designation</label>
            <select onChange={handleInputChanger} value={details.designation} id="designation" name="designation" className='text-black'>
                <option value="">Select your designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
           <div className='gender'>
           <label  htmlFor="gender">Gender :</label>
            <label htmlFor="male">Male</label>
            <input onChange={handleInputChanger} value={'male'} type="radio" id="male" name="gender" className='text-black' />
            <label htmlFor="female">Female</label>
            <input onChange={handleInputChanger} type="radio" id="female" value={'female'} name="gender" className='text-black' />
           </div>
           <div className='courses'>
           <label htmlFor="">Course :</label>
            <input onChange={handleInputChanger} type="checkbox" value={'MCA'} id="mca" name="course" className='text-black' />
            <label htmlFor="mcs">MCS</label>
            <input onChange={handleInputChanger} value={'BCA'} type="checkbox" id="bca" name="course" className='text-black' />
            <label htmlFor="bca">BCA</label>
            <input onChange={handleInputChanger} value={'BSC'} type="checkbox" id="bsc" name="course" className='text-black' />
            <label htmlFor="bsc">BSC</label>
           </div>
            <label htmlFor="image">Image upload</label>
           {details.image && <img src={details.image} alt="image" className="w-20 h-20 " />}
           
            <input onChange={handleFileChanger} type="file" id="image" accept='jpg/png' name="image" placeholder="Enter your image" />

          
           <center> <button className='submit' onClick={handleSubmit} type="submit">Submit</button> </center>
        </form>
    </div>
  )
}

export default Dashboard
