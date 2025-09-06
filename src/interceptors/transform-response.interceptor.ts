import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SUCCESS_MESSAGE_KEY } from 'src/decorators/success-message/success-message.decorator';

export interface Response<T> {
  data: T;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const successMessage = this.reflector.get<string>(
      SUCCESS_MESSAGE_KEY,
      context.getHandler(),
    )[0];

    return next.handle().pipe(
      map((data: T) => ({
        data,
        message: successMessage,
      })),
    );
  }
}
