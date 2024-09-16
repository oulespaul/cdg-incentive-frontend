export const msalConfig = {
  auth: {
    clientId: "6dd3a7cf-63fb-43ff-9ff3-43944c306c24",
    authority: "https://login.microsoftonline.com/intasarnkoutlook.onmicrosoft.com",
    redirectUri: "/app",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      // loggerCallback: (level: LogLevel, message: string, containsPii: any) => {
      //   if (containsPii) {
      //     return;
      //   }
      //   switch (level) {
      //     case LogLevel.Error:
      //       console.error(message);
      //       return;
      //     case LogLevel.Info:
      //       console.info(message);
      //       return;
      //     case LogLevel.Verbose:
      //       console.debug(message);
      //       return;
      //     case LogLevel.Warning:
      //       console.warn(message);
      //       return;
      //     default:
      //       return;
      //   }
      // },
    },
  },
};

export const loginRequest = {
  scopes: ["api://6dd3a7cf-63fb-43ff-9ff3-43944c306c24/All.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
