import {Controller, Get, Path, Query, Route} from "tsoa";
import { getAthlete, listAthletes } from "../services/AthleteService";
import { Athlete } from "../types/database";

@Route("athletes")
export class AthletesController extends Controller {
    /**
     * Retrieves the details of an athlete.
     * Supply the unique athlete_id
     * @param athleteId The athlete's id
     * @example athleteId 1
     */
    @Get('{athleteId}')
    public async getAthlete(@Path() athleteId: number): Promise<Athlete[]> {
        return getAthlete(athleteId);
    }

    @Get()
    public async listAthlete(
        @Query() page: number = 1,
        @Query() size: number = 20,
    ): Promise<Athlete[]> {
        return listAthletes({page: page, size: size});
    }

}
