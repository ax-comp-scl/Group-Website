import { expect, test } from '@playwright/test'

async function login(page) {
  await page.goto('/login')
  await page.fill('input[placeholder="Seu e-mail"]', 'admin@admin.com')
  await page.fill('input[placeholder="Sua senha"]', 'admin')
  await page.click('button:has-text("Entrar")')
  await expect(page).toHaveURL('/history')
}

async function criarUsuario(page) {
  
  await page.getByText('Criar Usuário').click()
  await expect(page).toHaveURL('admin/create-user')

  await page.fill('input[placeholder="Nome"]', 'teste')
  await page.waitForTimeout(1000)
  await page.fill('input[placeholder="Nome"]', 'teste@gmail.com')
  await page.waitForTimeout(1000)
  await page.fill('input[placeholder="Nome"]', 'qateste')
  await page.waitForTimeout(1000)

  await page.getByText('Criar Usuário').click()
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

  test('editando email invalido/valido de usuario ', async ({
    page}) => {
    await login(page)

    await criarUsuario(page)

    await page.getByText('Listar usuários').click()
    await expect(page).toHaveURL('admin/users')
    await page.waitForTimeout(1000)
    await page.fill('input[placeholder="Digite para buscar..."]', 'teste')
    await page.waitForTimeout(1500)

    page.locator('button:has-text("Editar")').click()
    const editBlock= page.locator('button:has-text("Editando usuário")')
    await expect(editBlock).toBeVisible()

    await page.fill('input[placeholder="Email"]', 'email_invalido')
    await page.waitForTimeout(1500)
    
  })


})
