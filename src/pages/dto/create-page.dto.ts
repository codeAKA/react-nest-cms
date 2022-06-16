import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Section } from 'src/sections/schema/section.schema';

@ApiTags('pages')
export class CreatePageDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  sections: Section[];
}
