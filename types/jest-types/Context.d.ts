import {ProjectConfig} from './Config';
import {HasteFS, ModuleMap} from './HasteMap';

// import HasteResolver from 'jest-resolve';
type HasteResolver = any;

export interface Context {
  config: ProjectConfig;
  hasteFS: HasteFS;
  moduleMap: ModuleMap;
  resolver: HasteResolver;
}
