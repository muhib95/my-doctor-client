import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUsers = () => {
    const {data:users=[],refetch}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res=await fetch('http://localhost:5000/users')
            const data=await res.json()
            return data
        }
    })
    console.log(users);
   const handleMakeAdmin=(id)=>{
    fetch(`http://localhost:5000/users/admin/${id}`, {
  method: 'PUT', // or 'PUT'
  headers: {
    authorization:`bearer ${localStorage.getItem('token')}`
  },
 
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    if(data.acknowledged){
refetch();
    }
  })


   }
    return (
        <div>
            {
                   <div className="overflow-x-auto">
                   <table className="table table-zebra w-full">
                    
                     <thead>
                       <tr>
                         <th></th>
                         <th>Name</th>
                         <th>Email</th>
                         <th>Admin</th>
                         <th>Delete</th>
                       </tr>
                     </thead>
                     <tbody>
                         {
                             users.length>0 &&
                             users.map((booking,index)=><tr key={booking._id}>
                             <th>{index+1}</th>
                             <td>{booking.name}</td>
                             <td>{booking.email}</td>
                            
                             <td> {booking.role!=='admin' && <button onClick={()=>handleMakeAdmin(booking._id)}>Make admin</button>}</td>
                             <td><button>Delete</button></td>
                           </tr>
                           
                           )
                         }
                      
                       
                     </tbody>
                   </table>
                 </div>
            }
        </div>
    );
};

export default AllUsers;