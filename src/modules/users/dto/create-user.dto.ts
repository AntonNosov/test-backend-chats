import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator'
import { Roles } from '../constants/Roles'

export class CreateUserDto {
  @ApiProperty({ description: 'First name of user', required: true })
  @IsDefined()
  @Length(1, 50)
  firstName: string

  @ApiProperty({ description: 'Last name of user', required: true })
  @IsDefined()
  @Length(1, 50)
  lastName: string

  @ApiProperty({ description: 'Login of user', required: true })
  @IsDefined()
  @IsNotEmpty()
  login: string

  @ApiProperty({ description: 'Email of user', required: false })
  @IsEmail()
  email: string

  @ApiProperty({ description: 'Password of user', required: true })
  @IsDefined()
  @IsNotEmpty()
  password: string

  @ApiProperty({ description: 'Role of user', required: true, enum: Roles })
  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles
}