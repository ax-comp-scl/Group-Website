import { expect, test } from '@playwright/test'

async function login(page) {
    await page.goto('/login')
    await page.fill('input[placeholder="Seu e-mail"]', 'admin@admin.com')
    await page.fill('input[placeholder="Sua senha"]', 'admin')
    await page.click('button:has-text("Entrar")')
    await expect(page).toHaveURL('/history')
  }


test.describe('Teste de navegação do menu dropdown/carregamento de dados', () => {
    test('Navegando no menu', async ({ page }) => {
        await login(page)
        
        await page.getByText('Carregar dados').click()
        await expect(page).toHaveURL('admin/upload/ontologies')

        await page.getByRole('button', { name: 'Selecione uma opção' }).click();
        await page.waitForTimeout(1500)
        await page.getByLabel('Organismo', { exact: true }).getByText('Organismo').click()
        await expect(page).toHaveURL('admin/upload/organism')

        await page.getByRole('button', { name: 'Selecione uma opção' }).click();
        await page.waitForTimeout(1500)
        await page.getByLabel('Publicação', { exact: true }).getByText('Publicação').click()
        await expect(page).toHaveURL('admin/upload/publication')

        await page.getByRole('button', { name: 'Selecione uma opção' }).click();
        await page.waitForTimeout(1500)
        await page.getByRole('option', { name: 'FASTA' }).click();
        await expect(page).toHaveURL('admin/upload/fasta')

        await page.getByRole('button', { name: 'Selecione uma opção' }).click();
        await page.waitForTimeout(1500)
        await page.getByRole('option', { name: 'GFF' }).click();
        await expect(page).toHaveURL('admin/upload/gff')


        await page.getByRole('button', { name: 'Selecione uma opção' }).click();
        await page.waitForTimeout(1500)
        await page.getByRole('option', { name: 'Adicional' }).click();
        await expect(page).toHaveURL('admin/upload/additional/annotation')

        await page.getByText('Sequence').click()
        await expect(page).toHaveURL('/admin/upload/additional/sequence')

        await page.getByText('Publication').click()
        await expect(page).toHaveURL('/admin/upload/additional/publication')
        
        await page.getByText('DBxRef').click()
        await expect(page).toHaveURL('admin/upload/additional/dbxref')

        await page.getByText('Annotation').click()
        await expect(page).toHaveURL('/admin/upload/additional/annotation')

        await page.getByRole('button', { name: 'Selecione uma opção' }).click();
        await page.waitForTimeout(1500)
        await page.getByRole('option', { name: 'Similaridade' }).click();
        await expect(page).toHaveURL('admin/upload/similarity')


    }); 



    
})


