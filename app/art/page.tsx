"use client";

import { useEffect, useState } from "react";

export default function ArtPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

   const sizes = [
    "w-48",
    "w-56",
    "w-64",
    "w-72",
    ];

    const rotations = [
    "-rotate-2",
    "rotate-1",
    "rotate-2",
    "-rotate-1",
    ];

  useEffect(() => {
    async function loadPosts() {
        const res = await fetch("/api/instagram");
        const data = await res.json();

         console.log("ArtPage data:", data);
        const shuffled = [...data.data].sort(
        () => Math.random() - 0.5
        );

        setPosts(shuffled);
        setLoading(false);
    }
   



    loadPosts();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

    const galleryPosts = posts.map((post, index) => ({
    ...post,
    size: sizes[index % sizes.length],
    rotation: rotations[index % rotations.length],
    }));
  
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">
        Art Gallery
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-12 max-w-7xl mx-auto">
        {galleryPosts.map((post) => (
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
                    className={`${post.size} ${post.rotation}`}>
            
                </video>
                ) : (
                <img
                    src={post.media_url}
                    alt={post.caption || "Instagram post"}
                    className={`${post.size} ${post.rotation}`}
                />
                )}
          </a>
        ))}
      </div>
    </div>
  );
}   

