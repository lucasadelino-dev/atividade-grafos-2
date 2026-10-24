import { VERTICES, ARESTAS, dijkstra, reconstruirCaminho, prim } from './algoritmos.js';

const $ = seletor => document.querySelector(seletor);
const ns = 'http://www.w3.org/2000/svg';
let modo = 'dijkstra';
let origem = 'V0';
let destino = 'V7';

for (const v of VERTICES) {
  for (const seletor of ['#origem','#destino']) {
    const option = document.createElement('option');
    option.value = v.id;
    option.textContent = v.id + ' · ' + v.nome;
    $(seletor).append(option);
  }
}
$('#origem').value = origem;
$('#destino').value = destino;
$('#quantidade-vertices').textContent = VERTICES.length;
$('#quantidade-arestas').textContent = ARESTAS.length;

function svg(tag, props = {}, parent = $('#mapa')) {
  const el = document.createElementNS(ns, tag);
  for (const [key,value] of Object.entries(props)) el.setAttribute(key,String(value));
  parent.append(el);
  return el;
}
function arestaKey(a,b) { return [a,b].sort().join('|'); }
function pos(v) { return {x:v.x*9.15+42,y:v.y*5+34}; }
function nome(id) { return VERTICES.find(v=>v.id===id)?.nome ?? id; }
function mostrarGrafo(arestasSelecionadas,verticesSelecionados) {
  $('#mapa').replaceChildren();
  for (let x=0;x<=1000;x+=50) svg('line',{x1:x,y1:0,x2:x,y2:580,class:'gridline'});
  for (let y=0;y<=580;y+=50) svg('line',{x1:0,y1:y,x2:1000,y2:y,class:'gridline'});
  for (const e of ARESTAS) {
    const a=pos(VERTICES.find(v=>v.id===e.de));
    const b=pos(VERTICES.find(v=>v.id===e.para));
    const escolhido=arestasSelecionadas.has(arestaKey(e.de,e.para));
    const classe=escolhido?'chosen':modo==='prim'?'dim':'';
    svg('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:'edge '+classe});
    const x=(a.x+b.x)/2,y=(a.y+b.y)/2;
    svg('rect',{x:x-15,y:y-12,width:30,height:24,rx:7,class:'edge-bg'});
    const label=svg('text',{x,y:y+1,class:'edge-weight '+classe});
    label.textContent=e.peso;
  }
  for (const v of VERTICES) {
    const {x,y}=pos(v);
    const classes=['node',verticesSelecionados.has(v.id)?'chosen':'',modo==='dijkstra'&&v.id===origem?'origin':''].join(' ');
    const group=svg('g',{class:classes,tabindex:0,role:'button','aria-label':v.id+' '+v.nome});
    svg('circle',{cx:x,cy:y,r:26},group);
    const code=svg('text',{x,y:y+1},group);code.textContent=v.id;
    const title=svg('text',{x,y:y+49,class:'name'},group);title.textContent=v.nome;
    function selecionar(){
      if(modo!=='dijkstra')return;
      destino=v.id;
      $('#destino').value=destino;
      atualizar();
    }
    group.addEventListener('click',selecionar);
    group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selecionar();}});
  }
}
function renderTabela(colunas,linhas) {
  const table=document.createElement('table');table.className='result-table';
  const thead=document.createElement('thead'),head=document.createElement('tr');
  for(const coluna of colunas){const th=document.createElement('th');th.textContent=coluna;head.append(th);}
  thead.append(head);table.append(thead);
  const tbody=document.createElement('tbody');
  for(const linha of linhas){
    const tr=document.createElement('tr');
    if(linha.ativo)tr.classList.add('highlight');
    if(linha.acao){
      tr.classList.add('clickable');tr.tabIndex=0;
      tr.addEventListener('click',linha.acao);
      tr.addEventListener('keydown',e=>{if(e.key==='Enter')linha.acao();});
    }
    for(const valor of linha.valores){
      const td=document.createElement('td');td.textContent=String(valor);tr.append(td);
    }
    tbody.append(tr);
  }
  table.append(tbody);
  $('#resultados').replaceChildren(table);
}
function montarDestaque(titulo,valor,detalhes){
  const box=$('#destaque');box.replaceChildren();
  box.append(document.createTextNode(titulo));
  const strong=document.createElement('strong');strong.textContent=valor;box.append(strong);
  box.append(document.createTextNode(detalhes));
}
function atualizar(){
  const d=modo==='dijkstra';
  for(const [id,ativo] of [['#modo-dijkstra',d],['#modo-prim',!d]]){
    $(id).classList.toggle('active',ativo);
    $(id).setAttribute('aria-pressed',String(ativo));
  }
  $('#origem').disabled=!d;
  $('#destino').disabled=!d;
  if(d){
    const resultado=dijkstra(origem);
    const caminho=reconstruirCaminho(resultado,destino);
    const custo=resultado.distancias[destino];
    const ligacoes=new Set(caminho.slice(1).map((v,i)=>arestaKey(caminho[i],v)));
    mostrarGrafo(ligacoes,new Set(caminho));
    $('#custo-titulo').textContent='MENOR ROTA';
    $('#custo').replaceChildren(document.createTextNode(custo+' km'));
    $('#custo-legenda').textContent='De '+origem+' até '+destino;
    $('#mapa-titulo').textContent='Rota '+origem+' → '+destino;
    $('#mapa-legenda').textContent='Caminho: '+caminho.join(' → ');
    $('#resultado-titulo').textContent='Menores caminhos a partir de '+origem;
    $('#resultado-tipo').textContent='DIJKSTRA';
    $('#explicacao-titulo').textContent='Como funciona Dijkstra?';
    $('#explicacao').textContent='Começa na origem, escolhe o vértice não visitado de menor custo conhecido e atualiza os custos dos vizinhos até obter as menores distâncias.';
    montarDestaque('Rota para '+nome(destino),custo+' km',caminho.join(' → '));
    renderTabela(['Destino','Menor caminho','Custo'],VERTICES.map(v=>({
      ativo:v.id===destino,
      acao:()=>{destino=v.id;$('#destino').value=destino;atualizar();},
      valores:[v.id,reconstruirCaminho(resultado,v.id).join(' → '),resultado.distancias[v.id]+' km']
    })));
  }else{
    const agm=prim();
    const ligacoes=new Set(agm.arestas.map(e=>arestaKey(e.de,e.para)));
    mostrarGrafo(ligacoes,new Set(VERTICES.map(v=>v.id)));
    $('#custo-titulo').textContent='CUSTO DA ÁRVORE';
    $('#custo').textContent=agm.custoTotal+' km';
    $('#custo-legenda').textContent=agm.arestas.length+' trilhas selecionadas';
    $('#mapa-titulo').textContent='Árvore geradora mínima';
    $('#mapa-legenda').textContent='Trilhas em verde compõem a árvore geradora mínima';
    $('#resultado-titulo').textContent='Arestas selecionadas pelo Prim';
    $('#resultado-tipo').textContent='PRIM';
    $('#explicacao-titulo').textContent='Como funciona Prim?';
    $('#explicacao').textContent='Começa com um vértice e acrescenta sempre a trilha mais curta que conecta um vértice já incluído a outro ainda fora da árvore, evitando ciclos.';
    montarDestaque('Distância total mínima',agm.custoTotal+' km',agm.arestas.length+' trilhas para interligar '+VERTICES.length+' destinos.');
    renderTabela(['Trilha selecionada','Distância'],agm.arestas.map(e=>({valores:[e.de+' — '+e.para,e.peso+' km']})));
  }
}
$('#origem').addEventListener('change',e=>{origem=e.target.value;atualizar();});
$('#destino').addEventListener('change',e=>{destino=e.target.value;atualizar();});
$('#modo-dijkstra').addEventListener('click',()=>{modo='dijkstra';atualizar();});
$('#modo-prim').addEventListener('click',()=>{modo='prim';atualizar();});
atualizar();
