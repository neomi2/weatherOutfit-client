// src/pages/Home.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import OneHourTemp from "../components/OneTemp";

export default function HomeWeatherList() {
  const [weatherData, setWeatherData] = useState([]);
  const city = "Bnei Brak,IL";
  const date = new Date().toISOString().slice(0, 10);

        const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchWeather = async () => {
      try {
const res = await axios.get(`${API_URL}/weather`, {
  params: { city, date },
});
        setWeatherData(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchWeather();
  }, []);

  const handleSelectTemp = (temp) => {
    console.log("Selected temperature:", temp);
  };
 
  const getWeatherIcon = (weather, temp) => {
    // const w = weather.toLowerCase();
  
    if (temp <= 14) return "❄️";
    if (temp >= 15 && temp <= 22) return "☁️";
    if (temp >= 23&&temp <= 27) return "🌤️";
    if (temp >= 28&&temp <= 50) return "☀️";
    return "🌤️";
  };

  const getBackgroundColor = (weather, temp) => {
    // const w = weather.toLowerCase();
    if (temp <= 14) return "#60cde5";
    if (temp >= 15 && temp <= 22) return "#34d39c";
    if (temp >= 23&&temp <= 27) return "rgb(135 255 148)";
    if (temp >= 28&&temp <= 50) return "rgb(250 255 135)";
    return "rgb(135 255 148)"; 
  };

  return (
    <div>
      <h2 style={{margin:"100px 0px 20px 500px"}}>Weather for {city}</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", flexDirection:"column"}}>
  {weatherData.map((hour, idx) => (
    <OneHourTemp
      key={idx}
      hour={hour}
      icon={getWeatherIcon(hour.weather, hour.temp)}
      backgroundColor={getBackgroundColor(hour.weather, hour.temp)}
      onClick={handleSelectTemp}
    />
  ))}
</div>

    </div>
  );
}