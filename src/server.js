import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../public');
const porta=Number(process.env.PORT||3000);
const tipos={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};

const server=createServer(async(req,res)=>{
  try{
    if(req.method!=='GET'){
      res.writeHead(405,{'Content-Type':'text/plain; charset=utf-8'});
      return res.end('Método não permitido');
    }
    const url=new URL(req.url,'http://localhost');
    const caminho=path.resolve(raiz,'.'+(url.pathname==='/'?'/index.html':url.pathname));
    if(!caminho.startsWith(raiz+path.sep)){
      res.writeHead(403);
      return res.end('Acesso negado');
    }
    if(!(await stat(caminho)).isFile())throw new Error('Arquivo inválido');
    const dados=await readFile(caminho);
    res.writeHead(200,{'Content-Type':(tipos[path.extname(caminho)]||'application/octet-stream')+'; charset=utf-8','X-Content-Type-Options':'nosniff'});
    res.end(dados);
  }catch{
    res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});
    res.end('Página não encontrada');
  }
});
server.listen(porta,()=>console.log('Trilhas do Parque: http://localhost:'+porta));
