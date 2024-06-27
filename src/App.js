import './App.css';
import Weather from './Components/WeatherCard';
import React, { useEffect, useState } from "react";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          if(result.cod===200){
            setData(result);
            setWeatherData(result);
          }
          else setData([]);
        });
    }
    getData();
  }, [lat, long])

  const handleSearchOnSubmit = (event)=>{
    setCity(event.target.value);
    console.log(`event: ${event.target.value}`)
    const getData = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          if(result!=null && result.cod===200)
            setWeatherData(result)
          else 
            setWeatherData(data);
        });
    }
    getData();
  }
  return (
    <div className='container d-flex flex-column'>
      <nav className="navbar navbar-light bg-light justify-content-between mb-5">
        <a className="navbar-brand" href='/'>Home</a>
        <form className="form-inline d-flex">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={handleSearchOnSubmit}/>
        </form>
      </nav>
      <Weather weatherData={weatherData} />
    {/* yo its yoboy */}
    </div>
  );

}

export default App;
