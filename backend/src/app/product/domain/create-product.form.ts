import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayMinSize, validate } from "class-validator"

export class CreateProductForm {
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
    @ArrayMinSize(3, { message: 'Min amount of images: 3' })
    public images: string[]

    static from(form?: CreateProductForm) {
        const it = new CreateProductForm;
        it.name = form?.name;
        it.description = form?.description;
        it.price = form?.price;
        it.amount = form?.amount;
        it.images = form?.images;
        it.category = form?.category;
        return it;
    }

    static async validate(form: CreateProductForm) {
        const errors = await validate(form);
        return errors.length ? errors : false;
    }
}