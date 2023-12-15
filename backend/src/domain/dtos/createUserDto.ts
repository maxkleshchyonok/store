import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    public email: string

    @IsNotEmpty()
    @IsString()
    @Length(10, 25, { message: 'Name length has to be between 10 and 25 chars' })
    public name: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 20, { message: 'Password has to be between 8 and 20 chars' })
    public password: string
}