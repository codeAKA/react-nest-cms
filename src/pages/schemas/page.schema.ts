/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Article } from 'src/articles/schemas/article.schema';

export type PageDocument = Page & mongoose.Document;

@Schema()
@ApiTags('pages')
export class Page {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  url: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Article.name }] })
  @ApiProperty()
  articles: Article[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
