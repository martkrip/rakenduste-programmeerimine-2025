import { createContext } from "react";

export const WeatherContext = createContext<{
  weather: string;
  changeWeather: () => void;
} | null>(null);
