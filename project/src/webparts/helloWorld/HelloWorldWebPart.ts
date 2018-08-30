// blind require statements
require("tslib");
require("@pnp/logging");
require("@pnp/common");
require("@pnp/odata");
require("@pnp/sp-clientsvc");
require("@pnp/sp-taxonomy");
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';

import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
import { SPTaxonomyService } from './SPTaxonomyService';
// import { SPTaxonomyService } from 'pnpcdnissuelibrary';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  public async onInit(): Promise<void> {
    await super.onInit();
    sp.setup({
      spfxContext: this.context,
    });
    const service = new SPTaxonomyService('a53ab75f-a049-42cc-a6cf-9ba9d04b7ffe');
    const terms = await service.GetAllTerms();
    console.log(terms.reduce((x, y) => `${x}\r\n${y}`).substr(0, 255));
  }
  public render(): void {
    const element: React.ReactElement<IHelloWorldProps > = React.createElement(
      HelloWorld,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
