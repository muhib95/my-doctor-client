import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

const AddDoctor = () => {
    const navigate=useNavigate();
    const { register, handleSubmit } = useForm();
    const imageHostKey=process.env.REACT_APP_imagebb_key

// console.log(imageHostKey);

const {data:options=[]}=useQuery({
    queryKey:['options'],
    queryFn:async()=>{
        const res=await fetch('http://localhost:5000/apointmnetSpaciality')
        const data=await res.json()
        return data;

    }
})



    const onSubmit=(data)=>{
        const image=data.image[0];
        // console.log(data.image[0]);
        const formData = new FormData();
        formData.append('image', image);
        const url=`https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
  method: 'POST',
  body: formData
})
  .then((response) => response.json())
  .then((result) => {
    if(result.success){
        console.log( result.data.url);
        const doctor={
            email:data.email,
            name:data.name,
            spac:data.op,
            image:result.data.url


        }
        fetch('http://localhost:5000/doctors', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
    authorization:`bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify(doctor),
})
  .then((response) => response.json())
  .then((data) => {
    navigate("/dashboard/managedoctors");
    if(data.acknowledged){
        // Navigate('/dashboard/managedoctors');
        alert('success');

    }
  })
    }
  
  })
      
       }

       
       
    return (
        <div>
            <h1>All doctors</h1>
            <div className=' flex '>
      
       
         <form onSubmit={handleSubmit(onSubmit)}>

<div className="form-control w-full max-w-xs">
<label className="label">
<span className="label-text">Your Email</span>
</label>
<input type="email" className="input input-bordered w-full max-w-xs" {...register("email")} placeholder="Type here"/>


</div>
<div className="form-control w-full max-w-xs">
<label className="label">
<span className="label-text">Your Password</span>
</label>
<input type="name" className="input input-bordered w-full max-w-xs" {...register("name")} placeholder="Type here"/>

</div>
<select typeof='op' {...register("op")} className="select select-bordered w-full max-w-xs">
  <option defaultValue={'chosees'} disabled>Choses one</option>
  {
    options.map(option=><option key={option._id}>{option.name}</option>)
  }
  
</select>
<div className="form-control w-full max-w-xs">
<label className="label">
<span className="label-text">Your photo</span>
</label>
<input type="file" className="input input-bordered w-full max-w-xs" {...register("image")} placeholder="Your photo"/>

</div>
<button className='btn btn-active w-full mt-4'>Add doctor</button>
</form>  
        </div>
        </div>
    );
};

export default AddDoctor;