using Microsoft.IdentityModel.Tokens;
using NoteApp.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NoteApp.Security
{
    public static class JwtTokenHandler
    {
        private const string ID_CLAIM = "id";

        public static long? GetIdClaim(ClaimsPrincipal user)
        {
            var claimSub = (from claim in user.Claims
                            where claim.Type == ID_CLAIM
                            select claim).FirstOrDefault()?.Value;

            if (long.TryParse(claimSub, out long userId))
            {
                return userId;
            }
            return null;
        }

        public static UserToken CreateToken(IConfiguration config, User user)
        {
            var expires = DateTime.UtcNow.AddDays(5);
            var issuer = config["Jwt:Issuer"];
            var audience = config["Jwt:Audience"];
            var key = Encoding.ASCII.GetBytes(config["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ID_CLAIM, $"{user.Id}"),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString())
                }),
                Expires = expires,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            return new UserToken { Email = user.Email, ExpiresAt = expires, JWT = jwtToken };
        }
    }
}
