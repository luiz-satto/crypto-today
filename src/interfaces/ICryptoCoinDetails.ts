import { CryptoCoin } from "../types/CryptoCoin";

export default interface ICryptoCoinDetails {
    data: {
        coin: CryptoCoin
    }
}