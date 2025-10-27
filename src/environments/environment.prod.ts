// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `on`.

export const environment = {
  production: false,
  defaultauth: "fakebackend",
  lang: "es",
  apiUrl: "https://localhost:8063/WebBFF.Cliente",
  apiAuthUrl: "https://localhost:8063/WebBFF.Cliente",
  api_bugs: "",
  budget_type: 100,
  fakebackendConfig: {
    client_id: "9CAAC481-CD4F-4F33-AFE2-47372939CD79",
    client_secret: "978ED84B-7F68-4D9D-AB40-BEB15E165233",
    grant_type: "client_credentials",
    scope: "backend",
    company: "Marken",
  },
  firebaseConfig: {
    apiKey: "AIzaSyBlM7rXtZTq8ipkVDVYzdt4EurygD90tbk",
    authDomain: "heifer-local.firebaseapp.com",
    projectId: "heifer-local",
    storageBucket: "heifer-local.appspot.com",
    messagingSenderId: "611559536524",
    appId: "1:611559536524:web:2934b356d041b5d13cc8a9",
    measurementId: "G-NLL0HP3V05",
  },
};
