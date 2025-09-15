import { BASE_URL } from "./constants/constants";
import { Pagination } from "./types/pagination";

interface IAnimeClient {
  getBestRanking(data: Pagination): Promise<any>; // top animes
  getByGenre(data: Pagination): Promise<any>; // with pagination
  getDetails(id: number): Promise<any>; // will need id from other get
  getWorstRanking(data: Pagination): Promise<any>; // bottom animes
}

export class AnimeClient implements IAnimeClient {
  private async getGenres() {
    try {
      const response = await fetch(`${BASE_URL}/genres/anime`, {
        method: "GET",
      });

      const res = await response.json();

      console.log(`genres`, res.data);

      return res.data;
    } catch (err) {
      this._handleError(err);
    }
  }

  /*
  public async getBestRanking(data: Pagination) {
    const validatedParams = this.validateLimitOffset(data);
    const urlParams = new URLSearchParams(validatedParams).toString();

    try {
      const response = await fetch(`${BASE_URL}/anime?${urlParams}`, {
        method: "GET",
      });

      const res = await response.json();

      return res.data;
    } catch (err) {
      this._handleError(err);
    }
  }*/

  public async getBestRanking(data: Pagination): Promise<any> {
    const { page = 1, limit = 25 } = data;

    if (page < 1) {
      throw new Error("Page must be greater than 0");
    }

    const urlParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    try {
      const response = await fetch(`${BASE_URL}/top/anime?${urlParams}`, {
        method: "GET",
      });

      const res = await response.json();

      return res.data;
    } catch (err) {
      this._handleError(err);
    }
  }

  public async getByGenre(pagination: Pagination): Promise<any> {
    await this.getGenres();

    const { page, limit } = pagination;
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?page=${page}&limit=${limit}`
    );
    const json = await response.json();
    return json;
  }

  public async getDetails() {}

  public async getWorstRanking(data: Pagination) {
    const { page = 1, limit = 25 } = data;

    /* if (limit < 1 || limit > 25) {
      throw new Error("Limit must be between 1 and 25");
    }*/

    if (page < 1) {
      throw new Error("Page must be greater than 0");
    }

    const urlParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort: "desc",
    });
    /*  
      order_by: "score",
      sort: "desc",
      */
    try {
      const response = await fetch(`${BASE_URL}/top/anime?${urlParams}`, {
        method: "GET",
      });

      const res = await response.json();

      return res.data;
    } catch (err) {
      this._handleError(err);
    }
  }

  _handleError(err: any) {
    console.log(err);

    /*
    if (err.response) {
      throw new Error(
        `MAL API retornou status ${err.response.status}: ${JSON.stringify(
          err.response.data
        )}`
      );
    } else {
      throw err;
    }*/
  }
}

export default AnimeClient;
