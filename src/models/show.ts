import {Show,} from "../types/database";
import knex from "../stores/knex";

export class ShowModel {
    static readonly TABLE_NAME = 'shows';
    static findById(id: number): Promise<Show[]> {
        return knex(ShowModel.TABLE_NAME).where({id: id}).select();
    }
}
