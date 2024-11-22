import { UrlProps } from "./type";
import getCollection, { URL_COLLECTION } from "./db";

export async function getUrlbyAlias(alias:string): Promise<UrlProps | null> {
    const urlCollection = await getCollection(URL_COLLECTION);
    //find document by alias
    const data = await urlCollection.findOne({alias});

    if (!data) {
        //no matching alias
        return null;
    }

    //map document to UrlProp
    const url: UrlProps = {
        id:data._id.toHexString(),
        alias:data.alias,
        origURL:data.origURL,
    };
    
    return url;
}
