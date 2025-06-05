import { expect, test } from '@playwright/test'

async function login(page) {
    await page.goto('/login')
    await page.fill('input[placeholder="Seu e-mail"]', 'admin@admin.com')
    await page.fill('input[placeholder="Sua senha"]', 'admin')
    await page.click('button:has-text("Entrar")')
    await expect(page).toHaveURL('/history')
  }


test.describe('Teste de navegação do menu', () => {
    test('Navegando no menu', async ({ page }) => {
        await login(page)
        
        await page.getByText('Criar Usuário').click()
        await expect(page).toHaveURL('/admin/create-user')

        await page.getByText('Listar usuários').click()
        await expect(page).toHaveURL('/admin/users')
        
        await page.getByText('Carregar dados').click()
        await expect(page).toHaveURL('admin/upload/ontologies')

        await page.getByText('Histórico').click()
        await expect(page).toHaveURL('/history')
    }); 

    test('Teste do avatar - conectado como', async ({ page }) => {
        await login(page)
        
        const avatar = page.locator('span[aria-label="avatar"]');
        await expect(avatar).toBeVisible();
        await avatar.click();
        await page.waitForTimeout(2000)
        
        const txtConect = page.getByText('Conectado como', {exact: false})
        await expect(txtConect).toBeVisible()
    }); 

    test('Teste do avatar - sair', async ({ page }) => {
        await login(page)
        
        await page.locator('span[aria-label="avatar"]').click({ force: true });
        const txtSair = page.getByText('Sair', {exact: true})
        txtSair.click();
        await expect(page).toHaveURL('/login')
    }); 
})
