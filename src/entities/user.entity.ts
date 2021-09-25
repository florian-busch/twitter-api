import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //TODO: muss required sein!
  @Column()
  @Index({ unique: true })
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  location: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @Column()
  verified: boolean;

  @Column()
  followers_count: number;

  @Column()
  friends_count: number;

  @Column()
  listed_count: number;

  @Column()
  favorites_count: number;

  @Column()
  statuses_count: number;

  @Column()
  created_at: String;

  @Column()
  profile_banner_url: string;

  @Column()
  profile_image_url_https: string;

  @Column()
  default_profile: boolean;

  @Column()
  default_profile_image: boolean;

  @Column()
  withheld_in_countries: string;

  @Column()
  withheld_scope: string;
}
