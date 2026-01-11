import { useState } from 'react';

const TimerMini = () => {
   const [time] = useState(60);

   return <span className="timer-mini-custom-width">{time}</span>;
};

export default TimerMini;
