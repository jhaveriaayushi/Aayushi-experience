import { NextResponse } from "next/server";

type InstagramMediaPage = {
  data?: unknown[];
  paging?: {
    next?: string;
  };
};

export async function GET() {
  try {
    const token = process.env.INSTAGRAM_TOKEN;
    if (!token) {
      throw new Error("Instagram token is not configured");
    }

    const firstPage = new URL("https://graph.instagram.com/me/media");
    firstPage.searchParams.set(
      "fields",
      "id,caption,media_type,media_url,thumbnail_url,children{media_type,media_url,thumbnail_url},permalink"
    );
    firstPage.searchParams.set("access_token", token);

    const posts: unknown[] = [];
    const visitedPages = new Set<string>();
    let pageUrl: URL | null = firstPage;

    while (pageUrl) {
      if (pageUrl.origin !== "https://graph.instagram.com") {
        throw new Error("Instagram returned an unexpected pagination URL");
      }

      const pageKey = pageUrl.toString();
      if (visitedPages.has(pageKey)) {
        throw new Error("Instagram pagination returned a repeated page");
      }
      visitedPages.add(pageKey);

      const res = await fetch(pageUrl);
      const data = (await res.json()) as InstagramMediaPage;

      if (!res.ok || !Array.isArray(data.data)) {
        throw new Error("Instagram returned an invalid media page");
      }

      posts.push(...data.data);
      pageUrl = data.paging?.next ? new URL(data.paging.next) : null;
    }

    return NextResponse.json({ data: posts });
  } catch {
    return NextResponse.json(
      { error: "Instagram feed is temporarily unavailable" },
      { status: 502 }
    );
  }
}