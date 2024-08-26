import LoginButton from "@/components/LoginButton";

export default function AuthenticationPage() {
  return (
    <div className="w-full relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex justify-center">
        <div className="absolute inset-0 h-full bg-authen-banner bg-cover bg-no-repeat"></div>
        <div className="relative z-20">
          <p className="text-3xl font-bold">Central Department Store Group</p>
          <p className="text-xl font-semibold">Incentive System</p>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex">
              <img src="/central-robinson-logo.png" alt="central-robinson-logo" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              เข้าสู่ระบบ
            </h1>
            <p className="text-sm text-muted-foreground font-semibold">
              เข้าสู่ระบบผ่าน Single Sign-On
            </p>
          </div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
