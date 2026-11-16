# Flight Seat Selection & Passenger Management

A responsive React application for a mock airline seat-selection flow. Built for the Frontend Developer Assessment.

## Features

- Select 1–6 passengers and edit passenger names.
- Switch between 3–2 and 2–3–2 aircraft seating layouts.
- Display row numbers, seat labels, seat categories and prices.
- Distinguish free, paid, occupied, assigned and active passenger seats.
- Assign, change and remove seats for individual passengers.
- Prevent occupied seats and seats assigned to another passenger from being selected.
- Calculate seat charges and optional meal charges automatically.
- Responsive desktop, tablet and mobile layouts.
- Mock flight information; no backend or payment integration.

## Tech stack

- React 18
- Vite
- JavaScript
- CSS
- Lucide React icons

## Run locally

Requirements: Node.js 18 or later and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## State management and assignment logic

The `useSeatSelection` hook owns the application state:

- `passengers`: each passenger has an ID, name, seat ID and meal ID.
- `activePassengerId`: identifies the passenger currently selecting a seat.
- `layout`: controls the aircraft configuration.
- `selectedSeatId`: tracks the currently highlighted seat.
- `seats`: generated mock seat data for the active layout.

Passenger assignments are the single source of truth. A seat is considered assigned when a passenger's `seatId` matches that seat ID. The assignment function rejects seats that do not exist, are occupied in mock data, or belong to another passenger. Updating a passenger's `seatId` automatically releases their previous seat. Removing a seat sets the active passenger's `seatId` to `null`.

Seat totals are derived from passenger assignments and seat prices. Meal totals are derived from each passenger's meal selection. The grand total is the sum of seat and meal charges, so no separate manually maintained total can become out of sync.

## Mock data notes

- Seat prices are illustrative, based on the assessment's sample categories.
- Some seats are marked occupied to demonstrate disabled states.
- Flight details, passenger names and meal options are demo data.
- The Continue button validates that every passenger has a seat, but it does not book a flight or process payment.

## Deployment

### Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.
5. Deploy.

No environment variables are required.
