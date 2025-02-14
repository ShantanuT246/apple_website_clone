const { useState, useEffect } = React;
const { motion } = framerMotion;

function DecryptedText({ text, speed = 50 }) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    
    useEffect(() => {
        let interval;
        if (isHovering) {
            interval = setInterval(() => {
                setDisplayText(prev => {
                    return prev.split('').map(char =>
                        Math.random() > 0.5 ? '*' : char
                    ).join('');
                });
            }, speed);
        } else {
            setDisplayText(text);
        }
        return () => clearInterval(interval);
    }, [isHovering, text, speed]);

    return (
        <motion.div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ 
                fontSize: "24px", 
                color: "white", 
                cursor: "pointer",
                display: "inline-block"  // Added to ensure proper hover behavior
            }}
            whileHover={{ scale: 1.1 }}  // Added animation effect
            transition={{ type: "spring", stiffness: 300 }}
        >
            {displayText}
        </motion.div>
    );
}

// Wrap the app in a try-catch to help debug any remaining issues
try {
    function App() {
        return (
            <div style={{ padding: "20px" }}>
                <DecryptedText text="iPhone 16 Pro" />
            </div>
        );
    }

    const rootElement = document.getElementById('react-root');
    if (rootElement) {
        ReactDOM.render(<App />, rootElement);
    } else {
        console.error('Could not find root element');
    }
} catch (error) {
    console.error('Error rendering app:', error);
}