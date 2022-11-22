import React, { useState } from 'react';
import ApointmentBanner from './ApointmentBanner';
import AvailableApointment from './AvailableApointment';



const Apointment = () => {
    const [selectedDate,setSelectedDate]=useState(new Date())
    return (
        <div>
            <ApointmentBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate}></ApointmentBanner>
            <AvailableApointment selectedDate={selectedDate}></AvailableApointment>
        </div>
    );
};

export default Apointment;