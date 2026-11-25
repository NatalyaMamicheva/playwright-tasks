import { test, expect } from '@playwright/test';

// Тесты для формы входа
test.describe('Параметризованные тесты формы входа', () => {
  const loginTestCases = [
    {
      username: 'admin',
      password: 'admin123',
      expected: 'Успешный вход!',
    },
    {
      username: '',
      password: 'anypassword',
      expected: 'Все поля обязательны',
    },
    {
      username: 'testuser',
      password: '123',
      expected: 'Пароль должен быть не менее 6 символов',
    },
  ];

  // Нужно реализовать параметризованный тест на основе массива loginTestCases
  // Шаги теста:
  // 1. Перейти на страницу формы входа
  // 2. Заполнить поле имени пользователя (если не пустое)
  // 3. Заполнить поле пароля
  // 4. Нажать кнопку "Войти"
  // 5. Проверить сообщение системы
  // 6. Проверить класс сообщения (success/error)

  loginTestCases.forEach(({ username, password, expected }) => {
    test(`Вход в систему под ${username || 'пустое значение'} ${password} с результатом ${expected}`, async ({
      page,
    }) => {
      await page.goto('https://osstep.github.io/parametrize');

      await test.step('Заполнение полей данными', async () => {
        if (username) {
          await page.getByPlaceholder('Имя пользователя').fill(username);
        }
        await page.getByPlaceholder('Пароль').fill(password);
      });

      await test.step('Отправка формы', async () => {
        await page.getByRole('button', { name: 'Войти' }).click();
      });

      await test.step('Проверка результата отправки формы', async () => {
        await expect(page.locator('#message')).toHaveText(expected);
        if (expected === 'Успешный вход!') {
          await expect(page.locator('#message')).toHaveClass('success');
        } else {
          await expect(page.locator('#message')).toHaveClass('error');
        }
      });
    });
  });
});
// Тесты для калькулятора
test.describe('Параметризованные тесты калькулятора', () => {
  const calculatorTestCases = [
    { a: 5, b: 3, operation: 'add', expected: 8 },
    { a: 10, b: 0, operation: 'add', expected: 10 },
    { a: 4, b: 5, operation: 'multiply', expected: 20 },
  ];

  // Нужно реализовать параметризованный тест на основе массива calculatorTestCases
  // Шаги теста:
  // 1. Перейти на страницу калькулятора
  // 2. Ввести первое число
  // 3. Ввести второе число
  // 4. Нажать кнопку операции (сложение/умножение)
  // 5. Проверить результат вычисления

  calculatorTestCases.forEach(({ a, b, operation, expected }) => {
    test(`Калькулятор с числом ${a} с числом ${b} с операцией ${operation} и результатом ${expected}`, async ({
      page,
    }) => {
      await page.goto('https://osstep.github.io/parametrize');

      await test.step('Ввод чисел', async () => {
        await page.getByPlaceholder('Число 1').fill(a.toString());
        await page.getByPlaceholder('Число 2').fill(b.toString());
      });

      await test.step('Операция по числам', async () => {
        if (operation === 'add') {
          await page.getByRole('button', { name: 'Сложить' }).click();
        } else {
          await page.getByRole('button', { name: 'Умножить' }).click();
        }
      });

      await test.step('Получение результата', async () => {
        const res = await page.locator('#result').innerText();
        expect(res).toBe(`Результат: ${expected}`);
      });
    });
  });
});
