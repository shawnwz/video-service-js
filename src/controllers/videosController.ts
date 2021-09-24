import { Controller, Get, Path, Query, Route } from "tsoa";
import { getVideo, listVideos } from "../services/videoService";
import { PaginationData, PaginationLinks, Video } from "../types/database";
import { encode } from "querystring";

// interface ValidateErrorJSON {
//     message: "Validation failed";
//     details: { [name: string]: unknown };
// }

@Route("videos")
export class VideosController extends Controller {
    /**
     * Retrieves the details of an exising video.
     * Supply the unique video ID
     * @param videoId The video's identifier
     * @example videoId 1
     */
    @Get("{videoId}")
    public async getVideo(@Path() videoId: number): Promise<Video[]> {
        return getVideo(videoId);
    }

    @Get()
    public async listVideos(@Query() page: number = 1, @Query() size: number = 20,): Promise<Video[]>{
        const pageOptions = { page, size };
        const { pagination, items } = await listVideos(pageOptions);

        const inRange = (n: number) => Math.max(1, Math.min(pagination.pages, n));
        const pointerToPage = (n: number) => `/instances?${encode({ page: inRange(n) })}`;

        const links = {
            next: pagination.page < pagination.pages ? pointerToPage(pagination.page + 1) : null,
            previous: pagination.page > 1 ? pointerToPage(pagination.page - 1) : null,
            first: pointerToPage(1),
            last: pointerToPage(pagination.pages),
        };
        const headers = {
            ...getPaginationHeaders(pagination, links),
        };
        Object.entries(headers).forEach(([name, value]) => this.setHeader(name, value));
        return items;
    }


    // /**
    //  * Add a new video
    //  * @param requestBody
    //  */
    // @Response<ValidateErrorJSON>(422, "Validation Failed")
    // @SuccessResponse("201", "Created")
    // @Post()
    // public async createVideo(@Body() requestBody: VideoCreationParams): Promise<void> {
    //     this.setStatus(201);
    //     new VideoService().create(requestBody);
    //     return;
    // }
}

function getPaginationHeaders(
    data: PaginationData,
    links: PaginationLinks,
): Record<string, string | string[] | undefined> {
    return {
        'X-Pagination-Per-Page': data.limit.toString(),
        'X-Pagination-Current-Page': data.page.toString(),
        'X-Pagination-Total-Pages': data.pages.toString(),
        'X-Pagination-Total-Entries': data.count.toString(),
        'Link': Object.entries(links)
            .filter(([, url]) => !!url)
            .map(([name, url]) => `<${url}>; rel="${name}"`)
            .join(', '),
    };
}
