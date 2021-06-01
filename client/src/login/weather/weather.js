export default function Forecast(props) {
    const styleDescription = (description) => {
        let newDescription = "";
        let descriptionArr = description.split(" ");
        let correctedArr = descriptionArr.map((word) => {
            newDescription +=
                word[0].toLocaleUpperCase() + word.substring(1) + " ";
        });

        return newDescription;
    };
    return (
        <div className="bg-white">
            <h2>{props.city}</h2>
            <img
                src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
                alt=""
            />
            <ul>
                <li className="temp">{props.temp}°C</li>
                <li className="temp"> {styleDescription(props.description)}</li>
                <li>Maximum: {props.max}°C</li>
                <li>Minimum: {props.min}°C</li>
                <li>Sensation: {props.feelsLike}°C</li>
                <li>Humidity: {props.humidity}%</li>
            </ul>
        </div>
    );
}
