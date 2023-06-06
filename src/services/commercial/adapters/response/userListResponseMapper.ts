import { Extra, UserList } from '@src/services/models/response';
import { getRandomColor } from '@src/utils';

import { Result, UserListDTO } from '../../dtos';

export class UserListDataMapper {
  constructor() {}

  map(dto: UserListDTO): UserList[] {
    return dto.results.map((item: Result) => {
      let genderExtraColor = getRandomColor();
      let genderBGColor = genderExtraColor + '45';

      const genderExtra: Extra = {
        bodyColor: genderBGColor,
        tag: item.gender,
        textColor: genderExtraColor,
      };

      let phoneTextColor = getRandomColor();
      let phoneBackgroundColor = phoneTextColor + '45';

      const phoneExtra: Extra = {
        bodyColor: phoneBackgroundColor,
        tag: item.phone,
        textColor: phoneTextColor,
      };

      return {
        email: item.email,
        extras: [genderExtra, phoneExtra],
        id: `${item.id.name}-${item.id.value}`.replace(/\s+/g, ''),
        location: item.location.city + ', ' + item.location.country,
        name: item.name.first + ' ' + item.name.last,
        profileUrlLarge: item.picture.large,
      };
    });
  }
}
