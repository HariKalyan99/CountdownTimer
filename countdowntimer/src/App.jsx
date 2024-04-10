import { useEffect, useRef, useState } from "react";
import "./App.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  const [getDays, setDays] = useState("0");
  const [getHours, setHours] = useState("0");
  const [getMinutes, setMinutes] = useState("0");
  const [getSeconds, setSeconds] = useState("0");
  const [displayExpiry, setDisplayExpiry] = useState(false);
  const [great100, setGreat100] = useState(false);
  const [timer, setTimer] = useState(false);

  const handleCounter = (e) => {
    e.preventDefault();
    setTimer(!timer);
    
  };

  const userDateRef = useRef("");

  useEffect(() => {
    let interval;
    const startTimer = () => {
      interval = setInterval(() => {
        const userDate = new Date(userDateRef.current.value)
        const timeNow = new Date().getTime();
        const timeLeft = userDate - timeNow;
        if(timeLeft > 8.554e+9){
          setGreat100(true);
          setTimer(!timer)
        }else{
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          setGreat100(false)
          if (timeLeft < 0) {
            //stop timer
            setDisplayExpiry(true)
            clearInterval(interval);
            setDays("0");
            setHours("0");
            setMinutes("0");
            setSeconds("0");
            setTimer(!timer)
            userDateRef.current.value = 0;
          } else {
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
            setDisplayExpiry(false)
          }
        }
      }, 1000);
    };

    if (timer) {
      startTimer();
    } else {
      clearInterval(interval);
      setDays("0");
      setHours("0");
      setMinutes("0");
      setSeconds("0");
    }

    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
    
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <div data-aos="fade-in"
      className="main"
    >
      <form onSubmit={(e) => handleCounter(e)} >
        <div
          className="form-container"
        >
          <h1>Countdown Timer</h1>
          <input
            type="datetime-local"
            ref={userDateRef}
            className="form-input"
            required
          />
          <button className="form-btn" type="submit" data-aos="flip-up">{timer ? "Cancel Time" : "Start Timer"} </button>
        </div>
      </form>
      <div 
       className="timerCards"
      >
        <div
         className="showTime"
         data-aos="flip-up"
        >
          <h1>{getDays}</h1>
          <h2>Days</h2>
        </div>
        <div
          className="showTime"
          data-aos="flip-up"
        >
          <h1>{getHours}</h1>
          <h2>Hours</h2>
        </div>
        <div
          className="showTime"
          data-aos="flip-up"
        >
          <h1>{getMinutes}</h1>
          <h2>Minutes</h2>
        </div>
        <div
          className="showTime"
          data-aos="flip-up"
        >
          <h1>{getSeconds}</h1>
          <h2>Seconds</h2>
        </div>
        
      </div>
      <div style={{margin: "20px"}}>
      {displayExpiry ? <h2>The countdown is over! What next on your adventure?</h2> : null}
      {great100 ? <h2>Selected time is more than 100 days</h2> : null}
      </div>
    </div>
  );
}

export default App;
