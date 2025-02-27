import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsInt()
    @Min(1)
    @Max(5)
    score: number;

    @IsInt()
    @IsNotEmpty()
    productId: number;

}
