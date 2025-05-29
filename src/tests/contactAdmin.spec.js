import { expect, test } from '@playwright/test'

test.describe('Página de Login', () => {
    test('deve informar um email válido e colocar o motivo para o contato', async ({ page }) => {
        await page.goto('/contact');

        await page.fill('input[placeholder="Seu e-mail"]', 'admin@admin.com');
        await page.fill('textarea[placeholder="Digite aqui..."]', 'Não estou conseguindo logar na minha conta');

        await page.click('button:has-text("Enviar")');
        await page.click('button:has-text("OK")');

        await expect(page).toHaveURL('/login');
    }); 
})

test.describe('Página de Login', () => {
    test('Informa um email inválido', async ({ page }) => {
        await page.goto('/contact');

        await page.fill('input[placeholder="Seu e-mail"]', 'a');

        await page.click('button:has-text("Enviar")');

        const errorMessage = page.locator('div[data-slot="error-message"]', { hasText: 'Insira um E-mail válido' });
        await expect(errorMessage).toBeVisible();
    }); 
})