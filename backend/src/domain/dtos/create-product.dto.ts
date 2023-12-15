import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    public name: string

    @IsNotEmpty()
    @IsString()
    public description: string

    @IsNotEmpty()
    @IsNumber()
    public amount: number

    @IsNotEmpty()
    @IsNumber()
    public price: number

    @IsNotEmpty()
    @IsString()
    public category: string

    @IsArray()
    @ArrayMinSize(3, {message: 'Min amount of images: 3'})
    public images: string[]

}
