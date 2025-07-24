import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponse<TClass> {

   @ApiProperty()
    total: number;
  
    @ApiProperty()
    limit: number;

    @ApiProperty()
    offset: number;

    @ApiProperty()
    data: TClass[];
  }