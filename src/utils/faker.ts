import { faker } from "@faker-js/faker";

export const createFakeFrutiAndColorName = () => {
  return `${faker.color.human()} ${faker.food.fruit()}`;
};
