import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { InsertResult } from 'typeorm'
import { Roles } from '../../../common/decorators/roles.decorator'
import { ListAllEntities } from '../../../common/dto/listall-query-params.dto'
import { QueryFailedExceptionFilter } from '../../../common/exception-filters/query-failed.exception-filter'
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../../common/guards/roles.guard'
import { FindAllInterceptor, FindOneInterceptor, ResultInterceptor } from '../../../common/interceptors'
import { ValidationPipe } from '../../../common/validations/validation.pipe'
import { getAdminRoles, getAllRoles } from '../../users/constants/Roles'
import { CreateBasketDto } from '../dto/create-basket.dto'
import { UpdateBasketDto } from '../dto/update-basket.dto'
import { Basket } from '../entities/basket.entity'
import { BasketsService } from '../services/baskets.service'

@Controller('baskets')
@ApiTags('Baskets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(QueryFailedExceptionFilter)
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {
  }

  @Get()
  @Roles(getAllRoles())
  @UseInterceptors(FindAllInterceptor)
  findAll(@Query(ValidationPipe) query: ListAllEntities): Promise<[ Basket[], number ]> {
    return this.basketsService.findAll(query)
  }

  @Get(':id')
  @Roles(getAllRoles())
  @UseInterceptors(FindOneInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Basket> {
    return this.basketsService.findById(+id)
  }

  @Post()
  @Roles(getAdminRoles())
  @UseInterceptors()
  create(@Body(ValidationPipe) createBasketDto: CreateBasketDto): Promise<InsertResult[]> {
    return this.basketsService.create(createBasketDto)
  }

  @Put(':id')
  @Roles(getAdminRoles())
  @UseInterceptors(FindOneInterceptor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBasketDto: UpdateBasketDto
  ): Promise<Basket> {
    return this.basketsService.update(+id, updateBasketDto)
  }
}