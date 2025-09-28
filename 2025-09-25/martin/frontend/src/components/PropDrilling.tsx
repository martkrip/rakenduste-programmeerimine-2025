import { useState } from "react";

type WeatherProps = {
  weather: string
};

const PropDrilling = () => {
  const [weather] = useState("🌞");

  return <Europe weather={weather} />;
};

const Europe = ({ weather }: WeatherProps) => {
  return <Estonia weather={weather} />;
};

const Estonia = ({ weather }: WeatherProps) => {
  return <Tallinn weather={weather} />;
};

const Tallinn = ({ weather }: WeatherProps) => {
  return <div>{weather}</div>;
};

export default PropDrilling;