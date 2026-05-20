import type { LimitAndOffset } from "@/services/type";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as portfolioService from "@/services/portfolio";

export const getPaginationPortfolio = async () => {
  return dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => portfolioService.getPortfolioByLimit()),
      {
        portfolio: ["read"],
      },
    ),
  );
};

export const getPaginationPublicPortfolio = async (
  options?: LimitAndOffset,
) => {
  return dalVerifySuccess(
    await dalDbOperation(() => portfolioService.getPortfolioByLimit(options)),
  );
};

export const getPortfolio = async (id: string) => {
  return dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => portfolioService.getPortfolio(id)),
      {
        portfolio: ["read"],
      },
    ),
  );
};
