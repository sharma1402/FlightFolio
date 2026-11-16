import { Armchair, X } from "lucide-react";

export default function SeatDetails({ seat, onRemove }) {
  if (!seat) {
    return (
      <div className="seat-details empty-details">
        <div className="detail-icon"><Armchair size={20} /></div>
        <div><strong>No seat selected yet</strong><p>Choose an available seat from the map.</p></div>
      </div>
    );
  }

  return (
    <div className="seat-details">
      <div className="detail-icon"><Armchair size={20} /></div>
      <div className="detail-copy">
        <strong>Seat {seat.id}</strong>
        <p>{seat.category}</p>
      </div>
      <strong className="detail-price">{seat.price === 0 ? "Free" : `₹${seat.price}`}</strong>
      <button className="icon-button" onClick={onRemove} aria-label="Remove assigned seat" title="Remove seat"><X size={17} /></button>
    </div>
  );
}
