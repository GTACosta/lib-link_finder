import chalk from "chalk";

function extLinks (arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
};

async function checStatus (listaURLs) {
  const arrStatus = await Promise
  .all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url)
        return response.status;
      } catch (erro) {
        return mErros(erro);
      }
    })
  )
  return arrStatus;
};

function mErros (erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return 'Link não encontrado!';
  } else {
    return 'Erro!';
  }
};

export default async function listValida (listaLinks) {
  const links = extLinks(listaLinks);
  const status = await checStatus(links);

  return listaLinks.map((obj, index) => ({
    ...obj,
    status: status[index]
  }))
}