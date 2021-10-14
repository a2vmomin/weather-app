import React from 'react';

const WeatherCard = (props) => {
  const {
    city,
    countryCode,
    weatherImage,
    weatherMain,
    weatherDesc,
    maxTemp,
    minTemp,
    temp,
  } = props;

  // const [time, setTime] = useState(new Date().toLocaleTimeString());

  // const tick = () => {
  //   setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
  // };
  // tick();
  return (
    <div className="px-8 py-8 mt-8 text-center bg-white shadow-lg rounded-2xl">
      {/* <p>{time}</p> */}
      <h1 className="mb-4 text-3xl font-semibold text-center text-blue-700">
        {`${city}, ${countryCode}`}
      </h1>
      <h5>
        <img
          className="mx-auto"
          src={weatherImage}
          alt={weatherDesc}
          width="100px"
          height="100px"
        />
        {weatherMain}
      </h5>
      <h1 className="text-5xl font-bold">
        {temp}
        &deg;
      </h1>
      <h3 className="text-2xl font-semibold">
        <span className="pr-4">
          {minTemp}
          &deg;
        </span>
        <span className="pl-4">
          {maxTemp}
          &deg;
        </span>
      </h3>
    </div>
  );
};

export default WeatherCard;
