// app/api/generate-info/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { diagnosis } = await request.json()
    
    if (!diagnosis) {
      return NextResponse.json({ error: 'Diagnosis text is required' }, { status: 400 })
    }

    const prompt = `As a senior plant pathologist with 20 years experience, generate a comprehensive report about this diagnosis${diagnosis} (detected with the confidence) following this structure:

    **## Disease Overview** 
    [Brief introduction with scientific name and key characteristics. Include severity rating based on confidence level]
    
    **## Visual Symptoms** 
    [Detailed description of physical manifestations with progression stages]
    
    **## Disease Cycle**
    [Pathogen life cycle with infection pathways and favorable conditions]
    
    **## Risk Analysis** 
    [Susceptible plant varieties, geographical prevalence, seasonal patterns]
    
    **## Prevention Plan** 
    [Cultural practices, resistant varieties, sanitation protocols]
    
    **## Treatment Protocol**
    [Organic > Biological > Chemical options with application guidelines]
    
    **## Monitoring Guide**
    [Checklist for early detection and progression tracking]
    
    **## Case Studies** 
    [2-3 brief real-world examples with successful management]
    
    Format using markdown with emoji section headers. Use simple language for farmers. Highlight confidence-related uncertainties. Include metric/imperial units and evth..` 

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'API request failed')
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No information could be generated"
    
    return NextResponse.json({ info: text })
  } catch (error: unknown) {
    console.error('Error in generate-info:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate disease info';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}