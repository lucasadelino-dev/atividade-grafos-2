# Trilhas do Parque — Atividade Prática 02

Projeto da disciplina **Algoritmos em Grafos**: parque turístico modelado como um grafo **não direcionado, ponderado e conexo**. Implementa **Dijkstra** (menores caminhos) e **Prim** (Árvore Geradora Mínima), com interface web interativa em JavaScript puro.

## Como executar

Requisito: **Node.js 18 ou superior**. Não utiliza bibliotecas externas e não exige instalação de dependências.

1. Clone o repositório: `git clone https://github.com/lucasadelino-dev/atividade-grafos-2.git`.
2. Entre na pasta: `cd atividade-grafos-2`.
3. Inicie o servidor: `npm start`.
4. Abra **http://localhost:3000** no navegador.

**Hospedagem:** o site é estático e está configurado para publicação pelo **GitHub Pages**. Depois da ativação inicial, o endereço esperado é **https://lucasadelino-dev.github.io/atividade-grafos-2/**. Não é preciso executar o servidor Node.js na hospedagem.

Outros comandos:

- `npm run demo` — exibe o grafo e os resultados de Dijkstra e Prim no terminal (origem V0).
- `npm run demo -- V4` — executa Dijkstra com origem V4.
- `npm test` — executa 5 testes automatizados com `node:test`.

## Funcionalidades

- **8 vértices (V0–V7)** e **15 arestas**, ponderadas por quilômetros.
- Apresentação gráfica de trilhas e seus pesos, com SVG.
- **Dijkstra:** seleção da origem e do destino, destaque visual do caminho e tabela de custos.
- **Prim:** exibição das 7 arestas da árvore geradora mínima e do custo total.
- Saída via terminal para demonstrar a estrutura do grafo e os resultados.
- Testes dos algoritmos e estrutura de dados.

## Resultados com origem V0

| Destino | Menor custo |
| --- | ---: |
| V0 | 0 km |
| V1 | 4 km |
| V2 | 7 km |
| V3 | 12 km |
| V4 | 10 km |
| V5 | 12 km |
| V6 | 15 km |
| V7 | 20 km |

**Prim:** a Árvore Geradora Mínima contém **7 arestas** e soma **28 km**.

## Estrutura

- `public/algoritmos.js` — grafo, Dijkstra e Prim.
- `public/app.js` — interação no navegador e visualização SVG.
- `public/index.html` e `public/styles.css` — interface.
- `src/server.js` — servidor HTTP nativo do Node.js.
- `src/demo.js` — execução pelo terminal.
- `tests/algoritmos.test.js` — testes automatizados.
- `RELATORIO.md` — relatório acadêmico.



## Demonstração da aplicação

### Vídeo de funcionamento

O vídeo demonstra o uso do painel interativo e a visualização do grafo.

https://github.com/user-attachments/assets/0538dcdf-349b-4305-8ed5-ecf9af2bb8a6

### Evidências de execução

**Testes automatizados — `npm test`**

A execução da suíte de testes verifica a estrutura do grafo, os menores caminhos de Dijkstra e a Árvore Geradora Mínima de Prim.

![Captura de tela da execução dos testes automatizados](https://github.com/user-attachments/assets/21353633-04d5-496a-90a0-5417688370ce)

**Saída no terminal — `npm run demo`**

A demonstração imprime o grafo com seus pesos, os menores caminhos e as arestas da árvore geradora mínima.

![Captura de tela do terminal após npm run demo](https://github.com/user-attachments/assets/5a3ac93b-237b-4026-8be0-ceb956520b3f)

> As capturas e o vídeo acima foram adicionados ao README para documentar a execução. O relatório acadêmico organiza essas evidências e inclui os resultados obtidos.

## Publicação automática no GitHub Pages

O workflow [`pages.yml`](./.github/workflows/pages.yml) executa `npm test` e publica os arquivos de `public/` sempre que houver alterações de código na branch `main`.

**Ativação inicial (uma única vez):** abra [Settings → Pages](https://github.com/lucasadelino-dev/atividade-grafos-2/settings/pages), escolha **GitHub Actions** em **Build and deployment → Source** e salve. Em seguida, acompanhe a publicação na [aba Actions](https://github.com/lucasadelino-dev/atividade-grafos-2/actions); se necessário, execute o workflow manualmente em **Run workflow**.

Após o primeiro deploy concluído, o site deverá estar em **https://lucasadelino-dev.github.io/atividade-grafos-2/**. Como os imports e os assets usam caminhos relativos, o frontend funciona também sob o subdiretório do repositório. Não há dependências de serviços externos para os algoritmos.

## Relatório e entrega

Consulte o [relatório técnico](./RELATORIO.md) para a modelagem, a explicação dos algoritmos e as evidências de execução.

**Entrega acadêmica:** o Canvas exige o relatório em PDF, incluindo capturas de tela do funcionamento do programa. O código pode ser entregue pelo repositório público.

Os dados do parque são fictícios e foram elaborados para demonstrar os algoritmos.
