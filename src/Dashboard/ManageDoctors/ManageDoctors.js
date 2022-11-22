import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal';

const ManageDoctors = () => {
    const [deleting,setdeleting]=useState(null);

    const cancleModal=()=>{
        setdeleting(null);
    }

    
    const {data:doctors=[],isLoading,refetch}=useQuery({
        queryKey:['doctors'],
        queryFn:async()=>{
            
            try{
                const res=await fetch('http://localhost:5000/doctors',{
                    headers: {
                        authorization:`bearer ${localStorage.getItem('token')}`,
                      },
                })
                const data=await res.json()
                return data

            }
            catch{

            }
        }

    })
   if(isLoading){
    return <div>Loading...</div>

   }
   const handleDelete=(da)=>{
    console.log(da);
    fetch(`http://localhost:5000/doctors/${da._id}`, {
  method: 'delete', // or 'PUT'
  headers: {
    authorization:`bearer ${localStorage.getItem('token')}`,
  },
 
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    refetch();
    if(data.deletedCount>0){
        alert(`delete ${da.name} `)
       

    }
  })
 

}
    return (
        <div>
            <h2>Manage dr</h2>
            <h3>{doctors.length}</h3>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
 
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th>Spaciality</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            doctors.map(doctor=><tr key={doctor._id} >
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={doctor?.image?doctor.image:'no image'} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{doctor?.name? doctor.name :'no name'}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br/>
                  <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>{doctor?.email?doctor.email:'no email'}</td>
                <td>{doctor?.spac?doctor.spac:'no spa'}</td>
                <td>
                <label onClick={()=>setdeleting(doctor)} htmlFor="confirmation-modal" className="btn btn-ghost btn-xs">Delete</label>
                  
                </td>
              </tr>)
        }
     
   
     
    
     
   
     
    </tbody>
  
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
    
  </table>
</div>
{
    deleting&&
    <ConfirmationModal cancleModal={cancleModal} handleDelete={handleDelete} deleting={deleting}></ConfirmationModal>
}
        </div>
    );
};

export default ManageDoctors;