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
        {galleryPosts.map((post, index) => {
          const isCarousel = post.media_type === "CAROUSEL_ALBUM";
          console.log("hi");
          const carouselImages = post.children?.data || [];
          const slideCount = post.children?.data?.length || 0;
          return (
            <div
              key={post.id}
              onClick={() => {
                setSelectedIndex(index);
                setSelectedSlide(0);
              }}
              className={`
        group
        relative
        inline-block
        cursor-pointer
        transition-all
        duration-300
        ease-out
        hover:scale-105
        hover:rotate-0
        hover:z-10
        `}
            >
              {isCarousel && (
                <>
                  {carouselImages[2] && (
                    <img
                      src={carouselImages[2].thumbnail_url || carouselImages[2].media_url}
                      className={`
        absolute
        w-full
        h-full
        object-cover
        border
        border-[var(--background)]
        shadow-md
        rounded-sm
        transition-all
        duration-300
        ease-out
        group-hover:translate-x-5
        group-hover:translate-y-5
        group-hover:rotate-3
        `}
                    />
                  )}

                  {carouselImages[1] && (

                    <img
                      src={carouselImages[1].thumbnail_url || carouselImages[1].media_url}
                      className={`
        absolute
        w-full
        h-full
        object-cover
        border
        border-[var(--background)]
        shadow-md
        rounded-sm
        transition-all
        duration-300
        ease-out
        group-hover:translate-x-3
        group-hover:translate-y-5
        group-hover:-rotate-3
        `}
                    />
                  )}

                </>
              )}

              <div className="relative z-10">
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
                    className={`border border-[var(--background)] ${post.size} ${post.rotation}`}

                  />
                )}

                {isCarousel && (
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    +{slideCount}
                  </div>
                )}
              </div>
            </div>
          );
        })}

      </div>



      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-background/80 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative flex flex-col items-center max-w-[70vw]"
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
                      src={current.media_url}
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
                        className="absolute -left-16 top-1/2 -translate-y-1/2 text-foreground text-7xl cursor-pointer hover:scale-120"
                      >
                        ←
                      </button>

                      <button
                        onClick={() =>
                          setSelectedSlide((prev) =>
                            prev === slides.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute -right-16 top-1/2 -translate-y-1/2 text-foreground text-7xl cursor-pointer hover:scale-120"
                      >
                        →
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="absolute -top-10 -right-10 text-5xl text-foreground cursor-pointer hover:scale-120"
                  >
                    ×
                  </button>
                  {slides.length > 1 && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      {slides.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSlide(index)}
                          className={`h-2 w-2 rounded-full transition-all ${index === selectedSlide
                              ? "bg-foreground scale-125"
                              : "bg-foreground/40 hover:bg-foreground/70"
                            }`}
                        />
                      ))}
                    </div>
                  )}

                  {post.caption && (
                    <p className="mt-4 max-w-[70vw] text-center text-sm whitespace-pre-wrap text-foreground">
                      {post.caption}
                    </p>
                  )}


                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

