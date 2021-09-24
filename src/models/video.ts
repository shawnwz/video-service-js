/**
 * Video objects
 */
import knex from "../stores/knex";
import {SortingOrder, Video, WithCount} from "../types/database";

type SortableProps = keyof Pick<Video, 'online_time' | 'identifier'>
interface queryVideosOptions {
    offset?: number;
    limit?: number;
    sortBy?: SortableProps;
    orderBy?: SortingOrder;
}

export class VideoModel {

    static readonly TABLE_NAME = 'videos';
    static async findById(id: number): Promise<Video[]> {
        return knex<Video>(VideoModel.TABLE_NAME).where({identifier: id}).select();
    }

    static async list(options: queryVideosOptions): Promise<WithCount<Video>> {
        let query = knex(VideoModel.TABLE_NAME);

        //query.where({visible: true})

        const countRecord = await query.clone().count('*', { as: 'count' }).first();

        const count = typeof countRecord?.count === 'string' ? Number(countRecord.count) : 0;

        if (count === 0) {
            return { count, items: [] };
        }

        if(options.offset) {
            query.offset(options.offset);
        }

        if(options.limit) {
            query.limit(options.limit);
        }

        if(options.sortBy) {
            query.orderBy(options.sortBy, options.orderBy);
        }

        const items: Video[] = await query.select();


        return {count, items};
    }
}
