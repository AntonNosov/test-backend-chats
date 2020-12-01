import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value
    const object = plainToClass(metatype, value)
    const errors = await validate(object, {
      skipMissingProperties: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
    for (const error of errors) {
      if (error.children) continue
      error.children = []
    }
    if (errors.length > 0) throw new BadRequestException(`Validation failed. ${ errors }`)
    return value
  }

  protected toValidate(metatype: Function): boolean {
    const types: Function[] = [ String, Boolean, Number, Array, Object ]
    return !types.includes(metatype)
  }
}