import { IsUUID } from 'class-validator';

export class BulkDeleteDto {
  @IsUUID('4', { each: true })
  ids: string[];
}
