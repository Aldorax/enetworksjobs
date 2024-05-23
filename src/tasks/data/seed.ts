import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

import { labels, categories, statuses } from "./data";

const tasks = Array.from({ length: 100 }, () => ({
  id: `ID-${faker.number.int({ min: 1000, max: 9999 })}`,
  staff: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  status: faker.helpers.arrayElement(statuses).value,
  label: faker.helpers.arrayElement(labels).value,
  category: faker.helpers.arrayElement(categories).value,
}));

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
);

console.log("✅ Tasks data generated.");
