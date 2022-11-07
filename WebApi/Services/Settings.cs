using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Services
{
  public class Settings
  {
    // Chave do Token: Somente o Server tem acesso (É usada para encriptar e desencriptar o token)
    public static string Secret = "c5cbc70ba069636e2b8b1fd78a772491081b2e5a9cfa1d013512";
  }
}

// Gerando aleatorio em JS:  const token = Math.random().toString(16).substring(2);

