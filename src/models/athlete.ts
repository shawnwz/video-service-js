import {Athlete, SortingOrder} from "../types/database";
import knex from "../stores/knex";

type SortableProps = keyof Pick<Athlete, 'display_order' | 'english_name'>
interface ListAthletesOptions {
    offset?: number;
    limit?: number;
    sortBy?: SortableProps;
    orderBy?: SortingOrder;
}

export class AthleteModel {

    static readonly TABLE_NAME = 'athletes';

    static async findById(id: number): Promise<Athlete[]> {
        return knex(AthleteModel.TABLE_NAME).where({athlete_id: id}).select();
    }

    static async list(options: ListAthletesOptions): Promise<Athlete[]> {
        let query = knex(AthleteModel.TABLE_NAME);
        query.where({deleted: false})
        if(options.offset) {
            query.offset(options.offset);
        }
        if(options.limit) {
            query.limit(options.limit);
        }
        if(options.sortBy) {
            query.orderBy(options.sortBy, options.orderBy);
        }
        const athletes: Athlete[] = await query.select();
        return athletes;
    }
}
