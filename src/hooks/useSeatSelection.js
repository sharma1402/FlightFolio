import { useMemo, useState } from "react";
import { createSeats } from "../data/seatData";

const initialPassengers = [
  { id: 1, name: "Aarav Mehta", type: "Adult", seatId: null, mealId: "none" },
  { id: 2, name: "Ananya Mehta", type: "Adult", seatId: null, mealId: "none" },
];

export function useSeatSelection() {
  const [layout, setLayout] = useState("3-2");
  const [passengers, setPassengers] = useState(initialPassengers);
  const [activePassengerId, setActivePassengerId] = useState(1);
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const seats = useMemo(() => createSeats(layout), [layout]);

  const activePassenger = passengers.find((p) => p.id === activePassengerId);

  const assignedPassengerId = (seatId) =>
    passengers.find((p) => p.seatId === seatId)?.id ?? null;

  const assignSeat = (seatId) => {
    const seat = seats.find((item) => item.id === seatId);
    if (!seat || seat.occupied) return { ok: false, message: "This seat is occupied." };

    const owner = assignedPassengerId(seatId);
    if (owner && owner !== activePassengerId) {
      return { ok: false, message: "This seat is already assigned to another passenger." };
    }

    setPassengers((current) =>
      current.map((passenger) =>
        passenger.id === activePassengerId
          ? { ...passenger, seatId }
          : passenger
      )
    );
    setSelectedSeatId(seatId);
    return { ok: true, message: `${seatId} assigned successfully.` };
  };

  const removeSeat = () => {
    setPassengers((current) =>
      current.map((passenger) =>
        passenger.id === activePassengerId
          ? { ...passenger, seatId: null }
          : passenger
      )
    );
    setSelectedSeatId(null);
  };

  const updatePassengerCount = (count) => {
    setPassengers((current) => {
      const next = [...current];
      if (count < next.length) {
        next.length = count;
      } else {
        for (let i = next.length; i < count; i += 1) {
          next.push({
            id: Math.max(0, ...next.map((p) => p.id)) + 1,
            name: `Passenger ${i + 1}`,
            type: "Adult",
            seatId: null,
            mealId: "none",
          });
        }
      }
      return next;
    });
    setActivePassengerId((current) => Math.min(current, count));
    setSelectedSeatId(null);
  };

  const updatePassengerName = (id, name) => {
    setPassengers((current) =>
      current.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  const updateMeal = (mealId) => {
    setPassengers((current) =>
      current.map((p) =>
        p.id === activePassengerId ? { ...p, mealId } : p
      )
    );
  };

  const seatTotal = useMemo(
    () =>
      passengers.reduce((total, passenger) => {
        const seat = seats.find((item) => item.id === passenger.seatId);
        return total + (seat?.price ?? 0);
      }, 0),
    [passengers, seats]
  );

  return {
    layout, setLayout, passengers, setPassengers, activePassengerId,
    setActivePassengerId, activePassenger, selectedSeatId, setSelectedSeatId,
    seats, assignSeat, removeSeat, assignedPassengerId,
    updatePassengerCount, updatePassengerName, updateMeal, seatTotal,
  };
}
