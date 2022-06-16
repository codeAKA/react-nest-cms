import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Article } from 'src/articles/schemas/article.schema';

@ApiTags('sections')
export class CreateSectionDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  articles: Article[];
}
