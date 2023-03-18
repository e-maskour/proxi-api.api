import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from '../../helpers/entity.helper';

@Entity()
export class Status extends EntityHelper {
  @ApiProperty({ example: '1', description: 'Status unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Active', description: 'Status name' })
  @Column()
  name: string;
}
