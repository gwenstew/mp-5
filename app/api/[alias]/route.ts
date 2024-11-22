import { NextRequest, NextResponse } from "next/server";
import { getUrlbyAlias } from "@/lib/getUrlbyAlias";
//import { UrlProps } from "@/lib/type";

export async function GET(req: NextRequest, context: { params: { alias?: string } }) {
    const  alias  = context.params?.alias;

    if (!alias) {
        return NextResponse.json({ message: 'Invalid alias' }, { status: 400 });
    }

    try {
        const urlData = await getUrlbyAlias(alias);

        if (!urlData) {
            //not found in the database
            return NextResponse.json({ message: 'Alias not found' }, { status: 404 });
        }

        //redirect to the original URL
        return NextResponse.redirect(urlData.origURL, 301);
    } catch (error) {
        console.error('Error handling alias:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
