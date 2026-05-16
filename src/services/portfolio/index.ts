import { cacheTag } from "next/cache";

import type { OffsetAndLimit } from "@/repositories/types";

import { CacheKeys } from "@/constant/cacheKeys";
import * as portfolioRepo from "@/repositories/portfolio.repo";

import type { CreatePortfolio, Portfolio } from "./type";

import { checkMediaType } from "../media";
import { DTOconvertMediaPathToRealUrl } from "../media/dto";

// read
export const getPortfolioByLimit = async (options?: OffsetAndLimit) => {
  "use cache";

  cacheTag(CacheKeys.portfolio);
  const portfolios = await portfolioRepo.findPortfolioByOffsetAndLimit(options);
  const normalPortfolios: Portfolio[] = [];

  for (const portfolio of portfolios) {
    const { thumbnail } = portfolio;

    thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);

    normalPortfolios.push({ ...portfolio, thumbnail });
  }

  return normalPortfolios;
};

export const getPortfolio = async (
  id: string,
): Promise<Portfolio | undefined> => {
  "use cache";

  cacheTag(`${CacheKeys.portfolio}-${id}`);
  const portfolio = await portfolioRepo.findPortfolioById(id);
  if (!portfolio) return portfolio;
  const { thumbnail } = portfolio;

  thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);

  return { ...portfolio, thumbnail };
};

// create
export const createPortfolio = async (portfolioData: CreatePortfolio) => {
  await checkMediaType(portfolioData.thumbnailId, "image");
  return portfolioRepo.createPortfolio(portfolioData);
};

// update
export const updatePortfolio = async (
  id: string,
  portfolioData: CreatePortfolio,
) => {
  await checkMediaType(portfolioData.thumbnailId, "image");
  return portfolioRepo.editPortfolioById(id, portfolioData);
};

// delete

export const deletePortfolio = async (id: string) =>
  portfolioRepo.deletePortfolioById(id);
