import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
import { FindAllInterceptor, FindOneInterceptor, CreateOneInterceptor } from '../../../common/interceptors'
import { ValidationPipe } from '../../../common/validations/validation.pipe'
import { getAdminRoles, getAllRoles } from '../../users/constants/Roles'
import { CreateBallDto } from '../dto/create-ball.dto'
import { Ball } from '../entities/ball.entity'
import { BallsService } from '../services/balls.service'

@Controller('balls')
@ApiTags('Balls')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(QueryFailedExceptionFilter)
export class BallsController {
  constructor(private readonly ballsService: BallsService) {
  }

  @Get()
  @Roles(getAllRoles())
  @UseInterceptors(FindAllInterceptor)
  findAll(@Query(ValidationPipe) query: ListAllEntities): Promise<[ Ball[], number ]> {
    return this.ballsService.findAll(query)
  }

  @Get(':id')
  @Roles(getAllRoles())
  @UseInterceptors(FindOneInterceptor)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Ball> {
    return this.ballsService.findById(+id)
  }

  @Post()
  @Roles(getAllRoles())
  @UseInterceptors(CreateOneInterceptor)
  create(@Body(ValidationPipe) createBallDto: CreateBallDto): Promise<InsertResult> {
    return this.ballsService.create(createBallDto)
  }

  @Delete(':id')
  @Roles(getAdminRoles())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ballsService.remove(+id)
  }
}