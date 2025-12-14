import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sweet, SweetDocument } from './schemas/sweet.schema';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';

@Injectable()
export class SweetsService {
  constructor(@InjectModel(Sweet.name) private sweetModel: Model<SweetDocument>) {}

  async create(createSweetDto: CreateSweetDto): Promise<SweetDocument> {
    const sweet = new this.sweetModel(createSweetDto);
    return sweet.save();
  }

  async findAll(): Promise<SweetDocument[]> {
    return this.sweetModel.find().exec();
  }

  async search(name?: string, category?: string, minPrice?: number, maxPrice?: number): Promise<SweetDocument[]> {
    const query: any = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) {
        query.price.$gte = minPrice;
      }
      if (maxPrice !== undefined) {
        query.price.$lte = maxPrice;
      }
    }

    return this.sweetModel.find(query).exec();
  }

  async findOne(id: string): Promise<SweetDocument> {
    const sweet = await this.sweetModel.findById(id).exec();
    if (!sweet) {
      throw new NotFoundException(`Sweet with ID ${id} not found`);
    }
    return sweet;
  }

  async update(id: string, updateSweetDto: UpdateSweetDto): Promise<SweetDocument> {
    const sweet = await this.sweetModel.findByIdAndUpdate(id, updateSweetDto, { new: true }).exec();
    if (!sweet) {
      throw new NotFoundException(`Sweet with ID ${id} not found`);
    }
    return sweet;
  }

  async remove(id: string): Promise<void> {
    const result = await this.sweetModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Sweet with ID ${id} not found`);
    }
  }

  async purchase(id: string, quantity: number): Promise<SweetDocument> {
    const sweet = await this.findOne(id);
    
    if (sweet.quantity < quantity) {
      throw new BadRequestException('Insufficient quantity in stock');
    }

    sweet.quantity -= quantity;
    return sweet.save();
  }

  async restock(id: string, quantity: number): Promise<SweetDocument> {
    const sweet = await this.findOne(id);
    sweet.quantity += quantity;
    return sweet.save();
  }
}

