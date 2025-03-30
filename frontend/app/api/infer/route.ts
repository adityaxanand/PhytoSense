import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export async function POST(request: Request) {
  try {
    // Parse the incoming form-data
    const formData = await request.formData();
    const file = formData.get('file') as Blob;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Connect to your Gradio Space; this runs on the server
    const client = await Client.connect("adityaanand/phytosense");
    
    // Call the /predict endpoint on your Gradio Space, passing the image file with key "image"
    const result = await client.predict("/predict", { image: file });
    
    // Return the prediction result (assumed to be a string)
    return NextResponse.json({ result: result.data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};