// blind require statements
require("@pnp/sp-clientsvc");
require("@pnp/sp-taxonomy");
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HelloWorldApplicationCustomizerStrings';
import { sp } from '@pnp/pnpjs';
import { SPTaxonomyService } from '../../webparts/helloWorld/SPTaxonomyService';

const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {

  @override
  public async onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    await super.onInit();
    sp.setup({
      spfxContext: this.context,
    });
    const service = new SPTaxonomyService('a53ab75f-a049-42cc-a6cf-9ba9d04b7ffe');
    const terms = await service.GetAllTerms();
    console.log(terms.reduce((x, y) => `${x}\r\n${y}`).substr(0, 255));
  }
}
