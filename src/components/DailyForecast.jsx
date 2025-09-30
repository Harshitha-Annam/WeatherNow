import React from 'react';
// import { useState } from 'react';

const DailyForecast = ({daily}) => {
  // const [days, setDays] = useState(null);
  
  return (
    <section className='my-4 flex flex-row gap-2 flex-wrap'>
     
      {daily.time.map((day, index) => (
        
          <div key={day} className='text-white flex flex-col border-white p-4 bg-[#ffffff2f] rounded-lg justify-around gap-8 grow-1 items-center'>
            {/* {console.log(day)}
            {console.log(daily.temperature_2m_max[index])}
            {console.log(daily.temperature_2m_min[index])} */}
            <h3 className='text-center font-medium'> {new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
            <img src={`./icon${daily.weather_code[index]}.png`} className=' p-0 m-0 w-[50px]'/>
            <div className='flex flex-row justify-between gap-4 font-medium text-sm'>
              <p>{daily.temperature_2m_max[index]} <sup> o</sup></p>
              <p>{daily.temperature_2m_min[index]}<sup> o</sup></p>
            </div>
          </div>
      ))}
    </section>
  )
}

export default DailyForecast;
