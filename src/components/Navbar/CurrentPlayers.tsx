import { useCallback, useEffect } from 'react';
import { useSubscriber } from '../../hooks/useSubscriber';
import { EventName } from '../../models';
import { getActiveUsers } from '../../services/userService';

const CurrentPlayers = () => {
  const [count, setCount] = useSubscriber(
    EventName.ActivePlayers,
    0,
    (e: any, data: any) => {
      return e[0];
    },
  );

  const fetchActivePlayers = useCallback(async () => {
    const data = await getActiveUsers();
    setCount(data);
  }, [setCount]);

  useEffect(() => {
    fetchActivePlayers();
  }, [fetchActivePlayers]);

  return (
    <div className="flex justify-center">
      <span className="flex items-center text-xl font-semibold">
        Current Players: {count}
      </span>
    </div>
  );
};

export default CurrentPlayers;
