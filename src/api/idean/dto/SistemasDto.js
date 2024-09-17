module.exports.SistemasDto = class SistemasDto {

  constructor({
    ideSistema,
    nome,
    sigla,
    descricao,
    estadoImplantacao,
    gestorNegocio,
    gestorTecnico,
    gestorPermissao,
    urlGerenciadorTarefasMudancas,
    url,
    areausuaria,
    gestoresPerfilContexto,
  }) {
      this.ideSistema = ideSistema;
      this.nome = nome;
      this.sigla = sigla;
      this.descricao = descricao;
      this.estadoImplantacao = estadoImplantacao;
      this.gestorNegocio = gestorNegocio;
      this.gestorTecnico = gestorTecnico;
      this.gestorPermissao = gestorPermissao;
      this.urlGerenciadorTarefasMudancas = urlGerenciadorTarefasMudancas;
      this.url = url;
      this.areausuaria = areausuaria;
      this.gestoresPerfilContexto = gestoresPerfilContexto;
  }
}