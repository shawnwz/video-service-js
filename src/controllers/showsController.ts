import { Controller, Get, Path, Route } from "tsoa";
import { getShow } from "../services/ShowService";
import { Show } from "../types/database";

@Route("shows")
export class ShowsController extends Controller {
    /**
     * Retrieves the details of an exising show.
     * Supply the unique show ID
     * @param showId The show's id
     * @example showId 1
     */
    @Get("{showId}")
    public async getShow(@Path() showId: number): Promise<Show[]> {
        return getShow(showId);
    }

}
