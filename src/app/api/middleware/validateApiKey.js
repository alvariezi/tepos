export default function validateApiKey(req) {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });
  }

  return null;
}