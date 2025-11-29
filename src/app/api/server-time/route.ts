import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    try {
        // Ensure URL has protocol
        const targetUrl = url.startsWith('http') ? url : `https://${url}`;

        const response = await fetch(targetUrl, {
            method: 'HEAD',
            cache: 'no-store',
        });

        const dateHeader = response.headers.get('date');

        if (!dateHeader) {
            return NextResponse.json({ error: 'Date header not found' }, { status: 404 });
        }

        return NextResponse.json({
            serverTime: new Date(dateHeader).toISOString(),
            url: targetUrl
        });

    } catch (error) {
        console.error('Error fetching server time:', error);
        return NextResponse.json({ error: 'Failed to fetch server time' }, { status: 500 });
    }
}
