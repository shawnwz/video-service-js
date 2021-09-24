import { ShowModel} from "../models/show";
import { Show} from "../types/database";

export async function getShow(id: number): Promise<Show[]>{
    const shows = await ShowModel.findById(id);
    if(!shows) {
        throw new Error('Not found');
    }
    return shows
}
