import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {

    @IsNotEmpty()
    @IsString()
    public userId: string

    
}
