## 🚀 Guia Passo a Passo: Adotando Astro no Projeto Mundo AEC

Este guia irá te levar da instalação do ambiente até a criação de componentes modulares reutilizáveis, aproveitando toda a potência do Astro.

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

1.  **Node.js** (versão 18.x ou superior). Verifique com:
    ```bash
    node --version
    ```
2.  **npm** (geralmente vem com o Node.js) ou **yarn**.
    ```bash
    npm --version
    # ou
    yarn --version
    ```

### 🛠️ Passo 1: Criar um Ambiente de Desenvolvimento Local

Para manter seu sistema limpo, é altamente recomendável usar um ambiente virtual. Aqui, usaremos `nvm` (Node Version Manager).

#### 1.1 Instalar o `nvm` (se ainda não tiver)

*   **No macOS/Linux:**
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    ```
    Reinicie seu terminal ou execute:
    ```bash
    source ~/.bashrc
    # ou
    source ~/.zshrc
    ```

*   **No Windows:**
    Use o [nvm-windows](https://github.com/coreybutler/nvm-windows).

#### 1.2 Criar e Ativar um Ambiente Virtual com `nvm`

```bash
# Instalar a versão LTS do Node.js
nvm install --lts

# Usar a versão LTS
nvm use --lts

# Verificar
node --version
```

> ✅ Você agora está em um ambiente Node.js isolado e controlado.

---

### 🌠 Passo 2: Inicializar um Novo Projeto Astro

Vamos criar a base do seu projeto Astro.

#### 2.1 Criar o Projeto

Execute o comando de criação do Astro. Ele iniciará um assistente interativo.

```bash
npm create astro@latest
# ou
yarn create astro
```

#### 2.2 Configurar o Assistente

Siga as instruções na tela. Para o Mundo AEC, recomendamos:

*   **Where should we create your new project?** `mundoaec-astro`
*   **How would you like to start your new project?** `❯ Empty` (Vazio, para maior controle)
*   **Do you want me to run `npm install` to install Astro locally?** `Yes, install Astro`
*   **Do you want me to run `npm run dev` to start the dev server?** `Skip` (Vamos configurar primeiro)

#### 2.3 Entrar na Pasta do Projeto

```bash
cd mundoaec-astro
```

---

### 🧩 Passo 3: Estruturar o Projeto e Criar Componentes Modulares

Agora vamos organizar o projeto e criar os componentes principais: `Header`, `Footer`, `Nav`.

#### 3.1 Entendendo a Estrutura de Pastas do Astro

Após a inicialização, sua estrutura será algo como:

```
mundoaec-astro/
├── public/          # Arquivos estáticos (imagens, favicon, etc)
├── src/
│   ├── components/  # Componentes reutilizáveis (AQUI FOCAREMOS)
│   ├── layouts/     # Layouts de página
│   └── pages/       # Suas páginas (cada arquivo .astro vira uma rota)
├── astro.config.mjs # Configuração do Astro
├── package.json
└── tsconfig.json    # Configuração do TypeScript (opcional, mas recomendado)
```

#### 3.2 Criar o Componente `Header.astro`

Crie o arquivo `src/components/Header.astro`.

```astro
---
// src/components/Header.astro
---
<header class="site-header">
    <div class="container header-container">
        <div class="logo">
            <i class="fas fa-lightbulb"></i>
            <span>MUNDO AEC</span>
        </div>
        <Nav />
        <div class="cta-btns">
            <a href="/autosinapi" class="btn">AutoSINAPI</a>
            <a href="/tools" class="btn btn-outline">Ferramentas</a>
        </div>
    </div>
</header>

<style>
    .site-header {
        background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
        color: white;
        padding: 1.5rem 0;
        position: sticky;
        top: 0;
        z-index: 100;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    /* ... adicione outros estilos do seu header aqui ... */
</style>
```

#### 3.3 Criar o Componente `Nav.astro`

Crie o arquivo `src/components/Nav.astro`. Separar a navegação em seu próprio componente aumenta a modularidade.

```astro
---
// src/components/Nav.astro
---
<nav>
    <ul>
        <li><a href="#why">O Porquê</a></li>
        <li><a href="#ecosystem">Ecossistema</a></li>
        <li><a href="#journey">Jornada AEC</a></li>
        <li><a href="/foton">Comunidade</a></li>
        <li><a href="https://github.com/LAMP-LUCAS">GitHub</a></li>
    </ul>
</nav>

<style>
    nav ul {
        display: flex;
        list-style: none;
        gap: 2rem;
    }
    nav a {
        color: white;
        text-decoration: none;
        font-weight: 500;
        font-size: 1.1rem;
        transition: color 0.3s;
    }
    nav a:hover {
        color: var(--secondary);
    }
</style>
```

#### 3.4 Criar o Componente `Footer.astro`

Crie o arquivo `src/components/Footer.astro`.

```astro
---
// src/components/Footer.astro
---
<footer class="site-footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-column">
                <h3>Mundo AEC</h3>
                <p>Tecnologia aberta para toda a cadeia da construção. Um ecossistema integrado de soluções.</p>
            </div>
            <!-- ... adicione as outras colunas do seu footer ... -->
        </div>
        <div class="copyright">
            <p>&copy; 2025 Mundo AEC. Feito com ♥ por uma comunidade que acredita que o futuro da construção é aberto, integrado e acessível.</p>
        </div>
    </div>
</footer>

<style>
    .site-footer {
        background-color: var(--dark);
        color: white;
        padding: 4rem 0 2rem;
    }
    /* ... adicione outros estilos do seu footer aqui ... */
</style>
```

---

### 🏗️ Passo 4: Criar um Layout Base e uma Página Inicial

Vamos criar um layout que servirá de template para todas as páginas, injetando o `Header` e o `Footer`.

#### 4.1 Criar o Layout `src/layouts/Layout.astro`

```astro
---
// src/layouts/Layout.astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

const { title } = Astro.props;
---
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Mundo AEC</title>
    <meta name="description" content="Levamos BIM e tecnologia aberta, do investidor ao usuário final, com ferramentas práticas e acessíveis.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/src/styles/global.css">
    <!-- Google Tag Manager -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-2TXXJW3QG1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-2TXXJW3QG1');
    </script>
</head>
<body>
    <Header />
    <main>
        <slot /> <!-- O conteúdo da página será injetado aqui -->
    </main>
    <Footer />
</body>
</html>
```

#### 4.2 Criar a Página Inicial `src/pages/index.astro`

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
---
<Layout title="Ecossistema de Soluções Integradas">
    <section class="hero">
        <div class="container">
            <h1>Um ecossistema de soluções integradas para transformar a construção civil brasileira.</h1>
            <p>Levamos BIM e tecnologia aberta, do investidor ao usuário final, com ferramentas práticas, acessíveis e feitas pela comunidade.</p>
            <div class="hero-btns">
                <a href="#ecosystem" class="btn">Explorar o Ecossistema</a>
                <a href="/autosinapi" class="btn btn-outline">Testar AutoSINAPI</a>
            </div>
        </div>
    </section>

    <!-- ... adicione as outras seções do seu site aqui ... -->
</Layout>

<style>
    /* Estilos específicos da página inicial podem ir aqui */
    .hero {
        background: linear-gradient(rgba(14, 43, 92, 0.9), rgba(14, 43, 92, 0.95)), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd') center/cover no-repeat;
        color: white;
        padding: 6rem 0;
        text-align: center;
    }
    /* ... */
</style>
```

---

### ▶️ Passo 5: Executar e Testar Localmente

Agora que tudo está configurado, é hora de ver seu site em ação!

#### 5.1 Instalar Dependências (se ainda não fez)

```bash
npm install
```

#### 5.2 Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

#### 5.3 Acessar o Site

Abra seu navegador e acesse `http://localhost:3000` (ou a porta indicada no terminal).

Você verá sua página inicial com o Header e Footer funcionando! Qualquer alteração que você fizer nos arquivos será refletida instantaneamente no navegador, graças ao Hot Module Replacement (HMR) do Astro.

---

### 🎯 Próximos Passos

*   **Migre o CSS:** Copie o conteúdo dos seus arquivos `main.css` e `autosinapi.css` para um novo arquivo `src/styles/global.css` e importe-o no `Layout.astro`.
*   **Crie mais páginas:** Adicione arquivos como `src/pages/autosinapi.astro` ou `src/pages/foton.astro`.
*   **Adicione interatividade:** Transforme seu carrossel em um componente Astro e use diretivas como `client:visible` para torná-lo interativo apenas quando necessário.

*   **Otimize para produção:** Quando estiver pronto, execute `npm run build` para gerar a versão otimizada do site.

---
