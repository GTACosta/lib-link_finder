#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import pArq from './index.js';
import listValida from './http-validacao.js';

const caminho = process.argv;

async function impLista(val, res, ident = '') {
  if (val) {
    console.log(
      chalk.yellow('Lista validada!'),
      chalk.black.bgGreen(ident),
      await listValida(res));    
  } else {
    console.log(
      chalk.yellow('Lista de links: '),
      chalk.black.bgGreen(ident),
      res);
  }
}


async function procTexto(args) {
  const cam = args[2];
  const val = args[3] === '--valida';

  try {
    fs.lstatSync(cam);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log('Arquivo e/ou Diretório não existe!');
      return;
    }
  }

  if (fs.lstatSync(cam).isFile()) {
    const result = await pArq(args[2]);
    impLista(val, res);
  } else if (fs.lstatSync(cam).isDirectory()) {
    const arqs = await fs.promises.readdir(cam)
    arqs.forEach(async (nome) => {
      const list = await pegaArquivo(`${cam}/${nome}`)
      impLista(val, list, nome)
    })
  }
}

procTexto(caminho);