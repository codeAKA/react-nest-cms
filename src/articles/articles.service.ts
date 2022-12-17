import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Model } from 'mongoose';
// import { Article } from './entities/article.entity';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  public async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = await this.articleModel.create(createArticleDto);
    // const section = new this.sectionModel(createSectionDto);
    // section.populate('articles');
    return article;
  }

  public async findAll(): Promise<Article[]> {
    return await this.articleModel.find();
  }

  public async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById({ _id: id }).exec();

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return article;
  }

  public async update(id: string, updateSectionDto: UpdateArticleDto) {
    const article = await this.articleModel.findByIdAndUpdate(
      { _id: id },
      updateSectionDto,
    );

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return article;
  }

  public async remove(id: string): Promise<any> {
    const deletedArticle = await this.articleModel.findByIdAndRemove(id);
    return deletedArticle;
  }
}
