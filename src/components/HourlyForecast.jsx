import React from 'react'
import { useState } from 'react';

const HourlyForecast = ({day, hourlyData}) => {
  const [selectedDay, setSelectedDay] = useState(day);
  // console.log(day);
  const groupDataByDay = () => {
    const groupedDayData = {};
    hourlyData.time.forEach((timeStr, index) => {
      const date = timeStr.split('T')[0];
      if(!groupedDayData[date])
      {
        groupedDayData[date] = {
          time : [],
          temperature_2m : [],
          weather_code: [],
        }
      }
      groupedDayData[date].time.push(timeStr);
      groupedDayData[date].temperature_2m.push(hourlyData.temperature_2m[index]);
      groupedDayData[date].weather_code.push(hourlyData.weather_code[index]);
      // console.log(date);
      // console.log( groupedDayData[date]);
    });
    
    return groupedDayData;
  }

  
  const groupedData = groupDataByDay(hourlyData);
  // console.log(groupedData);
  const dates = Object.keys(groupedData);
  // console.log(dates);
  const dayNames = dates.map((date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long' }))
  // console.log(dayNames);
  const handleSelectedChange = (value) => {
    // hanndle change on selected option
    setSelectedDay(value);
  }
  return (
    <section className='overflow-y-scroll h-[700px] overflow-x-hidden rounded-sm'>
      <div className='flex flex-row justify-between items-center sticky top-0 backdrop-blur-3xl z-10 px-2 bg-[#06092e] border-1 border-gray-500 rounded-lg'>
        <h1 className='font-bold text-lg m-4'>Hourly Forecast</h1>
        <legend>
          <label>
              <select className='bg-[#f8f8fb19] text-white px-4 py-2 rounded-sm' value={selectedDay} onChange={(e) => handleSelectedChange(e.target.value)}>
                  {dayNames.map((day, index) => <option value={dates[index]} key={day} className='bg-[#06092e] rounded-sm'>{day}</option>)}
              </select>
          </label>
        </legend>
      </div>
      <div >
        {groupedData[selectedDay].time.map((timeStr, index) => 
              <div key={timeStr} className='flex flex-row justify-between p-4 m-2 items-center font-bold text-lg bg-[#ffffff14] rounded-md'>
                {/* {console.log(timeStr.slice('T')[0])} */}
                {/* {console.log(timeStr)} */}
                <div className='flex flex-row gap-4 items-center'>
                  <img src={`./icon${groupedData[selectedDay].weather_code[index]}.png`} className='w-[50px]'/>
                  <p>{Number(timeStr.split('T')[1].split(':')[0]) % 12 == 0 ? '12' : Number(timeStr.split('T')[1].split(':')[0]) % 12}{Number(timeStr.split('T')[1].split(':')[0]) >= 12 ?' PM' : ' AM'}</p>
                </div>
                <p>{groupedData[selectedDay].temperature_2m[index]}<sup className='z-0'>o</sup></p>
              </div>)}
      </div>
    </section>
  )
}

export default HourlyForecast;
