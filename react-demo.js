// react-demo.js
// Sidiki Camara - Portfolio Assignment
// Simple React JS component demo

const { useState } = React;

function SkillCounter() {
    const [count, setCount] = useState(0);

    return React.createElement(
        "div",
        { className: "react-card" },
        React.createElement("p", null, "This is a simple React component."),
        React.createElement("p", null, `You clicked ${count} times.`),
        React.createElement(
            "button",
            {
                className: "btn-primary",
                onClick: () => setCount(count + 1)
            },
            "Click Me"
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(React.createElement(SkillCounter));