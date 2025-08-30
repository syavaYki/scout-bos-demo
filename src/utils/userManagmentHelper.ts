import { AuthLevels } from '../types/AuthLevels';
import { User } from '../types/User';
import { ProfileFields, UserDataAPI } from '../types/userDataAPI';

export function convertDOB(dateString: string | null | undefined): string {
  if (!dateString) {
    return '';
  }

  return new Date(dateString).toISOString().slice(0, 10);
}

export function getUserByID(id: number, users: User[]): User | undefined {
  return users.find(user => user?.id === id);
}

export function formatOutput(txt: string | number | null | undefined): string {
  if (txt !== null && txt !== 'null') {
    return String(txt);
  }

  return '';
}

export function getMaxCapibility(data: string[]) {
  if (!data) {
    return 0;
  }

  const arr = data
    .filter((cap: string) => cap.startsWith('level'))
    .map((itm: string) => {
      return Number(itm.split('_')[1]);
    });

  if (arr.length > 0) {
    return Math.max(...arr);
  }

  return 0;
}

export function getAccessLevel(
  roles: string[] | null | undefined,
): AuthLevels | undefined {
  if (roles) {
    if (roles.includes('administrator')) {
      return AuthLevels.ADMIN;
    }

    if (roles.includes('author')) {
      return AuthLevels.AUTOR;
    }

    if (roles.includes('plastunsenior')) {
      return AuthLevels.PLASTUN_SENIOR;
    }

    if (roles.includes('plastunSenior')) {
      return AuthLevels.PLASTUN_SENIOR;
    }

    if (roles.includes('plastun')) {
      return AuthLevels.PLASTUN;
    }

    if (roles.includes('vyhovnyk')) {
      return AuthLevels.VYHOVNYK;
    }

    return AuthLevels.PLASTUN;
  }

  return;
}

export function parseUsersAPI(data: UserDataAPI): User[] {
  const users: User[] = [];

  if (data && data?.users?.nodes) {
    data.users.nodes.forEach(userData => {
      const user: User = {
        username: userData?.username,
        id: userData?.databaseId,
        ...(userData?.profileFields &&
          Object.keys(userData.profileFields).reduce(
            (acc: ProfileFields, key) => {
              if (key !== '__typename') {
                return { ...acc, [key]: userData.profileFields[key] };
              }

              return acc;
            },
            {} as ProfileFields,
          )),
        email: formatOutput(userData?.email),
        firstName: formatOutput(userData?.firstName),
        lastName: formatOutput(userData?.lastName),
        uaSchooGrade: formatOutput(userData?.profileFields?.uaSchooGrade),
        usSchooGrade: formatOutput(userData?.profileFields?.usSchooGrade),
        dob: formatOutput(convertDOB(userData?.profileFields?.dob)),
        headshot: formatOutput(
          userData?.profileFields?.headshot?.node?.sourceUrl,
        ),
        roles: userData?.roles?.nodes.map(role => role.name) || [],
        maxCapabilities: getMaxCapibility(userData.capabilities),
      };

      users.push(user);
    });
  }

  return users;
}
