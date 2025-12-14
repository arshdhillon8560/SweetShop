import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SweetsService } from './sweets.service';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('api/sweets')
@UseGuards(JwtAuthGuard)
export class SweetsController {
  constructor(private readonly sweetsService: SweetsService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createSweetDto: CreateSweetDto) {
    return this.sweetsService.create(createSweetDto);
  }

  @Get()
  findAll() {
    return this.sweetsService.findAll();
  }

  @Get('search')
  search(
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;
    return this.sweetsService.search(name, category, min, max);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sweetsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateSweetDto: UpdateSweetDto) {
    return this.sweetsService.update(id, updateSweetDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.sweetsService.remove(id);
  }

  @Post(':id/purchase')
  purchase(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.sweetsService.purchase(id, body.quantity || 1);
  }

  @Post(':id/restock')
  @UseGuards(AdminGuard)
  restock(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.sweetsService.restock(id, body.quantity);
  }
}

