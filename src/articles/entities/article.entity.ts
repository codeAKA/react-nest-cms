import { Document } from 'mongoose';
import { Image } from 'src/common/models/image';
import { Paragraph } from 'src/common/models/paragraph';

export interface Article extends Document {
  id: string;
  title?: string;
  columns?: number;
  contents: Array<Paragraph | Image>;
}
