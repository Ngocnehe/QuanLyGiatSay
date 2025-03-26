import { IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  readonly ten?: string;

  @IsOptional()
  @IsString()
  readonly sodienthoai?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly diachi?: string;

  @IsOptional()
  @IsDateString()
  readonly ngay_sinh?: Date;

  @IsOptional()
  @IsString()
  readonly loai_khach?: string;
}
