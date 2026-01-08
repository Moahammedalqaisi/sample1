// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { UserService } from '../users/user.service';
// import { User } from '../users/user.entity';

// interface JwtPayload {
//   sub: string;
//   [key: string]: any;
// }

// @Injectable()
// export class CurrentUserMiddleware implements NestMiddleware {
//   constructor(private userService: UserService) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers.authorization;

//     if (authHeader && authHeader.startsWith('Bearer ')) {
//       const token = authHeader.substring(7);

//       try {
//         // Decode the JWT token to get user id
//         const payload = this.decodeToken(token);

//         if (payload && payload.sub) {
//           const user = await this.userService.findById(payload.sub);
//           if (user) {
//             req.currentUser = user;
//           }
//         }
//       } catch (error) {
//         // Token is invalid or expired, continue without setting currentUser
//         console.log('Error decoding token:', error);
//       }
//     }

//     next();
//   }

//   private decodeToken(token: string): JwtPayload | null {
//     try {
//       // Decode JWT without verification (verification happens in AuthGuard)
//       const base64Payload = token.split('.')[1];
//       const payload = Buffer.from(base64Payload, 'base64').toString();
//       return JSON.parse(payload) as JwtPayload;
//     } catch {
//       return null;
//     }
//   }
// }
