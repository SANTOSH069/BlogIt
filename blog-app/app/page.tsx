import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-28">
      <section className="mx-auto max-w-6xl px-6">

        {/* Hero Image */}

        <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-lg">
          <img
            src="/hero.jpg"
            alt="Hero"
            className="h-[500px] w-full object-cover"
          />
        </div>

        {/* Hero Text */}

        <div className="mt-16 flex flex-col items-center text-center">

          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-neutral-900 md:text-7xl">
            Share your ideas,
            <br />
            inspire readers
            <span className="font-serif italic font-normal">
              {" "}
              every day.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            Publish beautiful blogs, tell your stories, build your audience,
            and create content that lasts. A modern blogging platform built
            for creators who love writing.
          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/create"
              className="rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              Get Started
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-neutral-300 px-8 py-4 font-semibold text-black transition hover:bg-neutral-100"
            >
              About Me
            </Link>

          </div>

        </div>
      </section>
    </main>
  );
}