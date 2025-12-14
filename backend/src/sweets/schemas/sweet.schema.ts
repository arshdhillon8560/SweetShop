import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SweetDocument = Sweet & Document;

@Schema({ timestamps: true })
export class Sweet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0, default: 0 })
  quantity: number;

  @Prop({ default: '' })
  imageUrl: string;
}

export const SweetSchema = SchemaFactory.createForClass(Sweet);

