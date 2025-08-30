import React, { useState } from 'react';
import { IntakeForm } from '../../components/IntakeForm';
import { submitIntakeForm } from '../../api/newIntake';
import { ModalError } from '../../components/ModalError';
import { ModalSuccess } from '../../components/ModalSuccess';
import { ModalLoader } from '../../components/ModalLoader';

export const IntakeFormPage = () => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [permitSubmition, setPermitSubmition] = useState(true);

  const handleErrorClose = () => {
    setShowError(false);
  };

  async function handleSubmit(dt: FormData) {
    setLoading(true);

    try {
      const response = await submitIntakeForm(dt);

      if (response.data.status !== 'mail_sent') {
        setShowError(true);
        setLoading(false);
      } else {
        setShowSuccess(true);
        setPermitSubmition(false);
        setLoading(false);
      }
    } catch (error) {
      setShowError(true);
      setLoading(false);
    }
  }
  return (
    <>
      {showError && (
        <ModalError
          title="Виникла помилка!"
          body="Будь ласка перевірте введені дані і спробуте знову, якщо помилка повториться зв'яжіться з адиіністратором."
          isActive={showError}
          onClose={handleErrorClose}
        />
      )}

      {showSuccess && (
        <ModalSuccess
          title="Успішно відправлено."
          body="Вашу аплікацію було успішно відправленна, адиіністрація зв'яжеться з вами."
          isActive={showSuccess}
        />
      )}

      <IntakeForm
        showState={true}
        permitSubmition={permitSubmition}
        onSubmit={handleSubmit}
      />

      {loading && <ModalLoader />}
    </>
  );
};
