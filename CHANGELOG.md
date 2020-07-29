# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.0.0"></a>
# [3.0.0](https://github.com/ikatyang/jest-playback/compare/v2.0.2...v3.0.0) (2020-07-29)


### Features

* upgrade Nock to v13 ([#411](https://github.com/ikatyang/jest-playback/issues/411)) ([9ec364e](https://github.com/ikatyang/jest-playback/commit/9ec364e))


### BREAKING CHANGES

* require Node 10+



<a name="2.0.2"></a>
## [2.0.2](https://github.com/ikatyang/jest-playback/compare/v2.0.1...v2.0.2) (2018-11-30)


### Bug Fixes

* compute hash correctly for records with JSON body ([#351](https://github.com/ikatyang/jest-playback/issues/351)) ([e9c156a](https://github.com/ikatyang/jest-playback/commit/e9c156a))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/ikatyang/jest-playback/compare/v2.0.0...v2.0.1) (2018-09-21)


### Bug Fixes

* **play:** disable allowUnmocked ([#328](https://github.com/ikatyang/jest-playback/issues/328)) ([4ebeb6d](https://github.com/ikatyang/jest-playback/commit/4ebeb6d))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/ikatyang/jest-playback/compare/v1.0.1...v2.0.0) (2018-07-28)


### Features

* parallel testing ([#313](https://github.com/ikatyang/jest-playback/issues/313)) ([94c1de1](https://github.com/ikatyang/jest-playback/commit/94c1de1))


### BREAKING CHANGES

- directly use `require` to setup instead of using `reporter`
- drop options
  - `playbacks` and `mode_env` are not configurable
  - completely dropped `debug`
  - moved `mode` to the setup API



<a name="1.0.1"></a>
## [1.0.1](https://github.com/ikatyang/jest-playback/compare/v1.0.0...v1.0.1) (2017-09-05)


### Bug Fixes

* **peerDeps:** accept jest ^21.0.0 ([#70](https://github.com/ikatyang/jest-playback/issues/70)) ([8b85f7b](https://github.com/ikatyang/jest-playback/commit/8b85f7b))



<a name="v1.0.0"></a>
## v1.0.0 (2017-07-13)

#### 🚀 New Feature
- Release first version
