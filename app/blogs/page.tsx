import Link from 'next/link'
import { blogStore } from './data'

export const dynamic = 'force-dynamic'

interface BlogsPageProps {
  searchParams: Promise<{
    filter?: string
  }>
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  // Resolve the search parameters asynchronously according to modern App Router patterns
  const resolvedParams = await searchParams
  const currentFilter = resolvedParams.filter?.toLowerCase() || ''

  // 1. Filter the blogs array based on the query parameter string match
  const filteredBlogs = blogStore.filter((blog) =>
    blog.title.toLowerCase().includes(currentFilter)
  )

  // 2. Sort the filtered subset in descending order by number of likes (most liked first)
  const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className="py-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Blogs</h1>
          <p className="text-sm text-gray-500 mt-1">Explore and manage your collection</p>
        </div>
        <Link 
          href="/blogs/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all"
        >
          Create New Blog
        </Link>
      </div>

      {/* Polished Modern Search Hub */}
      <form method="GET" action="/blogs" className="relative flex items-center max-w-2xl w-full mb-8 group">
        <div className="relative flex-1">
          {/* Magnifying Glass Icon Layer */}
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            name="filter"
            defaultValue={resolvedParams.filter || ''}
            placeholder="Filter collections by title..."
            className="w-full pl-11 pr-24 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-sm transition-all placeholder-gray-400"
          />

          {/* Inline Context Control Actions */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1.5">
            {resolvedParams.filter && (
              <Link
                href="/blogs"
                className="text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                Clear
              </Link>
            )}
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm active:scale-95 transition-all"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      
      {/* Blogs List Layout */}
      <div className="space-y-4 max-w-2xl">
        {sortedBlogs.length > 0 ? (
          sortedBlogs.map((blog) => (
            <div key={blog.id} className="p-5 border border-gray-100 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-blue-600 hover:underline">
                <Link href={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm my-1.5">
                By: <span className="font-medium text-gray-800">{blog.author}</span>
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <span className="bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-md">
                  👍 {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center border border-dashed rounded-xl bg-gray-50">
            <p className="text-gray-400 font-medium">No results matched "{resolvedParams.filter}"</p>
            <Link href="/blogs" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
              Clear filters and view all blogs
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}