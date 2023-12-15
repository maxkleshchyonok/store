import { IsNotEmpty, IsNumber, validate } from "class-validator";

export class UpdateProductForm {
    @IsNotEmpty()
    @IsNumber()
    public amount: number

    static from(form?: UpdateProductForm) {
        const it = new UpdateProductForm();
        it.amount = form?.amount;
        return it;
    }

    static async validate(form: UpdateProductForm) {
        const errors = await validate(form);
        return errors.length ? errors : false;
    }
}