import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        return data;
        // return deepMapObject(data, (value) => {
        //   if (value.__entity === 'User') userResponseSerializer(value as User);
        //   return value;
        // });
      }),
    );
  }
}
