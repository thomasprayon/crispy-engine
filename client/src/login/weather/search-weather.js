import { useState } from "react";

export default function SearchWeather(props) {
    const [userInput, setUserInput] = useState("");

    const handleInput = (e) => {
        console.log("handleInput is working");
        setUserInput(e.target.value);
    };
    const handleSubmit = (e) => {
        console.log("handleSubmit is working");

        if (userInput.trim() !== "") {
            props.findCity(e, userInput);
            setUserInput("");
        }
    };
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type your city"
                        onChange={handleInput}
                        value={userInput}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}
