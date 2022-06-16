import { Article } from 'src/articles/entities/article.entity';

export class Section {
  constructor(
    public id: string,
    public articles: Article[],
    public title?: string,
  ) {}
}
