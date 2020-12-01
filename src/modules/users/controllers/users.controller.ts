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
import { User as UserInfo } from '../../../common/decorators/user.decorator'
import { QueryFailedExceptionFilter } from '../../../common/exception-filters/query-failed.exception-filter'
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../../common/guards/roles.guard'
import { FindAllInterceptor, FindOneInterceptor, CreateOneInterceptor } from '../../../common/interceptors'
import { ValidationPipe } from '../../../common/validations/validation.pipe'
import { getAdminRoles, getAllRoles } from '../constants/Roles'
import { CreateUserDto, UpdateUserDto, UserQueryParamsDto } from '../dto'
import { User } from '../entities/users.entity'
import { UserUpdateInterceptor } from '../interceptors/user-update.interceptor'
import { User as UserInterface } from '../interfaces/users.interface'
import { UsersService } from '../services/users.service'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(QueryFailedExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @Roles(getAdminRoles())
  @UseInterceptors(FindAllInterceptor)
  findAll(@Query(ValidationPipe) query: UserQueryParamsDto): Promise<[ User[], number ]> {
    const preparedQuery = UsersService.prepareQueryParams(query)
    return this.usersService.findAll(preparedQuery)
  }

  @Get('whoami')
  @Roles(getAllRoles())
  whoAmI(@UserInfo() user: UserInterface): UserInterface {
    return user
  }

  @Get(':id')
  @Roles(getAdminRoles())
  @UseInterceptors(FindOneInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findById(id)
  }

  @Post()
  @Roles(getAdminRoles())
  @UseInterceptors(CreateOneInterceptor)
  create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<InsertResult> {
    return this.usersService.createOne(createUserDto)
  }

  @Put(':id')
  @Roles(getAllRoles())
  @UseInterceptors(FindOneInterceptor, UserUpdateInterceptor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateOne(id, updateUserDto)
  }
}