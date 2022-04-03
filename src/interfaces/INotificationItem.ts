import { CryptoNews } from "../types/CryptoNews";
import IContentData from "./IContentData";

interface INotification {
    item: IContentData | CryptoNews,
    index: number
}

export default INotification;