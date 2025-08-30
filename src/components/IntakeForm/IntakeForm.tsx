import { useRef, FormEvent } from 'react';
import {
  Form,
  Button,
  Columns,
  Container,
  Heading,
  Block,
} from 'react-bulma-components';

type Props = {
  showState?: boolean;
  permitSubmition?: boolean;
  onSubmit: (data: FormData) => void;
};

export const IntakeForm: React.FC<Props> = ({
  showState = true,
  permitSubmition = true,
  onSubmit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const form = formRef.current;
      const formDataCaptured = new FormData(form);

      onSubmit(formDataCaptured);
    }
  };

  return (
    <>
      {showState && (
        <Container className="is-max-desktop  p-5">
          <Heading size={3} className="has-text-centered pt-5 pb-2">
            Картка впису до Пласту станиця Lindenhurst
          </Heading>

          <form onSubmit={handleSubmit} ref={formRef}>
            <Columns>
              <Columns.Column size={6}>
                <Form.Field>
                  <Form.Label>І&apos;мя дитини (Українською)</Form.Label>

                  <Form.Control>
                    <Form.Input
                      type="text"
                      name="child-first-name-ua"
                      required
                    />
                  </Form.Control>
                </Form.Field>
              </Columns.Column>

              <Columns.Column size={6}>
                <Form.Field>
                  <Form.Label>Прізвище дитини (Українською)</Form.Label>

                  <Form.Control>
                    <Form.Input
                      type="text"
                      name="child-last-name-ua"
                      required
                    />
                  </Form.Control>
                </Form.Field>
              </Columns.Column>
            </Columns>

            <Columns>
              <Columns.Column size={6}>
                <Form.Field>
                  <Form.Label>І&apos;мя дитини (English)</Form.Label>
                  <Form.Control>
                    <Form.Input type="text" name="child-first-name-eng" />
                  </Form.Control>
                </Form.Field>
              </Columns.Column>

              <Columns.Column size={6}>
                <Form.Field>
                  <Form.Label>Прізвище дитини (English)</Form.Label>
                  <Form.Control>
                    <Form.Input type="text" name="child-last-name-eng" />
                  </Form.Control>
                </Form.Field>
              </Columns.Column>
            </Columns>

            <Form.Field className="is-flex is-align-items-center">
              <Form.Label className="pr-5">Дата народження</Form.Label>
              <Form.Control>
                <Form.Input type="date" name="dob" />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Columns>
                <Columns.Column size={5}>
                  <Form.Label>Клас в щоденній американській школі</Form.Label>
                </Columns.Column>

                <Columns.Column>
                  <Form.Control>
                    <select name="us-schoo-grade">
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </Form.Control>
                </Columns.Column>
              </Columns>
            </Form.Field>

            <Form.Field>
              <Columns>
                <Columns.Column size={5}>
                  <Form.Label>Клас в школі українознавства</Form.Label>
                </Columns.Column>

                <Columns.Column>
                  <Form.Control>
                    <select name="ua-schoo-grade">
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </Form.Control>
                </Columns.Column>
              </Columns>
            </Form.Field>

            <Columns className="mt-4">
              <Columns.Column size={7} className="mt-auto">
                <Form.Field>
                  <Form.Label>
                    Електрона пошта для реєстарцій рахунку (бажано дитини, якщо
                    є)
                  </Form.Label>

                  <Form.Control>
                    <Form.Input type="email" name="your-email" />
                  </Form.Control>
                </Form.Field>
              </Columns.Column>

              <Columns.Column size={5} className="mt-auto">
                <Form.Field>
                  <Form.Label>Мобільний номер дитини </Form.Label>

                  <Form.Control>
                    <Form.Input type="tel" name="phone-number" />
                  </Form.Control>
                </Form.Field>
              </Columns.Column>
            </Columns>

            <div className="py-5">
              <Heading subtitle>Адреса</Heading>

              <Form.Field>
                <Form.Label>Вулиця</Form.Label>
                <Form.Control>
                  <Form.Input type="text" name="adress-street" />
                </Form.Control>
              </Form.Field>

              <div className="is-flex is-justify-content-space-between">
                <Form.Field>
                  <Form.Label>Місто</Form.Label>

                  <Form.Control>
                    <Form.Input type="text" name="adress-town" />
                  </Form.Control>
                </Form.Field>

                <Form.Field>
                  <Form.Label>Поштовий Код</Form.Label>

                  <Form.Control>
                    <Form.Input type="text" name="adress-zipcode" />
                  </Form.Control>
                </Form.Field>

                <Form.Field>
                  <Form.Label>Штат</Form.Label>

                  <Form.Control>
                    <Form.Input type="text" name="adress-state" />
                  </Form.Control>
                </Form.Field>
              </div>
            </div>

            <div className="py-5">
              <Columns>
                <Columns.Column>
                  <Form.Field>
                    <Form.Label>Ім&apos;я батька</Form.Label>

                    <Form.Control>
                      <Form.Input type="text" name="parent1-first-name" />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>

                <Columns.Column>
                  <Form.Field>
                    <Form.Label>Прізвище батька</Form.Label>

                    <Form.Control>
                      <Form.Input type="text" name="parent1-last-name" />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>
              </Columns>

              <Columns>
                <Columns.Column size={7}>
                  <Form.Field>
                    <Form.Label>Email батька</Form.Label>

                    <Form.Control>
                      <Form.Input type="email" name="parent1-email" />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>

                <Columns.Column>
                  <Form.Field>
                    <Form.Label>Номер телефону батька</Form.Label>

                    <Form.Control>
                      <Form.Input type="tel" name="parent1-phone-number" />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>
              </Columns>
            </div>

            <div className="py-5">
              <Columns>
                <Columns.Column>
                  <Form.Field>
                    <Form.Label>Ім&apos;я мами</Form.Label>

                    <Form.Control>
                      <Form.Input type="text" name="parent2-first-name" />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>

                <Columns.Column>
                  <Form.Field>
                    <Form.Label>Прізвище мами</Form.Label>

                    <Form.Control>
                      <Form.Input type="text" name="parent2-last-name" />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>
              </Columns>

              <Columns>
                <Columns.Column size={7}>
                  <Form.Field>
                    <Form.Label>Email мами</Form.Label>

                    <Form.Control>
                      <Form.Input type="email" name="parent2-email" />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>

                <Columns.Column>
                  <Form.Field>
                    <Form.Label>Номер телефону мами</Form.Label>

                    <Form.Control>
                      <Form.Input type="tel" name="parent2-phone-number" />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>
              </Columns>
            </div>

            <div>
              <Block>
                <Heading subtitle className="mt-3 mb-1">
                  Заява батьків:
                </Heading>

                <ol>
                  <li className="ml-6 py-2">
                    Знаю загально ідейні основи та виховні цілі Українського
                    Пласту й даю свою згоду на вступлення мого сина / моєї
                    доньки до УСО Пласт в США.
                  </li>

                  <li className="ml-6 py-2">
                    Знаю, що передумовою приналежності до Пласту є знання
                    української мови. Заявляю, що моя дитина знає українську
                    мову та доложу всіх зусиль, щоби вона її плекала та вивчала
                    українознавство.
                  </li>

                  <li className="ml-6 py-2">
                    Знаю, що реґулярна участь у приписаних зайняттях і таборах є
                    основним виховним засобом та доложу всіх зусиль, щоб інші
                    зайняття моєї дитини були відповідно укладені.
                  </li>
                </ol>

                <Heading subtitle className="mt-5 mb-1">
                  Рівночасно зобов’язуюся подбати про те, щоб мій син / моя
                  донька:
                </Heading>

                <ol>
                  <li className="ml-6 py-2">
                    Ходив/-ла до Школи українознавства.
                  </li>

                  <li className="ml-6 py-2">
                    Приходив/-ла точно на усі пластові зайняття.
                  </li>

                  <li className="ml-6 py-2">
                    Додержувався/-лася Правил поведінки в домівці і на
                    зайняттях.
                  </li>

                  <li className="ml-6 py-2">
                    Платив/-ла свої членські внески в приписаному часі в сумі
                    $120
                  </li>

                  <li className="ml-6 py-2">
                    Дістав/-ла впродовж найближчих двох місяців повний пластовий
                    однострій
                  </li>

                  <li className="ml-6 py-2">
                    Брав/-ла участь в літніх пластових таборах.
                  </li>
                </ol>
              </Block>

              <Form.Field>
                <Form.Label>Підпис батьків / опікунів</Form.Label>
                <Form.Control>
                  <Form.Input type="text" name="parent-signature" required />
                </Form.Control>

                <p>
                  Прошу поставити ваше Прізвище та Імя, що дорівнює вашому
                  підпису.
                </p>
              </Form.Field>
            </div>

            <Form.Field className="mt-5">
              <Form.Control>
                <Button
                  color="primary"
                  type="submit"
                  disabled={!permitSubmition}
                >
                  Відправити
                </Button>
              </Form.Control>
            </Form.Field>
          </form>
        </Container>
      )}
    </>
  );
};
