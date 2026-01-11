const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

exports.generateTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, travelers, budget, interests, accommodation } = req.body;

    if (!destination || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const interestText = interests?.length ? interests.join(", ") : "general tourism";

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
- Approximate budget
Return in clean readable text.
`;

const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt
  });
  const plan = response.output[0].content[0].text;
  

    res.json({ plan });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ 
        error: "Failed to generate trip", 
        details: error.message || error 
    });
  }
};
