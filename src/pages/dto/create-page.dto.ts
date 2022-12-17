import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UpdateArticleDto } from 'src/articles/dto/update-article.dto';
import { Article } from 'src/articles/schemas/article.schema';

@ApiTags('pages')
export class CreatePageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  articles: Array<Article | UpdateArticleDto>;
}
