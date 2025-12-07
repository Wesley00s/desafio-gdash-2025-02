import { ApiProperty } from '@nestjs/swagger';

class DiameterInfo {
   @ApiProperty()
   estimated_diameter_min: number;
   @ApiProperty()
   estimated_diameter_max: number;
}

class EstimatedDiameter {
   @ApiProperty({ type: DiameterInfo })
   kilometers: DiameterInfo;
}

class RelativeVelocity {
   @ApiProperty()
   kilometers_per_hour: string;
}

class MissDistance {
   @ApiProperty()
   kilometers: string;
}

class CloseApproachData {
   @ApiProperty()
   close_approach_date: string;

   @ApiProperty({ type: RelativeVelocity })
   relative_velocity: RelativeVelocity;

   @ApiProperty({ type: MissDistance })
   miss_distance: MissDistance;
}

class PageInfo {
   @ApiProperty()
   size: number;
   @ApiProperty()
   total_elements: number;
   @ApiProperty()
   total_pages: number;
   @ApiProperty()
   number: number;
}

export class NasaAsteroid {
   @ApiProperty({ example: '2465633' })
   id: string;

   @ApiProperty({ example: '(2016 CA138)' })
   name: string;

   @ApiProperty({ example: false })
   is_potentially_hazardous_asteroid: boolean;

   @ApiProperty({ type: EstimatedDiameter })
   estimated_diameter: EstimatedDiameter;

   @ApiProperty({ type: [CloseApproachData] })
   close_approach_data: CloseApproachData[];
}

// DTO de Resposta Principal
export class NasaResponseDto {
   @ApiProperty({ type: [NasaAsteroid] })
   near_earth_objects: NasaAsteroid[];

   @ApiProperty({ type: PageInfo })
   page: PageInfo;
}
