import { gql, useMutation } from '@apollo/client';

const SEND_EMAIL = gql`
  mutation sendEmail($to: String, $subject: String, $body: String) {
    sendEmail(
      input: {
        from: "admin@plastlindenhurst.org"
        to: $to
        subject: $subject
        body: $body
      }
    ) {
      clientMutationId
      message
      origin
      replyTo
      sent
      to
    }
  }
`;

export default function sendEmailAPI() {
  return useMutation(SEND_EMAIL);
}
