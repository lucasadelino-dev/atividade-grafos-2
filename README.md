# Trilhas do Parque — Atividade Prática 02

Projeto da disciplina **Algoritmos em Grafos**: parque turístico modelado como um grafo **não direcionado, ponderado e conexo**. Implementa **Dijkstra** (menores caminhos) e **Prim** (Árvore Geradora Mínima), com interface web interativa em JavaScript puro.

## Como executar

Requisito: **Node.js 18 ou superior**. Não utiliza bibliotecas externas e não exige instalação de dependências.

1. Clone o repositório: `git clone https://github.com/lucasadelino-dev/atividade-grafos-2.git`.
2. Entre na pasta: `cd atividade-grafos-2`.
3. Inicie o servidor: `npm start`.
4. Abra **http://localhost:3000** no navegador.

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

## Relatório e entrega

Leia [RELATORIO.md](./RELATORIO.md). Para entregar no Canvas, **exporte o relatório para PDF com capturas de tela reais do programa em funcionamento**. O enunciado permite enviar um link do GitHub em substituição ao código somente se o repositório estiver **público**.

Os dados do parque são fictícios e foram elaborados para demonstrar os algoritmos.
