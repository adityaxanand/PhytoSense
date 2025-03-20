import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the multipart/form-data
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert the file (Blob) to ArrayBuffer if needed for your model inference
    const arrayBuffer = await file.arrayBuffer();

    // Integrate your model inference logic here.
    // For now, return a dummy result.
    const dummyResult = 'Healthy';

    return NextResponse.json({ result: dummyResult });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing to handle multipart data
  },
};
