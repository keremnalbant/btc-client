import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useSubscriber } from "../../hooks/useSubscriber";
import { EventName } from "../../models";

const UserInfo = () => {
  const { userData, handleSetUserData } = useAuth();
  useSubscriber(
    EventName.Score,
    userData?.score,
    (e: any, prev: any) => {
      if (userData) {
        const currentScore = userData.score;
        if (currentScore < e[0]) {
          toast.success(`Congratulations! You've made a successful guess!`);
        } else {
          toast.error(`Sorry! You've made a wrong guess!`);
        }
        handleSetUserData({ ...userData, score: e[0] });
      }
    },
    [userData],
  );

  return (
    <div className="flex">
      <img
        src={`https://api.multiavatar.com/${userData?.id}.png`}
        className="w-10 h-10"
      />
      <div className="flex flex-col justify-center ml-2">
        <span className="text-white text-opacity-80 text-sm">
          {userData?.id}
        </span>
        <span className="text-white text-opacity-80 font-semibold">
          Score: {userData ? userData.score : 0}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
