// Simulated data storage for dishes
export const items = [
  { id: crypto.randomUUID(), titre: 'Dish A', detail: "The marvelously delicious dish A", prix: 10.99, image: false, type: "dishes" },
  { id: crypto.randomUUID(), titre: 'Dish B', detail: "The marvelously delicious dish B", prix: 8.99,image: false, type: "dishes" },
  { id: crypto.randomUUID(), titre: 'Drink A', detail: "The marvelously delicious drink A", prix: 5.99, image: false, type: "drinks" },
  { id: crypto.randomUUID(), titre: 'Drink B', detail: "The marvelously delicious drink B", prix: 4.99,image: false, type: "drinks" },
]

export const available = Object.values(items).map((item) => ({ target: item.id, stock: Math.trunc(Math.random()*100) }))