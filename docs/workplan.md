# Portal Mundo AEC: visão consolidada e workplan completo

O Mundo AEC existe para propagar um ecossistema de soluções integradas, abertas e inteligentes que levam o BIM de forma acessível a toda a cadeia — do investidor/idealizador ao usuário final, passando por escritório, canteiro e operação/manutenção. Hoje sua home enfatiza a Comunidade Foton e seus pilares; vamos recentralizar o propósito do portal como “hub do ecossistema” e posicionar Foton, AutoSINAPI e Ferramentas como meios para este fim.

---

## Etapa 1: homepage do portal Mundo AEC

### Diretrizes estratégicas
- **Propósito:** Apresentar o “porquê” do Mundo AEC e o mapa do ecossistema (AutoSINAPI + Ferramentas + Comunidade Foton).
- **Mensagem central:** “BIM e tecnologia aberta, simplificados para toda a jornada AEC.”
- **Estrutura de conteúdo:**
  - **Hero:** declaração de propósito + CTA “Explorar o ecossistema”.
  - **O porquê existimos:** dor da AEC brasileira e a proposta de difusão tecnológica aberta.
  - **Ecossistema:** três blocos com links para AutoSINAPI, Ferramentas Web e Comunidade Foton (sem sobrecarregar a Foton na home, mas mantendo presença).
  - **Jornada AEC:** linha do tempo conectando Investidor → Escritório → Canteiro → Operação/Manutenção → Usuário, indicando onde cada solução atua.
  - **Chamada dupla:** “Começar pelos dados (AutoSINAPI)” e “Conhecer a comunidade (Foton)”.
- **Tom e estilo:** claro, inspirador, colaborativo; leveza visual; consistência com o layout atual (cards, seções respiradas, CTAs visíveis).
- **SEO:** foco em termos como “BIM acessível”, “open source AEC”, “SINAPI API”, “ecossistema AEC brasileiro”.
- **Navegação:** menu com Ecossistema, AutoSINAPI, Ferramentas, Comunidade, GitHub, Contato. Rodapé com links rápidos e contatos, mantendo coerência com o que já existe.

### Copy base sugerida
- **Headline:** “Um ecossistema de soluções integradas para transformar a construção civil brasileira.”
- **Subhead:** “Levamos BIM e tecnologia aberta, do investidor ao usuário final, com ferramentas práticas e acessíveis.”
- **Blocos do ecossistema:**
  - **AutoSINAPI:** “Dados atualizados do SINAPI via API para orçamentos precisos e automação.”
  - **Ferramentas Web:** “Soluções open source para o seu dia a dia no escritório e no canteiro.”
  - **Comunidade Foton:** “Colaboração e conhecimento para acelerar a transformação digital da AEC.”

### Prompt otimizado (Homepage)
Crie a nova homepage do www.mundoaec.com. Baseie-se no layout atual (seções limpas, cards e CTAs claros), mas recentralize o propósito do Mundo AEC como hub de um ecossistema de soluções que levam BIM e tecnologia aberta a toda a cadeia AEC (investidor, escritório, canteiro, operação, usuário). Inclua: Hero com propósito + CTA, seção “O porquê existimos”, seção “Ecossistema” (AutoSINAPI, Ferramentas, Comunidade Foton), “Jornada AEC” (linha do tempo com pontos de contato das soluções) e CTAs finais (“Explorar AutoSINAPI” e “Conhecer Comunidade”). Tom inspirador, claro e colaborativo, com leveza e continuidade visual.

---

## Etapa 2: landpage da AutoSINAPI (captação e planos)

### Diretrizes estratégicas
- **Objetivo:** conversão para teste, assinatura e adoção da API.
- **Prova de valor:** destacar dados atualizados, automação, integração simples, performance e escalabilidade do stack (FastAPI + Postgres + gateway), mantendo o foco nos resultados (orçamento ágil e preciso).
- **Estrutura de conteúdo:**
  - **Hero:** “Automatize orçamentos com dados atualizados do SINAPI” + CTAs “Teste grátis” e “Ver documentação”.
  - **Problema → Solução:** dores de orçamentos desatualizados e processos manuais; solução com API pronta e estável.
  - **Benefícios e casos de uso:** escritórios, construtoras, integradores BIM/ERP.
  - **Planos e limites:** Free (fila com até 600 req/min), 3 planos pagos com limites progressivos; billing recorrente via Mercado Livre (quando ativo).
  - **Como começar:** criar conta, gerar chave, chamar endpoint, exemplos de request/response.
  - **FAQ e compliance:** atualização dos dados, SLA, uso justo, contato.
- **Onboarding técnico:** link para a documentação Swagger; amostras de código (curl, Python, JS).
- **Pagamentos e gateway:** roadmap visível para Mercado Livre recorrente e limitação por plano; mostrar transparência no momento atual (beta/produção).
- **SEO:** “API SINAPI”, “dados SINAPI atualizados”, “orçamento construção API”, “ETL SINAPI”.
- **Layout:** coeso com a home (cards, seções respiradas, CTAs persistentes na barra).

### Estrutura de planos (exemplo)
- **Free:** até 600 req/min em fila compartilhada; chave básica; sem SLA.
- **Pro:** limite maior, prioridade moderada, suporte por e-mail.
- **Business:** alto throughput, prioridade, suporte dedicado, relatórios.
- **Enterprise:** sob consulta, integrações customizadas e SLA.

### Prompt otimizado (AutoSINAPI)
Crie a landpage de www.mundoaec.com/autosinapi com foco em conversão. Use o mesmo sistema visual do portal. Seções: Hero (headline forte + CTAs “Teste grátis” e “Ver documentação”), Problema → Solução, Benefícios (automação, precisão, integração BIM/ERP), Casos de uso, Planos (Free com fila até 600 req/min, 3 planos pagos com limites e suporte progressivos), Como começar (passo a passo + snippets de código), FAQ e contato. Tom objetivo e confiável; clareza técnica sem jargão excessivo.

---

## Etapa 3: página de ferramentas web (hub de acesso)

### Diretrizes estratégicas
- **Objetivo:** centralizar as ferramentas e fornecer acesso rápido com status.
- **Conteúdo por card:**
  - **Nome + descrição curta.**
  - **Status:** Estável, Beta, Em construção.
  - **Ações:** Acessar, Documentação, Repositório.
  - **Integração no ecossistema:** onde ajuda na jornada (escritório, canteiro, etc.).
- **Ferramentas iniciais:** AutoSINAPI; Comunidade Foton (Redmine + plugins); OpenWebUI; n8n; outras conforme evoluir.
- **UX:** filtro por status/uso; consistência visual com o portal; links diretos úteis.

### Prompt otimizado (Ferramentas)
Crie a página www.mundoaec.com/tools/ como um hub de cards de ferramentas, seguindo o visual do portal. Para cada card, inclua: nome, descrição curta, status (Estável/Beta/Em construção), botões (Acessar, Documentação, Repositório) e etiqueta de “onde atua” na jornada AEC (escritório, canteiro, operação, etc.). Inclua um Hero curto (“Ferramentas que resolvem”) e filtros simples por status/uso. Tom prático, acessível e colaborativo.

---

## Etapa 4: landpage da Comunidade Foton

### Diretrizes estratégicas
- **Posicionamento:** Foton como o “campo colaborativo” do ecossistema; ferramenta social e intelectual, não o centro do portal. A home atual traz pilares, metáfora e planos — mantenha a identidade e refine para foco em comunidade e contribuições.
- **Status atual:** ideia em desenvolvimento + plugin Fluxo de Caixa funcional; convite à contribuição de plugins e integrações.
- **Estrutura de conteúdo:**
  - **Hero:** “Construa o futuro da AEC com a Comunidade Foton” + CTAs “Participar” e “Contribuir com código”.
  - **Conceito:** metáfora do fóton (partícula = ferramentas; onda = comunidade).
  - **Pilares:** Tecnologia Aberta, Comunidade Colaborativa, Sustentabilidade Inteligente (mantendo a coerência da página atual).
  - **O que já existe:** plugin de Fluxo de Caixa (Redmine) com link para repositório e instruções de uso básico.
  - **Roadmap de plugins:** orçamentos, BIM/IFC, integração com AutoSINAPI, automações (n8n).
  - **Como contribuir:** devs, profissionais de campo, especialistas; links para GitHub e guias de contribuição.
  - **Planos de apoio:** manter núcleo open source; serviços premium opcionais (infra gerenciada, cursos, fóruns e automações).
- **SEO:** “comunidade open source AEC”, “plugins Redmine AEC”, “fluxo de caixa construção”.

### Prompt otimizado (Foton)
Crie a landpage www.mundoaec.com/foton mantendo a linguagem visual do portal e a coerência de mensagens atuais. Seções: Hero (chamada à comunidade), Conceito (metáfora do fóton), Pilares (Tecnologia Aberta, Comunidade Colaborativa, Sustentabilidade Inteligente), O que já existe (plugin Fluxo de Caixa com link e instruções), Roadmap de plugins (BIM/IFC, orçamentos, integrações AutoSINAPI, automações), Como contribuir (perfis e passos), Planos de apoio e CTAs (“Participar”, “Contribuir com código”). Tom inspirador e inclusivo.

---

## Checklists de execução e continuidade

### Conteúdo e UX
- **Consistência visual:** tipografia, espaçamentos, paleta, cards e CTAs alinhados com a home atual.
- **Clareza de navegação:** menu e rodapé padronizados; links para GitHub e comunidade destacados.
- **Acessibilidade:** contraste, hierarquia semântica, textos alternativos, foco no teclado.

### Conversão e produto
- **AutoSINAPI:** rotas claras para teste, documentação e planos; exemplos de código; paginação/limites visíveis.
- **Pagamentos:** integrar assinaturas recorrentes via Mercado Livre; estados de assinatura (ativo, pendente, expirado); webhooks para provisionamento de chaves/limites.
- **Gateway/Rate limiting:** três planos pagos + free; fila de até 600 req/min no free; quotas por chave e métricas de consumo no painel do usuário.

### SEO e monitoração
- **On-page:** títulos H1-H2 coerentes, meta descriptions, schema de produto/FAQ.
- **Conteúdo:** glossário AEC/BIM/SINAPI; posts curtos de atualização.
- **Analytics:** eventos de clique em CTAs, funil de cadastro, testes A/B de headlines.

---

## Coleção de prompts (para velocidade e unicidade)

### Prompt 1 — Homepage
Crie a homepage do www.mundoaec.com reposicionando o site como hub de um ecossistema que leva BIM e tecnologia aberta a toda a cadeia AEC (investidor, escritório, canteiro, operação, usuário). Use o layout atual como referência: seções limpas, cards e CTAs claros. Inclua: Hero (propósito + CTA), “O porquê existimos”, “Ecossistema” (AutoSINAPI, Ferramentas, Comunidade Foton), “Jornada AEC” (linha do tempo com pontos de contato das soluções) e CTAs finais. Tom inspirador, claro e colaborativo, com leveza.

### Prompt 2 — AutoSINAPI
Crie a landpage de www.mundoaec.com/autosinapi focada em conversão. Inclua: Hero (headline forte + CTAs “Teste grátis” e “Ver documentação”), Problema → Solução, Benefícios (automação, precisão, integração BIM/ERP), Casos de uso, Planos (Free com fila de até 600 req/min; 3 planos pagos com limites e suporte progressivos), Como começar (passos + snippets), FAQ e contato. Mantenha o sistema visual do portal; tom objetivo e confiável.

### Prompt 3 — Ferramentas Web
Crie www.mundoaec.com/tools/ como hub de cards de ferramentas, seguindo o visual do portal. Para cada card: nome, descrição curta, status (Estável/Beta/Em construção), botões (Acessar, Documentação, Repositório) e etiqueta do ponto da jornada AEC onde atua. Inclua um Hero curto (“Ferramentas que resolvem”) e filtros por status/uso. Tom prático e acessível.

### Prompt 4 — Comunidade Foton
Crie www.mundoaec.com/foton alinhada ao visual do portal e à mensagem atual da comunidade. Seções: Hero (chamada), Conceito (metáfora do fóton), Pilares (Tecnologia Aberta, Comunidade Colaborativa, Sustentabilidade Inteligente), O que já existe (plugin Fluxo de Caixa com link e instruções), Roadmap de plugins (BIM/IFC, orçamentos, AutoSINAPI, automações), Como contribuir (perfis + passos), Planos de apoio e CTAs. Tom inspirador e inclusivo.
