import validate from './validateLoginForm';

const translate = () => 'Required';

test('should ensure that username is required', () =>
  expect(
    validate({ password: '1', captchaToken: 'qwerty' }, { translate })
  ).toEqual({
    username: 'Required',
  }));

test('should ensure that password is required', () =>
  expect(
    validate({ username: '1', captchaToken: 'qwerty' }, { translate })
  ).toEqual({
    password: 'Required',
  }));

test('should ensure that captchaToken is required', () =>
  expect(
    validate({ username: '1', password: 'qwerty' }, { translate })
  ).toEqual({
    captchaToken: 'Required',
  }));

test('should have no error messages if all 3 are provided', () =>
  expect(
    validate(
      { username: '1', password: '1', captchaToken: 'qwerty' },
      { translate }
    )
  ).toEqual({}));
