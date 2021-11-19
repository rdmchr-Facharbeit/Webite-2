import type { Models } from "appwrite";

type User = {
    created: number,
    data: string,
    userId: string,
    rating: number,
    finished: boolean
} & Models.Document;

type Data = {
    userId: string,
    name: string,
    color: string,
    movie: string,
    resets: number,
} & Models.Document;

export {
    User,
    Data
}