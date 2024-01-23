import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
export declare class JwtGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean;
    private verifyAccessToken;
}