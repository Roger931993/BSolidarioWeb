// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `on`.

export const environment = {
  production: false,
  defaultauth: 'fakebackend',
  lang: 'es',
  apiUrl: 'https://api.appheifer-ecuador.org',
  apiAuthUrl: 'https://auth.appheifer-ecuador.org',
  // apiUrl: 'https://localhost:44390',
  // apiAuthUrl: 'https://localhost:44325',
  fakebackendConfig: {
    client_id: '9CAAC481-CD4F-4F33-AFE2-47372939CD79',
    client_secret: '978ED84B-7F68-4D9D-AB40-BEB15E165233',
    grant_type: 'client_credentials',
    scope: 'backend',
    company: 'Marken',
  },
  firebaseConfig: {
    apiKey: 'AIzaSyBlM7rXtZTq8ipkVDVYzdt4EurygD90tbk',
    authDomain: 'heifer-local.firebaseapp.com',
    projectId: 'heifer-local',
    storageBucket: 'heifer-local.appspot.com',
    messagingSenderId: '611559536524',
    appId: '1:611559536524:web:2934b356d041b5d13cc8a9',
    measurementId: 'G-NLL0HP3V05',
  },
  formatfiles: {
    resultframework: 'assets/inputs/Catalogos/Carga_Result_Framework-last.xlsx',
    alliance: 'assets/inputs/Catalogos/Carga_Alliance.xlsx',
    organization: 'assets/inputs/Catalogos/Carga_Organizaciones.xlsx',
    strategyframework: 'assets/inputs/Catalogos/Formato_Indicadores_MEP.xlsx',
    indicator: 'assets/inputs/Catalogos/Carga_Indicator.xlsx',
    project: 'assets/inputs/Catalogos/Carga_Proyectos.xlsx',
    framework: 'assets/inputs/Catalogos/Carga_Codigo_Framework-Last.xlsx',
    donater: 'assets/inputs/Catalogos/carga-donantes.xlsx',
    budget: 'assets/inputs/Catalogos/Carga_Presupuesto_DO_Last.xlsx',
    budgetda: 'assets/inputs/Catalogos/Carga_Presupuesto_DA_Last.xlsx',
  },
  KeyAES256: 'ThisIsA32ByteLongSecretKey123456',
  urlLoadFile: 'https://api.appheifer-ecuador.org/api/FileLoad',
  api_bugs: '',
  budget_type: 100,
  dahboard_externo:
    'https://app.powerbi.com/view?r=eyJrIjoiZGU4ODYzYmQtOGFhNC00ZjQ2LWFhM2UtMjViOTlkNzVhY2IyIiwidCI6ImRhNmE2OWUzLTNiY2QtNGY0NC1hMzQwLWFlYWQwY2ZkYTA4ZiIsImMiOjN9',
  // api_bugs: '/mattermost-hook',
};

/*
 * Local : 'https://localhost:7071',
 * Server: 'https://51.222.138.68/MarkenERPAPI',
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// url load file def [https://httpbin.org/post].
