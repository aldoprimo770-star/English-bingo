export interface Monster {
  id: number;
  name: string;
  rarity: "Common" | "Rare" | "Super Rare";
  emoji: string;
}

export const monsters: Monster[] = [
  // Common
  { id: 1, name: "Bunny Slime", rarity: "Common", emoji: "🐰" },
  { id: 2, name: "Jump Frog", rarity: "Common", emoji: "🐸" },
  { id: 3, name: "Tiny Turtle", rarity: "Common", emoji: "🐢" },
  { id: 4, name: "Leaf Bug", rarity: "Common", emoji: "🐛" },
  { id: 5, name: "Baby Chick", rarity: "Common", emoji: "🐥" },
  { id: 6, name: "Happy Snail", rarity: "Common", emoji: "🐌" },
  { id: 7, name: "Fuzzy Bee", rarity: "Common", emoji: "🐝" },
  { id: 8, name: "Cloud Sheep", rarity: "Common", emoji: "🐑" },
  { id: 9, name: "Puddle Duck", rarity: "Common", emoji: "🦆" },
  { id: 10, name: "Star Fish", rarity: "Common", emoji: "🐠" },

  // Rare
  { id: 101, name: "Fire Fox", rarity: "Rare", emoji: "🦊" },
  { id: 102, name: "Sky Eagle", rarity: "Rare", emoji: "🦅" },
  { id: 103, name: "Night Wolf", rarity: "Rare", emoji: "🐺" },
  { id: 104, name: "Thunder Lion", rarity: "Rare", emoji: "🦁" },
  { id: 105, name: "Ice Penguin", rarity: "Rare", emoji: "🐧" },
  { id: 106, name: "Shadow Cat", rarity: "Rare", emoji: "🐈‍⬛" },

  // Super Rare
  { id: 201, name: "Dragon", rarity: "Super Rare", emoji: "🐉" },
  { id: 202, name: "Ghost King", rarity: "Super Rare", emoji: "👻" },
  { id: 203, name: "Unicorn", rarity: "Super Rare", emoji: "🦄" },
];
