import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogStore, likeBlog } from '../data' // Import our shared action

interface BlogPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const blog = blogStore.find((b) => b.id === id)

  if (!blog) {
    notFound()
  }

  return (
    <div className="py-6 max-w-xl">
      <Link href="/blogs" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        ← Back to all blogs
      </Link>

      <div className="bg-white border rounded-xl p-6 shadow-sm mt-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{blog.title}</h1>
        
        <p className="text-gray-600 text-lg mb-4">
          Added by: <span className="font-medium text-gray-800">{blog.author}</span>
        </p>

        <div className="space-y-4 border-t pt-4">
          <div>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
              External Resource URL
            </span>
            <a 
              href={blog.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline break-all block mt-1"
            >
              {blog.url}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg border">
            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase">
                Popularity Metrics
              </span>
              <p className="text-xl font-bold text-gray-800">
                {blog.likes} {blog.likes === 1 ? 'Like' : 'Likes'}
              </p>
            </div>

            {/* INTERACTIVE FORM TRIGGER */}
            <form action={likeBlog}>
              {/* Hidden input field passing the ID context state to the server */}
              <input type="hidden" name="id" value={blog.id} />
              <button
                type="submit"
                className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 active:scale-95 text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition-all"
              >
                👍 Like Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}