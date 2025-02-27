import { createParamDecorator,ExecutionContext } from "@nestjs/common";

export const GetUser=createParamDecorator(

    // excution to access the http request 
    (data:keyof any,ctx:ExecutionContext)=>{

        // gets the current HTTP request object 
        const request= ctx.switchToHttp().getRequest();
        return data? request.user?.[data]:request.user
    }
)