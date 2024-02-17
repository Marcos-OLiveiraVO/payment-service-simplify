import { profileClient } from '@prisma/client';
import { ProfileClient } from 'src/modules/profileClient/application/entities/profileClient';

export class ProfileClientMapper {
  static toDomain(entity: profileClient): ProfileClient {
    return new ProfileClient(
      {
        email: entity.email,
        name: entity.name,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      entity.id,
    );
  }
}
