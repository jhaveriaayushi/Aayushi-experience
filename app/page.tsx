export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl px-6">
        <h1 className="text-6xl font-extrabold mb-4">
          👋 Hi, I'm Aayushi
        </h1>

        <p className="text-xl text-slate-600 mb-8">
          Ask me anything about Aayushi's
          experience, technical skills,
          project work, education and career journey.
        </p>

        <button className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </main>
  );
}