import { useSubscriber } from "../../hooks/useSubscriber";
import { EventName } from "../../models";
import Loader from "../Loader";

const Countdown = () => {
  const [remainingTime] = useSubscriber<number>(
    EventName.Time,
    0,
    (e: any, param: any) => {
      return parseInt(e[0]);
    },
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex justify-center">
      {remainingTime <= 2 ? (
        <Loader />
      ) : (
        <span className="flex items-center text-3xl font-bold">
          {formatTime(remainingTime)}
        </span>
      )}
    </div>
  );
};

export default Countdown;
