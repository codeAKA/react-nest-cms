import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('article')
export class CreateArticleDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  paragraphs: string[];
  @ApiProperty()
  images: string[];
}
