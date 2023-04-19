import fs from 'fs';
import chalk from 'chalk';

function extLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capts = [...texto.matchAll(regex)];
  const results = capts.map(capt => ({[capt[1]]: capt[2]}))
  return results.length !== 0 ? results : 'Links não encontrados!';
}

function trErro(erro) {
  console.log(erro);
  throw new Error(chalk.red(erro.code, 'Arquivo não encontrado!'));
}

async function pArq(caminho) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminho, encoding)
    return extLinks(texto);
  } catch (erro) {
    trErro(erro)
  }
}

export default pArq;