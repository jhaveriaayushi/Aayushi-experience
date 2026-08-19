"use client";

import { useEffect, useState } from "react";

export default function ArtPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedSlide, setSelectedSlide] = useState(0);

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
      <h1 className="text-4xl theme-font font-bold mb-6 ease-out">
        Art Gallery
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-12 max-w-7xl mx-auto">
        {galleryPosts.map((post) => (
          <a
            key={post.id}
            onClick={() => {
              setSelectedIndex(galleryPosts.indexOf(post));
              setSelectedSlide(0);
            }}
            className={`
            ${post.size}
            ${post.rotation}
            cursor-pointer
            transition-all
            duration-300
            ease-out
            hover:scale-105
            hover:rotate-0
            hover:z-10
            `}
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

        {selectedIndex !== null && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    onClick={() => setSelectedIndex(null)}
  >
    <div
      className="relative max-w-[70vw] max-h-[70vh]"
      onClick={(e) => e.stopPropagation()}
    >
      {(() => {
        const post = galleryPosts[selectedIndex];

        const slides =
          post.media_type === "CAROUSEL_ALBUM"
            ? post.children?.data || []
            : [post];

        const current = slides[selectedSlide];

        return (
          <>
            {current.media_type === "VIDEO" ? (
              <video
                    src={post.media_url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="max-w-[70vw] max-h-[70vh]">
            
                </video>
            ) : (
              <img
                src={current.media_url}
                alt={current.caption || "Instagram post"}
                className="max-w-[70vw] max-h-[70vh]"
              />
            )}

            {slides.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedSlide((prev) =>
                      prev === 0 ? slides.length - 1 : prev - 1
                    )
                  }
                  className="absolute -left-16 top-1/2 -translate-y-1/2 text-white text-4xl cursor-pointer hover:scale-120"
                >
                  ←
                </button>

                <button
                  onClick={() =>
                    setSelectedSlide((prev) =>
                      prev === slides.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute -right-16 top-1/2 -translate-y-1/2 text-white text-4xl cursor-pointer hover:scale-120"
                >
                  →
                </button>
              </>
            )}

            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-10 -right-10 text-white text-5xl cursor-pointer hover:scale-120"
            >
              ×
            </button>
          </>
        );
      })()}
    </div>
  </div>
)}
      </div>
    </div>
  );
}   

