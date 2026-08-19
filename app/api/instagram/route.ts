import { NextResponse } from "next/server";

export async function GET() {

  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,children{media_type,media_url,thumbnail_url},permalink&access_token=${process.env.INSTAGRAM_TOKEN}`
  );

  const data = await res.json();

  console.log(JSON.stringify(data, null, 2));
  return NextResponse.json(data);
}