// import { data } from 'autoprefixer';
import React,{useContext, useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { UserContext } from "../../AuthContext/AuthCOntext";
import UseToken from '../../CustomeHook/UseToken';
const Register = () => {
    let navigate=useNavigate();
    let location=useLocation();
    let from=location.state?.from.pathname || "/";
    const {updateUser,userRegister}=useContext(UserContext);
    const {register, formState: { errors },handleSubmit}=useForm();
  const [getEmail,setEmail]=useState('');
  const [token]=UseToken(getEmail);
  if(token){
    navigate(from, { replace: true });

  }
    const onSubmit = (data) => {
        console.log(data);
        userRegister(data.email,data.password)
        .then((result) => {
            const userInfo={
                displayName:data.name
            }
            updateUser(userInfo)
            .then(() => {
                addUsers(data.name,data.email)
                
            
              }).catch((error) => {
                // An error occurred
                // ...
              });
              
          })
          .catch((error) => {
           console.error(error);
          });
        
    }

    const addUsers=(name,email)=>{
        const user={name,email};
        fetch('http://localhost:5000/users', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
              setEmail(email);
            //   getUserToken(email);
              
            })
            .catch((error) => {
              console.error('Error:', error);
            });
    }
 

    return (
        <div className='h-[800px]  flex justify-center items-center'>
         <div className='w-85'>
         <h2 className='text-3xl'>Register</h2>
         <form onSubmit={handleSubmit(onSubmit)}>

<div className="form-control w-full max-w-xs">
<label className="label">
<span className="label-text">Your Name</span>
</label>
<input type="text" {...register("name",{ required: true })} className="input input-bordered w-full max-w-xs"  placeholder="Type here"/>
{errors.name && <p role="alert">{errors.name?.message}</p>}

</div>
<div className="form-control w-full max-w-xs">
<label className="label">
<span className="label-text">Your Email</span>
</label>
<input type="email" {...register("email",{ required: true })} className="input input-bordered w-full max-w-xs"  placeholder="Type here"/>
{errors.email && <p role="alert">{errors.email?.message}</p>}

</div>
<div className="form-control w-full max-w-xs">
<label className="label">
<span className="label-text">Your Password</span>
</label>
<input type="password" {...register("password",{ required: true })} className="input input-bordered w-full max-w-xs"  placeholder="Type here"/>
{errors.password && <p role="alert">{errors.password?.message}</p>}

</div>

<p >Already have an account <span className="label-text"><Link to='/login'>Login</Link></span></p>


<input className="btn btn-active w-full" type="submit" />
</form>

         </div>
         
       
        </div>
    );
};

export default Register;