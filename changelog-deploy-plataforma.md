# Regra: Registro de Alterações em Cada Deploy

Sempre que for feito um deploy/commit para o GitHub, siga este processo **antes** de commitar.

## 0. Como este projeto está organizado

Não é um site institucional com páginas (Home, Sobre etc.) — é uma plataforma React/Vite com **duas árvores de código paralelas**, cada uma um app completo e independente:

- **A** — `src/prototype/`, servida por `app.html` e `landing.html`.
- **B** — `src/prototype-b/`, uma cópia integral de A que pode divergir de propósito. Servida por `app-b.html` e (atualmente) `onboarding.html`.

Uma mudança em `src/prototype/ChatScreen.tsx` e uma em `src/prototype-b/ChatScreen.tsx` são coisas **diferentes**, mesmo com o mesmo nome de arquivo — nunca vão no mesmo bloco.

Dentro de cada árvore (A ou B), o código se organiza por módulo de produto, não por tela solta:

| Módulo | Onde fica | O que é |
|---|---|---|
| `Chat` | arquivos soltos na raiz de `prototype(-b)/` | ChatScreen, ProductSidebar, GuestSidebar, SavedThread, IntentPicker, SignupGate, StepFlow, Reactable, icons, ConductorApp, savedChats, data |
| `Agents` | `agents/` | roster, Jobs/Automations, Connectors, agentsData, activeTasks, store |
| `Onboarding` | `onboarding/` | FirstMeeting e os popovers de introdução (conversa guiada) |
| `Presence` | `presence/` | o motor de física dos pontos de presença (PresenceOrb) |
| `Product` | `product/` | seções da página de produto (Conductor Mode) |
| `Landing` | `landing/`, com subpastas `b/` a `f/` | variantes de landing page; use `Landing/E` etc. quando a mudança for isolada a uma letra, ou `Landing` quando espalhar por várias |
| `Entry` | `src/app-main.tsx`, `src/app-main-b.tsx`, `src/landing-main.tsx`, `src/onboarding-main.tsx`, e o `.html` raiz correspondente | o fiozinho que liga cada `.html` à árvore A ou B |

Fora das duas árvores:

- **Sandbox** — `index.html` → `src/main.tsx` → `src/App.tsx` → `src/components/`. Uma vitrine de componentes solta, sem relação com A/B.
- **Compartilhado** — infraestrutura que não pertence a nenhuma árvore: `vite.config.ts`, `package.json`, `tsconfig*`, `.github/workflows/`, `src/index.css`, `src/lib/`, `src/fonts/`, `README*.md`, este próprio arquivo de regra e os changelogs.

> Se a estrutura mudar (um módulo novo, uma variante C, a Sandbox virar outra coisa), atualize esta tabela — ela é o que faz o agrupamento abaixo continuar batendo com o projeto de verdade.

## Escopo deste changelog: só `onboarding.html`

Por pedido da UX, este registro cobre **apenas** o que afeta `onboarding.html` — ou seja, só o que está dentro de:

- `onboarding.html`
- `src/onboarding-main.tsx` (o fio que liga essa página à árvore)
- `src/prototype-b/**` (a árvore que `onboarding.html` carrega hoje — Variante B)

Qualquer alteração fora dessas pastas (Variante A, Sandbox, Compartilhado, ou `app-b.html`/`landing.html`/`app.html`) **não entra** neste changelog, mesmo que tenha sido feita na mesma sessão. Na prática, dentro desse escopo os blocos só existem como `### B/[Módulo]` — a tabela de módulos acima ainda vale pra decidir qual módulo é qual.

> Se `onboarding.html` um dia passar a apontar pra outra árvore (ex: voltar pra A), atualize este escopo para a árvore nova antes de gerar o próximo changelog.

## 1. Identifique as alterações

```bash
git diff --name-status -- onboarding.html src/onboarding-main.tsx src/prototype-b
git status --short -- onboarding.html src/onboarding-main.tsx src/prototype-b
```

## 2. Agrupe as mudanças em blocos

Cada bloco é um título único no formato `### [Variante]/[Módulo]`:

- `### A/Agents`, `### B/Agents`, `### A/Chat`, `### B/Landing-E` — variante sempre vem primeiro, porque é a divisão que mais importa neste projeto.
- `### Compartilhado/[Área]` para infraestrutura (ex: `### Compartilhado/Build` para `vite.config.ts`).
- `### Sandbox` sozinho, sem sub-módulo, é aceitável — é uma área pequena e não modularizada.

Regras importantes:
- Nunca usar um `####` separado para o módulo, nem aninhar títulos — variante e módulo sempre ficam juntos no mesmo `###`.
- Nunca misturar módulos de variantes diferentes no mesmo bloco, mesmo que o arquivo tenha o mesmo nome e a mesma mudança conceitual. Uma alteração feita em espelho nas duas árvores (comum neste projeto) ainda gera **dois blocos**: `### A/Agents` e `### B/Agents`.
- Se um bloco não tiver nenhuma alteração, **omita o bloco inteiro** (não liste "sem alterações").

## 3. Salve o arquivo

- Caminho: `ux/docs/changelog/YYYY-MM-DD-HH-MM.md`
- Use a data e hora atuais no nome do arquivo.

## 4. Formato do arquivo

```md
# Registro de Alterações — DD/MM/YYYY HH:MM

Escopo: só as mudanças que afetam `onboarding.html`.

## Resumo
Breve descrição geral do que foi feito nesta sessão.

## Alterações por Variante/Módulo

### B/Entry
- Arquivos modificados: `src/onboarding-main.tsx`
- O que mudou: descrição clara e objetiva.

### B/Onboarding
- Arquivos modificados: `src/prototype-b/onboarding/FirstMeeting.tsx`
- O que mudou: descrição clara e objetiva.

## Arquivos Adicionados
- (nenhum)

## Arquivos Removidos
- (nenhum)
```

## 5. Revisão antes de prosseguir

- Mostre o conteúdo do `.md` gerado para a UX revisar antes de continuar com o commit/deploy.
- Se a UX quiser ajustar alguma descrição, edite o arquivo antes de prosseguir.
