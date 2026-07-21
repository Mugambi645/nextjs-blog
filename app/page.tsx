import Link from "next/link"

export default function Home() {
  return (
    <div className="py-16 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Welcome to the Blog
      </h1>
      <p className="mt-4 text-lg text-gray-500">
        A collection of articles worth reading, shared and curated by the community.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/blogs"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all"
        >
          Browse Blogs
        </Link>
        <Link
          href="/blogs/new"
          className="border border-gray-200 hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          Create New Blog
        </Link>
      </div>
    </div>
  );
}
