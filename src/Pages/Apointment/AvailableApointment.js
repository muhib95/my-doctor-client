import React, {  useState } from 'react';
import { format } from 'date-fns';
import ApointmentOptions from './ApointmentOptions';
import BookinModals from '../../components/BookingModals/BookinModals';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading';
// import { async } from '@firebase/util';

const AvailableApointment = ({selectedDate}) => {
    // const [apointmentOptions,setApointmentOptions]=useState([]);
    const [treatment,setTreatment]=useState({});
    const date=format(selectedDate,'PP');
    const {data:apointmentOptions=[],refetch,isLoading}=useQuery({
        queryKey:['apointmentOptions',date],
        queryFn: async ()=>{
            const res=await fetch(`http://localhost:5000/apointmentoption?date=${date}`)
            const data=await res.json()
            return data
        }

    })

// const {data:apointmentOptions=[]}=useQuery({
//     queryKey:['apointmentOptions'],
//     queryFn:()=>fetch('http://localhost:5000/apointmentoption')
//         .then(res=>res.json())
    
// })

    // useEffect(()=>{
    //     fetch('http://localhost:5000/apointmentoption')
    //     .then(res=>res.json())
    //     .then(data=>setApointmentOptions(data))
    // },[])
    // console.log(apointmentOptions);
    if(isLoading){
        return <Loading></Loading>

    }
    return (
        <div>
           <p>You have selected Date: {format(selectedDate,'PP')}</p>
           <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
{
   

   apointmentOptions.map(apOp=><ApointmentOptions key={apOp._id} apOp={apOp} setTreatment={setTreatment}></ApointmentOptions>)
}
           </div>
           
           {
            treatment &&
            <BookinModals treatment={treatment} selectedDate={selectedDate} setTreatment={setTreatment} refetch={refetch}></BookinModals>
           }
        </div>
    );
};

export default AvailableApointment;