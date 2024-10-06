import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
            <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Button asChild>
                <Link to="/">Go back home</Link>
            </Button>
        </div>
    );
};
