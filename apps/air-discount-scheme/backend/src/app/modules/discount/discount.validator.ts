import { IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetDiscountByCodeParams {
  @IsString()
  @Length(10, 10)
  @ApiProperty()
  readonly nationalId: string

  @IsString()
  @Length(8, 8)
  @ApiProperty()
  readonly discountCode: string
}
