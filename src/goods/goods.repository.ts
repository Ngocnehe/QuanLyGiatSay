import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateGoodsDto } from './dto/create_goods.dto';
import { UpdateGoodsDto } from './dto/update_goods.dto';
import { Goods, GoodsDocument } from './model/goods.schema';

@Injectable()
export class GoodsRepository {
  constructor(@InjectModel(Goods.name) private readonly model: Model<GoodsDocument>) {}

  async create(goods: CreateGoodsDto) {
    const newGoods = new this.model({
      _id: new Types.ObjectId(),
      ...goods,
    });

    return await newGoods.save();
  }

  async findOne(id: string) {
    return await this.model
      .findOne({ _id: id })
      .lean<Goods>(true);
  }

  async updateOne(id: string, goodsOld: Goods, goodsNew: UpdateGoodsDto) {
    const updateGoods = await this.model.findOneAndUpdate({ _id: id }, goodsNew, {
      new: true,
    });

    if (!updateGoods) {
      throw new Error('Không tìm thấy hàng hóa để cập nhật.');
    }

    return updateGoods;
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<Goods>(true);
  }

  async findAll(page: number, limit: number, sort: 'asc' | 'desc', keyword?: string) {
    const filter = keyword
      ? { ten_hanghoa: { $regex: keyword, $options: 'i' } }
      : {};

    return await this.model
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ ten_hanghoa: sort === 'asc' ? 1 : -1 })
      .lean<Goods[]>(true);
  }

  async findAllGetName() {
    return await this.model.find().select('ten_hanghoa').lean<Goods[]>(true);
  }
}
