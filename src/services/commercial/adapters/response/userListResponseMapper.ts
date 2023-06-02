import { UserList } from '@src/services/models/response';

import { Result, UserListDTO } from '../../dtos';

export class UserListDataMapper {
  constructor() {}

  map(dto: UserListDTO): UserList[] {
    return dto.results.map((item: Result) => {
      const formattedDOB: string = item.dob.date.toString();
      const registeredDate: string = item.registered.date.toString();

      return {
        age: item.dob.age,
        country: item.location.country,
        dob: formattedDOB,
        email: item.email,
        id: `${item.id.name}-${item.id.value}`.replace(/\s+/g, ''),
        name: item.name.first + ' ' + item.name.last,
        profileUrlLarge: item.picture.large,
        profileUrlSmall: item.picture.medium,
        registered: registeredDate,
      };
    });
  }
}
