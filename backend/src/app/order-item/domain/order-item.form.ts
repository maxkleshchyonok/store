import { IsNotEmpty, IsNumber, validate } from "class-validator"

export class OrderItemForm {
    // @IsNotEmpty()
    // @IsNumber()
    // public orderId: number

    @IsNotEmpty()
    @IsNumber()
    public productId: number

    @IsNotEmpty()
    @IsNumber()
    public quantity: number

    @IsNotEmpty()
    @IsNumber()
    public price: number

    static from(form?: OrderItemForm) {
        const it = new OrderItemForm();
        //it.orderId = form?.orderId;
        it.productId = form?.productId;
        it.quantity = form?.quantity;
        it.price = form?.price;
        return it;
    }

    static async validate(form: OrderItemForm) {
        const errors = await validate(form);
        return errors.length ? errors : false;
    }

}