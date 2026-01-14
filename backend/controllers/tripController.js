const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ============================
// GENERATE INITIAL ITINERARY
// ============================
const generateTrip = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      travelers,
      budget,
      interests,
      accommodation,
    } = req.body;

    if (!destination || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const interestText =
      interests && interests.length > 0
        ? interests.join(", ")
        : "general tourism";

    const prompt = `
You are a professional travel planner.

Create a detailed day-by-day itinerary for:
Destination: ${destination}
Dates: ${startDate} to ${endDate}
Travelers: ${travelers}
Budget: ${budget}
Accommodation: ${accommodation}
Interests: ${interestText}

Include:
- Morning, Afternoon, Evening plans
- Must-visit places
- Food suggestions
- Travel tips
- Approximate daily budget

Return in clean readable text.
IMPORTANT:
- Ensure the itinerary is COMPLETE
- Do not cut off mid-day or mid-sentence
- If space is limited, shorten descriptions but finish all days

`;

    const response = await openai.responses.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      input: prompt,
      max_output_tokens: 1200,
      temperature: 0.7,
    });

    const plan = response.output_text;

    if (!plan || plan.trim().length === 0) {
      throw new Error("AI returned empty itinerary");
    }

    console.log("✅ AI itinerary generated");
    res.json({ plan });
  } catch (error) {
    console.error("❌ AI Error:", error);
    res.status(500).json({
      error: "Failed to generate trip",
      details: error.message,
    });
  }
};

// ============================
// REFINE EXISTING ITINERARY
// ============================
const refineTrip = async (req, res) => {
  try {
    const { originalPlan, refinementPrompt } = req.body;

    if (!originalPlan || !refinementPrompt) {
      return res.status(400).json({ error: "Missing refinement data" });
    }

    const prompt = `
You are a travel planner AI.

Here is the current itinerary:
"""
${originalPlan}
"""

User wants the following refinement:
"${refinementPrompt}"

Rules:
- Modify ONLY relevant parts
- Keep the structure day-wise
- Do NOT remove important attractions unless asked
- Maintain clarity and readability

Return the updated itinerary only.
`;

    const response = await openai.responses.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      input: prompt,
      max_output_tokens: 1200,
      temperature: 0.6,
    });

    const updatedPlan = response.output_text;

    if (!updatedPlan || updatedPlan.trim().length === 0) {
      throw new Error("AI returned empty refinement");
    }

    console.log("✅ AI itinerary refined");
    res.json({ updatedPlan });
  } catch (error) {
    console.error("❌ Refinement AI Error:", error);
    res.status(500).json({ error: "Failed to refine itinerary" });
  }
};

module.exports = {
  generateTrip,
  refineTrip,
};
