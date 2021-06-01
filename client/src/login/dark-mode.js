import { useState } from "react";

export default function DarkMode() {
    const [darkTheme, setDarkTheme] = useState(false);
    return (
        <>
            <div className="light-theme">
                <nav>Toggle button will go here</nav>
                <div className="content">
                    <h1>Light Mode</h1>
                </div>
            </div>
        </>
    );
}
