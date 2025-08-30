import axios from 'axios';

export function submitIntakeForm(formData: FormData) {
  const fullUrl = `${process.env.REACT_APP_REST_FORM_API_BASE_URL}${process.env.REACT_APP_INTAKE_FORM_ID}/feedback`;
  formData.append(
    '_wpcf7_unit_tag',
    `wpcf7-f${process.env.REACT_APP_INTAKE_FORM_ID}-234`,
  );
  return axios.post(fullUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
