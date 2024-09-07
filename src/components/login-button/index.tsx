import { useMsal } from "@azure/msal-react";
import { Button } from "@/components/ui/button";

function LoginButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return (
    <>
      <Button className="font-regular" onClick={handleLogin}>เข้าสู่ระบบ</Button>
    </>
  );
}

export default LoginButton;
