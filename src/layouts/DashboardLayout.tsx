import { Outlet } from "react-router-dom"
import { Avatar, AvatarImage } from "../components/ui/avatar"

export default function DashboardLayout() {
    return (
        <div className="min-h-screen">
            <header className="flex justify-between bg-primary px-4 py-1">
                <div className="flex items-center">
                    <Avatar className="mr-2">
                        <AvatarImage src="public/central-logo2.png" alt="central-logo2"/>
                    </Avatar>
                    <div className="flex flex-col items-start">
                        <p className="text-primary-foreground text-base	font-semibold">CDG</p>
                        <p className="text-primary-foreground text-base	font-semibold">Incentive System</p>
                    </div>
                </div>
            </header>
            <main className="flex justify-center">
                <Outlet />
            </main>
        </div>
    )
}