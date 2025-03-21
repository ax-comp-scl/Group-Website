import { test, expect } from '@playwright/test';

test.describe('Página de Login', () => {
  test('deve realizar o login com credenciais válidas', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[placeholder="Seu e-mail"]', 'admin@admin.com');
    await page.fill('input[placeholder="Sua senha"]', 'admin');
  
    await page.click('button:has-text("Entrar")');

    await expect(page).toHaveURL('/admin/history');
  });

  test('deve ser possível acessar da página de login na rota index também (/)', async ({ page }) => {
    await page.goto('/');
  
    const emailInput = page.locator('input[placeholder="Seu e-mail"]');
    await expect(emailInput).toBeVisible();
  
    const passwordInput = page.locator('input[placeholder="Sua senha"]');
    await expect(passwordInput).toBeVisible();
  
    const loginButton = page.locator('button:has-text("Entrar")');
    await expect(loginButton).toBeVisible();
  });

  test('deve exibir uma mensagem de erro contendo "Credenciais inválidas" em caso de erro no login', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[placeholder="Seu e-mail"]', 'teste@gmail.com');
    await page.fill('input[placeholder="Sua senha"]', 'teste123');
  
    await page.click('button:has-text("Entrar")');

    const errorMessage = page.locator('span:has-text("Credenciais inválidas")');
    await expect(errorMessage).toBeVisible();
  });

  test('deve exibir uma mensagem de erro ao tentar enviar o formulário sem preencher os campos', async ({ page }) => {
    await page.goto('/login');
  
    await page.click('button:has-text("Entrar")');
  
    const emailError = page.locator('div[data-slot="error-message"]:has-text("Insira um E-mail válido")');
    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText("Insira um E-mail válido");
    
    const passwordError = page.locator('div[data-slot="error-message"]:has-text("A senha deve ter pelo menos 5 caracteres")');
    await expect(passwordError).toBeVisible();
    await expect(passwordError).toHaveText("A senha deve ter pelo menos 5 caracteres");
  });
  
  test('deve exibir uma mensagem de erro caso o e-mail seja preenchido de maneira inválida', async ({ page }) => {
    await page.goto('/login');
  
    await page.fill('input[placeholder="Seu e-mail"]', 'email_invalido');
    await page.fill('input[placeholder="Sua senha"]', 'senha123');
    
    await page.click('button:has-text("Entrar")');
  
    const emailError = page.locator('div[data-slot="error-message"]:has-text("Insira um E-mail válido")');
    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText("Insira um E-mail válido");
  });
  
  test('deve exibir uma mensagem de erro caso a senha não seja preenchida corretamente (< 5 caracteres)', async ({ page }) => {
    await page.goto('/login');
  
    await page.fill('input[placeholder="Seu e-mail"]', 'teste@exemplo.com');
    await page.fill('input[placeholder="Sua senha"]', '1234');
    
    await page.click('button:has-text("Entrar")');
  
    const passwordError = page.locator('div[data-slot="error-message"]:has-text("A senha deve ter pelo menos 5 caracteres")');
    await expect(passwordError).toBeVisible();
    await expect(passwordError).toHaveText("A senha deve ter pelo menos 5 caracteres");
  });

  test('deve exibir a senha ao clicar no botão do "olhinho"', async ({ page }) => {
    await page.goto('/login');

    const passwordInput = page.locator('input[placeholder="Sua senha"]')
  
    await passwordInput.fill('senha');
    
    await page.click('button[aria-label="toggle password visibility"]');
  
    await expect(passwordInput).toHaveValue('senha');
  });
});
