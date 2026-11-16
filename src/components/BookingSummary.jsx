import { ReceiptText, ShieldCheck } from "lucide-react";
import { mealOptions } from "../data/mealOptions";

export default function BookingSummary({ passengers, seats, seatTotal, onContinue }) {
  const mealTotal = passengers.reduce((sum, passenger) => {
    const meal = mealOptions.find((item) => item.id === passenger.mealId);
    return sum + (meal?.price ?? 0);
  }, 0);
  const assignedCount = passengers.filter((p) => p.seatId).length;
  const grandTotal = seatTotal + mealTotal;

  return (
    <aside className="panel summary-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR ORDER</p>
          <h2><ReceiptText size={19} /> Booking summary</h2>
        </div>
      </div>
      <div className="summary-progress">
        <div className="progress-copy"><span>Seats selected</span><strong>{assignedCount}/{passengers.length}</strong></div>
        <div className="progress-track"><div style={{ width: `${passengers.length ? assignedCount / passengers.length * 100 : 0}%` }} /></div>
      </div>

      <div className="summary-lines">
        {passengers.map((passenger, index) => {
          const seat = seats.find((item) => item.id === passenger.seatId);
          const meal = mealOptions.find((item) => item.id === passenger.mealId);
          return (
            <div className="summary-passenger" key={passenger.id}>
              <div className="summary-person">
                <strong>Passenger {index + 1}</strong>
                <small>{passenger.name}</small>
                <small>{seat ? `Seat ${seat.id} · ${seat.category}` : "No seat selected"}</small>
                {meal && meal.id !== "none" && <small>{meal.name} meal</small>}
              </div>
              <strong>{seat ? (seat.price === 0 ? "Free" : `₹${seat.price}`) : "—"}</strong>
            </div>
          );
        })}
      </div>

      <div className="price-breakdown">
        <div><span>Seat selection</span><strong>₹{seatTotal.toLocaleString("en-IN")}</strong></div>
        <div><span>Meal charges</span><strong>₹{mealTotal.toLocaleString("en-IN")}</strong></div>
      </div>
      <div className="grand-total">
        <span>Total amount</span>
        <strong>₹{grandTotal.toLocaleString("en-IN")}</strong>
      </div>
      <button className="primary-button continue-button" onClick={onContinue}>
        Continue <span>→</span>
      </button>
      <p className="secure-note"><ShieldCheck size={14} /> Demo only · No payment will be taken</p>
    </aside>
  );
}
