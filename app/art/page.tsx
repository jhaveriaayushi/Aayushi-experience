"use client";

import { useEffect, useState } from "react";

export default function ArtPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const res = await fetch("/api/instagram");
      const data = await res.json();

      console.log("ArtPage data:", data);

      setPosts(data.data);
      setLoading(false);
    }

    loadPosts();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">
        Art Gallery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.media_type === "VIDEO" ? (
                <video
                    src={post.media_url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full rounded-lg shadow-md"
                >
                </video>
                ) : (
                <img
                    src={post.media_url}
                    alt={post.caption || "Instagram post"}
                    className="w-full rounded-lg shadow-md"
                />
                )}
          </a>
        ))}
      </div>
    </div>
  );
}   

