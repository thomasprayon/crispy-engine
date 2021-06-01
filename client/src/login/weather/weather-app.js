import { useEffect, useState } from "react";
import Forecast from "./weather";
import SearchWeather from "./search-weather";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Weather() {
    const [data, setData] = useState([]);
    const [city, setCity] = useState("Berlin");
    const [loading, setLoading] = useState(false);
    const API_KEY = "425453000720e9957568e133f5bec900";

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    useEffect(() => {
        setLoading(true);

        fetch(weather)
            .then((response) => response.json())
            .then((dataFromServer) => {
                console.log("dataFromServer: ", dataFromServer);
                setData(dataFromServer);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error fetching weather API: ", err);
                setLoading(false);
            });
    }, [city]);

    const findCity = (e, userInput) => {
        e.preventDefault();
        let cityFromUser = "";

        if (userInput.includes(" ")) {
            let words = userInput.split(" ");
            words.map((word) => {
                cityFromUser +=
                    word[0].toLocaleUpperCase() + word.substring(1) + " ";
            });
        } else {
            cityFromUser =
                userInput[0].toLocaleUpperCase() + userInput.substring(1);
        }

        setCity(cityFromUser);
    };

    return (
        <>
            <div className="bg-white">
                {loading ? <h3>Loading...</h3> : null}
                {data.main ? (
                    <Forecast
                        city={city}
                        max={data.main.temp_max}
                        min={data.main.temp_min}
                        temp={data.main.temp}
                        feelsLike={data.main.feels_like}
                        humidity={data.main.humidity}
                        description={data.weather[0].description}
                        icon={data.weather[0].icon}
                    />
                ) : (
                    <h2>{data.message}</h2>
                )}

                <SearchWeather findCity={findCity} />
            </div>
        </>
    );
}
