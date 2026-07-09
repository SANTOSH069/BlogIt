export interface Blog {
  id?: number;
  Title: string;
  Author: string;
  Category: 'Tech' | 'LifeStyle' | 'Food' | 'Fashion' | 'Science' | 'Finance' | 'Culture';
  Content: string;
}
