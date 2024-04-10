import React from 'react'

const Timerdisplay = ({getDays, getHours, getMinutes, getSeconds}) => {
  return (
    <div 
       className="timerCards"
      >
        <div
         className="showTime"
         data-aos="flip-up" data-aos-once
        >
          <h1>{getDays}</h1>
          <h2>Days</h2>
        </div>
        <div
          className="showTime"
          data-aos="flip-up" data-aos-once
        >
          <h1>{getHours}</h1>
          <h2>Hours</h2>
        </div>
        <div
          className="showTime"
          data-aos="flip-up" data-aos-once
        >
          <h1>{getMinutes}</h1>
          <h2>Minutes</h2>
        </div>
        <div
          className="showTime"
          data-aos="flip-up" data-aos-once
        >
          <h1>{getSeconds}</h1>
          <h2>Seconds</h2>
        </div>
        
      </div>
  )
}

export default Timerdisplay