import { CryptoHistory } from "../types/CryptoHistory";

export default interface ICryptoCoinHistory {
    data: {
        change: string
        history: CryptoHistory[]
    }
}