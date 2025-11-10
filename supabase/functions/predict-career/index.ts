import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { assessmentData } = await req.json();
    console.log('Received assessment data:', assessmentData);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert career advisor. Analyze the user's profile and return the top 3 career recommendations.

For each career, provide:
- careerName: The career title
- matchScore: A score from 0-100 indicating fit
- reasoning: 2-3 sentences explaining why this career matches
- strengths: Array of user's strengths relevant to this career
- gaps: Array of skills the user needs to develop
- resources: Array of 3 learning resources (each with title, type, and url)

Return ONLY valid JSON in this exact format:
{
  "careers": [
    {
      "careerName": "string",
      "matchScore": number,
      "reasoning": "string",
      "strengths": ["string"],
      "gaps": ["string"],
      "resources": [
        {"title": "string", "type": "Course|Tutorial|Article|Video", "url": "string"}
      ]
    }
  ]
}`;

    const userPrompt = `Analyze this student profile and recommend 3 ideal careers:

Name: ${assessmentData.fullName}
Age: ${assessmentData.age}
Education: ${assessmentData.educationLevel}
Interests: ${assessmentData.interests.join(', ')}
Skills: ${assessmentData.skills.join(', ')}
Personality: ${assessmentData.personalityType}
${assessmentData.hobbies?.length > 0 ? `Hobbies: ${assessmentData.hobbies.join(', ')}` : ''}
${assessmentData.careerGoals ? `Career Goals: ${assessmentData.careerGoals}` : ''}`;

    console.log('Calling AI with prompt');
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please contact support.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    console.log('AI response received');
    
    const content = aiResponse.choices[0].message.content;
    console.log('AI content:', content);
    
    // Parse the JSON response
    let predictions;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/```\n?([\s\S]*?)\n?```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      predictions = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error('Failed to parse AI response');
    }

    return new Response(
      JSON.stringify(predictions),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in predict-career function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
