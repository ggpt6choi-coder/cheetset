'use server';

import heicConvert from 'heic-convert';

export async function convertHeicToJpeg(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) {
            throw new Error('No file provided');
        }

        const arrayBuffer = await file.arrayBuffer();
        const inputBuffer = Buffer.from(arrayBuffer);

        const outputBuffer = await heicConvert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: 0.9,
        });

        // Convert Buffer to base64 string to send back to client
        const base64 = `data:image/jpeg;base64,${outputBuffer.toString('base64')}`;
        return { success: true, data: base64 };
    } catch (error: any) {
        console.error('Server-side HEIC conversion error:', error);
        return { success: false, error: error.message };
    }
}
