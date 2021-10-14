import React, { useState, useEffect } from 'react';

import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';

const API_KEY = 'ac02dbe7b3b2846c3d10c89c41da53dd';
const API_URL = `http://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}`;

function App() {
  const [cod, setCod] = useState();
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [temp, setTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [weatherImage, setWeatherImage] = useState('');
  const [weatherDesc, setWeatherDesc] = useState('');
  const [weatherMain, setWeatherMain] = useState('');
  const [unit, setUnit] = useState('metric');
  const [loading, setLoading] = useState(false);

  const getWeather = async (cityParam) => {
    setLoading(true);
    if (cityParam) {
      const response = await fetch(`${API_URL}&q=${cityParam}&units=${unit}`);
      const data = await response.json();
      const status = parseInt(data.cod, 10);
      if (status === 200) {
        setCod(status);
        setCity(data.name);
        setCountryCode(data.sys.country);
        setTemp(data.main.temp);
        setMinTemp(data.main.temp_min);
        setMaxTemp(data.main.temp_max);
        setWeatherImage(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        setWeatherDesc(data.weather[0].description);
        setWeatherMain(data.weather[0].main);
      } else if (status === 400) {
        setCod(status);
      } else if (status === 404) {
        setCod(status);
      } else {
        setCod(status);
      }
      setLoading(false);
    } else {
      setLoading(false);
      setCod(400);
    }
  };

  const changeUnit = async () => {
    setUnit((prevValue) => {
      let newValue;
      if (prevValue === 'metric') {
        newValue = 'imperial';
      } else {
        newValue = 'metric';
      }
      return newValue;
    });
  };

  useEffect(async () => {
    if (city) {
      await getWeather(city);
    }
  }, [unit]);

  return (
    <div>
      <div className="container max-w-screen-sm px-4 mx-auto">
        <button
          type="button"
          className="text-white"
          value={unit}
          onClick={() => {
            changeUnit();
          }}
        >
          Show whether in {unit && unit === 'metric' ? 'imperial' : 'metric'} unit
        </button>
      </div>
      <div className="container max-w-screen-sm px-4 mx-auto my-16 text-gray-800 App md:my-32">
        <WeatherForm weather={getWeather} />
        {cod === 200 && !loading && (
          <WeatherCard
            city={city}
            countryCode={countryCode}
            minTemp={minTemp}
            maxTemp={maxTemp}
            temp={temp}
            weatherImage={weatherImage}
            weatherMain={weatherMain}
            weatherDesc={weatherDesc}
          />
        )}
        {loading && (
          <div className="py-8 mt-8 text-center bg-white shadow-lg rounded-2xl">
            <h1 className="text-3xl font-semibold text-center text-blue-700">Loading...</h1>
          </div>
        )}
        {cod === 400 && (
          <div className="py-8 mt-8 text-center bg-white shadow-lg rounded-2xl">
            <h1 className="text-3xl font-semibold text-center text-blue-700">
              Please enter a city
            </h1>
          </div>
        )}
        {cod === 404 && (
          <div className="py-8 mt-8 text-center bg-white shadow-lg rounded-2xl">
            <h1 className="text-3xl font-semibold text-center text-blue-700">City not found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
