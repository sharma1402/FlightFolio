const rows = 12;
const priceBySeat = {
  A: { category: "Standard", price: 0 },
  B: { category: "Standard", price: 0 },
  C: { category: "Extra legroom", price: 350 },
  D: { category: "Standard", price: 0 },
  E: { category: "Premium", price: 250 },
  F: { category: "Standard", price: 0 },
  G: { category: "Extra legroom", price: 350 },
};

const occupiedSeats = new Set(["1E", "2B", "3D", "4A", "5F", "7C", "8G", "10A"]);

export function createSeats(layout) {
  const columns = layout === "3-2"
    ? ["A", "B", "C", "D", "E"]
    : ["A", "B", "C", "D", "E", "F", "G"];

  return Array.from({ length: rows }, (_, rowIndex) =>
    columns.map((letter) => {
      const id = `${rowIndex + 1}${letter}`;
      const pricing = priceBySeat[letter] ?? { category: "Standard", price: 0 };
      return {
        id,
        row: rowIndex + 1,
        letter,
        category: pricing.category,
        price: pricing.price,
        occupied: occupiedSeats.has(id),
      };
    })
  ).flat();
}
