import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { blogStore } from '../data'

export default function NewBlogPage() {
  
  // This is the Server Action that runs directly on the backend server upon submission
  async function createBlog(formData: FormData) {
    'use server'

    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const url = formData.get('url') as string

    // Simple validation rule guard
    if (!title || !author || !url) {
      return
    }

    // Append new blog entry to our server store state
    blogStore.push({
      id: Math.random().toString(36).substring(2, 9), // Temporary unique random string ID simulation
      title,
      author,
      url,
      likes: 0
    })

    // CRITICAL FOR PRODUCTION MODE: Instructs Next.js to purge its static build-time cache
    // and re-render /blogs on the next cycle so your update immediately appears.
    revalidatePath('/blogs')
    
    // Send the user back to the updated dashboard view
    redirect('/blogs')
  }

  return (
    <div className="py-6 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>

      <form action={createBlog} className="space-y-4 bg-white p-6 border rounded-lg shadow-sm">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Save Blog
          </button>
        </div>
      </form>
    </div>
  )
}