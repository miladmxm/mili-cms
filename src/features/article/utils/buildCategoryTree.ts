import type { Category, CategoryTree } from "../types";

export function buildCategoryTree(categories: Category[]): CategoryTree[] {
  const map = new Map<string, CategoryTree>();
  const roots: CategoryTree[] = [];

  categories.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] });
  });

  categories.forEach((cat) => {
    if (cat.parentId) {
      const parent = map.get(cat.parentId);
      parent?.children?.push(map.get(cat.id)!);
    } else {
      roots.push(map.get(cat.id)!);
    }
  });

  return roots;
}
