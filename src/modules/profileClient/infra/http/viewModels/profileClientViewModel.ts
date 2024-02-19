import { ProfileClient } from 'src/modules/profileClient/application/entities/profileClient';

export class ProfileClientViewModel {
  static toHttp(entity: ProfileClient) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
