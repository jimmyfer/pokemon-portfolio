/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/assetsManager.ts":
/*!*************************************!*\
  !*** ./src/assets/assetsManager.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssetManager: () => (/* binding */ AssetManager)
/* harmony export */ });
/* harmony import */ var _core_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/decorators/injectable */ "./src/core/decorators/injectable.ts");
/* harmony import */ var _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/rendering/sprite-sheet */ "./src/rendering/sprite-sheet.ts");
/* harmony import */ var _image_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-cache */ "./src/assets/image-cache.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AssetManager = class AssetManager {
    spriteSheets = new Map();
    jsonData = new Map();
    constructor() { }
    async loadJson(name, url) {
        if (this.jsonData.has(name)) {
            return this.jsonData.get(name);
        }
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.jsonData.set(name, data);
            return data;
        }
        catch (error) {
            throw new Error(`Failed to load JSON ${name}: ${error}`);
        }
    }
    async loadImage(name, url) {
        try {
            const img = await _image_cache__WEBPACK_IMPORTED_MODULE_2__.ImageCache.load(url);
            return img;
        }
        catch (error) {
            throw new Error(`Failed to load image ${name}: ${error}`);
        }
    }
    getSpriteSheet(name) {
        if (!this.spriteSheets.has(name)) {
            throw new Error(`SpriteSheet '${name}' not loaded`);
        }
        return this.spriteSheets.get(name);
    }
    async loadSpriteSheet(name, url, frameWidth, frameHeight, padding = 0) {
        if (this.spriteSheets.has(name)) {
            return this.spriteSheets.get(name);
        }
        const img = await this.loadImage(name, url);
        const spriteSheet = new _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_1__.SpriteSheet(img, frameWidth, frameHeight, padding);
        this.spriteSheets.set(name, spriteSheet);
        return spriteSheet;
    }
    getJson(name) {
        if (!this.jsonData.has(name)) {
            throw new Error(`JSON data '${name}' not loaded`);
        }
        return this.jsonData.get(name);
    }
};
AssetManager = __decorate([
    (0,_core_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)(),
    __metadata("design:paramtypes", [])
], AssetManager);



/***/ }),

/***/ "./src/assets/html/layout/arrow_rigth.png":
/*!************************************************!*\
  !*** ./src/assets/html/layout/arrow_rigth.png ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e385083e6ac8ee3bd54c.png";

/***/ }),

/***/ "./src/assets/html/layout/bag_selector.png":
/*!*************************************************!*\
  !*** ./src/assets/html/layout/bag_selector.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "89207b34c66f80e937e9.png";

/***/ }),

/***/ "./src/assets/html/layout/close_btn.png":
/*!**********************************************!*\
  !*** ./src/assets/html/layout/close_btn.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "75bf5e391988ee619c26.png";

/***/ }),

/***/ "./src/assets/html/layout/inventory.png":
/*!**********************************************!*\
  !*** ./src/assets/html/layout/inventory.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a310ba5be3a410fa2101.png";

/***/ }),

/***/ "./src/assets/html/layout/menu_btn.png":
/*!*********************************************!*\
  !*** ./src/assets/html/layout/menu_btn.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5b1bb886729819d2bb9b.png";

/***/ }),

/***/ "./src/assets/html/layout/menu_content.png":
/*!*************************************************!*\
  !*** ./src/assets/html/layout/menu_content.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1e486534e0429f1eb5f6.png";

/***/ }),

/***/ "./src/assets/html/layout/rigth_arrow.png":
/*!************************************************!*\
  !*** ./src/assets/html/layout/rigth_arrow.png ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4ad1ef1cd06d34d78ba6.png";

/***/ }),

/***/ "./src/assets/html/layout/trainer_card_back.png":
/*!******************************************************!*\
  !*** ./src/assets/html/layout/trainer_card_back.png ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "8e9558fff26985eaddeb.png";

/***/ }),

/***/ "./src/assets/html/layout/trainer_card_front.png":
/*!*******************************************************!*\
  !*** ./src/assets/html/layout/trainer_card_front.png ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "123ba8a5e486e88edff9.png";

/***/ }),

/***/ "./src/assets/html/layout/wood_sign.png":
/*!**********************************************!*\
  !*** ./src/assets/html/layout/wood_sign.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c3af76fb7dc845ace559.png";

/***/ }),

/***/ "./src/assets/image-cache.ts":
/*!***********************************!*\
  !*** ./src/assets/image-cache.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageCache: () => (/* binding */ ImageCache)
/* harmony export */ });
class ImageCache {
    static cache = new Map();
    static load(url) {
        if (this.cache.has(url)) {
            return Promise.resolve(this.cache.get(url));
        }
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this.cache.set(url, img);
                resolve(img);
            };
            img.onerror = (error) => reject(`Error loading image at ${url}: ${error}`);
        });
    }
    static get(url) {
        return this.cache.get(url);
    }
}


/***/ }),

/***/ "./src/core/decorators/injectable.ts":
/*!*******************************************!*\
  !*** ./src/core/decorators/injectable.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Injectable: () => (/* binding */ Injectable)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");

function Injectable() {
    return (target) => {
        _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().registerBean(target, new target());
    };
}


/***/ }),

/***/ "./src/core/engine/canvas-token.ts":
/*!*****************************************!*\
  !*** ./src/core/engine/canvas-token.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GAME_CANVAS: () => (/* binding */ GAME_CANVAS),
/* harmony export */   TRANSICION_CANVAS: () => (/* binding */ TRANSICION_CANVAS)
/* harmony export */ });
const GAME_CANVAS = {
    name: 'game-canvas',
};
const TRANSICION_CANVAS = {
    name: 'transicion-canvas',
};


/***/ }),

/***/ "./src/core/engine/game-context.ts":
/*!*****************************************!*\
  !*** ./src/core/engine/game-context.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameContext: () => (/* binding */ GameContext)
/* harmony export */ });
class GameContext {
    static instance = new GameContext();
    services = new Map();
    gameScale = 2;
    tilesScale = 2;
    tileSize = 32;
    constructor() { }
    static getInstance() {
        return GameContext.instance;
    }
    registerBean(identifier, instance) {
        this.services.set(identifier, instance);
    }
    getBean(identifier) {
        const instance = this.services.get(identifier);
        if (!instance) {
            const name = typeof identifier === 'function'
                ? identifier.name
                : identifier.name;
            throw new Error(`Service ${name} not registered`);
        }
        return instance;
    }
    setGameScale(scale) {
        this.gameScale = scale;
    }
    getGameScale() {
        return this.gameScale;
    }
    getTilesScale() {
        return this.tilesScale;
    }
    getTileSize() {
        return this.tileSize;
    }
}


/***/ }),

/***/ "./src/core/engine/game-engine.ts":
/*!****************************************!*\
  !*** ./src/core/engine/game-engine.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameEngine: () => (/* binding */ GameEngine)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _core_engine_scene_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/engine/scene-manager */ "./src/core/engine/scene-manager.ts");
/* harmony import */ var _scenes_overworld_scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/scenes/overworld-scene */ "./src/scenes/overworld-scene.ts");
/* harmony import */ var _systems_game_state_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");
/* harmony import */ var _canvas_token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./canvas-token */ "./src/core/engine/canvas-token.ts");






class GameEngine {
    canvasGame;
    canvasTransicion;
    lastFrameTime = 0;
    gameContext;
    assetManager;
    sceneManager;
    gameStateManager;
    canvasGameCtx;
    constructor(config) {
        this.canvasGame = document.getElementById(config.canvasId);
        this.canvasTransicion = document.getElementById(config.canvasTransicionId);
        this.canvasGameCtx = this.canvasGame.getContext('2d', {
            alpha: false,
        });
        this.gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.gameContext.registerBean(_canvas_token__WEBPACK_IMPORTED_MODULE_5__.GAME_CANVAS, this.canvasGame.getContext('2d', { alpha: false }));
        this.gameContext.registerBean(_canvas_token__WEBPACK_IMPORTED_MODULE_5__.TRANSICION_CANVAS, this.canvasTransicion.getContext('2d', { alpha: true }));
        this.assetManager = this.gameContext.getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
        this.sceneManager = this.gameContext.getBean(_core_engine_scene_manager__WEBPACK_IMPORTED_MODULE_2__.SceneManager);
        this.gameStateManager = this.gameContext.getBean(_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_4__.GameStateManager);
        this.initializeCanvas();
        window.addEventListener('resize', () => this.handleResize());
        this.gameLoop = this.gameLoop.bind(this);
    }
    initializeCanvas() {
        this.canvasGame.width = window.screen.width;
        this.canvasGame.height = window.screen.height;
        this.canvasTransicion.width = window.screen.width;
        this.canvasTransicion.height = window.screen.height;
        this.handleResize();
    }
    async initialize() {
        this.gameStateManager.loadFromPersistentStorage();
        await this.loadAssets();
        this.sceneManager.addScene('overworld', new _scenes_overworld_scene__WEBPACK_IMPORTED_MODULE_3__.OverworldScene());
        await this.sceneManager.switchTo('overworld');
    }
    async loadAssets() {
        await this.assetManager.loadSpriteSheet('sprites', 'assets/sprites/sprites.png', 16, 16);
        await this.assetManager.loadSpriteSheet('player', 'assets/sprites/character_01.png', 32, 32);
        await this.assetManager.loadSpriteSheet('player_effect', 'assets/sprites/character_01.png', 32, 32);
        await this.assetManager.loadSpriteSheet('door', 'assets/sprites/sprites.png', 16, 16);
        await this.assetManager.loadSpriteSheet('lab_door', 'assets/sprites/sprites.png', 16, 16);
    }
    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;
        this.sceneManager.currentScene?.update(deltaTime);
        this.canvasGameCtx.save();
        this.canvasGameCtx.clearRect(0, 0, window.screen.width, window.screen.height);
        this.sceneManager.currentScene?.render(this.canvasGameCtx);
        this.canvasGameCtx.restore();
        requestAnimationFrame(this.gameLoop);
    }
    start() {
        requestAnimationFrame(this.gameLoop);
    }
    handleResize() {
        const container = document.getElementById('game-container');
        this.canvasGame.style.transform = `scale(${_core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getGameScale()})`;
        this.canvasGame.style.transformOrigin = 'top left';
        this.canvasTransicion.style.transform = `scale(${_core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getGameScale()})`;
        this.canvasTransicion.style.transformOrigin = 'top left';
        container.style.width = `${window.screen.width}px`;
        container.style.height = `${window.screen.height}px`;
    }
}


/***/ }),

/***/ "./src/core/engine/scene-manager.ts":
/*!******************************************!*\
  !*** ./src/core/engine/scene-manager.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SceneManager: () => (/* binding */ SceneManager)
/* harmony export */ });
/* harmony import */ var _core_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/decorators/injectable */ "./src/core/decorators/injectable.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let SceneManager = class SceneManager {
    scenes = new Map();
    currentScene;
    constructor() { }
    addScene(name, scene) {
        this.scenes.set(name, scene);
        scene.setSceneManager(this);
    }
    async switchTo(name) {
        const nextScene = this.scenes.get(name);
        if (this.currentScene) {
            await this.currentScene.onExit();
        }
        this.currentScene = nextScene;
        await this.currentScene.onEnter();
    }
    update(deltaTime) {
        this.currentScene?.update(deltaTime);
    }
    render(ctx) {
        this.currentScene?.render(ctx);
    }
    getCurrentScene() {
        return this.currentScene;
    }
};
SceneManager = __decorate([
    (0,_core_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)(),
    __metadata("design:paramtypes", [])
], SceneManager);



/***/ }),

/***/ "./src/core/engine/world-manager.ts":
/*!******************************************!*\
  !*** ./src/core/engine/world-manager.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorldManager: () => (/* binding */ WorldManager)
/* harmony export */ });
/* harmony import */ var _decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/injectable */ "./src/core/decorators/injectable.ts");
/* harmony import */ var _game_map_littleroot_town_littleroot_town__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/game/map/littleroot_town/littleroot-town */ "./src/game/map/littleroot_town/littleroot-town.ts");
/* harmony import */ var _game_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");
/* harmony import */ var _systems_game_state_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");
/* harmony import */ var _systems_collision_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../systems/collision-system */ "./src/core/systems/collision-system.ts");
/* harmony import */ var _game_map_route_101_route_101__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/game/map/route_101/route-101 */ "./src/game/map/route_101/route-101.ts");
/* harmony import */ var _systems_event_system__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../systems/event-system */ "./src/core/systems/event-system.ts");
/* harmony import */ var _game_map_littleroot_town_houses_house_01__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/game/map/littleroot_town/houses/house-01 */ "./src/game/map/littleroot_town/houses/house-01.ts");
/* harmony import */ var _game_map_littleroot_town_houses_house_01_f2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/game/map/littleroot_town/houses/house-01-f2 */ "./src/game/map/littleroot_town/houses/house-01-f2.ts");
/* harmony import */ var _game_map_littleroot_town_houses_house_02__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/game/map/littleroot_town/houses/house-02 */ "./src/game/map/littleroot_town/houses/house-02.ts");
/* harmony import */ var _game_map_littleroot_town_houses_house_02_f2__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/game/map/littleroot_town/houses/house-02-f2 */ "./src/game/map/littleroot_town/houses/house-02-f2.ts");
/* harmony import */ var _game_map_littleroot_town_houses_lab__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/game/map/littleroot_town/houses/lab */ "./src/game/map/littleroot_town/houses/lab.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













let WorldManager = class WorldManager {
    currentMapNode;
    currentMap;
    maps = new Map();
    gameStateManager;
    camera;
    collisionSystem;
    eventSystem;
    constructor() {
        const gameContext = _game_context__WEBPACK_IMPORTED_MODULE_2__.GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_4__.GameStateManager);
        this.camera = gameContext.getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_3__.Camera);
        this.collisionSystem = gameContext.getBean(_systems_collision_system__WEBPACK_IMPORTED_MODULE_5__.CollisionSystem);
        this.eventSystem = gameContext.getBean(_systems_event_system__WEBPACK_IMPORTED_MODULE_7__.EventSystem);
    }
    async initialize() {
        await this.buildWorldGraph();
        await this.loadMap();
        this.setupTransitionListeners();
    }
    async buildWorldGraph() {
        this.maps.set('little_root_town', {
            id: 'little_root_town',
            name: 'Root Town',
            loader: _game_map_littleroot_town_littleroot_town__WEBPACK_IMPORTED_MODULE_1__.createLittleRootTown,
            type: 'OPEN_WORLD',
            spawnPoints: new Map([
                [
                    'little_root_town_house01_f1',
                    { spawnPosition: { x: 272, y: 272 }, playerPosition: 'up' },
                ],
                [
                    'little_root_town_house02_f1',
                    { spawnPosition: { x: 272, y: 272 }, playerPosition: 'up' },
                ],
                [
                    'little_root_town_lab',
                    { spawnPosition: { x: 208, y: 400 }, playerPosition: 'up' },
                ],
                [
                    'route_101',
                    { spawnPosition: { x: 496, y: 816 }, playerPosition: 'up' },
                ],
            ]),
        });
        this.maps.set('little_root_town_house01_f1', {
            id: 'little_root_town_house01_f1',
            name: 'Home F1',
            loader: _game_map_littleroot_town_houses_house_01__WEBPACK_IMPORTED_MODULE_8__.createHouseRT01,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town',
                    {
                        spawnPosition: { x: 304, y: 368 },
                        playerPosition: 'down',
                    },
                ],
                [
                    'little_root_town_house01_f2',
                    {
                        spawnPosition: { x: 304, y: 80 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });
        this.maps.set('little_root_town_house01_f2', {
            id: 'little_root_town_house01_f2',
            name: 'Home F2',
            loader: _game_map_littleroot_town_houses_house_01_f2__WEBPACK_IMPORTED_MODULE_9__.createHouseRT01F2,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town_house01_f1',
                    {
                        spawnPosition: { x: 272, y: 112 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });
        this.maps.set('little_root_town_house02_f1', {
            id: 'little_root_town_house02_f1',
            name: 'RT House 02 F1',
            loader: _game_map_littleroot_town_houses_house_02__WEBPACK_IMPORTED_MODULE_10__.createHouseRT02,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town',
                    {
                        spawnPosition: { x: 624, y: 368 },
                        playerPosition: 'down',
                    },
                ],
                [
                    'little_root_town_house02_f2',
                    {
                        spawnPosition: { x: 304, y: 80 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });
        this.maps.set('little_root_town_house02_f2', {
            id: 'little_root_town_house02_f2',
            name: 'RT House 02 F1',
            loader: _game_map_littleroot_town_houses_house_02_f2__WEBPACK_IMPORTED_MODULE_11__.createHouseRT02F2,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town_house02_f1',
                    {
                        spawnPosition: { x: 272, y: 112 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });
        this.maps.set('little_root_town_lab', {
            id: 'little_root_town_lab',
            name: 'RT Lab',
            loader: _game_map_littleroot_town_houses_lab__WEBPACK_IMPORTED_MODULE_12__.createHouseRTLab,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town',
                    {
                        spawnPosition: { x: 368, y: 688 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });
        this.maps.set('route_101', {
            id: 'route_101',
            name: 'Route 101',
            loader: _game_map_route_101_route_101__WEBPACK_IMPORTED_MODULE_6__.createRoute101,
            type: 'OPEN_WORLD',
            spawnPoints: new Map([
                [
                    'little_root_town',
                    {
                        spawnPosition: { x: 496, y: 16 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });
    }
    async loadMap() {
        const currentMap = this.gameStateManager.getState().world.currentMap;
        this.currentMapNode = this.maps.get(currentMap);
        this.currentMap = await this.currentMapNode.loader();
        this.collisionSystem.setTileMap(this.currentMap);
        this.camera.setBounds(this.currentMap.getMapWidth(), this.currentMap.getMapHeight());
    }
    setupTransitionListeners() {
        const eventSystem = _game_context__WEBPACK_IMPORTED_MODULE_2__.GameContext.getInstance().getBean(_systems_event_system__WEBPACK_IMPORTED_MODULE_7__.EventSystem);
        eventSystem.on('MAP_TRANSITION_CLOSED', (data) => this.handleMapLoad(data.targetMapId));
    }
    async handleMapLoad(targetMapId) {
        const spawnPoint = this.currentMapNode.spawnPoints?.get(targetMapId);
        if (!spawnPoint)
            throw new Error('Spawn point invalid');
        this.gameStateManager.updateState((state) => ({
            ...state,
            player: {
                ...state.player,
                position: spawnPoint.spawnPosition,
                spritePosition: spawnPoint.playerPosition,
                canMove: false,
                hidden: false,
            },
            world: { currentMap: targetMapId },
        }));
        await this.loadMap();
        const worldName = this.currentMapNode.type === 'OPEN_WORLD'
            ? this.currentMapNode.name
            : null;
        this.eventSystem.emit('MAP_TRANSITION_READY', {});
    }
    update(deltaTime) {
        this.currentMap.update(deltaTime);
    }
    render(priority) {
        this.currentMap.render(priority);
    }
    getMapData(mapId) {
        return this.maps.get(mapId) ?? null;
    }
};
WorldManager = __decorate([
    (0,_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)(),
    __metadata("design:paramtypes", [])
], WorldManager);



/***/ }),

/***/ "./src/core/systems/collision-system.ts":
/*!**********************************************!*\
  !*** ./src/core/systems/collision-system.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollisionSystem: () => (/* binding */ CollisionSystem)
/* harmony export */ });
/* harmony import */ var _decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/injectable */ "./src/core/decorators/injectable.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let CollisionSystem = class CollisionSystem {
    tileMap;
    constructor() { }
    setTileMap(tileMap) {
        this.tileMap = tileMap;
    }
    isColliding(x, y) {
        const tileCoords = this.worldToTile(x, y);
        return this.checkTileCollision(tileCoords.x, tileCoords.y);
    }
    worldToTile(x, y) {
        const tileSize = this.tileMap.getTileSize();
        return {
            x: Math.floor(x / tileSize),
            y: Math.floor(y / tileSize),
        };
    }
    checkTileCollision(tileX, tileY) {
        const collisionGrid = this.tileMap.getCollisionGrid();
        if (!collisionGrid.length) {
            return false;
        }
        if (tileY >= collisionGrid.length || tileY < 0)
            return true;
        if (tileX >= collisionGrid[0].length || tileX < 0)
            return true;
        return collisionGrid[tileY][tileX];
    }
};
CollisionSystem = __decorate([
    (0,_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)(),
    __metadata("design:paramtypes", [])
], CollisionSystem);



/***/ }),

/***/ "./src/core/systems/effect-system.ts":
/*!*******************************************!*\
  !*** ./src/core/systems/effect-system.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EffectSystem: () => (/* binding */ EffectSystem)
/* harmony export */ });
class EffectSystem {
    triggers = [];
    addTrigger(trigger) {
        this.triggers.push(trigger);
    }
    update(deltaTime) {
        this.triggers.forEach((trigger) => trigger.update(deltaTime));
    }
    render() {
        this.triggers.forEach((trigger) => trigger.render());
    }
}


/***/ }),

/***/ "./src/core/systems/event-system.ts":
/*!******************************************!*\
  !*** ./src/core/systems/event-system.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventSystem: () => (/* binding */ EventSystem)
/* harmony export */ });
/* harmony import */ var _decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/injectable */ "./src/core/decorators/injectable.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let EventSystem = class EventSystem {
    handlers = new Map();
    asyncHandlers = new Map();
    contextCache = new WeakMap();
    on(eventType, handler, context) {
        this.registerHandler(eventType, handler, this.handlers, context);
    }
    onAsync(eventType, handler, context) {
        this.registerHandler(eventType, handler, this.asyncHandlers, context);
    }
    registerHandler(eventType, handler, collection, context) {
        if (!collection.has(eventType)) {
            collection.set(eventType, new Set());
        }
        collection.get(eventType).add(handler);
        if (context) {
            if (!this.contextCache.has(context)) {
                this.contextCache.set(context, new Set());
            }
            this.contextCache.get(context).add(eventType);
        }
    }
    async emit(eventType, data) {
        const syncResults = this.processHandlers(this.handlers, eventType, data);
        const asyncResults = this.processHandlers(this.asyncHandlers, eventType, data);
        await Promise.all([...syncResults, ...asyncResults]);
    }
    *processHandlers(collection, eventType, data) {
        const handlers = collection.get(eventType) || new Set();
        for (const handler of handlers) {
            try {
                const result = handler(data);
                if (result instanceof Promise) {
                    yield result.catch((error) => this.handleError(error, eventType));
                }
            }
            catch (error) {
                this.handleError(error, eventType);
            }
        }
    }
    offContext(context) {
        const events = this.contextCache.get(context) || new Set();
        events.forEach((eventType) => {
            this.handlers.get(eventType)?.forEach((handler) => {
                if (handler.context === context) {
                    this.handlers.get(eventType)?.delete(handler);
                }
            });
            this.asyncHandlers.get(eventType)?.forEach((handler) => {
                if (handler.context === context) {
                    this.asyncHandlers.get(eventType)?.delete(handler);
                }
            });
        });
        this.contextCache.delete(context);
    }
    handleError(error, eventType) {
        console.error(`Error in event handler for ${eventType}:`, error);
        this.emit('EVENT_ERROR', { error, eventType });
    }
    clear() {
        this.handlers.clear();
        this.asyncHandlers.clear();
        this.contextCache = new WeakMap();
    }
};
EventSystem = __decorate([
    (0,_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)()
], EventSystem);



/***/ }),

/***/ "./src/core/systems/game-state-manager.ts":
/*!************************************************!*\
  !*** ./src/core/systems/game-state-manager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameStateManager: () => (/* binding */ GameStateManager)
/* harmony export */ });
/* harmony import */ var _decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/injectable */ "./src/core/decorators/injectable.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let GameStateManager = class GameStateManager {
    state;
    constructor() {
        this.state = this.initialState();
    }
    initialState() {
        return {
            player: {
                position: { x: 500, y: 500 },
                spritePosition: 'down',
                hidden: false,
                canMove: true,
            },
            world: {
                currentMap: 'little_root_town',
            },
        };
    }
    getState() {
        return Object.freeze(structuredClone(this.state));
    }
    updateState(updater) {
        this.state = updater(structuredClone(this.state));
        this.saveToPersistentStorage();
        this.notifyObservers();
    }
    saveToPersistentStorage() {
        const { player, world } = this.state;
        const filteredState = {
            player: {
                position: player.position,
            },
            world,
        };
        localStorage.setItem('gameState', JSON.stringify(filteredState));
    }
    loadFromPersistentStorage() {
        const saved = localStorage.getItem('gameState');
        if (saved) {
            const loadedState = JSON.parse(saved);
            this.state = {
                ...this.state,
                ...loadedState,
                player: {
                    ...this.state.player,
                    ...loadedState.player,
                },
            };
        }
    }
    observers = [];
    subscribe(observer) {
        this.observers.push(observer);
    }
    notifyObservers() {
        this.observers.forEach((observer) => observer(this.getState()));
    }
};
GameStateManager = __decorate([
    (0,_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)(),
    __metadata("design:paramtypes", [])
], GameStateManager);



/***/ }),

/***/ "./src/core/systems/transition-manager.ts":
/*!************************************************!*\
  !*** ./src/core/systems/transition-manager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransitionManager: () => (/* binding */ TransitionManager)
/* harmony export */ });
/* harmony import */ var _decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/injectable */ "./src/core/decorators/injectable.ts");
/* harmony import */ var _engine_game_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _event_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-system */ "./src/core/systems/event-system.ts");
/* harmony import */ var _engine_canvas_token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../engine/canvas-token */ "./src/core/engine/canvas-token.ts");
/* harmony import */ var _transitions_opacity_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transitions/opacity-transition */ "./src/core/transitions/opacity-transition.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let TransitionManager = class TransitionManager {
    currentEffect;
    transitionType = null;
    transitionProgress = 0;
    transitionDuration = 500;
    transitionPhase = null;
    targetMapId = null;
    eventSystem;
    gameContext;
    constructor() {
        this.gameContext = _engine_game_context__WEBPACK_IMPORTED_MODULE_1__.GameContext.getInstance();
        this.eventSystem = this.gameContext.getBean(_event_system__WEBPACK_IMPORTED_MODULE_2__.EventSystem);
        this.initialize();
    }
    initialize() {
        this.eventSystem.on('MAP_TRANSITION', (data) => this.handleMapTransition(data));
        this.eventSystem.on('PAGE_TRANSITION', (data) => this.handlePageTransition(data));
        this.eventSystem.on('PAGE_CLOSED_TRANSITION', () => this.handlePageClosedTransition());
        this.eventSystem.on('MAP_TRANSITION_READY', () => this.handleTransitionClosedReady());
    }
    handleMapTransition(data) {
        this.transitionType = 'map';
        this.targetMapId = data.to;
        this.startTransition(data.effect || new _transitions_opacity_transition__WEBPACK_IMPORTED_MODULE_4__.OpacityTransitionEffect());
    }
    handlePageTransition(data) {
        this.transitionType = 'page';
        this.startTransition(data.effect || new _transitions_opacity_transition__WEBPACK_IMPORTED_MODULE_4__.OpacityTransitionEffect());
        this.eventSystem.emit('PAGE_TRANSITION_STARTED', {
            component: data.component,
            itemName: data.itemName,
        });
    }
    handlePageClosedTransition() {
        this.transitionType = 'page-closed';
        this.startTransition(new _transitions_opacity_transition__WEBPACK_IMPORTED_MODULE_4__.OpacityTransitionEffect());
    }
    startTransition(effect) {
        this.currentEffect = effect;
        this.transitionProgress = 0;
        this.transitionPhase = 'closing';
        this.eventSystem.emit('TRANSITION_START', {});
        this.currentEffect.initialize();
    }
    update(deltaTime) {
        if (!this.currentEffect || !this.transitionPhase)
            return;
        this.transitionProgress += deltaTime / this.transitionDuration;
        this.transitionProgress = Math.min(this.transitionProgress, 1);
        switch (this.transitionPhase) {
            case 'closing':
                this.currentEffect.update(this.transitionProgress);
                if (this.transitionProgress >= 1)
                    this.handleTransitionClosed();
                break;
            case 'opening':
                this.currentEffect.update(1 - this.transitionProgress);
                if (this.transitionProgress >= 1)
                    this.handleTransitionComplete();
                break;
        }
    }
    handleTransitionComplete() {
        if (!this.currentEffect)
            return;
        this.eventSystem.emit('TRANSITION_END', {});
        if (this.transitionType === 'map') {
            this.eventSystem.emit('MAP_TRANSITION_COMPLETE', {});
        }
        else if (this.transitionType === 'page') {
            this.eventSystem.emit('PAGE_TRANSITION_COMPLETE', {});
        }
        else if (this.transitionType === 'page-closed') {
            this.eventSystem.emit('PAGE_CLOSED_TRANSITION_COMPLETE', {});
        }
        this.transitionType = null;
        this.transitionPhase = null;
        this.currentEffect = null;
    }
    render() {
        if (!this.currentEffect)
            return;
        const ctx = this.gameContext.getBean(_engine_canvas_token__WEBPACK_IMPORTED_MODULE_3__.TRANSICION_CANVAS);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.currentEffect.render(ctx);
    }
    handleTransitionClosedReady() {
        if (this.transitionPhase === 'waiting' &&
            this.transitionType === 'map') {
            this.transitionPhase = 'opening';
            this.transitionProgress = 0;
        }
    }
    handleTransitionClosed() {
        if (this.transitionType === 'map') {
            this.eventSystem.emit('MAP_TRANSITION_CLOSED', {
                targetMapId: this.targetMapId,
            });
            this.transitionPhase = 'waiting';
        }
        else if (this.transitionType === 'page') {
            this.eventSystem.emit('PAGE_TRANSITION_CLOSED', {});
            this.transitionPhase = 'opening';
            this.transitionProgress = 0;
        }
        else if (this.transitionType === 'page-closed') {
            this.eventSystem.emit('PAGE_CLOSED_TRANSITION_CLOSED', {});
            this.transitionPhase = 'opening';
            this.transitionProgress = 0;
        }
    }
};
TransitionManager = __decorate([
    (0,_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)(),
    __metadata("design:paramtypes", [])
], TransitionManager);



/***/ }),

/***/ "./src/core/transitions/opacity-transition.ts":
/*!****************************************************!*\
  !*** ./src/core/transitions/opacity-transition.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OpacityTransitionEffect: () => (/* binding */ OpacityTransitionEffect)
/* harmony export */ });
/* harmony import */ var _decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/injectable */ "./src/core/decorators/injectable.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let OpacityTransitionEffect = class OpacityTransitionEffect {
    opacity = 0;
    initialize() {
        this.opacity = 0;
    }
    update(progress) {
        this.opacity = progress;
    }
    render(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
};
OpacityTransitionEffect = __decorate([
    (0,_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)()
], OpacityTransitionEffect);



/***/ }),

/***/ "./src/effects/effect.ts":
/*!*******************************!*\
  !*** ./src/effects/effect.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Effect: () => (/* binding */ Effect)
/* harmony export */ });
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_event_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/systems/event-system */ "./src/core/systems/event-system.ts");



class Effect {
    position;
    eventAtEnd;
    assetManager;
    animationSequences = new Map();
    eventSystem;
    constructor(x, y, eventAtEnd) {
        this.position = { x, y };
        this.eventAtEnd = eventAtEnd;
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__.GameContext.getInstance();
        this.assetManager = gameContext.getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_0__.AssetManager);
        this.eventSystem = gameContext.getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_2__.EventSystem);
    }
}


/***/ }),

/***/ "./src/effects/sprites-effects/door-open.ts":
/*!**************************************************!*\
  !*** ./src/effects/sprites-effects/door-open.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOEffectInitialState: () => (/* binding */ DOEffectInitialState),
/* harmony export */   DoorOpenEffect: () => (/* binding */ DoorOpenEffect)
/* harmony export */ });
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");
/* harmony import */ var _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/rendering/sprite-sheet */ "./src/rendering/sprite-sheet.ts");
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../effect */ "./src/effects/effect.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/engine/canvas-token */ "./src/core/engine/canvas-token.ts");






var DOEffectInitialState;
(function (DOEffectInitialState) {
    DOEffectInitialState["EFFECT_OPENED"] = "opened";
    DOEffectInitialState["EFFECT_CLOSED"] = "closed";
})(DOEffectInitialState || (DOEffectInitialState = {}));
class DoorOpenEffect extends _effect__WEBPACK_IMPORTED_MODULE_2__.Effect {
    sprite;
    flipX = false;
    scale;
    static initialState = {
        open: DOEffectInitialState.EFFECT_OPENED,
        close: DOEffectInitialState.EFFECT_CLOSED,
    };
    constructor(x, y, scale, initialAnimation, flipX = false) {
        super(x, y);
        this.flipX = flipX;
        this.scale = scale;
        const spriteSheet = this.assetManager.getSpriteSheet('door');
        this.configureAnimations(spriteSheet);
        this.sprite = new _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_1__.AnimatedSprite(spriteSheet);
        this.sprite.play(initialAnimation);
    }
    configureAnimations(spriteSheet) {
        spriteSheet.defineAnimation({
            name: 'closed',
            frames: [[[19442, 19443]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'little_opened',
            frames: [[[19446, 19447]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'almost_opened',
            frames: [[[19448, 19449]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'opened',
            frames: [[[19444, 19445]]],
            frameRate: 0,
            loop: false,
        });
        this.animationSequences.set(_types_effects__WEBPACK_IMPORTED_MODULE_4__.DoorSequence.OPEN_EFFECT, {
            duraction: 0.5,
            animations: ['closed', 'little_opened', 'almost_opened', 'opened'],
            quantity: 1,
        });
        this.animationSequences.set(_types_effects__WEBPACK_IMPORTED_MODULE_4__.DoorSequence.CLOSE_EFFECT, {
            duraction: 0.5,
            animations: ['opened', 'almost_opened', 'little_opened', 'closed'],
            quantity: 1,
        });
    }
    update(deltaTime) {
        this.sprite.update(deltaTime);
    }
    render() {
        const frame = this.sprite.getCurrentFrame();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_3__.GameContext.getInstance();
        const ctx = gameContext.getBean(_core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_5__.GAME_CANVAS);
        const camera = gameContext.getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_0__.Camera);
        const screenPos = {
            x: Math.ceil(this.position.x -
                camera.position.x -
                (frame.width * this.scale) / 2),
            y: Math.ceil(this.position.y -
                camera.position.y -
                (frame.height * this.scale) / 2),
        };
        const tileWidth = this.sprite.spriteSheet.width * this.scale;
        const tileHeight = this.sprite.spriteSheet.height * this.scale;
        frame.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const xOffset = this.flipX
                    ? (row.length - colIndex - 1) * tileWidth
                    : colIndex * tileWidth;
                const yOffset = rowIndex * tileHeight;
                const tileX = screenPos.x + xOffset;
                const tileY = screenPos.y + yOffset;
                this.sprite.spriteSheet.draw(ctx, tile, tileX, tileY, this.flipX, this.scale);
            });
        });
    }
    playSequence(deltaTime, sequence) {
        const { duraction, animations, quantity } = this.animationSequences.get(sequence) || {};
        if (!duraction || !animations || !quantity)
            return;
        this.sprite.playSequence(deltaTime, duraction, animations, quantity);
        this.sprite.update(deltaTime);
    }
}


/***/ }),

/***/ "./src/effects/sprites-effects/lab-door-open.ts":
/*!******************************************************!*\
  !*** ./src/effects/sprites-effects/lab-door-open.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOEffectInitialState: () => (/* binding */ DOEffectInitialState),
/* harmony export */   LabDoorOpenEffect: () => (/* binding */ LabDoorOpenEffect)
/* harmony export */ });
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");
/* harmony import */ var _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/rendering/sprite-sheet */ "./src/rendering/sprite-sheet.ts");
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../effect */ "./src/effects/effect.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/engine/canvas-token */ "./src/core/engine/canvas-token.ts");






var DOEffectInitialState;
(function (DOEffectInitialState) {
    DOEffectInitialState["EFFECT_OPENED"] = "opened";
    DOEffectInitialState["EFFECT_CLOSED"] = "closed";
})(DOEffectInitialState || (DOEffectInitialState = {}));
class LabDoorOpenEffect extends _effect__WEBPACK_IMPORTED_MODULE_2__.Effect {
    sprite;
    flipX = false;
    scale;
    static initialState = {
        open: DOEffectInitialState.EFFECT_OPENED,
        close: DOEffectInitialState.EFFECT_CLOSED,
    };
    constructor(x, y, scale, initialAnimation, flipX = false) {
        super(x, y);
        this.flipX = flipX;
        this.scale = scale;
        const spriteSheet = this.assetManager.getSpriteSheet('lab_door');
        this.configureAnimations(spriteSheet);
        this.sprite = new _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_1__.AnimatedSprite(spriteSheet);
        this.sprite.play(initialAnimation);
    }
    configureAnimations(spriteSheet) {
        spriteSheet.defineAnimation({
            name: 'closed',
            frames: [
                [
                    [19655, 19656],
                    [19671, 19672],
                ],
            ],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'little_opened',
            frames: [
                [
                    [19653, 19654],
                    [19669, 19670],
                ],
            ],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'almost_opened',
            frames: [
                [
                    [19651, 19652],
                    [19667, 19668],
                ],
            ],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'opened',
            frames: [
                [
                    [19649, 19650],
                    [19665, 19666],
                ],
            ],
            frameRate: 0,
            loop: false,
        });
        this.animationSequences.set(_types_effects__WEBPACK_IMPORTED_MODULE_4__.LabDoorSequence.OPEN_EFFECT, {
            duraction: 0.5,
            animations: ['closed', 'little_opened', 'almost_opened', 'opened'],
            quantity: 1,
        });
        this.animationSequences.set(_types_effects__WEBPACK_IMPORTED_MODULE_4__.LabDoorSequence.CLOSE_EFFECT, {
            duraction: 0.5,
            animations: ['opened', 'almost_opened', 'little_opened', 'closed'],
            quantity: 1,
        });
    }
    update(deltaTime) {
        this.sprite.update(deltaTime);
    }
    render() {
        const frame = this.sprite.getCurrentFrame();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_3__.GameContext.getInstance();
        const ctx = gameContext.getBean(_core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_5__.GAME_CANVAS);
        const camera = gameContext.getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_0__.Camera);
        const screenPos = {
            x: Math.ceil(this.position.x -
                camera.position.x -
                (frame.width * this.scale) / 2),
            y: Math.ceil(this.position.y -
                camera.position.y -
                (frame.height * this.scale) / 2),
        };
        const tileWidth = this.sprite.spriteSheet.width * this.scale;
        const tileHeight = this.sprite.spriteSheet.height * this.scale;
        frame.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const xOffset = this.flipX
                    ? (row.length - colIndex - 1) * tileWidth
                    : colIndex * tileWidth;
                const yOffset = rowIndex * tileHeight;
                const tileX = screenPos.x + xOffset;
                const tileY = screenPos.y + yOffset;
                this.sprite.spriteSheet.draw(ctx, tile, tileX, tileY, this.flipX, this.scale);
            });
        });
    }
    playSequence(deltaTime, sequence) {
        const { duraction, animations, quantity } = this.animationSequences.get(sequence) || {};
        if (!duraction || !animations || !quantity)
            return;
        this.sprite.playSequence(deltaTime, duraction, animations, quantity);
        this.sprite.update(deltaTime);
    }
}


/***/ }),

/***/ "./src/effects/sprites-effects/player-jump.ts":
/*!****************************************************!*\
  !*** ./src/effects/sprites-effects/player-jump.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayerJumpEffect: () => (/* binding */ PlayerJumpEffect)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");
/* harmony import */ var _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/rendering/sprite-sheet */ "./src/rendering/sprite-sheet.ts");
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../effect */ "./src/effects/effect.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/engine/canvas-token */ "./src/core/engine/canvas-token.ts");
/* harmony import */ var _core_systems_event_system__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/systems/event-system */ "./src/core/systems/event-system.ts");








class PlayerJumpEffect extends _effect__WEBPACK_IMPORTED_MODULE_4__.Effect {
    position = { x: 0, y: 0 };
    sprite;
    targetPosition;
    startPosition;
    flipX = false;
    scale;
    movementSpeed = 100;
    isMoving = false;
    hasReachedTarget = false;
    gameStateManager;
    elapsedTime = 0;
    jumpHeight = 34;
    jumpDuration = 0.6;
    hidden = false;
    constructor() {
        super(0, 0);
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.scale = gameContext.getTilesScale();
        this.gameStateManager = gameContext.getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__.GameStateManager);
        this.eventSystem = gameContext.getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_7__.EventSystem);
        this.startPosition = this.gameStateManager.getState().player.position;
        this.targetPosition = {
            x: this.startPosition.x,
            y: this.startPosition.y + 64,
        };
        this.position = this.gameStateManager.getState().player.position;
        this.elapsedTime = 0;
        this.sprite = new _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_3__.AnimatedSprite(this.assetManager.getSpriteSheet('player_effect'));
        this.configureAnimations(this.assetManager.getSpriteSheet('player_effect'));
        this.animationSequences.set(_types_effects__WEBPACK_IMPORTED_MODULE_5__.PlayerJumpSequence.JUMP_DOWN, {
            duraction: 0.8,
            animations: ['walk_down_first', 'down', 'walk_down_second', 'down'],
            quantity: 999,
        });
        this.gameStateManager.subscribe(() => {
            this.updatePlayerEffectState();
        });
    }
    configureAnimations(spriteSheet) {
        spriteSheet.defineAnimation({
            name: 'down',
            frames: [[[0]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'walk_down_first',
            frames: [[[6]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'walk_down_second',
            frames: [[[3]]],
            frameRate: 0,
            loop: false,
        });
    }
    update(deltaTime) {
        this.sprite.update(deltaTime);
    }
    render() {
        if (this.hidden) {
            return;
        }
        const frame = this.sprite.getCurrentFrame();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        const ctx = gameContext.getBean(_core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_6__.GAME_CANVAS);
        const camera = gameContext.getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_2__.Camera);
        const screenPos = {
            x: Math.ceil(this.position.x -
                camera.position.x -
                (frame.width * this.scale) / 2),
            y: Math.ceil(this.position.y -
                camera.position.y -
                (frame.height * this.scale) / 2),
        };
        const tileWidth = this.sprite.spriteSheet.width * this.scale;
        const tileHeight = this.sprite.spriteSheet.height * this.scale;
        frame.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const xOffset = this.flipX
                    ? (row.length - colIndex - 1) * tileWidth
                    : colIndex * tileWidth;
                const yOffset = rowIndex * tileHeight;
                const tileX = screenPos.x + xOffset;
                const tileY = screenPos.y + yOffset;
                this.sprite.spriteSheet.draw(ctx, tile, tileX, tileY, this.flipX, this.scale);
            });
        });
    }
    moveTowardsTarget(deltaSeconds) {
        this.elapsedTime += deltaSeconds;
        const t = Math.min(this.elapsedTime / this.jumpDuration, 1);
        const deltaX = this.targetPosition.x - this.startPosition.x;
        const deltaY = this.targetPosition.y - this.startPosition.y;
        this.position.x = this.startPosition.x + deltaX * t;
        this.position.y =
            this.startPosition.y +
                deltaY * t -
                this.jumpHeight * Math.sin(t * Math.PI);
        this.isMoving = t < 1;
        if (t >= 1) {
            this.hasReachedTarget = true;
            return true;
        }
        return false;
    }
    updatePlayerState() {
        if (!this.isMoving && !this.hasReachedTarget) {
            this.position = this.gameStateManager.getState().player.position;
        }
        this.gameStateManager.updateState((state) => ({
            ...state,
            player: {
                ...state.player,
                hidden: true,
                canMove: false,
            },
        }));
    }
    updatePlayerEffectState() {
        if (!this.isMoving && !this.hasReachedTarget) {
            this.position = this.gameStateManager.getState().player.position;
        }
    }
    executeAnimation(deltaTime, duration, animations, quantity, deltaSeconds) {
        const playerOnTarget = this.moveTowardsTarget(deltaSeconds);
        if (playerOnTarget) {
            this.updateEffectEndState();
            this.eventSystem.emit('PLAYER_JUMPED', {});
        }
        if (this.isMoving) {
            this.sprite.playSequence(deltaTime, duration, animations, quantity);
        }
    }
    playSequence(deltaTime, sequence) {
        const deltaSeconds = deltaTime / 1000;
        const animData = this.animationSequences.get(sequence);
        if (!animData ||
            !animData.duraction ||
            !animData.animations ||
            !animData.quantity)
            return;
        this.updatePlayerState();
        this.executeAnimation(deltaTime, animData.duraction, animData.animations, animData.quantity, deltaSeconds);
    }
    updateEffectEndState() {
        this.gameStateManager.updateState((state) => ({
            ...state,
            player: {
                ...state.player,
                position: {
                    x: this.position.x,
                    y: this.position.y,
                },
                hidden: false,
                canMove: true,
            },
        }));
        this.hidden = true;
    }
}


/***/ }),

/***/ "./src/effects/sprites-effects/player-movement.ts":
/*!********************************************************!*\
  !*** ./src/effects/sprites-effects/player-movement.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayerMovementEffect: () => (/* binding */ PlayerMovementEffect)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");
/* harmony import */ var _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/rendering/sprite-sheet */ "./src/rendering/sprite-sheet.ts");
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../effect */ "./src/effects/effect.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/engine/canvas-token */ "./src/core/engine/canvas-token.ts");







class PlayerMovementEffect extends _effect__WEBPACK_IMPORTED_MODULE_4__.Effect {
    position = { x: 0, y: 0 };
    sprite;
    targetPosition;
    flipX = false;
    tileSize;
    scale;
    movementSpeed = 100;
    isMoving = false;
    hasReachedTarget = false;
    gameStateManager;
    eventEmitted = false;
    constructor(target, eventAtEnd) {
        super(0, 0, eventAtEnd);
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.tileSize = gameContext.getTileSize();
        this.scale = gameContext.getTilesScale();
        this.gameStateManager = gameContext.getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__.GameStateManager);
        this.targetPosition = {
            x: target.x * this.tileSize + this.tileSize / 2,
            y: target.y * this.tileSize + this.tileSize / 2 - 6,
        };
        this.sprite = new _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_3__.AnimatedSprite(this.assetManager.getSpriteSheet('player_effect'));
        this.configureAnimations(this.assetManager.getSpriteSheet('player_effect'));
        this.animationSequences.set(_types_effects__WEBPACK_IMPORTED_MODULE_5__.PlayerMovementSequence.WALK_UP, {
            duraction: 0.4,
            animations: ['up', 'walk-up-first', 'walk-up-second'],
            quantity: 999,
        });
    }
    configureAnimations(spriteSheet) {
        spriteSheet.defineAnimation({
            name: 'idle',
            frames: [[[0]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'up',
            frames: [[[1]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'walk-up-first',
            frames: [[[4]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'walk-up-second',
            frames: [[[7]]],
            frameRate: 0,
            loop: false,
        });
    }
    update(deltaTime) {
        this.sprite.update(deltaTime);
    }
    render() {
        const frame = this.sprite.getCurrentFrame();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        const ctx = gameContext.getBean(_core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_6__.GAME_CANVAS);
        const camera = gameContext.getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_2__.Camera);
        const screenPos = {
            x: Math.ceil(this.position.x -
                camera.position.x -
                (frame.width * this.scale) / 2),
            y: Math.ceil(this.position.y -
                camera.position.y -
                (frame.height * this.scale) / 2),
        };
        const tileWidth = this.sprite.spriteSheet.width * this.scale;
        const tileHeight = this.sprite.spriteSheet.height * this.scale;
        ctx.filter = 'brightness(70%)';
        frame.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const xOffset = this.flipX
                    ? (row.length - colIndex - 1) * tileWidth
                    : colIndex * tileWidth;
                const yOffset = rowIndex * tileHeight;
                const tileX = screenPos.x + xOffset;
                const tileY = screenPos.y + yOffset;
                this.sprite.spriteSheet.draw(ctx, tile, tileX, tileY, this.flipX, this.scale);
            });
        });
        ctx.filter = 'none';
    }
    moveTowardsTarget(deltaSeconds) {
        const dx = this.targetPosition.x - this.position.x;
        const dy = this.targetPosition.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveDistance = this.movementSpeed * deltaSeconds;
        if (distance > 0) {
            const ratio = Math.min(moveDistance / distance, 1);
            this.position.x += dx * ratio;
            this.position.y += dy * ratio;
            this.isMoving = true;
        }
        if (distance <= moveDistance) {
            this.position = { ...this.targetPosition };
            this.isMoving = false;
            this.hasReachedTarget = true;
            return true;
        }
        return false;
    }
    updatePlayerState() {
        if (!this.isMoving && !this.hasReachedTarget) {
            this.position = this.gameStateManager.getState().player.position;
        }
        this.gameStateManager.updateState((state) => ({
            ...state,
            player: {
                ...state.player,
                hidden: true,
                canMove: false,
            },
        }));
    }
    executeAnimation(deltaTime, duration, animations, quantity, deltaSeconds) {
        const playerOnTarget = this.moveTowardsTarget(deltaSeconds);
        if (playerOnTarget && this.eventAtEnd) {
            this.emitEffectEnd();
        }
        if (this.isMoving) {
            this.sprite.playSequence(deltaTime, duration, animations, quantity);
        }
    }
    playSequence(deltaTime, sequence) {
        const deltaSeconds = deltaTime / 1000;
        const animData = this.animationSequences.get(sequence);
        if (!animData ||
            !animData.duraction ||
            !animData.animations ||
            !animData.quantity)
            return;
        this.updatePlayerState();
        this.executeAnimation(deltaTime, animData.duraction, animData.animations, animData.quantity, deltaSeconds);
    }
    emitEffectEnd() {
        if (!this.eventEmitted && this.eventAtEnd) {
            this.eventSystem.emit(this.eventAtEnd.type, this.eventAtEnd);
            this.eventEmitted = true;
        }
    }
}


/***/ }),

/***/ "./src/effects/trigger-conditions/area.ts":
/*!************************************************!*\
  !*** ./src/effects/trigger-conditions/area.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AreaTriggerCondition: () => (/* binding */ AreaTriggerCondition)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");


class AreaTriggerCondition {
    area;
    tileSize;
    constructor(area, tileSize) {
        this.area = area;
        this.tileSize = tileSize;
    }
    isMet() {
        const gameStateManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__.GameStateManager);
        const playerState = gameStateManager.getState().player;
        const playerX = playerState.position.x;
        const playerY = playerState.position.y;
        const playerTileX = Math.floor(playerX / this.tileSize);
        const playerTileY = Math.floor(playerY / this.tileSize);
        const isInAreaX = playerTileX >= this.area.x &&
            playerTileX < this.area.x + this.area.width;
        const isInAreaY = playerTileY >= this.area.y &&
            playerTileY < this.area.y + this.area.height;
        if (!isInAreaX || !isInAreaY) {
            return false;
        }
        const tileCenterX = playerTileX * this.tileSize + this.tileSize / 2;
        const tileCenterY = playerTileY * this.tileSize + this.tileSize / 2;
        const isInCenterX = playerX >= tileCenterX - 1 && playerX <= tileCenterX + 1;
        const isInCenterY = playerY >= tileCenterY - 1 && playerY <= tileCenterY + 1;
        return isInCenterX && isInCenterY;
    }
}


/***/ }),

/***/ "./src/effects/trigger-conditions/bush-area.ts":
/*!*****************************************************!*\
  !*** ./src/effects/trigger-conditions/bush-area.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BushAreaTriggerCondition: () => (/* binding */ BushAreaTriggerCondition)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");


class BushAreaTriggerCondition {
    area;
    tileSize;
    constructor(area, tileSize) {
        this.area = area;
        this.tileSize = tileSize;
    }
    isMet() {
        const gameStateManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__.GameStateManager);
        const playerState = gameStateManager.getState().player;
        const areaTopY = this.area.y * this.tileSize;
        const tileCenterOffsetY = Math.floor(this.tileSize / 2);
        const middleMinY = areaTopY + tileCenterOffsetY - 5;
        const middleMaxY = areaTopY + tileCenterOffsetY + 5;
        const isInVerticalMiddleBounds = playerState.position.y >= middleMinY &&
            playerState.position.y <= middleMaxY;
        const isInHorizontalBounds = playerState.position.x >= this.area.x * this.tileSize &&
            playerState.position.x <=
                (this.area.x + this.area.width) * this.tileSize;
        return isInHorizontalBounds && isInVerticalMiddleBounds;
    }
}


/***/ }),

/***/ "./src/effects/trigger-conditions/composite.ts":
/*!*****************************************************!*\
  !*** ./src/effects/trigger-conditions/composite.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeTriggerCondition: () => (/* binding */ CompositeTriggerCondition)
/* harmony export */ });
class CompositeTriggerCondition {
    conditions;
    constructor(conditions) {
        this.conditions = conditions;
    }
    isMet(...args) {
        return this.conditions.every((condition) => condition.isMet(...args));
    }
}


/***/ }),

/***/ "./src/effects/trigger-conditions/jump-area.ts":
/*!*****************************************************!*\
  !*** ./src/effects/trigger-conditions/jump-area.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JumpAreaTriggerCondition: () => (/* binding */ JumpAreaTriggerCondition)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");


class JumpAreaTriggerCondition {
    area;
    tileSize;
    constructor(area, tileSize) {
        this.area = area;
        this.tileSize = tileSize;
    }
    isMet() {
        const gameStateManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__.GameStateManager);
        const playerState = gameStateManager.getState().player;
        const playerX = playerState.position.x;
        const playerY = playerState.position.y;
        const playerTileX = Math.floor(playerX / this.tileSize);
        const playerTileY = Math.floor(playerY / this.tileSize);
        const isInAreaX = playerTileX >= this.area.x &&
            playerTileX < this.area.x + this.area.width;
        const isInAreaY = playerTileY >= this.area.y &&
            playerTileY < this.area.y + this.area.height;
        if (!isInAreaX || !isInAreaY) {
            return false;
        }
        const tileCenterX = playerTileX * this.tileSize + this.tileSize / 2;
        const tileCenterY = playerTileY * this.tileSize + this.tileSize / 2;
        const isInCenterX = playerX >= tileCenterX - 1 && playerX <= tileCenterX + 1;
        const isInCenterY = playerY >= tileCenterY - 1 && playerY <= tileCenterY + 1;
        return isInCenterX && isInCenterY;
    }
}


/***/ }),

/***/ "./src/effects/trigger-conditions/keypress.ts":
/*!****************************************************!*\
  !*** ./src/effects/trigger-conditions/keypress.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyPressTriggerCondition: () => (/* binding */ KeyPressTriggerCondition)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_event_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/event-system */ "./src/core/systems/event-system.ts");
/* harmony import */ var _input_input_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/input/input-manager */ "./src/input/input-manager.ts");



class KeyPressTriggerCondition {
    key;
    pressed = false;
    eventSystem;
    constructor(key) {
        this.key = key;
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.eventSystem = gameContext.getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_1__.EventSystem);
        this.listenKeyPressLiberationEvent();
    }
    isMet() {
        if (_input_input_manager__WEBPACK_IMPORTED_MODULE_2__.Input.isKeyDown(this.key))
            this.pressed = true;
        return this.pressed;
    }
    listenKeyPressLiberationEvent() {
        this.eventSystem.on('KEY_PRESS_LIBERATION', () => {
            this.pressed = false;
        });
    }
}


/***/ }),

/***/ "./src/effects/trigger-conditions/or.ts":
/*!**********************************************!*\
  !*** ./src/effects/trigger-conditions/or.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrTriggerCondition: () => (/* binding */ OrTriggerCondition)
/* harmony export */ });
class OrTriggerCondition {
    conditions;
    constructor(conditions) {
        this.conditions = conditions;
    }
    isMet(...args) {
        return this.conditions.some((condition) => condition.isMet(...args));
    }
}


/***/ }),

/***/ "./src/effects/trigger-conditions/player-position.ts":
/*!***********************************************************!*\
  !*** ./src/effects/trigger-conditions/player-position.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayerPositionTriggerCondition: () => (/* binding */ PlayerPositionTriggerCondition)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");


class PlayerPositionTriggerCondition {
    playerAnimations;
    gameStateManager;
    constructor(playerAnimations) {
        this.playerAnimations = playerAnimations;
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__.GameStateManager);
    }
    isMet() {
        const spritePosition = this.gameStateManager.getState().player.spritePosition;
        return this.playerAnimations.some((playerAnimation) => playerAnimation === spritePosition);
    }
}


/***/ }),

/***/ "./src/effects/trigger-conditions/wide-area.ts":
/*!*****************************************************!*\
  !*** ./src/effects/trigger-conditions/wide-area.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WideAreaTriggerCondition: () => (/* binding */ WideAreaTriggerCondition)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");


class WideAreaTriggerCondition {
    area;
    tileSize;
    constructor(area, tileSize) {
        this.area = area;
        this.tileSize = tileSize;
    }
    isMet() {
        const gameStateManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__.GameStateManager);
        const playerState = gameStateManager.getState().player;
        return (playerState.position.x >= this.area.x * this.tileSize &&
            playerState.position.x <=
                (this.area.x + this.area.width) * this.tileSize &&
            playerState.position.y >= this.area.y * this.tileSize &&
            playerState.position.y <=
                (this.area.y + this.area.height) * this.tileSize);
    }
}


/***/ }),

/***/ "./src/effects/triggers/basic-trigger.ts":
/*!***********************************************!*\
  !*** ./src/effects/triggers/basic-trigger.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BasicTrigger: () => (/* binding */ BasicTrigger)
/* harmony export */ });
class BasicTrigger {
    action;
    overRideCondition;
    conditions;
    constructor(action, overRideCondition, conditions) {
        this.action = action;
        this.overRideCondition = overRideCondition;
        this.conditions = conditions;
    }
    render() {
        this.action.render();
    }
    update(deltaTime) {
        if (this.overRideCondition) {
            this.action.execute(deltaTime);
        }
        else {
            if (!this.conditions)
                throw new Error('Single trigger without condition');
            if (this.conditions.every((c) => c.isMet(deltaTime))) {
                this.action.execute(deltaTime);
            }
        }
    }
}


/***/ }),

/***/ "./src/effects/triggers/enter-into-building.ts":
/*!*****************************************************!*\
  !*** ./src/effects/triggers/enter-into-building.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnterIntoBuildingTrigger: () => (/* binding */ EnterIntoBuildingTrigger)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");


class EnterIntoBuildingTrigger {
    conditions;
    triggers;
    currentIndex = 0;
    elapsedTime = 0;
    cooldown;
    activeTriggers = [];
    gameStateManager;
    triggerStarted = false;
    constructor(conditions, triggers, cooldown) {
        this.conditions = conditions;
        this.triggers = triggers;
        this.cooldown = cooldown;
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_1__.GameStateManager);
    }
    update(deltaTime) {
        const trigger = this.triggers[this.currentIndex];
        if (this.conditions.every((c) => c.isMet())) {
            if (!this.triggerStarted) {
                this.gameStateManager.updateState((state) => ({
                    ...state,
                    player: {
                        ...state.player,
                        canMove: false,
                    },
                }));
                this.triggerStarted = true;
            }
            this.elapsedTime += deltaTime;
            trigger.update(deltaTime);
            if (!this.activeTriggers.some((trigger) => trigger === this.triggers[this.currentIndex])) {
                this.activeTriggers.push(this.triggers[this.currentIndex]);
            }
            if (this.elapsedTime >= this.cooldown &&
                this.currentIndex < this.triggers.length - 1) {
                this.elapsedTime = 0;
                this.currentIndex++;
            }
        }
    }
    render() {
        if (this.conditions.every((c) => c.isMet())) {
            this.activeTriggers.forEach((trigger) => trigger.render());
        }
    }
}


/***/ }),

/***/ "./src/effects/triggers/jump.ts":
/*!**************************************!*\
  !*** ./src/effects/triggers/jump.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JumpTrigger: () => (/* binding */ JumpTrigger)
/* harmony export */ });
/* harmony import */ var _sprites_effects_player_jump__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sprites-effects/player-jump */ "./src/effects/sprites-effects/player-jump.ts");
/* harmony import */ var _basic_trigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basic-trigger */ "./src/effects/triggers/basic-trigger.ts");
/* harmony import */ var _core_systems_event_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/systems/event-system */ "./src/core/systems/event-system.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");




class JumpTrigger {
    secuence;
    condition;
    trigger = null;
    eventSystem;
    constructor(secuence, condition) {
        this.secuence = secuence;
        this.condition = condition;
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_3__.GameContext.getInstance();
        this.eventSystem = gameContext.getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_2__.EventSystem);
        this.listenPlayerJumpEffectEndEvent();
    }
    update(deltaTime) {
        if (this.condition.isMet()) {
            const playerJumpEffect = new _sprites_effects_player_jump__WEBPACK_IMPORTED_MODULE_0__.PlayerJumpEffect();
            if (this.trigger === null) {
                this.trigger = new _basic_trigger__WEBPACK_IMPORTED_MODULE_1__.BasicTrigger({
                    execute: (deltaTime) => playerJumpEffect.playSequence(deltaTime, this.secuence),
                    render: () => {
                        playerJumpEffect.render();
                    },
                }, true);
            }
            this.trigger.update(deltaTime);
        }
    }
    render() {
        this.trigger?.render();
    }
    listenPlayerJumpEffectEndEvent() {
        this.eventSystem.on('PLAYER_JUMPED', () => {
            this.trigger = null;
            this.eventSystem.emit('KEY_PRESS_LIBERATION', {});
        });
    }
}


/***/ }),

/***/ "./src/effects/triggers/map-transition.ts":
/*!************************************************!*\
  !*** ./src/effects/triggers/map-transition.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MapTransitionTrigger: () => (/* binding */ MapTransitionTrigger)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_event_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/event-system */ "./src/core/systems/event-system.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");



class MapTransitionTrigger {
    conditions;
    mapEvent;
    eventEmited = false;
    eventSystem;
    gameStateManager;
    constructor(conditions, mapEvent) {
        this.conditions = conditions;
        this.mapEvent = mapEvent;
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.eventSystem = gameContext.getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_1__.EventSystem);
        this.gameStateManager = gameContext.getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_2__.GameStateManager);
    }
    update() {
        if (this.conditions.every((c) => c.isMet())) {
            if (!this.eventEmited) {
                this.gameStateManager.updateState((state) => {
                    return {
                        ...state,
                        player: {
                            ...state.player,
                            canMove: false,
                        },
                    };
                });
                this.eventSystem.emit(this.mapEvent.type, this.mapEvent);
                this.eventEmited = true;
            }
        }
    }
    render() { }
}


/***/ }),

/***/ "./src/game/map/littleroot_town/houses/house-01-f2.ts":
/*!************************************************************!*\
  !*** ./src/game/map/littleroot_town/houses/house-01-f2.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHouseRT01F2: () => (/* binding */ createHouseRT01F2)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rendering/tile-map-builder */ "./src/rendering/tile-map-builder.ts");
/* harmony import */ var _types_render_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/types/render-types */ "./src/types/render-types.ts");
/* harmony import */ var _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/effects/trigger-conditions/area */ "./src/effects/trigger-conditions/area.ts");
/* harmony import */ var _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/effects/trigger-conditions/keypress */ "./src/effects/trigger-conditions/keypress.ts");
/* harmony import */ var _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/effects/trigger-conditions/composite */ "./src/effects/trigger-conditions/composite.ts");
/* harmony import */ var _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/effects/sprites-effects/player-movement */ "./src/effects/sprites-effects/player-movement.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/effects/trigger-conditions/player-position */ "./src/effects/trigger-conditions/player-position.ts");
/* harmony import */ var _effects_trigger_conditions_wide_area__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/effects/trigger-conditions/wide-area */ "./src/effects/trigger-conditions/wide-area.ts");
/* harmony import */ var _effects_trigger_conditions_or__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/effects/trigger-conditions/or */ "./src/effects/trigger-conditions/or.ts");












async function createHouseRT01F2() {
    const assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');
    const MapTransitionEvent = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_house01_f2',
        to: 'little_root_town_house01_f1',
    };
    const areaCondition = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__.AreaTriggerCondition({ x: 9, y: 2, width: 1, height: 1 }, 32);
    const playerEffect = new _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_7__.PlayerMovementEffect({ x: 9, y: 1 }, MapTransitionEvent);
    const bedCondition = new _effects_trigger_conditions_wide_area__WEBPACK_IMPORTED_MODULE_10__.WideAreaTriggerCondition({ x: 0, y: 4, width: 3, height: 1 }, 32);
    const bedCenterCondition = new _effects_trigger_conditions_wide_area__WEBPACK_IMPORTED_MODULE_10__.WideAreaTriggerCondition({ x: 1, y: 4, width: 1, height: 1 }, 32);
    const playerBedPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__.PlayerPositionTriggerCondition([
        'left',
        'walk-left',
        'left-align',
    ]);
    const keyCondition = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__.KeyPressTriggerCondition('ArrowUp');
    const compositeBedCondition = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__.CompositeTriggerCondition([
        bedCondition,
        playerBedPosition,
    ]);
    const OrBedCondition = new _effects_trigger_conditions_or__WEBPACK_IMPORTED_MODULE_11__.OrTriggerCondition([
        compositeBedCondition,
        bedCenterCondition,
    ]);
    const playerUpPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__.PlayerPositionTriggerCondition([
        'walk-up',
        'up-align',
        'up',
        'down',
    ]);
    const compositeCondition = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__.CompositeTriggerCondition([
        areaCondition,
        keyCondition,
        playerUpPosition,
    ]);
    return new _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__.TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 11, 8, true, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .buildCollisionRow(1, 0, 11)
        .buildCollisionRow(2, 4, 2)
        .buildCollisionRow(5, 1, 1)
        .createLayer('ground', 11, 8, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .fillArea(19553, 0, 0, 32, 32)
        .buildSpriteObjectRow([[19556], [19572]], 0, 0, 0, 0, 11)
        .createLayer('furniture', 11, 8, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSpriteObject([
        [19562, 19563],
        [19578, 19579],
    ], 1, 0, false, 0, -15)
        .buildSpriteObject([[19461], [19477]], 1, 5)
        .buildSingleSprite(19606, 2, 4)
        .buildSpriteObject([
        [19494, 19495, 19497, 19498, 19499],
        [19510, 19511, 19513, 19514, 19515],
        [19510, 19511, 19513, 19514, 19515],
        [19526, 19527, 19529, 19530, 19531],
    ], 3, 5, false, 0, 15)
        .buildSingleSprite(19605, 0, 2, false, false, 0, 5)
        .buildSingleSprite(19621, 0, 6, false, false, 0, 20)
        .buildSpriteObject([
        [19517, 19518],
        [19533, 19534],
    ], 4, 1, false, -16, -2)
        .createLayer('furniture_01', 11, 8, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSingleSprite(19505, 2, 0, false, false, 0, 5)
        .createLayer('furniture_02', 11, 8, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSpriteObject([
        [19617, 19618],
        [19633, 19634],
    ], 0, 9, false, -17, 12)
        .createLayer('effects', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        .buildSingleSprite(19549, 4, 1, false, false, -16, -2, OrBedCondition)
        .buildSingleSprite(19550, 4, 2, false, false, -16, -2, OrBedCondition)
        .buildSingleSprite(19533, 5, 1, false, false, -16, -2, OrBedCondition)
        .buildSingleSprite(19534, 5, 2, false, false, -16, -2, OrBedCondition)
        .createLayer('effects_01', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .addEnterIntoBuildingTriggerEffect([playerEffect], [_types_effects__WEBPACK_IMPORTED_MODULE_8__.PlayerMovementSequence.WALK_UP], [compositeCondition], 500)
        .build();
}


/***/ }),

/***/ "./src/game/map/littleroot_town/houses/house-01.ts":
/*!*********************************************************!*\
  !*** ./src/game/map/littleroot_town/houses/house-01.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHouseRT01: () => (/* binding */ createHouseRT01)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rendering/tile-map-builder */ "./src/rendering/tile-map-builder.ts");
/* harmony import */ var _types_render_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/types/render-types */ "./src/types/render-types.ts");
/* harmony import */ var _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/effects/trigger-conditions/area */ "./src/effects/trigger-conditions/area.ts");
/* harmony import */ var _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/effects/trigger-conditions/keypress */ "./src/effects/trigger-conditions/keypress.ts");
/* harmony import */ var _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/effects/trigger-conditions/composite */ "./src/effects/trigger-conditions/composite.ts");
/* harmony import */ var _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/effects/sprites-effects/player-movement */ "./src/effects/sprites-effects/player-movement.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/effects/trigger-conditions/player-position */ "./src/effects/trigger-conditions/player-position.ts");










async function createHouseRT01() {
    const assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');
    const MapTransitionEventRT = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_house01_f1',
        to: 'little_root_town',
    };
    const MapTransitionEventF2 = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_house01_f1',
        to: 'little_root_town_house01_f2',
    };
    const areaConditionToRT = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__.AreaTriggerCondition({ x: 8, y: 8, width: 1, height: 1 }, 32);
    const areaConditionToF2 = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__.AreaTriggerCondition({ x: 8, y: 3, width: 1, height: 1 }, 32);
    const playerEffect = new _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_7__.PlayerMovementEffect({ x: 8, y: 2 }, MapTransitionEventF2);
    const keyConditionDown = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__.KeyPressTriggerCondition('ArrowDown');
    const keyConditionUp = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__.KeyPressTriggerCondition('ArrowUp');
    const playerUpPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__.PlayerPositionTriggerCondition([
        'walk-up',
        'up-align',
        'up',
        'down',
    ]);
    const playerDownPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__.PlayerPositionTriggerCondition([
        'walk-down',
        'down-align',
        'down',
    ]);
    const compositeConditionToRT = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__.CompositeTriggerCondition([
        areaConditionToRT,
        keyConditionDown,
        playerDownPosition,
    ]);
    const compositeConditionToF2 = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__.CompositeTriggerCondition([
        areaConditionToF2,
        keyConditionUp,
        playerUpPosition,
    ]);
    return new _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__.TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 11, 9, true, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .buildCollisionRow(1, 0, 7)
        .buildCollisionRow(2, 0, 5)
        .buildCollisionRow(2, 7, 4)
        .buildCollisionRow(4, 2, 3)
        .buildCollisionRow(6, 3, 2)
        .buildCollisionRow(7, 3, 2)
        .createLayer('ground', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .fillArea(19553, 0, 0, 32, 32)
        .buildSpriteRow([19556], 0, 0, 0, 0)
        .buildSpriteObjectRow([[19556], [19572]], 0, 0, 0, 0, 7)
        .buildSpriteObjectRow([[19556], [19572]], 1, 8, 0, 0, 7)
        .buildSpriteObjectRow([[19558], [19574]], 1, 7, 0, 0, 1)
        .buildSpriteObjectRow([[19560], [19576]], 1, 10, 0, 0, 1)
        .buildSingleSprite(19604, 0, 7)
        .cleanSprite(0, 8)
        .cleanSprite(0, 9)
        .cleanSprite(0, 10)
        .createLayer('furniture', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSpriteObjectRow([[19501, 19502]], 8, 8, 0, 5, 1)
        .buildSpriteObject([
        [19585, 19586],
        [19601, 19602],
    ], 2, 8, false, -17, -20)
        .buildSpriteObject([[19450], [19466]], 1, 0, false, 0, 0)
        .buildSpriteObject([
        [19452, 19453],
        [19468, 19469],
    ], 1, 1, false, 5, 0)
        .buildSpriteObject([
        [19457, 19458],
        [19473, 19474],
    ], 1, 3, false, 0, 0)
        .buildSpriteObject([
        [19459, 19460],
        [19475, 19476],
    ], 3, 2, false, 0, 10)
        .buildSpriteObject([[19461], [19477]], 3, 4, false, 0, 10)
        .buildSpriteObject([
        [19494, 19495, 19496, 19497, 19498, 19499],
        [19510, 19511, 19512, 19513, 19514, 19515],
        [19526, 19527, 19528, 19529, 19530, 19531],
    ], 6, 1, false, 0, -10)
        .createLayer('furniture_02', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_MED)
        .buildSpriteObject([
        [19505, 19506, 19507, 19508],
        [19521, 19522, 19523, 19524],
    ], 6, 2, false, 0, 5)
        .createLayer('furniture_03', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        .buildSpriteRow([19459, 19460], 3, 2, 0, 10)
        .buildSpriteRow([19461], 3, 4, 0, 10)
        .createLayer('effects', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .addMapTransitionTrigger([compositeConditionToRT], MapTransitionEventRT)
        .addEnterIntoBuildingTriggerEffect([playerEffect], [_types_effects__WEBPACK_IMPORTED_MODULE_8__.PlayerMovementSequence.WALK_UP], [compositeConditionToF2], 500)
        .build();
}


/***/ }),

/***/ "./src/game/map/littleroot_town/houses/house-02-f2.ts":
/*!************************************************************!*\
  !*** ./src/game/map/littleroot_town/houses/house-02-f2.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHouseRT02F2: () => (/* binding */ createHouseRT02F2)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rendering/tile-map-builder */ "./src/rendering/tile-map-builder.ts");
/* harmony import */ var _types_render_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/types/render-types */ "./src/types/render-types.ts");
/* harmony import */ var _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/effects/trigger-conditions/area */ "./src/effects/trigger-conditions/area.ts");
/* harmony import */ var _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/effects/trigger-conditions/keypress */ "./src/effects/trigger-conditions/keypress.ts");
/* harmony import */ var _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/effects/trigger-conditions/composite */ "./src/effects/trigger-conditions/composite.ts");
/* harmony import */ var _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/effects/sprites-effects/player-movement */ "./src/effects/sprites-effects/player-movement.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/effects/trigger-conditions/player-position */ "./src/effects/trigger-conditions/player-position.ts");
/* harmony import */ var _effects_trigger_conditions_wide_area__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/effects/trigger-conditions/wide-area */ "./src/effects/trigger-conditions/wide-area.ts");
/* harmony import */ var _effects_trigger_conditions_or__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/effects/trigger-conditions/or */ "./src/effects/trigger-conditions/or.ts");












async function createHouseRT02F2() {
    const assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');
    const MapTransitionEvent = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_house02_f2',
        to: 'little_root_town_house02_f1',
    };
    const areaCondition = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__.AreaTriggerCondition({ x: 9, y: 2, width: 1, height: 1 }, 32);
    const playerEffect = new _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_7__.PlayerMovementEffect({ x: 9, y: 1 }, MapTransitionEvent);
    const bedCondition = new _effects_trigger_conditions_wide_area__WEBPACK_IMPORTED_MODULE_10__.WideAreaTriggerCondition({ x: 0, y: 4, width: 3, height: 1 }, 32);
    const bedCenterCondition = new _effects_trigger_conditions_wide_area__WEBPACK_IMPORTED_MODULE_10__.WideAreaTriggerCondition({ x: 1, y: 4, width: 1, height: 1 }, 32);
    const playerBedPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__.PlayerPositionTriggerCondition([
        'left',
        'walk-left',
        'left-align',
    ]);
    const keyCondition = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__.KeyPressTriggerCondition('ArrowUp');
    const compositeBedCondition = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__.CompositeTriggerCondition([
        bedCondition,
        playerBedPosition,
    ]);
    const OrBedCondition = new _effects_trigger_conditions_or__WEBPACK_IMPORTED_MODULE_11__.OrTriggerCondition([
        compositeBedCondition,
        bedCenterCondition,
    ]);
    const playerUpPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__.PlayerPositionTriggerCondition([
        'walk-up',
        'up-align',
        'up',
        'down',
    ]);
    const compositeCondition = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__.CompositeTriggerCondition([
        areaCondition,
        keyCondition,
        playerUpPosition,
    ]);
    return new _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__.TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 11, 8, true, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .buildCollisionRow(1, 0, 11)
        .buildCollisionRow(2, 4, 2)
        .buildCollisionRow(5, 1, 1)
        .createLayer('ground', 11, 8, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .fillArea(19553, 0, 0, 32, 32)
        .buildSpriteObjectRow([[19556], [19572]], 0, 0, 0, 0, 11)
        .createLayer('furniture', 11, 8, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSpriteObject([
        [19562, 19563],
        [19578, 19579],
    ], 1, 0, false, 0, -15)
        .buildSpriteObject([[19461], [19477]], 1, 5)
        .buildSingleSprite(19606, 2, 4)
        .buildSpriteObject([
        [19494, 19495, 19497, 19498, 19499],
        [19510, 19511, 19513, 19514, 19515],
        [19510, 19511, 19513, 19514, 19515],
        [19526, 19527, 19529, 19530, 19531],
    ], 3, 5, false, 0, 15)
        .buildSingleSprite(19605, 0, 2, false, false, 0, 5)
        .buildSingleSprite(19621, 0, 6, false, false, 0, 20)
        .buildSpriteObject([
        [19517, 19518],
        [19533, 19534],
    ], 4, 1, false, -16, -2)
        .createLayer('furniture_01', 11, 8, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSingleSprite(19505, 2, 0, false, false, 0, 5)
        .createLayer('furniture_02', 11, 8, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSpriteObject([
        [19617, 19618],
        [19633, 19634],
    ], 0, 9, false, -17, 12)
        .createLayer('effects', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        .buildSingleSprite(19549, 4, 1, false, false, -16, -2, OrBedCondition)
        .buildSingleSprite(19550, 4, 2, false, false, -16, -2, OrBedCondition)
        .buildSingleSprite(19533, 5, 1, false, false, -16, -2, OrBedCondition)
        .buildSingleSprite(19534, 5, 2, false, false, -16, -2, OrBedCondition)
        .createLayer('effects_01', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .addEnterIntoBuildingTriggerEffect([playerEffect], [_types_effects__WEBPACK_IMPORTED_MODULE_8__.PlayerMovementSequence.WALK_UP], [compositeCondition], 500)
        .build();
}


/***/ }),

/***/ "./src/game/map/littleroot_town/houses/house-02.ts":
/*!*********************************************************!*\
  !*** ./src/game/map/littleroot_town/houses/house-02.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHouseRT02: () => (/* binding */ createHouseRT02)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rendering/tile-map-builder */ "./src/rendering/tile-map-builder.ts");
/* harmony import */ var _types_render_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/types/render-types */ "./src/types/render-types.ts");
/* harmony import */ var _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/effects/trigger-conditions/area */ "./src/effects/trigger-conditions/area.ts");
/* harmony import */ var _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/effects/trigger-conditions/keypress */ "./src/effects/trigger-conditions/keypress.ts");
/* harmony import */ var _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/effects/trigger-conditions/composite */ "./src/effects/trigger-conditions/composite.ts");
/* harmony import */ var _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/effects/sprites-effects/player-movement */ "./src/effects/sprites-effects/player-movement.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/effects/trigger-conditions/player-position */ "./src/effects/trigger-conditions/player-position.ts");










async function createHouseRT02() {
    const assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');
    const MapTransitionEventRT = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_house02_f1',
        to: 'little_root_town',
    };
    const MapTransitionEventF2 = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_house02_f1',
        to: 'little_root_town_house02_f2',
    };
    const areaConditionToRT = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__.AreaTriggerCondition({ x: 8, y: 8, width: 1, height: 1 }, 32);
    const areaConditionToF2 = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__.AreaTriggerCondition({ x: 8, y: 3, width: 1, height: 1 }, 32);
    const playerEffect = new _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_7__.PlayerMovementEffect({ x: 8, y: 2 }, MapTransitionEventF2);
    const keyConditionDown = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__.KeyPressTriggerCondition('ArrowDown');
    const keyConditionUp = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__.KeyPressTriggerCondition('ArrowUp');
    const playerUpPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__.PlayerPositionTriggerCondition([
        'walk-up',
        'up-align',
        'up',
        'down',
    ]);
    const playerDownPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__.PlayerPositionTriggerCondition([
        'walk-down',
        'down-align',
        'down',
    ]);
    const compositeConditionToRT = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__.CompositeTriggerCondition([
        areaConditionToRT,
        keyConditionDown,
        playerDownPosition,
    ]);
    const compositeConditionToF2 = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__.CompositeTriggerCondition([
        areaConditionToF2,
        keyConditionUp,
        playerUpPosition,
    ]);
    return new _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__.TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 11, 9, true, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .buildCollisionRow(1, 0, 7)
        .buildCollisionRow(2, 0, 5)
        .buildCollisionRow(2, 7, 4)
        .buildCollisionRow(4, 2, 3)
        .buildCollisionRow(6, 3, 2)
        .buildCollisionRow(7, 3, 2)
        .createLayer('ground', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .fillArea(19553, 0, 0, 32, 32)
        .buildSpriteRow([19556], 0, 0, 0, 0)
        .buildSpriteObjectRow([[19556], [19572]], 0, 0, 0, 0, 7)
        .buildSpriteObjectRow([
        [19556, 19556],
        [19572, 19572],
    ], 1, 8, 0, 0, 1)
        .buildSpriteObjectRow([[19558]], 1, 7, 0, 0, 1)
        .buildSpriteObjectRow([[19574]], 2, 7, 0, 0, 1)
        .buildSpriteObjectRow([[19560]], 1, 10, 0, 0, 1)
        .buildSpriteObjectRow([[19576]], 2, 10, 0, 0, 1)
        .buildSingleSprite(19604, 0, 7)
        .cleanSprite(0, 8)
        .cleanSprite(0, 9)
        .cleanSprite(0, 10)
        .createLayer('furniture', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSpriteObjectRow([[19501, 19502]], 8, 8, 0, 5, 1)
        .buildSpriteObject([
        [19585, 19586],
        [19601, 19602],
    ], 2, 8, false, -17, -20)
        .buildSpriteObject([[19450], [19466]], 1, 0, false, 0, 0)
        .buildSpriteObject([
        [19452, 19453],
        [19468, 19469],
    ], 1, 1, false, 5, 0)
        .buildSpriteObject([
        [19457, 19458],
        [19473, 19474],
    ], 1, 3, false, 0, 0)
        .buildSpriteObject([
        [19459, 19460],
        [19475, 19476],
    ], 3, 2, false, 0, 10)
        .buildSpriteObject([[19461], [19477]], 3, 4, false, 0, 10)
        .buildSpriteObject([
        [19494, 19495, 19496, 19497, 19498, 19499],
        [19510, 19511, 19512, 19513, 19514, 19515],
        [19526, 19527, 19528, 19529, 19530, 19531],
    ], 6, 1, false, 0, -10)
        .createLayer('furniture_02', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_MED)
        .buildSpriteObject([
        [19505, 19506, 19507, 19508],
        [19521, 19522, 19523, 19524],
    ], 6, 2, false, 0, 5)
        .createLayer('furniture_03', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        .buildSpriteRow([19459, 19460], 3, 2, 0, 10)
        .buildSpriteRow([19461], 3, 4, 0, 10)
        .createLayer('effects', 11, 9, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .addMapTransitionTrigger([compositeConditionToRT], MapTransitionEventRT)
        .addEnterIntoBuildingTriggerEffect([playerEffect], [_types_effects__WEBPACK_IMPORTED_MODULE_8__.PlayerMovementSequence.WALK_UP], [compositeConditionToF2], 500)
        .build();
}


/***/ }),

/***/ "./src/game/map/littleroot_town/houses/lab.ts":
/*!****************************************************!*\
  !*** ./src/game/map/littleroot_town/houses/lab.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHouseRTLab: () => (/* binding */ createHouseRTLab)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rendering/tile-map-builder */ "./src/rendering/tile-map-builder.ts");
/* harmony import */ var _types_render_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/types/render-types */ "./src/types/render-types.ts");
/* harmony import */ var _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/effects/trigger-conditions/area */ "./src/effects/trigger-conditions/area.ts");
/* harmony import */ var _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/effects/trigger-conditions/keypress */ "./src/effects/trigger-conditions/keypress.ts");
/* harmony import */ var _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/effects/trigger-conditions/composite */ "./src/effects/trigger-conditions/composite.ts");
/* harmony import */ var _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/effects/trigger-conditions/player-position */ "./src/effects/trigger-conditions/player-position.ts");








async function createHouseRTLab() {
    const assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');
    const MapTransitionEvent = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_lab',
        to: 'little_root_town',
    };
    const areaCondition = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__.AreaTriggerCondition({ x: 6, y: 12, width: 2, height: 1 }, 32);
    const keyConditionDown = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_5__.KeyPressTriggerCondition('ArrowDown');
    const playerDownPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_7__.PlayerPositionTriggerCondition([
        'walk-down',
        'down-align',
        'down',
    ]);
    const compositeCondition = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_6__.CompositeTriggerCondition([
        areaCondition,
        keyConditionDown,
        playerDownPosition,
    ]);
    const bookcaseTrigger = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_4__.AreaTriggerCondition({ x: 0, y: 5, width: 5, height: 1 }, 32);
    return new _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__.TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 13, 13, true, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .buildCollisionRow(1, 0, 13)
        .buildCollisionColum(0, 2, 2)
        .buildCollisionColum(2, 2, 1)
        .buildCollisionColum(12, 2, 6)
        .buildCollisionRec(3, 9, 2, 2)
        .buildCollisionRec(6, 10, 2, 2)
        .buildCollisionRec(9, 11, 3, 2)
        .buildCollisionRec(6, 0, 2, 4)
        .buildCollisionColum(0, 10, 2)
        .buildCollisionColum(1, 9, 3)
        .createLayer('ground', 13, 13, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .fillAreaWithTiles([
        [3037, 3038],
        [3053, 3054],
    ])
        .buildSpriteObjectRow([[19556], [19572]], 0, 0, 0, 0, 13)
        .createLayer('furniture', 13, 13, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSpriteObjectRow([
        [19611, 19612],
        [19627, 19628],
    ], 1, 0, 0, -15)
        .buildSpriteObjectRow([
        [19619, 19620],
        [19635, 19636],
    ], 2, 2, -13, -20)
        .buildSpriteObjectRow([
        [19562, 19563],
        [19578, 19579],
    ], 1, 4, -30, -10)
        .buildSpriteObjectRow([
        [19643, 19644, 19645, 19646],
        [19659, 19660, 19661, 19662],
    ], 1, 6, 0, -2)
        .buildSingleSprite(19637, 2, 12)
        .buildSingleSprite(19637, 3, 12)
        .buildSingleSprite(19609, 3, 0, false, false, 0, -15)
        .buildSingleSprite(19593, 4, 0, false, false, 0, -30)
        .buildSingleSprite(19609, 4, 9, false, false, 0, -15)
        .buildSingleSprite(19593, 5, 9, false, false, 0, -30)
        .buildSingleSprite(19593, 5, 10, false, false, 0, -30)
        .buildSingleSprite(19593, 12, 12, false, false, 1, -30)
        .buildSpriteObjectRow([
        [19611, 19612],
        [19627, 19628],
    ], 6, 0, 0, -15)
        .buildSpriteObjectRow([
        [19611, 19612],
        [19627, 19628],
    ], 8, 0, 0, -55)
        .buildSpriteObjectRow([
        [19611, 19612],
        [19627, 19628],
    ], 6, 2, 0, -15)
        .buildSpriteObjectRow([
        [19611, 19612],
        [19627, 19628],
    ], 8, 2, 0, -55)
        .createLayer('furniture_01', 13, 13, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_MED)
        .buildSingleSprite(19593, 4, 10, false, false, 0, -10)
        .buildSingleSprite(19593, 11, 12, false, false, 1, -10)
        .buildSingleSprite(19637, 10, 0, false, false, 0, 5)
        .buildSingleSprite(19637, 11, 0, false, false, 0, 5)
        .buildSpriteObjectRow([[19591], [19607], [19623]], 9, 1)
        .buildSpriteObjectRow([[19532], [19548]], 4, 12)
        .buildSpriteObjectRow([[19639, 19640]], 12, 6)
        .buildSpriteObjectRow([
        [19613, 19614],
        [19629, 19630],
    ], 6, 10, 0, 5)
        .buildSpriteObject([[19625], [19641]], 6, 12)
        .buildSpriteObjectRow([[19591], [19607], [19623]], 9, 11, 0, 0, 1, true)
        .buildSingleSprite(19638, 10, 2)
        .buildSingleSprite(19657, 10, 10, true)
        .buildSingleSprite(19657, 3, 4)
        .createLayer('furniture_02', 13, 13, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_HIGH)
        .buildSingleSprite(19609, 3, 10, false, false, 0, 5)
        .buildSingleSprite(19609, 10, 12, false, false, 1, 5)
        .createLayer('furniture_03', 13, 13, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        .buildSpriteObjectRow([
        [19619, 19620],
        [19635, 19636],
    ], 9, 11, 18, -15)
        .createLayer('furniture_triggered', 13, 13, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        .buildSpriteObjectRow([
        [19611, 19612],
        [19627, 19628],
    ], 6, 0, 0, -15, 1, false, bookcaseTrigger)
        .buildSpriteObjectRow([
        [19611, 19612],
        [19627, 19628],
    ], 8, 0, 0, -55, 1, false, bookcaseTrigger)
        .buildSpriteObjectRow([
        [19611, 19612],
        [19627, 19628],
    ], 6, 2, 0, -15, 1, false, bookcaseTrigger)
        .buildSpriteObjectRow([
        [19611, 19612],
        [19627, 19628],
    ], 8, 2, 0, -55, 1, false, bookcaseTrigger)
        .createLayer('effects', 13, 13, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .addMapTransitionTrigger([compositeCondition], MapTransitionEvent)
        .build();
}


/***/ }),

/***/ "./src/game/map/littleroot_town/littleroot-town.ts":
/*!*********************************************************!*\
  !*** ./src/game/map/littleroot_town/littleroot-town.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLittleRootTown: () => (/* binding */ createLittleRootTown)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rendering/tile-map-builder */ "./src/rendering/tile-map-builder.ts");
/* harmony import */ var _types_render_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/types/render-types */ "./src/types/render-types.ts");
/* harmony import */ var _effects_sprites_effects_door_open__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/effects/sprites-effects/door-open */ "./src/effects/sprites-effects/door-open.ts");
/* harmony import */ var _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/effects/trigger-conditions/area */ "./src/effects/trigger-conditions/area.ts");
/* harmony import */ var _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/effects/trigger-conditions/keypress */ "./src/effects/trigger-conditions/keypress.ts");
/* harmony import */ var _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/effects/trigger-conditions/composite */ "./src/effects/trigger-conditions/composite.ts");
/* harmony import */ var _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/effects/sprites-effects/player-movement */ "./src/effects/sprites-effects/player-movement.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _effects_sprites_effects_lab_door_open__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/effects/sprites-effects/lab-door-open */ "./src/effects/sprites-effects/lab-door-open.ts");
/* harmony import */ var _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/effects/trigger-conditions/player-position */ "./src/effects/trigger-conditions/player-position.ts");












async function createLittleRootTown() {
    const assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');
    const appScale = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getTilesScale();
    const doorEffectToH1 = new _effects_sprites_effects_door_open__WEBPACK_IMPORTED_MODULE_4__.DoorOpenEffect(318, 324, appScale, _effects_sprites_effects_door_open__WEBPACK_IMPORTED_MODULE_4__.DoorOpenEffect.initialState.close);
    const doorEffectToH2 = new _effects_sprites_effects_door_open__WEBPACK_IMPORTED_MODULE_4__.DoorOpenEffect(610, 324, appScale, _effects_sprites_effects_door_open__WEBPACK_IMPORTED_MODULE_4__.DoorOpenEffect.initialState.close, true);
    const doorEffectToLab = new _effects_sprites_effects_lab_door_open__WEBPACK_IMPORTED_MODULE_10__.LabDoorOpenEffect(370, 638, appScale, _effects_sprites_effects_door_open__WEBPACK_IMPORTED_MODULE_4__.DoorOpenEffect.initialState.close, false);
    const MapTransitionEventToH1 = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town',
        to: 'little_root_town_house01_f1',
    };
    const MapTransitionEventToH2 = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town',
        to: 'little_root_town_house02_f1',
    };
    const MapTransitionEventToLab = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town',
        to: 'little_root_town_lab',
    };
    const MapTransitionEventTo101 = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town',
        to: 'route_101',
    };
    const playerEffectToH1 = new _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_8__.PlayerMovementEffect({ x: 9, y: 10 }, MapTransitionEventToH1);
    const playerEffectToH2 = new _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_8__.PlayerMovementEffect({ x: 19, y: 10 }, MapTransitionEventToH2);
    const playerEffectToLab = new _effects_sprites_effects_player_movement__WEBPACK_IMPORTED_MODULE_8__.PlayerMovementEffect({ x: 11, y: 20 }, MapTransitionEventToLab);
    const areaConditionToH1 = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_5__.AreaTriggerCondition({ x: 9, y: 11, width: 1, height: 1 }, 32);
    const areaConditionToH2 = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_5__.AreaTriggerCondition({ x: 19, y: 11, width: 1, height: 1 }, 32);
    const areaConditionToLab = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_5__.AreaTriggerCondition({ x: 11, y: 21, width: 1, height: 1 }, 32);
    const areaConditionTo101 = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_5__.AreaTriggerCondition({ x: 15, y: 0, width: 2, height: 1 }, 32);
    const keyCondition = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_6__.KeyPressTriggerCondition('ArrowUp');
    const playerPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_11__.PlayerPositionTriggerCondition([
        'walk-up',
        'up-align',
        'up',
    ]);
    const compositeConditionToH1 = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_7__.CompositeTriggerCondition([
        areaConditionToH1,
        keyCondition,
        playerPosition,
    ]);
    const compositeConditionToH2 = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_7__.CompositeTriggerCondition([
        areaConditionToH2,
        keyCondition,
        playerPosition,
    ]);
    const compositeConditionToLab = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_7__.CompositeTriggerCondition([
        areaConditionToLab,
        keyCondition,
        playerPosition,
    ]);
    const keyConditionUp = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_6__.KeyPressTriggerCondition('ArrowUp');
    const compositeConditionTo101 = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_7__.CompositeTriggerCondition([
        areaConditionTo101,
        keyConditionUp,
        playerPosition,
    ]);
    return (new _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__.TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 29, 27, true, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .buildCollisionRow(0, 0, 15)
        .buildCollisionRow(1, 0, 15)
        .buildCollisionRow(2, 0, 15)
        .buildCollisionRow(3, 0, 15)
        .buildCollisionRow(0, 17, 12)
        .buildCollisionRow(1, 17, 12)
        .buildCollisionRow(2, 17, 12)
        .buildCollisionRow(3, 17, 12)
        .buildCollisionRow(4, 0, 5)
        .buildCollisionRow(5, 0, 5)
        .buildCollisionRow(6, 0, 5)
        .buildCollisionRow(4, 25, 4)
        .buildCollisionRow(5, 25, 4)
        .buildCollisionRow(6, 25, 4)
        .buildCollisionColum(0, 7, 15)
        .buildCollisionColum(1, 7, 15)
        .buildCollisionColum(27, 7, 12)
        .buildCollisionColum(28, 7, 12)
        .buildCollisionRow(22, 0, 5)
        .buildCollisionRow(23, 0, 5)
        .buildCollisionRow(24, 0, 5)
        .buildCollisionRow(19, 25, 4)
        .buildCollisionRow(20, 25, 4)
        .buildCollisionRow(21, 25, 4)
        .buildCollisionRow(22, 22, 7)
        .buildCollisionRow(23, 22, 7)
        .buildCollisionRow(24, 22, 7)
        .buildCollisionRow(25, 0, 28)
        .buildCollisionRow(26, 0, 28)
        .buildCollisionRec(6, 6, 5, 5)
        .buildCollisionRec(6, 18, 5, 5)
        .buildCollisionRec(15, 7, 6, 8)
        .buildSingleCollision(10, 11)
        .buildSingleCollision(10, 17)
        .buildSingleCollision(17, 22)
        .buildSingleCollision(21, 10)
        .createLayer('ground', 29, 27, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .fillArea(2246, 0, 0, 32, 32)
        .createLayer('trees', 900, 900, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        // tree object
        .buildSpriteObjectRow([[176, 177, 178, 179]], 0, 0, -35, 0, 6)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 0, 24, -244, 0, 5)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 1, 0, -35, -5, 6)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 2, 0, -35, -5, 6)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 3, 0, -35, -5, 6)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 4, 0, -35, -5, 2)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 5, 0, -35, -5, 2)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 6, 0, -35, -5, 2)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 7, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 8, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 9, 0, -35, -5, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 10, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 11, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 12, 0, -35, -5, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 13, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 14, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 15, 0, -35, -5, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 16, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 17, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 18, 0, -35, -5, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 19, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 20, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 21, 0, -35, -5, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 22, 0, -35, -5, 2)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 23, 0, -35, -5, 2)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 24, 0, -35, -5, 2)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 25, 0, -35, -5, 12)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 26, 0, -35, -5, 12)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 27, 0, -35, -5, 12)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 1, 24, -244, -5, 5)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 2, 24, -244, -5, 5)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 3, 24, -244, -5, 5)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 4, 31, -228, -10, 2)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 5, 31, -228, -10, 2)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 6, 31, -228, -10, 2)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 7, 31, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 8, 31, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 9, 31, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 10, 31, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 11, 31, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 12, 31, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 13, 31, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 14, 31, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 15, 31, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 16, 31, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 17, 31, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 18, 31, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 19, 31, -228, -10, 2)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 20, 31, -228, -10, 2)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 21, 31, -228, -10, 2)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 22, 31, -308, -10, 3)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 23, 31, -308, -10, 3)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 24, 31, -308, -10, 3)
        .createLayer('flowers', 29, 27, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSingleSprite(2440, 10, 3)
        .buildSingleSprite(2440, 14, 3)
        .buildSingleSprite(2440, 12, 4)
        .buildSingleSprite(2440, 13, 6)
        .buildSingleSprite(2440, 18, 4)
        .buildSingleSprite(2440, 9, 26)
        .buildSingleSprite(2440, 10, 25)
        .buildSingleSprite(2440, 11, 26)
        .buildSingleSprite(2440, 13, 23)
        .buildSingleSprite(2440, 13, 25)
        .buildSingleSprite(2440, 20, 17)
        .buildSingleSprite(2440, 17, 20)
        .buildSpriteObject([
        [2440, 2440, 2440],
        [2440, 2440, 2440],
    ], 21, 6)
        .createLayer('signs', 29, 27, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        .buildSpriteObject([
        [9580, 9581],
        [9596, 9597],
    ], 9, 11, false, -16, 8)
        .buildSpriteObject([
        [9580, 9581],
        [9596, 9597],
    ], 9, 17, false, -16, 8)
        .buildSpriteObject([
        [9580, 9581],
        [9596, 9597],
    ], 20, 10, false, -16, 8)
        .buildSpriteObject([
        [9580, 9581],
        [9596, 9597],
    ], 16, 22, false, -16, 8)
        .createLayer('houses', 29, 27, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        .buildSpriteObject([
        [15688, 15689, 15690, 15691, 15692, 15693],
        [15704, 15705, 15706, 15707, 15708, 15709],
        [15720, 15721, 15722, 15723, 15724, 15725],
        [15736, 15737, 15738, 15739, 15740, 15741],
        [15752, 15753, 15754, 15755, 15756, 15757],
        [15768, 15769, 15770, 15771, 15772, 15773],
        [15784, 15785, 15786, 15787, 15788, 15789],
        [15800, 15801, 15802, 15803, 15804, 15805],
        [15816, 15817, 15818, 15819, 15820, 15821],
    ], 5, 6, false, -12, -10)
        .buildSpriteObject([
        [15688, 15689, 15690, 15691, 15692, 15693],
        [15704, 15705, 15706, 15707, 15708, 15709],
        [15720, 15721, 15722, 15723, 15724, 15725],
        [15736, 15737, 15738, 15739, 15740, 15741],
        [15752, 15753, 15754, 15755, 15756, 15757],
        [15768, 15769, 15770, 15771, 15772, 15773],
        [15784, 15785, 15786, 15787, 15788, 15789],
        [15800, 15801, 15802, 15803, 15804, 15805],
        [15816, 15817, 15818, 15819, 15820, 15821],
    ], 5, 18, true, -20, -10)
        .buildSpriteObject([
        [
            15840, 15841, 15842, 15843, 15844, 15845, 15846, 15847,
            15848,
        ],
        [
            15856, 15857, 15858, 15859, 15860, 15861, 15862, 15863,
            15864,
        ],
        [
            15872, 15873, 15874, 15875, 15876, 15877, 15878, 15879,
            15880,
        ],
        [
            15888, 15889, 15890, 15891, 15892, 15893, 15894, 15895,
            15896,
        ],
        [
            15904, 15905, 15906, 15907, 15908, 15909, 15910, 15911,
            15912,
        ],
        [
            15920, 15921, 15922, 15923, 15924, 15925, 15926, 15927,
            15928,
        ],
        [
            15936, 15937, 15938, 15939, 15940, 15941, 15942, 15943,
            15944,
        ],
        [
            15952, 15953, 15954, 15955, 15956, 15957, 15958, 15959,
            15960,
        ],
    ], 15, 8, false, -20, -10)
        .createLayer('effects', 29, 27, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .addEnterIntoBuildingTriggerEffect([doorEffectToH1, playerEffectToH1], [_types_effects__WEBPACK_IMPORTED_MODULE_9__.DoorSequence.OPEN_EFFECT, _types_effects__WEBPACK_IMPORTED_MODULE_9__.PlayerMovementSequence.WALK_UP], [compositeConditionToH1], 500)
        .addEnterIntoBuildingTriggerEffect([doorEffectToH2, playerEffectToH2], [_types_effects__WEBPACK_IMPORTED_MODULE_9__.DoorSequence.OPEN_EFFECT, _types_effects__WEBPACK_IMPORTED_MODULE_9__.PlayerMovementSequence.WALK_UP], [compositeConditionToH2], 500)
        .addEnterIntoBuildingTriggerEffect([doorEffectToLab, playerEffectToLab], [_types_effects__WEBPACK_IMPORTED_MODULE_9__.LabDoorSequence.OPEN_EFFECT, _types_effects__WEBPACK_IMPORTED_MODULE_9__.PlayerMovementSequence.WALK_UP], [compositeConditionToLab], 500)
        .addMapTransitionTrigger([compositeConditionTo101], MapTransitionEventTo101)
        .build());
}


/***/ }),

/***/ "./src/game/map/route_101/route-101.ts":
/*!*********************************************!*\
  !*** ./src/game/map/route_101/route-101.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRoute101: () => (/* binding */ createRoute101)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/rendering/tile-map-builder */ "./src/rendering/tile-map-builder.ts");
/* harmony import */ var _types_render_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/types/render-types */ "./src/types/render-types.ts");
/* harmony import */ var _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/effects/trigger-conditions/keypress */ "./src/effects/trigger-conditions/keypress.ts");
/* harmony import */ var _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/effects/trigger-conditions/composite */ "./src/effects/trigger-conditions/composite.ts");
/* harmony import */ var _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/effects/trigger-conditions/area */ "./src/effects/trigger-conditions/area.ts");
/* harmony import */ var _types_effects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/types/effects */ "./src/types/effects.ts");
/* harmony import */ var _effects_trigger_conditions_jump_area__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/effects/trigger-conditions/jump-area */ "./src/effects/trigger-conditions/jump-area.ts");
/* harmony import */ var _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/effects/trigger-conditions/player-position */ "./src/effects/trigger-conditions/player-position.ts");










async function createRoute101() {
    const assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');
    const MapTransitionEventTo101 = {
        type: 'MAP_TRANSITION',
        from: 'route_101',
        to: 'little_root_town',
    };
    const areaConditionTo101 = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_6__.AreaTriggerCondition({ x: 15, y: 25, width: 2, height: 1 }, 32);
    const jumpArea01 = new _effects_trigger_conditions_jump_area__WEBPACK_IMPORTED_MODULE_8__.JumpAreaTriggerCondition({ x: 11, y: 8, width: 4, height: 1 }, 32);
    const jumpArea02 = new _effects_trigger_conditions_jump_area__WEBPACK_IMPORTED_MODULE_8__.JumpAreaTriggerCondition({ x: 3, y: 10, width: 7, height: 1 }, 32);
    const keyConditionDown = new _effects_trigger_conditions_keypress__WEBPACK_IMPORTED_MODULE_4__.KeyPressTriggerCondition('ArrowDown');
    const playerDownPosition = new _effects_trigger_conditions_player_position__WEBPACK_IMPORTED_MODULE_9__.PlayerPositionTriggerCondition([
        'walk-down',
        'down-align',
        'down',
    ]);
    const compositeConditionToRT = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_5__.CompositeTriggerCondition([
        areaConditionTo101,
        keyConditionDown,
        playerDownPosition,
    ]);
    const compositeJumpCondition01 = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_5__.CompositeTriggerCondition([
        jumpArea01,
        keyConditionDown,
    ]);
    const compositeJumpCondition02 = new _effects_trigger_conditions_composite__WEBPACK_IMPORTED_MODULE_5__.CompositeTriggerCondition([
        jumpArea02,
        keyConditionDown,
    ]);
    return (new _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__.TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 29, 26, true, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .buildCollisionRec(0, 0, 4, 12)
        .buildCollisionRec(0, 17, 4, 12)
        .buildCollisionRow(25, 0, 15)
        .buildCollisionRec(0, 0, 26, 2)
        .buildCollisionRec(0, 27, 26, 2)
        .buildCollisionRec(22, 17, 4, 11)
        .buildCollisionRec(9, 16, 6, 3)
        .buildCollisionRec(10, 19, 3, 2)
        .buildCollisionRec(4, 25, 3, 2)
        .buildCollisionRec(19, 25, 3, 2)
        .buildCollisionRec(19, 17, 3, 3)
        .buildCollisionRec(13, 2, 6, 3)
        .buildCollisionRec(13, 7, 2, 2)
        .buildCollisionRec(10, 2, 2, 1)
        .buildCollisionRec(11, 3, 1, 7)
        .buildCollisionRec(9, 10, 3, 1)
        .buildCollisionRec(9, 11, 1, 4)
        .buildCollisionRec(8, 15, 2, 1)
        .createLayer('ground', 29, 26, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .fillArea(2246, 0, 0, 32, 32)
        .createLayer('cliffs', 29, 26, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSpriteRow([4967, 4968, 4968, 4968, 4968, 4968, 4968, 4968, 4970], 11, 2)
        .buildSingleSprite(4954, 10, 10, false)
        .buildSingleSprite(4989, 9, 10)
        .buildSpriteRow([4968, 4968, 4968, 4968, 4970], 9, 11)
        .buildSingleSprite(4885, 10, 2, true)
        .buildSingleSprite(4885, 8, 15, false)
        .createLayer('bush', 29, 26, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        // rigth south area
        .buildSpriteRow([2254, 2254], 13, 19, 0, 6)
        .buildSpriteRow([2254, 2254], 14, 19, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 15, 16, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 16, 16, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 17, 16, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 18, 17, 0, 6)
        .buildSpriteRow([2254, 2254], 19, 20, 0, 6)
        .buildSpriteRow([2254, 2254], 20, 20, 0, 6)
        // left south area
        .buildSpriteRow([2254, 2254, 2254], 19, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254], 20, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 21, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 22, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 23, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254], 24, 2, 0, 6)
        // left north area
        .buildSpriteRow([2254, 2254, 2254, 2254], 4, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 5, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 6, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 7, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 8, 2, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254], 9, 2, 0, 6)
        .buildSpriteRow([2254, 2254], 10, 3, 0, 6)
        // rigth north area
        .buildSpriteRow([2254, 2254, 2254, 2254], 4, 21, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 5, 20, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 6, 19, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254, 2254], 7, 18, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 8, 19, 0, 6)
        .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 9, 19, 0, 6)
        .createLayer('grass_foreground', 29, 26, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        // rigth south area
        .buildBushSpriteRow([2255, 2255], 13, 19, 0, 6)
        .buildBushSpriteRow([2255, 2255], 14, 19, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 15, 16, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255, 2255], 16, 16, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255, 2255], 17, 16, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 18, 17, 0, 6)
        .buildBushSpriteRow([2255, 2255], 19, 20, 0, 6)
        .buildBushSpriteRow([2255, 2255], 20, 20, 0, 6)
        // left south area
        .buildBushSpriteRow([2255, 2255, 2255], 19, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255], 20, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 21, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255, 2255], 22, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 23, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255], 24, 2, 0, 6)
        // left north area
        .buildBushSpriteRow([2255, 2255, 2255, 2255], 4, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 5, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255, 2255], 6, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255, 2255], 7, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 8, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255], 9, 2, 0, 6)
        .buildBushSpriteRow([2255, 2255], 10, 3, 0, 6)
        // rigth north area
        .buildBushSpriteRow([2255, 2255, 2255, 2255], 4, 21, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 5, 20, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255, 2255], 6, 19, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255, 2255, 2255], 7, 18, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255, 2255], 8, 19, 0, 6)
        .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 9, 19, 0, 6)
        .createLayer('trees', 900, 900, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        // tree object
        .buildSpriteObjectRow([[176, 177, 178, 179]], 0, 0, -35, 0, 5)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 0, 24, -244, 0, 5)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 1, 0, -35, -5, 5)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 2, 0, -35, -5, 5)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 3, 0, -35, -5, 5)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 4, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 5, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 6, 0, -35, -5, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 7, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 8, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 9, 0, -35, -5, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 10, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 11, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 12, 0, -35, -5, 1)
        //
        .buildSpriteObjectRow([[144, 145, 146, 147]], 9, 20, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 10, 20, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 11, 20, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 9, 24, -190, 30, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 10, 24, -190, 30, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 11, 24, -190, 30, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 12, 20, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 13, 20, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 14, 20, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 13, 0, -35, -5, 2)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 14, 0, -35, -5, 2)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 15, 0, -35, -5, 2)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 16, 0, -35, -5, 2)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 17, 0, -35, -5, 2)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 18, 0, -35, -5, 2)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 19, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 20, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 21, 0, -35, -5, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 22, 0, -35, -5, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 23, 0, -35, -5, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 24, 0, -35, -5, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 25, 0, -35, -5, 6)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 26, 0, -35, -5, 6)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 27, 0, -35, -5, 6)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 1, 24, -244, -5, 5)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 2, 24, -244, -5, 5)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 3, 24, -244, -5, 5)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 4, 31, -228, -10, 2)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 5, 31, -228, -10, 2)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 6, 31, -228, -10, 2)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 7, 31, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 8, 31, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 9, 31, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 10, 31, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 11, 31, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 12, 31, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 13, 31, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 14, 31, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 15, 31, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 16, 31, -148, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 17, 31, -148, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 18, 31, -148, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 19, 31, -228, -10, 2)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 20, 31, -228, -10, 2)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 21, 31, -228, -10, 2)
        .buildSpriteObjectRow([[144, 145, 146, 147]], 19, 24, -244, -10, 1)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 20, 24, -244, -10, 1)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 21, 24, -244, -10, 1)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 22, 31, -468, -10, 5)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 23, 31, -468, -10, 5)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 24, 31, -468, -10, 5)
        // tree object
        .buildSpriteObjectRow([[144, 145, 146, 147]], 25, 31, -468, -10, 5)
        .buildSpriteObjectRow([[160, 161, 162, 163]], 26, 31, -468, -10, 5)
        .buildSpriteObjectRow([[176, 177, 178, 179]], 27, 31, -468, -10, 5)
        .createLayer('signs', 29, 26, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_LOW)
        .buildSpriteObjectRow([
        [9636, 9637],
        [9652, 9653],
    ], 13, 7)
        .createLayer('roads', 29, 26, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND_MED)
        // First road
        .buildSpriteObjectRow([[2001, 2002, 2002, 2002, 2004]], 14, 10)
        .buildSpriteObjectRow([[2001, 2002, 2002, 2030, 2018, 2018, 2018, 2020]], 15, 7)
        .buildSpriteObjectRow([[2017, 2018, 2018, 2018, 2018, 2018, 2018, 2020]], 16, 7)
        .buildSpriteObjectRow([[2017, 2018, 2018, 2018, 2018, 2018, 2018, 2020]], 17, 7)
        .buildSpriteObjectRow([[2049, 2050, 2014, 2018, 2018, 2013, 2051, 2052]], 18, 7)
        .buildSpriteObjectRow([[2049, 2050, 2050, 2052]], 19, 9)
        // Second road
        .buildSpriteObjectRow([[2001, 2002, 2004]], 11, 23)
        .buildSpriteObjectRow([[2001, 2030, 2018, 2020]], 12, 22)
        .buildSpriteObjectRow([[2017, 2018, 2018, 2029, 2004]], 13, 22)
        .buildSpriteObjectRow([[2049, 2014, 2018, 2018, 2020]], 14, 22)
        .buildSpriteObjectRow([[2049, 2014, 2018, 2020]], 15, 23)
        .buildSpriteObjectRow([[2049, 2051, 2052]], 16, 24)
        // Third road
        .buildSpriteObjectRow([[2033, 2018, 2018, 2036]], 0, 13, -10)
        .buildSpriteObjectRow([[2033, 2018, 2018, 2036]], 1, 13, -10)
        .buildSpriteObjectRow([[2049, 2050, 2050, 2052]], 2, 13, -10)
        .createLayer('effects', 29, 26, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .addJumpEffectTrigger(_types_effects__WEBPACK_IMPORTED_MODULE_7__.PlayerJumpSequence.JUMP_DOWN, compositeJumpCondition01)
        .addJumpEffectTrigger(_types_effects__WEBPACK_IMPORTED_MODULE_7__.PlayerJumpSequence.JUMP_DOWN, compositeJumpCondition02)
        .addMapTransitionTrigger([compositeConditionToRT], MapTransitionEventTo101)
        .build());
}


/***/ }),

/***/ "./src/game/player/player.ts":
/*!***********************************!*\
  !*** ./src/game/player/player.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/engine/canvas-token */ "./src/core/engine/canvas-token.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_collision_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/systems/collision-system */ "./src/core/systems/collision-system.ts");
/* harmony import */ var _core_systems_event_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/systems/event-system */ "./src/core/systems/event-system.ts");
/* harmony import */ var _core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/systems/game-state-manager */ "./src/core/systems/game-state-manager.ts");
/* harmony import */ var _input_input_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/input/input-manager */ "./src/input/input-manager.ts");
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");
/* harmony import */ var _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/rendering/sprite-sheet */ "./src/rendering/sprite-sheet.ts");









class Player {
    position;
    targetPosition;
    sprite;
    isMoving = false;
    intendedDirection = { x: 0, y: 0 };
    flipX = false;
    tileSize;
    scale;
    movementSpeed = 120;
    currentAnimation = 'idle';
    playerOffsetX = 0;
    playerOffsetY = 0;
    hidden = false;
    canMove = true;
    isAligning = false;
    alignProgress = 0;
    alignAnimationDuration = 0;
    currentAlignDirection = { x: 0, y: 0 };
    lastDirection = { x: 0, y: 0 };
    gameStateManager;
    assetManager;
    collisionSystem;
    eventSystem;
    constructor() {
        this.initialize();
    }
    initialize() {
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_2__.GameContext.getInstance();
        this.tileSize = gameContext.getTileSize();
        this.scale = gameContext.getTilesScale();
        this.assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_2__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_0__.AssetManager);
        this.collisionSystem = gameContext.getBean(_core_systems_collision_system__WEBPACK_IMPORTED_MODULE_3__.CollisionSystem);
        this.gameStateManager = gameContext.getBean(_core_systems_game_state_manager__WEBPACK_IMPORTED_MODULE_5__.GameStateManager);
        this.eventSystem = gameContext.getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_4__.EventSystem);
        this.gameStateManager.subscribe(() => {
            this.updatePlayerState();
        });
        const xPlayerPosition = this.gameStateManager.getState().player.position.x;
        const yPlayerPosition = this.gameStateManager.getState().player.position.y;
        this.position = this.snapToTileCenter({
            x: xPlayerPosition,
            y: yPlayerPosition,
        });
        this.targetPosition = { ...this.position };
        this.configureAnimations(this.assetManager.getSpriteSheet('player'));
        this.sprite = new _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_8__.AnimatedSprite(this.assetManager.getSpriteSheet('player'));
        this.eventSystem.on('TRANSITION_START', () => this.lockPlayerMovement());
        this.eventSystem.on('TRANSITION_END', () => this.unlockPlayerMovement());
        this.sprite.play('idle');
    }
    updatePlayerState() {
        const { hidden, canMove, position, spritePosition } = this.gameStateManager.getState().player;
        this.hidden = hidden;
        this.canMove = canMove;
        this.canMove = canMove;
        this.playAnimation(spritePosition);
        if (this.position.x != position.x || this.position.y != position.y) {
            this.position = this.snapToTileCenter(position);
            this.targetPosition = this.position;
        }
    }
    configureAnimations(spriteSheet) {
        spriteSheet.defineAnimation({
            name: 'idle',
            frames: [[[0]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'up',
            frames: [[[1]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'down',
            frames: [[[0]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'left',
            frames: [[[2]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'right',
            frames: [[[2]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'walk-up-first',
            frames: [[[4]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'walk-up-second',
            frames: [[[7]]],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: 'walk-left',
            frames: [[[5]], [[2]], [[8]], [[2]]],
            frameRate: 8,
            loop: true,
        });
        spriteSheet.defineAnimation({
            name: 'walk-up',
            frames: [[[4]], [[1]], [[7]], [[1]]],
            frameRate: 8,
            loop: true,
        });
        spriteSheet.defineAnimation({
            name: 'walk-down',
            frames: [[[3]], [[0]], [[6]], [[0]]],
            frameRate: 8,
            loop: true,
        });
        spriteSheet.defineAnimation({
            name: 'left-align',
            frames: [[[2]], [[5]]],
            frameRate: 16,
            loop: true,
        });
        spriteSheet.defineAnimation({
            name: 'up-align',
            frames: [[[1]], [[7]]],
            frameRate: 16,
            loop: true,
        });
        spriteSheet.defineAnimation({
            name: 'down-align',
            frames: [[[0]], [[3]]],
            frameRate: 16,
            loop: true,
        });
    }
    snapToTileCenter(position) {
        return {
            x: Math.floor(position.x / this.tileSize) * this.tileSize +
                this.tileSize / 2,
            y: Math.floor(position.y / this.tileSize) * this.tileSize +
                this.tileSize / 2,
        };
    }
    getCurrentTile() {
        return {
            x: Math.floor(this.position.x / this.tileSize),
            y: Math.floor(this.position.y / this.tileSize),
        };
    }
    update(deltaTime) {
        if (!this.canMove)
            return;
        const deltaSeconds = deltaTime / 1000;
        let spritePosition = { activeAnimation: this.currentAnimation };
        this.intendedDirection = _input_input_manager__WEBPACK_IMPORTED_MODULE_6__.Input.movementDirection;
        if (this.isAligning) {
            this.alignProgress += deltaTime;
            this.sprite.update(deltaTime);
            if (this.alignProgress >= this.alignAnimationDuration) {
                this.isAligning = false;
                this.alignProgress = 0;
            }
            return;
        }
        if (!this.isMoving) {
            this.intendedDirection = _input_input_manager__WEBPACK_IMPORTED_MODULE_6__.Input.movementDirection;
            if (this.intendedDirection.x !== 0 ||
                this.intendedDirection.y !== 0) {
                if (this.intendedDirection.x !== this.lastDirection.x ||
                    this.intendedDirection.y !== this.lastDirection.y) {
                    this.playAlignAnimation(this.intendedDirection, spritePosition);
                    this.lastDirection = this.intendedDirection;
                    this.currentAlignDirection = this.intendedDirection;
                    this.isAligning = true;
                }
                else {
                    this.startMovement(this.intendedDirection, spritePosition);
                }
                this.lastDirection = this.intendedDirection;
            }
        }
        if (this.isMoving) {
            this.moveTowardsTarget(deltaSeconds);
            this.sprite.update(deltaTime);
        }
        if (!this.isMoving &&
            !this.isAligning &&
            this.intendedDirection.x === 0 &&
            this.intendedDirection.y === 0) {
            this.gameStateManager.updateState((state) => {
                return {
                    ...state,
                    player: {
                        ...state.player,
                        spritePosition: this.getIdleAnimation(spritePosition.activeAnimation),
                        position: {
                            x: this.position.x,
                            y: this.position.y,
                        },
                    },
                };
            });
        }
        else {
            this.gameStateManager.updateState((state) => {
                return {
                    ...state,
                    player: {
                        ...state.player,
                        spritePosition: spritePosition.activeAnimation,
                        position: {
                            x: this.position.x,
                            y: this.position.y,
                        },
                    },
                };
            });
        }
    }
    moveTowardsTarget(deltaSeconds) {
        const dx = this.targetPosition.x - this.position.x;
        const dy = this.targetPosition.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveDistance = this.movementSpeed * deltaSeconds;
        if (distance > 0) {
            const ratio = Math.min(moveDistance / distance, 1);
            this.position.x += dx * ratio;
            this.position.y += dy * ratio;
        }
        if (distance <= moveDistance) {
            this.position = { ...this.targetPosition };
            this.isMoving = false;
        }
    }
    updateMovementAnimation(direction, spritePosition) {
        if (direction.x !== 0) {
            this.flipX = direction.x > 0;
            spritePosition.activeAnimation = 'walk-left';
        }
        else if (direction.y > 0) {
            spritePosition.activeAnimation = 'walk-down';
        }
        else if (direction.y < 0) {
            spritePosition.activeAnimation = 'walk-up';
        }
    }
    playAlignAnimation(direction, spritePosition) {
        if (direction.x > 0) {
            spritePosition.activeAnimation = 'left-align';
            this.flipX = true;
        }
        else if (direction.x < 0) {
            spritePosition.activeAnimation = 'left-align';
            this.flipX = false;
        }
        else if (direction.y > 0) {
            spritePosition.activeAnimation = 'down-align';
        }
        else if (direction.y < 0) {
            spritePosition.activeAnimation = 'up-align';
        }
        const animation = this.sprite.spriteSheet.getAnimation(spritePosition.activeAnimation);
        this.alignAnimationDuration =
            (animation.frames.length / animation.frameRate) * 1000;
    }
    startMovement(direction, spritePosition) {
        const currentTile = this.getCurrentTile();
        const targetTile = {
            x: currentTile.x + direction.x,
            y: currentTile.y + direction.y,
        };
        if (this.collisionSystem.isColliding(targetTile.x * this.tileSize, targetTile.y * this.tileSize)) {
            return;
        }
        this.targetPosition = {
            x: targetTile.x * this.tileSize + this.tileSize / 2,
            y: targetTile.y * this.tileSize + this.tileSize / 2,
        };
        this.isMoving = true;
        this.updateMovementAnimation(direction, spritePosition);
    }
    render() {
        const frame = this.sprite.getCurrentFrame();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_2__.GameContext.getInstance();
        const ctx = gameContext.getBean(_core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_1__.GAME_CANVAS);
        const camera = gameContext.getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_7__.Camera);
        const screenPos = {
            x: Math.ceil(this.position.x -
                camera.position.x -
                (frame.width * this.scale) / 2),
            y: Math.ceil(this.position.y -
                camera.position.y -
                (frame.height * this.scale) / 2),
        };
        const tileWidth = this.sprite.spriteSheet.width * this.scale;
        const tileHeight = this.sprite.spriteSheet.height * this.scale;
        if (this.hidden) {
            return;
        }
        frame.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const xOffset = (this.flipX
                    ? (row.length - colIndex - 1) * tileWidth
                    : colIndex * tileWidth) + this.playerOffsetX;
                let yOffset = rowIndex * tileHeight + this.playerOffsetY;
                if (frame.currentAnimation === 'walk-left' &&
                    (frame.currentFrame == 0 || frame.currentFrame == 2)) {
                    yOffset = yOffset + 2;
                }
                const tileX = screenPos.x + xOffset;
                const tileY = screenPos.y + yOffset;
                this.sprite.spriteSheet.draw(ctx, tile, tileX, tileY, this.flipX, this.scale);
            });
        });
    }
    playAnimation(animation) {
        if (this.currentAnimation != animation) {
            this.sprite.play(animation);
            this.currentAnimation = animation;
        }
    }
    getIdleAnimation(currentAnimation) {
        switch (currentAnimation) {
            case 'walk-left':
            case 'left-align':
            case 'left':
                return 'left';
            case 'walk-up':
            case 'up-align':
            case 'up':
                return 'up';
            case 'walk-down':
            case 'down-align':
            case 'down':
                return 'down';
        }
        return 'up';
    }
    lockPlayerMovement() {
        this.gameStateManager.updateState((state) => ({
            ...state,
            player: { ...state.player, canMove: false },
        }));
    }
    unlockPlayerMovement() {
        this.gameStateManager.updateState((state) => ({
            ...state,
            player: { ...state.player, canMove: true },
        }));
    }
}


/***/ }),

/***/ "./src/html/components/app/app-component.ts":
/*!**************************************************!*\
  !*** ./src/html/components/app/app-component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentDefinitions: () => (/* binding */ componentDefinitions)
/* harmony export */ });
/* harmony import */ var _layout_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/layout */ "./src/html/components/app/layout/layout.ts");
/* harmony import */ var _header_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header/header */ "./src/html/components/app/header/header.ts");
/* harmony import */ var _body_body__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./body/body */ "./src/html/components/app/body/body.ts");
/* harmony import */ var _pages_skills_about_skills_about__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/skills-about/skills-about */ "./src/html/components/app/pages/skills-about/skills-about.ts");




/**
 * Components declaration
 */
const componentDefinitions = [
    {
        name: 'app-layout',
        component: _layout_layout__WEBPACK_IMPORTED_MODULE_0__["default"],
    },
    {
        name: 'app-header',
        component: _header_header__WEBPACK_IMPORTED_MODULE_1__["default"],
    },
    {
        name: 'app-body',
        component: _body_body__WEBPACK_IMPORTED_MODULE_2__["default"],
    },
    {
        name: 'page-skills-about',
        component: _pages_skills_about_skills_about__WEBPACK_IMPORTED_MODULE_3__["default"],
    },
];


/***/ }),

/***/ "./src/html/components/app/body/body.css":
/*!***********************************************!*\
  !*** ./src/html/components/app/body/body.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (":host {\r\n    position: absolute;\r\n    width: 100vw;\r\n    height: 100vh;\r\n}\r\n\r\n.body-content {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.active {\r\n    position: relative;\r\n}\r\n");

/***/ }),

/***/ "./src/html/components/app/body/body.html":
/*!************************************************!*\
  !*** ./src/html/components/app/body/body.html ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = `<div class="body-content">
    <div class="component-container"></div>
</div>`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/html/components/app/body/body.ts":
/*!**********************************************!*\
  !*** ./src/html/components/app/body/body.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BodyComponent)
/* harmony export */ });
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../main.css */ "./src/html/main.css");
/* harmony import */ var _body_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body.css */ "./src/html/components/app/body/body.css");
/* harmony import */ var _body_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./body.html */ "./src/html/components/app/body/body.html");
/* harmony import */ var _core_systems_event_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/systems/event-system */ "./src/core/systems/event-system.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");





class BodyComponent extends HTMLElement {
    eventSystem;
    currentComponent = null;
    currentMenuItemName = null;
    constructor() {
        super();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_4__.GameContext.getInstance();
        this.eventSystem = gameContext.getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_3__.EventSystem);
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
                    <style>${_main_css__WEBPACK_IMPORTED_MODULE_0__["default"].toString()}${_body_css__WEBPACK_IMPORTED_MODULE_1__["default"].toString()}</style>
                    ${_body_html__WEBPACK_IMPORTED_MODULE_2__["default"]}
                `;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.setupTransitionListeners();
    }
    setupTransitionListeners() {
        const eventSystem = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_4__.GameContext.getInstance().getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_3__.EventSystem);
        eventSystem.on('PAGE_TRANSITION_STARTED', (data) => this.preLoadComponent(data));
        eventSystem.on('PAGE_TRANSITION_CLOSED', () => this.showLoadedComponent());
        eventSystem.on('PAGE_CLOSED_TRANSITION_CLOSED', () => this.resetComponent());
    }
    showLoadedComponent() {
        if (!this.currentComponent)
            return;
        const componentContainer = this.shadowRoot?.querySelector('.component-container');
        const component = this.currentComponent;
        if (this.currentMenuItemName) {
            component.menuItemName = this.currentMenuItemName;
        }
        componentContainer.innerHTML = '';
        componentContainer?.appendChild(component);
    }
    preLoadComponent(data) {
        this.currentComponent = data.component;
        this.currentMenuItemName = data.itemName;
        this.toggleBodyContentIndex();
    }
    resetComponent() {
        this.currentComponent = null;
        this.currentMenuItemName = null;
        this.toggleBodyContentIndex();
    }
    toggleBodyContentIndex() {
        const bodyContent = this.shadowRoot.querySelector('.body-content');
        bodyContent.classList.toggle('active');
        const componentContainer = this.shadowRoot?.querySelector('.component-container');
        componentContainer.innerHTML = '';
        this.eventSystem.emit('PAGE_CLOSED_TRANSITION_READY', {});
    }
}


/***/ }),

/***/ "./src/html/components/app/header/header.css":
/*!***************************************************!*\
  !*** ./src/html/components/app/header/header.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (":host {\r\n    position: absolute;\r\n}\r\n\r\n.header-container {\r\n    width: 100vw;\r\n    height: 100vh;\r\n    overflow: hidden;\r\n}\r\n\r\n.header {\r\n    display: flex;\r\n    align-items: flex-start;\r\n    justify-content: space-between;\r\n    padding: 1rem;\r\n    width: 100%;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.menu-container {\r\n    position: relative;\r\n    z-index: 12;\r\n}\r\n\r\n.shadow-box {\r\n    bottom: -3px;\r\n    right: -3px;\r\n    position: absolute;\r\n    background: #736b84;\r\n    width: 100%;\r\n    height: 100%;\r\n    border-radius: 4px;\r\n}\r\n\r\n.open-menu-btn {\r\n    width: 44px;\r\n    height: 44px;\r\n    position: relative;\r\n    padding: 0;\r\n    margin: 0;\r\n    transition-property: all;\r\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\r\n    transition-duration: 0.15s;\r\n    border: none;\r\n    outline: none;\r\n    background: none;\r\n}\r\n\r\n.open-menu-btn img {\r\n    position: absolute;\r\n    bottom: 0;\r\n    right: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.open-menu-btn:active img {\r\n    transform: translate(0, 0.25rem) rotate(0) skew(0) skewY(0) scaleX(1)\r\n        scaleY(1);\r\n}\r\n\r\n.open-menu-btn:active .shadow-box {\r\n    transform: translate(0, 0.25rem) rotate(0) skew(0) skewY(0) scaleX(1)\r\n        scaleY(1);\r\n    bottom: -2px;\r\n    right: -2px;\r\n}\r\n\r\n.menu-body-container {\r\n    position: absolute;\r\n    top: 0;\r\n    right: -330px;\r\n    min-width: 300px;\r\n    width: 15vw;\r\n    max-height: 80%;\r\n    transform-origin: top;\r\n    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);\r\n}\r\n\r\n.menu-body-container.active {\r\n    transform: translateX(-320px);\r\n}\r\n\r\n.menu-body {\r\n    position: relative;\r\n}\r\n\r\n.menu-background {\r\n    img {\r\n        width: 100%;\r\n        height: 100%;\r\n        object-fit: cover;\r\n    }\r\n}\r\n\r\n.close-menu {\r\n    position: absolute;\r\n    top: 30px;\r\n    right: 30px;\r\n}\r\n\r\n.close-menu .close-icon {\r\n    position: relative;\r\n    cursor: pointer;\r\n    width: 24px;\r\n    height: 24px;\r\n}\r\n\r\n.close-menu .close-icon::before,\r\n.close-menu .close-icon::after {\r\n    content: '';\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    width: 24px;\r\n    height: 5px;\r\n    background-color: #58566a;\r\n    transform-origin: center;\r\n    transition: background-color 0.3s ease;\r\n}\r\n\r\n.close-menu .close-icon::before {\r\n    transform: translate(-50%, -50%) rotate(45deg);\r\n}\r\n\r\n.close-menu .close-icon::after {\r\n    transform: translate(-50%, -50%) rotate(-45deg);\r\n}\r\n\r\n.close-menu .close-icon:active {\r\n    transform: scale(0.8);\r\n}\r\n\r\n.menu-items {\r\n    position: absolute;\r\n    width: 100%;\r\n    padding: 20px;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.menu-items:first-child {\r\n    margin-top: 2rem;\r\n}\r\n\r\n.logo {\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: -10px;\r\n    transform: translateY(calc(-100% - 10px));\r\n    transition: transform 0.5s ease-in-out;\r\n    h1 {\r\n        font-family: 'pokemon-font';\r\n        color: white;\r\n        text-shadow: 2px 4px #29315a;\r\n        padding: 25px 45px;\r\n        font-size: 2rem;\r\n        letter-spacing: 0.1rem;\r\n    }\r\n}\r\n\r\n.logo-background {\r\n    position: absolute;\r\n    z-index: -1;\r\n    width: 100%;\r\n    height: 100%;\r\n    img {\r\n        width: 100%;\r\n        height: 100%;\r\n        object-fit: fit;\r\n    }\r\n}\r\n");

/***/ }),

/***/ "./src/html/components/app/header/header.html":
/*!****************************************************!*\
  !*** ./src/html/components/app/header/header.html ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Imports
var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../assets/html/layout/wood_sign.png */ "./src/assets/html/layout/wood_sign.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../assets/html/layout/close_btn.png */ "./src/assets/html/layout/close_btn.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../assets/html/layout/menu_btn.png */ "./src/assets/html/layout/menu_btn.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../assets/html/layout/menu_content.png */ "./src/assets/html/layout/menu_content.png"), __webpack_require__.b);
// Module
var code = `<div class="header-container">
    <div class="header">
        <div class="logo-container">
            <div class="logo">
                <div class="logo-background">
                    <img src="${___HTML_LOADER_IMPORT_0___}">
                </div>
                <h1></h1>
            </div>
        </div>
        <div class="menu-container">
            <button class="open-menu-btn">
                <div class="shadow-box">
                </div>
                <img class="close-btn-img" src="${___HTML_LOADER_IMPORT_1___}" alt="">
                <img class="menu-btn-img" src="${___HTML_LOADER_IMPORT_2___}" alt="">
            </button>

            <div class="menu-body-container">
                <div class="menu-body">
                    <div class="menu-items">
                    </div>
                    <div class="menu-background">
                        <img src="${___HTML_LOADER_IMPORT_3___}">
                    </div>
                    <div class="close-menu">
                        <div class="close-icon"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/html/components/app/header/header.ts":
/*!**************************************************!*\
  !*** ./src/html/components/app/header/header.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _html_menu_menu_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/html/menu/menu-config */ "./src/html/menu/menu-config.ts");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../main.css */ "./src/html/main.css");
/* harmony import */ var _header_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header.css */ "./src/html/components/app/header/header.css");
/* harmony import */ var _header_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header.html */ "./src/html/components/app/header/header.html");
/* harmony import */ var _ui_menu_item_menu_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui/menu-item/menu-item */ "./src/html/components/ui/menu-item/menu-item.ts");
/* harmony import */ var _core_systems_event_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/core/systems/event-system */ "./src/core/systems/event-system.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");







class HeaderComponent extends HTMLElement {
    eventSystem;
    logoElement;
    transitionTimeout = null;
    pageActive = false;
    constructor() {
        super();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_6__.GameContext.getInstance();
        this.eventSystem = gameContext.getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_5__.EventSystem);
        this.attachShadow({ mode: 'open' });
        this.initializeTemplate();
        this.initializeMenuButtons();
        this.initializeMenuItems();
        this.initializeLogo();
        this.listenMapTransitionEvent();
        this.eventSystem.on('PAGE_TRANSITION_CLOSED', () => this.updateToPageMode());
        this.eventSystem.on('PAGE_CLOSED_TRANSITION_CLOSED', () => this.updateToGameMode());
    }
    initializeTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
        <style>${_main_css__WEBPACK_IMPORTED_MODULE_1__["default"].toString()}${_header_css__WEBPACK_IMPORTED_MODULE_2__["default"].toString()}</style>
        ${_header_html__WEBPACK_IMPORTED_MODULE_3__["default"]}
      `;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }
    initializeMenuButtons() {
        const openMenuBtn = this.shadowRoot?.querySelector('.open-menu-btn');
        const closeMenuBtn = this.shadowRoot?.querySelector('.close-menu');
        openMenuBtn?.addEventListener('click', () => this.clickedMenu());
        closeMenuBtn?.addEventListener('click', () => this.clickedMenu());
    }
    clickedMenu() {
        if (this.pageActive) {
            this.closeActivePage();
        }
        else {
            this.toggleMenu();
        }
    }
    closeActivePage() {
        this.eventSystem.emit('PAGE_CLOSED_TRANSITION', {});
    }
    toggleMenu() {
        const menuContainer = this.shadowRoot?.querySelector('.menu-body-container');
        menuContainer?.classList.toggle('active');
    }
    desactivateMenu() {
        const menuContainer = this.shadowRoot?.querySelector('.menu-body-container');
        menuContainer.style = 'display: none';
        menuContainer?.classList.remove('active');
        setTimeout(() => {
            menuContainer.style = 'display: block';
        }, 350);
    }
    initializeMenuItems() {
        _html_menu_menu_config__WEBPACK_IMPORTED_MODULE_0__.MENU_CONFIG.forEach((item) => {
            const menuItemsContainer = this.shadowRoot?.querySelector('.menu-items');
            const menuItem = new _ui_menu_item_menu_item__WEBPACK_IMPORTED_MODULE_4__["default"]();
            menuItem.itemName = item.itemName;
            if (item.component) {
                menuItem.pageComponent = new item.component();
            }
            menuItemsContainer?.appendChild(menuItem);
        });
    }
    initializeLogo() {
        this.logoElement = this.shadowRoot?.querySelector('.logo');
        const logoHeight = this.logoElement.offsetHeight;
        this.logoElement.style.transform = `translateY(-${logoHeight + 10}px)`;
    }
    listenMapTransitionEvent() {
        this.eventSystem.on('MAP_TRANSITION', () => {
            const logoHeight = this.logoElement.offsetHeight;
            this.logoElement.style.transform = `translateY(-${logoHeight + 10}px)`;
        });
        this.eventSystem.on('MAP_TRANSITION_READY', (data) => {
            if (!data.mapName)
                return;
            this.logoElement.style.transform = 'translateY(0px)';
            this.logoElement.childNodes[3].textContent = data.mapName;
            if (this.transitionTimeout) {
                clearTimeout(this.transitionTimeout);
            }
            this.transitionTimeout = setTimeout(() => {
                const logoHeight = this.logoElement.offsetHeight;
                this.logoElement.style.transform = `translateY(-${logoHeight + 10}px)`;
            }, 2000);
        });
    }
    updateToPageMode() {
        const imgComponent = this.shadowRoot?.querySelector('.menu-btn-img');
        imgComponent.style.display = 'none';
        this.pageActive = true;
        this.desactivateMenu();
    }
    updateToGameMode() {
        const imgComponent = this.shadowRoot?.querySelector('.menu-btn-img');
        imgComponent.style.display = 'block';
        this.pageActive = false;
    }
}


/***/ }),

/***/ "./src/html/components/app/layout/layout.css":
/*!***************************************************!*\
  !*** ./src/html/components/app/layout/layout.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".layout-container {\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n}\n");

/***/ }),

/***/ "./src/html/components/app/layout/layout.html":
/*!****************************************************!*\
  !*** ./src/html/components/app/layout/layout.html ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = `<div class="layout-container">
    <app-header></app-header>
    <app-body></app-body>
</div>`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/html/components/app/layout/layout.ts":
/*!**************************************************!*\
  !*** ./src/html/components/app/layout/layout.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LayoutComponent)
/* harmony export */ });
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../main.css */ "./src/html/main.css");
/* harmony import */ var _layout_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout.css */ "./src/html/components/app/layout/layout.css");
/* harmony import */ var _layout_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.html */ "./src/html/components/app/layout/layout.html");



class LayoutComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
                    <style>${_main_css__WEBPACK_IMPORTED_MODULE_0__["default"].toString()}${_layout_css__WEBPACK_IMPORTED_MODULE_1__["default"].toString()}</style>
                    ${_layout_html__WEBPACK_IMPORTED_MODULE_2__["default"]}
                `;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }
}


/***/ }),

/***/ "./src/html/components/app/pages/skills-about/skills-about.css":
/*!*********************************************************************!*\
  !*** ./src/html/components/app/pages/skills-about/skills-about.css ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".skills-about-container {\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background: repeating-linear-gradient(\r\n        to bottom,\r\n        #297ba5,\r\n        #297ba5 3vw,\r\n        #6bb5d6 3vw,\r\n        #6bb5d6 6vw\r\n    );\r\n    font-family: 'pokemon-font';\r\n    user-select: none;\r\n}\r\n\r\n@media (max-width: 767px) {\r\n    .trainer-card {\r\n        display: none;\r\n    }\r\n\r\n    .bag {\r\n        width: 100%;\r\n        height: 100%;\r\n        padding: 0.5rem;\r\n        padding-top: 25%;\r\n        box-sizing: border-box;\r\n    }\r\n\r\n    .bag-container {\r\n        position: relative;\r\n        width: 100%;\r\n        height: 100%;\r\n    }\r\n\r\n    .bag-background {\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n        box-sizing: border-box;\r\n    }\r\n\r\n    .bag-background img {\r\n        width: 100%;\r\n        height: 100%;\r\n        object-fit: fill;\r\n    }\r\n\r\n    .inventory-header-container {\r\n        position: relative;\r\n        width: 68vw;\r\n        height: 18vw;\r\n        margin-left: 5vw;\r\n    }\r\n\r\n    .inventory-header {\r\n        position: absolute;\r\n        top: -85%;\r\n    }\r\n\r\n    .inventory-container {\r\n        position: relative;\r\n        width: 68vw;\r\n        height: 18vw;\r\n        display: flex;\r\n        justify-content: center;\r\n    }\r\n\r\n    .inventory-background {\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n    }\r\n\r\n    .inventory-background img {\r\n        width: 100%;\r\n        height: 100%;\r\n        object-fit: fill;\r\n    }\r\n\r\n    .inventory-container .header-title {\r\n        position: absolute;\r\n        height: 73%;\r\n        margin-left: 9vw;\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n        width: 50vw;\r\n        overflow: hidden;\r\n    }\r\n\r\n    .transition-container {\r\n        width: 100%;\r\n        height: 100%;\r\n        transform: translateX(-100%);\r\n    }\r\n\r\n    .header-title .text-container {\r\n        width: 100%;\r\n        height: 100%;\r\n        display: flex;\r\n        align-items: center;\r\n    }\r\n\r\n    .text {\r\n        white-space: nowrap;\r\n        min-width: 100%;\r\n        font-size: 7vw;\r\n        margin: 0;\r\n        margin-bottom: -1vw;\r\n        text-align: center;\r\n    }\r\n\r\n    .arrow {\r\n        position: absolute;\r\n        width: 8vw;\r\n        height: 12vw;\r\n        cursor: pointer;\r\n\r\n        img {\r\n            width: 100%;\r\n            height: 100%;\r\n            object-fit: fill;\r\n        }\r\n    }\r\n\r\n    .movil-arrow-right {\r\n        right: 0;\r\n        animation: rigthmove 0.6s ease-in infinite;\r\n    }\r\n\r\n    .movil-arrow-left {\r\n        left: 11.5vw;\r\n        animation: leftmove 0.6s ease-in infinite;\r\n    }\r\n\r\n    @keyframes rigthmove {\r\n        0% {\r\n            transform: translateX(0);\r\n        }\r\n\r\n        50% {\r\n            transform: translateX(3vw);\r\n        }\r\n\r\n        100% {\r\n            transform: translateX(0);\r\n        }\r\n    }\r\n\r\n    @keyframes leftmove {\r\n        0% {\r\n            transform: translateX(0) rotateY(180deg);\r\n        }\r\n\r\n        50% {\r\n            transform: translateX(-3vw) rotateY(180deg);\r\n        }\r\n\r\n        100% {\r\n            transform: translateX(0) rotateY(180deg);\r\n        }\r\n    }\r\n\r\n    .inventory-body {\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n        padding: 10.5vw 4vw;\r\n        box-sizing: border-box;\r\n    }\r\n\r\n    .inventory-content {\r\n        max-height: 0;\r\n        background-color: #ffffce;\r\n        transition: max-height 0.3s ease-out;\r\n        padding: 1rem;\r\n        box-sizing: border-box;\r\n        font-size: 0.9rem;\r\n        overflow-y: scroll;\r\n    }\r\n\r\n    .content-about {\r\n        display: none;\r\n    }\r\n\r\n    .content-skills {\r\n        display: none;\r\n    }\r\n\r\n    .inventory-content.expanded {\r\n        height: 100%;\r\n        max-height: 100%;\r\n    }\r\n\r\n    .inventory-content h1,\r\n    .inventory-content h2 {\r\n        display: inline;\r\n        margin: 0;\r\n    }\r\n\r\n    .inventory-content .data-set {\r\n        margin-top: 0.5rem;\r\n        margin-bottom: 1.5rem;\r\n    }\r\n\r\n    /* Posiciones definidas */\r\n    .center {\r\n        transform: translateX(0);\r\n    }\r\n\r\n    .off-right {\r\n        transform: translateX(100%);\r\n    }\r\n\r\n    .off-left {\r\n        transform: translateX(-100%);\r\n    }\r\n\r\n    /* Clases para la animación de salida */\r\n    .slide-out-left {\r\n        transform: translateX(-100%);\r\n    }\r\n\r\n    .slide-out-right {\r\n        transform: translateX(100%);\r\n    }\r\n\r\n    /* Clase para animar la entrada (siempre al centro) */\r\n    .slide-in {\r\n        transform: translateX(0);\r\n    }\r\n}\r\n\r\n@media (min-width: 768px) {\r\n    .bag {\r\n        display: none;\r\n    }\r\n\r\n    .skills-about-container {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        background: repeating-linear-gradient(\r\n            to bottom,\r\n            #297ba5,\r\n            #297ba5 0.8vw,\r\n            #6bb5d6 0.8vw,\r\n            #6bb5d6 1.6vw\r\n        );\r\n    }\r\n\r\n    .trainer-card {\r\n        position: relative;\r\n        width: 80%;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        perspective: 2500px;\r\n    }\r\n\r\n    .card-inner {\r\n        width: 80%;\r\n        aspect-ratio: 547 / 336;\r\n        position: relative;\r\n        transform-style: preserve-3d;\r\n        transition: transform 1s ease-in-out;\r\n    }\r\n\r\n    .arrow {\r\n        position: absolute;\r\n        top: 50%;\r\n        transform: translateY(-50%);\r\n        width: 5vw;\r\n        height: 10vw;\r\n        animation: blink 1.5s infinite linear;\r\n        cursor: pointer;\r\n\r\n        img {\r\n            width: 100%;\r\n            height: 100%;\r\n            object-fit: fill;\r\n            image-rendering: crisp-edges;\r\n            image-rendering: -webkit-optimize-contrast;\r\n            filter: invert(100%) sepia(100%) saturate(500%) hue-rotate(200deg);\r\n        }\r\n    }\r\n\r\n    .arrow-left {\r\n        transform: rotateY(180deg) translateY(-50%);\r\n        left: -5vw;\r\n    }\r\n\r\n    .arrow-right {\r\n        right: -5vw;\r\n    }\r\n\r\n    @keyframes blink {\r\n        0% {\r\n            opacity: 1;\r\n        }\r\n\r\n        50% {\r\n            opacity: 0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1;\r\n        }\r\n    }\r\n\r\n    .card-face {\r\n        position: absolute;\r\n        width: 100%;\r\n        aspect-ratio: 547 / 336;\r\n    }\r\n\r\n    .face-back {\r\n        transform: rotateY(180deg) translateZ(1px);\r\n    }\r\n\r\n    .face-front {\r\n        transform: translateZ(1px);\r\n    }\r\n\r\n    .card-border {\r\n        position: absolute;\r\n        height: 100%;\r\n        width: 15px;\r\n        transform: rotateY(90deg) translateZ(-9px);\r\n        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);\r\n    }\r\n\r\n    .trainer-card-background {\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n    }\r\n\r\n    .trainer-card-background img {\r\n        width: 100%;\r\n        height: 100%;\r\n        object-fit: contain;\r\n    }\r\n\r\n    .card-container {\r\n        width: 100%;\r\n        height: 100%;\r\n        position: relative;\r\n    }\r\n\r\n    .card-content {\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n        font-size: 1.2vw;\r\n    }\r\n\r\n    .trainer-id,\r\n    .trainer-name,\r\n    .trainer-text,\r\n    .trainer-about {\r\n        position: absolute;\r\n        height: 8.5%;\r\n    }\r\n\r\n    .trainer-id {\r\n        width: 25%;\r\n        top: 9%;\r\n        right: 10%;\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n\r\n    .trainer-name {\r\n        width: 80%;\r\n        top: 9%;\r\n        right: 0;\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n\r\n    .trainer-text {\r\n        width: 85%;\r\n        left: 8%;\r\n    }\r\n\r\n    .trainer-about {\r\n        width: 90%;\r\n        left: 8%;\r\n    }\r\n\r\n    .trainer-text.name {\r\n        top: 25%;\r\n    }\r\n\r\n    .trainer-text.name h2::after {\r\n        content: '';\r\n        position: absolute;\r\n        left: 0;\r\n        bottom: 0.1em;\r\n        width: 11em;\r\n        height: 0.11em;\r\n        background-color: #646464;\r\n        box-shadow: 0 0.1em #cecece;\r\n    }\r\n\r\n    .trainer-text.skills {\r\n        top: 38%;\r\n    }\r\n\r\n    .trainer-text.softs {\r\n        top: 56%;\r\n    }\r\n\r\n    .trainer-about.about:nth-of-type(2) {\r\n        top: 30%;\r\n    }\r\n\r\n    .trainer-about.about:nth-of-type(3) {\r\n        top: 42%;\r\n    }\r\n\r\n    .trainer-about.about:nth-of-type(4) {\r\n        top: 53%;\r\n    }\r\n\r\n    .trainer-about.about:nth-of-type(5) {\r\n        top: 64%;\r\n    }\r\n\r\n    .trainer-about.about:nth-of-type(6) {\r\n        top: 76%;\r\n    }\r\n\r\n    .trainer-about.about:nth-of-type(7) {\r\n        top: 88%;\r\n    }\r\n\r\n    .trainer-id h2,\r\n    .trainer-name h2,\r\n    .trainer-text h2,\r\n    .trainer-about h2 {\r\n        font-family: 'pokemon-font';\r\n        color: #646464;\r\n        letter-spacing: 0.1em;\r\n        margin: 0;\r\n        margin-bottom: -0.3em;\r\n    }\r\n\r\n    .trainer-id h2 {\r\n        text-shadow: 0.05em 0.12em #d6d6ce;\r\n        padding: 25px 45px;\r\n        font-size: 2.3em;\r\n    }\r\n\r\n    .trainer-name h2 {\r\n        text-shadow: 0.05em 0.12em #d6d6ce;\r\n        padding: 25px 45px;\r\n        font-size: 2.3em;\r\n    }\r\n\r\n    .trainer-text h2 {\r\n        text-shadow: 0.05em 0.12em #cecece;\r\n        font-size: 1.7em;\r\n        line-height: 140%;\r\n    }\r\n\r\n    .trainer-about h2 {\r\n        text-shadow: 0.05em 0.12em #cecece;\r\n        font-size: 1.3em;\r\n    }\r\n\r\n    .trainer-text::before,\r\n    .trainer-text::after {\r\n        content: '';\r\n        position: absolute;\r\n    }\r\n\r\n    .trainer-text::before {\r\n        top: 0.3em;\r\n        left: -1em;\r\n        width: 0.77em;\r\n        height: 1.4em;\r\n        background-color: #84de73;\r\n        z-index: 1;\r\n    }\r\n\r\n    .trainer-text::after {\r\n        top: 0.5em;\r\n        left: -0.85em;\r\n        width: 0.45em;\r\n        height: 1em;\r\n        background-color: #94ef84;\r\n        z-index: 2;\r\n    }\r\n}\r\n");

/***/ }),

/***/ "./src/html/components/app/pages/skills-about/skills-about.html":
/*!**********************************************************************!*\
  !*** ./src/html/components/app/pages/skills-about/skills-about.html ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Imports
var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../assets/html/layout/trainer_card_front.png */ "./src/assets/html/layout/trainer_card_front.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../assets/html/layout/trainer_card_back.png */ "./src/assets/html/layout/trainer_card_back.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../assets/html/layout/rigth_arrow.png */ "./src/assets/html/layout/rigth_arrow.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../assets/html/layout/inventory.png */ "./src/assets/html/layout/inventory.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../assets/html/layout/bag_selector.png */ "./src/assets/html/layout/bag_selector.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../assets/html/layout/arrow_rigth.png */ "./src/assets/html/layout/arrow_rigth.png"), __webpack_require__.b);
// Module
var code = `<div class="skills-about-container">
    <div class="trainer-card">
        <div class="card-inner">
            <!-- front face -->
            <div class="card-face face-front">
                <div class="card-container">
                    <div class="trainer-card-background">
                        <img src="${___HTML_LOADER_IMPORT_0___}" alt="Front">
                    </div>
                    <div class="card-content">
                        <div class="trainer-id">
                            <h2>IDNo.23529</h2>
                        </div>
                        <div class="trainer-text name">
                            <h2>
                                NAME: JIMMY GUERRA
                            </h2>
                        </div>
                        <div class="trainer-text skills">
                            <h2>
                                SKILLS: HTML, CSS, Javascript, Java, TypeScript, Angular, Springboot, SQL.
                            </h2>
                        </div>

                        <div class="trainer-text softs">
                            <h2>
                                SOFT SKILLS: Proactive, Communicative, Colaborative
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <!-- back face -->
            <div class="card-face face-back">
                <div class="card-container">
                    <div class="trainer-card-background">
                        <img src="${___HTML_LOADER_IMPORT_1___}" alt="Back">
                    </div>
                    <div class="card-content">
                        <div class="trainer-name">
                            <h2>JIMMY GUERRA TRAINER CARD</h2>
                        </div>
                        <div class="trainer-about about">
                            <h2>
                                Front-End Web Developer with extensive experience working
                            </h2>
                        </div>
                        <div class="trainer-about about">
                            <h2>
                                with cutting-edge technologies such as Angular and RxJS, and
                            </h2>
                        </div>

                        <div class="trainer-about about">
                            <h2>
                                an excellent command of UX/UI in creating high-quality,
                            </h2>
                        </div>

                        <div class="trainer-about about">
                            <h2>
                                responsive websites.
                            </h2>
                        </div>

                        <div class="trainer-about about">
                            <h2>
                                Constantly developing and learning new technologies and
                            </h2>
                        </div>

                        <div class="trainer-about about">
                            <h2>
                                computational knowledge.
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="arrow arrow-left">
                <img src="${___HTML_LOADER_IMPORT_2___}" alt="">
            </div>
            <div class="arrow arrow-right">
                <img src="${___HTML_LOADER_IMPORT_2___}" alt="">
            </div>
        </div>
    </div>
    <div class="bag">
        <div class="bag-container">
            <div class="bag-background">
                <img src="${___HTML_LOADER_IMPORT_3___}">
            </div>
            <div class="inventory-body">
                <div class="inventory-content expanded">
                    <div class="content-skills">
                        <div class="data-set">
                            <h1>Skills:</h1>
                            <h2>HTML, CSS, Java, Javascript, TypeScript, Angular, Springboot, SQL.</h2>
                        </div>
                        <div class="data-set">
                            <h1>SOFT SKILLS:</h1>
                            <h2>Proactive, Communicative, Colaborative.</h2>
                        </div>
                        <div class="data-set">
                            <h2>Front-End Developer with 4 years of Angular expertise and sharp UI/UX skills, dedicated
                                to building responsive, engaging interfaces.</h2>
                        </div>
                    </div>
                    <div class="content-about">
                        <div class="data-set">
                            <h2>Front-End Web Developer with extensive experience working with cutting-edge technologies
                                such as Angular and RxJS, and an excellent command of UX/UI in creating high-quality,
                                responsive websites.</h2>
                        </div>
                        <div class="data-set">
                            <h2>Constantly developing and learning new technologies and computational knowledge in
                                general. I am passionate about studying sciences and understanding a bit more about this
                                chaotic Universe.</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="inventory-header-container">
                <div class="inventory-header">
                    <div class="inventory-container">
                        <div class="inventory-background">
                            <img src="${___HTML_LOADER_IMPORT_4___}">
                        </div>
                        <div class="header-title">
                            <div class="transition-container">
                                <div class="text-container"
                                    style="transform: translateX(0px); transition: transform 0.5s ease-in-out;">
                                    <h2 class="text about">About me</h2>
                                    <h2 class="text skills">Skills</h2>
                                    <h2 class="text about">About me</h2>
                                    <h2 class="text skills">Skills</h2>
                                </div>
                            </div>
                        </div>
                        <div class="arrow movil-arrow-left">
                            <img src="${___HTML_LOADER_IMPORT_5___}" alt="">
                        </div>
                        <div class="arrow movil-arrow-right">
                            <img src="${___HTML_LOADER_IMPORT_5___}" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/html/components/app/pages/skills-about/skills-about.ts":
/*!********************************************************************!*\
  !*** ./src/html/components/app/pages/skills-about/skills-about.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SkillsAboutComponent)
/* harmony export */ });
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../main.css */ "./src/html/main.css");
/* harmony import */ var _skills_about_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./skills-about.css */ "./src/html/components/app/pages/skills-about/skills-about.css");
/* harmony import */ var _skills_about_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./skills-about.html */ "./src/html/components/app/pages/skills-about/skills-about.html");



class SkillsAboutComponent extends HTMLElement {
    name = 'page-skills-about';
    _menuItemName = '';
    currentRotation = 0;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
      <style>${_main_css__WEBPACK_IMPORTED_MODULE_0__["default"].toString()}${_skills_about_css__WEBPACK_IMPORTED_MODULE_1__["default"].toString()}</style>
      ${_skills_about_html__WEBPACK_IMPORTED_MODULE_2__["default"]}
    `;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.shadowRoot
            ?.querySelector('.arrow-left')
            ?.addEventListener('click', () => this.handleCardRotation('left'));
        this.shadowRoot
            ?.querySelector('.arrow-right')
            ?.addEventListener('click', () => this.handleCardRotation('right'));
        this.shadowRoot
            ?.querySelector('.movil-arrow-right')
            ?.addEventListener('click', () => this.moveRespHeaderBag('right'));
        this.shadowRoot
            ?.querySelector('.movil-arrow-left')
            ?.addEventListener('click', () => this.moveRespHeaderBag('left'));
    }
    handleCardRotation(direction) {
        const cardInner = this.shadowRoot?.querySelector('.card-inner');
        const multiplier = direction === 'left' ? 1 : -1;
        if (this._menuItemName === 'ABOUT ME') {
            this.currentRotation += multiplier * 180;
            this._menuItemName = 'SKILLS';
        }
        else if (this._menuItemName === 'SKILLS') {
            this.currentRotation -= multiplier * 180;
            this._menuItemName = 'ABOUT ME';
        }
        cardInner.style.transform = `rotateY(${this.currentRotation}deg)`;
    }
    set menuItemName(value) {
        this._menuItemName = value;
        this.rotateInnerCard();
        this.setUpResponsiveHeader();
    }
    get menuItemName() {
        return this._menuItemName;
    }
    moveRespHeaderBag(dir) {
        const contentAbout = this.shadowRoot?.querySelector('.content-about');
        const contentSkills = this.shadowRoot?.querySelector('.content-skills');
        contentAbout.style.display = 'none';
        contentSkills.style.display = 'none';
        const inventoryContent = this.shadowRoot?.querySelector('.inventory-content');
        inventoryContent.classList.remove('expanded');
        const textContainer = this.shadowRoot?.querySelector('.header-title .text-container');
        const directionFactor = dir === 'left' ? 1 : -1;
        textContainer.style.transform = `translateX(${directionFactor * -100}%)`;
        setTimeout(() => {
            if (directionFactor === 1) {
                textContainer.appendChild(textContainer.firstElementChild);
            }
            else {
                textContainer.prepend(textContainer.lastElementChild);
            }
            textContainer.style.transition = 'none';
            textContainer.style.transform = 'translateX(0)';
            setTimeout(() => {
                textContainer.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
        setTimeout(() => {
            if (this._menuItemName === 'ABOUT ME') {
                this._menuItemName = 'SKILLS';
                setTimeout(() => {
                    const contentSkills = this.shadowRoot?.querySelector('.content-skills');
                    contentSkills.style.display = 'block';
                }, 250);
            }
            else if (this._menuItemName === 'SKILLS') {
                this._menuItemName = 'ABOUT ME';
                setTimeout(() => {
                    const contentAbout = this.shadowRoot?.querySelector('.content-about');
                    contentAbout.style.display = 'block';
                }, 250);
            }
            inventoryContent.classList.add('expanded');
        }, 200);
    }
    setUpResponsiveHeader() {
        const textContainer = this.shadowRoot?.querySelector('.header-title .text-container');
        if (this._menuItemName === 'ABOUT ME') {
            const contentAbout = this.shadowRoot?.querySelector('.content-about');
            contentAbout.style.display = 'block';
            if (textContainer.firstElementChild?.classList.contains('about')) {
                textContainer.appendChild(textContainer.firstElementChild);
            }
        }
        else if (this._menuItemName === 'SKILLS') {
            const contentSkills = this.shadowRoot?.querySelector('.content-skills');
            contentSkills.style.display = 'block';
            if (textContainer.firstElementChild?.classList.contains('skills')) {
                textContainer.prepend(textContainer.firstElementChild);
            }
        }
    }
    rotateInnerCard() {
        if (this._menuItemName === 'ABOUT ME') {
            this.currentRotation = 180;
            const cardInner = this.shadowRoot?.querySelector('.card-inner');
            cardInner.style.transform = `rotateY(${this.currentRotation}deg)`;
        }
    }
}


/***/ }),

/***/ "./src/html/components/component.ts":
/*!******************************************!*\
  !*** ./src/html/components/component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/app/app-component */ "./src/html/components/app/app-component.ts");
/* harmony import */ var _components_ui_ui_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ui/ui-component */ "./src/html/components/ui/ui-component.ts");


/**
 * Function to define list of components
 */
function componentDefinition(componentDefinitions) {
    componentDefinitions.forEach(({ name, component }) => {
        customElements.define(name, component);
    });
}
componentDefinition(_components_app_app_component__WEBPACK_IMPORTED_MODULE_0__.componentDefinitions);
componentDefinition(_components_ui_ui_component__WEBPACK_IMPORTED_MODULE_1__.componentDefinitions);


/***/ }),

/***/ "./src/html/components/ui/menu-item/menu-item.css":
/*!********************************************************!*\
  !*** ./src/html/components/ui/menu-item/menu-item.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".menu-item {\r\n    font-family: 'pokemon-font', sans-serif;\r\n\r\n    .item {\r\n        position: relative;\r\n        margin-left: 2rem;\r\n        cursor: pointer;\r\n\r\n        &:hover::before {\r\n            content: '';\r\n            display: block;\r\n            position: absolute;\r\n            width: 2rem;\r\n            height: 2rem;\r\n            left: -0.5rem;\r\n            top: 0.5rem;\r\n            background-image: url('data:image/svg+xml,<svg id=\"svg\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"400\" height=\"651.8518518518518\" viewBox=\"0, 0, 400,651.8518518518518\"><g id=\"svgg\"><path id=\"path0\" d=\"M-0.000 292.413 L -0.000 584.826 32.795 584.784 C 57.458 584.752,65.665 584.625,65.895 584.271 C 66.384 583.517,66.427 581.648,66.625 552.600 L 66.813 525.000 89.306 524.993 L 111.800 524.987 89.400 525.206 L 67.000 525.426 95.882 525.476 C 127.740 525.530,125.878 525.688,125.368 522.972 C 125.168 521.904,125.218 521.564,125.545 521.766 C 125.872 521.968,126.000 521.041,126.000 518.461 C 126.000 515.072,125.956 514.886,125.200 515.084 C 124.298 515.320,124.149 514.811,124.900 514.060 C 125.284 513.676,125.446 508.032,125.600 489.680 L 125.800 465.800 155.800 465.795 L 185.800 465.790 156.000 466.006 L 126.200 466.222 162.185 466.280 C 201.163 466.342,199.756 466.426,199.410 464.078 C 199.236 462.900,199.275 462.762,199.603 463.400 C 199.901 463.981,199.961 463.215,199.820 460.604 C 199.679 458.007,199.455 456.883,199.013 456.560 C 198.243 455.997,198.228 455.600,198.975 455.600 C 199.968 455.600,200.039 453.108,199.918 422.200 L 199.800 392.200 224.985 392.306 C 246.929 392.398,250.068 392.338,249.385 391.839 C 248.954 391.523,248.727 391.139,248.882 390.985 C 249.036 390.831,249.434 390.977,249.767 391.309 C 251.226 392.769,258.037 392.626,258.843 391.119 C 259.470 389.948,258.919 383.776,258.116 382.973 C 257.780 382.637,257.631 382.236,257.785 382.082 C 257.939 381.927,258.321 382.150,258.633 382.577 C 259.125 383.250,259.200 380.022,259.200 358.276 L 259.200 333.200 284.300 333.102 C 298.105 333.047,310.989 333.059,312.931 333.127 C 315.624 333.222,316.689 333.103,317.418 332.625 L 318.375 331.998 318.374 288.899 C 318.373 262.806,318.225 245.563,317.998 245.200 C 317.706 244.732,316.833 244.612,314.021 244.654 C 310.114 244.712,308.650 245.013,309.554 245.572 C 309.915 245.795,309.751 245.900,309.043 245.900 C 307.821 245.900,307.801 245.857,308.629 245.029 C 309.200 244.457,306.982 244.400,284.229 244.400 L 259.200 244.400 259.200 219.371 C 259.200 196.618,259.143 194.400,258.571 194.971 C 257.743 195.799,257.700 195.779,257.700 194.557 C 257.700 193.849,257.805 193.685,258.028 194.046 C 258.287 194.464,258.414 194.428,258.625 193.880 C 259.021 192.847,259.054 186.129,258.665 185.737 C 258.278 185.347,259.938 185.371,226.109 185.274 L 200.018 185.200 199.909 161.368 C 199.804 138.304,199.775 137.517,199.024 136.968 C 198.295 136.435,198.290 136.369,198.936 135.896 C 199.470 135.506,199.669 134.583,199.820 131.796 C 199.961 129.185,199.901 128.419,199.603 129.000 C 199.272 129.643,199.233 129.516,199.403 128.355 C 199.760 125.927,201.657 126.040,161.987 126.123 L 125.400 126.200 125.505 95.153 C 125.597 67.848,125.537 64.045,125.005 63.604 C 124.145 62.890,124.256 62.269,125.200 62.516 C 125.956 62.714,126.000 62.528,126.000 59.139 C 126.000 56.615,125.869 55.634,125.556 55.827 C 125.244 56.020,125.192 55.633,125.380 54.519 C 125.818 51.925,127.363 52.049,95.593 52.128 L 66.600 52.200 66.706 26.100 C 66.776 8.776,66.676 -0.000,66.409 -0.000 C 66.143 -0.000,65.970 8.916,65.900 26.100 L 65.794 52.200 65.697 26.100 L 65.600 0.000 32.800 0.000 L 0.000 0.000 -0.000 292.413 M124.808 53.010 C 125.576 53.935,125.121 54.029,124.056 53.166 C 123.412 52.644,123.301 52.400,123.707 52.400 C 124.034 52.400,124.530 52.674,124.808 53.010 M121.994 54.638 C 121.997 54.439,122.364 54.606,122.809 55.009 C 123.349 55.497,123.486 55.874,123.219 56.141 C 122.718 56.642,121.197 55.356,121.206 54.438 C 121.211 53.880,121.261 53.875,121.600 54.400 C 121.813 54.730,121.991 54.837,121.994 54.638 M124.390 60.097 C 124.073 60.374,123.939 60.441,124.093 60.247 C 124.246 60.053,124.177 59.513,123.939 59.047 C 123.525 58.237,123.538 58.230,124.236 58.897 C 124.866 59.499,124.887 59.663,124.390 60.097 M124.300 111.330 C 124.239 119.508,124.190 112.700,124.190 96.200 C 124.190 79.700,124.239 73.008,124.300 81.330 C 124.360 89.651,124.360 103.151,124.300 111.330 M170.930 126.700 C 162.751 126.760,149.251 126.760,140.930 126.700 C 132.608 126.639,139.300 126.590,155.800 126.590 C 172.300 126.590,179.108 126.639,170.930 126.700 M191.698 126.666 C 191.421 126.777,191.273 126.994,191.368 127.148 C 191.463 127.303,191.204 127.429,190.793 127.429 C 190.228 127.429,190.149 127.302,190.471 126.914 C 190.706 126.631,191.191 126.414,191.549 126.432 C 191.967 126.452,192.020 126.536,191.698 126.666 M198.426 126.814 C 198.852 127.042,199.200 127.430,199.200 127.676 C 199.200 127.945,198.920 127.880,198.500 127.514 C 198.115 127.179,197.530 126.805,197.200 126.684 C 196.786 126.532,196.763 126.453,197.126 126.432 C 197.416 126.414,198.001 126.586,198.426 126.814 M195.994 128.638 C 195.997 128.439,196.348 128.591,196.773 128.976 C 197.538 129.668,197.488 131.025,196.715 130.548 C 196.459 130.389,196.480 130.198,196.776 130.015 C 197.107 129.810,197.063 129.584,196.619 129.216 C 196.166 128.840,196.000 128.829,196.000 129.175 C 196.000 129.435,195.820 129.536,195.600 129.400 C 195.380 129.264,195.203 128.848,195.206 128.476 C 195.211 127.893,195.266 127.883,195.600 128.400 C 195.813 128.730,195.991 128.837,195.994 128.638 M198.794 133.143 C 198.791 133.284,198.594 133.670,198.356 134.000 C 197.983 134.519,197.953 134.512,198.131 133.949 C 198.245 133.591,198.127 133.085,197.869 132.825 C 197.509 132.463,197.563 132.415,198.100 132.619 C 198.485 132.766,198.797 133.001,198.794 133.143 M222.400 185.605 L 245.400 185.810 222.580 185.905 C 205.257 185.977,199.644 185.884,199.280 185.520 C 198.916 185.156,198.823 179.632,198.895 162.620 L 198.990 140.200 199.195 162.800 L 199.400 185.400 222.400 185.605 M250.855 185.880 C 250.437 186.046,250.424 186.168,250.797 186.398 C 251.093 186.581,250.872 186.700,250.235 186.700 C 249.390 186.700,249.274 186.593,249.641 186.150 C 249.893 185.847,250.391 185.614,250.749 185.632 C 251.229 185.655,251.257 185.720,250.855 185.880 M258.000 186.400 C 258.440 186.840,258.786 187.515,258.768 187.900 C 258.748 188.351,258.597 188.217,258.343 187.525 C 258.127 186.933,257.467 186.273,256.875 186.057 C 256.183 185.803,256.049 185.652,256.500 185.632 C 256.885 185.614,257.560 185.960,258.000 186.400 M257.988 189.322 C 257.981 189.585,257.776 189.440,257.532 189.000 C 257.288 188.560,256.888 187.921,256.644 187.580 C 256.400 187.240,256.605 187.385,257.100 187.903 C 257.595 188.421,257.995 189.060,257.988 189.322 M256.585 189.224 C 256.481 189.393,256.621 189.623,256.898 189.734 C 257.210 189.860,257.144 189.949,256.724 189.968 C 256.352 189.986,255.936 189.820,255.800 189.600 C 255.664 189.380,255.765 189.200,256.025 189.200 C 256.371 189.200,256.360 189.034,255.984 188.581 C 255.616 188.137,255.390 188.093,255.185 188.424 C 254.979 188.758,254.824 188.763,254.626 188.443 C 254.021 187.463,254.904 187.158,255.830 188.028 C 256.350 188.517,256.690 189.055,256.585 189.224 M317.200 245.600 C 317.640 246.040,317.986 246.715,317.968 247.100 C 317.948 247.551,317.797 247.417,317.543 246.725 C 317.327 246.133,316.667 245.473,316.075 245.257 C 315.383 245.003,315.249 244.852,315.700 244.832 C 316.085 244.814,316.760 245.160,317.200 245.600 M315.800 248.400 C 315.664 248.620,315.773 248.800,316.043 248.800 C 316.313 248.800,316.421 248.912,316.284 249.049 C 316.147 249.187,315.717 249.177,315.328 249.028 C 314.726 248.797,314.709 248.702,315.211 248.385 C 315.971 247.904,316.104 247.907,315.800 248.400 M317.642 252.745 C 317.918 252.310,317.989 252.331,317.994 252.851 C 317.997 253.209,317.753 253.707,317.450 253.959 C 317.006 254.327,316.902 254.202,316.908 253.307 C 316.912 252.698,317.002 252.445,317.106 252.745 C 317.267 253.206,317.351 253.206,317.642 252.745 M317.900 304.100 C 317.840 312.515,317.790 305.630,317.790 288.800 C 317.790 271.970,317.840 265.085,317.900 273.500 C 317.960 281.915,317.960 295.685,317.900 304.100 M317.968 324.749 C 317.948 325.167,317.864 325.220,317.734 324.898 C 317.623 324.621,317.404 324.474,317.249 324.570 C 317.093 324.666,316.939 324.383,316.906 323.942 C 316.856 323.286,316.951 323.227,317.423 323.619 C 317.740 323.882,317.986 324.391,317.968 324.749 M317.194 326.457 C 317.197 326.599,316.885 326.834,316.500 326.981 C 315.963 327.185,315.909 327.137,316.269 326.775 C 316.527 326.515,316.645 326.009,316.531 325.651 C 316.353 325.088,316.383 325.081,316.756 325.600 C 316.994 325.930,317.191 326.316,317.194 326.457 M315.847 328.960 C 315.705 329.929,314.767 330.762,314.105 330.508 C 313.686 330.347,313.567 330.422,313.755 330.727 C 313.948 331.040,313.818 331.105,313.355 330.927 C 312.889 330.749,312.762 330.815,312.958 331.132 C 313.117 331.389,313.057 331.600,312.824 331.600 C 312.078 331.600,312.369 330.912,313.400 330.237 C 314.037 329.820,314.400 329.748,314.400 330.040 C 314.400 330.352,314.604 330.328,315.044 329.964 C 315.450 329.626,315.523 329.374,315.241 329.280 C 314.996 329.199,314.897 328.967,315.021 328.766 C 315.371 328.200,315.939 328.334,315.847 328.960 M318.000 330.600 C 318.000 331.520,316.507 332.806,315.500 332.754 C 314.685 332.712,314.676 332.689,315.400 332.512 C 316.443 332.258,317.600 331.220,317.600 330.538 C 317.600 330.242,317.690 330.000,317.800 330.000 C 317.910 330.000,318.000 330.270,318.000 330.600 M311.745 331.400 C 311.473 332.108,311.210 332.139,310.400 331.556 C 309.890 331.190,309.904 331.158,310.487 331.345 C 310.865 331.466,311.281 331.393,311.411 331.183 C 311.778 330.588,312.001 330.732,311.745 331.400 M308.545 332.200 C 308.685 332.565,308.545 332.800,308.187 332.800 C 307.864 332.800,307.600 332.530,307.600 332.200 C 307.600 331.870,307.761 331.600,307.957 331.600 C 308.154 331.600,308.418 331.870,308.545 332.200 M292.900 332.300 C 286.685 332.362,276.515 332.362,270.300 332.300 C 264.085 332.238,269.170 332.187,281.600 332.187 C 294.030 332.187,299.115 332.238,292.900 332.300 M256.126 389.281 C 255.778 389.666,255.337 389.885,255.147 389.767 C 254.956 389.649,254.786 389.788,254.768 390.076 C 254.743 390.503,254.698 390.502,254.526 390.071 C 254.224 389.317,256.051 387.436,256.454 388.087 C 256.626 388.366,256.484 388.887,256.126 389.281 M258.800 389.800 C 258.800 390.623,257.355 392.001,256.500 391.994 C 255.989 391.990,256.070 391.853,256.800 391.487 C 257.350 391.211,257.978 390.584,258.195 390.093 C 258.658 389.046,258.800 388.977,258.800 389.800 M199.100 437.330 C 199.039 445.508,198.990 438.700,198.990 422.200 C 198.990 405.700,199.039 399.008,199.100 407.330 C 199.160 415.651,199.160 429.151,199.100 437.330 M198.400 460.824 C 198.400 461.057,198.189 461.117,197.932 460.958 C 197.605 460.756,197.552 460.900,197.756 461.434 C 197.978 462.018,197.936 462.090,197.579 461.735 C 197.321 461.479,197.231 461.074,197.378 460.835 C 197.723 460.278,198.400 460.271,198.400 460.824 M197.367 462.347 C 197.485 462.537,197.243 462.999,196.830 463.373 C 195.941 464.177,195.248 463.506,196.015 462.582 C 196.562 461.923,197.052 461.837,197.367 462.347 M193.745 464.600 C 193.473 465.308,193.210 465.339,192.400 464.756 C 191.890 464.390,191.904 464.358,192.487 464.545 C 192.865 464.666,193.281 464.593,193.411 464.383 C 193.778 463.788,194.001 463.932,193.745 464.600 M198.623 465.433 C 198.196 465.745,197.566 465.989,197.224 465.975 C 196.817 465.958,196.899 465.829,197.459 465.603 C 197.932 465.412,198.445 465.051,198.599 464.801 C 198.754 464.551,198.997 464.463,199.139 464.606 C 199.282 464.749,199.050 465.121,198.623 465.433 M191.368 465.252 C 191.273 465.406,191.421 465.623,191.698 465.734 C 192.020 465.864,191.967 465.948,191.549 465.968 C 191.191 465.986,190.706 465.769,190.471 465.486 C 190.149 465.098,190.228 464.971,190.793 464.971 C 191.204 464.971,191.463 465.097,191.368 465.252 M124.300 500.100 C 124.238 506.315,124.187 501.230,124.187 488.800 C 124.187 476.370,124.238 471.285,124.300 477.500 C 124.362 483.715,124.362 493.885,124.300 500.100 M123.367 521.547 C 123.485 521.737,123.243 522.199,122.830 522.573 C 121.941 523.377,121.248 522.706,122.015 521.782 C 122.562 521.123,123.052 521.037,123.367 521.547 M120.667 523.382 C 120.667 523.703,120.509 523.867,120.316 523.748 C 120.123 523.629,119.703 523.749,119.382 524.015 C 119.062 524.280,118.800 524.323,118.800 524.110 C 118.800 523.897,119.205 523.527,119.700 523.288 C 120.195 523.049,120.615 522.842,120.633 522.827 C 120.652 522.812,120.667 523.062,120.667 523.382 M123.256 523.613 C 122.736 524.046,122.106 524.399,121.856 524.398 C 121.605 524.397,121.940 524.050,122.600 523.627 C 124.159 522.629,124.445 522.623,123.256 523.613 M124.623 524.633 C 124.196 524.945,123.566 525.189,123.224 525.175 C 122.817 525.158,122.899 525.029,123.459 524.803 C 123.932 524.612,124.445 524.251,124.599 524.001 C 124.754 523.751,124.997 523.663,125.139 523.806 C 125.282 523.949,125.050 524.321,124.623 524.633 M117.801 525.132 C 117.553 525.381,116.000 524.758,116.000 524.411 C 116.000 524.226,116.437 524.281,116.971 524.533 C 117.505 524.785,117.878 525.055,117.801 525.132 M65.900 559.472 C 65.838 565.812,65.787 560.740,65.787 548.200 C 65.787 535.660,65.838 530.472,65.900 536.672 C 65.962 542.871,65.962 553.131,65.900 559.472 M65.993 573.213 C 65.741 573.684,65.427 573.960,65.294 573.828 C 65.162 573.695,65.266 573.374,65.527 573.113 C 65.787 572.853,66.021 572.271,66.046 571.820 C 66.083 571.176,66.131 571.146,66.272 571.679 C 66.370 572.053,66.245 572.743,65.993 573.213 M63.853 580.900 C 63.706 581.869,63.167 582.362,62.526 582.116 C 61.966 581.901,62.002 581.766,62.783 581.134 C 63.856 580.265,63.953 580.244,63.853 580.900 M64.056 582.813 C 63.536 583.246,62.906 583.599,62.656 583.598 C 62.405 583.597,62.740 583.250,63.400 582.827 C 64.959 581.829,65.245 581.823,64.056 582.813 M65.379 583.865 C 64.223 584.710,63.941 584.489,64.914 583.500 C 65.401 583.005,65.870 582.764,65.955 582.965 C 66.040 583.166,65.781 583.571,65.379 583.865 M58.437 583.577 C 57.998 583.849,58.040 583.959,58.642 584.113 C 59.218 584.261,59.244 584.318,58.749 584.354 C 58.391 584.379,57.905 584.168,57.669 583.884 C 57.343 583.490,57.449 583.351,58.115 583.301 C 58.751 583.253,58.839 583.329,58.437 583.577 \" stroke=\"none\" fill=\"%23646464\" fill-rule=\"evenodd\"></path><path id=\"path1\" d=\"M65.789 26.000 C 65.789 40.410,65.839 46.305,65.900 39.100 C 65.961 31.895,65.961 20.105,65.900 12.900 C 65.839 5.695,65.789 11.590,65.789 26.000 M120.100 52.276 C 120.485 52.376,121.115 52.376,121.500 52.276 C 121.885 52.175,121.570 52.093,120.800 52.093 C 120.030 52.093,119.715 52.175,120.100 52.276 M124.056 53.166 C 124.575 53.587,125.071 53.861,125.157 53.775 C 125.450 53.485,124.306 52.400,123.707 52.400 C 123.301 52.400,123.412 52.644,124.056 53.166 M121.206 54.438 C 121.197 55.356,122.718 56.642,123.219 56.141 C 123.486 55.874,123.349 55.497,122.809 55.009 C 122.364 54.606,121.997 54.439,121.994 54.638 C 121.991 54.837,121.813 54.730,121.600 54.400 C 121.261 53.875,121.211 53.880,121.206 54.438 M123.939 59.047 C 124.177 59.513,124.246 60.053,124.093 60.247 C 123.939 60.441,124.073 60.374,124.390 60.097 C 124.887 59.663,124.866 59.499,124.236 58.897 C 123.538 58.230,123.525 58.237,123.939 59.047 M124.400 62.722 C 124.400 62.931,124.672 63.328,125.005 63.604 C 125.537 64.045,125.597 67.857,125.505 95.233 C 125.447 112.353,125.536 126.224,125.702 126.058 C 126.438 125.322,125.844 62.619,125.100 62.476 C 124.715 62.402,124.400 62.512,124.400 62.722 M124.190 96.200 C 124.190 112.700,124.239 119.508,124.300 111.330 C 124.360 103.151,124.360 89.651,124.300 81.330 C 124.239 73.008,124.190 79.700,124.190 96.200 M194.500 126.276 C 194.885 126.376,195.515 126.376,195.900 126.276 C 196.285 126.175,195.970 126.093,195.200 126.093 C 194.430 126.093,194.115 126.175,194.500 126.276 M140.930 126.700 C 149.251 126.760,162.751 126.760,170.930 126.700 C 179.108 126.639,172.300 126.590,155.800 126.590 C 139.300 126.590,132.608 126.639,140.930 126.700 M190.471 126.914 C 190.149 127.302,190.228 127.429,190.793 127.429 C 191.204 127.429,191.463 127.303,191.368 127.148 C 191.273 126.994,191.421 126.777,191.698 126.666 C 192.020 126.536,191.967 126.452,191.549 126.432 C 191.191 126.414,190.706 126.631,190.471 126.914 M197.414 126.781 C 198.405 127.182,199.049 127.936,199.311 129.000 C 199.489 129.725,199.512 129.715,199.554 128.900 C 199.609 127.835,198.292 126.389,197.300 126.425 C 196.715 126.447,196.733 126.505,197.414 126.781 M195.206 128.476 C 195.203 128.848,195.380 129.264,195.600 129.400 C 195.820 129.536,196.000 129.435,196.000 129.175 C 196.000 128.829,196.166 128.840,196.619 129.216 C 197.063 129.584,197.107 129.810,196.776 130.015 C 196.480 130.198,196.459 130.389,196.715 130.548 C 197.488 131.025,197.538 129.668,196.773 128.976 C 196.348 128.591,195.997 128.439,195.994 128.638 C 195.991 128.837,195.813 128.730,195.600 128.400 C 195.266 127.883,195.211 127.893,195.206 128.476 M197.869 132.825 C 198.127 133.085,198.245 133.591,198.131 133.949 C 197.953 134.512,197.983 134.519,198.356 134.000 C 198.954 133.170,198.908 132.927,198.100 132.619 C 197.563 132.415,197.509 132.463,197.869 132.825 M199.600 134.380 C 199.600 135.086,199.319 135.720,198.900 135.957 C 198.255 136.323,198.251 136.395,198.854 136.877 C 199.214 137.165,199.604 137.670,199.722 138.000 C 199.840 138.330,199.951 137.385,199.968 135.900 C 199.986 134.415,199.910 133.200,199.800 133.200 C 199.690 133.200,199.600 133.731,199.600 134.380 M198.895 162.620 C 198.823 179.632,198.916 185.156,199.280 185.520 C 199.644 185.884,205.257 185.977,222.580 185.905 L 245.400 185.810 222.400 185.605 L 199.400 185.400 199.195 162.800 L 198.990 140.200 198.895 162.620 M252.705 185.483 C 253.202 185.579,253.922 185.575,254.305 185.475 C 254.687 185.375,254.280 185.296,253.400 185.301 C 252.520 185.305,252.207 185.387,252.705 185.483 M249.641 186.150 C 249.274 186.593,249.390 186.700,250.235 186.700 C 250.872 186.700,251.093 186.581,250.797 186.398 C 250.424 186.168,250.437 186.046,250.855 185.880 C 251.257 185.720,251.229 185.655,250.749 185.632 C 250.391 185.614,249.893 185.847,249.641 186.150 M256.875 186.057 C 257.467 186.273,258.127 186.933,258.343 187.525 C 258.597 188.217,258.748 188.351,258.768 187.900 C 258.786 187.515,258.440 186.840,258.000 186.400 C 257.560 185.960,256.885 185.614,256.500 185.632 C 256.049 185.652,256.183 185.803,256.875 186.057 M256.644 187.580 C 256.888 187.921,257.288 188.560,257.532 189.000 C 257.776 189.440,257.981 189.585,257.988 189.322 C 257.995 189.060,257.595 188.421,257.100 187.903 C 256.605 187.385,256.400 187.240,256.644 187.580 M254.619 187.570 C 254.472 187.806,254.476 188.199,254.626 188.443 C 254.824 188.763,254.979 188.758,255.185 188.424 C 255.390 188.093,255.616 188.137,255.984 188.581 C 256.360 189.034,256.371 189.200,256.025 189.200 C 255.765 189.200,255.664 189.380,255.800 189.600 C 255.936 189.820,256.352 189.986,256.724 189.968 C 257.144 189.949,257.210 189.860,256.898 189.734 C 256.621 189.623,256.481 189.393,256.585 189.224 C 256.690 189.055,256.350 188.517,255.830 188.028 C 255.224 187.459,254.789 187.294,254.619 187.570 M258.864 192.276 C 258.801 193.931,258.235 194.879,257.892 193.902 C 257.795 193.626,257.712 193.881,257.708 194.468 C 257.702 195.215,257.866 195.473,258.253 195.324 C 258.962 195.052,259.304 193.681,259.093 191.955 C 258.940 190.695,258.924 190.717,258.864 192.276 M308.629 245.029 C 307.801 245.857,307.821 245.900,309.043 245.900 C 309.751 245.900,309.915 245.795,309.554 245.572 C 308.901 245.168,309.500 244.907,311.600 244.679 C 312.779 244.552,312.705 244.518,311.129 244.464 C 309.890 244.422,309.044 244.613,308.629 245.029 M316.075 245.257 C 316.667 245.473,317.327 246.133,317.543 246.725 C 317.797 247.417,317.948 247.551,317.968 247.100 C 317.986 246.715,317.640 246.040,317.200 245.600 C 316.760 245.160,316.085 244.814,315.700 244.832 C 315.249 244.852,315.383 245.003,316.075 245.257 M315.211 248.385 C 314.709 248.702,314.726 248.797,315.328 249.028 C 315.717 249.177,316.147 249.187,316.284 249.049 C 316.421 248.912,316.313 248.800,316.043 248.800 C 315.773 248.800,315.664 248.620,315.800 248.400 C 316.104 247.907,315.971 247.904,315.211 248.385 M318.093 249.200 C 318.093 249.970,318.175 250.285,318.276 249.900 C 318.376 249.515,318.376 248.885,318.276 248.500 C 318.175 248.115,318.093 248.430,318.093 249.200 M316.908 253.307 C 316.902 254.202,317.006 254.327,317.450 253.959 C 317.753 253.707,317.997 253.209,317.994 252.851 C 317.989 252.331,317.918 252.310,317.642 252.745 C 317.351 253.206,317.267 253.206,317.106 252.745 C 317.002 252.445,316.912 252.698,316.908 253.307 M317.790 288.800 C 317.790 305.630,317.840 312.515,317.900 304.100 C 317.960 295.685,317.960 281.915,317.900 273.500 C 317.840 265.085,317.790 271.970,317.790 288.800 M316.906 323.942 C 316.939 324.383,317.093 324.666,317.249 324.570 C 317.404 324.474,317.623 324.621,317.734 324.898 C 317.864 325.220,317.948 325.167,317.968 324.749 C 317.986 324.391,317.740 323.882,317.423 323.619 C 316.951 323.227,316.856 323.286,316.906 323.942 M316.531 325.651 C 316.645 326.009,316.527 326.515,316.269 326.775 C 315.909 327.137,315.963 327.185,316.500 326.981 C 317.308 326.673,317.354 326.430,316.756 325.600 C 316.383 325.081,316.353 325.088,316.531 325.651 M318.093 328.400 C 318.093 329.170,318.175 329.485,318.276 329.100 C 318.376 328.715,318.376 328.085,318.276 327.700 C 318.175 327.315,318.093 327.630,318.093 328.400 M315.021 328.766 C 314.897 328.967,314.996 329.199,315.241 329.280 C 315.523 329.374,315.450 329.626,315.044 329.964 C 314.604 330.328,314.400 330.352,314.400 330.040 C 314.400 329.748,314.037 329.820,313.400 330.237 C 312.369 330.912,312.078 331.600,312.824 331.600 C 313.057 331.600,313.117 331.389,312.958 331.132 C 312.762 330.815,312.889 330.749,313.355 330.927 C 313.818 331.105,313.948 331.040,313.755 330.727 C 313.567 330.422,313.686 330.347,314.105 330.508 C 314.767 330.762,315.705 329.929,315.847 328.960 C 315.939 328.334,315.371 328.200,315.021 328.766 M317.600 330.538 C 317.600 331.220,316.443 332.258,315.400 332.512 C 314.676 332.689,314.685 332.712,315.500 332.754 C 316.507 332.806,318.000 331.520,318.000 330.600 C 318.000 330.270,317.910 330.000,317.800 330.000 C 317.690 330.000,317.600 330.242,317.600 330.538 M311.411 331.183 C 311.281 331.393,310.865 331.466,310.487 331.345 C 309.904 331.158,309.890 331.190,310.400 331.556 C 311.210 332.139,311.473 332.108,311.745 331.400 C 312.001 330.732,311.778 330.588,311.411 331.183 M307.600 332.200 C 307.600 332.530,307.864 332.800,308.187 332.800 C 308.545 332.800,308.685 332.565,308.545 332.200 C 308.418 331.870,308.154 331.600,307.957 331.600 C 307.761 331.600,307.600 331.870,307.600 332.200 M270.300 332.300 C 276.515 332.362,286.685 332.362,292.900 332.300 C 299.115 332.238,294.030 332.187,281.600 332.187 C 269.170 332.187,264.085 332.238,270.300 332.300 M310.105 333.087 C 310.714 333.179,311.614 333.177,312.105 333.082 C 312.597 332.987,312.100 332.911,311.000 332.914 C 309.900 332.917,309.497 332.995,310.105 333.087 M257.600 382.367 C 257.600 382.568,257.813 382.804,258.073 382.891 C 258.333 382.978,258.669 383.938,258.820 385.024 L 259.093 387.000 259.147 385.274 C 259.201 383.501,258.669 382.000,257.986 382.000 C 257.774 382.000,257.600 382.165,257.600 382.367 M255.231 388.567 C 254.727 389.104,254.409 389.781,254.526 390.071 C 254.698 390.502,254.743 390.503,254.768 390.076 C 254.786 389.788,254.956 389.649,255.147 389.767 C 255.679 390.096,256.803 388.651,256.454 388.087 C 256.230 387.725,255.900 387.855,255.231 388.567 M258.195 390.093 C 257.978 390.584,257.350 391.211,256.800 391.487 C 256.070 391.853,255.989 391.990,256.500 391.994 C 257.355 392.001,258.800 390.623,258.800 389.800 C 258.800 388.977,258.658 389.046,258.195 390.093 M248.800 391.186 C 248.800 391.869,250.301 392.401,252.074 392.347 L 253.800 392.293 251.824 392.020 C 250.738 391.869,249.778 391.533,249.691 391.273 C 249.502 390.706,248.800 390.638,248.800 391.186 M198.990 422.200 C 198.990 438.700,199.039 445.508,199.100 437.330 C 199.160 429.151,199.160 415.651,199.100 407.330 C 199.039 399.008,198.990 405.700,198.990 422.200 M199.600 454.800 C 199.600 455.244,199.333 455.600,199.000 455.600 C 198.237 455.600,198.218 456.245,198.973 456.534 C 199.288 456.655,199.619 457.349,199.709 458.077 C 199.799 458.805,199.901 458.185,199.936 456.700 C 199.971 455.215,199.910 454.000,199.800 454.000 C 199.690 454.000,199.600 454.360,199.600 454.800 M197.378 460.835 C 197.231 461.074,197.321 461.479,197.579 461.735 C 197.936 462.090,197.978 462.018,197.756 461.434 C 197.552 460.900,197.605 460.756,197.932 460.958 C 198.189 461.117,198.400 461.057,198.400 460.824 C 198.400 460.271,197.723 460.278,197.378 460.835 M196.015 462.582 C 195.248 463.506,195.941 464.177,196.830 463.373 C 197.243 462.999,197.485 462.537,197.367 462.347 C 197.052 461.837,196.562 461.923,196.015 462.582 M199.200 463.538 C 199.200 464.299,198.255 465.328,197.200 465.716 C 196.725 465.891,196.746 465.943,197.300 465.968 C 198.231 466.010,199.600 464.601,199.600 463.600 C 199.600 463.160,199.510 462.800,199.400 462.800 C 199.290 462.800,199.200 463.132,199.200 463.538 M193.411 464.383 C 193.281 464.593,192.865 464.666,192.487 464.545 C 191.904 464.358,191.890 464.390,192.400 464.756 C 193.210 465.339,193.473 465.308,193.745 464.600 C 194.001 463.932,193.778 463.788,193.411 464.383 M190.471 465.486 C 190.706 465.769,191.191 465.986,191.549 465.968 C 191.967 465.948,192.020 465.864,191.698 465.734 C 191.421 465.623,191.273 465.406,191.368 465.252 C 191.463 465.097,191.204 464.971,190.793 464.971 C 190.228 464.971,190.149 465.098,190.471 465.486 M125.867 465.867 C 125.720 466.013,125.600 476.683,125.600 489.578 C 125.600 510.433,125.529 513.123,124.959 513.937 C 124.252 514.947,124.432 515.427,125.383 515.062 C 125.930 514.852,126.000 512.047,126.000 490.415 L 126.000 466.005 155.900 465.900 L 185.800 465.795 155.967 465.697 C 139.558 465.644,126.013 465.720,125.867 465.867 M193.505 466.283 C 194.002 466.379,194.722 466.375,195.105 466.275 C 195.487 466.175,195.080 466.096,194.200 466.101 C 193.320 466.105,193.007 466.187,193.505 466.283 M124.187 488.800 C 124.187 501.230,124.238 506.315,124.300 500.100 C 124.362 493.885,124.362 483.715,124.300 477.500 C 124.238 471.285,124.187 476.370,124.187 488.800 M122.015 521.782 C 121.248 522.706,121.941 523.377,122.830 522.573 C 123.243 522.199,123.485 521.737,123.367 521.547 C 123.052 521.037,122.562 521.123,122.015 521.782 M119.700 523.288 C 119.205 523.527,118.800 523.897,118.800 524.110 C 118.800 524.323,119.062 524.280,119.382 524.015 C 119.703 523.749,120.123 523.629,120.316 523.748 C 120.509 523.867,120.667 523.703,120.667 523.382 C 120.667 523.062,120.652 522.812,120.633 522.827 C 120.615 522.842,120.195 523.049,119.700 523.288 M122.600 523.627 C 121.940 524.050,121.605 524.397,121.856 524.398 C 122.106 524.399,122.736 524.046,123.256 523.613 C 124.445 522.623,124.159 522.629,122.600 523.627 M124.599 524.001 C 124.445 524.251,123.932 524.612,123.459 524.803 C 122.899 525.029,122.817 525.158,123.224 525.175 C 124.011 525.207,125.486 524.153,125.139 523.806 C 124.997 523.663,124.754 523.751,124.599 524.001 M116.000 524.411 C 116.000 524.758,117.553 525.381,117.801 525.132 C 117.878 525.055,117.505 524.785,116.971 524.533 C 116.437 524.281,116.000 524.226,116.000 524.411 M66.662 525.100 C 66.493 525.372,83.192 525.368,103.800 525.090 C 108.200 525.031,101.686 524.941,89.324 524.891 C 76.962 524.841,66.764 524.935,66.662 525.100 M120.305 525.483 C 120.802 525.579,121.522 525.575,121.905 525.475 C 122.287 525.375,121.880 525.296,121.000 525.301 C 120.120 525.305,119.807 525.387,120.305 525.483 M65.787 548.200 C 65.787 560.740,65.838 565.812,65.900 559.472 C 65.962 553.131,65.962 542.871,65.900 536.672 C 65.838 530.472,65.787 535.660,65.787 548.200 M66.046 571.820 C 66.021 572.271,65.787 572.853,65.527 573.113 C 65.266 573.374,65.162 573.695,65.294 573.828 C 65.670 574.203,66.472 572.439,66.272 571.679 C 66.131 571.146,66.083 571.176,66.046 571.820 M62.783 581.134 C 62.002 581.766,61.966 581.901,62.526 582.116 C 63.167 582.362,63.706 581.869,63.853 580.900 C 63.953 580.244,63.856 580.265,62.783 581.134 M66.000 581.352 C 66.000 581.970,65.578 582.858,65.018 583.418 C 63.961 584.476,64.013 584.635,65.209 583.995 C 65.955 583.596,66.731 580.997,66.248 580.515 C 66.112 580.378,66.000 580.755,66.000 581.352 M63.400 582.827 C 62.740 583.250,62.405 583.597,62.656 583.598 C 62.906 583.599,63.536 583.246,64.056 582.813 C 65.245 581.823,64.959 581.829,63.400 582.827 M57.669 583.884 C 57.905 584.168,58.391 584.379,58.749 584.354 C 59.244 584.318,59.218 584.261,58.642 584.113 C 58.040 583.959,57.998 583.849,58.437 583.577 C 58.839 583.329,58.751 583.253,58.115 583.301 C 57.449 583.351,57.343 583.490,57.669 583.884 M60.900 584.676 C 61.285 584.776,61.915 584.776,62.300 584.676 C 62.685 584.575,62.370 584.493,61.600 584.493 C 60.830 584.493,60.515 584.575,60.900 584.676 \" stroke=\"none\" fill=\"%23686464\" fill-rule=\"evenodd\"></path><path id=\"path2\" d=\"M65.789 26.000 C 65.789 40.410,65.839 46.305,65.900 39.100 C 65.961 31.895,65.961 20.105,65.900 12.900 C 65.839 5.695,65.789 11.590,65.789 26.000 M120.100 52.276 C 120.485 52.376,121.115 52.376,121.500 52.276 C 121.885 52.175,121.570 52.093,120.800 52.093 C 120.030 52.093,119.715 52.175,120.100 52.276 M124.056 53.166 C 124.575 53.587,125.071 53.861,125.157 53.775 C 125.450 53.485,124.306 52.400,123.707 52.400 C 123.301 52.400,123.412 52.644,124.056 53.166 M121.206 54.438 C 121.197 55.356,122.718 56.642,123.219 56.141 C 123.486 55.874,123.349 55.497,122.809 55.009 C 122.364 54.606,121.997 54.439,121.994 54.638 C 121.991 54.837,121.813 54.730,121.600 54.400 C 121.261 53.875,121.211 53.880,121.206 54.438 M123.939 59.047 C 124.177 59.513,124.246 60.053,124.093 60.247 C 123.939 60.441,124.073 60.374,124.390 60.097 C 124.887 59.663,124.866 59.499,124.236 58.897 C 123.538 58.230,123.525 58.237,123.939 59.047 M124.400 62.722 C 124.400 62.931,124.672 63.328,125.005 63.604 C 125.537 64.045,125.597 67.857,125.505 95.233 C 125.447 112.353,125.536 126.224,125.702 126.058 C 126.438 125.322,125.844 62.619,125.100 62.476 C 124.715 62.402,124.400 62.512,124.400 62.722 M124.190 96.200 C 124.190 112.700,124.239 119.508,124.300 111.330 C 124.360 103.151,124.360 89.651,124.300 81.330 C 124.239 73.008,124.190 79.700,124.190 96.200 M194.500 126.276 C 194.885 126.376,195.515 126.376,195.900 126.276 C 196.285 126.175,195.970 126.093,195.200 126.093 C 194.430 126.093,194.115 126.175,194.500 126.276 M140.930 126.700 C 149.251 126.760,162.751 126.760,170.930 126.700 C 179.108 126.639,172.300 126.590,155.800 126.590 C 139.300 126.590,132.608 126.639,140.930 126.700 M190.471 126.914 C 190.149 127.302,190.228 127.429,190.793 127.429 C 191.204 127.429,191.463 127.303,191.368 127.148 C 191.273 126.994,191.421 126.777,191.698 126.666 C 192.020 126.536,191.967 126.452,191.549 126.432 C 191.191 126.414,190.706 126.631,190.471 126.914 M197.414 126.781 C 198.405 127.182,199.049 127.936,199.311 129.000 C 199.489 129.725,199.512 129.715,199.554 128.900 C 199.609 127.835,198.292 126.389,197.300 126.425 C 196.715 126.447,196.733 126.505,197.414 126.781 M195.206 128.476 C 195.203 128.848,195.380 129.264,195.600 129.400 C 195.820 129.536,196.000 129.435,196.000 129.175 C 196.000 128.829,196.166 128.840,196.619 129.216 C 197.063 129.584,197.107 129.810,196.776 130.015 C 196.480 130.198,196.459 130.389,196.715 130.548 C 197.488 131.025,197.538 129.668,196.773 128.976 C 196.348 128.591,195.997 128.439,195.994 128.638 C 195.991 128.837,195.813 128.730,195.600 128.400 C 195.266 127.883,195.211 127.893,195.206 128.476 M197.869 132.825 C 198.127 133.085,198.245 133.591,198.131 133.949 C 197.953 134.512,197.983 134.519,198.356 134.000 C 198.954 133.170,198.908 132.927,198.100 132.619 C 197.563 132.415,197.509 132.463,197.869 132.825 M199.600 134.380 C 199.600 135.086,199.319 135.720,198.900 135.957 C 198.255 136.323,198.251 136.395,198.854 136.877 C 199.214 137.165,199.604 137.670,199.722 138.000 C 199.840 138.330,199.951 137.385,199.968 135.900 C 199.986 134.415,199.910 133.200,199.800 133.200 C 199.690 133.200,199.600 133.731,199.600 134.380 M198.895 162.620 C 198.823 179.632,198.916 185.156,199.280 185.520 C 199.644 185.884,205.257 185.977,222.580 185.905 L 245.400 185.810 222.400 185.605 L 199.400 185.400 199.195 162.800 L 198.990 140.200 198.895 162.620 M252.705 185.483 C 253.202 185.579,253.922 185.575,254.305 185.475 C 254.687 185.375,254.280 185.296,253.400 185.301 C 252.520 185.305,252.207 185.387,252.705 185.483 M249.641 186.150 C 249.274 186.593,249.390 186.700,250.235 186.700 C 250.872 186.700,251.093 186.581,250.797 186.398 C 250.424 186.168,250.437 186.046,250.855 185.880 C 251.257 185.720,251.229 185.655,250.749 185.632 C 250.391 185.614,249.893 185.847,249.641 186.150 M256.875 186.057 C 257.467 186.273,258.127 186.933,258.343 187.525 C 258.597 188.217,258.748 188.351,258.768 187.900 C 258.786 187.515,258.440 186.840,258.000 186.400 C 257.560 185.960,256.885 185.614,256.500 185.632 C 256.049 185.652,256.183 185.803,256.875 186.057 M256.644 187.580 C 256.888 187.921,257.288 188.560,257.532 189.000 C 257.776 189.440,257.981 189.585,257.988 189.322 C 257.995 189.060,257.595 188.421,257.100 187.903 C 256.605 187.385,256.400 187.240,256.644 187.580 M254.619 187.570 C 254.472 187.806,254.476 188.199,254.626 188.443 C 254.824 188.763,254.979 188.758,255.185 188.424 C 255.390 188.093,255.616 188.137,255.984 188.581 C 256.360 189.034,256.371 189.200,256.025 189.200 C 255.765 189.200,255.664 189.380,255.800 189.600 C 255.936 189.820,256.352 189.986,256.724 189.968 C 257.144 189.949,257.210 189.860,256.898 189.734 C 256.621 189.623,256.481 189.393,256.585 189.224 C 256.690 189.055,256.350 188.517,255.830 188.028 C 255.224 187.459,254.789 187.294,254.619 187.570 M258.864 192.276 C 258.801 193.931,258.235 194.879,257.892 193.902 C 257.795 193.626,257.712 193.881,257.708 194.468 C 257.702 195.215,257.866 195.473,258.253 195.324 C 258.962 195.052,259.304 193.681,259.093 191.955 C 258.940 190.695,258.924 190.717,258.864 192.276 M308.629 245.029 C 307.801 245.857,307.821 245.900,309.043 245.900 C 309.751 245.900,309.915 245.795,309.554 245.572 C 308.901 245.168,309.500 244.907,311.600 244.679 C 312.779 244.552,312.705 244.518,311.129 244.464 C 309.890 244.422,309.044 244.613,308.629 245.029 M316.075 245.257 C 316.667 245.473,317.327 246.133,317.543 246.725 C 317.797 247.417,317.948 247.551,317.968 247.100 C 317.986 246.715,317.640 246.040,317.200 245.600 C 316.760 245.160,316.085 244.814,315.700 244.832 C 315.249 244.852,315.383 245.003,316.075 245.257 M315.211 248.385 C 314.709 248.702,314.726 248.797,315.328 249.028 C 315.717 249.177,316.147 249.187,316.284 249.049 C 316.421 248.912,316.313 248.800,316.043 248.800 C 315.773 248.800,315.664 248.620,315.800 248.400 C 316.104 247.907,315.971 247.904,315.211 248.385 M318.093 249.200 C 318.093 249.970,318.175 250.285,318.276 249.900 C 318.376 249.515,318.376 248.885,318.276 248.500 C 318.175 248.115,318.093 248.430,318.093 249.200 M316.908 253.307 C 316.902 254.202,317.006 254.327,317.450 253.959 C 317.753 253.707,317.997 253.209,317.994 252.851 C 317.989 252.331,317.918 252.310,317.642 252.745 C 317.351 253.206,317.267 253.206,317.106 252.745 C 317.002 252.445,316.912 252.698,316.908 253.307 M317.790 288.800 C 317.790 305.630,317.840 312.515,317.900 304.100 C 317.960 295.685,317.960 281.915,317.900 273.500 C 317.840 265.085,317.790 271.970,317.790 288.800 M316.906 323.942 C 316.939 324.383,317.093 324.666,317.249 324.570 C 317.404 324.474,317.623 324.621,317.734 324.898 C 317.864 325.220,317.948 325.167,317.968 324.749 C 317.986 324.391,317.740 323.882,317.423 323.619 C 316.951 323.227,316.856 323.286,316.906 323.942 M316.531 325.651 C 316.645 326.009,316.527 326.515,316.269 326.775 C 315.909 327.137,315.963 327.185,316.500 326.981 C 317.308 326.673,317.354 326.430,316.756 325.600 C 316.383 325.081,316.353 325.088,316.531 325.651 M318.093 328.400 C 318.093 329.170,318.175 329.485,318.276 329.100 C 318.376 328.715,318.376 328.085,318.276 327.700 C 318.175 327.315,318.093 327.630,318.093 328.400 M315.021 328.766 C 314.897 328.967,314.996 329.199,315.241 329.280 C 315.523 329.374,315.450 329.626,315.044 329.964 C 314.604 330.328,314.400 330.352,314.400 330.040 C 314.400 329.748,314.037 329.820,313.400 330.237 C 312.369 330.912,312.078 331.600,312.824 331.600 C 313.057 331.600,313.117 331.389,312.958 331.132 C 312.762 330.815,312.889 330.749,313.355 330.927 C 313.818 331.105,313.948 331.040,313.755 330.727 C 313.567 330.422,313.686 330.347,314.105 330.508 C 314.767 330.762,315.705 329.929,315.847 328.960 C 315.939 328.334,315.371 328.200,315.021 328.766 M317.600 330.538 C 317.600 331.220,316.443 332.258,315.400 332.512 C 314.676 332.689,314.685 332.712,315.500 332.754 C 316.507 332.806,318.000 331.520,318.000 330.600 C 318.000 330.270,317.910 330.000,317.800 330.000 C 317.690 330.000,317.600 330.242,317.600 330.538 M311.411 331.183 C 311.281 331.393,310.865 331.466,310.487 331.345 C 309.904 331.158,309.890 331.190,310.400 331.556 C 311.210 332.139,311.473 332.108,311.745 331.400 C 312.001 330.732,311.778 330.588,311.411 331.183 M307.600 332.200 C 307.600 332.530,307.864 332.800,308.187 332.800 C 308.545 332.800,308.685 332.565,308.545 332.200 C 308.418 331.870,308.154 331.600,307.957 331.600 C 307.761 331.600,307.600 331.870,307.600 332.200 M270.300 332.300 C 276.515 332.362,286.685 332.362,292.900 332.300 C 299.115 332.238,294.030 332.187,281.600 332.187 C 269.170 332.187,264.085 332.238,270.300 332.300 M310.105 333.087 C 310.714 333.179,311.614 333.177,312.105 333.082 C 312.597 332.987,312.100 332.911,311.000 332.914 C 309.900 332.917,309.497 332.995,310.105 333.087 M257.600 382.367 C 257.600 382.568,257.813 382.804,258.073 382.891 C 258.333 382.978,258.669 383.938,258.820 385.024 L 259.093 387.000 259.147 385.274 C 259.201 383.501,258.669 382.000,257.986 382.000 C 257.774 382.000,257.600 382.165,257.600 382.367 M255.231 388.567 C 254.727 389.104,254.409 389.781,254.526 390.071 C 254.698 390.502,254.743 390.503,254.768 390.076 C 254.786 389.788,254.956 389.649,255.147 389.767 C 255.679 390.096,256.803 388.651,256.454 388.087 C 256.230 387.725,255.900 387.855,255.231 388.567 M258.195 390.093 C 257.978 390.584,257.350 391.211,256.800 391.487 C 256.070 391.853,255.989 391.990,256.500 391.994 C 257.355 392.001,258.800 390.623,258.800 389.800 C 258.800 388.977,258.658 389.046,258.195 390.093 M248.800 391.186 C 248.800 391.869,250.301 392.401,252.074 392.347 L 253.800 392.293 251.824 392.020 C 250.738 391.869,249.778 391.533,249.691 391.273 C 249.502 390.706,248.800 390.638,248.800 391.186 M198.990 422.200 C 198.990 438.700,199.039 445.508,199.100 437.330 C 199.160 429.151,199.160 415.651,199.100 407.330 C 199.039 399.008,198.990 405.700,198.990 422.200 M199.600 454.800 C 199.600 455.244,199.333 455.600,199.000 455.600 C 198.237 455.600,198.218 456.245,198.973 456.534 C 199.288 456.655,199.619 457.349,199.709 458.077 C 199.799 458.805,199.901 458.185,199.936 456.700 C 199.971 455.215,199.910 454.000,199.800 454.000 C 199.690 454.000,199.600 454.360,199.600 454.800 M197.378 460.835 C 197.231 461.074,197.321 461.479,197.579 461.735 C 197.936 462.090,197.978 462.018,197.756 461.434 C 197.552 460.900,197.605 460.756,197.932 460.958 C 198.189 461.117,198.400 461.057,198.400 460.824 C 198.400 460.271,197.723 460.278,197.378 460.835 M196.015 462.582 C 195.248 463.506,195.941 464.177,196.830 463.373 C 197.243 462.999,197.485 462.537,197.367 462.347 C 197.052 461.837,196.562 461.923,196.015 462.582 M199.200 463.538 C 199.200 464.299,198.255 465.328,197.200 465.716 C 196.725 465.891,196.746 465.943,197.300 465.968 C 198.231 466.010,199.600 464.601,199.600 463.600 C 199.600 463.160,199.510 462.800,199.400 462.800 C 199.290 462.800,199.200 463.132,199.200 463.538 M193.411 464.383 C 193.281 464.593,192.865 464.666,192.487 464.545 C 191.904 464.358,191.890 464.390,192.400 464.756 C 193.210 465.339,193.473 465.308,193.745 464.600 C 194.001 463.932,193.778 463.788,193.411 464.383 M190.471 465.486 C 190.706 465.769,191.191 465.986,191.549 465.968 C 191.967 465.948,192.020 465.864,191.698 465.734 C 191.421 465.623,191.273 465.406,191.368 465.252 C 191.463 465.097,191.204 464.971,190.793 464.971 C 190.228 464.971,190.149 465.098,190.471 465.486 M125.867 465.867 C 125.720 466.013,125.600 476.683,125.600 489.578 C 125.600 510.433,125.529 513.123,124.959 513.937 C 124.252 514.947,124.432 515.427,125.383 515.062 C 125.930 514.852,126.000 512.047,126.000 490.415 L 126.000 466.005 155.900 465.900 L 185.800 465.795 155.967 465.697 C 139.558 465.644,126.013 465.720,125.867 465.867 M193.505 466.283 C 194.002 466.379,194.722 466.375,195.105 466.275 C 195.487 466.175,195.080 466.096,194.200 466.101 C 193.320 466.105,193.007 466.187,193.505 466.283 M124.187 488.800 C 124.187 501.230,124.238 506.315,124.300 500.100 C 124.362 493.885,124.362 483.715,124.300 477.500 C 124.238 471.285,124.187 476.370,124.187 488.800 M122.015 521.782 C 121.248 522.706,121.941 523.377,122.830 522.573 C 123.243 522.199,123.485 521.737,123.367 521.547 C 123.052 521.037,122.562 521.123,122.015 521.782 M119.700 523.288 C 119.205 523.527,118.800 523.897,118.800 524.110 C 118.800 524.323,119.062 524.280,119.382 524.015 C 119.703 523.749,120.123 523.629,120.316 523.748 C 120.509 523.867,120.667 523.703,120.667 523.382 C 120.667 523.062,120.652 522.812,120.633 522.827 C 120.615 522.842,120.195 523.049,119.700 523.288 M122.600 523.627 C 121.940 524.050,121.605 524.397,121.856 524.398 C 122.106 524.399,122.736 524.046,123.256 523.613 C 124.445 522.623,124.159 522.629,122.600 523.627 M124.599 524.001 C 124.445 524.251,123.932 524.612,123.459 524.803 C 122.899 525.029,122.817 525.158,123.224 525.175 C 124.011 525.207,125.486 524.153,125.139 523.806 C 124.997 523.663,124.754 523.751,124.599 524.001 M116.000 524.411 C 116.000 524.758,117.553 525.381,117.801 525.132 C 117.878 525.055,117.505 524.785,116.971 524.533 C 116.437 524.281,116.000 524.226,116.000 524.411 M66.662 525.100 C 66.493 525.372,83.192 525.368,103.800 525.090 C 108.200 525.031,101.686 524.941,89.324 524.891 C 76.962 524.841,66.764 524.935,66.662 525.100 M120.305 525.483 C 120.802 525.579,121.522 525.575,121.905 525.475 C 122.287 525.375,121.880 525.296,121.000 525.301 C 120.120 525.305,119.807 525.387,120.305 525.483 M65.787 548.200 C 65.787 560.740,65.838 565.812,65.900 559.472 C 65.962 553.131,65.962 542.871,65.900 536.672 C 65.838 530.472,65.787 535.660,65.787 548.200 M66.046 571.820 C 66.021 572.271,65.787 572.853,65.527 573.113 C 65.266 573.374,65.162 573.695,65.294 573.828 C 65.670 574.203,66.472 572.439,66.272 571.679 C 66.131 571.146,66.083 571.176,66.046 571.820 M62.783 581.134 C 62.002 581.766,61.966 581.901,62.526 582.116 C 63.167 582.362,63.706 581.869,63.853 580.900 C 63.953 580.244,63.856 580.265,62.783 581.134 M66.000 581.352 C 66.000 581.970,65.578 582.858,65.018 583.418 C 63.961 584.476,64.013 584.635,65.209 583.995 C 65.955 583.596,66.731 580.997,66.248 580.515 C 66.112 580.378,66.000 580.755,66.000 581.352 M63.400 582.827 C 62.740 583.250,62.405 583.597,62.656 583.598 C 62.906 583.599,63.536 583.246,64.056 582.813 C 65.245 581.823,64.959 581.829,63.400 582.827 M57.669 583.884 C 57.905 584.168,58.391 584.379,58.749 584.354 C 59.244 584.318,59.218 584.261,58.642 584.113 C 58.040 583.959,57.998 583.849,58.437 583.577 C 58.839 583.329,58.751 583.253,58.115 583.301 C 57.449 583.351,57.343 583.490,57.669 583.884 M60.900 584.676 C 61.285 584.776,61.915 584.776,62.300 584.676 C 62.685 584.575,62.370 584.493,61.600 584.493 C 60.830 584.493,60.515 584.575,60.900 584.676 \" stroke=\"none\" fill=\"%23686464\" fill-rule=\"evenodd\"></path><path id=\"path3\" d=\"M65.789 26.000 C 65.789 40.410,65.839 46.305,65.900 39.100 C 65.961 31.895,65.961 20.105,65.900 12.900 C 65.839 5.695,65.789 11.590,65.789 26.000 M120.100 52.276 C 120.485 52.376,121.115 52.376,121.500 52.276 C 121.885 52.175,121.570 52.093,120.800 52.093 C 120.030 52.093,119.715 52.175,120.100 52.276 M124.056 53.166 C 124.575 53.587,125.071 53.861,125.157 53.775 C 125.450 53.485,124.306 52.400,123.707 52.400 C 123.301 52.400,123.412 52.644,124.056 53.166 M121.206 54.438 C 121.197 55.356,122.718 56.642,123.219 56.141 C 123.486 55.874,123.349 55.497,122.809 55.009 C 122.364 54.606,121.997 54.439,121.994 54.638 C 121.991 54.837,121.813 54.730,121.600 54.400 C 121.261 53.875,121.211 53.880,121.206 54.438 M123.939 59.047 C 124.177 59.513,124.246 60.053,124.093 60.247 C 123.939 60.441,124.073 60.374,124.390 60.097 C 124.887 59.663,124.866 59.499,124.236 58.897 C 123.538 58.230,123.525 58.237,123.939 59.047 M124.400 62.722 C 124.400 62.931,124.672 63.328,125.005 63.604 C 125.537 64.045,125.597 67.857,125.505 95.233 C 125.447 112.353,125.536 126.224,125.702 126.058 C 126.438 125.322,125.844 62.619,125.100 62.476 C 124.715 62.402,124.400 62.512,124.400 62.722 M124.190 96.200 C 124.190 112.700,124.239 119.508,124.300 111.330 C 124.360 103.151,124.360 89.651,124.300 81.330 C 124.239 73.008,124.190 79.700,124.190 96.200 M194.500 126.276 C 194.885 126.376,195.515 126.376,195.900 126.276 C 196.285 126.175,195.970 126.093,195.200 126.093 C 194.430 126.093,194.115 126.175,194.500 126.276 M140.930 126.700 C 149.251 126.760,162.751 126.760,170.930 126.700 C 179.108 126.639,172.300 126.590,155.800 126.590 C 139.300 126.590,132.608 126.639,140.930 126.700 M190.471 126.914 C 190.149 127.302,190.228 127.429,190.793 127.429 C 191.204 127.429,191.463 127.303,191.368 127.148 C 191.273 126.994,191.421 126.777,191.698 126.666 C 192.020 126.536,191.967 126.452,191.549 126.432 C 191.191 126.414,190.706 126.631,190.471 126.914 M197.414 126.781 C 198.405 127.182,199.049 127.936,199.311 129.000 C 199.489 129.725,199.512 129.715,199.554 128.900 C 199.609 127.835,198.292 126.389,197.300 126.425 C 196.715 126.447,196.733 126.505,197.414 126.781 M195.206 128.476 C 195.203 128.848,195.380 129.264,195.600 129.400 C 195.820 129.536,196.000 129.435,196.000 129.175 C 196.000 128.829,196.166 128.840,196.619 129.216 C 197.063 129.584,197.107 129.810,196.776 130.015 C 196.480 130.198,196.459 130.389,196.715 130.548 C 197.488 131.025,197.538 129.668,196.773 128.976 C 196.348 128.591,195.997 128.439,195.994 128.638 C 195.991 128.837,195.813 128.730,195.600 128.400 C 195.266 127.883,195.211 127.893,195.206 128.476 M197.869 132.825 C 198.127 133.085,198.245 133.591,198.131 133.949 C 197.953 134.512,197.983 134.519,198.356 134.000 C 198.954 133.170,198.908 132.927,198.100 132.619 C 197.563 132.415,197.509 132.463,197.869 132.825 M199.600 134.380 C 199.600 135.086,199.319 135.720,198.900 135.957 C 198.255 136.323,198.251 136.395,198.854 136.877 C 199.214 137.165,199.604 137.670,199.722 138.000 C 199.840 138.330,199.951 137.385,199.968 135.900 C 199.986 134.415,199.910 133.200,199.800 133.200 C 199.690 133.200,199.600 133.731,199.600 134.380 M198.895 162.620 C 198.823 179.632,198.916 185.156,199.280 185.520 C 199.644 185.884,205.257 185.977,222.580 185.905 L 245.400 185.810 222.400 185.605 L 199.400 185.400 199.195 162.800 L 198.990 140.200 198.895 162.620 M252.705 185.483 C 253.202 185.579,253.922 185.575,254.305 185.475 C 254.687 185.375,254.280 185.296,253.400 185.301 C 252.520 185.305,252.207 185.387,252.705 185.483 M249.641 186.150 C 249.274 186.593,249.390 186.700,250.235 186.700 C 250.872 186.700,251.093 186.581,250.797 186.398 C 250.424 186.168,250.437 186.046,250.855 185.880 C 251.257 185.720,251.229 185.655,250.749 185.632 C 250.391 185.614,249.893 185.847,249.641 186.150 M256.875 186.057 C 257.467 186.273,258.127 186.933,258.343 187.525 C 258.597 188.217,258.748 188.351,258.768 187.900 C 258.786 187.515,258.440 186.840,258.000 186.400 C 257.560 185.960,256.885 185.614,256.500 185.632 C 256.049 185.652,256.183 185.803,256.875 186.057 M256.644 187.580 C 256.888 187.921,257.288 188.560,257.532 189.000 C 257.776 189.440,257.981 189.585,257.988 189.322 C 257.995 189.060,257.595 188.421,257.100 187.903 C 256.605 187.385,256.400 187.240,256.644 187.580 M254.619 187.570 C 254.472 187.806,254.476 188.199,254.626 188.443 C 254.824 188.763,254.979 188.758,255.185 188.424 C 255.390 188.093,255.616 188.137,255.984 188.581 C 256.360 189.034,256.371 189.200,256.025 189.200 C 255.765 189.200,255.664 189.380,255.800 189.600 C 255.936 189.820,256.352 189.986,256.724 189.968 C 257.144 189.949,257.210 189.860,256.898 189.734 C 256.621 189.623,256.481 189.393,256.585 189.224 C 256.690 189.055,256.350 188.517,255.830 188.028 C 255.224 187.459,254.789 187.294,254.619 187.570 M258.864 192.276 C 258.801 193.931,258.235 194.879,257.892 193.902 C 257.795 193.626,257.712 193.881,257.708 194.468 C 257.702 195.215,257.866 195.473,258.253 195.324 C 258.962 195.052,259.304 193.681,259.093 191.955 C 258.940 190.695,258.924 190.717,258.864 192.276 M308.629 245.029 C 307.801 245.857,307.821 245.900,309.043 245.900 C 309.751 245.900,309.915 245.795,309.554 245.572 C 308.901 245.168,309.500 244.907,311.600 244.679 C 312.779 244.552,312.705 244.518,311.129 244.464 C 309.890 244.422,309.044 244.613,308.629 245.029 M316.075 245.257 C 316.667 245.473,317.327 246.133,317.543 246.725 C 317.797 247.417,317.948 247.551,317.968 247.100 C 317.986 246.715,317.640 246.040,317.200 245.600 C 316.760 245.160,316.085 244.814,315.700 244.832 C 315.249 244.852,315.383 245.003,316.075 245.257 M315.211 248.385 C 314.709 248.702,314.726 248.797,315.328 249.028 C 315.717 249.177,316.147 249.187,316.284 249.049 C 316.421 248.912,316.313 248.800,316.043 248.800 C 315.773 248.800,315.664 248.620,315.800 248.400 C 316.104 247.907,315.971 247.904,315.211 248.385 M318.093 249.200 C 318.093 249.970,318.175 250.285,318.276 249.900 C 318.376 249.515,318.376 248.885,318.276 248.500 C 318.175 248.115,318.093 248.430,318.093 249.200 M316.908 253.307 C 316.902 254.202,317.006 254.327,317.450 253.959 C 317.753 253.707,317.997 253.209,317.994 252.851 C 317.989 252.331,317.918 252.310,317.642 252.745 C 317.351 253.206,317.267 253.206,317.106 252.745 C 317.002 252.445,316.912 252.698,316.908 253.307 M317.790 288.800 C 317.790 305.630,317.840 312.515,317.900 304.100 C 317.960 295.685,317.960 281.915,317.900 273.500 C 317.840 265.085,317.790 271.970,317.790 288.800 M316.906 323.942 C 316.939 324.383,317.093 324.666,317.249 324.570 C 317.404 324.474,317.623 324.621,317.734 324.898 C 317.864 325.220,317.948 325.167,317.968 324.749 C 317.986 324.391,317.740 323.882,317.423 323.619 C 316.951 323.227,316.856 323.286,316.906 323.942 M316.531 325.651 C 316.645 326.009,316.527 326.515,316.269 326.775 C 315.909 327.137,315.963 327.185,316.500 326.981 C 317.308 326.673,317.354 326.430,316.756 325.600 C 316.383 325.081,316.353 325.088,316.531 325.651 M318.093 328.400 C 318.093 329.170,318.175 329.485,318.276 329.100 C 318.376 328.715,318.376 328.085,318.276 327.700 C 318.175 327.315,318.093 327.630,318.093 328.400 M315.021 328.766 C 314.897 328.967,314.996 329.199,315.241 329.280 C 315.523 329.374,315.450 329.626,315.044 329.964 C 314.604 330.328,314.400 330.352,314.400 330.040 C 314.400 329.748,314.037 329.820,313.400 330.237 C 312.369 330.912,312.078 331.600,312.824 331.600 C 313.057 331.600,313.117 331.389,312.958 331.132 C 312.762 330.815,312.889 330.749,313.355 330.927 C 313.818 331.105,313.948 331.040,313.755 330.727 C 313.567 330.422,313.686 330.347,314.105 330.508 C 314.767 330.762,315.705 329.929,315.847 328.960 C 315.939 328.334,315.371 328.200,315.021 328.766 M317.600 330.538 C 317.600 331.220,316.443 332.258,315.400 332.512 C 314.676 332.689,314.685 332.712,315.500 332.754 C 316.507 332.806,318.000 331.520,318.000 330.600 C 318.000 330.270,317.910 330.000,317.800 330.000 C 317.690 330.000,317.600 330.242,317.600 330.538 M311.411 331.183 C 311.281 331.393,310.865 331.466,310.487 331.345 C 309.904 331.158,309.890 331.190,310.400 331.556 C 311.210 332.139,311.473 332.108,311.745 331.400 C 312.001 330.732,311.778 330.588,311.411 331.183 M307.600 332.200 C 307.600 332.530,307.864 332.800,308.187 332.800 C 308.545 332.800,308.685 332.565,308.545 332.200 C 308.418 331.870,308.154 331.600,307.957 331.600 C 307.761 331.600,307.600 331.870,307.600 332.200 M270.300 332.300 C 276.515 332.362,286.685 332.362,292.900 332.300 C 299.115 332.238,294.030 332.187,281.600 332.187 C 269.170 332.187,264.085 332.238,270.300 332.300 M310.105 333.087 C 310.714 333.179,311.614 333.177,312.105 333.082 C 312.597 332.987,312.100 332.911,311.000 332.914 C 309.900 332.917,309.497 332.995,310.105 333.087 M257.600 382.367 C 257.600 382.568,257.813 382.804,258.073 382.891 C 258.333 382.978,258.669 383.938,258.820 385.024 L 259.093 387.000 259.147 385.274 C 259.201 383.501,258.669 382.000,257.986 382.000 C 257.774 382.000,257.600 382.165,257.600 382.367 M255.231 388.567 C 254.727 389.104,254.409 389.781,254.526 390.071 C 254.698 390.502,254.743 390.503,254.768 390.076 C 254.786 389.788,254.956 389.649,255.147 389.767 C 255.679 390.096,256.803 388.651,256.454 388.087 C 256.230 387.725,255.900 387.855,255.231 388.567 M258.195 390.093 C 257.978 390.584,257.350 391.211,256.800 391.487 C 256.070 391.853,255.989 391.990,256.500 391.994 C 257.355 392.001,258.800 390.623,258.800 389.800 C 258.800 388.977,258.658 389.046,258.195 390.093 M248.800 391.186 C 248.800 391.869,250.301 392.401,252.074 392.347 L 253.800 392.293 251.824 392.020 C 250.738 391.869,249.778 391.533,249.691 391.273 C 249.502 390.706,248.800 390.638,248.800 391.186 M198.990 422.200 C 198.990 438.700,199.039 445.508,199.100 437.330 C 199.160 429.151,199.160 415.651,199.100 407.330 C 199.039 399.008,198.990 405.700,198.990 422.200 M199.600 454.800 C 199.600 455.244,199.333 455.600,199.000 455.600 C 198.237 455.600,198.218 456.245,198.973 456.534 C 199.288 456.655,199.619 457.349,199.709 458.077 C 199.799 458.805,199.901 458.185,199.936 456.700 C 199.971 455.215,199.910 454.000,199.800 454.000 C 199.690 454.000,199.600 454.360,199.600 454.800 M197.378 460.835 C 197.231 461.074,197.321 461.479,197.579 461.735 C 197.936 462.090,197.978 462.018,197.756 461.434 C 197.552 460.900,197.605 460.756,197.932 460.958 C 198.189 461.117,198.400 461.057,198.400 460.824 C 198.400 460.271,197.723 460.278,197.378 460.835 M196.015 462.582 C 195.248 463.506,195.941 464.177,196.830 463.373 C 197.243 462.999,197.485 462.537,197.367 462.347 C 197.052 461.837,196.562 461.923,196.015 462.582 M199.200 463.538 C 199.200 464.299,198.255 465.328,197.200 465.716 C 196.725 465.891,196.746 465.943,197.300 465.968 C 198.231 466.010,199.600 464.601,199.600 463.600 C 199.600 463.160,199.510 462.800,199.400 462.800 C 199.290 462.800,199.200 463.132,199.200 463.538 M193.411 464.383 C 193.281 464.593,192.865 464.666,192.487 464.545 C 191.904 464.358,191.890 464.390,192.400 464.756 C 193.210 465.339,193.473 465.308,193.745 464.600 C 194.001 463.932,193.778 463.788,193.411 464.383 M190.471 465.486 C 190.706 465.769,191.191 465.986,191.549 465.968 C 191.967 465.948,192.020 465.864,191.698 465.734 C 191.421 465.623,191.273 465.406,191.368 465.252 C 191.463 465.097,191.204 464.971,190.793 464.971 C 190.228 464.971,190.149 465.098,190.471 465.486 M125.867 465.867 C 125.720 466.013,125.600 476.683,125.600 489.578 C 125.600 510.433,125.529 513.123,124.959 513.937 C 124.252 514.947,124.432 515.427,125.383 515.062 C 125.930 514.852,126.000 512.047,126.000 490.415 L 126.000 466.005 155.900 465.900 L 185.800 465.795 155.967 465.697 C 139.558 465.644,126.013 465.720,125.867 465.867 M193.505 466.283 C 194.002 466.379,194.722 466.375,195.105 466.275 C 195.487 466.175,195.080 466.096,194.200 466.101 C 193.320 466.105,193.007 466.187,193.505 466.283 M124.187 488.800 C 124.187 501.230,124.238 506.315,124.300 500.100 C 124.362 493.885,124.362 483.715,124.300 477.500 C 124.238 471.285,124.187 476.370,124.187 488.800 M122.015 521.782 C 121.248 522.706,121.941 523.377,122.830 522.573 C 123.243 522.199,123.485 521.737,123.367 521.547 C 123.052 521.037,122.562 521.123,122.015 521.782 M119.700 523.288 C 119.205 523.527,118.800 523.897,118.800 524.110 C 118.800 524.323,119.062 524.280,119.382 524.015 C 119.703 523.749,120.123 523.629,120.316 523.748 C 120.509 523.867,120.667 523.703,120.667 523.382 C 120.667 523.062,120.652 522.812,120.633 522.827 C 120.615 522.842,120.195 523.049,119.700 523.288 M122.600 523.627 C 121.940 524.050,121.605 524.397,121.856 524.398 C 122.106 524.399,122.736 524.046,123.256 523.613 C 124.445 522.623,124.159 522.629,122.600 523.627 M124.599 524.001 C 124.445 524.251,123.932 524.612,123.459 524.803 C 122.899 525.029,122.817 525.158,123.224 525.175 C 124.011 525.207,125.486 524.153,125.139 523.806 C 124.997 523.663,124.754 523.751,124.599 524.001 M116.000 524.411 C 116.000 524.758,117.553 525.381,117.801 525.132 C 117.878 525.055,117.505 524.785,116.971 524.533 C 116.437 524.281,116.000 524.226,116.000 524.411 M66.662 525.100 C 66.493 525.372,83.192 525.368,103.800 525.090 C 108.200 525.031,101.686 524.941,89.324 524.891 C 76.962 524.841,66.764 524.935,66.662 525.100 M120.305 525.483 C 120.802 525.579,121.522 525.575,121.905 525.475 C 122.287 525.375,121.880 525.296,121.000 525.301 C 120.120 525.305,119.807 525.387,120.305 525.483 M65.787 548.200 C 65.787 560.740,65.838 565.812,65.900 559.472 C 65.962 553.131,65.962 542.871,65.900 536.672 C 65.838 530.472,65.787 535.660,65.787 548.200 M66.046 571.820 C 66.021 572.271,65.787 572.853,65.527 573.113 C 65.266 573.374,65.162 573.695,65.294 573.828 C 65.670 574.203,66.472 572.439,66.272 571.679 C 66.131 571.146,66.083 571.176,66.046 571.820 M62.783 581.134 C 62.002 581.766,61.966 581.901,62.526 582.116 C 63.167 582.362,63.706 581.869,63.853 580.900 C 63.953 580.244,63.856 580.265,62.783 581.134 M66.000 581.352 C 66.000 581.970,65.578 582.858,65.018 583.418 C 63.961 584.476,64.013 584.635,65.209 583.995 C 65.955 583.596,66.731 580.997,66.248 580.515 C 66.112 580.378,66.000 580.755,66.000 581.352 M63.400 582.827 C 62.740 583.250,62.405 583.597,62.656 583.598 C 62.906 583.599,63.536 583.246,64.056 582.813 C 65.245 581.823,64.959 581.829,63.400 582.827 M57.669 583.884 C 57.905 584.168,58.391 584.379,58.749 584.354 C 59.244 584.318,59.218 584.261,58.642 584.113 C 58.040 583.959,57.998 583.849,58.437 583.577 C 58.839 583.329,58.751 583.253,58.115 583.301 C 57.449 583.351,57.343 583.490,57.669 583.884 M60.900 584.676 C 61.285 584.776,61.915 584.776,62.300 584.676 C 62.685 584.575,62.370 584.493,61.600 584.493 C 60.830 584.493,60.515 584.575,60.900 584.676 \" stroke=\"none\" fill=\"%23686464\" fill-rule=\"evenodd\"></path><path id=\"path4\" d=\"M65.789 26.000 C 65.789 40.410,65.839 46.305,65.900 39.100 C 65.961 31.895,65.961 20.105,65.900 12.900 C 65.839 5.695,65.789 11.590,65.789 26.000 M120.100 52.276 C 120.485 52.376,121.115 52.376,121.500 52.276 C 121.885 52.175,121.570 52.093,120.800 52.093 C 120.030 52.093,119.715 52.175,120.100 52.276 M124.056 53.166 C 124.575 53.587,125.071 53.861,125.157 53.775 C 125.450 53.485,124.306 52.400,123.707 52.400 C 123.301 52.400,123.412 52.644,124.056 53.166 M121.206 54.438 C 121.197 55.356,122.718 56.642,123.219 56.141 C 123.486 55.874,123.349 55.497,122.809 55.009 C 122.364 54.606,121.997 54.439,121.994 54.638 C 121.991 54.837,121.813 54.730,121.600 54.400 C 121.261 53.875,121.211 53.880,121.206 54.438 M123.939 59.047 C 124.177 59.513,124.246 60.053,124.093 60.247 C 123.939 60.441,124.073 60.374,124.390 60.097 C 124.887 59.663,124.866 59.499,124.236 58.897 C 123.538 58.230,123.525 58.237,123.939 59.047 M124.400 62.722 C 124.400 62.931,124.672 63.328,125.005 63.604 C 125.537 64.045,125.597 67.857,125.505 95.233 C 125.447 112.353,125.536 126.224,125.702 126.058 C 126.438 125.322,125.844 62.619,125.100 62.476 C 124.715 62.402,124.400 62.512,124.400 62.722 M124.190 96.200 C 124.190 112.700,124.239 119.508,124.300 111.330 C 124.360 103.151,124.360 89.651,124.300 81.330 C 124.239 73.008,124.190 79.700,124.190 96.200 M194.500 126.276 C 194.885 126.376,195.515 126.376,195.900 126.276 C 196.285 126.175,195.970 126.093,195.200 126.093 C 194.430 126.093,194.115 126.175,194.500 126.276 M140.930 126.700 C 149.251 126.760,162.751 126.760,170.930 126.700 C 179.108 126.639,172.300 126.590,155.800 126.590 C 139.300 126.590,132.608 126.639,140.930 126.700 M190.471 126.914 C 190.149 127.302,190.228 127.429,190.793 127.429 C 191.204 127.429,191.463 127.303,191.368 127.148 C 191.273 126.994,191.421 126.777,191.698 126.666 C 192.020 126.536,191.967 126.452,191.549 126.432 C 191.191 126.414,190.706 126.631,190.471 126.914 M197.414 126.781 C 198.405 127.182,199.049 127.936,199.311 129.000 C 199.489 129.725,199.512 129.715,199.554 128.900 C 199.609 127.835,198.292 126.389,197.300 126.425 C 196.715 126.447,196.733 126.505,197.414 126.781 M195.206 128.476 C 195.203 128.848,195.380 129.264,195.600 129.400 C 195.820 129.536,196.000 129.435,196.000 129.175 C 196.000 128.829,196.166 128.840,196.619 129.216 C 197.063 129.584,197.107 129.810,196.776 130.015 C 196.480 130.198,196.459 130.389,196.715 130.548 C 197.488 131.025,197.538 129.668,196.773 128.976 C 196.348 128.591,195.997 128.439,195.994 128.638 C 195.991 128.837,195.813 128.730,195.600 128.400 C 195.266 127.883,195.211 127.893,195.206 128.476 M197.869 132.825 C 198.127 133.085,198.245 133.591,198.131 133.949 C 197.953 134.512,197.983 134.519,198.356 134.000 C 198.954 133.170,198.908 132.927,198.100 132.619 C 197.563 132.415,197.509 132.463,197.869 132.825 M199.600 134.380 C 199.600 135.086,199.319 135.720,198.900 135.957 C 198.255 136.323,198.251 136.395,198.854 136.877 C 199.214 137.165,199.604 137.670,199.722 138.000 C 199.840 138.330,199.951 137.385,199.968 135.900 C 199.986 134.415,199.910 133.200,199.800 133.200 C 199.690 133.200,199.600 133.731,199.600 134.380 M198.895 162.620 C 198.823 179.632,198.916 185.156,199.280 185.520 C 199.644 185.884,205.257 185.977,222.580 185.905 L 245.400 185.810 222.400 185.605 L 199.400 185.400 199.195 162.800 L 198.990 140.200 198.895 162.620 M252.705 185.483 C 253.202 185.579,253.922 185.575,254.305 185.475 C 254.687 185.375,254.280 185.296,253.400 185.301 C 252.520 185.305,252.207 185.387,252.705 185.483 M249.641 186.150 C 249.274 186.593,249.390 186.700,250.235 186.700 C 250.872 186.700,251.093 186.581,250.797 186.398 C 250.424 186.168,250.437 186.046,250.855 185.880 C 251.257 185.720,251.229 185.655,250.749 185.632 C 250.391 185.614,249.893 185.847,249.641 186.150 M256.875 186.057 C 257.467 186.273,258.127 186.933,258.343 187.525 C 258.597 188.217,258.748 188.351,258.768 187.900 C 258.786 187.515,258.440 186.840,258.000 186.400 C 257.560 185.960,256.885 185.614,256.500 185.632 C 256.049 185.652,256.183 185.803,256.875 186.057 M256.644 187.580 C 256.888 187.921,257.288 188.560,257.532 189.000 C 257.776 189.440,257.981 189.585,257.988 189.322 C 257.995 189.060,257.595 188.421,257.100 187.903 C 256.605 187.385,256.400 187.240,256.644 187.580 M254.619 187.570 C 254.472 187.806,254.476 188.199,254.626 188.443 C 254.824 188.763,254.979 188.758,255.185 188.424 C 255.390 188.093,255.616 188.137,255.984 188.581 C 256.360 189.034,256.371 189.200,256.025 189.200 C 255.765 189.200,255.664 189.380,255.800 189.600 C 255.936 189.820,256.352 189.986,256.724 189.968 C 257.144 189.949,257.210 189.860,256.898 189.734 C 256.621 189.623,256.481 189.393,256.585 189.224 C 256.690 189.055,256.350 188.517,255.830 188.028 C 255.224 187.459,254.789 187.294,254.619 187.570 M258.864 192.276 C 258.801 193.931,258.235 194.879,257.892 193.902 C 257.795 193.626,257.712 193.881,257.708 194.468 C 257.702 195.215,257.866 195.473,258.253 195.324 C 258.962 195.052,259.304 193.681,259.093 191.955 C 258.940 190.695,258.924 190.717,258.864 192.276 M308.629 245.029 C 307.801 245.857,307.821 245.900,309.043 245.900 C 309.751 245.900,309.915 245.795,309.554 245.572 C 308.901 245.168,309.500 244.907,311.600 244.679 C 312.779 244.552,312.705 244.518,311.129 244.464 C 309.890 244.422,309.044 244.613,308.629 245.029 M316.075 245.257 C 316.667 245.473,317.327 246.133,317.543 246.725 C 317.797 247.417,317.948 247.551,317.968 247.100 C 317.986 246.715,317.640 246.040,317.200 245.600 C 316.760 245.160,316.085 244.814,315.700 244.832 C 315.249 244.852,315.383 245.003,316.075 245.257 M315.211 248.385 C 314.709 248.702,314.726 248.797,315.328 249.028 C 315.717 249.177,316.147 249.187,316.284 249.049 C 316.421 248.912,316.313 248.800,316.043 248.800 C 315.773 248.800,315.664 248.620,315.800 248.400 C 316.104 247.907,315.971 247.904,315.211 248.385 M318.093 249.200 C 318.093 249.970,318.175 250.285,318.276 249.900 C 318.376 249.515,318.376 248.885,318.276 248.500 C 318.175 248.115,318.093 248.430,318.093 249.200 M316.908 253.307 C 316.902 254.202,317.006 254.327,317.450 253.959 C 317.753 253.707,317.997 253.209,317.994 252.851 C 317.989 252.331,317.918 252.310,317.642 252.745 C 317.351 253.206,317.267 253.206,317.106 252.745 C 317.002 252.445,316.912 252.698,316.908 253.307 M317.790 288.800 C 317.790 305.630,317.840 312.515,317.900 304.100 C 317.960 295.685,317.960 281.915,317.900 273.500 C 317.840 265.085,317.790 271.970,317.790 288.800 M316.906 323.942 C 316.939 324.383,317.093 324.666,317.249 324.570 C 317.404 324.474,317.623 324.621,317.734 324.898 C 317.864 325.220,317.948 325.167,317.968 324.749 C 317.986 324.391,317.740 323.882,317.423 323.619 C 316.951 323.227,316.856 323.286,316.906 323.942 M316.531 325.651 C 316.645 326.009,316.527 326.515,316.269 326.775 C 315.909 327.137,315.963 327.185,316.500 326.981 C 317.308 326.673,317.354 326.430,316.756 325.600 C 316.383 325.081,316.353 325.088,316.531 325.651 M318.093 328.400 C 318.093 329.170,318.175 329.485,318.276 329.100 C 318.376 328.715,318.376 328.085,318.276 327.700 C 318.175 327.315,318.093 327.630,318.093 328.400 M315.021 328.766 C 314.897 328.967,314.996 329.199,315.241 329.280 C 315.523 329.374,315.450 329.626,315.044 329.964 C 314.604 330.328,314.400 330.352,314.400 330.040 C 314.400 329.748,314.037 329.820,313.400 330.237 C 312.369 330.912,312.078 331.600,312.824 331.600 C 313.057 331.600,313.117 331.389,312.958 331.132 C 312.762 330.815,312.889 330.749,313.355 330.927 C 313.818 331.105,313.948 331.040,313.755 330.727 C 313.567 330.422,313.686 330.347,314.105 330.508 C 314.767 330.762,315.705 329.929,315.847 328.960 C 315.939 328.334,315.371 328.200,315.021 328.766 M317.600 330.538 C 317.600 331.220,316.443 332.258,315.400 332.512 C 314.676 332.689,314.685 332.712,315.500 332.754 C 316.507 332.806,318.000 331.520,318.000 330.600 C 318.000 330.270,317.910 330.000,317.800 330.000 C 317.690 330.000,317.600 330.242,317.600 330.538 M311.411 331.183 C 311.281 331.393,310.865 331.466,310.487 331.345 C 309.904 331.158,309.890 331.190,310.400 331.556 C 311.210 332.139,311.473 332.108,311.745 331.400 C 312.001 330.732,311.778 330.588,311.411 331.183 M307.600 332.200 C 307.600 332.530,307.864 332.800,308.187 332.800 C 308.545 332.800,308.685 332.565,308.545 332.200 C 308.418 331.870,308.154 331.600,307.957 331.600 C 307.761 331.600,307.600 331.870,307.600 332.200 M270.300 332.300 C 276.515 332.362,286.685 332.362,292.900 332.300 C 299.115 332.238,294.030 332.187,281.600 332.187 C 269.170 332.187,264.085 332.238,270.300 332.300 M310.105 333.087 C 310.714 333.179,311.614 333.177,312.105 333.082 C 312.597 332.987,312.100 332.911,311.000 332.914 C 309.900 332.917,309.497 332.995,310.105 333.087 M257.600 382.367 C 257.600 382.568,257.813 382.804,258.073 382.891 C 258.333 382.978,258.669 383.938,258.820 385.024 L 259.093 387.000 259.147 385.274 C 259.201 383.501,258.669 382.000,257.986 382.000 C 257.774 382.000,257.600 382.165,257.600 382.367 M255.231 388.567 C 254.727 389.104,254.409 389.781,254.526 390.071 C 254.698 390.502,254.743 390.503,254.768 390.076 C 254.786 389.788,254.956 389.649,255.147 389.767 C 255.679 390.096,256.803 388.651,256.454 388.087 C 256.230 387.725,255.900 387.855,255.231 388.567 M258.195 390.093 C 257.978 390.584,257.350 391.211,256.800 391.487 C 256.070 391.853,255.989 391.990,256.500 391.994 C 257.355 392.001,258.800 390.623,258.800 389.800 C 258.800 388.977,258.658 389.046,258.195 390.093 M248.800 391.186 C 248.800 391.869,250.301 392.401,252.074 392.347 L 253.800 392.293 251.824 392.020 C 250.738 391.869,249.778 391.533,249.691 391.273 C 249.502 390.706,248.800 390.638,248.800 391.186 M198.990 422.200 C 198.990 438.700,199.039 445.508,199.100 437.330 C 199.160 429.151,199.160 415.651,199.100 407.330 C 199.039 399.008,198.990 405.700,198.990 422.200 M199.600 454.800 C 199.600 455.244,199.333 455.600,199.000 455.600 C 198.237 455.600,198.218 456.245,198.973 456.534 C 199.288 456.655,199.619 457.349,199.709 458.077 C 199.799 458.805,199.901 458.185,199.936 456.700 C 199.971 455.215,199.910 454.000,199.800 454.000 C 199.690 454.000,199.600 454.360,199.600 454.800 M197.378 460.835 C 197.231 461.074,197.321 461.479,197.579 461.735 C 197.936 462.090,197.978 462.018,197.756 461.434 C 197.552 460.900,197.605 460.756,197.932 460.958 C 198.189 461.117,198.400 461.057,198.400 460.824 C 198.400 460.271,197.723 460.278,197.378 460.835 M196.015 462.582 C 195.248 463.506,195.941 464.177,196.830 463.373 C 197.243 462.999,197.485 462.537,197.367 462.347 C 197.052 461.837,196.562 461.923,196.015 462.582 M199.200 463.538 C 199.200 464.299,198.255 465.328,197.200 465.716 C 196.725 465.891,196.746 465.943,197.300 465.968 C 198.231 466.010,199.600 464.601,199.600 463.600 C 199.600 463.160,199.510 462.800,199.400 462.800 C 199.290 462.800,199.200 463.132,199.200 463.538 M193.411 464.383 C 193.281 464.593,192.865 464.666,192.487 464.545 C 191.904 464.358,191.890 464.390,192.400 464.756 C 193.210 465.339,193.473 465.308,193.745 464.600 C 194.001 463.932,193.778 463.788,193.411 464.383 M190.471 465.486 C 190.706 465.769,191.191 465.986,191.549 465.968 C 191.967 465.948,192.020 465.864,191.698 465.734 C 191.421 465.623,191.273 465.406,191.368 465.252 C 191.463 465.097,191.204 464.971,190.793 464.971 C 190.228 464.971,190.149 465.098,190.471 465.486 M125.867 465.867 C 125.720 466.013,125.600 476.683,125.600 489.578 C 125.600 510.433,125.529 513.123,124.959 513.937 C 124.252 514.947,124.432 515.427,125.383 515.062 C 125.930 514.852,126.000 512.047,126.000 490.415 L 126.000 466.005 155.900 465.900 L 185.800 465.795 155.967 465.697 C 139.558 465.644,126.013 465.720,125.867 465.867 M193.505 466.283 C 194.002 466.379,194.722 466.375,195.105 466.275 C 195.487 466.175,195.080 466.096,194.200 466.101 C 193.320 466.105,193.007 466.187,193.505 466.283 M124.187 488.800 C 124.187 501.230,124.238 506.315,124.300 500.100 C 124.362 493.885,124.362 483.715,124.300 477.500 C 124.238 471.285,124.187 476.370,124.187 488.800 M122.015 521.782 C 121.248 522.706,121.941 523.377,122.830 522.573 C 123.243 522.199,123.485 521.737,123.367 521.547 C 123.052 521.037,122.562 521.123,122.015 521.782 M119.700 523.288 C 119.205 523.527,118.800 523.897,118.800 524.110 C 118.800 524.323,119.062 524.280,119.382 524.015 C 119.703 523.749,120.123 523.629,120.316 523.748 C 120.509 523.867,120.667 523.703,120.667 523.382 C 120.667 523.062,120.652 522.812,120.633 522.827 C 120.615 522.842,120.195 523.049,119.700 523.288 M122.600 523.627 C 121.940 524.050,121.605 524.397,121.856 524.398 C 122.106 524.399,122.736 524.046,123.256 523.613 C 124.445 522.623,124.159 522.629,122.600 523.627 M124.599 524.001 C 124.445 524.251,123.932 524.612,123.459 524.803 C 122.899 525.029,122.817 525.158,123.224 525.175 C 124.011 525.207,125.486 524.153,125.139 523.806 C 124.997 523.663,124.754 523.751,124.599 524.001 M116.000 524.411 C 116.000 524.758,117.553 525.381,117.801 525.132 C 117.878 525.055,117.505 524.785,116.971 524.533 C 116.437 524.281,116.000 524.226,116.000 524.411 M66.662 525.100 C 66.493 525.372,83.192 525.368,103.800 525.090 C 108.200 525.031,101.686 524.941,89.324 524.891 C 76.962 524.841,66.764 524.935,66.662 525.100 M120.305 525.483 C 120.802 525.579,121.522 525.575,121.905 525.475 C 122.287 525.375,121.880 525.296,121.000 525.301 C 120.120 525.305,119.807 525.387,120.305 525.483 M65.787 548.200 C 65.787 560.740,65.838 565.812,65.900 559.472 C 65.962 553.131,65.962 542.871,65.900 536.672 C 65.838 530.472,65.787 535.660,65.787 548.200 M66.046 571.820 C 66.021 572.271,65.787 572.853,65.527 573.113 C 65.266 573.374,65.162 573.695,65.294 573.828 C 65.670 574.203,66.472 572.439,66.272 571.679 C 66.131 571.146,66.083 571.176,66.046 571.820 M62.783 581.134 C 62.002 581.766,61.966 581.901,62.526 582.116 C 63.167 582.362,63.706 581.869,63.853 580.900 C 63.953 580.244,63.856 580.265,62.783 581.134 M66.000 581.352 C 66.000 581.970,65.578 582.858,65.018 583.418 C 63.961 584.476,64.013 584.635,65.209 583.995 C 65.955 583.596,66.731 580.997,66.248 580.515 C 66.112 580.378,66.000 580.755,66.000 581.352 M63.400 582.827 C 62.740 583.250,62.405 583.597,62.656 583.598 C 62.906 583.599,63.536 583.246,64.056 582.813 C 65.245 581.823,64.959 581.829,63.400 582.827 M57.669 583.884 C 57.905 584.168,58.391 584.379,58.749 584.354 C 59.244 584.318,59.218 584.261,58.642 584.113 C 58.040 583.959,57.998 583.849,58.437 583.577 C 58.839 583.329,58.751 583.253,58.115 583.301 C 57.449 583.351,57.343 583.490,57.669 583.884 M60.900 584.676 C 61.285 584.776,61.915 584.776,62.300 584.676 C 62.685 584.575,62.370 584.493,61.600 584.493 C 60.830 584.493,60.515 584.575,60.900 584.676 \" stroke=\"none\" fill=\"%2c3434c5\" fill-rule=\"evenodd\"></path></g></svg>');\r\n            background-size: contain;\r\n            background-repeat: no-repeat;\r\n            filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.3));\r\n        }\r\n    }\r\n\r\n    h1 {\r\n        margin: 0;\r\n        padding: 10px;\r\n        text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.18);\r\n        color: #2c3434c5;\r\n        font-size: 2.5rem;\r\n    }\r\n}\r\n");

/***/ }),

/***/ "./src/html/components/ui/menu-item/menu-item.html":
/*!*********************************************************!*\
  !*** ./src/html/components/ui/menu-item/menu-item.html ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = `<div class="menu-item">
    <div class="item">
        <h1 class="item-name"></h1>
    </div>
</div>`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/html/components/ui/menu-item/menu-item.ts":
/*!*******************************************************!*\
  !*** ./src/html/components/ui/menu-item/menu-item.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MenuItemComponent)
/* harmony export */ });
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../main.css */ "./src/html/main.css");
/* harmony import */ var _menu_item_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu-item.css */ "./src/html/components/ui/menu-item/menu-item.css");
/* harmony import */ var _menu_item_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-item.html */ "./src/html/components/ui/menu-item/menu-item.html");
/* harmony import */ var _core_systems_event_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/systems/event-system */ "./src/core/systems/event-system.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");





class MenuItemComponent extends HTMLElement {
    _pageComponent = null;
    _itemName = null;
    eventSystem;
    constructor() {
        super();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_4__.GameContext.getInstance();
        this.eventSystem = gameContext.getBean(_core_systems_event_system__WEBPACK_IMPORTED_MODULE_3__.EventSystem);
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
                    <style>${_main_css__WEBPACK_IMPORTED_MODULE_0__["default"].toString()}${_menu_item_css__WEBPACK_IMPORTED_MODULE_1__["default"].toString()}</style>
                    ${_menu_item_html__WEBPACK_IMPORTED_MODULE_2__["default"]}
                `;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.shadowRoot
            ?.querySelector('.menu-item')
            ?.addEventListener('click', () => {
            if (this._pageComponent) {
                this.eventSystem.emit('PAGE_TRANSITION', {
                    component: this._pageComponent,
                    itemName: this._itemName,
                });
            }
        });
    }
    set itemName(value) {
        this.shadowRoot.querySelector('.item-name').innerHTML = value;
        this._itemName = value;
    }
    get itemName() {
        return this._itemName;
    }
    set pageComponent(value) {
        this._pageComponent = value;
    }
    get pageComponent() {
        return this._pageComponent;
    }
}


/***/ }),

/***/ "./src/html/components/ui/ui-component.ts":
/*!************************************************!*\
  !*** ./src/html/components/ui/ui-component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentDefinitions: () => (/* binding */ componentDefinitions)
/* harmony export */ });
/* harmony import */ var _menu_item_menu_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu-item/menu-item */ "./src/html/components/ui/menu-item/menu-item.ts");

/**
 * Components declaration
 */
const componentDefinitions = [
    {
        name: 'ui-menu-item',
        component: _menu_item_menu_item__WEBPACK_IMPORTED_MODULE_0__["default"],
    },
];


/***/ }),

/***/ "./src/html/index.html":
/*!*****************************!*\
  !*** ./src/html/index.html ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = `<app-layout class="app-layout"></app-layout>
<div class="pokemon-rpg">
    <div id="game-container">
        <canvas id="game-canvas"></canvas>
        <canvas id="transicion-canvas"></canvas>
    </div>
</div>`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/html/index.ts":
/*!***************************!*\
  !*** ./src/html/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/component */ "./src/html/components/component.ts");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/html/index.html");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.css */ "./src/html/main.css");



document.body.innerHTML = `
            <style>${_main_css__WEBPACK_IMPORTED_MODULE_2__["default"].toString()}</style>
            ${_index_html__WEBPACK_IMPORTED_MODULE_1__["default"]}
        `;


/***/ }),

/***/ "./src/html/main.css":
/*!***************************!*\
  !*** ./src/html/main.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("@font-face {\r\n    font-family: 'pokemon-font';\r\n    src: url('assets/html/fonts/pokemon-font.ttf') format('truetype');\r\n}\r\n\r\nbody {\r\n    margin: 0;\r\n    overflow: hidden;\r\n    background: #000;\r\n    display: flex;\r\n    height: 100vh;\r\n}\r\n\r\n.pokemon-rpg {\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: hidden;\r\n}\r\n\r\n.pokemon-rpg,\r\n.app-layout {\r\n    position: absolute;\r\n}\r\n\r\n.app-layout {\r\n    z-index: 55;\r\n}\r\n\r\n#game-container {\r\n    position: relative;\r\n    image-rendering: pixelated;\r\n}\r\n\r\n#game-canvas,\r\n#transicion-canvas {\r\n    position: absolute;\r\n}\r\n\r\n#game-canvas {\r\n    z-index: 51;\r\n}\r\n\r\n.app-layout {\r\n    z-index: 52;\r\n}\r\n\r\n#transicion-canvas {\r\n    z-index: 53;\r\n    pointer-events: none;\r\n}\r\n\r\n@media (max-width: 320px) {\r\n}\r\n\r\n@media (max-width: 480px) {\r\n}\r\n\r\n@media (max-width: 768px) {\r\n}\r\n\r\n@media (max-width: 1024px) {\r\n}\r\n\r\n@media (min-width: 1025px) and (max-width: 1366px) {\r\n}\r\n\r\n@media (min-width: 1367px) {\r\n}\r\n");

/***/ }),

/***/ "./src/html/menu/menu-config.ts":
/*!**************************************!*\
  !*** ./src/html/menu/menu-config.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MENU_CONFIG: () => (/* binding */ MENU_CONFIG)
/* harmony export */ });
/* harmony import */ var _components_app_pages_skills_about_skills_about__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/app/pages/skills-about/skills-about */ "./src/html/components/app/pages/skills-about/skills-about.ts");

const MENU_CONFIG = [
    {
        itemName: 'POKéMON',
    },
    {
        itemName: 'BAG',
    },
    {
        itemName: 'ABOUT ME',
        component: _components_app_pages_skills_about_skills_about__WEBPACK_IMPORTED_MODULE_0__["default"],
    },
    {
        itemName: 'PROJECTS',
    },
    {
        itemName: 'SKILLS',
        component: _components_app_pages_skills_about_skills_about__WEBPACK_IMPORTED_MODULE_0__["default"],
    },
    {
        itemName: 'SERVICES',
    },
    {
        itemName: 'CONTACT',
    },
];


/***/ }),

/***/ "./src/input/input-manager.ts":
/*!************************************!*\
  !*** ./src/input/input-manager.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input)
/* harmony export */ });
class Input {
    static keys = new Map();
    static directionOrder = [];
    static initialize() {
        window.addEventListener('keydown', (e) => {
            this.keys.set(e.key, true);
            if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                if (!this.directionOrder.includes(e.key)) {
                    this.directionOrder.push(e.key);
                }
            }
        });
        window.addEventListener('keyup', (e) => {
            this.keys.set(e.key, false);
            if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                this.directionOrder = this.directionOrder.filter((key) => key !== e.key);
            }
        });
    }
    static isKeyDown(key) {
        return this.keys.get(key) || false;
    }
    static get movementDirection() {
        if (this.directionOrder.length === 0) {
            return { x: 0, y: 0 };
        }
        const firstKey = this.directionOrder[0];
        switch (firstKey) {
            case 'ArrowRight':
                return { x: 1, y: 0 };
            case 'ArrowLeft':
                return { x: -1, y: 0 };
            case 'ArrowDown':
                return { x: 0, y: 1 };
            case 'ArrowUp':
                return { x: 0, y: -1 };
            default:
                return { x: 0, y: 0 };
        }
    }
}


/***/ }),

/***/ "./src/rendering/camera.ts":
/*!*********************************!*\
  !*** ./src/rendering/camera.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Camera: () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var _core_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/decorators/injectable */ "./src/core/decorators/injectable.ts");
/* harmony import */ var _core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/engine/canvas-token */ "./src/core/engine/canvas-token.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let Camera = class Camera {
    position = { x: 0, y: 0 };
    viewport;
    target;
    mapWidth = 0;
    mapHeight = 0;
    bounds = { minX: 0, minY: 0, maxX: Infinity, maxY: Infinity };
    constructor() {
        this.viewport = {
            width: window.screen.width * 0.6,
            height: window.screen.height * 0.8,
        };
    }
    targetCenter() {
        if (this.target) {
            const frame = this.target.sprite.getCurrentFrame();
            return {
                x: this.target.position.x - this.position.x,
                y: this.target.position.y - this.position.y,
            };
        }
        throw new Error('No target detected');
    }
    setBounds(mapWidth, mapHeight) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }
    follow(target) {
        this.target = target;
    }
    update(deltaTime) {
        if (!this.target)
            return;
        const ctx = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_2__.GameContext.getInstance().getBean(_core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_1__.GAME_CANVAS);
        const scale = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_2__.GameContext.getInstance().getGameScale();
        const effectiveViewportWidth = ctx.canvas.width / scale;
        const effectiveViewportHeight = ctx.canvas.height / scale;
        const targetX = this.target.position.x - effectiveViewportWidth / 2;
        const targetY = this.target.position.y - effectiveViewportHeight / 2;
        this.bounds = {
            minX: 0,
            minY: 0,
            maxX: Math.max(this.mapWidth - effectiveViewportWidth, 0),
            maxY: Math.max(this.mapHeight - effectiveViewportHeight, 0),
        };
        const clampedX = this.clamp(targetX, this.bounds.minX, this.bounds.maxX);
        const clampedY = this.clamp(targetY, this.bounds.minY, this.bounds.maxY);
        const damping = 0.1 * (deltaTime / 16.67);
        this.position.x += (clampedX - this.position.x) * damping;
        this.position.y += (clampedY - this.position.y) * damping;
    }
    clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }
};
Camera = __decorate([
    (0,_core_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)(),
    __metadata("design:paramtypes", [])
], Camera);



/***/ }),

/***/ "./src/rendering/layer-manager.ts":
/*!****************************************!*\
  !*** ./src/rendering/layer-manager.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayerManager: () => (/* binding */ LayerManager)
/* harmony export */ });
/* harmony import */ var _core_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/decorators/injectable */ "./src/core/decorators/injectable.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let LayerManager = class LayerManager {
    layers = new Map();
    sortedLayers = [];
    addLayer(layer) {
        this.layers.set(layer.priority, layer);
        this.sortLayers();
    }
    removeLayer(layerPriority) {
        this.layers.delete(layerPriority);
        this.sortLayers();
    }
    getLayer(layerPriority) {
        return this.layers.get(layerPriority);
    }
    sortLayers() {
        this.sortedLayers = Array.from(this.layers.values())
            .filter((layer) => layer.enabled)
            .sort((a, b) => a.priority - b.priority);
    }
    update(deltaTime) {
        this.sortedLayers.forEach((layer) => layer.update(deltaTime));
    }
    render() {
        this.sortedLayers.forEach((layer) => layer.render());
    }
};
LayerManager = __decorate([
    (0,_core_decorators_injectable__WEBPACK_IMPORTED_MODULE_0__.Injectable)()
], LayerManager);



/***/ }),

/***/ "./src/rendering/sprite-sheet.ts":
/*!***************************************!*\
  !*** ./src/rendering/sprite-sheet.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimatedSprite: () => (/* binding */ AnimatedSprite),
/* harmony export */   SpriteSheet: () => (/* binding */ SpriteSheet)
/* harmony export */ });
class SpriteSheet {
    image;
    tileWidth;
    tileHeight;
    tiles = [];
    animations = new Map();
    constructor(image, tileWidth, tileHeight, padding = 0) {
        this.image = image;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.generateFrames(padding);
    }
    generateFrames(padding) {
        const cols = Math.floor(this.image.width / (this.tileWidth + padding));
        const rows = Math.floor(this.image.height / (this.tileHeight + padding));
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                this.tiles.push({
                    x: x * (this.tileWidth + padding),
                    y: y * (this.tileHeight + padding),
                });
            }
        }
    }
    defineAnimation(config) {
        this.animations.set(config.name, {
            ...config,
            loop: config.loop ?? true,
        });
    }
    getImage() {
        return this.image;
    }
    getAnimation(name) {
        const animation = this.animations.get(name);
        if (!animation) {
            throw new Error(`Animation '${name}' not found`);
        }
        return animation;
    }
    getTile(frameIndex) {
        if (frameIndex < 0 || frameIndex >= this.tiles.length) {
            throw new Error(`Invalid frame index: ${frameIndex}`);
        }
        return this.tiles[frameIndex];
    }
    draw(ctx, tile, x, y, flipX = false, scale = 1) {
        ctx.save();
        if (flipX) {
            ctx.scale(-1, 1);
            x = -x - this.tileWidth * scale;
        }
        ctx.drawImage(this.image, tile.x, tile.y, this.width, this.height, x, y, this.tileWidth * scale, this.tileHeight * scale);
        ctx.restore();
    }
    get width() {
        return this.tileWidth;
    }
    get height() {
        return this.tileHeight;
    }
}
class AnimatedSprite {
    spriteSheet;
    currentAnimation;
    currentFrameIndex = 0;
    accumulator = 0;
    isPlaying = false;
    animationElapsedTime = 0;
    constructor(spriteSheet) {
        this.spriteSheet = spriteSheet;
    }
    play(animationName, reset = true) {
        if (reset || this.currentAnimation?.name !== animationName) {
            this.currentAnimation =
                this.spriteSheet.getAnimation(animationName);
            this.currentFrameIndex = 0;
            this.accumulator = 0;
            this.isPlaying = true;
        }
    }
    stop() {
        this.isPlaying = false;
    }
    update(deltaTime) {
        if (!this.isPlaying || !this.currentAnimation)
            return;
        this.accumulator += deltaTime;
        const frameDuration = 1000 / this.currentAnimation.frameRate;
        while (this.accumulator >= frameDuration) {
            this.accumulator -= frameDuration;
            this.nextFrame();
        }
    }
    nextFrame() {
        if (!this.currentAnimation)
            return;
        this.currentFrameIndex++;
        if (this.currentFrameIndex >= this.currentAnimation.frames.length) {
            if (this.currentAnimation.loop) {
                this.currentFrameIndex = 0;
            }
            else {
                this.currentFrameIndex =
                    this.currentAnimation.frames.length - 1;
                this.isPlaying = false;
            }
        }
    }
    getCurrentFrame() {
        if (!this.currentAnimation) {
            return {
                tiles: [],
                width: 0,
                height: 0,
                currentFrame: 0,
                currentAnimation: '',
            };
        }
        const currentTileIndices = this.currentAnimation.frames[this.currentFrameIndex];
        const tileWidth = this.spriteSheet.width;
        const tileHeight = this.spriteSheet.height;
        const tiles = currentTileIndices.map((row) => row.map((index) => this.spriteSheet.getTile(index)));
        return {
            tiles,
            width: tiles[0]?.length * tileWidth || 0,
            height: tiles.length * tileHeight,
            currentFrame: this.currentFrameIndex,
            currentAnimation: this.currentAnimation.name,
        };
    }
    playSequence(deltaTime, duration, animations, quantity) {
        const totalDuration = duration * quantity;
        this.animationElapsedTime += deltaTime;
        if (this.animationElapsedTime / 1000 >= totalDuration) {
            return;
        }
        const elapsedSeconds = this.animationElapsedTime / 1000;
        const roundElapsedTime = elapsedSeconds % duration;
        const currentAnimationIndex = Math.floor((roundElapsedTime / duration) * animations.length);
        const currentAnimation = animations[currentAnimationIndex];
        this.play(currentAnimation);
    }
}


/***/ }),

/***/ "./src/rendering/tile-map-builder.ts":
/*!*******************************************!*\
  !*** ./src/rendering/tile-map-builder.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TileMapBuilder: () => (/* binding */ TileMapBuilder)
/* harmony export */ });
/* harmony import */ var _tile_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile-map */ "./src/rendering/tile-map.ts");
/* harmony import */ var _core_systems_effect_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/effect-system */ "./src/core/systems/effect-system.ts");
/* harmony import */ var _effects_triggers_basic_trigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/effects/triggers/basic-trigger */ "./src/effects/triggers/basic-trigger.ts");
/* harmony import */ var _effects_triggers_enter_into_building__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/effects/triggers/enter-into-building */ "./src/effects/triggers/enter-into-building.ts");
/* harmony import */ var _effects_triggers_map_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/effects/triggers/map-transition */ "./src/effects/triggers/map-transition.ts");
/* harmony import */ var _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/effects/trigger-conditions/area */ "./src/effects/trigger-conditions/area.ts");
/* harmony import */ var _effects_trigger_conditions_bush_area__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/effects/trigger-conditions/bush-area */ "./src/effects/trigger-conditions/bush-area.ts");
/* harmony import */ var _effects_triggers_jump__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/effects/triggers/jump */ "./src/effects/triggers/jump.ts");








class TileMapBuilder {
    layers = [];
    currentLayer = null;
    tileset;
    tileSize;
    scale;
    effectSystem = new _core_systems_effect_system__WEBPACK_IMPORTED_MODULE_1__.EffectSystem();
    constructor(tileSize = 16, scale = 2) {
        this.tileSize = tileSize;
        this.scale = scale;
    }
    addMapTransitionTrigger(conditions, mapEvent) {
        this.effectSystem.addTrigger(new _effects_triggers_map_transition__WEBPACK_IMPORTED_MODULE_4__.MapTransitionTrigger(conditions, mapEvent));
        return this;
    }
    addEffectTrigger(effect, sequence, conditions) {
        this.effectSystem.addTrigger(new _effects_triggers_basic_trigger__WEBPACK_IMPORTED_MODULE_2__.BasicTrigger({
            execute: (deltaTime) => effect.playSequence(deltaTime, sequence),
            render: () => {
                effect.render();
            },
        }, false, conditions));
        return this;
    }
    addEnterIntoBuildingTriggerEffect(effects, sequence, conditions, cooldown) {
        this.effectSystem.addTrigger(new _effects_triggers_enter_into_building__WEBPACK_IMPORTED_MODULE_3__.EnterIntoBuildingTrigger(conditions, effects.map((effect, index) => new _effects_triggers_basic_trigger__WEBPACK_IMPORTED_MODULE_2__.BasicTrigger({
            execute: (deltaTime) => effect.playSequence(deltaTime, sequence[index]),
            render: () => {
                effect.render();
            },
        }, true)), cooldown));
        return this;
    }
    addJumpEffectTrigger(sequence, condition) {
        this.effectSystem.addTrigger(new _effects_triggers_jump__WEBPACK_IMPORTED_MODULE_7__.JumpTrigger(sequence, condition));
        return this;
    }
    setTileset(tileSet) {
        this.tileset = tileSet;
        return this;
    }
    createLayer(name, width, height, collidable = false, priority) {
        const layer = {
            name,
            data: Array.from({ length: height }, () => Array.from({ length: width }, () => ({
                tile: -1,
                offsetX: 0,
                offsetY: 0,
                flipX: false,
                flipY: false,
                collidable: false,
            }))),
            visible: true,
            collidable,
            priority,
        };
        this.layers.push(layer);
        this.currentLayer = layer;
        return this;
    }
    buildSpriteColumn(frames, column, startRow) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        frames.forEach((frame, index) => {
            const row = startRow + index;
            this.currentLayer.data[row][column].tile = frame;
        });
        return this;
    }
    buildSpriteRow(frames, row, startColumn, offsetX = 0, offsetY = 0) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        frames.forEach((frame, index) => {
            const column = startColumn + index;
            this.currentLayer.data[row][column].tile = frame;
            this.currentLayer.data[row][column].offsetX = offsetX;
            this.currentLayer.data[row][column].offsetY = offsetY;
        });
        return this;
    }
    buildBushSpriteRow(frames, row, startColumn, offsetX = 0, offsetY = 0) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        frames.forEach((frame, index) => {
            const column = startColumn + index;
            const bushCondition = new _effects_trigger_conditions_bush_area__WEBPACK_IMPORTED_MODULE_6__.BushAreaTriggerCondition({ x: column, y: row, width: 1, height: 1 }, 32);
            this.currentLayer.data[row][column].tile = frame;
            this.currentLayer.data[row][column].offsetX = offsetX;
            this.currentLayer.data[row][column].offsetY = offsetY;
            this.currentLayer.data[row][column].condition = bushCondition;
        });
        return this;
    }
    buildSingleSprite(frame, row, column, flipX = false, flipY = false, offsetX = 0, offsetY = 0, condition) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        this.currentLayer.data[row][column].tile = frame;
        this.currentLayer.data[row][column].flipX = flipX;
        this.currentLayer.data[row][column].flipY = flipY;
        this.currentLayer.data[row][column].offsetX = offsetX;
        this.currentLayer.data[row][column].offsetY = offsetY;
        this.currentLayer.data[row][column].condition = condition;
        return this;
    }
    buildSingleTileCondition(row, column, condition) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        this.currentLayer.data[row][column].condition = condition;
        return this;
    }
    buildSingleBushSprite(frame, row, column, flipX = false, flipY = false, offsetX = 0, offsetY = 0) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        const bushCondition = new _effects_trigger_conditions_area__WEBPACK_IMPORTED_MODULE_5__.AreaTriggerCondition({ x: column, y: row, width: 1, height: 1 }, 32);
        this.currentLayer.data[row][column].tile = frame;
        this.currentLayer.data[row][column].flipX = flipX;
        this.currentLayer.data[row][column].flipY = flipY;
        this.currentLayer.data[row][column].offsetX = offsetX;
        this.currentLayer.data[row][column].offsetY = offsetY;
        this.currentLayer.data[row][column].condition = bushCondition;
        return this;
    }
    buildSpriteObject(frames, row, column, flipX = false, offsetX = 0, offsetY = 0) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        for (let i = 0; i < frames.length; i++) {
            const rowObject = frames[i];
            const numColumns = rowObject.length;
            for (let j = 0; j < numColumns; j++) {
                const frame = rowObject[j];
                const targetColumn = flipX
                    ? column + (numColumns - 1 - j)
                    : column + j;
                this.currentLayer.data[row + i][targetColumn].tile = frame;
                this.currentLayer.data[row + i][targetColumn].flipX = flipX;
                this.currentLayer.data[row + i][targetColumn].offsetX = offsetX;
                this.currentLayer.data[row + i][targetColumn].offsetY = offsetY;
            }
        }
        return this;
    }
    cleanSprite(row, column) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        this.currentLayer.data[row][column].tile = 0;
        this.currentLayer.data[row][column].flipX = false;
        this.currentLayer.data[row][column].offsetX = 0;
        this.currentLayer.data[row][column].offsetY = 0;
        return this;
    }
    buildSpriteObjectRow(tilesId, row, startColumn, offsetX = 0, offsetY = 0, cantidad = 1, flipX = false, condition) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        const objectHeight = tilesId.length;
        const objectWidth = tilesId[0].length;
        for (let copy = 0; copy < cantidad; copy++) {
            for (let r = 0; r < objectHeight; r++) {
                const targetRow = row + r;
                if (targetRow >= this.currentLayer.data.length)
                    continue;
                for (let c = 0; c < objectWidth; c++) {
                    const targetColumn = startColumn + c + copy * objectWidth;
                    if (targetColumn >= this.currentLayer.data[targetRow].length)
                        continue;
                    this.currentLayer.data[targetRow][targetColumn].tile =
                        tilesId[r][c];
                    this.currentLayer.data[targetRow][targetColumn].offsetX =
                        offsetX == 0
                            ? offsetX
                            : offsetX - copy * objectWidth * 12;
                    this.currentLayer.data[targetRow][targetColumn].offsetY =
                        offsetY;
                    this.currentLayer.data[targetRow][targetColumn].flipX =
                        flipX;
                    this.currentLayer.data[targetRow][targetColumn].condition =
                        condition;
                }
            }
        }
        return this;
    }
    buildCollisionRec(row, column, rowQuantity, columnQuantity) {
        for (let i = 0; i < rowQuantity; i++) {
            for (let j = 0; j < columnQuantity; j++) {
                this.currentLayer.data[row + i][column + j].collidable = true;
            }
        }
        return this;
    }
    buildSingleCollision(row, column) {
        this.currentLayer.data[row][column].collidable = true;
        return this;
    }
    buildCollisionRow(row, startColumn, quantity) {
        const column = startColumn;
        for (let i = 0; i < quantity; i++) {
            if (this.currentLayer.data[row][column + i])
                this.currentLayer.data[row][column + i].collidable = true;
        }
        return this;
    }
    buildCollisionColum(column, startRow, quantity) {
        const row = startRow;
        for (let i = 0; i < quantity; i++) {
            if (this.currentLayer.data[row + i][column])
                this.currentLayer.data[row + i][column].collidable = true;
        }
        return this;
    }
    fillArea(tileId, x, y, width, height) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        for (let row = y; row < y + height; row++) {
            for (let col = x; col < x + width; col++) {
                if (row < this.currentLayer.data.length &&
                    col < this.currentLayer.data[0].length) {
                    this.currentLayer.data[row][col].tile = tileId;
                }
            }
        }
        return this;
    }
    fillAreaWithTiles(tiles) {
        if (!this.currentLayer)
            throw new Error('No layer selected');
        const layerRows = this.currentLayer.data.length;
        const layerCols = this.currentLayer.data[0].length;
        const patternRows = tiles.length;
        for (let row = 0; row < layerRows; row++) {
            const tileRow = tiles[row % patternRows];
            const patternCols = tileRow.length;
            for (let col = 0; col < layerCols; col++) {
                this.currentLayer.data[row][col].tile =
                    tileRow[col % patternCols];
            }
        }
        return this;
    }
    build() {
        if (!this.tileset)
            throw new Error('Tileset not configured');
        return new _tile_map__WEBPACK_IMPORTED_MODULE_0__.TileMap(this.layers, this.tileset, this.tileSize, this.scale, this.effectSystem);
    }
}


/***/ }),

/***/ "./src/rendering/tile-map.ts":
/*!***********************************!*\
  !*** ./src/rendering/tile-map.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TileMap: () => (/* binding */ TileMap)
/* harmony export */ });
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera */ "./src/rendering/camera.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/engine/canvas-token */ "./src/core/engine/canvas-token.ts");



class TileMap {
    layers;
    tileset;
    tileSize;
    scale;
    effectSystem;
    camera;
    ctx;
    constructor(layers, tileset, tileSize, scale, effectSystem) {
        this.layers = layers;
        this.tileset = tileset;
        this.tileSize = tileSize;
        this.scale = scale;
        this.effectSystem = effectSystem;
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__.GameContext.getInstance();
        this.camera = gameContext.getBean(_camera__WEBPACK_IMPORTED_MODULE_0__.Camera);
        this.ctx = gameContext.getBean(_core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_2__.GAME_CANVAS);
    }
    get scaledTileSize() {
        return this.tileSize * this.scale;
    }
    getMapWidth() {
        const maxWidth = Math.max(this.layers[0].data[0].length || 0);
        return maxWidth * this.scaledTileSize;
    }
    getMapHeight() {
        const maxHeight = Math.max(this.layers[0].data.length || 0);
        return maxHeight * this.scaledTileSize;
    }
    update(deltaTime) {
        this.effectSystem.update(deltaTime);
    }
    render(priority) {
        const tilesPerRow = Math.floor(this.tileset.getImage().width / this.tileset.width);
        this.layers
            .filter((layer) => layer.priority === priority)
            .forEach((layer) => {
            for (let y = 0; y < layer.data.length; y++) {
                for (let x = 0; x < layer.data[y].length; x++) {
                    const tile = layer.data[y][x];
                    const tileId = tile.tile;
                    if (tileId === -1)
                        continue;
                    if (tile.condition) {
                        if (!tile.condition.isMet()) {
                            continue;
                        }
                    }
                    const sourceX = (tileId % tilesPerRow) * this.tileset.width;
                    const sourceY = Math.floor(tileId / tilesPerRow) *
                        this.tileset.height;
                    const screenX = Math.ceil(x * this.scaledTileSize - this.camera.position.x);
                    const screenY = Math.ceil(y * this.scaledTileSize - this.camera.position.y);
                    const offsetX = tile.offsetX;
                    const offsetY = tile.offsetY;
                    if (tile.flipX || tile.flipY) {
                        this.ctx.save();
                        this.ctx.translate(screenX +
                            offsetX +
                            (tile.flipX ? this.scaledTileSize : 0), screenY +
                            offsetY +
                            (tile.flipY ? this.scaledTileSize : 0));
                        this.ctx.scale(tile.flipX ? -1 : 1, tile.flipY ? -1 : 1);
                        this.ctx.drawImage(this.tileset.getImage(), sourceX, sourceY, this.tileset.width, this.tileset.height, 0, 0, this.scaledTileSize, this.scaledTileSize);
                        this.ctx.restore();
                    }
                    else {
                        this.ctx.drawImage(this.tileset.getImage(), sourceX, sourceY, this.tileset.width, this.tileset.height, screenX + offsetX, screenY + offsetY, this.scaledTileSize, this.scaledTileSize);
                    }
                }
            }
        });
        this.effectSystem.render();
    }
    getCollisionGrid() {
        const collidableLayer = this.layers.find((layer) => layer.collidable);
        if (!collidableLayer) {
            return [];
        }
        const grid = [];
        const width = collidableLayer?.data[0]?.length || 0;
        const height = collidableLayer?.data.length || 0;
        for (let y = 0; y < height; y++) {
            grid[y] = new Array(width).fill(false);
        }
        this.layers.forEach((layer) => {
            if (layer.collidable) {
                layer.data.forEach((row, y) => {
                    row.forEach((tile, x) => {
                        if (tile.tile !== -1 || tile.collidable)
                            grid[y][x] = true;
                    });
                });
            }
        });
        return grid;
    }
    getTileSize() {
        return this.tileSize * this.scale;
    }
}


/***/ }),

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameScene: () => (/* binding */ GameScene)
/* harmony export */ });
class GameScene {
    sceneManager;
    setSceneManager(manager) {
        this.sceneManager = manager;
    }
    async onEnter() { }
    async onExit() { }
}


/***/ }),

/***/ "./src/scenes/overworld-scene.ts":
/*!***************************************!*\
  !*** ./src/scenes/overworld-scene.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OverworldScene: () => (/* binding */ OverworldScene)
/* harmony export */ });
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _types_render_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/types/render-types */ "./src/types/render-types.ts");
/* harmony import */ var _game_player_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/game/player/player */ "./src/game/player/player.ts");
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");
/* harmony import */ var _rendering_layer_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/rendering/layer-manager */ "./src/rendering/layer-manager.ts");
/* harmony import */ var _scenes_game_scene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/scenes/game-scene */ "./src/scenes/game-scene.ts");
/* harmony import */ var _input_input_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/input/input-manager */ "./src/input/input-manager.ts");
/* harmony import */ var _core_engine_world_manager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/engine/world-manager */ "./src/core/engine/world-manager.ts");
/* harmony import */ var _core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/engine/canvas-token */ "./src/core/engine/canvas-token.ts");
/* harmony import */ var _core_systems_transition_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/systems/transition-manager */ "./src/core/systems/transition-manager.ts");










class OverworldScene extends _scenes_game_scene__WEBPACK_IMPORTED_MODULE_5__.GameScene {
    camera;
    player;
    npcs = [];
    layerManager;
    worldManager;
    transitionManager;
    constructor() {
        super();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.layerManager = gameContext.getBean(_rendering_layer_manager__WEBPACK_IMPORTED_MODULE_4__.LayerManager);
        this.camera = gameContext.getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_3__.Camera);
        this.worldManager = gameContext.getBean(_core_engine_world_manager__WEBPACK_IMPORTED_MODULE_7__.WorldManager);
        this.transitionManager = gameContext.getBean(_core_systems_transition_manager__WEBPACK_IMPORTED_MODULE_9__.TransitionManager);
        this.player = new _game_player_player__WEBPACK_IMPORTED_MODULE_2__.Player();
        this.initializeLayers();
    }
    async onEnter() {
        await this.worldManager.initialize();
        this.initializeLayers();
        this.camera.follow(this.player);
    }
    initializeLayers() {
        _input_input_manager__WEBPACK_IMPORTED_MODULE_6__.Input.initialize();
        this.layerManager.addLayer({
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.BACKGROUND,
            enabled: true,
            update: (delta) => { },
            render: () => {
                this.worldManager.render(_types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.BACKGROUND);
            },
        });
        this.layerManager.addLayer({
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.BACKGROUND_LOW,
            enabled: true,
            update: (delta) => { },
            render: () => {
                this.worldManager.render(_types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.BACKGROUND_LOW);
            },
        });
        this.layerManager.addLayer({
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.BACKGROUND_MED,
            enabled: true,
            update: (delta) => { },
            render: () => {
                this.worldManager.render(_types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.BACKGROUND_MED);
            },
        });
        this.layerManager.addLayer({
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.BACKGROUND_HIGH,
            enabled: true,
            update: (delta) => { },
            render: () => {
                this.worldManager.render(_types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.BACKGROUND_HIGH);
            },
        });
        this.layerManager.addLayer({
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.ENTITIES,
            enabled: true,
            update: (delta) => {
                this.player.update(delta);
                this.npcs.forEach((npc) => npc.update(delta));
                this.camera.update(delta);
            },
            render: () => {
                this.player.render();
                this.npcs.forEach((npc) => npc.render());
            },
        });
        this.layerManager.addLayer({
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.FOREGROUND,
            enabled: true,
            update: (delta) => {
                this.worldManager.update(delta);
            },
            render: () => {
                this.worldManager.render(_types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.FOREGROUND);
            },
        });
        this.layerManager.addLayer({
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_1__.LayerPriority.UI,
            enabled: true,
            update: (delta) => { },
            render: () => {
                //this.drawDebugInfo();
            },
        });
    }
    update(deltaTime) {
        this.layerManager.update(deltaTime);
        this.transitionManager.update(deltaTime);
    }
    render(ctx) {
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        this.layerManager.render();
        this.transitionManager.render();
        ctx.restore();
    }
    drawDebugInfo() {
        this.drawBorderTiles();
    }
    drawBorderTiles() {
        const ctx = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_core_engine_canvas_token__WEBPACK_IMPORTED_MODULE_8__.GAME_CANVAS);
        const tileSize = 32;
        const startCol = 0;
        const startRow = 0;
        const endCol = Math.ceil((this.player.position.x + this.camera.viewport.width) / tileSize);
        const endRow = Math.ceil((this.player.position.y + this.camera.viewport.height) / tileSize);
        ctx.save();
        for (let row = startRow; row < endRow; row++) {
            for (let col = startCol; col < endCol; col++) {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                const x = col * tileSize - this.camera.position.x;
                const y = row * tileSize - this.camera.position.y;
                ctx.strokeRect(x, y, tileSize, tileSize);
                const text = `${row} - ${col}`;
                const textMetrics = ctx.measureText(text);
                const textWidth = textMetrics.width;
                const textHeight = 9;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(x + 2, y + 2, textWidth, textHeight);
                ctx.fillStyle = 'black';
                ctx.font = `9px Arial`;
                ctx.fillText(text, x + 2, y + 10);
            }
        }
        ctx.restore();
    }
}


/***/ }),

/***/ "./src/types/effects.ts":
/*!******************************!*\
  !*** ./src/types/effects.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DoorSequence: () => (/* binding */ DoorSequence),
/* harmony export */   LabDoorSequence: () => (/* binding */ LabDoorSequence),
/* harmony export */   PlayerJumpSequence: () => (/* binding */ PlayerJumpSequence),
/* harmony export */   PlayerMovementSequence: () => (/* binding */ PlayerMovementSequence)
/* harmony export */ });
var PlayerJumpSequence;
(function (PlayerJumpSequence) {
    PlayerJumpSequence["JUMP_DOWN"] = "JUMP_DOWN";
})(PlayerJumpSequence || (PlayerJumpSequence = {}));
var PlayerMovementSequence;
(function (PlayerMovementSequence) {
    PlayerMovementSequence["WALK_UP"] = "WALK_UP";
})(PlayerMovementSequence || (PlayerMovementSequence = {}));
var DoorSequence;
(function (DoorSequence) {
    DoorSequence["OPEN_EFFECT"] = "OPEN_EFFECT";
    DoorSequence["CLOSE_EFFECT"] = "CLOSE_EFFECT";
})(DoorSequence || (DoorSequence = {}));
var LabDoorSequence;
(function (LabDoorSequence) {
    LabDoorSequence["OPEN_EFFECT"] = "OPEN_EFFECT";
    LabDoorSequence["CLOSE_EFFECT"] = "CLOSE_EFFECT";
})(LabDoorSequence || (LabDoorSequence = {}));


/***/ }),

/***/ "./src/types/render-types.ts":
/*!***********************************!*\
  !*** ./src/types/render-types.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayerPriority: () => (/* binding */ LayerPriority)
/* harmony export */ });
var LayerPriority;
(function (LayerPriority) {
    LayerPriority[LayerPriority["BACKGROUND"] = 0] = "BACKGROUND";
    LayerPriority[LayerPriority["BACKGROUND_LOW"] = 10] = "BACKGROUND_LOW";
    LayerPriority[LayerPriority["BACKGROUND_MED"] = 20] = "BACKGROUND_MED";
    LayerPriority[LayerPriority["BACKGROUND_HIGH"] = 30] = "BACKGROUND_HIGH";
    LayerPriority[LayerPriority["TERRAIN"] = 100] = "TERRAIN";
    LayerPriority[LayerPriority["ENTITIES"] = 200] = "ENTITIES";
    LayerPriority[LayerPriority["FOREGROUND"] = 300] = "FOREGROUND";
    LayerPriority[LayerPriority["UI"] = 400] = "UI";
    LayerPriority[LayerPriority["DEBUG"] = 500] = "DEBUG";
})(LayerPriority || (LayerPriority = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_engine_game_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/engine/game-engine */ "./src/core/engine/game-engine.ts");
/* harmony import */ var _html_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html/index */ "./src/html/index.ts");


class GameBootstrapper {
    gameEngine;
    uiElements;
    constructor() {
        this.uiElements = {
            loadingScreen: document.getElementById('loading-screen'),
            progressBar: document.querySelector('.progress'),
            dialogueBox: document.getElementById('dialogue-box'),
            hud: document.getElementById('hud'),
        };
        this.initializeEngine();
        this.setupGlobalListeners();
    }
    initializeEngine() {
        const config = {
            canvasId: 'game-canvas',
            canvasTransicionId: 'transicion-canvas',
            uiElements: this.uiElements,
        };
        this.gameEngine = new _core_engine_game_engine__WEBPACK_IMPORTED_MODULE_0__.GameEngine(config);
        this.startGame();
    }
    async startGame() {
        try {
            await this.gameEngine.initialize();
            this.gameEngine.start();
        }
        catch (error) {
            console.error('Failed to initialize game:', error);
        }
    }
    setupGlobalListeners() {
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('keydown', (e) => this.handleGlobalInput(e));
    }
    handleResize() {
        this.gameEngine.handleResize();
    }
    handleGlobalInput(event) {
        if (event.key === 'Escape') {
            this.togglePauseMenu();
        }
    }
    togglePauseMenu() { }
}
document.addEventListener('DOMContentLoaded', () => new GameBootstrapper());

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map