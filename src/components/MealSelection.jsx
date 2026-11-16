import { Utensils } from "lucide-react";
import { mealOptions } from "../data/mealOptions";

export default function MealSelection({ passenger, onMealChange }) {
  if (!passenger) return null;
  return (
    <section className="panel meal-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A LITTLE EXTRA</p>
          <h2><Utensils size={19} /> Meal preference</h2>
        </div>
        <span className="optional-tag">Optional</span>
      </div>
      <p className="muted small">Choose a meal for {passenger.name}.</p>
      <div className="meal-options">
        {mealOptions.map((meal) => (
          <label className={`meal-option ${passenger.mealId === meal.id ? "active" : ""}`} key={meal.id}>
            <input
              type="radio"
              name={`meal-${passenger.id}`}
              value={meal.id}
              checked={passenger.mealId === meal.id}
              onChange={() => onMealChange(meal.id)}
            />
            <span className="meal-copy">
              <strong>{meal.name}</strong>
              <small>{meal.description}</small>
            </span>
            <b>{meal.price === 0 ? "Free" : `₹${meal.price}`}</b>
          </label>
        ))}
      </div>
    </section>
  );
}
