"use client";

const posts = [
  {
    title: "Building AIyushi",
    category: "AI",
    date: "August 2026",
    excerpt:
      "Creating an AI-powered version of myself using Next.js, Azure AI and a custom CV knowledge base.",
  },
  {
    title: "Automating DWP Contract Workflows",
    category: "Automation",
    date: "July 2026",
    excerpt:
      "How Python, SharePoint and Power Automate reduced hours of manual contract processing.",
  },
  {
    title: "When Art Meets Technology",
    category: "Art",
    date: "June 2026",
    excerpt:
      "Exploring the overlap between creativity, code and artificial intelligence.",
  },
  {
    title: "Lessons from Product Management",
    category: "Career",
    date: "May 2026",
    excerpt:
      "A collection of principles I've learned building technical products.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-pink-400 uppercase tracking-[0.3em] mb-4">
          THOUGHTS & EXPERIMENTS
        </p>

        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          My <span className="text-pink-400">Blog</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mb-16">
          A collection of ideas, projects, lessons learned, technical deep dives
          and occasional creative detours.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-pink-500/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-300">
                  {post.category}
                </span>

                <span className="text-sm text-gray-500">
                  {post.date}
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-4 group-hover:text-pink-400 transition">
                {post.title}
              </h2>

              <p className="text-gray-400 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <button className="text-pink-400 font-semibold hover:text-pink-300">
                Read More →
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}