# PONTIFÍCIA UNIVERSIDADE CATÓLICA DE MINAS GERAIS

## Sistemas de Informação — Algoritmos em Grafos
### Atividade Prática 02 — Parque Turístico

**Relatório técnico de implementação**

**Integrantes:** preencher os nomes da dupla  
**Data:** outubro de 2026  
**Tecnologias:** JavaScript, Node.js, HTML, CSS e SVG

---

## 1. Descrição do problema

Um parque turístico possui pontos de interesse interligados por trilhas com diferentes distâncias. O programa desenvolvido responde a duas perguntas: quais são os **menores caminhos** entre um ponto de origem e os demais locais do parque e qual é o **conjunto de trilhas com menor distância total** capaz de interligar todos esses locais.

O parque foi modelado como um **grafo não direcionado, ponderado e conexo**: os vértices representam pontos de interesse, as arestas representam trilhas percorríveis nos dois sentidos e os pesos representam distâncias, em quilômetros. Os dados são fictícios e foram elaborados para a atividade. A conectividade garante que todos os oito pontos são alcançáveis.

## 2. Representação do grafo

Foi utilizada a **lista de adjacência**. O programa cadastra cada trilha uma única vez e, ao construir a lista, adiciona as duas direções de cada ligação, uma para cada extremidade. O grafo possui **8 vértices e 15 arestas**, todas com pesos positivos.

### 2.1 Vértices

| Vértice | Ponto de interesse |
| --- | --- |
| V0 | Portaria |
| V1 | Centro de visitantes |
| V2 | Mirante |
| V3 | Cachoeira |
| V4 | Área de descanso |
| V5 | Lago |
| V6 | Restaurante |
| V7 | Camping |

### 2.2 Arestas e pesos

| Trilha | Distância | Trilha | Distância |
| --- | ---: | --- | ---: |
| V0–V1 | 4 km | V2–V5 | 7 km |
| V0–V2 | 8 km | V3–V5 | 4 km |
| V0–V4 | 10 km | V3–V7 | 11 km |
| V1–V2 | 3 km | V4–V5 | 2 km |
| V1–V3 | 9 km | V4–V6 | 6 km |
| V1–V6 | 12 km | V5–V6 | 3 km |
| V2–V3 | 5 km | V5–V7 | 8 km |
| V6–V7 | 7 km | — | — |

O comando `npm run demo` imprime a estrutura completa da lista de adjacência, mostrando os vizinhos de cada vértice e os respectivos pesos antes da execução dos algoritmos. A interface web também representa o mesmo grafo com um mapa de nós e conexões.

## 3. Algoritmo de Dijkstra

O algoritmo de **Dijkstra** calcula o caminho de menor custo de um vértice de origem para todos os demais vértices, desde que os pesos sejam não negativos. Inicialmente, a distância da origem é 0 e a dos demais é infinita. Em seguida, seleciona-se o vértice ainda não visitado com menor distância conhecida; suas arestas são examinadas para verificar se oferecem rotas mais curtas aos vizinhos. Quando uma melhoria é encontrada, sua distância e seu predecessor são atualizados.

Os predecessores são utilizados para reconstruir o **caminho completo**, e não apenas o custo. Para a demonstração, foi escolhido o vértice **V0 (Portaria)** como origem, embora a interface permita alterá-lo.

### 3.1 Menores caminhos com origem V0

| Destino | Caminho encontrado | Menor custo |
| --- | --- | ---: |
| V0 | V0 | 0 km |
| V1 | V0 → V1 | 4 km |
| V2 | V0 → V1 → V2 | 7 km |
| V3 | V0 → V1 → V2 → V3 | 12 km |
| V4 | V0 → V4 | 10 km |
| V5 | V0 → V4 → V5 | 12 km |
| V6 | V0 → V4 → V5 → V6 | 15 km |
| V7 | V0 → V4 → V5 → V7 | 20 km |

Por exemplo, o deslocamento mais curto entre a Portaria (V0) e o Camping (V7) passa pela Área de descanso (V4) e pelo Lago (V5). O custo é **10 + 2 + 8 = 20 km**.

## 4. Algoritmo de Prim — Árvore Geradora Mínima

O algoritmo de **Prim** calcula uma **Árvore Geradora Mínima (AGM)** para um grafo conexo e ponderado. Ele começa com um vértice (neste projeto, V0) e seleciona repetidamente a aresta de menor peso que liga um vértice já presente na árvore a outro ainda não incluído. Assim, a cada etapa um novo vértice é incorporado, sem criar ciclos.

### 4.1 Arestas selecionadas

| Ordem | Trilha | Peso |
| ---: | --- | ---: |
| 1 | V0 – V1 | 4 km |
| 2 | V1 – V2 | 3 km |
| 3 | V2 – V3 | 5 km |
| 4 | V3 – V5 | 4 km |
| 5 | V5 – V4 | 2 km |
| 6 | V5 – V6 | 3 km |
| 7 | V6 – V7 | 7 km |
| | **Total** | **28 km** |

A árvore geradora mínima contém **7 arestas para 8 vértices** e utiliza **28 km** de trilhas para interligar todos os pontos do parque.

É importante distinguir os objetivos: **Dijkstra minimiza a distância de uma origem até cada destino; Prim minimiza a soma dos pesos das trilhas que mantêm todos os pontos conectados.** A árvore de Prim não precisa conter o menor caminho para cada destino.

## 5. Evidências de execução e testes

### 5.1 Como executar

Com Node.js 18 ou superior instalado, no diretório do projeto:

1. Execute `npm start` e acesse **http://localhost:3000**.
2. Selecione Dijkstra, escolha a origem V0 e o destino V7. Observe a rota **V0 → V4 → V5 → V7**, de **20 km**.
3. Selecione Prim e observe as **7 trilhas destacadas**, com custo total de **28 km**.
4. Execute `npm run demo` para conferir a lista de adjacência e os resultados no terminal.
5. Execute `npm test` para verificar os cinco testes automatizados.

### 5.2 Resultados da execução

O programa foi conferido no terminal, com a origem V0. O algoritmo de Dijkstra retornou distâncias de **0, 4, 7, 12, 10, 12, 15 e 20 km** para V0 a V7, respectivamente. O algoritmo de Prim selecionou as sete arestas apresentadas na seção 4, resultando em **28 km**.

Os testes automatizados cobrem: (1) estrutura do grafo, pesos e bidirecionalidade; (2) menores distâncias e caminhos de Dijkstra; (3) troca de origem e validação da origem; (4) quantidade de arestas e custo da AGM; (5) falha esperada de Prim em grafo desconexo. Os cinco testes passaram na execução local.

### 5.3 Capturas de tela a anexar

**Atenção: antes da entrega, incluir aqui as capturas reais do programa em execução e incorporá-las ao PDF final.**

- **Figura 1 — Dijkstra:** painel do navegador mostrando grafo, origem V0, destino V7, caminho destacado e distância de 20 km.
- **Figura 2 — Prim:** painel mostrando árvore geradora mínima e custo total de 28 km.
- **Figura 3 — Terminal:** saída de `npm run demo` e/ou dos testes com `npm test` (opcional como evidência adicional).

As capturas devem ser feitas durante a execução do projeto, pois o enunciado exige evidências visuais reais.

## 6. Conclusão

O projeto demonstrou duas aplicações distintas de algoritmos em grafos: identificar rotas de menor custo para deslocamento entre locais e selecionar uma rede mínima de trilhas capaz de conectar todos os pontos. Com Dijkstra, a menor rota da Portaria até o Camping mede **20 km**. Com Prim, é possível manter os oito pontos conectados com sete trilhas cuja soma é **28 km**.

A modelagem por lista de adjacência é adequada ao problema e permite aplicar ambos os algoritmos no mesmo grafo. A visualização interativa facilita o entendimento dos resultados, enquanto os testes automatizados ajudam a comprovar o funcionamento da implementação.

---

**Instruções de entrega:** exportar este relatório para **PDF**, incluir as capturas de tela e enviar os códigos-fonte pelo Canvas. Se a entrega do código for feita pelo link do GitHub, o enunciado exige que o repositório esteja **público**.
