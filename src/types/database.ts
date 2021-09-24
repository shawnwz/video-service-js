export type SortingOrder = 'asc' | 'desc';

export interface Video {
     identifier: number;
    // /**
    //  * The name of the video
    //  */
    // title: string;
    // description: string;
    // image_url: string;
    // vip_video: boolean;
    // full_video_url: string;
    // summary: string
    online_time: number;

}

export interface Show {

}

export interface Athlete {
    display_order: number;
    english_name: string;
}

export interface WithCount<T> {
    count: number;
    items: T[];
}

export interface PaginationData {
    count: number;
    page: number;
    pages: number;
    limit: number;
}

export type WithPagination<T> = {
    pagination: PaginationData,
    items: T[]
}

export interface PaginationLinks {
    next: string | null;
    previous: string | null;
    first: string;
    last: string;
}
