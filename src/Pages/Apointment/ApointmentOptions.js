import React from 'react';

const ApointmentOptions = ({apOp,setTreatment}) => {
    const {name,slots,price}=apOp;
    // console.log(apOp);
    return (
        <div className="card w-96 bg-primary text-primary-content">
  <div className="card-body">
    <h2 className="card-title">{name?name:'no name'}</h2>
    <p>{slots.length>0?slots[0]:'Try another Day'}</p>
    <p>{slots.length} {slots.length>1?'spaces':'space'} available</p>
    <p>${price}</p>
    <div className="card-actions justify-end">
 
    </div>
  </div>
  <label onClick={()=>setTreatment(apOp)} htmlFor="my-modal-3" className="btn">open modal</label>
</div>
    );
};

export default ApointmentOptions;