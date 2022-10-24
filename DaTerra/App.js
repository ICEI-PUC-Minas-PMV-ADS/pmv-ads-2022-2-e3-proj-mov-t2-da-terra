import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthProvider";

import ProdutoProvider from "./src/contexts/webapi.ProdutoProvider";
import Main from "./src/Navegacoes/Main";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ProdutoProvider>
          <Main />
        </ProdutoProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
