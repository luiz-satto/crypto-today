type Thumbnail = {
    _type: string;
    contentUrl: string;
    width: number;
    height: number;
}

type Image = {
    _type: string;
    thumbnail: Thumbnail;
}

type About = {
    _type: string;
    readLink: string;
    name: string;
}

type Provider = {
    _type: string;
    name: string;
    image: Image;
}

export type CryptoNews = {
    _type: string;
    name: string;
    url: string;
    image: Image;
    description: string;
    about: About[];
    provider: Provider[];
    datePublished: string;
}