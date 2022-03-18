import { CryptoCoin } from "../types/CryptoCoin";
import { CryptoStats } from "../types/CryptoStats";

export default interface ICryptoCoin {
    data: {
        stats: CryptoStats
        coins: CryptoCoin[]
    }
}