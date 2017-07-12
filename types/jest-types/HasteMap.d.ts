// import {ModuleMap, FS as HasteFS} from 'jest-haste-map';
type ModuleMap = any;
type HasteFS = any;

import {Path} from './Config';

export interface FileData {[filepath: string]: FileMetaData; }
export interface MockData {[id: string]: Path; }
export interface ModuleMapData {[id: string]: ModuleMapItem; }
export interface WatchmanClocks {[filepath: string]: string; }
export type HasteRegExp = RegExp | ((str: string) => boolean);

export interface DuplicatesSet {[filePath: string]: /* type */ number; }
export interface DuplicatesIndex {
  [id: string]: {[platform: string]: DuplicatesSet};
}

export interface InternalHasteMap {
  clocks: WatchmanClocks;
  duplicates: DuplicatesIndex;
  files: FileData;
  map: ModuleMapData;
  mocks: MockData;
}

export interface HasteMap {
  hasteFS: HasteFS;
  moduleMap: ModuleMap;
  __hasteMapForTest?: void | InternalHasteMap;
}

export interface RawModuleMap {
  duplicates: DuplicatesIndex;
  map: ModuleMapData;
  mocks: MockData;
}

export type FileMetaData = [
  /* id           */ string,
  /* mtime        */ number,
  /* visited      */ 0 | 1,
  /* dependencies */ string[]
];

interface ModuleMapItem {[platform: string]: ModuleMetaData; }
export type ModuleMetaData = [Path, /* type */ number];

export declare enum HType {
  ID = 0,
  MTIME = 1,
  VISITED = 2,
  DEPENDENCIES = 3,
  PATH = 0,
  TYPE = 1,
  MODULE = 0,
  PACKAGE = 1,
  GENERIC_PLATFORM = 'g',
  NATIVE_PLATFORM = 'native',
}

export type HTypeValue = 0 | 1 | 2 | 3 | 'g';
