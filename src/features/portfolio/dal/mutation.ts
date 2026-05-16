import type { CreatePortfolio } from "@/services/portfolio/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as portfolioService from "@/services/portfolio";

export const createPortfolio = async (data: CreatePortfolio) => {
  const portfolio = dalRequireAuth(
    () => dalDbOperation(() => portfolioService.createPortfolio(data)),
    { portfolio: ["create"] },
  );
  return portfolio;
};

export const deletePortfolio = async (id: string) => {
  const portfolio = dalRequireAuth(
    () => dalDbOperation(() => portfolioService.deletePortfolio(id)),
    { portfolio: ["delete"] },
  );
  return portfolio;
};

export const updatePortfolio = async (id: string, data: CreatePortfolio) => {
  const portfolio = dalRequireAuth(
    () => dalDbOperation(() => portfolioService.updatePortfolio(id, data)),
    { portfolio: ["update"] },
  );
  return portfolio;
};
