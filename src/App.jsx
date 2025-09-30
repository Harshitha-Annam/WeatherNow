import { useEffect, useState } from 'react';
import './App.css';
import { BASE_URL, PLACE } from './utils/constants';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';



function App() {

  const [weatherData,setWeatherData] = useState(null);
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState(null);
  const fetchData = async () => {
    if(coordinates){
      const info = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`);
      const json = await info.json();
      setWeatherData(json);
    }
    else{
      let lat;
      let long;
      navigator.geolocation.getCurrentPosition((position) => 
      {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        setCoordinates({latitude:lat, longitude:long});
    })
      // const info = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`);
      // const json = await info.json();
      // setWeatherData(json);
    }
    
    
    // setWeatherData(json);
    // console.log(json);
    
    // console.log(json.current.temperature_2m);
    // console.log(json.daily);
  }
  const fetchCoordinates = async() => {
    const coords = await fetch(PLACE + `${location}&count=1&language=en&format=json`);
    console.log(coords);
    const json = await coords.json();
    setCoordinates(json.results[0]);
    console.log(json.results[0]);
  }

  useEffect(() => {
    fetchData();
  }, [coordinates])

  if(weatherData === null)
  {
    return (
      <h1>Loading...</h1>
    )
  }
  return (
    <>
      <main className='w-full flex flex-col max-w-[1400px] justify-center '>
      <header className='float-left w-full mb-8'>
        <h1 className="text-white font-bold md:text-[1.5rem] text-[1rem] float-left">WeatherNow</h1>
      </header>
      <section className=' flex flex-col gap-6 '>
        <div className='mb-8 mt-4'>
          <h1 className='font-bold md:text-6xl text-2xl text-white'>How's the sky looking today?</h1>
        </div>
        <div className='flex flex-row w-full justify-center gap-4 p-4 mb-4'>
          <input type='text' placeholder='search for a place...' className='p-4 md:w-4/12 w-11/12 text-lg text-center bg-[#ffffff41] bg-opacity-10 rounded-sm text-white' value={location} onChange={(e) => setLocation(e.target.value)}/>
          <button className='md:py-1 md:px-8 px-4 py-0.2 text-md md:text-lg rounded-sm bg-gradient-to-br from-blue-400  to-violet-800 cursor-pointer'  onClick={fetchCoordinates}>Search</button>
        </div>
      </section>
        <section className=' flex flex-row gap-4 p-2 m-2 md:flex-nowrap flex-wrap h-min'>
          <section className='w-9/12  justify-center flex-1'>
          <div className='temp-forecast bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 h-50 rounded-lg flex flex-row justify-between items-center'>
              <div className='pl-4 text-left '>
                <i><h1 className='font-bold md:text-xl '>{coordinates && coordinates.name}<br/> {coordinates && coordinates.country}</h1></i>
              </div>
              <div className='flex md:flex-row flex-col p-4 px-8 md:gap-8 gap-2 items-center'>
                <img src={`./icon${weatherData.current.weather_code}.png`} className='md:w-[100px] w-[50px]'/>
                <div>
                  <h1 className='md:text-8xl text-xl font-extrabold md:font-medium'><i>{weatherData.current.temperature_2m}<sup> o</sup> </i></h1>
                </div>
              </div>
          </div>
          <div className='w-full my-4 flex flex-row grow-1 gap-4 md:flex-nowrap flex-wrap'>
            <div className='flex flex-col p-4  bg-[#ffffff32]  justify-between gap-8 items-start rounded-lg flex-1'><p className='font-medium text-[#ffff] '>Feels like</p><p className='font-medium md:text-4xl'>{weatherData.current.apparent_temperature} <sup> o</sup></p></div>
            <div className='flex flex-col p-4  bg-[#ffffff32]  justify-between gap-8 items-start rounded-lg flex-1'><p className='font-medium text-[#ffff] '>Humidity</p><p className='font-medium md:text-4xl'>{weatherData.current.relative_humidity_2m}  %</p></div>
            <div className='flex flex-col p-4  bg-[#ffffff32]  justify-between gap-8 items-start rounded-lg flex-1'><p className='font-medium text-[#ffff] '>Wind</p><p className='font-medium md:text-4xl'>{weatherData.current.wind_speed_10m}  km/h</p></div>
            <div className='flex flex-col p-4  bg-[#ffffff32]  justify-between gap-8 items-start rounded-lg flex-1'><p className='font-medium text-[#ffff] '>Precipitation</p><p className='font-medium md:text-4xl'>{weatherData.current.precipitation}  mm</p></div>
            
          </div>
          <section className='daily-forecast my-10 px-1'>
            <h1 className='text-white text-lg font-bold text-left mb-4'>Daily forecast</h1>
            <DailyForecast daily = {weatherData.daily}/>
          </section>
          </section>
          <section className='md:w-4/12 bg-[#ffffff2a] rounded-lg w-full  '>
            <HourlyForecast day={weatherData.current.time.split('T')[0]} hourlyData = {weatherData.hourly} />
            {/* {console.log(weatherData.hourly)} */}
          </section>
        </section>

      </main>
      
    </>
  )
}

export default App;
