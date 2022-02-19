import { Config } from '@stencil/core';
import { angularOutputTarget as angular } from '@stencil/angular-output-target';
import { reactOutputTarget as react } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'companies-house-component',
  outputTargets: [
    angular({
      componentCorePackage: `unipaas`,
      directivesProxyFile: `../angular/src/lib/stencil-generated/components.ts`
    }),
    react({
      componentCorePackage: 'unipaas',
      proxiesFile: '../react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
