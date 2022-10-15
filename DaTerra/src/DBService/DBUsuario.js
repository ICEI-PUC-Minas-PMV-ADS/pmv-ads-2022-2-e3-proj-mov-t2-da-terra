import Database from "./DBService";
const DB_EXEC = Database.getConnection();

export const insertUsuario = async (usuario) => {
  let results = await DB_EXEC(
    "INSERT INTO Usuarios " +
      "(nome,dtNascimento,cpf,telefone,rua,bairro,numCasa,cep,cidade,uf,complemento,email,senha,tipoUsuario) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
    [
      usuario.nome,
      usuario.dtNascimento,
      usuario.cpf,
      usuario.telefone,
      usuario.rua,
      usuario.bairro,
      usuario.numCasa,
      usuario.cep,
      usuario.cidade,
      usuario.uf,
      usuario.complemento,
      usuario.email,
      usuario.senha,
      usuario.tipoUsuario,
    ]
  );
  console.log(results);
  return results.rowsAffected;
};

export const getUsuario = async (id) => {
  let result = await DB_EXEC('SELECT * FROM Usuarios WHERE id=?;',[id]);

  return result.rows._array;
};
export const getLogin = async (email,senha) => {
  let resultEmail = await DB_EXEC('SELECT * FROM Usuarios WHERE email=?;',[email]);
  let resultPassword = await DB_EXEC('SELECT email FROM Usuarios WHERE senha=?;',[senha]);


   if(resultEmail.rows._array[0]!=undefined && resultPassword.rows._array[0] == undefined){
    console.log("Deu errado parceiro")
   }
   else{

    return resultEmail.rows._array;

   }
   
};
