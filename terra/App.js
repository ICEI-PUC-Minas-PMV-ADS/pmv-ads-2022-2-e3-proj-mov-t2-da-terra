import { NavigationContainer } from "@react-navigation/native";

import Main from "./src/Navegacoes/Main";

import { AuthProvider } from "./src/contexts/AuthProvider";
import ProdutoProvider from "./src/contexts/webapi.ProdutoProvider";
import UsuarioProvider from "./src/contexts/webapi.CadastroUsuario";
import ValidarCadastroProvider from "./src/contexts/webapi.ValidarCadastro";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ValidarCadastroProvider>
          <UsuarioProvider>
            <ProdutoProvider>
              <Main />
            </ProdutoProvider>
          </UsuarioProvider>
        </ValidarCadastroProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
