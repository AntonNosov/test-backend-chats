import { ApiProperty } from '@nestjs/swagger'
import { IsBooleanString, IsEnum } from 'class-validator'
import { ListAllEntities } from '../../../common/dto/listall-query-params.dto'
import { Roles } from '../constants/Roles'

export class UserQueryParamsDto extends ListAllEntities {
  @ApiProperty({ description: 'User archiving status', default: 'false', required: false })
  @IsBooleanString()
  deleted: boolean

  @ApiProperty({ description: 'User role', required: false })
  @IsEnum(Roles)
  role: Roles
}