import { IsString } from "class-validator";

export class CreateStoryDto {
    @IsString({message:"the title should be a string"})
    title:string
}
