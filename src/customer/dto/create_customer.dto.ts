import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  readonly ten: string;

  @IsString()
  readonly sodienthoai: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly diachi: string;

  @IsDateString()
  readonly ngay_sinh: Date;

  @IsString()
  readonly loai_khach: string;
}
