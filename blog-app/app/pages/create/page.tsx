'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { api } from '../../lib/api'
import type { Blog } from '../../types/blog'

const initialForm: Blog = {
  Title: '',
  Author: '',
  Category: 'Tech',
  Content: '',
}

const Page = () => {
  const [formData, setFormData] = useState<Blog>(initialForm)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.Title.trim() || !formData.Author.trim() || !formData.Content.trim()) {
      alert('Please fill in the title, author, and content fields.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(api.blog, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create blog')
      }

      const createdBlog = await response.json()
      setBlogs((prev) => [createdBlog, ...prev])
      setFormData(initialForm)
      alert('Blog created successfully!')
    } catch (error) {
      console.error(error)
      alert('There was an error while creating the blog.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50  px-4 py-10 sm:px-6 lg:px-8 font-sans'>
      <div className='mx-auto max-w-4xl rounded-3xl mt-24 bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8'>
        <h1 className='text-3xl font-extrabold tracking-tight text-black'>Create Blog</h1>
        <p className='mt-2 text-sm text-slate-600'>Write your story and share it with your audience.</p>

        <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
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
              rows={14}
              minLength={30}
              placeholder='Write your blog here...'
              className='min-h-65 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300'
          >
            {loading ? 'Publishing...' : 'Publish Blog'}
          </button>
        </form>

        {blogs.length > 0 && (
          <div className='mt-10 space-y-4'>
            <h2 className='text-xl font-semibold text-slate-800'>Recently Added</h2>
            {blogs.map((blog) => (
              <div key={blog.id ?? `${blog.Title}-${blog.Author}`} className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <h3 className='text-lg font-semibold text-slate-900'>{blog.Title}</h3>
                  <span className='rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700'>
                    {blog.Category}
                  </span>
                </div>
                <p className='mt-2 text-sm text-slate-600'>By {blog.Author}</p>
                <p className='mt-3 whitespace-pre-line text-sm text-black'>{blog.Content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page