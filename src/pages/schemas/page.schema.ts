/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Section } from 'src/sections/schema/section.schema';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sections' }] })
  @ApiProperty()
  sections: Section[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
