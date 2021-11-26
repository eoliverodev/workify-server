import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as stytch from "stytch"

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const req = context.getArgByIndex(0)
        const res = context.getArgByIndex(1)

        console.log(req.body)

        return true;
    }
}