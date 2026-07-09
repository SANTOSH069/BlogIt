# Blog Application

A full-stack blogging platform where users can create, manage, and publish blog posts.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org)
- **Backend:** [NestJS](https://nestjs.com)
- **Database:** [PostgreSQL](https://www.postgresql.org)
- **ORM:** [TypeORM](https://typeorm.io)

## Features

- 📝 Create new blog posts (`/create`)
- ✏️ Update or delete your own blog posts (`/manage`)
- 🔐 User-based ownership of blogs
- 📚 View published blogs

## Project Structure

```
.
├── frontend/          # Next.js app
│   ├── app/
│   │   ├── create/    # Create blog page
│   │   └── manage/    # Manage (update/delete) blog page
│   └── ...
└── backend/           # NestJS app
    ├── src/
    │   ├── blogs/      # Blog module (controller, service, entity)
    │   ├── users/      # User module
    │   └── ...
    └── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL running locally or remotely
- npm / yarn / pnpm / bun

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Backend Setup (NestJS)

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=blog_db
JWT_SECRET=your_jwt_secret
PORT=4000
```

Run database migrations (if applicable):

```bash
npm run typeorm:migration:run
```

Start the backend server:

```bash
npm run start:dev
```

The backend will be running at [http://localhost:4000](http://localhost:4000).

### 3. Frontend Setup (Next.js)

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Navigate to `/create` to write and publish a new blog post.
- Navigate to `/manage` to view, update, or delete blogs you've created.

## API Overview

| Method | Endpoint         | Description                  |
|--------|------------------|-------------------------------|
| POST   | `/blogs`         | Create a new blog post        |
| GET    | `/blogs`         | Get all blog posts            |
| GET    | `/blogs/:id`     | Get a single blog post        |
| PATCH  | `/blogs/:id`     | Update a blog post             |
| DELETE | `/blogs/:id`     | Delete a blog post             |

> Update this table to match your actual NestJS controller routes.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## Deployment

- **Frontend:** Deploy easily on [Vercel](https://vercel.com/new).
- **Backend:** Deploy on platforms like [Railway](https://railway.app), [Render](https://render.com), or a VPS with Docker.

## License

This project is licensed under the MIT License.