export interface IComment {
    id: number;
    text: string;
    date: string;
    author: {
        id: number;
        username: string;
        avatar: string;
    };
}
