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

// create
export const createPortfolio = async (portfolioData: CreatePortfolio) => {
  await checkMediaType(portfolioData.thumbnailId, "image");
  return portfolioRepo.createPortfolio(portfolioData);
};

// update

// delete

export const deletePortfolio = async (id: string) =>
  portfolioRepo.deletePortfolioById(id);
