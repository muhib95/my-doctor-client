import { format } from 'date-fns';
import React, { useContext } from 'react';
import { UserContext } from '../../AuthContext/AuthCOntext';

const BookinModals = ({treatment,selectedDate,setTreatment,refetch}) => {
  const {user}=useContext(UserContext);
    const {name,slots,price}=treatment;
    const date=format(selectedDate,'PP');
    const handleForm=event=>{
      event.preventDefault();
      const da=date;
      const form=event.target;
      const slot=form.slot.value;
      const pName=form.name.value;
      const em=form.email.value;
      const phone=form.phone.value;
      const obj={
        treatmentName:name,
        petchientName:pName,
        day:da,
        slot,
        emailAddress:em,
        mobile:phone,
        price:price
      }
      console.log(obj);
      fetch('http://localhost:5000/bookings', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(obj),
})
  .then((response) => response.json())
  .then((data) => {

    console.log('Success:', data);
    if(data.acknowledged){
      alert('Booking success')
      setTreatment(null);
      refetch();
    }
    else{
      alert(data.message)
    }
    
  })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });
     
    }
    // console.log(user);
    return (
        <>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">{name}</h3>
    <form onSubmit={handleForm}>
    <input type="text" disabled value={date} className="input input-bordered w-full max-w-xs" />
    <select name='slot' className="select select-bordered w-full max-w-xs">
  
  {
    slots &&
    slots.map((slot,index)=><option key={index} value={slot}>{slot}</option>)
  }
</select>
    <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Type name" className="input input-bordered w-full max-w-xs" />
    <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Type email" className="input input-bordered w-full max-w-xs" />
    <input name='phone' type="text" placeholder="Type phone" className="input input-bordered w-full max-w-xs" />
    <button className="btn btn-primary block">Button</button>

    </form>

    
  </div>
</div>
        </>
    );
};

export default BookinModals;