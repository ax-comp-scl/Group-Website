import { test, expect } from '@playwright/test';


async function login(page) {
  await page.goto('/login');
  await page.fill('input[placeholder="Seu e-mail"]', 'admin@admin.com');
  await page.fill('input[placeholder="Sua senha"]', 'admin');
  await page.click('button:has-text("Entrar")');
  await expect(page).toHaveURL('/admin/history');
}

test.describe('Página de Listar Usuários', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.click('button[data-slot="trigger"]');
    await page.waitForSelector('li[data-key="Listar usuários"]');
    await page.click('li[data-key="Listar usuários"]');
  });
  
  test('deve exibir uma mensagem de carregamento enquanto os dados são buscados', async ({ page }) => {
    await page.goto('/admin/users');
  
    await page.fill('input[placeholder="Digite para buscar..."]', 'testuser');
  
    const loadingMessage = page.locator('p:has-text("Carregando...")');
    await expect(loadingMessage).toBeVisible();
  });
  
  test('deve exibir os resultados da busca corretamente', async ({ page }) => {
    await page.goto('/admin/users');
    
    const userCards = page.locator('div.flex.flex-col.z-0.rounded-xl.border-2.w-full.max-w-sm');
    await expect(userCards).toHaveCount(1);
  });
  
  test('deve exibir uma mensagem quando nenhum resultado é encontrado', async ({ page }) => {
    await page.goto('/admin/users');
  
    await page.fill('input[placeholder="Digite para buscar..."]', 'nonexistentuser');
  
    const noResultsMessage = page.locator('p:has-text("Nenhum resultado foi encontrado para \\"nonexistentuser\\"")');
    await expect(noResultsMessage).toBeVisible();
  });
})