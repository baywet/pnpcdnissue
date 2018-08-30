## pnpcdnissue

reproduces the dedup issue with common dependencies on node modules

## get it working
- open `src/webparts/HelloWorldWebPart.ts` replace the id by any term set id.  
- (in project) `gulp clean` then `gulp build` then `gulp bundle --ship`, open `temp/deploy/` note the hello webpart js file size.
- (in library) `npm run build` then `npm link`
- in the webpart file replace `import { SPTaxonomyService } from './SPTaxonomyService';` by `import { SPTaxonomyService } from 'pnpcdnissuelibrary';`
- (in project) `npm link pnpcdnissuelibrary` then `gulp clean` then `gulp build` then `gulp bundle --ship`, open `temp/deploy/` note the hello webpart js file size.

File size is different
