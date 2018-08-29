import { taxonomy } from '@pnp/sp-taxonomy';

export class SPTaxonomyService {
  public async GetAllTerms(): Promise<string[]> {
    const stores = await taxonomy.termStores.get();
    const store = stores[0];
    const termSet = store.getTermSetById('a53ab75f-a049-42cc-a6cf-9ba9d04b7ffe');
    const terms = await termSet.terms.get();
    return terms.map((term) => term.PathOfTerm);
  }
}
