import { Order_Item } from "@prisma/client";
import { IsArray, IsNotEmpty, IsNumber, IsString, validate } from "class-validator";

export class UpdateOrderForm {

    @IsNumber()
    public totalPrice?: number

    @IsString()
    public status?: string

    @IsArray()
    public item?: Order_Item

    public itemId?: number

    static from(form?: UpdateOrderForm) {
        const it = new UpdateOrderForm();
        if (form.totalPrice) {
            it.totalPrice = form.totalPrice;
        }
        if (form.status) {
            it.status = form.status;
        }
        if (form.item) {
            it.item = form.item;
        }

        return it;
    }

    static async validate(form: UpdateOrderForm) {
        const errors = await validate(form);
        return errors.length ? errors : false;
    }

}