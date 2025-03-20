import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // You can convert the file to an ArrayBuffer if needed:
    // const _buffer = await file.arrayBuffer();

    // Replace the dummy result with your model inference logic.
    const dummyResult = 'Healthy';

    return NextResponse.json({ result: dummyResult });
  } catch (error: unknown) {
    let message = 'Something went wrong';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
