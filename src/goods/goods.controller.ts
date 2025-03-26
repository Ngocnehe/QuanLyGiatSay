import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { Roles } from 'src/auth/decorator/role.decorator';
// import { Role } from 'src/auth/decorator/role.enum';
// import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
// import { RoleAuthGuard } from 'src/auth/guards/role-jwt.guard';
import { CreateGoodsDto } from './dto/create_goods.dto'; 
import { UpdateGoodsDto } from './dto/update_goods.dto'; 
import { Goods } from 'src/goods/model/goods.schema';
import { GoodsService } from './goods.service'; 
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

// @UseGuards(JwtAuthGuard, RoleAuthGuard)
// @Roles(Role.ADMIN, Role.USER)
@Controller('goods') 
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}
  //Lấy tất cả 
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get('')
  getAllGetName() {
    return this.goodsService.findAllGetName();
  }
  //Lấy tất cả 
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const goods = await this.goodsService.findAll(params.page, params.limit, params.sort as 'asc' | 'desc', params.keyword);

    const rootGoods = goods.filter((goods) => {
      return goods.id_cuahang === null;
    });

    return buildPagination<Goods>(goods, params, rootGoods);
  }
  // Tạo 
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() goods: CreateGoodsDto) {
    const newGoods = await this.goodsService.create(goods);
    return {
      message: 'Tạo hàng hóa thành công.',
      goods: newGoods,
    };
  }
  // Lấy theo id
  // @UseGuards(JwtAuthGuard)
  //   @Roles(Role.ADMIN)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.goodsService.findOne(id);
  }

  // Cập nhật 
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() goods: UpdateGoodsDto) {
    const updatedGoods = await this.goodsService.update(id, goods);
    return {
      message: `Cập nhật thông tin hàng hóa thành công.`,
      updatedGoods,
    };
  }

  // Xóa hàng hóa
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.goodsService.delete(id);
    return {
      message: `Xóa hàng hóa có ID thành công.`,
      deletedId: id,
    };
  }

  // Cập nhật trạng thái hàng hóa
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: boolean,
  ) {
    const updatedStatus = await this.goodsService.updateStatus(id, status);
    return {
      message: `Cập nhật trạng thái hàng hóa có thành công.`,
      updatedStatus,
    };
  }
}
