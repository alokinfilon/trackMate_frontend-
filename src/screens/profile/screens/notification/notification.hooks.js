import { useState } from 'react';

export const useNotification = () => {
  const [trips, setTrips] = useState(true);
  const [promos, setPromos] = useState(false);
  const [reminders, setReminders] = useState(true);

  return {
    trips,
    setTrips,
    promos,
    setPromos,
    reminders,
    setReminders,
  };
};
