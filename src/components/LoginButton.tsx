import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "@/configs/authConfig";
import { Button } from "@/components/ui/button";

function LoginButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  // async function getToken(): Promise<any> {
  //   const accounts = instance.getAllAccounts();
  //   if (accounts.length > 0) {
  //     instance.setActiveAccount(accounts[0]);
  //   }
  //   console.log("🚀 ~ getToken ~ currentAccount:", accounts);

  //   const accessTokenRequest = {
  //     scopes: loginRequest.scopes,
  //     account: accounts[0],
  //   };

  //   // if (currentAccount) {
  //   //   if (currentAccount.tenantId == msalConfig.auth.tenantId) {
  //   //     const roles = (currentAccount.idTokenClaims as { [key: string]: any }).roles;
  //   //     if (roles) {
  //   //       const intersection = Object.keys(appRoles).filter((role) => roles.includes(role));
  //   //       if (intersection.length > 0) {
  //   const accessTokenResponse = await instance.acquireTokenSilent(
  //     accessTokenRequest
  //   );
  //   console.log(
  //     "🚀 ~ getToken ~ accessTokenResponse:",
  //     accessTokenResponse.accessToken
  //   );
  //   //         return `Bearer ${accessTokenResponse.accessToken}`;
  //   //       }
  //   //     }
  //   //   }
  //   //   return null;
  //   // }
  //   return null;
  // }

  return (
    <>
      <Button onClick={handleLogin}>Login with Azure AD</Button>
    </>
  );
}

export default LoginButton;
