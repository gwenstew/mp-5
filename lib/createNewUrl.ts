"use server"
import { UrlProps } from "./type";
import getCollection, { URL_COLLECTION } from "./db";

export default async function createNewUrl(
    alias:string,
    origURL:string,
): Promise<UrlProps | null> {
    const newUrl = {
        alias,
        origURL,
    };

    const urlCollection = await getCollection(URL_COLLECTION);

    //check if alias already in db
    const existingUrl = await urlCollection.findOne({ alias });
    if (existingUrl) {
        return null;
    }
    
    const res = await urlCollection.insertOne(newUrl);

    if (!res.acknowledged) {
        return null;
    }

    return { ...newUrl, id:res.insertedId.toString() };
}
