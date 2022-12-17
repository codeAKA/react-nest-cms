import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Image } from 'src/common/models/image';
import { Paragraph } from 'src/common/models/paragraph';

@ApiTags('article')
export class CreateArticleDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  columns?: number;

  @ApiProperty()
  contents: Array<Paragraph | Image>;
}
