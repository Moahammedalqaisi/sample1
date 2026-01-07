// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { UsersModule } from '../users/users.module';
// import { jwtConstants } from './constants';
// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(async () => {
//     const fakeUserRepoService = {};

//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         UsersModule,
//         JwtModule.register({
//           global: true,
//           secret: jwtConstants.secret,
//           signOptions: { expiresIn: '60s' },
//         }),
//       ],
//       providers: [
//         AuthService,
//         {
//           provide: 'IUserRepository',
//           useValue: fakeUserRepoService,
//         },
//         {
//           provide: 'IUserService',
//           useValue: fakeUserRepoService,
//         },
//       ],
//     }).compile();

//     service = module.get<AuthService>(AuthService);
//   });

//   // it('should be defined', () => {
//   //   expect(service).toBeDefined();
//   // });
// });
