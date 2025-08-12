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

    constructor(instances : TClass[]){
      this.total = instances.length;
      this.limit = 0;
      this.offset = 0;
      this.data = instances;
    }

  }