import { Pagination } from "../types/pagination";

export interface IAnimeClient {
  getBestRanking(data: Pagination): Promise<any>; // top animes
  getByCategory(): Promise<any>; // with pagination
  getDetails(id: number): Promise<any>; // will need id from other get
  getWorstRanking(): Promise<any>; // bottom animes
}
