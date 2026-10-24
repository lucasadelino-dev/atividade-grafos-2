import { VERTICES, ARESTAS, criarListaAdjacencia, dijkstra, reconstruirCaminho, prim } from '../public/algoritmos.js';

const origem=process.argv[2]||'V0';
console.log('=== GRAFO DO PARQUE | TRILHAS EM KM ===');
const adj=criarListaAdjacencia();
for(const {id,nome} of VERTICES){
  console.log(id+' ('+nome+'): '+adj[id].map(v=>v.vertice+'='+v.peso).join(', '));
}
console.log('\n'+VERTICES.length+' vértices e '+ARESTAS.length+' arestas.');
const resultado=dijkstra(origem);
console.log('\n=== DIJKSTRA | ORIGEM '+origem+' ===');
for(const {id,nome} of VERTICES){
  console.log(id+' ('+nome+'): '+resultado.distancias[id]+' km | '+reconstruirCaminho(resultado,id).join(' -> '));
}
console.log('\n=== PRIM | ÁRVORE GERADORA MÍNIMA ===');
const agm=prim();
for(const {de,para,peso} of agm.arestas) console.log(de+' -- '+para+': '+peso+' km');
console.log('CUSTO TOTAL: '+agm.custoTotal+' km');
