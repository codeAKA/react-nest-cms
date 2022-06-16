import { Document } from 'mongoose';

export interface Article extends Document {
  id: number;
  title?: string;
  paragraphs?: string[];
  images?: string[];
}
