# Project Feedback & Future Improvements

This document outlines key technical suggestions, optimizations, and potential features noticed during development of the blog application. The goal is to capture ideas while they're fresh and give the team a clear, prioritized roadmap for future iterations.

## 🚀 1. Technical Enhancements & Performance

* **Database Optimization**: Add indexes on high-query foreign keys — particularly `authorId` on the `blogs` table — to speed up lookups when fetching a user's posts on `/manage`.
* **Caching Strategy**: Introduce Redis for heavily read TypeORM endpoints (e.g., the public blog list on the home page) to reduce repeated DB hits.
* **N+1 Query Fixes**: Convert repository calls that fetch blogs with author/user relations into query builders with explicit joins.

  ```ts
  // Before
  const blogs = await this.blogRepo.find({ relations: ['author'] });

  // After
  const blogs = await this.blogRepo
    .createQueryBuilder('blog')
    .leftJoinAndSelect('blog.author', 'author')
    .getMany();
  ```

* **Pagination**: Add cursor or offset-based pagination to blog list endpoints instead of returning all rows at once.

## 🛠️ 2. Code Quality & DX (Developer Experience)

* **Global Interceptors**: Implement a global serialization interceptor to clean up API responses and strip sensitive fields (e.g., password hashes) automatically.
* **Strict Type Safety**: Enforce stricter DTO validation rules (`class-validator` decorators) across incoming payloads for `/create` and `/manage` routes.
* **Centralized Error Handling**: Add a global exception filter so error responses follow one consistent shape across the API.
* **Environment Config Validation**: Validate `.env` variables on startup using `@nestjs/config` with a Joi schema, so misconfiguration fails fast instead of silently at runtime.

## 💡 3. Future Feature Recommendations

* **Audit Logging**: Implement a TypeORM subscriber to automatically track entity mutations (create/update/delete) on blogs for accountability.
* **Automated Testing**: Expand e2e test coverage specifically for edge cases in the blog service — unauthorized updates/deletes, empty payloads, and duplicate titles.
* **Draft & Publish States**: Add a `status` field (`draft` / `published`) so users can save work-in-progress posts before publishing.
* **Rich Text / Markdown Support**: Allow markdown or a WYSIWYG editor in `/create` instead of plain text.
* **Image Uploads**: Support cover images for blogs via S3 or Cloudinary integration.
* **Search & Filtering**: Add full-text search (Postgres `tsvector` or a lightweight Elasticsearch setup) for blog titles/content.

## 📌 Prioritization

**Quick Wins (low effort, high value)**
- Add DB indexes on foreign keys
- Global exception filter
- Stricter DTO validation
- Pagination on blog list endpoints

**Long-term Goals (higher effort, bigger payoff)**
- Redis caching layer
- Audit logging via subscribers
- Draft/publish workflow
- Full-text search
- Expanded e2e test coverage

---

*Note: These are suggestions for future growth, not critiques of the current implementation — the core app already works well end-to-end. Feel free to treat this as a backlog to pull from as time allows.*