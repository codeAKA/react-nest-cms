import { Article } from 'src/articles/entities/article.entity';
export class Page {
  id: string;
  title: string;
  url: string;
  articles: Article[];
}
