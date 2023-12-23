import { Injectable } from "@nestjs/common";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, validate } from "class-validator";
import { OrderItemForm } from "src/app/order-item/domain/order-item.form";

@Injectable()
export class CreateOrderForm {

    @IsNotEmpty()
    @IsString()
    public userId: string

    @IsArray()
    @ArrayNotEmpty()
    items: OrderItemForm

    static from(form?: CreateOrderForm) {
        if (!form) {
            return;
        }
        const it = new CreateOrderForm();
        it.userId = form.userId;
        it.items = form.items;
        return it;
    }

    static async validate(form: CreateOrderForm) {
        const errors = await validate(form);
        return errors.length ? errors : false;
    }
}