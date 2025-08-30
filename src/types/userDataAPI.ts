interface HeadshotNode {
  sourceUrl: string | null;
  [key: string]: unknown; // Allow other properties
}

interface HeadshotEdge {
  node: HeadshotNode | null; // Node itself can be null
  [key: string]: unknown; // Allow other properties
}

export interface ProfileFields {
  usSchooGrade: number | null;
  adressState: string | null;
  adressStreet: string | null;
  adressTown: string | null;
  adressZipcode: string | null;
  dob: string | null;
  plastId: number | null | undefined;
  stupin: string | null | undefined;
  ulad: string | null | undefined;
  parent1Email: string | null;
  parent1FirstName: string | null;
  parent1LastName: string | null;
  parent1PhoneNumber: string | null;
  parent2Email: string | null;
  parent2FirstName: string | null;
  parent2LastName: string | null;
  parent2PhoneNumber: string | null;
  parentSignature: string | null;
  phoneNumber: string | null;
  uaSchooGrade: number | null;
  childLastNameUa: string | null;
  childFirstNameUa: string | null;
  headshot: HeadshotEdge | null; // Headshot can be null
  [key: string]: unknown; // Allow other properties
}

interface UserRole {
  name: string;
  [key: string]: unknown; // Allow other properties
}

interface UserToUserRoleConnection {
  nodes: UserRole[];
  [key: string]: unknown; // Allow other properties
}

interface UserNode {
  databaseId: number;
  firstName: string | null; // firstName and lastName can be null
  lastName: string | null; //
  email: string | null; // email can be null
  username: string;
  profileFields: ProfileFields;
  roles: UserToUserRoleConnection;
  capabilities: string[];
  [key: string]: unknown; // Allow other properties
}

interface RootQueryToUserConnection {
  __typename: 'RootQueryToUserConnection';
  nodes: UserNode[];
}

export interface UserDataAPI {
  users: RootQueryToUserConnection;
}
