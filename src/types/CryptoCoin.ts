type Link = {
    name: string;
    url: string;
    type: string;
}

type Supply = {
    confirmed: boolean;
    circulating: string;
    total: string;
}

type AllTimeHigh = {
    price: string;
    timestamp: number;
}

export type CryptoCoin = {
    uuid: string;
    symbol: string;
    name: string;
    description: string;
    color: string;
    iconUrl: string;
    marketCap: string;
    price: string;
    btcPrice: string;
    listedAt: number;
    change: string;
    rank: number;
    sparkline: string[];
    coinrankingUrl: string;
    "24hVolume": string;
    links: Link[];
    supply: Supply;
    allTimeHigh: AllTimeHigh;
    numberOfMarkets: number;
    numberOfExchanges: number;
}