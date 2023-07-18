import React from "react";

export interface Comment {
    "postId": number,
    "id": number,
    "name": string,
    "email": string,
    "body": string
}

export interface ObserverParams {
    setIndexes: React.Dispatch<React.SetStateAction<number[]>>;
    indexes: number[];
    ulRef: React.MutableRefObject<null | HTMLUListElement>;
    data: Comment[];
    VIEW_IN_SCROLL: number;
    STEP: number;
}

export type FetchAction =
    { type: 'loading' } |
    { type: 'error' } |
    { type: 'success' }

export interface FetchStatus {
    loading: boolean;
    error: boolean;
    success: boolean;
}
export enum Urls {
    comments = "https://jsonplaceholder.typicode.com/comments"
}