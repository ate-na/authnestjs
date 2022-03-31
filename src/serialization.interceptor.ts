import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

export function Serlize(dto: any) {
  return UseInterceptors(new SerializationInterceptor(dto));
}

@Injectable()
export class SerializationInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((el) => {
        return plainToClass(this.dto, el, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
