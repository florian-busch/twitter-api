import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [UserModule,
            PassportModule,
            JwtModule.register({
              secret: jwtConstants.secret,
              signOptions: { expiresIn: '60s'}
            }),
          ],
  exports: [AuthService]
})
export class AuthModule {}
