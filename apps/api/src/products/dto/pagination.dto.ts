import { Type } from 'class-transformer';

export class Pagination {
    @Type(() => Number)
    page: number;
}
