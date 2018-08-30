import { taxonomy } from '@pnp/sp-taxonomy';

export class SPTaxonomyService {
  public constructor(private _termSetId: string) {

  }
  public async GetAllTerms(): Promise<string[]> {
    const stores = await taxonomy.termStores.get();
    const store = stores[0];
    const termSet = store.getTermSetById(this._termSetId);
    const terms = await termSet.terms.get();
    return terms.map((term) => term.PathOfTerm);
  }
}
