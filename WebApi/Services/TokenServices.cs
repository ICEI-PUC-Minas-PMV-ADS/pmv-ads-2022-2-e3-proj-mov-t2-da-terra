using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebApi.Models;
using WebApi.ViewModel;

namespace WebApi.Services
{
  public class TokenServices
  {
    public static string GenerateToken(
      Produtor produtor = null,
      Cliente cliente = null)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(Settings.Secret); // Pega a Chave   

      if (produtor != null)     // PRODUTOR
      {
        var id = produtor.Id.ToString();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new[]{       
          new Claim(ClaimTypes.Name, produtor.Nome),	// User.Identy.Name   
        }),
          Expires = DateTime.UtcNow.AddDays(8),   // Tempo de expiração do token
          SigningCredentials = new SigningCredentials(
              new SymmetricSecurityKey(key),
              SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);  // Retorna JSON
      }
      else        // CLIENTE
      {
        var id = cliente.Id.ToString();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new[]{         
          new Claim(ClaimTypes.Name, cliente.Nome),
         // new Claim(ClaimTypes.Role, cliente.TipoUsuario) // User.Identy.Name
        //  new Claim(ClaimTypes.Email, cliente.Email),
        }),
          Expires = DateTime.UtcNow.AddDays(8),
          SigningCredentials = new SigningCredentials(
                     new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
      }
    }
  }
}