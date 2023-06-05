import { UserList } from '@src/services/models/response';

import { Result, UserListDTO } from '../../dtos';

export class UserListDataMapper {
  constructor() {}

  map(dto: UserListDTO): UserList[] {
    return dto.results.map((item: Result) => {
      return {
        email: item.email,
        id: `${item.id.name}-${item.id.value}`.replace(/\s+/g, ''),
        name: item.name.first + ' ' + item.name.last,
        profileUrlLarge: item.picture.large,
      };
    });
  }
}
