import { expect, test } from '@playwright/test'

async function login(page) {
    await page.goto('/login')
    await page.fill('input[placeholder="Seu e-mail"]', 'admin@admin.com')
    await page.fill('input[placeholder="Sua senha"]', 'admin')
    await page.click('button:has-text("Entrar")')
    await expect(page).toHaveURL('/admin/history')
  }


test.describe('Pagina de criar usuário', () => {
    test('realiza o cadastro de um usuario comum', async ({ page }) => {
        await login(page)
        
        await page.goto('/admin/create-user');

        await page.fill('input[aria-label="Nome"]', 'joao12');
        await page.fill('input[aria-label="Email"]', 'joao12@admin.com');
        await page.fill('input[aria-label="Senha"]', '12');

        await page.click('button:has-text("Cadastrar")');

        await page.goto('/admin/users');

        const errorMessage = page.locator('div:has-text("!border-danger")')
        await expect(errorMessage).toBeVisible()
        
    }); 

})