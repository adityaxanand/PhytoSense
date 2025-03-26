// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file') as Blob;

//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     // Forward the request to your backend endpoint
//     const backendResponse = await fetch('http://127.0.0.1:8000/predict/', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await backendResponse.json();

//     // You can adjust the response mapping as needed:
//     return NextResponse.json({ result: data.prediction });
//   } catch (error: unknown) {
//     let message = 'Something went wrong';
//     if (error instanceof Error) {
//       message = error.message;
//     }
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


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
