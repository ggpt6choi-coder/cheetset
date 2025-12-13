declare module 'parse-curl' {
    interface ParsedCurl {
        url: string;
        method: string;
        header: Record<string, string>;
        body?: string;
    }
    function parseCurl(curl: string): ParsedCurl;
    export = parseCurl;
}
