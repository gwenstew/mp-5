import { NextApiRequest, NextApiResponse } from "next";
import { getUrlbyAlias } from "@/lib/getUrlbyAlias";
import { UrlProps } from "@/lib/type";

export default async function handleUrl(req: NextApiRequest, res: NextApiResponse) {
    const {alias} = req.query;
    if (typeof alias != "string") {
        return res.status(400).json({message: "Invalid alias"});
    }

    try {
        const urlData = await getUrlbyAlias(alias);

        if (!urlData) {
            //alias not in db
            return res.status(404).json({message: "Alias not found"});
        }

        //routing to original url
        return res.redirect(301, urlData.origURL);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}
