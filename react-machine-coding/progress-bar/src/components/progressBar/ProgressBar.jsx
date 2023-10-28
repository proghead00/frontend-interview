import { useEffect, useState } from "react";
import "./progressBar.css";

const ProgressBar = ({ value = 0 }) => {
  const [percentage, setPercentage] = useState(
    Math.min(100, Math.max(value, 0)) // validating initial value to be >=0 and <= 100
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage((prevPercentage) => {
        const newPercentage = prevPercentage + 1;

        if (newPercentage >= 0 && newPercentage <= 100) {
          return newPercentage;
        } else if (newPercentage > 100) {
          clearInterval(timer);
          return 100;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 40);

    // clear the timer on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="progress-container">
      <div
        className="progress-fill"
        style={{
          width: `${percentage}%`, // need to change this to transform to optimize
          //   transform: `scaleX(${percentage})`,
          //   left: `-${100 - percentage}%`,
        }}
      />
      <span className="percentage-value">{percentage}</span>
    </div>
  );
};

export default ProgressBar;
