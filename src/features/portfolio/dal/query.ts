import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as portfolioService from "@/services/portfolio";

export const getPortfolios = async () => {
  return dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => portfolioService.getPortfolioByLimit()),
      {
        portfolio: ["read"],
      },
    ),
  );
};
