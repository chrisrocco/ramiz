import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('location')
export class Location {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

}
