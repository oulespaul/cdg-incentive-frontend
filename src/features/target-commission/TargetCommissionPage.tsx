import { useMsal } from "@azure/msal-react";
import { Button } from "@/components/ui/button";

const TargetCommissionPage = () => {
    const { instance } = useMsal();
    return (
        <div>
            <div>TargetCommissionPage</div>
            <Button onClick={() => instance.logout()}>Logout</Button>
        </div>
    );
};

export default TargetCommissionPage;
