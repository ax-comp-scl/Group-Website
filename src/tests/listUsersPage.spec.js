import { expect, test } from '@playwright/test'

async function login(page) {
  await page.goto('/login')
  await page.fill('input[placeholder="Seu e-mail"]', 'admin@admin.com')
  await page.fill('input[placeholder="Sua senha"]', 'admin')
  await page.click('button:has-text("Entrar")')
  await expect(page).toHaveURL('/history')
}

test.describe('Página de Listar Usuários', () => {
  test('barra de pesquisa sem encontrar nenhum usuário', async ({
    page}) => {
    await login(page)

    await page.getByText('Listar usuários').click()
    await expect(page).toHaveURL('admin/users')
    await page.waitForTimeout(1000)
    await page.fill('input[placeholder="Digite para buscar..."]', 'naoepravirusuarioteste')
    await page.waitForTimeout(1500)
    const notFoundMessage = page.locator('p:has-text("Nenhum resultado")')
    await expect(notFoundMessage).toBeVisible()
  })

  test('barra de pesquisa encontrado usuário', async ({
    page}) => {
    await login(page)

    await page.getByText('Listar usuários').click()
    await expect(page).toHaveURL('admin/users')
    await page.waitForTimeout(1000)
    await page.fill('input[placeholder="Digite para buscar..."]', 'admin')
    await page.waitForTimeout(1500)

    const clickVisualizar = page.locator('button:has-text("Visualizar")')
    await expect(clickVisualizar).toBeVisible()
  })



})
