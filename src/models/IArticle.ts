export interface IArticle {
    author: {
        following: boolean;
        image: string;
        username:string
    };
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    tagList: string[];
    slug: string;
    title: string;
    updatedAt: string;
}