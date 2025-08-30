/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Block, Box, Button, Form } from 'react-bulma-components';
import classNames from 'classnames';
import UseUpdateUserProfile from '../../api/updateUserProfile';
import { Loader } from '../../components/Loader';
import { ModalError } from '../../components/ModalError';
import { ErrorLoadAPINotice } from '../../components/ErrorLoadAPINotice';
import { ModalLoader } from '../../components/ModalLoader';
import { ModalSuccess } from '../../components/ModalSuccess';
import { convertDOB, formatOutput } from '../../utils/userManagmentHelper';
import {
  VALID_GRADES,
  VALID_STATES,
} from '../../components/constants/profileConstants';
import { User } from '../../types/User';

type ItemData = {
  fieldName: string;
  data: string | number | null | undefined;
  defaulData: string | number | null | undefined;
  type?: string;
  values?: string[] | number[];
  editable?: boolean;
};

type FormFieldData = {
  firstName: ItemData;
  lastName: ItemData;
  childFirstNameUa: ItemData;
  childLastNameUa: ItemData;
  dob: ItemData;
  plastId: ItemData;
  stupin: ItemData;
  ulad: ItemData;
  phoneNumber: ItemData;
  uaSchooGrade: ItemData;
  usSchooGrade: ItemData;
  adressState: ItemData;
  adressStreet: ItemData;
  adressTown: ItemData;
  adressZipcode: ItemData;
  parent1Email: ItemData;
  parent1FirstName: ItemData;
  parent1LastName: ItemData;
  parent1PhoneNumber: ItemData;
  parent2Email: ItemData;
  parent2FirstName: ItemData;
  parent2LastName: ItemData;
  parent2PhoneNumber: ItemData;
};

type FormEditField = {
  firstName: boolean;
  lastName: boolean;
  childFirstNameUa: boolean;
  childLastNameUa: boolean;
  dob: boolean;
  plastId: boolean;
  stupin: boolean;
  ulad: boolean;
  phoneNumber: boolean;
  uaSchooGrade: boolean;
  usSchooGrade: boolean;
  adressState: boolean;
  adressStreet: boolean;
  adressTown: boolean;
  adressZipcode: boolean;
  parent1Email: boolean;
  parent1FirstName: boolean;
  parent1LastName: boolean;
  parent1PhoneNumber: boolean;
  parent2Email: boolean;
  parent2FirstName: boolean;
  parent2LastName: boolean;
  parent2PhoneNumber: boolean;
};

function createFieldRow(
  key: keyof FormFieldData,
  userItemData: FormFieldData,
  onValChange: React.Dispatch<React.SetStateAction<FormFieldData | undefined>>,
  editState: FormEditField,
  onEdit: React.Dispatch<React.SetStateAction<FormEditField | undefined>>,
) {
  const editSatus = userItemData[key].editable === false ? false : true;

  if (userItemData[key]?.type === 'select') {
    return (
      <Form.Field key={key} horizontal={true} className="is-align-items-center">
        <Form.Field.Label>{userItemData[key].fieldName}</Form.Field.Label>

        <Form.Field.Body>
          <Form.Field kind="addons">
            <Form.Control fullwidth>
              <Form.Select
                color={classNames({
                  info: userItemData[key].data === userItemData[key].defaulData,
                  danger:
                    userItemData[key].data !== userItemData[key].defaulData,
                })}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  onValChange((prev: FormFieldData | undefined) => {
                    if (!prev) {
                      return;
                    }

                    const newData = prev[key];

                    newData.data = e.target.value;

                    return { ...prev, [key]: newData };
                  });
                }}
              >
                <option
                  defaultValue={userItemData[key].data ?? ''}
                  disabled
                  selected
                >
                  {userItemData[key].data ?? ''}
                </option>
                {userItemData[key].values?.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Control>
          </Form.Field>
        </Form.Field.Body>
      </Form.Field>
    );
  }

  return (
    <Form.Field key={key} horizontal={true} className="is-align-items-center">
      <Form.Field.Label>{userItemData[key].fieldName}</Form.Field.Label>

      <Form.Field.Body>
        <Form.Field kind="addons">
          <Form.Control fullwidth>
            <Form.Input
              color={'info'}
              type={userItemData[key].type || 'text'}
              disabled={editState[key]}
              value={userItemData[key].data as string | number | undefined}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onValChange((prev: FormFieldData | undefined) => {
                  if (!prev) {
                    return;
                  }

                  const newData = prev[key];

                  newData.data = e.target.value;

                  return { ...prev, [key]: newData };
                })
              }
            />
          </Form.Control>

          {editSatus && (
            <button
              className={classNames('button', {
                'is-info': editState[key],
                'is-danger': !editState[key],
              })}
              onClick={() => {
                if (!editState[key]) {
                  onValChange((prev: FormFieldData | undefined) => {
                    if (!prev) {
                      return;
                    }

                    const newData = prev[key];

                    newData.data = newData.defaulData;

                    return { ...prev, [key]: newData };
                  });
                }

                onEdit((prev: FormEditField | undefined) => {
                  if (!prev) {
                    return;
                  }

                  return { ...prev, [key]: !editState[key] };
                });
              }}
            >
              {editState[key] ? 'Змінити' : 'Відмінити'}
            </button>
          )}
        </Form.Field>
      </Form.Field.Body>
    </Form.Field>
  );
}

export const UserProfilePage = () => {
  const { user, loading, error } = useAppSelector(state => state.auth);
  const [userData, setUserData] = useState<FormFieldData>();
  const [fieldEdit, setFieldEdit] = useState<FormEditField>();
  const [updateProfile, { loading: loadingUpdate, error: errorUpdate }] =
    UseUpdateUserProfile();
  const [showSubmitedNotice, setShowSubmitedNotice] = useState(false);

  useEffect(() => {
    setFieldEdit({
      firstName: true,
      lastName: true,
      childFirstNameUa: true,
      childLastNameUa: true,
      dob: true,
      plastId: true,
      stupin: true,
      ulad: true,
      phoneNumber: true,
      uaSchooGrade: true,
      usSchooGrade: true,
      adressState: true,
      adressStreet: true,
      adressTown: true,
      adressZipcode: true,
      parent1Email: true,
      parent1FirstName: true,
      parent1LastName: true,
      parent1PhoneNumber: true,
      parent2Email: true,
      parent2FirstName: true,
      parent2LastName: true,
      parent2PhoneNumber: true,
    });

    setUserData({
      plastId: {
        fieldName: 'Пласт ID',
        data: user?.plastId,
        defaulData: user?.plastId,
        editable: false,
      },
      firstName: {
        fieldName: "І'мя дитини (Англійською)",
        data: user?.firstName,
        defaulData: user?.firstName,
      },
      lastName: {
        fieldName: 'Прізвище дитини (Англійською)',
        data: user?.lastName,
        defaulData: user?.lastName,
      },
      childFirstNameUa: {
        fieldName: "І'мя дитини (Українською)",
        data: user?.childFirstNameUa,
        defaulData: user?.childFirstNameUa,
      },
      childLastNameUa: {
        fieldName: 'Прізвище дитини (Українською)',
        data: user?.childLastNameUa,
        defaulData: user?.childLastNameUa,
      },
      dob: {
        fieldName: 'Дата Народження',
        data: convertDOB(user?.dob),
        defaulData: convertDOB(user?.dob),
        type: 'date',
      },
      stupin: {
        fieldName: 'Ступінь',
        data: user?.stupin,
        defaulData: user?.stupin,
        editable: false,
      },
      ulad: {
        fieldName: 'Улад',
        data: user?.ulad,
        defaulData: user?.stupin,
        editable: false,
      },
      phoneNumber: {
        fieldName: 'Мобільний номер дитини',
        data: user?.phoneNumber,
        defaulData: user?.phoneNumber,
        type: 'tel',
      },
      uaSchooGrade: {
        fieldName: 'Клас в школі українознавства',
        data: user?.uaSchooGrade,
        defaulData: user?.uaSchooGrade,
        type: 'select',
        values: VALID_GRADES,
      },
      usSchooGrade: {
        fieldName: 'Клас в щоденній американській школі',
        data: user?.usSchooGrade,
        defaulData: user?.usSchooGrade,
        type: 'select',
        values: VALID_GRADES,
      },
      adressState: {
        fieldName: 'Штат',
        data: user?.adressState,
        defaulData: user?.adressState,
        type: 'select',
        values: VALID_STATES,
      },
      adressStreet: {
        fieldName: 'Вулиця',
        data: user?.adressStreet,
        defaulData: user?.adressStreet,
      },
      adressTown: {
        fieldName: 'Місто',
        data: user?.adressTown,
        defaulData: user?.adressTown,
      },
      adressZipcode: {
        fieldName: 'Поштовий Код',
        data: user?.adressState,
        defaulData: user?.adressState,
        type: 'number',
      },
      parent1Email: {
        fieldName: 'Email батька',
        data: user?.parent1Email,
        defaulData: user?.parent1Email,
        type: 'email',
      },
      parent1FirstName: {
        fieldName: "Ім'я батька",
        data: user?.parent1FirstName,
        defaulData: user?.parent1FirstName,
      },
      parent1LastName: {
        fieldName: 'Прізвище батька',
        data: user?.parent1LastName,
        defaulData: user?.parent1LastName,
      },
      parent1PhoneNumber: {
        fieldName: 'Номер телефону батька',
        data: user?.parent1PhoneNumber,
        defaulData: user?.parent1PhoneNumber,
        type: 'tel',
      },
      parent2Email: {
        fieldName: 'Email мами',
        data: user?.parent2Email,
        defaulData: user?.parent2Email,
        type: 'email',
      },
      parent2FirstName: {
        fieldName: "Ім'я мами",
        data: user?.parent2FirstName,
        defaulData: user?.parent2FirstName,
      },
      parent2LastName: {
        fieldName: 'Прізвище мами',
        data: user?.parent2LastName,
        defaulData: user?.parent2LastName,
      },
      parent2PhoneNumber: {
        fieldName: 'Номер телефону мами',
        data: user?.parent2PhoneNumber,
        defaulData: user?.parent2PhoneNumber,
        type: 'tel',
      },
    });
  }, [user]);

  async function handleSubmit() {
    try {
      const vars: Omit<
        User,
        | 'email'
        | 'username'
        | 'parentSignature'
        | 'headshot'
        | 'roles'
        | 'maxCapabilities'
      > = {
        id: user?.id,
        plastId: Number(userData?.plastId.data),
        firstName: formatOutput(userData?.firstName.data),
        lastName: formatOutput(userData?.lastName.data),
        childFirstNameUa: formatOutput(userData?.childFirstNameUa.data),
        childLastNameUa: formatOutput(userData?.childLastNameUa.data),
        dob: formatOutput(userData?.dob.data),
        ulad: formatOutput(userData?.ulad.data),
        stupin: formatOutput(userData?.stupin.data),
        phoneNumber: formatOutput(userData?.phoneNumber.data),
        uaSchooGrade: formatOutput(userData?.uaSchooGrade.data),
        usSchooGrade: formatOutput(userData?.usSchooGrade.data),
        adressState: formatOutput(userData?.adressState.data),
        adressStreet: formatOutput(userData?.adressStreet.data),
        adressTown: formatOutput(userData?.adressTown.data),
        adressZipcode: formatOutput(userData?.adressZipcode.data),
        parent1Email: formatOutput(userData?.parent1Email.data),
        parent1FirstName: formatOutput(userData?.parent1FirstName.data),
        parent1LastName: formatOutput(userData?.parent1LastName.data),
        parent1PhoneNumber: formatOutput(userData?.parent1PhoneNumber.data),
        parent2Email: formatOutput(userData?.parent2Email.data),
        parent2FirstName: formatOutput(userData?.parent2FirstName.data),
        parent2LastName: formatOutput(userData?.parent2LastName.data),
        parent2PhoneNumber: formatOutput(userData?.parent2PhoneNumber.data),
      };
      const { data, errors } = await updateProfile({
        variables: vars,
      });

      if (errors) {
        console.error('GraphQL errors:', errors);
      } else if (data) {
        setShowSubmitedNotice(true);
      }
    } catch (error2) {
      console.error('Error updating profile:', error2);
    }

    if (fieldEdit) {
      Object.keys(fieldEdit).forEach(key => {
        fieldEdit[key as keyof FormEditField] = true;
      });
    }
  }

  if (loading) {
    return <Loader />;
  }

  function handleSubmitNoticeClose() {
    setShowSubmitedNotice(false);
  }

  return (
    <>
      {!error ? (
        <>
          <ModalLoader isActive={loadingUpdate} />
          <ModalError
            title="Виникла помилка!"
            body={`Будь ласка перевірте введені дані і спробуте знову,
    якщо помилка повториться зв'яжіться з адміністратором.`}
            isActive={Boolean(errorUpdate)}
          />

          <ModalSuccess
            title="Успішно відправлено."
            body={`Вашу аплікацію було успішно відправленна,
              адиіністрація зв'яжеться з вами.`}
            isActive={showSubmitedNotice}
            onClose={handleSubmitNoticeClose}
          />

          <Block>
            <Box>
              {!!userData &&
                !!fieldEdit &&
                Object.keys(userData).map(key => {
                  return createFieldRow(
                    key as keyof FormFieldData,
                    userData,
                    setUserData,
                    fieldEdit,
                    setFieldEdit,
                  );
                })}
            </Box>

            <Button
              size={'medium'}
              color={'danger'}
              fullwidth
              rounded
              onClick={() => {
                handleSubmit();
              }}
            >
              Відправити
            </Button>
          </Block>
        </>
      ) : (
        <ErrorLoadAPINotice />
      )}
    </>
  );
};
