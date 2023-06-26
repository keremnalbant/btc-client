import Countdown from "./Countdown";
import CurrentPlayers from "./CurrentPlayers";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <div className="bg-white py-2 px-4 rounded-xl bg-opacity-30 ">
      <div className="grid grid-cols-3 gap-4">
        <UserInfo />
        <Countdown />
        <CurrentPlayers />
      </div>
    </div>
  );
};

export default Navbar;
