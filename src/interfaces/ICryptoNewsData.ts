import { CryptoNews } from "../types/CryptoNews";

type QueryContext = {
    _type: string;
    originalQuery: string;
    adultIntent: boolean;
};

type Sort = {
    _type: string;
    name: string;
    id: string;
    isSelected: boolean;
    url: string;
}

export default interface ICryptoNewsData {
    _type: string;
    readLink: string;
    queryContext: QueryContext;
    totalEstimatedMatches: number;
    sort: Sort[];
    value: CryptoNews[];
}