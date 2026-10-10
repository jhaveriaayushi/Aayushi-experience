import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,children{media_type,media_url,thumbnail_url},permalink&access_token=${process.env.INSTAGRAM_TOKEN}`
    );
    const data = await res.json();

    if (!res.ok || !Array.isArray(data.data)) {
      return NextResponse.json(
        { error: "Instagram feed is temporarily unavailable" },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Instagram feed is temporarily unavailable" },
      { status: 502 }
    );
  }
}