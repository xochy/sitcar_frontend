// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    baseUrl: 'http://sitcar.test/api/v1',
    storageUrl: 'http://sitcar.test/storage/',

    currencyURL:
        'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno',
    currencyToken:
        '8fdb5e3fbd8fc877cd42e7394ab62aea970a0413c46fcf75d00ee18d0c9ba35c',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
