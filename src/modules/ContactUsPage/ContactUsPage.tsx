import { useState } from 'react';
import { ContactUsForm } from '../../components/ContactUsForm';
import { ContactUsFormData } from '../../types/ContactUsForm';
import { useNavigate } from 'react-router-dom';
import { submitContactUsForm } from '../../api/contactUs';
import { ModalSuccess } from '../../components/ModalSuccess';
import { ModalError } from '../../components/ModalError';

export const ContactUsPage = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const hansdleSuccessClose = () => {
    navigate('/');
  };

  const handleErrorClose = () => {
    setShowError(false);
  };

  const handleFormClose = () => {
    navigate('/');
  };

  async function handleFormSubmit(data: ContactUsFormData) {
    const { name, email, phone, message } = { ...data };

    try {
      const response = await submitContactUsForm(name, phone, email, message);

      if (response.data.status !== 'mail_sent') {
        setShowError(true);
      } else {
        setShowSuccess(true);
      }
    } catch (error) {
      setShowError(true);
    }
  }

  return (
    <>
      <ContactUsForm
        showState={true}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />

      <ModalError
        title="Виникла помилка!"
        body="Перевірте введені дані і спробуйте знову, якщо помилка повторюється звяжіться з адміністратором"
        isActive={!!showError}
        onClose={handleErrorClose}
      />

      <ModalSuccess
        title="Ваше повідомлення було успішно відправлено."
        body="Дякую ми мо розглянемо ваше повідомлення і якщо потрібно зв'яжемось з Вами."
        isActive={!!showSuccess}
        onClose={hansdleSuccessClose}
      />
    </>
  );
};
