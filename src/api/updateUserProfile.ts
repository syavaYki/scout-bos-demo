import { gql, useMutation } from '@apollo/client';

const USER_UPDATE = gql`
  mutation updateProfileData(
    $id: ID!
    $plastId: Int
    $firstName: String
    $lastName: String
    $childFirstNameUa: String
    $childLastNameUa: String
    $dob: String
    $stupin: String
    $ulad: String
    $phoneNumber: String
    $uaSchooGrade: String
    $usSchooGrade: String
    $adressState: String
    $adressStreet: String
    $adressTown: String
    $adressZipcode: String
    $parent1Email: String
    $parent1FirstName: String
    $parent1LastName: String
    $parent1PhoneNumber: String
    $parent2Email: String
    $parent2FirstName: String
    $parent2LastName: String
    $parent2PhoneNumber: String
  ) {
    updateUserAcfFields(
      input: {
        id: $id
        plastId: $plastId
        childFirstNameUa: $childFirstNameUa
        childLastNameUa: $childLastNameUa
        dob: $dob
        ulad: $ulad
        stupin: $stupin
        phoneNumber: $phoneNumber
        uaSchooGrade: $uaSchooGrade
        usSchooGrade: $usSchooGrade
        adressState: $adressState
        adressStreet: $adressStreet
        adressTown: $adressTown
        adressZipcode: $adressZipcode
        parent1Email: $parent1Email
        parent1FirstName: $parent1FirstName
        parent1LastName: $parent1LastName
        parent1PhoneNumber: $parent1PhoneNumber
        parent2Email: $parent2Email
        parent2FirstName: $parent2FirstName
        parent2LastName: $parent2LastName
        parent2PhoneNumber: $parent2PhoneNumber
      }
    ) {
      success
    }
    updateUser(input: { firstName: $firstName, lastName: $lastName, id: $id }) {
      clientMutationId
    }
  }
`;

export default function updateUserProfile() {
  return useMutation(USER_UPDATE, {
    // No need to refetch here; you're getting the updated user in the mutation response
    onError: error => {
      // Use the provided 'error' parameter
      console.error('Update mutation error:', error);
    },
  });
}
