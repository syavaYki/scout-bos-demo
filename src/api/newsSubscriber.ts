import axios from 'axios';

export function submitNewSubscriber(email: string) {
  const fullUrl = `${process.env.REACT_APP_REST_FORM_API_BASE_URL}${process.env.REACT_APP_NEWS_SUBSCR_FORM_ID}/feedback`;
  return axios.post(
    fullUrl,
    {
      'your-email': email,
      _wpcf7_unit_tag: `wpcf7-f${155}-234`,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}
