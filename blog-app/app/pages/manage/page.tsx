'use client'

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { api } from '../../lib/api'
import type { Blog } from '../../types/blog'

const emptyForm: Blog = {
  Title: '',
  Author: '',
  Category: 'Tech',
  Content: '',
}

type FormState = {
  Title: string
  Author: string
  Category: Blog['Category']
  Content: string
}

const createFormState = (blog?: Partial<Blog>): FormState => ({
  Title: blog?.Title ?? '',
  Author: blog?.Author ?? '',
  Category: blog?.Category ?? 'Tech',
  Content: blog?.Content ?? '',
})

const Page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [formData, setFormData] = useState<FormState>(createFormState())
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchBlogs = async () => {
    try {
      const response = await fetch(api.blog)
      if (!response.ok) throw new Error('Failed to fetch blogs')
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error(error)
      alert('Unable to load blogs.')
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.Title.trim() || !formData.Author.trim() || !formData.Content.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    setLoading(true)

    try {
      const url = editingId ? `${api.blog}/${editingId}` : api.blog
      const method = editingId ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Request failed')

      await fetchBlogs()
      setFormData(createFormState())
      setEditingId(null)
      alert(editingId ? 'Blog updated successfully.' : 'Blog created successfully.')
    } catch (error) {
      console.error(error)
      alert('Unable to save the blog.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id ?? null)
    setFormData(createFormState(blog))
  }

  const handleDelete = async (id?: number) => {
    if (!id) return

    if (!window.confirm('Delete this blog?')) return

    try {
      const response = await fetch(`${api.blog}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Delete failed')

      setBlogs((prev) => prev.filter((blog) => blog.id !== id))
      alert('Blog deleted successfully.')
    } catch (error) {
      console.error(error)
      alert('Unable to delete the blog.')
    }
  }

  return (
    <div className='min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8 font-sans'>
      <div className='mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8'>
        <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
          <div>
            <h1 className='text-3xl font-extrabold tracking-tight text-black'>Manage Blogs</h1>
            <p className='mt-2 text-sm text-slate-600'>Update or delete your published posts.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='mt-8 space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5'>
          <div className='grid gap-5 md:grid-cols-2'>
            <label className='block'>
              <span className='mb-2 block text-sm font-medium text-black'>Title</span>
              <input
                type='text'
                name='Title'
                value={formData.Title}
                onChange={handleChange}
                placeholder='Enter blog title'
                className='w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              />
            </label>

            <label className='block'>
              <span className='mb-2 block text-sm font-medium text-black'>Author</span>
              <input
                type='text'
                name='Author'
                value={formData.Author}
                onChange={handleChange}
                placeholder='Your name'
                className='w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              />
            </label>
          </div>

          <label className='block'>
            <span className='mb-2 block text-sm font-medium text-slate-700'>Category</span>
            <select
              name='Category'
              value={formData.Category}
              onChange={handleChange}
              className='w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            >
              <option value='Tech'>Tech</option>
              <option value='LifeStyle'>LifeStyle</option>
              <option value='Food'>Food</option>
              <option value='Fashion'>Fashion</option>
              <option value='Science'>Science</option>
              <option value='Finance'>Finance</option>
              <option value='Culture'>Culture</option>
            </select>
          </label>

          <label className='block'>
            <span className='mb-2 block text-sm font-medium text-black'>Content</span>
            <textarea
              name='Content'
              value={formData.Content}
              onChange={handleChange}
              rows={10}
              placeholder='Write your blog here...'
              className='min-h-55 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300'
          >
            {loading ? 'Saving...' : editingId ? 'Update Blog' : 'Create Blog'}
          </button>
        </form>

        <div className='mt-8 space-y-4'>
          {blogs.length === 0 ? (
            <p className='rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600'>No blogs yet.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <h3 className='text-lg font-semibold text-slate-900'>{blog.Title}</h3>
                  <span className='rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700'>
                    {blog.Category}
                  </span>
                </div>
                <p className='mt-2 text-sm text-slate-600'>By {blog.Author}</p>
                <p className='mt-3 whitespace-pre-line text-sm text-black'>{blog.Content}</p>
                <div className='mt-4 flex gap-3'>
                  <button
                    onClick={() => handleEdit(blog)}
                    className='rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className='rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Page