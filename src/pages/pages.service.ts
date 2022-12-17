import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Article, ArticleDocument } from 'src/articles/schemas/article.schema';
@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name)
    private readonly pageModel: Model<PageDocument>,
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  public async create(createPageDto: CreatePageDto): Promise<Page> {
    const page = await this.pageModel.create(createPageDto);
    return page;
  }

  public async findAll(): Promise<Page[]> {
    return await this.pageModel.find();
  }

  public async findOne(id: string): Promise<Page> {
    const page = await this.pageModel.findById(id).populate('articles');
    // const page = await this.pageModel.findById(id);

    // const articles = [];

    // if (!page) {
    //   throw new NotFoundException(`Page #${id} not found`);
    // }

    // for (const article of page.articles) {
    //   const art = await this.articleModel.findById(article);
    //   if (art) {
    //     articles.push(art);
    //     console.log(art);
    //     console.log(articles);
    //   }

    //   // this.articleModel.findByIdAndUpdate(article.id, article);
    // }
    // console.log(articles);

    return page;
  }

  public async update(id: string, updatePageDto: UpdatePageDto) {
    const page = await this.pageModel.findById(id);
    if (!page) {
      throw new NotFoundException(`Page #${id} not found`);
    }
    // page.articles.forEach((article) => {
    //   const art = this.articleModel.findOne({ _id: article.id });
    //   console.log(art);

    //   // this.articleModel.findByIdAndUpdate(article.id, article);
    // });
    for (const article of page.articles) {
      // this.articleModel.findByIdAndUpdate(article.id, article);
      const art = await this.articleModel.findById(article.id);
      if (!art) {
        console.log('No article found');
      }
      // this.articleModel.findByIdAndUpdate(article.id, article);
    }
    this.articleModel.findByIdAndUpdate(id, updatePageDto);
    return `This action updates a #${id} page`;
  }
  // public async update(id: string, updatePageDto: UpdatePageDto) {
  //   const page = await this.pageModel.findById(id);
  //   if (!page) {
  //     throw new NotFoundException(`Page #${id} not found`);
  //   }
  //   for (const article of page.articles) {
  //     const art = await this.articleModel.findById(article.id);
  //     console.log(art);

  //     // this.articleModel.findByIdAndUpdate(article.id, article);
  //   }
  //   return `This action updates a #${id} page`;
  // }

  // {
  //   "_id": "631494187034c87c0b57b8f2",
  //   "name": "Page 1",
  //   "title": "Page 1",
  //   "url": "/page-1",
  //   "articles": [
  //     "title": "Article one"
  //     "id": "631493aa7034c87c0b57b8f0"
  //     "content": "Updated article"
  //   ],
  //   "__v": 0
  // },

  remove(id: string) {
    return `This action removes a #${id} page`;
  }
}

// page to update

// {
//   "id": "631494187034c87c0b57b8f2",
//   "name": "Page 1",
//   "title": "Page 1",
//   "url": "/page-1",
//   "articles": [
//     {
//       "id": "631493aa7034c87c0b57b8f0",
//       "title": "Article 1 - updated from Page service",
//       "columns": 1,
//       "contents": [
//         {
//           "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non magna sed metus tincidunt consequat a sit amet orci. Sed pulvinar augue nunc"
//         }
//       ]
//     }
//   ]
// }
