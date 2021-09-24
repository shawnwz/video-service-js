import { AthleteModel } from "../models/athlete";
import {Athlete} from "../types/database";


export async function getAthlete(identifier: number): Promise<Athlete[]> {
    const athletes = await AthleteModel.findById(identifier);
    if(!athletes) {
        throw new Error('Not found');
    }
    return athletes;
}

export async function listAthletes(options: {
    page: number;
    size: number;
}):Promise<Athlete[]> {
    const page = Math.max(1, options.page);
    const limit = Math.max(1, options.size);
    const athletes = await AthleteModel.list(
        {offset: (page - 1) * limit, limit: limit,  sortBy: 'display_order', orderBy:'asc'}
    );
    return athletes
}
