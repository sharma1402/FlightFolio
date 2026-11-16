import { UserRound, Check, Armchair } from "lucide-react";

export default function PassengerPanel({
  passengers, activePassengerId, onSelect, onCountChange, onNameChange
}) {
  return (
    <section className="panel passenger-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">TRAVELLERS</p>
          <h2>Passengers</h2>
        </div>
        <span className="count-pill">{passengers.length} selected</span>
      </div>

      <label className="field-label" htmlFor="passenger-count">Number of passengers</label>
      <select
        id="passenger-count"
        className="select-control"
        value={passengers.length}
        onChange={(event) => onCountChange(Number(event.target.value))}
      >
        {[1, 2, 3, 4, 5, 6].map((count) => (
          <option key={count} value={count}>{count} {count === 1 ? "passenger" : "passengers"}</option>
        ))}
      </select>

      <div className="passenger-list">
        {passengers.map((passenger, index) => {
          const active = passenger.id === activePassengerId;
          return (
            <button
              type="button"
              key={passenger.id}
              className={`passenger-card ${active ? "active" : ""}`}
              onClick={() => onSelect(passenger.id)}
            >
              <span className="avatar"><UserRound size={18} /></span>
              <span className="passenger-copy">
                <strong>Passenger {index + 1}</strong>
                <span className="passenger-name">{passenger.name}</span>
                <small><Armchair size={12} /> {passenger.seatId || "Seat not selected"}</small>
              </span>
              <span className={`passenger-check ${passenger.seatId ? "done" : ""}`}>
                {passenger.seatId ? <Check size={15} /> : index + 1}
              </span>
            </button>
          );
        })}
      </div>
      <p className="helper-text">Select a passenger before choosing a seat.</p>
    </section>
  );
}
