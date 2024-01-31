import { useEffect, useState } from "react";

function Header() {
    const [isFakeDark, setIsFakeDark] = useState(false);

    useEffect(
        function () {
            document.documentElement.classList.toggle("fake-dark-mode");
        },
        [isFakeDark]
    );
    return (
        <div className="navbar">
            <h3 className="active">Home</h3>
            <h3>Home</h3>
            <button
                onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
                className="btn-fake-dark-mode"
            >
                {isFakeDark ? "☀️" : "🌙"}
            </button>
        </div>
    );
}

export default Header;
