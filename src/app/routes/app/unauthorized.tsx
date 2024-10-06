import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <ShieldAlert className="w-16 h-16 text-warning mb-4" />
            <h1 className="text-4xl font-bold mb-2">403 - Unauthorized</h1>
            <p className="text-xl mb-2">Oops! You don't have permission to access this page.</p>
            <p className="text-lg mb-8">Please check your credentials and try again.</p>
            <div className="space-x-4">
                <Button asChild variant="default">
                    <Link to="/">Go to Home</Link>
                </Button>
            </div>
        </div>
    );
};
