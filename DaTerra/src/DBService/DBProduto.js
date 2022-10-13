import Database from "./DBService";
const DB_EXEC = Database.getConnection();

export const cadastrarProduto = async (produto) => {
  let results = await DB_EXEC('INSERT INTO Produtos' +
    '(nomeProduto,preco,tipoEmbalagem,quantidadeEstoque,categoriaProduto,descricao)VALUES(?,?,?,?,?,?)', [produto.nomeProduto, produto.preco, produto.tipoEmbalagem, produto.quantidadeEstoque, produto.categoriaProduto, produto.descricao]);
  return rowsAffected;
}


//Será um metodo para  chamar quando renderizar a tela de loja do produtor,e mostrar todos os produtos daquele usuário de acordo com a sua ID.
export const getProdutosUsuario = async () => {
  let results = await DB_EXEC('SELECT *FROM Produtos')
  return results.rows._array;

//WHERE id=?;", [idUsuario]

}