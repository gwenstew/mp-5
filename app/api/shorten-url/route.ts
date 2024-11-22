import { NextRequest, NextResponse } from 'next/server';
import createNewUrl from '@/lib/createNewUrl'; 

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); 
        const { alias, origURL } = body;

        if (!alias || !origURL) {
            return NextResponse.json(
                { error: 'Alias and original URL are required' },
                { status: 400 }
            );
        }
    
        const result = await createNewUrl(alias, origURL);

        if (result && result.alias) {
        //need to fix this to my domain
        const shortenedUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${result.alias}`;
        return NextResponse.json({ shortenedUrl }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: 'Failed to shorten URL or alias already exists' },
                { status: 400 }
            );
        }
    } catch(error) {
        console.error('Error in URL shortening:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
