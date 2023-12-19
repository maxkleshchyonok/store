import { IsNotEmpty, IsNumber, validate } from "class-validator"

export class UpdateOrderItemForm {

    @IsNotEmpty()
    @IsNumber()
    public quantity: number

    static from(form?: UpdateOrderItemForm) {
        const it = new UpdateOrderItemForm();
        it.quantity = form?.quantity;
    }

    static async validate(form: UpdateOrderItemForm) {
        const errors = await validate(form);
        return errors.length ? errors : false;
    }

}