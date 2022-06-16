/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
@ApiTags('article')
export class Article {
  @Prop()
  @ApiProperty()
  title: string;

  @Prop([String])
  @ApiProperty()
  paragraphs: string[];

  @Prop([String])
  @ApiProperty()
  images: string[];
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
