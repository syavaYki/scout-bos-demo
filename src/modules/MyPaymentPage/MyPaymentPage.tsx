import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Block, Box, Columns, Form, Heading } from 'react-bulma-components';
import { ModalError } from '../../components/ModalError';
import { ModalSuccess } from '../../components/ModalSuccess';
import { ModalLoader } from '../../components/ModalLoader';
import PayPalComponent from '../../components/PayPalComponent/PayPalComponent';

enum PaymentTypes {
  yearly = 'Річний платіж',
  trip = 'Оплата за подорож',
  other = 'Інша оплати',
}

export const MyPaymentPage = () => {
  const { user } = useAppSelector(state => state.auth);
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentTypes>(
    PaymentTypes.yearly,
  );
  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState(70);
  const [comment, setComment] = useState('');
  const [otherVal, setOtherVal] = useState<number>(0);
  const [otherValSelDisbale, setOtherValSelDisbale] = useState(true);
  const [loading] = useState(false);
  const [error, setError] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  return (
    <>
      <ModalLoader isActive={loading} />

      <ModalError
        title="Error"
        body={error}
        isActive={!!error}
        onClose={() => setError('')}
      />

      <ModalSuccess
        title="Success"
        body={`Успішний платіж за ${selectedPaymentType} коричтувач ${user?.firstName + ' ' + user?.lastName} in amount of ${selectedPaymentAmount}. ${comment && ` Додаткова інформація: ${comment}`}`}
        isActive={paymentCompleted}
        onClose={() => setPaymentCompleted(false)}
      />

      <Box className="is-flex is-flex-direction-column is-align-items-center">
        <Heading weight="bold">Оплата</Heading>
        <Block>
          <Block className="is-flex">
            <Heading subtitle className="pr-2">
              Користувач:
            </Heading>
            <Heading
              subtitle
              spaced
            >{`${user?.firstName} ${user?.lastName}`}</Heading>
          </Block>

          <Columns>
            <Columns.Column size={'half'}>
              <Form.Field>
                <Form.Label>Виберіть що платити</Form.Label>

                <Form.Control>
                  <Form.Select
                    size={'medium'}
                    name="payment-type"
                    onChange={e =>
                      setSelectedPaymentType(e.target.value as PaymentTypes)
                    }
                  >
                    {Object.values(PaymentTypes).map(value => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Label>Додаткова Інформація</Form.Label>

                <Form.Control>
                  <Form.Textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  ></Form.Textarea>
                </Form.Control>
              </Form.Field>
            </Columns.Column>

            <Columns.Column size={'half'}>
              <Form.Field></Form.Field>

              <Form.Field>
                <Form.Label>Виберіть суму оплати</Form.Label>

                <Form.Control>
                  <Form.Radio
                    value="70"
                    name="story-radio-name"
                    checked={selectedPaymentAmount === 70 && otherValSelDisbale}
                    onChange={() => {
                      setOtherValSelDisbale(() => true);
                      setSelectedPaymentAmount(() => 70);
                    }}
                  >
                    $70.00
                  </Form.Radio>
                </Form.Control>

                <Block>
                  <Form.Control>
                    <Form.Radio
                      checked={
                        !otherValSelDisbale || selectedPaymentAmount !== 70
                      }
                      onChange={() => {
                        setOtherValSelDisbale(() => false);
                        setSelectedPaymentAmount(otherVal);
                      }}
                    >
                      Інша сума
                    </Form.Radio>
                  </Form.Control>

                  <Form.Control>
                    <Form.Input
                      value={otherVal}
                      disabled={otherValSelDisbale}
                      type="number"
                      onChange={e => {
                        const val = Number(e.target.value);

                        setOtherVal(val);
                        setSelectedPaymentAmount(val);
                      }}
                    />
                  </Form.Control>
                </Block>
              </Form.Field>
            </Columns.Column>

            <Columns.Column>
              <PayPalComponent
                onAction={() =>
                  setError(
                    'Вибачте це функція ще в розробці, спробуйте пізніше',
                  )
                }
              />
            </Columns.Column>
          </Columns>
        </Block>
      </Box>
    </>
  );
};
