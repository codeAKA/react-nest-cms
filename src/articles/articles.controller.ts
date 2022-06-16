import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './schemas/article.schema';

@Controller('article')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  public async create(
    @Res() res: any,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    try {
      const article = await this.articlesService.create(createArticleDto);
      return res.status(HttpStatus.OK).json({
        message: 'Article has been created successfully',
        article,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Article not created!',
        status: 400,
      });
    }
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Res() res: any,
    @Param('id') id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    try {
      const article = await this.articlesService.update(id, updateArticleDto);
      if (!article) {
        throw new NotFoundException('Section does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Article has been successfully updated',
        article,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Article not updated!',
        status: 400,
      });
    }
  }

  @Delete(':id')
  public async remove(@Res() res: any, @Param('id') id: number) {
    if (!id) {
      throw new NotFoundException('Article ID does not exist');
    }

    const article = await this.articlesService.remove(id);

    return res.status(HttpStatus.OK).json({
      message: 'Article has been deleted',
      article,
    });
  }
}
