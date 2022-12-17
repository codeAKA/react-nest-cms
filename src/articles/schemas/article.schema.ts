/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Image } from 'src/common/models/image';
import { Paragraph } from 'src/common/models/paragraph';

export type ArticleDocument = Article & mongoose.Document;

@Schema()
@ApiTags('article')
export class Article {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  columns: number;

  @Prop()
  @ApiProperty()
  contents: Array<Paragraph | Image>;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

// {
//   "title": "Title 001",
//   "paragraphs": ["Par 1", "Par 2"],
//   "images": ["Img 1"]
// }

// export const ArticleSchema = new mongoose.Schema({
//   id: String,
//   title: String,
//   paragraphs: [String],
//   images: [String],
// });
