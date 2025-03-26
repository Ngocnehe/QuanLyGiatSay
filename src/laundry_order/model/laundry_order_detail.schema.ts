import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
export type LaundryOrderDetailDocument = LaundryOrderDetail & Document;

@Schema({ versionKey: false })
export class LaundryOrderDetail {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'LaundryOrder' })
  id_donhanggiat: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Service', required: true })
  id_dichvu: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Goods', default: null })
  id_hanghoa: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  soluong: number;

  @Prop({ type: Number, required: true, min: 0 })
  gia: number;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  thanhtien: number; // sẽ tính bằng soluong * gia ở service hoặc DTO

  @Prop({ type: String, default: '' })
  ghichu: string;
}

export const LaundryOrderDetailSchema = SchemaFactory.createForClass(LaundryOrderDetail);
