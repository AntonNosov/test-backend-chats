import { ApiProperty } from '@nestjs/swagger'
import { IsBooleanString, IsEmail, IsEnum, Length } from 'class-validator'
import { Roles as RolesEnum } from '../constants/Roles'

export class UpdateUserDto {
  @ApiProperty({ description: 'First name of user', required: false })
  @Length(1, 50)
  firstName: string

  @ApiProperty({ description: 'Last name of user', required: false })
  @Length(1, 50)
  lastName: string

  @ApiProperty({ description: 'Login of user', required: false })
  login: string

  @ApiProperty({ description: 'Email of user', required: false })
  @IsEmail()
  email: string

  @ApiProperty({ description: 'Password of user', required: false })
  password: string

  @ApiProperty({ description: 'Role of user', required: false })
  @IsEnum(RolesEnum)
  role: RolesEnum

  @ApiProperty({ description: 'User archiving status', required: false })
  @IsBooleanString()
  deleted: boolean
}