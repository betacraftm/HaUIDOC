export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pdfUrl = searchParams.get("url");

  if (!pdfUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(pdfUrl, { cache: "no-store" });

    if (!response.ok) {
      return new Response("Failed to fetch PDF", { status: response.status });
    }

    const blob = await response.blob();
    return new Response(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response("Error fetching PDF", { status: 500 });
  }
}
