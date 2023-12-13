export class User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    hashedPassword: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        name: string,
        email: string,
        roles: string[],
        hashedPassword: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
        this.hashedPassword = hashedPassword;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}