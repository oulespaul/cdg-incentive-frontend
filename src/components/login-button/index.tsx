import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

function LoginButton() {
    const { login } = useAuth();

    return (
        <>
            <Button className="font-regular" onClick={login}>
                เข้าสู่ระบบ
            </Button>
        </>
    );
}

export default LoginButton;
