import { Plane, Info } from "lucide-react";

function Seat({ seat, active, assignedTo, onClick }) {
  const occupied = seat.occupied;
  const assignedToOther = assignedTo && assignedTo !== active.id;
  const selectedByActive = seat.id === active.seatId;
  const disabled = occupied || assignedToOther;

  let stateClass = "available";
  if (occupied) stateClass = "occupied";
  else if (selectedByActive) stateClass = "selected";
  else if (assignedToOther) stateClass = "assigned";

  return (
    <button
      type="button"
      className={`seat ${stateClass} ${seat.price === 0 && !occupied && !selectedByActive && !assignedToOther ? "free" : ""}`}
      disabled={disabled}
      onClick={() => onClick(seat)}
      title={`${seat.id} · ${seat.category} · ${seat.price === 0 ? "Free" : `₹${seat.price}`}`}
      aria-label={`Seat ${seat.id}, ${seat.category}, ${seat.price === 0 ? "free" : `₹${seat.price}`}${occupied ? ", occupied" : ""}`}
    >
      <span>{seat.letter}</span>
    </button>
  );
}

export default function SeatMap({
  layout, onLayoutChange, seats, activePassenger, assignedPassengerId, onSeatClick
}) {
  const columns = layout === "3-2" ? ["A", "B", "C", "D", "E"] : ["A", "B", "C", "D", "E", "F", "G"];
  const rows = Array.from({ length: 12 }, (_, index) => index + 1);
  const seatById = Object.fromEntries(seats.map((seat) => [seat.id, seat]));

  return (
    <section className="panel seat-panel">
      <div className="section-heading seat-heading">
        <div>
          <p className="eyebrow">CHOOSE YOUR COMFORT</p>
          <h2>Select your seat</h2>
          <p className="muted">Selecting for <strong>{activePassenger?.name}</strong></p>
        </div>
        <div className="layout-switch" role="group" aria-label="Aircraft layout">
          <button className={layout === "3-2" ? "chosen" : ""} onClick={() => onLayoutChange("3-2")}>3–2</button>
          <button className={layout === "2-3-2" ? "chosen" : ""} onClick={() => onLayoutChange("2-3-2")}>2–3–2</button>
        </div>
      </div>

      <div className="seat-legend">
        <span><i className="legend-dot free-dot" /> Free</span>
        <span><i className="legend-dot paid-dot" /> Paid</span>
        <span><i className="legend-dot occupied-dot" /> Occupied</span>
        <span><i className="legend-dot selected-dot" /> Your selection</span>
      </div>

      <div className="aircraft">
        <div className="aircraft-front">
          <Plane size={24} />
          <span>FRONT OF AIRCRAFT</span>
        </div>
        <div className={`seat-grid layout-${layout.replaceAll("-", "")}`}>
          <div className="column-labels">
            <span className="row-label-space" />
            {columns.map((column, index) => (
              <span key={column} className={`column-label col-${index}`}>{column}</span>
            ))}
          </div>
          {rows.map((row) => (
            <div className="seat-row" key={row}>
              <span className="row-number">{row}</span>
              {columns.map((column, index) => {
                const seat = seatById[`${row}${column}`];
                const gapAfter = layout === "3-2" ? index === 2 : index === 1 || index === 4;
                return (
                  <div key={column} className={`seat-cell ${gapAfter ? "aisle-after" : ""}`}>
                    <Seat
                      seat={seat}
                      active={activePassenger}
                      assignedTo={assignedPassengerId(seat.id)}
                      onClick={onSeatClick}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="aircraft-rear">REAR OF AIRCRAFT</div>
      </div>
      <div className="seat-note"><Info size={15} /> Prices are shown when you select a seat. Grey seats are unavailable.</div>
    </section>
  );
}
