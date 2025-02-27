
import { IsBoolean } from 'class-validator';

export class UpdateCommentDto  {

    @IsBoolean()
    isAccept: boolean;

}
