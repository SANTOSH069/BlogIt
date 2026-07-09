const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080';

export const api = {
  blog: `${API_BASE_URL}/blog`,
};
