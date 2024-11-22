import { NextApiRequest, NextApiResponse } from 'next';
import createNewUrl from '@/lib/createNewUrl'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { alias, origURL } = req.body;

    
        const result = await createNewUrl(alias, origURL);

        if (result && result.alias) {
        //need to fix this to my domain
        const shortenedUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${result.alias}`;
        return res.status(200).json({ shortenedUrl });
        } else {
            return res.status(400).json({ error: 'Failed to shorten URL or alias already exists' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
