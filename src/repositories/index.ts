import { db } from "@/db/drizzle/db";

export type Transaction = Parameters<
  Parameters<(typeof db)["transaction"]>[0]
>[0];
export const withTransaction = <T>(cb: (tx: Transaction) => Promise<T>) => {
  return db.transaction(cb);
};

export const getDBorTX = (tx?: Transaction) => {
  if (tx) return tx;
  else return db;
};
