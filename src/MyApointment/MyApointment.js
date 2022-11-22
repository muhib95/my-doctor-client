import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../AuthContext/AuthCOntext';

const MyApointment = () => {
    const {user}=useContext(UserContext);
    // const url=`http://localhost:5000/bookings?email=${user?.email}`;
    console.log(user.email);
    const {data:bookings=[]}=useQuery({
        queryKey:['bookings',user?.email],
        queryFn:async()=>{
            const res=await fetch(`http://localhost:5000/bookings?email=${user?.email}`,{
                headers:{
                    authorization:`bearer ${localStorage.getItem('token')}`
                    
                }
            })
            const data=res.json()
            return data;
        }
    })
    console.log(bookings);
    return (
        <div>
            <h1>My Apointment</h1>
          <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
   
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th>Favorite Color</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
        {
            bookings.length>0 &&
            bookings.map((booking,index)=><tr key={index}>
            <th>{index+1}</th>
            <td>{booking.petchientName}</td>
            <td>{booking.treatmentName}</td>
            <td>{booking.day}</td>
            <td>{booking.slot}</td>
            <td>{
              
              booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-primary'>pay</button></Link>
              
              }
            </td>
            <td>{
              
              booking.price && booking.paid &&<span className='text-primary'>paid</span>
              
              }
            </td>
          </tr>
          
          )
        }
     
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyApointment;