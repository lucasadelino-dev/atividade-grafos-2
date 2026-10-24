/** Grafo ponderado, não direcionado e conexo de um parque turístico. */
export const VERTICES = [
  { id:'V0',nome:'Portaria',x:11,y:53 },
  { id:'V1',nome:'Centro de visitantes',x:29,y:20 },
  { id:'V2',nome:'Mirante',x:49,y:12 },
  { id:'V3',nome:'Cachoeira',x:77,y:26 },
  { id:'V4',nome:'Área de descanso',x:30,y:82 },
  { id:'V5',nome:'Lago',x:58,y:63 },
  { id:'V6',nome:'Restaurante',x:54,y:91 },
  { id:'V7',nome:'Camping',x:89,y:78 }
];

export const ARESTAS = [
  {de:'V0',para:'V1',peso:4},
  {de:'V0',para:'V2',peso:8},
  {de:'V0',para:'V4',peso:10},
  {de:'V1',para:'V2',peso:3},
  {de:'V1',para:'V3',peso:9},
  {de:'V1',para:'V6',peso:12},
  {de:'V2',para:'V3',peso:5},
  {de:'V2',para:'V5',peso:7},
  {de:'V3',para:'V5',peso:4},
  {de:'V3',para:'V7',peso:11},
  {de:'V4',para:'V5',peso:2},
  {de:'V4',para:'V6',peso:6},
  {de:'V5',para:'V6',peso:3},
  {de:'V5',para:'V7',peso:8},
  {de:'V6',para:'V7',peso:7}
];

export function criarListaAdjacencia(vertices=VERTICES,arestas=ARESTAS) {
  const lista=Object.fromEntries(vertices.map(({id})=>[id,[]]));
  for (const {de,para,peso} of arestas) {
    if(!lista[de]||!lista[para]) throw new Error('Aresta com vértice inexistente.');
    if(!Number.isFinite(peso)||peso<=0) throw new Error('Os pesos devem ser positivos.');
    if(de===para) throw new Error('Laços não são permitidos neste exemplo.');
    lista[de].push({vertice:para,peso});
    lista[para].push({vertice:de,peso});
  }
  for(const vizinhos of Object.values(lista)) vizinhos.sort((a,b)=>a.vertice.localeCompare(b.vertice));
  return lista;
}

/** Dijkstra: custos mínimos e predecessores desde uma origem. */
export function dijkstra(origem,vertices=VERTICES,arestas=ARESTAS) {
  const adjacencia=criarListaAdjacencia(vertices,arestas);
  if(!Object.hasOwn(adjacencia,origem)) throw new Error('Vértice de origem inválido.');
  const distancias=Object.fromEntries(vertices.map(({id})=>[id,Infinity]));
  const anteriores=Object.fromEntries(vertices.map(({id})=>[id,null]));
  const visitados=new Set();
  distancias[origem]=0;
  while(visitados.size<vertices.length){
    const atual=vertices.map(({id})=>id).filter(id=>!visitados.has(id))
      .sort((a,b)=>distancias[a]-distancias[b]||a.localeCompare(b))[0];
    if(atual===undefined||distancias[atual]===Infinity) break;
    visitados.add(atual);
    for(const {vertice,peso} of adjacencia[atual]){
      const alternativa=distancias[atual]+peso;
      if(!visitados.has(vertice)&&alternativa<distancias[vertice]){
        distancias[vertice]=alternativa;
        anteriores[vertice]=atual;
      }
    }
  }
  return {origem,distancias,anteriores};
}

export function reconstruirCaminho(resultado,destino){
  if(!Object.hasOwn(resultado.distancias,destino)) throw new Error('Destino inválido.');
  if(!Number.isFinite(resultado.distancias[destino])) return [];
  const caminho=[];
  let atual=destino;
  while(atual!==null){caminho.unshift(atual);atual=resultado.anteriores[atual];}
  return caminho;
}

/** Prim: AGM com menor soma de pesos, sem ciclos. */
export function prim(inicio=VERTICES[0].id,vertices=VERTICES,arestas=ARESTAS){
  const adjacencia=criarListaAdjacencia(vertices,arestas);
  if(!Object.hasOwn(adjacencia,inicio)) throw new Error('Vértice inicial inválido.');
  const incluidos=new Set([inicio]);
  const arvore=[];
  let custoTotal=0;
  while(incluidos.size<vertices.length){
    const candidatas=[];
    for(const de of incluidos){
      for(const {vertice:para,peso} of adjacencia[de]){
        if(!incluidos.has(para)) candidatas.push({de,para,peso});
      }
    }
    candidatas.sort((a,b)=>a.peso-b.peso||a.de.localeCompare(b.de)||a.para.localeCompare(b.para));
    const proxima=candidatas[0];
    if(!proxima) throw new Error('Grafo desconexo: não existe árvore geradora.');
    incluidos.add(proxima.para);
    arvore.push(proxima);
    custoTotal+=proxima.peso;
  }
  return {arestas:arvore,custoTotal};
}
