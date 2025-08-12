# Foton - Ecossistema Colaborativo Open Source para AEC

![Foton - Logo Provisório](https://via.placeholder.com/150x80?text=Foton+Logo) Um ecossistema colaborativo e open source dedicado a revolucionar a indústria da Arquitetura, Engenharia e Construção (AEC) no Brasil. O Foton busca otimizar processos, reduzir desperdícios e capacitar profissionais através de tecnologia aberta e uma comunidade engajada.

## 🚀 Visão Geral

Este projeto é a página de apresentação do Ecossistema Foton, detalhando os desafios enfrentados pela indústria AEC, as soluções propostas através de seus três pilares (Tecnologia Aberta, Comunidade Colaborativa e Sustentabilidade Inteligente), e como desenvolvedores e profissionais podem se engajar.

## ✨ Funcionalidades Principais

* **Design Responsivo:** O site se adapta a diferentes tamanhos de tela (desktop, tablet, mobile).
* **Seções Interativas:** Apresentação clara dos problemas da AEC, pilares da solução, metáfora do Foton e formas de contribuição.
* **Gráficos Informativos:**
    * **Gráfico de Distribuição de Planos (Rosquinha):** Ilustra a distribuição de usuários entre os diferentes planos de apoio.
    * **Gráfico de Áreas do Ecossistema (Barras Horizontais):** Mostra o foco de desenvolvimento nas principais áreas do ecossistema (Gestão, Automação, Dados, Educação).
* **Estilos Dinâmicos com Variáveis CSS:** Utilização de variáveis CSS para uma gestão de cores e temas mais eficiente e centralizada.
* **Animações e Transições Suaves:** Melhoram a experiência do usuário.
* **Links para Plataformas:** Acesso direto ao GitHub do projeto e à Comunidade Foton.
* **Integração com Google Analytics:** Para monitoramento de tráfego e comportamento dos usuários.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura base da página.
* **CSS3:** Estilização e layout responsivo.
* **JavaScript:** Interatividade da página, animações e lógica dos gráficos.
* **Chart.js:** Biblioteca JavaScript para criação de gráficos interativos.
* **Font Awesome:** Ícones vetoriais.
* **Google Fonts:** Fontes personalizadas (`Montserrat` e `Roboto`).
* **Google Analytics:** Para tracking e análise de dados.

## 💻 Como Utilizar (Para Desenvolvedores e Colaboradores)

### Pré-requisitos

Você só precisa de um navegador web moderno para visualizar o site. Para desenvolvimento e modificação:

* Um editor de código (VS Code, Sublime Text, etc.).
* Um navegador web para testar as alterações.

### Instalação e Execução Local

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/foton.git](https://github.com/SEU_USUARIO/foton.git) # Substitua SEU_USUARIO pelo seu usuário/organização do GitHub
    cd foton
    ```
2.  **Abra o arquivo:**
    Abra o arquivo `index.html` diretamente no seu navegador. Você pode simplesmente arrastar e soltar o arquivo no seu navegador ou usar a função "Abrir com" do seu sistema operacional.

### Estrutura do Projeto

````

foton/
├── index.html
├── README.md
├── .gitignore
└── ... (outros arquivos/pastas se existirem, ex: assets/, img/, etc.)

````

* `index.html`: Contém toda a estrutura HTML, estilos CSS e scripts JavaScript em um único arquivo para simplicidade.

## ⚙️ Configurações Importantes

### Variáveis CSS

As variáveis CSS são definidas no bloco `:root` no `index.html` e são amplamente utilizadas para a tematização do site e dos gráficos.

```css
:root {
    --primary: #1a56db;
    --primary-dark: #0e2b5c;
    --secondary: #ff6f61;
    --accent: #10b981;
    --light: #f8f9fa;
    --dark: #1f2937;
    --gray: #6b7280;
    --light-gray: #e5e7eb;
}
````

Você pode facilmente ajustar as cores e outros aspectos visuais modificando essas variáveis.

### Gráficos Chart.js

Os gráficos são inicializados no script JavaScript embutido no `index.html`.

  * Para alterar os **dados dos gráficos**, procure pelas variáveis `data` dentro das configurações `new Chart(...)`.

  * Para customizar **cores dos gráficos**, utilize a função `getCssVariable('--nome-da-variavel')` para puxar as cores definidas nas variáveis CSS, garantindo consistência.

    ```javascript
    // Exemplo de uso de variáveis CSS para cores em Chart.js
    backgroundColor: [
        getCssVariable('--accent'),
        // ... outras cores
    ],
    borderColor: [
        getCssVariable('--primary-dark'),
        // ... outras cores
    ],
    ```

### Google Analytics

O Google Analytics está configurado com seu `GA_MEASUREMENT_ID`. Se você for clonar o repositório e usar seu próprio GA, lembre-se de atualizar:

```javascript
gtag('config', 'G-2TXXJW3QG1'); // Altere 'G-2TXXJW3QG1' para o seu ID de medição
```

## 🤝 Como Contribuir

A comunidade Foton é um projeto open source e agradecemos qualquer tipo de contribuição\!

1.  **Fork** o repositório.
2.  **Clone** o seu fork localmente.
3.  Crie uma **nova branch** (`git checkout -b minha-contribuicao`).
4.  Faça suas **alterações** e **commits** (`git commit -m 'Adiciona nova funcionalidade X'`).
5.  Envie suas alterações para o seu fork (`git push origin minha-contribuicao`).
6.  Abra um **Pull Request** para a branch `main` do repositório original.

Por favor, siga as diretrizes de contribuição no arquivo `CONTRIBUTING.md` (se você criar um).

## 🚀 Implantação Contínua (CI/CD)

Seu site está configurado com um webhook no GitHub que se conecta ao seu servidor Hostinger. Isso significa que, após cada push para a branch `main` (ou a branch configurada), as alterações são automaticamente implantadas em seu ambiente de produção na Hostinger, mantendo o site sempre atualizado com a última versão do código.

Para detalhes específicos sobre a configuração do webhook na Hostinger, consulte a documentação da Hostinger ou as configurações do seu servidor.

## 📄 Licença

Este projeto está sob a Licença GPLv3. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

Para dúvidas, sugestões ou colaborações, entre em contato:

  * **Lucas**

  * **Email:** lucas@arqlamp.com

  * **Telefone:** +55 62 98161-3868
  
  * **GitHub:** [LAMP-LUCAS](https://github.com/LAMP-LUCAS)

-----


