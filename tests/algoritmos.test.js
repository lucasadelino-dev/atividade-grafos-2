import test from 'node:test';
import assert from 'node:assert/strict';
import { VERTICES, ARESTAS, criarListaAdjacencia, dijkstra, reconstruirCaminho, prim } from '../public/algoritmos.js';

test('grafo tem 8 vértices, 15 arestas, pesos positivos e ligações bidirecionais',()=>{
  assert.equal(VERTICES.length,8);
  assert.equal(ARESTAS.length,15);
  const lista=criarListaAdjacencia();
  for(const {de,para,peso} of ARESTAS){
    assert.ok(peso>0);
    assert.ok(lista[de].some(v=>v.vertice===para&&v.peso===peso));
    assert.ok(lista[para].some(v=>v.vertice===de&&v.peso===peso));
  }
});
test('Dijkstra retorna as distâncias mínimas corretas desde V0',()=>{
  const resultado=dijkstra('V0');
  assert.deepEqual(resultado.distancias,{
    V0:0,V1:4,V2:7,V3:12,V4:10,V5:12,V6:15,V7:20
  });
  assert.deepEqual(reconstruirCaminho(resultado,'V3'),['V0','V1','V2','V3']);
  assert.deepEqual(reconstruirCaminho(resultado,'V7'),['V0','V4','V5','V7']);
});
test('Dijkstra aceita outras origens e rejeita vértice desconhecido',()=>{
  assert.equal(dijkstra('V7').distancias.V7,0);
  assert.equal(dijkstra('V7').distancias.V0,20);
  assert.throws(()=>dijkstra('V99'),/inválido/);
});
test('Prim gera árvore mínima de 7 arestas e custo 28 km',()=>{
  const agm=prim();
  assert.equal(agm.arestas.length,VERTICES.length-1);
  assert.equal(agm.custoTotal,28);
  assert.equal(new Set(agm.arestas.flatMap(e=>[e.de,e.para])).size,8);
});
test('Prim rejeita grafo desconexo',()=>{
  assert.throws(()=>prim('V0',[{id:'V0'},{id:'V1'}],[]),/desconexo/);
});
