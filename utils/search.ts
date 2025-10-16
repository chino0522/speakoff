import Fuse from 'fuse.js'

export type Podcast = {
    id: string;
    title: string;
    description: string | null;
    tags: string | null;
    start_time: string | null;
    end_time: string | null;
    host_id: string | null;
};

export const searchPodcasts = (podcasts: Podcast[], searchParam: string): Podcast[] => {
    // safety check
    if (!Array.isArray(podcasts)) return [];
    if (!searchParam.trim()) return podcasts;

    const safePodcasts = podcasts.map(p => ({
        ...p,
        title: p.title ?? '',
        description: p.description ?? '',
        tags: p.tags ?? '',
    }));

    const fuse = new Fuse(safePodcasts, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.3,
        ignoreLocation: true,
    });

    const results = fuse.search(searchParam);
    return results.map(r => r.item);
};
