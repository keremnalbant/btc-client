import GameData from "../../components/GameData";
import Navbar from "../../components/Navbar";
import { useSocket } from "../../contexts/SocketContext";
import "./index.css";

const Dashboard = () => {
  const { isConnected } = useSocket();
  return (
    <div
      className={`${
        isConnected ? "border-green-400" : "border-red-800"
      } border-opacity-60 border-2 h-3/4 w-3/4 flex flex-col justify-center p-8 bg-white bg-opacity-10 rounded-xl`}
    >
      <div className="h-1/6">
        <Navbar />
      </div>
      <div className="h-5/6 mb-[4%] flex flex-row content-center justify-center items-center">
        <GameData />
      </div>
    </div>
  );
};

export default Dashboard;
