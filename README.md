<div align="center">

# PONTIFÍCIA UNIVERSIDADE CATÓLICA DE MINAS GERAIS
### PUC Minas — Unidade Betim
### Curso de Sistemas de Informação

**Disciplina:** Algoritmos e Grafos  
**Professora:** Roselene

# ATIVIDADE PRÁTICA 02
## Aplicação de Dijkstra e Prim em um Parque Turístico

**Discentes:**  
Lucas Gabriel Adelino Araújo  
Bernardo Maia Lomas Ameno

**Betim — MG**  
**24 de outubro de 2026**

</div>

---

## 1. Apresentação do projeto

Este repositório contém o código-fonte, os testes automatizados, a interface de visualização e a documentação da **Atividade Prática 02**, desenvolvida na disciplina de **Algoritmos e Grafos** do curso de Sistemas de Informação da PUC Minas Betim.

A proposta consiste em representar um parque turístico por meio de um **grafo não direcionado, ponderado e conexo**. Seus vértices correspondem a pontos de interesse, suas arestas representam as trilhas existentes e os pesos indicam as distâncias de cada ligação, em quilômetros.

O sistema resolve duas questões:

1. **Dijkstra:** qual é o menor caminho entre um ponto de origem e cada um dos demais locais do parque?
2. **Prim:** quais trilhas permitem manter todos os pontos interligados com a menor soma possível de distâncias?

Os locais e as distâncias utilizados são fictícios, definidos exclusivamente para a demonstração dos algoritmos.

## 2. Objetivos e requisitos atendidos

| Requisito | Implementação |
| --- | --- |
| Grafo com pelo menos oito vértices | Oito vértices, identificados de V0 a V7 |
| Grafo ponderado, não direcionado e conexo | Quinze arestas com pesos positivos e ligações bidirecionais |
| Impressão da estrutura antes dos algoritmos | Listagem de adjacência exibida por \`npm run demo\` |
| Menores caminhos a partir de origem informada | Dijkstra com escolha da origem e reconstrução dos caminhos |
| Árvore Geradora Mínima | Implementação do algoritmo de Prim |
| Exibição das arestas da AGM e do custo total | Relação das sete arestas selecionadas e soma de 28 km |
| Evidências de funcionamento | Vídeo da aplicação, capturas do terminal e testes automatizados |

## 3. Modelagem e representação do grafo

A estrutura escolhida foi a **lista de adjacência**, montada a partir de um conjunto de arestas. Como o grafo é não direcionado, cada ligação é registrada nas duas listas de vizinhança correspondentes.

### 3.1 Vértices

| Vértice | Local |
| --- | --- |
| V0 | Portaria |
| V1 | Centro de visitantes |
| V2 | Mirante |
| V3 | Cachoeira |
| V4 | Área de descanso |
| V5 | Lago |
| V6 | Restaurante |
| V7 | Camping |

### 3.2 Arestas e pesos

| Aresta | Peso | Aresta | Peso |
| --- | ---: | --- | ---: |
| V0 — V1 | 4 km | V2 — V5 | 7 km |
| V0 — V2 | 8 km | V3 — V5 | 4 km |
| V0 — V4 | 10 km | V3 — V7 | 11 km |
| V1 — V2 | 3 km | V4 — V5 | 2 km |
| V1 — V3 | 9 km | V4 — V6 | 6 km |
| V1 — V6 | 12 km | V5 — V6 | 3 km |
| V2 — V3 | 5 km | V5 — V7 | 8 km |
| V6 — V7 | 7 km | — | — |

## 4. Algoritmos implementados

### 4.1 Dijkstra — menores caminhos

O algoritmo de Dijkstra determina os menores custos de deslocamento a partir de um vértice escolhido. Ele mantém as distâncias conhecidas e os predecessores de cada vértice, atualizando esses valores ao encontrar um caminho de menor custo. Os predecessores permitem reconstruir a sequência completa dos vértices percorridos.

Para a origem **V0 (Portaria)**, foram obtidos os seguintes resultados:

| Destino | Caminho mínimo | Custo |
| --- | --- | ---: |
| V0 | V0 | 0 km |
| V1 | V0 → V1 | 4 km |
| V2 | V0 → V1 → V2 | 7 km |
| V3 | V0 → V1 → V2 → V3 | 12 km |
| V4 | V0 → V4 | 10 km |
| V5 | V0 → V4 → V5 | 12 km |
| V6 | V0 → V4 → V5 → V6 | 15 km |
| V7 | V0 → V4 → V5 → V7 | 20 km |

**Exemplo:** o caminho mínimo entre a Portaria (V0) e o Camping (V7) é **V0 → V4 → V5 → V7**, com distância de **20 km**.

### 4.2 Prim — Árvore Geradora Mínima

O algoritmo de Prim constrói uma **Árvore Geradora Mínima (AGM)**. Partindo de um vértice inicial, adiciona sucessivamente a aresta de menor peso que conecta a árvore parcial a um vértice ainda não incluído, sem formar ciclos.

Com início em V0, o algoritmo seleciona:

| Ordem | Aresta selecionada | Peso |
| ---: | --- | ---: |
| 1 | V0 — V1 | 4 km |
| 2 | V1 — V2 | 3 km |
| 3 | V2 — V3 | 5 km |
| 4 | V3 — V5 | 4 km |
| 5 | V5 — V4 | 2 km |
| 6 | V5 — V6 | 3 km |
| 7 | V6 — V7 | 7 km |
| | **Custo total** | **28 km** |

A árvore possui **7 arestas**, conecta os **8 vértices** e apresenta custo total de **28 km**. Diferentemente de Dijkstra, Prim minimiza a soma das arestas necessárias para manter todo o grafo conectado, não as distâncias a partir de uma origem.

## 5. Tecnologias e organização

O projeto foi desenvolvido com **JavaScript (ES Modules)** e **Node.js**. A interface utiliza **HTML, CSS e SVG**, sem bibliotecas externas. O mesmo módulo de algoritmos é utilizado pela demonstração em terminal, pelos testes e pelo navegador.

| Caminho | Responsabilidade |
| --- | --- |
| \`public/algoritmos.js\` | Dados do grafo, lista de adjacência, Dijkstra e Prim |
| \`public/index.html\` | Estrutura da interface web |
| \`public/styles.css\` | Estilos e adaptação a diferentes tamanhos de tela |
| \`public/app.js\` | Renderização interativa do grafo e dos resultados |
| \`src/server.js\` | Servidor HTTP para execução local |
| \`src/demo.js\` | Exibição textual da estrutura e dos algoritmos |
| \`tests/algoritmos.test.js\` | Testes automatizados com o módulo nativo \`node:test\` |
| \`RELATORIO.md\` | Relatório técnico detalhado da atividade |

## 6. Instruções para execução

### 6.1 Pré-requisito

É necessário possuir **Node.js 18 ou superior** instalado. Não há dependências externas; portanto, não é necessário executar \`npm install\`.

### 6.2 Executar a aplicação web localmente

\`\`\`bash
git clone https://github.com/lucasadelino-dev/atividade-grafos-2.git
cd atividade-grafos-2
npm start
\`\`\`

Acesse **http://localhost:3000** no navegador. No painel é possível alternar entre Dijkstra e Prim, selecionar a origem e o destino e observar as trilhas destacadas e os respectivos custos.

### 6.3 Executar os algoritmos no terminal

\`\`\`bash
npm run demo
\`\`\`

Esse comando imprime inicialmente a **lista de adjacência do grafo** e, em seguida, os caminhos de Dijkstra (origem padrão V0) e as arestas da Árvore Geradora Mínima calculada por Prim.

É possível definir outra origem para Dijkstra:

\`\`\`bash
npm run demo -- V4
\`\`\`

### 6.4 Executar os testes automatizados

\`\`\`bash
npm test
\`\`\`

A suíte inclui **cinco casos de teste**, cobrindo a estrutura não direcionada e ponderada do grafo, os custos e caminhos de Dijkstra, a troca de origem, o resultado de Prim e a identificação de grafos desconexos.

## 7. Evidências de execução

Os registros abaixo foram incorporados a este repositório para demonstrar a execução do projeto.

### 7.1 Vídeo de demonstração da interface

O vídeo apresenta a aplicação gráfica e a interação com o mapa do parque.

https://github.com/user-attachments/assets/0538dcdf-349b-4305-8ed5-ecf9af2bb8a6

### 7.2 Execução dos testes automatizados

**Figura 1 — Saída de \`npm test\` no terminal.**

![Figura 1 — Captura de tela dos testes automatizados](https://github.com/user-attachments/assets/21353633-04d5-496a-90a0-5417688370ce)

### 7.3 Impressão do grafo e resultados dos algoritmos

**Figura 2 — Saída de \`npm run demo\` no terminal, com lista de adjacência e resultados.**

![Figura 2 — Captura de tela da demonstração de Dijkstra e Prim](https://github.com/user-attachments/assets/5a3ac93b-237b-4026-8be0-ceb956520b3f)

## 8. Disponibilização da interface

O frontend é composto por arquivos estáticos presentes em \`public/\` e está preparado para publicação pelo **GitHub Pages**, por meio do workflow [\`.github/workflows/pages.yml\`](./.github/workflows/pages.yml). O workflow executa os testes e, caso sejam aprovados, publica o conteúdo da pasta.

**Endereço previsto:** https://lucasadelino-dev.github.io/atividade-grafos-2/

> A disponibilidade do site depende da configuração do GitHub Pages e da conclusão bem-sucedida do workflow de publicação. O código-fonte e a execução local não dependem da hospedagem.

## 9. Considerações finais

A atividade demonstra como um mesmo grafo ponderado pode ser utilizado para resolver problemas diferentes de planejamento em um parque turístico. O algoritmo de Dijkstra permite identificar os **menores caminhos** a partir de uma origem, enquanto Prim permite determinar o **conjunto de trilhas de menor custo total** para conectar todos os destinos.

A interface gráfica, a execução pelo terminal e os testes automatizados complementam a implementação ao facilitar a análise e a verificação dos resultados.

O relatório da atividade, com desenvolvimento mais detalhado e as evidências necessárias para a entrega, está disponível em **[RELATORIO.md](./RELATORIO.md)**. Conforme o enunciado, a entrega no Canvas exige o **relatório em PDF com capturas de tela** e os arquivos de código-fonte (ou o link do repositório público).

---

<div align="center">

**Pontifícia Universidade Católica de Minas Gerais — PUC Minas Betim**  
**Algoritmos e Grafos — Atividade Prática 02**  
**Lucas Gabriel Adelino Araújo · Bernardo Maia Lomas Ameno**  
**Betim, 24 de outubro de 2026**

</div>
