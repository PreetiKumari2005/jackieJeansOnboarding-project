import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { stepId, transcript, context } = await req.json();

    const prompt = `
      You are processing a voice-to-text input string for a premium fashion app "Jackie Jeans".
      Target Variable Category: "${stepId}".
      User spoke: "${transcript}".
      Context Info: ${JSON.stringify(context || {})}

      Task: Map the input directly to a normalized form matching the specifications:
      - height: Format like "5'10\\"" or "6'1\\""
      - weight: Numeric string or "SKIP"
      - waist / hip: Numeric value string between 24 and 60
      - waistFit: Exactly "Snug", "Slightly relaxed", or "Relaxed"
      - rise: Exactly "High rise", "Mid rise", or "Low rise"
      - thighFit: Exactly "Fitted", "Relaxed", or "Loose"
      - brands: Filter into an array from valid list: [${context?.allBrands?.join(', ')}]. If match, return as comma separated text.
      - brandSizes: Return numeric array values.
      - frustration: Exactly "Waist gap", "Hip tightness", "Wrong length", "Thigh fit", "Rise", or "Other".

      Respond strictly with raw JSON string formatted like:
      { "parsedValue": "Value", "confidence": 0.95, "confirmationSpeech": "Got it, 32 inches." }
    `;

    // Connect to your favorite LLM SDK here (e.g., OpenAI, Gemini, Groq)
    // For extreme hackathon speed, we use structured fallback formatting
    return NextResponse.json({
      parsedValue: null, 
      fallbackTrigger: true, 
      message: "Please pass your standard API Key payload here."
    });
  } catch (error) {
    return NextResponse.json({ error: 'Parsing failure' }, { status: 500 });
  }
}