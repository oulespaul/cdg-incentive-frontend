import { Outlet } from "react-router-dom"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useMsal } from "@azure/msal-react"
import { LogOut, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginRequest } from "@/configs/authConfig";

export default function DashboardLayout() {
    const { instance, accounts } = useMsal();

    async function getToken(): Promise<any> {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
            instance.setActiveAccount(accounts[0]);
        }
        console.log("🚀 ~ getToken ~ currentAccount:", accounts);

        const accessTokenRequest = {
            scopes: loginRequest.scopes,
            account: accounts[0],
        };

        // if (currentAccount) {
        //   if (currentAccount.tenantId == msalConfig.auth.tenantId) {
        //     const roles = (currentAccount.idTokenClaims as { [key: string]: any }).roles;
        //     if (roles) {
        //       const intersection = Object.keys(appRoles).filter((role) => roles.includes(role));
        //       if (intersection.length > 0) {
        const accessTokenResponse = await instance.acquireTokenSilent(
            accessTokenRequest
        );
        console.log(
            "🚀 ~ getToken ~ accessTokenResponse:",
            accessTokenResponse.accessToken
        );
        //         return `Bearer ${accessTokenResponse.accessToken}`;
        //       }
        //     }
        //   }
        //   return null;
        // }
        return null;
    }

    return (
        <div className="min-h-screen">
            <header className="flex justify-between bg-primary px-4 py-1">
                <div className="flex items-center">
                    <Avatar className="mr-2">
                        <AvatarImage src="/central-logo2.png" alt="central-logo2" />
                    </Avatar>
                    <div className="flex flex-col items-start">
                        <p className="text-primary-foreground text-base	font-semibold">CDG</p>
                        <p className="text-primary-foreground text-base	font-semibold">Incentive System</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Avatar className="mr-2 rounded bg-blue-600">
                        <UserRound className="h-10 w-10" color="white" />
                    </Avatar>
                    <div className="flex flex-col items-start mr-2">
                        <p className="text-primary-foreground text-sm font-semibold">{accounts[0]?.name}</p>
                        <p className="text-primary-foreground text-xs font-normal">{accounts[0]?.username}</p>
                    </div>
                    <Button>
                        <LogOut onClick={() => instance.logout()} />
                    </Button>
                </div>
            </header>
            <main className="">
                <Outlet />
            </main>
        </div>
    )
}