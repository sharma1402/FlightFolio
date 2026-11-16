import { useMemo, useState } from "react";
import { Plane, ArrowRight, Clock3, MapPin, Sparkles } from "lucide-react";
import PassengerPanel from "./components/PassengerPanel";
import SeatMap from "./components/SeatMap";
import SeatDetails from "./components/SeatDetails";
import MealSelection from "./components/MealSelection";
import BookingSummary from "./components/BookingSummary";
import { useSeatSelection } from "./hooks/useSeatSelection";

export default function App() {
  const {
    layout, setLayout, passengers, activePassengerId, setActivePassengerId,
    activePassenger, selectedSeatId, setSelectedSeatId, seats, assignSeat,
    removeSeat, assignedPassengerId, updatePassengerCount, updatePassengerName,
    updateMeal, seatTotal
  } = useSeatSelection();

  const [notice, setNotice] = useState("");
  const selectedSeat = useMemo(
    () => seats.find((seat) => seat.id === (activePassenger?.seatId || selectedSeatId)) ?? null,
    [seats, activePassenger, selectedSeatId]
  );

  const handleSeatClick = (seat) => {
    const result = assignSeat(seat.id);
    setNotice(result.message);
    window.clearTimeout(window.__noticeTimer);
    window.__noticeTimer = window.setTimeout(() => setNotice(""), 2600);
  };

  const handleContinue = () => {
    const missing = passengers.filter((passenger) => !passenger.seatId);
    setNotice(
      missing.length
        ? `Please select seats for ${missing.length} passenger${missing.length > 1 ? "s" : ""} before continuing.`
        : "All passengers have seats assigned. This is a demo; booking is not connected to a payment system."
    );
    window.clearTimeout(window.__noticeTimer);
    window.__noticeTimer = window.setTimeout(() => setNotice(""), 4200);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="FlightFolio home">
          <span className="brand-mark"><Plane size={20} /></span>
          <span>FlightFolio<span className="brand-dot">.</span></span>
        </a>
        <div className="topbar-right">
          <span className="booking-ref">BOOKING REF <strong>SW-28491</strong></span>
          <span className="help-link">Need help?</span>
          <div className="profile-avatar">AM</div>
        </div>
      </header>

      <section className="page-intro">
        <div className="breadcrumbs"><span>Flight search</span><ArrowRight size={13} /><span>Passenger details</span><ArrowRight size={13} /><strong>Seat selection</strong></div>
        <div className="intro-row">
          <div>
            <p className="eyebrow">YOUR JOURNEY, YOUR WAY</p>
            <h1>Choose your seats</h1>
            <p className="intro-copy">Make yourself comfortable. Pick the perfect spot for everyone travelling.</p>
          </div>
          <div className="step-indicator"><span className="step-done">✓</span><span className="step-line" /><span className="step-current">2</span><span>Seat selection</span><small>Step 2 of 3</small></div>
        </div>
      </section>

      <section className="flight-card">
        <div className="airline-info"><div className="airline-logo">SW</div><div><strong>FlightFolio Airlines</strong><small>SW 204 · Economy</small></div></div>
        <div className="route-info">
          <div><strong>BOM</strong><small>Mumbai</small></div>
          <div className="route-middle"><span><Clock3 size={13} /> 2h 15m</span><div className="route-line"><i /><Plane size={16} /><i /></div><small>Non-stop</small></div>
          <div><strong>DEL</strong><small>New Delhi</small></div>
        </div>
        <div className="flight-date"><strong>Fri, 28 Nov 2026</strong><small><MapPin size={12} /> Terminal 2 → Terminal 3</small></div>
      </section>

      <div className="content-grid">
        <div className="main-column">
          <PassengerPanel
            passengers={passengers}
            activePassengerId={activePassengerId}
            onSelect={(id) => { setActivePassengerId(id); setSelectedSeatId(null); }}
            onCountChange={updatePassengerCount}
            onNameChange={updatePassengerName}
          />
          <SeatMap
            layout={layout}
            onLayoutChange={(nextLayout) => { setLayout(nextLayout); setSelectedSeatId(null); }}
            seats={seats}
            activePassenger={activePassenger}
            assignedPassengerId={assignedPassengerId}
            onSeatClick={handleSeatClick}
          />
          <SeatDetails seat={selectedSeat} onRemove={removeSeat} />
          <MealSelection passenger={activePassenger} onMealChange={updateMeal} />
        </div>
        <div className="sidebar-column">
          <BookingSummary passengers={passengers} seats={seats} seatTotal={seatTotal} onContinue={handleContinue} />
          <div className="assistance-card">
            <div className="assistance-icon"><Sparkles size={17} /></div>
            <div><strong>A little more legroom?</strong><p>Extra legroom seats give you more space to stretch and relax.</p></div>
          </div>
        </div>
      </div>

      {notice && <div className="toast" role="status">{notice}</div>}
      <footer className="footer"><span>© 2026 FlightFolio · Demo booking experience</span><span>Seat prices are illustrative and use mock data.</span></footer>
    </main>
  );
}
