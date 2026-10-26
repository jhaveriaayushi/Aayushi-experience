import { NextResponse } from "next/server";

type GitHubCommitResponse = {
  commit?: {
    committer?: {
      date?: string;
    };
  };
};

export async function GET() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/jhaveriaayushi/Aayushi-experience/commits/main",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Last-updated date is temporarily unavailable" },
        { status: 502 }
      );
    }

    const data = (await response.json()) as GitHubCommitResponse;
    const lastUpdated = data.commit?.committer?.date;

    if (!lastUpdated || Number.isNaN(Date.parse(lastUpdated))) {
      return NextResponse.json(
        { error: "GitHub returned an invalid commit date" },
        { status: 502 }
      );
    }

    return NextResponse.json({ lastUpdated });
  } catch {
    return NextResponse.json(
      { error: "Last-updated date is temporarily unavailable" },
      { status: 502 }
    );
  }
}
