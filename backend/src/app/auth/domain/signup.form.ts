import { IsEmail, IsNotEmpty, IsString, Length, validate } from "class-validator";

export class SignupForm {

    @IsNotEmpty()
    @IsString()
    @Length(10, 25, { message: 'Name length has to be between 10 and 25 chars' })
    public name: string

    @IsEmail()
    public email: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 20, { message: 'Password has to be between 8 and 20 chars' })
    public password: string

    static from(form?: SignupForm) {
        const it = new SignupForm();
        it.email = form?.email;
        it.name = form?.name;
        it.password = form?.password;
        return it;
    }

    static async validate(form: SignupForm) {
        const errors = await validate(form);
        return errors.length ? errors : false;
    }

}