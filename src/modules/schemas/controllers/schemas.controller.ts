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
import { getAdminRoles } from '../../users/constants/Roles'
import { CreateSchemaDto } from '../dto/create-schema.dto'
import { UpdateSchemaDto } from '../dto/update-schema.dto'
import { Schema } from '../entities/schema.entity'
import { SchemasService } from '../services/schemas.service'

@Controller('schemas')
@ApiTags('Schemas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(getAdminRoles())
@UseFilters(QueryFailedExceptionFilter)
export class SchemasController {
  constructor(private readonly schemasService: SchemasService) {
  }

  @Get()
  @UseInterceptors(FindAllInterceptor)
  findAll(@Query(ValidationPipe) query: ListAllEntities): Promise<[ Schema[], number ]> {
    return this.schemasService.findAll(query)
  }

  @Get(':id')
  @UseInterceptors(FindOneInterceptor)
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Schema> {
    return this.schemasService.findById(+id)
  }

  @Post()
  @UseInterceptors(ResultInterceptor)
  create(@Body(ValidationPipe) createSchemaDto: CreateSchemaDto): Promise<InsertResult> {
    return this.schemasService.create(createSchemaDto)
  }

  @Put(':id')
  @UseInterceptors(FindOneInterceptor)
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateSchemaDto: UpdateSchemaDto
  ): Promise<Schema> {
    return this.schemasService.update(+id, updateSchemaDto)
  }
}