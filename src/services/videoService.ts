import { VideoModel} from "../models/video";
import {Video, WithPagination} from "../types/database";

export async function getVideo(identifier: number): Promise<Video[]> {
    const videos = await VideoModel.findById(identifier);
    if(!videos) {
        throw new Error('Not found');
    }
    return videos;
}

export async function listVideos(options: {
    page: number;
    size: number;
}):Promise<WithPagination<Video>> {
    console.log('listVideos...')
    const page = Math.max(1, options.page);
    const limit = Math.max(1, options.size);
    const { count, items } = await VideoModel.list(
        {offset: (page - 1) * limit, limit: limit,  sortBy: 'identifier', orderBy:'asc'}
    );
    return {
        pagination: {
            count,
            page,
            pages: Math.ceil(count / limit),
            limit,
        },
        items: items,
    };
}
