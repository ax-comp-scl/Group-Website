# AXB1-FrontEnd

## Descrição

O **AXB1-FrontEnd** é um projeto de interface do usuário desenvolvido para simular as funcionalidades do sistema desenvolvidos pelos alunos de Engenharia de Software da IFSP São Carlos. O foco deste projeto é criar uma experiência de usuário eficiente e responsiva, utilizando as melhores práticas de desenvolvimento front-end.

## Funcionalidades

- Interface de usuário responsiva e amigável.
- Integração com APIs para obtenção e exibição de dados.
- Componentes reutilizáveis para maior flexibilidade e manutenção.

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica do site.
- **CSS3**: Estilos e layout responsivo.
- **JavaScript (ES6+)**: Lógica de interação e manipulação de dados.
- **Framework/Biblioteca**: React, Django

## Pré-requisitos

Antes de rodar o projeto localmente, certifique-se de ter instalado as seguintes ferramentas:

- [Node.js](https://nodejs.org/) (Versão mínima recomendada: 12.x)
- [Git](https://git-scm.com/) para controle de versão

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone este repositório:
   ```bash
   git clone https://github.com/ax-comp-scl/Group-Website.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd AXB1-FrontEnd
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto, copiando o conteúdo de .env.example:

```bash
cp .env.example .env
```
Você pode editar as variáveis neste arquivo se precisar, mas para a maioria dos casos, o valor padrão é suficiente.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Abra o navegador e acesse: `http://localhost:5173`
