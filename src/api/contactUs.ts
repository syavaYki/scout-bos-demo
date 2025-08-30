import axios from 'axios';

export function submitContactUsForm(
  name: string,
  phone: string,
  email: string,
  message: string,
) {
  const fullUrl = `${import.meta.env.VITE_REST_FORM_API_BASE_URL}${import.meta.env.VITE_CONTACT_US_FORM_ID}/feedback`;

  return axios.post(
    fullUrl,
    {
      'your-name': name,
      'your-email': email,
      'your-phone': phone,
      'your-message': message,
      _wpcf7_unit_tag: `wpcf7-f${import.meta.env.VITE_CONTACT_US_FORM_ID}-234`,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}
