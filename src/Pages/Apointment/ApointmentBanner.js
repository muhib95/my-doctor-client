import React from 'react';

import { DayPicker } from 'react-day-picker';

const ApointmentBanner = ({selectedDate,setSelectedDate}) => {
    // const [selectedDate,setSelectedDate]=useState(new Date())
    return (
        <div>
            <DayPicker
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            ></DayPicker>
            {/* <p>You have selected Date: {format(selectedDate,'PP')}</p> */}
        </div>
    );
};

export default ApointmentBanner;