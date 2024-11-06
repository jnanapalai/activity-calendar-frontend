import { AuthConfig } from "angular-oauth2-oidc";

export const authconfig: AuthConfig = {
    issuer: 'http://localhost:8180/realms/oauth2-realm-demo',
    redirectUri: 'http://localhost:4200/(outletcalendarpage:showcalendar//outletwelcomepage:login)',
    //redirectUri: 'http://localhost:4200/callback',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: 'oauth2-demo-client',
    responseType: 'code',
    strictDiscoveryDocumentValidation: true,
    scope: 'openid profile email offline_access',
    waitForTokenInMsec: 5000
}