import { Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken() /* aqui se pueden configurar los header si se van a recibir por otro header */,
      ignoreExpiration: false,
      secretOrKey:
        process.env
          .SECRET /* aqui va la clave secreta para extraer el JWT ejemplo process.env.SECRET */,
    });
  }

  async validate(payload: any) {
    console.log('payload');
    
    return { id: payload.id, username: payload.username };
  }
}
