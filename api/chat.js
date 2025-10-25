// api/chat.js - Vercel Serverless Function (FREE FOREVER)
export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    console.log("🤖 Vercel AI Chatbot received:", message);

    // AI Response Logic
    const response = generateAIResponse(message);
    const confidence = calculateConfidence(message);

    // Return response
    return res.status(200).json({
      message: response,
      timestamp: new Date().toISOString(),
      platform: "Vercel (Free Forever)",
      confidence: confidence,
      features: [
        "🚀 Free Forever",
        "⚡ Serverless Functions",
        "🌍 Global CDN",
        "💰 $0/month",
      ],
    });
  } catch (error) {
    console.error("❌ Error:", error);

    return res.status(200).json({
      message: "🤖 Hello from Vercel Free Tier! How can I help you today?",
      timestamp: new Date().toISOString(),
      platform: "Vercel",
      fallback: true,
    });
  }
}

// AI Response Generator
function generateAIResponse(userMessage) {
  const responses = {
    hello:
      "👋 Hello! Welcome to our AI Customer Service. How can I help you today?",
    hi: "👋 Hi there! I'm your AI assistant running on FREE Vercel hosting!",
    shipping:
      "🚚 **Shipping Info**: Free delivery on orders over $50! Standard shipping: 3-5 business days.",
    delivery:
      "📦 **Delivery**: We offer express shipping (1-2 days) for $9.99. Free shipping over $50!",
    return:
      "🔄 **Return Policy**: 30-day money-back guarantee! Easy returns process.",
    refund:
      "💸 **Refunds**: Refunds processed within 5-7 business days after we receive your return.",
    payment:
      "💳 **Payment Methods**: We accept Visa, MasterCard, PayPal, and Apple Pay.",
    price:
      "💰 **Pricing**: Our products start from $19.99. Check our website for current deals!",
    contact:
      "📞 **Contact**: Email: support@company.com | Phone: 1-800-HELP-NOW",
    hours:
      "🕒 **Business Hours**: Monday-Friday: 9AM-6PM EST | Saturday: 10AM-4PM EST",
    vercel:
      "▲ **Vercel**: This chatbot is hosted on Vercel - FREE forever! No credit card required.",
    free: "🎉 **Free Tier**: Yes! This entire chatbot costs $0/month. Vercel is perfect for projects!",
    aws: "☁️ **AWS vs Vercel**: AWS costs money after credits, Vercel is free forever for personal use!",
    default:
      "🤖 **AI Assistant**: I'm here to help! Ask me about shipping, returns, payments, or anything else.",
  };

  const lowerMessage = (userMessage || "hello").toLowerCase().trim();

  // Check for exact matches first
  if (responses[lowerMessage]) {
    return responses[lowerMessage];
  }

  // Check for keyword matches
  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerMessage.includes(keyword) && keyword !== "default") {
      return response;
    }
  }

  return responses.default;
}

// Calculate confidence score
function calculateConfidence(message) {
  const keywords = [
    "shipping",
    "delivery",
    "return",
    "refund",
    "payment",
    "price",
    "contact",
    "hours",
    "hello",
    "hi",
  ];
  const lowerMessage = message.toLowerCase();

  const matches = keywords.filter((keyword) =>
    lowerMessage.includes(keyword)
  ).length;
  return Math.min(95, 60 + matches * 10);
}
