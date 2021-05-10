import Registration from "./registration";

export default function Welcome() {
    return (
        <div className="welcome-container">
            <h1>Welcome to ExpChange</h1>
            <h3>Where you can exchange you're knowledge with others</h3>
            <Registration />
        </div>
    );
}
