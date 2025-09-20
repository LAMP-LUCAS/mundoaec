# **POP: DESENVOLVIMENTO E DEPLOY DO SITE MUNDO AEC**

> **Versão 2.0 — Simplificada e à Prova de Erros**

## **1. Objetivo**
Estabelecer um fluxo de trabalho claro, seguro e eficiente para desenvolvimento, teste e publicação do site `mundoaec.com`, garantindo que apenas código validado e testado seja enviado para produção. O objetivo final é maximizar a estabilidade, performance e confiabilidade do ambiente público, mesmo em uma infraestrutura de hospedagem limitada (Hostinger).

## **2. Escopo**
Aplica-se a todos os colaboradores envolvidos no desenvolvimento, manutenção ou aprovação de mudanças no site `mundoaec.com`.

## **3. Definições e Convenções**

*   **Repositório Principal:** `https://github.com/LAMP-LUCAS/seu-repositorio-mundo-aec`
*   **Branches Principais:**
    *   `main`: Branch principal de desenvolvimento. Todo novo código mergeado aqui passou por revisão.
    *   `staging`: Branch de homologação. Contém o build (`dist/`) gerado a partir de `main`, pronto para testes finais.
    *   `production`: Branch de produção. **Monitorada pela Hostinger.** Seu conteúdo em `dist/` é copiado automaticamente para `public_html/`.
*   **Ferramentas:**
    *   Node.js (versão >= 18.x)
    *   npm ou yarn
    *   Git
    *   Astro CLI

## **4. Configuração Inicial (Feita Uma Única Vez)**

Antes de iniciar qualquer desenvolvimento, configure o projeto para evitar conflitos com a pasta `dist/`:

1.  **Na branch `main`:**
    *   Certifique-se de que o arquivo `.gitignore` na raiz do projeto **contém a linha `/dist`**.
    *   **Crie um novo arquivo:** `dist/.gitignore`.
    *   **Cole o seguinte conteúdo nele:**
        ```
        # Ignora todos os arquivos dentro de 'dist/'
        *
        # Exceto este próprio arquivo .gitignore
        !.gitignore
        ```
    *   Faça commit e push:
        ```bash
        git add .gitignore dist/.gitignore
        git commit -m "chore: configurar .gitignore para branches de deploy"
        git push origin main
        ```

> ✅ **Pronto!** Esta configuração elimina a necessidade de editar manualmente o `.gitignore` nas branches `staging` e `production`. O segredo está no arquivo `dist/.gitignore`, que permite rastrear a pasta `dist/` apenas nessas branches específicas, usando `git add -f`.

## **5. Fluxo de Trabalho**

### **5.1. Desenvolvimento de Nova Funcionalidade ou Correção**

1.  **Atualize sua branch local `main`:**
    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Crie uma branch de feature a partir de `main`:**
    ```bash
    git checkout -b feature/nome-descritivo
    # Ex: git checkout -b feature/novo-carrossel-jornada
    # Ex: git checkout -b bugfix/ajuste-responsivo-mobile
    ```

3.  **Desenvolva e teste localmente:**
    *   Faça suas alterações nos arquivos `.astro`, `.css`, etc.
    *   Teste em tempo real com:
        ```bash
        npm run dev
        ```
    *   Faça commits descritivos e frequentes.

4.  **Submeta um Pull Request (PR):**
    ```bash
    git add .
    git commit -m "feat: adicionar novo carrossel na jornada AEC"
    git push origin feature/nome-descritivo
    ```
    *   No GitHub, crie um PR de `feature/nome-descritivo` para `main`.
    *   Solicite revisão.

5.  **Após Aprovação:**
    *   Faça merge do PR na `main`.
    *   Delete a branch de feature:
        ```bash
        git checkout main
        git branch -d feature/nome-descritivo
        git push origin --delete feature/nome-descritivo
        ```

### **5.2. Preparação para Homologação (`staging`)**

*   **Periodicidade:** Toda **Sexta-feira às 16h** (ou conforme demanda crítica).
*   **Responsável:** Tech Lead ou Desenvolvedor designado.

1.  **Atualize `staging` com o conteúdo de `main`:**
    ```bash
    git checkout staging
    git pull origin staging
    git merge main
    ```

2.  **Gere o build de produção:**
    ```bash
    npm run build
    ```
    > Isso cria/ atualiza a pasta `dist/` com os arquivos estáticos otimizados.

3.  **Adicione a pasta `dist/` forçadamente e faça commit:**
    ```bash
    git add -f dist/
    git commit -m "build(staging): atualização semanal para homologação - $(date +%Y-%m-%d)"
    git push origin staging
    ```

4.  **Homologação:**
    *   Teste o site em `https://staging.mundoaec.com`.
    *   Valide com o Gerente de Produto/Designer.
    *   Se houver falhas, corrija na `main` e repita o processo.

### **5.3. Deploy para Produção (`production`)**

*   **Periodicidade:** Após aprovação da homologação, preferencialmente **Segunda-feira às 9h**.
*   **Gatilho:** Aprovação formal da homologação.

1.  **Atualize `production` com o conteúdo de `staging`:**
    ```bash
    git checkout production
    git pull origin production
    git merge staging
    ```

2.  **(Opcional) Gere o build novamente para garantir integridade:**
    ```bash
    npm run build
    ```

3.  **Adicione a pasta `dist/` forçadamente e faça commit:**
    ```bash
    git add -f dist/
    git commit -m "release: v1.X.X - Deploy de produção - $(date +%Y-%m-%d)"
    git push origin production
    ```

4.  **Verificação Pós-Deploy:**
    *   Acesse `https://mundoaec.com`.
    *   Confirme que as alterações estão visíveis e funcionando.
    *   Monitore por 30 minutos.

## **6. Diagrama do Fluxo Simplificado**

```
[feature/X] --> [PR] --> [main]
                         |
                         | (Merge + Build + git add -f)
                         V
                     [staging] --> (Homologação Aprovada?)
                         |                     |
                         | Sim               Não
                         V                     |
                     [production] <-------- [Correções em main]
                         |
                         | (Webhook da Hostinger)
                         V
                   [public_html/]
                         |
                         V
                   [mundoaec.com]
```

## **7. Boas Práticas e Respostas a Incidentes**

*   **Commits:** Sempre use prefixos (`feat:`, `fix:`, `chore:`, `build:`) e mensagens claras.
*   **Builds Locais:** Nunca envie `staging` ou `production` sem executar `npm run build` localmente primeiro.
*   **Rollback Rápido:**
    Em caso de falha crítica em produção:
    ```bash
    # Reverta o último merge commit
    git revert -m 1 <hash-do-merge-commit-na-production>
    git push origin production
    ```
    Isso cria um novo commit que desfaz as alterações, mantendo o histórico intacto.

*   **Backup Implícito:** O histórico do Git nas branches `staging` e `production` é seu backup. A pasta `dist/` versionada garante que você sempre pode voltar a um estado funcional.
*   **Comunicação:** Mantenha o time informado sobre mudanças significativas, especialmente durante deploys.
*   **Documentação:** Atualize este POP conforme necessário para refletir mudanças no processo ou ferramentas.
