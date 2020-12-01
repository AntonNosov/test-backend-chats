import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from '../../users/interfaces/users.interface'

export class LocalAuthDto {
  @ApiProperty({ description: 'User email', required: true })
  @IsNotEmpty()
  login: string

  @ApiProperty({ description: 'User password', required: true })
  @IsNotEmpty()
  password: string

  @ApiHideProperty()
  @IsOptional()
  user: User
}