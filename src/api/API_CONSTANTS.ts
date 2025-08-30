export const USER_INFO_QUERY_BODY = `{
      databaseId
      firstName
      lastName
      email
      username
      capabilities
      profileFields {
        usSchooGrade
        adressState
        adressStreet
        adressTown
        adressZipcode
        childLastNameUa
        dob
        plastId
        stupin
        ulad
        parent1Email
        parent1FirstName
        parent1LastName
        parent1PhoneNumber
        parent2Email
        parent2FirstName
        parent2LastName
        parent2PhoneNumber
        parentSignature
        phoneNumber
        uaSchooGrade
        childFirstNameUa
        headshot {
          node {
            sourceUrl
          }
        }
      }
      roles {
        nodes {
          name
        }
      }
    }`;

export const HEADSHOOT_DEFAULT =
  'https://wpapi.plastlindenhurst.org/wp-content/uploads/2025/02/headshot-placeholder-1.png';
