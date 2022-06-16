/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Article, ArticleSchema } from 'src/articles/schemas/article.schema';

export type SectionDocument = Section & mongoose.Document;

@Schema()
@ApiTags('sections')
export class Section {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  title: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Article.name }] })
  // @Prop({ type: [ArticleSchema], default: [] })
  @ApiProperty()
  @Type(() => Article)
  articles: Article[];
}
export const SectionSchema = SchemaFactory.createForClass(Section);
// SectionSchema.virtual('articles', {
//   ref: Article.name,
//   localField: Article.name,
//   foreignField: 'article',
// });
