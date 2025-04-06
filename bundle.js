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
    textures = new Map();
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
        if (this.textures.has(name)) {
            return this.textures.get(name);
        }
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this.textures.set(name, img);
                resolve(img);
            };
            img.onerror = reject;
        });
    }
    getTexture(name) {
        if (!this.textures.has(name)) {
            throw new Error(`Texture '${name}' not loaded`);
        }
        return this.textures.get(name);
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
    getSpriteSheet(name) {
        if (!this.spriteSheets.has(name)) {
            throw new Error(`SpriteSheet '${name}' not loaded`);
        }
        return this.spriteSheets.get(name);
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
    gameScale = 1;
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
            const name = typeof identifier === 'function' ? identifier.name : identifier.name;
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




class GameEngine {
    canvas;
    lastFrameTime = 0;
    gameContext;
    assetManager;
    sceneManager;
    ctx;
    constructor(config) {
        this.canvas = document.getElementById(config.canvasId);
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.gameContext.registerBean(CanvasRenderingContext2D, this.canvas.getContext('2d', { alpha: false }));
        this.assetManager = this.gameContext.getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
        this.sceneManager = this.gameContext.getBean(_core_engine_scene_manager__WEBPACK_IMPORTED_MODULE_2__.SceneManager);
        this.initializeCanvas();
        window.addEventListener('resize', () => this.handleResize());
        this.gameLoop = this.gameLoop.bind(this);
    }
    initializeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.handleResize();
    }
    async initialize() {
        await this.loadAssets();
        this.sceneManager.addScene('overworld', new _scenes_overworld_scene__WEBPACK_IMPORTED_MODULE_3__.OverworldScene());
        await this.sceneManager.switchTo('overworld');
    }
    async loadAssets() {
        await this.assetManager.loadSpriteSheet('player', 'assets/sprites/character_01.png', 32, 32);
        await this.assetManager.loadSpriteSheet('sprites', 'assets/sprites/sprites.png', 16, 16);
    }
    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;
        this.sceneManager.currentScene?.update(deltaTime);
        this.ctx.save();
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.sceneManager.currentScene?.render(this.ctx);
        this.ctx.restore();
        requestAnimationFrame(this.gameLoop);
    }
    start() {
        requestAnimationFrame(this.gameLoop);
    }
    handleResize() {
        const container = document.getElementById('game-container');
        this.canvas.style.transform = `scale(${_core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getGameScale()})`;
        this.canvas.style.transformOrigin = 'top left';
        container.style.width = `${window.innerWidth}px`;
        container.style.height = `${window.innerHeight}px`;
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
    transitionInProgress = false;
    transitionStartTime = 0;
    transitionType = 'fade';
    transitionDuration = 1000;
    transitionColor = '#000000';
    transitionDirection = 'left';
    constructor() { }
    addScene(name, scene) {
        this.scenes.set(name, scene);
        scene.setSceneManager(this);
    }
    // TODO: Not fully implemented yet
    async switchTo(name, options = {}) {
        if (this.transitionInProgress || !this.scenes.has(name))
            return;
        const nextScene = this.scenes.get(name);
        this.transitionInProgress = true;
        this.transitionType = options.type || 'fade';
        this.transitionDuration = options.duration || 1000;
        this.transitionColor = options.color || '#000000';
        this.transitionDirection = options.direction || 'left';
        this.transitionStartTime = performance.now();
        await this.playTransitionOut();
        if (this.currentScene) {
            await this.currentScene.onExit();
        }
        this.currentScene = nextScene;
        await this.currentScene.onEnter();
        await this.playTransitionIn();
        this.transitionInProgress = false;
    }
    async playTransitionOut() {
        return new Promise((resolve) => {
            setTimeout(resolve, this.transitionDuration / 2);
        });
    }
    async playTransitionIn() {
        return new Promise((resolve) => {
            setTimeout(resolve, this.transitionDuration / 2);
        });
    }
    update(deltaTime) {
        if (this.transitionInProgress) {
            this.updateTransition(deltaTime);
        }
        else {
            this.currentScene?.update(deltaTime);
        }
    }
    render(ctx) {
        this.currentScene?.render(ctx);
        if (this.transitionInProgress) {
            this.renderTransition(ctx);
        }
    }
    // TODO: Make it work
    updateTransition(deltaTime) {
        const elapsed = performance.now() - this.transitionStartTime;
        const progress = Math.min(elapsed / this.transitionDuration, 1);
        switch (this.transitionType) {
            case 'fade':
                break;
            case 'slide':
                break;
        }
    }
    // TODO: Make it work
    renderTransition(ctx) {
        const elapsed = performance.now() - this.transitionStartTime;
        const progress = Math.min(elapsed / this.transitionDuration, 1);
        ctx.save();
        ctx.globalAlpha = this.transitionType === 'fade'
            ? Math.min(progress * 2, 1)
            : 1;
        switch (this.transitionType) {
            case 'fade':
                ctx.fillStyle = this.transitionColor;
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                break;
            case 'slide':
                const offset = progress * ctx.canvas.width;
                ctx.translate(this.transitionDirection === 'left' ? -offset : offset, 0);
                break;
        }
        ctx.restore();
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
            y: Math.floor(y / tileSize)
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
/* harmony export */   EffectSystem: () => (/* binding */ EffectSystem),
/* harmony export */   EffectTrigger: () => (/* binding */ EffectTrigger)
/* harmony export */ });
/* harmony import */ var _engine_game_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");


class EffectSystem {
    triggers = [];
    cooldowns = new Map();
    addTrigger(trigger) {
        this.triggers.push(trigger);
    }
    update(playerPos, deltaTime) {
        this.triggers.forEach((trigger) => {
            const lastActivation = this.cooldowns.get(trigger) || 0;
            const camera = _engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_1__.Camera);
            if ((Date.now() - lastActivation > trigger.cooldown &&
                trigger.conditions.every((c) => c.isMet(playerPos, camera)))) {
                trigger.action.execute(deltaTime);
                this.cooldowns.set(trigger, Date.now());
            }
        });
    }
}
class EffectTrigger {
    conditions;
    action;
    cooldown;
    constructor(conditions, action, cooldown = 0) {
        this.conditions = conditions;
        this.action = action;
        this.cooldown = cooldown;
    }
}


/***/ }),

/***/ "./src/effects-triggers/area.ts":
/*!**************************************!*\
  !*** ./src/effects-triggers/area.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AreaTrigger: () => (/* binding */ AreaTrigger)
/* harmony export */ });
class AreaTrigger {
    area;
    tileSize;
    constructor(area, tileSize) {
        this.area = area;
        this.tileSize = tileSize;
    }
    isMet(playerPos) {
        return (playerPos.x >= this.area.x * this.tileSize &&
            playerPos.x <= (this.area.x + this.area.width) * this.tileSize &&
            playerPos.y >= this.area.y * this.tileSize &&
            playerPos.y <= (this.area.y + this.area.height) * this.tileSize);
    }
}


/***/ }),

/***/ "./src/effects-triggers/composite.ts":
/*!*******************************************!*\
  !*** ./src/effects-triggers/composite.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeTrigger: () => (/* binding */ CompositeTrigger)
/* harmony export */ });
class CompositeTrigger {
    conditions;
    constructor(conditions) {
        this.conditions = conditions;
    }
    isMet(...args) {
        return this.conditions.every((condition) => condition.isMet(...args));
    }
}


/***/ }),

/***/ "./src/effects-triggers/keypress.ts":
/*!******************************************!*\
  !*** ./src/effects-triggers/keypress.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyPressTrigger: () => (/* binding */ KeyPressTrigger)
/* harmony export */ });
/* harmony import */ var _input_input_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/input/input-manager */ "./src/input/input-manager.ts");

class KeyPressTrigger {
    key;
    pressed;
    constructor(key) {
        this.key = key;
    }
    isMet() {
        if (_input_input_manager__WEBPACK_IMPORTED_MODULE_0__.Input.isKeyDown(this.key))
            this.pressed = true;
        return this.pressed;
    }
}


/***/ }),

/***/ "./src/game/effects/door-open.ts":
/*!***************************************!*\
  !*** ./src/game/effects/door-open.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DoorOpenEffect: () => (/* binding */ DoorOpenEffect),
/* harmony export */   DoorSecuence: () => (/* binding */ DoorSecuence)
/* harmony export */ });
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");
/* harmony import */ var _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/rendering/sprite-sheet */ "./src/rendering/sprite-sheet.ts");
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./effect */ "./src/game/effects/effect.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");




var DoorSecuence;
(function (DoorSecuence) {
    DoorSecuence["OPEN_EFFECT"] = "OPEN_EFFECT";
    DoorSecuence["CLOSE_EFFECT"] = "CLOSE_EFFECT";
})(DoorSecuence || (DoorSecuence = {}));
class DoorOpenEffect extends _effect__WEBPACK_IMPORTED_MODULE_2__.Effect {
    sprite;
    flipX = false;
    scale;
    constructor(x, y, scale) {
        super(x, y);
        this.scale = scale;
        const spriteSheet = this.assetManager.getSpriteSheet("sprites");
        this.configureAnimations(spriteSheet);
        this.sprite = new _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_1__.AnimatedSprite(spriteSheet);
        this.sprite.play("closed");
    }
    configureAnimations(spriteSheet) {
        spriteSheet.defineAnimation({
            name: "closed",
            frames: [19442, 19443],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: "little_opened",
            frames: [19446, 19447],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: "almost_opened",
            frames: [19448, 19449],
            frameRate: 0,
            loop: false,
        });
        spriteSheet.defineAnimation({
            name: "opened",
            frames: [19444, 19445],
            frameRate: 0,
            loop: false,
        });
        this.animationSecuences.set(DoorSecuence.OPEN_EFFECT, {
            duraction: 1,
            animations: ["closed", "little_opened", "almost_opened", "opened"],
            quantity: 1,
        });
    }
    update(deltaTime) {
        this.sprite.update(deltaTime);
    }
    render() {
        const frame = this.sprite.getCurrentFrame();
        const ctx = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_3__.GameContext.getInstance().getBean(CanvasRenderingContext2D);
        const camera = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_3__.GameContext.getInstance().getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_0__.Camera);
        const screenPos = {
            x: Math.ceil(this.position.x - camera.position.x - (frame.width * this.scale) / 2),
            y: Math.ceil(this.position.y - camera.position.y - (frame.height * this.scale) / 2),
        };
        this.sprite.spriteSheet.draw(ctx, frame, screenPos.x, screenPos.y, this.flipX, this.scale);
    }
    playSequence(secuence, deltaTime) {
        if (secuence == DoorSecuence.OPEN_EFFECT) {
            this.sprite.playSequence(deltaTime, 0.5, ["closed", "little_opened", "almost_opened", "opened"], 1);
        }
        this.sprite.update(deltaTime);
    }
}


/***/ }),

/***/ "./src/game/effects/effect.ts":
/*!************************************!*\
  !*** ./src/game/effects/effect.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Effect: () => (/* binding */ Effect)
/* harmony export */ });
/* harmony import */ var _assets_assetsManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/assets/assetsManager */ "./src/assets/assetsManager.ts");
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");


class Effect {
    position;
    assetManager;
    animationSecuences = new Map();
    constructor(x, y) {
        this.position = { x, y };
        this.assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_0__.AssetManager);
    }
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
/* harmony import */ var _game_effects_door_open__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/game/effects/door-open */ "./src/game/effects/door-open.ts");
/* harmony import */ var _effects_triggers_area__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/effects-triggers/area */ "./src/effects-triggers/area.ts");
/* harmony import */ var _effects_triggers_keypress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/effects-triggers/keypress */ "./src/effects-triggers/keypress.ts");
/* harmony import */ var _effects_triggers_composite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/effects-triggers/composite */ "./src/effects-triggers/composite.ts");








async function createLittleRootTown() {
    const assetManager = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_1__.AssetManager);
    const sprites = assetManager.getSpriteSheet("sprites");
    const appScale = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance().getTilesScale();
    const doorEffect = new _game_effects_door_open__WEBPACK_IMPORTED_MODULE_4__.DoorOpenEffect(304, 324, appScale);
    const areaCondition = new _effects_triggers_area__WEBPACK_IMPORTED_MODULE_5__.AreaTrigger({ x: 9, y: 11, width: 1, height: 1 }, 32);
    const keyCondition = new _effects_triggers_keypress__WEBPACK_IMPORTED_MODULE_6__.KeyPressTrigger("ArrowUp");
    const compositeCondition = new _effects_triggers_composite__WEBPACK_IMPORTED_MODULE_7__.CompositeTrigger([
        areaCondition,
        keyCondition,
    ]);
    return (new _rendering_tile_map_builder__WEBPACK_IMPORTED_MODULE_2__.TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer("collision", 29, 27, true, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
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
        .createLayer("ground", 29, 27, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.BACKGROUND)
        .fillArea(2246, 0, 0, 32, 32)
        .createLayer("trees", 900, 900, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        //line right
        .buildSpriteObjectRow([176, 177, 178, 179], 0, 0, -35, 0, 6)
        .buildSpriteObjectRow([176, 177, 178, 179], 0, 24, -244, 0, 5)
        // line right
        .buildSpriteObjectRow([144, 145, 146, 147], 1, 0, -35, -5, 6)
        .buildSpriteObjectRow([160, 161, 162, 163], 2, 0, -35, -5, 6)
        .buildSpriteObjectRow([176, 177, 178, 179], 3, 0, -35, -5, 6)
        // line right
        .buildSpriteObjectRow([144, 145, 146, 147], 4, 0, -35, -5, 2)
        .buildSpriteObjectRow([160, 161, 162, 163], 5, 0, -35, -5, 2)
        .buildSpriteObjectRow([176, 177, 178, 179], 6, 0, -35, -5, 2)
        // line right
        .buildSpriteObjectRow([144, 145, 146, 147], 7, 0, -35, -5, 1)
        .buildSpriteObjectRow([160, 161, 162, 163], 8, 0, -35, -5, 1)
        .buildSpriteObjectRow([176, 177, 178, 179], 9, 0, -35, -5, 1)
        // line right
        .buildSpriteObjectRow([144, 145, 146, 147], 10, 0, -35, -5, 1)
        .buildSpriteObjectRow([160, 161, 162, 163], 11, 0, -35, -5, 1)
        .buildSpriteObjectRow([176, 177, 178, 179], 12, 0, -35, -5, 1)
        // line right
        .buildSpriteObjectRow([144, 145, 146, 147], 13, 0, -35, -5, 1)
        .buildSpriteObjectRow([160, 161, 162, 163], 14, 0, -35, -5, 1)
        .buildSpriteObjectRow([176, 177, 178, 179], 15, 0, -35, -5, 1)
        // line right
        .buildSpriteObjectRow([144, 145, 146, 147], 16, 0, -35, -5, 1)
        .buildSpriteObjectRow([160, 161, 162, 163], 17, 0, -35, -5, 1)
        .buildSpriteObjectRow([176, 177, 178, 179], 18, 0, -35, -5, 1)
        // line right
        .buildSpriteObjectRow([144, 145, 146, 147], 19, 0, -35, -5, 1)
        .buildSpriteObjectRow([160, 161, 162, 163], 20, 0, -35, -5, 1)
        .buildSpriteObjectRow([176, 177, 178, 179], 21, 0, -35, -5, 1)
        // line right
        .buildSpriteObjectRow([144, 145, 146, 147], 22, 0, -35, -5, 2)
        .buildSpriteObjectRow([160, 161, 162, 163], 23, 0, -35, -5, 2)
        .buildSpriteObjectRow([176, 177, 178, 179], 24, 0, -35, -5, 2)
        // line right
        .buildSpriteObjectRow([144, 145, 146, 147], 25, 0, -35, -5, 12)
        .buildSpriteObjectRow([160, 161, 162, 163], 26, 0, -35, -5, 12)
        .buildSpriteObjectRow([176, 177, 178, 179], 27, 0, -35, -5, 12)
        // line left
        .buildSpriteObjectRow([144, 145, 146, 147], 1, 24, -244, -5, 5)
        .buildSpriteObjectRow([160, 161, 162, 163], 2, 24, -244, -5, 5)
        .buildSpriteObjectRow([176, 177, 178, 179], 3, 24, -244, -5, 5)
        // line left
        .buildSpriteObjectRow([144, 145, 146, 147], 4, 31, -228, -10, 2)
        .buildSpriteObjectRow([160, 161, 162, 163], 5, 31, -228, -10, 2)
        .buildSpriteObjectRow([176, 177, 178, 179], 6, 31, -228, -10, 2)
        // line left
        .buildSpriteObjectRow([144, 145, 146, 147], 7, 31, -148, -10, 1)
        .buildSpriteObjectRow([160, 161, 162, 163], 8, 31, -148, -10, 1)
        .buildSpriteObjectRow([176, 177, 178, 179], 9, 31, -148, -10, 1)
        // line left
        .buildSpriteObjectRow([144, 145, 146, 147], 10, 31, -148, -10, 1)
        .buildSpriteObjectRow([160, 161, 162, 163], 11, 31, -148, -10, 1)
        .buildSpriteObjectRow([176, 177, 178, 179], 12, 31, -148, -10, 1)
        // line left
        .buildSpriteObjectRow([144, 145, 146, 147], 13, 31, -148, -10, 1)
        .buildSpriteObjectRow([160, 161, 162, 163], 14, 31, -148, -10, 1)
        .buildSpriteObjectRow([176, 177, 178, 179], 15, 31, -148, -10, 1)
        // line left
        .buildSpriteObjectRow([144, 145, 146, 147], 16, 31, -148, -10, 1)
        .buildSpriteObjectRow([160, 161, 162, 163], 17, 31, -148, -10, 1)
        .buildSpriteObjectRow([176, 177, 178, 179], 18, 31, -148, -10, 1)
        // line left
        .buildSpriteObjectRow([144, 145, 146, 147], 19, 31, -228, -10, 2)
        .buildSpriteObjectRow([160, 161, 162, 163], 20, 31, -228, -10, 2)
        .buildSpriteObjectRow([176, 177, 178, 179], 21, 31, -228, -10, 2)
        // line left
        .buildSpriteObjectRow([144, 145, 146, 147], 22, 31, -308, -10, 3)
        .buildSpriteObjectRow([160, 161, 162, 163], 23, 31, -308, -10, 3)
        .buildSpriteObjectRow([176, 177, 178, 179], 24, 31, -308, -10, 3)
        .createLayer("signs", 29, 27, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
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
        .createLayer("houses", 29, 27, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
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
        [15840, 15841, 15842, 15843, 15844, 15845, 15846, 15847, 15848],
        [15856, 15857, 15858, 15859, 15860, 15861, 15862, 15863, 15864],
        [15872, 15873, 15874, 15875, 15876, 15877, 15878, 15879, 15880],
        [15888, 15889, 15890, 15891, 15892, 15893, 15894, 15895, 15896],
        [15904, 15905, 15906, 15907, 15908, 15909, 15910, 15911, 15912],
        [15920, 15921, 15922, 15923, 15924, 15925, 15926, 15927, 15928],
        [15936, 15937, 15938, 15939, 15940, 15941, 15942, 15943, 15944],
        [15952, 15953, 15954, 15955, 15956, 15957, 15958, 15959, 15960],
    ], 15, 8, false, -20, -10)
        .createLayer("effects", 29, 27, false, _types_render_types__WEBPACK_IMPORTED_MODULE_3__.LayerPriority.FOREGROUND)
        .addEffectTrigger(doorEffect, [compositeCondition])
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
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
/* harmony import */ var _core_systems_collision_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/systems/collision-system */ "./src/core/systems/collision-system.ts");
/* harmony import */ var _input_input_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/input/input-manager */ "./src/input/input-manager.ts");
/* harmony import */ var _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/rendering/sprite-sheet */ "./src/rendering/sprite-sheet.ts");





class Player {
    position;
    sprite;
    targetPosition;
    isMoving = false;
    currentAnimation = "idle";
    flipX = false;
    tileSize;
    scale;
    movementSpeed = 180;
    isAligning = false;
    alignProgress = 0;
    alignAnimationDuration = 0;
    currentAlignDirection = { x: 0, y: 0 };
    lastDirection = { x: 0, y: 0 };
    assetManager;
    collisionSystem;
    constructor() {
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__.GameContext.getInstance();
        this.tileSize = gameContext.getTileSize();
        this.scale = gameContext.getTilesScale();
        this.assetManager = gameContext.getBean(_assets_assetsManager__WEBPACK_IMPORTED_MODULE_0__.AssetManager);
        this.collisionSystem = gameContext.getBean(_core_systems_collision_system__WEBPACK_IMPORTED_MODULE_2__.CollisionSystem);
        this.position = this.snapToTileCenter({ x: 500, y: 500 });
        this.targetPosition = { ...this.position };
        this.configureAnimations(this.assetManager.getSpriteSheet("player"));
        this.sprite = new _rendering_sprite_sheet__WEBPACK_IMPORTED_MODULE_4__.AnimatedSprite(this.assetManager.getSpriteSheet("player"));
        this.sprite.play("idle");
    }
    configureAnimations(spriteSheet) {
        spriteSheet.defineAnimation({
            name: "idle",
            frames: [0, 0],
            frameRate: 8,
            loop: true
        });
        spriteSheet.defineAnimation({
            name: "walk-left",
            frames: [2, 5, 2, 5],
            frameRate: 8,
            loop: true
        });
        spriteSheet.defineAnimation({
            name: "walk-up",
            frames: [4, 7, 4, 7],
            frameRate: 8,
            loop: true
        });
        spriteSheet.defineAnimation({
            name: "walk-down",
            frames: [3, 6, 3],
            frameRate: 8,
            loop: true
        });
        spriteSheet.defineAnimation({
            name: "left-align",
            frames: [2, 5],
            frameRate: 16,
            loop: true
        });
        spriteSheet.defineAnimation({
            name: "up-align",
            frames: [1, 7],
            frameRate: 16,
            loop: true
        });
        spriteSheet.defineAnimation({
            name: "down-align",
            frames: [0, 3],
            frameRate: 16,
            loop: true
        });
    }
    snapToTileCenter(position) {
        return {
            x: Math.floor(position.x / this.tileSize) * this.tileSize + this.tileSize / 2,
            y: Math.floor(position.y / this.tileSize) * this.tileSize + this.tileSize / 2
        };
    }
    getCurrentTile() {
        return {
            x: Math.floor(this.position.x / this.tileSize),
            y: Math.floor(this.position.y / this.tileSize)
        };
    }
    update(deltaTime) {
        const deltaSeconds = deltaTime / 1000;
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
            const direction = _input_input_manager__WEBPACK_IMPORTED_MODULE_3__.Input.movementDirection;
            if (direction.x !== 0 || direction.y !== 0) {
                if (direction.x !== this.lastDirection.x || direction.y !== this.lastDirection.y) {
                    this.playAlignAnimation(direction);
                    this.lastDirection = direction;
                    this.currentAlignDirection = direction;
                    this.isAligning = true;
                }
                else {
                    this.startMovement(direction);
                }
                this.lastDirection = direction;
            }
        }
        if (this.isMoving) {
            this.moveTowardsTarget(deltaSeconds);
            this.sprite.update(deltaTime);
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
            this.sprite.play(this.currentAnimation);
        }
    }
    updateMovementAnimation(direction) {
        if (direction.x !== 0) {
            this.flipX = direction.x > 0;
            this.sprite.play("walk-left");
            this.currentAnimation = 'walk-left';
        }
        else if (direction.y > 0) {
            this.sprite.play("walk-down");
            this.currentAnimation = 'walk-down';
        }
        else if (direction.y < 0) {
            this.sprite.play("walk-up");
            this.currentAnimation = 'walk-up';
        }
    }
    playAlignAnimation(direction) {
        let animationName = "";
        if (direction.x > 0) {
            animationName = "left-align";
            this.flipX = true;
        }
        else if (direction.x < 0) {
            animationName = "left-align";
            this.flipX = false;
        }
        else if (direction.y > 0) {
            animationName = "down-align";
        }
        else if (direction.y < 0) {
            animationName = "up-align";
        }
        this.sprite.play(animationName);
        this.currentAnimation = animationName;
        const animation = this.sprite.spriteSheet.getAnimation(animationName);
        this.alignAnimationDuration = (animation.frames.length / animation.frameRate) * 1000;
    }
    startMovement(direction) {
        const currentTile = this.getCurrentTile();
        const targetTile = {
            x: currentTile.x + direction.x,
            y: currentTile.y + direction.y
        };
        if (this.collisionSystem.isColliding(targetTile.x * this.tileSize, targetTile.y * this.tileSize)) {
            return;
        }
        this.targetPosition = {
            x: targetTile.x * this.tileSize + this.tileSize / 2,
            y: targetTile.y * this.tileSize + this.tileSize / 2
        };
        this.isMoving = true;
        this.updateMovementAnimation(direction);
    }
    render(ctx, camera) {
        const frame = this.sprite.getCurrentFrame();
        const screenPos = {
            x: this.position.x - camera.position.x - (frame.width * this.scale) / 2,
            y: this.position.y - camera.position.y - (frame.height * this.scale) / 2
        };
        this.sprite.spriteSheet.draw(ctx, frame, screenPos.x, screenPos.y, this.flipX, this.scale);
    }
}


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
        window.addEventListener("keydown", (e) => {
            this.keys.set(e.key, true);
            if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
                if (!this.directionOrder.includes(e.key)) {
                    this.directionOrder.push(e.key);
                }
            }
        });
        window.addEventListener("keyup", (e) => {
            this.keys.set(e.key, false);
            if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
                this.directionOrder = this.directionOrder.filter(key => key !== e.key);
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
            case "ArrowRight":
                return { x: 1, y: 0 };
            case "ArrowLeft":
                return { x: -1, y: 0 };
            case "ArrowDown":
                return { x: 0, y: 1 };
            case "ArrowUp":
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
/* harmony import */ var _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/engine/game-context */ "./src/core/engine/game-context.ts");
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
    bounds = { minX: 0, minY: 0, maxX: Infinity, maxY: Infinity };
    constructor() {
        this.viewport = {
            width: window.innerWidth * 0.7,
            height: window.innerHeight * 0.8,
        };
    }
    setBounds(mapWidth, mapHeight) {
        this.bounds = {
            minX: 0,
            minY: 0,
            maxX: Math.max(mapWidth - this.viewport.width, 0),
            maxY: Math.max(mapHeight - this.viewport.height, 0),
        };
    }
    follow(target) {
        this.target = target;
    }
    update(deltaTime) {
        if (!this.target)
            return;
        const ctx = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_1__.GameContext.getInstance().getBean(CanvasRenderingContext2D);
        const targetX = this.target.position.x - ctx.canvas.width / 2;
        const targetY = this.target.position.y - ctx.canvas.height / 2;
        const offsetX = (ctx.canvas.width - this.viewport.width) / 2;
        const offsetY = (ctx.canvas.height - this.viewport.height) / 2;
        const clampedX = this.clamp(targetX, this.bounds.minX - offsetX, this.bounds.maxX - offsetX);
        const clampedY = this.clamp(targetY, this.bounds.minY - offsetY, this.bounds.maxY - offsetY);
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
    addLayer(name, layer) {
        this.layers.set(name, layer);
        this.sortLayers();
    }
    removeLayer(name) {
        this.layers.delete(name);
        this.sortLayers();
    }
    getLayer(name) {
        return this.layers.get(name);
    }
    sortLayers() {
        this.sortedLayers = Array.from(this.layers.values())
            .filter(layer => layer.enabled)
            .sort((a, b) => a.priority - b.priority);
    }
    update(deltaTime) {
        this.sortedLayers.forEach(layer => layer.update(deltaTime));
    }
    render(ctx) {
        this.sortedLayers.forEach(layer => layer.render(ctx));
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
    frameWidth;
    frameHeight;
    frames = [];
    animations = new Map();
    constructor(image, frameWidth, frameHeight, padding = 0) {
        this.image = image;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.generateFrames(padding);
    }
    generateFrames(padding) {
        const cols = Math.floor(this.image.width / (this.frameWidth + padding));
        const rows = Math.floor(this.image.height / (this.frameHeight + padding));
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                this.frames.push({
                    x: x * (this.frameWidth + padding),
                    y: y * (this.frameHeight + padding),
                    width: this.frameWidth,
                    height: this.frameHeight,
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
    getFrame(frameIndex) {
        if (frameIndex < 0 || frameIndex >= this.frames.length) {
            throw new Error(`Invalid frame index: ${frameIndex}`);
        }
        return this.frames[frameIndex];
    }
    getAnimation(name) {
        const animation = this.animations.get(name);
        if (!animation) {
            throw new Error(`Animation '${name}' not found`);
        }
        return animation;
    }
    draw(ctx, frame, x, y, flipX = false, scale = 1) {
        ctx.save();
        if (flipX) {
            ctx.scale(-1, 1);
            x = -x - this.frameWidth * scale;
        }
        ctx.drawImage(this.image, frame.x, frame.y, frame.width, frame.height, x, y, this.frameWidth * scale, this.frameHeight * scale);
        ctx.restore();
    }
    get width() {
        return this.frameWidth;
    }
    get height() {
        return this.frameHeight;
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
            this.currentAnimation = this.spriteSheet.getAnimation(animationName);
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
                this.currentFrameIndex = this.currentAnimation.frames.length - 1;
                this.isPlaying = false;
            }
        }
    }
    getCurrentFrame() {
        if (!this.currentAnimation) {
            return this.spriteSheet.getFrame(0);
        }
        const actualFrame = this.currentAnimation.frames[this.currentFrameIndex];
        return this.spriteSheet.getFrame(actualFrame);
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
/* harmony import */ var _game_effects_door_open__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/game/effects/door-open */ "./src/game/effects/door-open.ts");
/* harmony import */ var _core_systems_effect_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/systems/effect-system */ "./src/core/systems/effect-system.ts");



class TileMapBuilder {
    layers = [];
    currentLayer = null;
    tileset;
    tileSize;
    scale;
    effectSystem = new _core_systems_effect_system__WEBPACK_IMPORTED_MODULE_2__.EffectSystem();
    constructor(tileSize = 16, scale = 2) {
        this.tileSize = tileSize;
        this.scale = scale;
    }
    addEffectTrigger(effect, conditions, cooldown = 0) {
        this.effectSystem.addTrigger(new _core_systems_effect_system__WEBPACK_IMPORTED_MODULE_2__.EffectTrigger(conditions, {
            execute: (deltaTime) => effect.playSequence(_game_effects_door_open__WEBPACK_IMPORTED_MODULE_1__.DoorSecuence.OPEN_EFFECT, deltaTime),
            render: () => {
                effect.render();
            }
        }, cooldown));
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
            throw new Error("No layer selected");
        frames.forEach((frame, index) => {
            const row = startRow + index;
            this.currentLayer.data[row][column].tile = frame;
        });
        return this;
    }
    buildSpriteRow(frames, row, startColumn, offsetX = 0, offsetY = 0) {
        if (!this.currentLayer)
            throw new Error("No layer selected");
        frames.forEach((frame, index) => {
            const column = startColumn + index;
            this.currentLayer.data[row][column].tile = frame;
            this.currentLayer.data[row][column].offsetX = offsetX;
            this.currentLayer.data[row][column].offsetY = offsetY;
        });
        return this;
    }
    buildSingleSprite(frame, row, column, flipX = false, offsetX = 0, offsetY = 0) {
        if (!this.currentLayer)
            throw new Error("No layer selected");
        this.currentLayer.data[row][column].tile = frame;
        this.currentLayer.data[row][column].flipX = flipX;
        this.currentLayer.data[row][column].offsetX = offsetX;
        this.currentLayer.data[row][column].offsetY = offsetY;
        return this;
    }
    buildSpriteObject(frames, row, column, flipX = false, offsetX = 0, offsetY = 0) {
        if (!this.currentLayer)
            throw new Error("No layer selected");
        for (let i = 0; i < frames.length; i++) {
            const rowObject = frames[i];
            const numColumns = rowObject.length;
            for (let j = 0; j < numColumns; j++) {
                const frame = rowObject[j];
                const targetColumn = flipX ? column + (numColumns - 1 - j) : column + j;
                this.currentLayer.data[row + i][targetColumn].tile = frame;
                this.currentLayer.data[row + i][targetColumn].flipX = flipX;
                this.currentLayer.data[row + i][targetColumn].offsetX = offsetX;
                this.currentLayer.data[row + i][targetColumn].offsetY = offsetY;
            }
        }
        return this;
    }
    buildSpriteObjectRow(frames, row, startColumn, offsetX = 0, offsetY = 0, cantidad) {
        if (!this.currentLayer)
            throw new Error("No layer selected");
        frames.forEach((frame, index) => {
            const column = startColumn + index;
            for (let i = 0; i < cantidad; i++) {
                this.currentLayer.data[row][column + i * frames.length].tile = frame;
                this.currentLayer.data[row][column + i * frames.length].offsetX =
                    offsetX - i * frames.length * 12;
                this.currentLayer.data[row][column + i * frames.length].offsetY =
                    offsetY;
            }
        });
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
            throw new Error("No layer selected");
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
    build() {
        if (!this.tileset)
            throw new Error("Tileset not configured");
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
class TileMap {
    layers;
    tileset;
    tileSize;
    scale;
    effectSystem;
    constructor(layers, tileset, tileSize, scale, effectSystem) {
        this.layers = layers;
        this.tileset = tileset;
        this.tileSize = tileSize;
        this.scale = scale;
        this.effectSystem = effectSystem;
    }
    get scaledTileSize() {
        return this.tileSize * this.scale;
    }
    getMapWidth() {
        const maxWidth = Math.max(this.layers[1].data[0].length || 0);
        return maxWidth * this.scaledTileSize;
    }
    getMapHeight() {
        const maxHeight = Math.max(this.layers[1].data.length || 0);
        return maxHeight * this.scaledTileSize;
    }
    update(deltaTime, playerPos) {
        this.effectSystem.update(playerPos, deltaTime);
    }
    render(ctx, camera, priority) {
        const tilesPerRow = Math.floor(this.tileset.getImage().width / this.tileset.width);
        this.layers.forEach((layer) => {
            if (!layer.visible || layer.priority !== priority)
                return;
            for (let y = 0; y < layer.data.length; y++) {
                for (let x = 0; x < layer.data[y].length; x++) {
                    const tile = layer.data[y][x];
                    const tileId = tile.tile;
                    if (tileId === -1)
                        continue;
                    const sourceX = (tileId % tilesPerRow) * this.tileset.width;
                    const sourceY = Math.floor(tileId / tilesPerRow) * this.tileset.height;
                    const screenX = Math.ceil(x * this.scaledTileSize - camera.position.x);
                    const screenY = Math.ceil(y * this.scaledTileSize - camera.position.y);
                    const offsetX = tile.offsetX;
                    const offsetY = tile.offsetY;
                    if (tile.flipX) {
                        ctx.save();
                        ctx.translate(screenX + offsetX + this.scaledTileSize, screenY + offsetY);
                        ctx.scale(-1, 1);
                        ctx.drawImage(this.tileset.getImage(), sourceX, sourceY, this.tileset.width, this.tileset.height, 0, 0, this.scaledTileSize, this.scaledTileSize);
                        ctx.restore();
                    }
                    else {
                        ctx.drawImage(this.tileset.getImage(), sourceX, sourceY, this.tileset.width, this.tileset.height, screenX + offsetX, screenY + offsetY, this.scaledTileSize, this.scaledTileSize);
                    }
                }
            }
        });
        this.effectSystem.triggers.forEach((trigger) => {
            trigger.action.render();
        });
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
    transitionTo(sceneName, options) {
        this.sceneManager?.switchTo(sceneName, options);
    }
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
/* harmony import */ var _core_systems_collision_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/systems/collision-system */ "./src/core/systems/collision-system.ts");
/* harmony import */ var _types_render_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/types/render-types */ "./src/types/render-types.ts");
/* harmony import */ var _game_map_littleroot_town_littleroot_town__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/game/map/littleroot_town/littleroot-town */ "./src/game/map/littleroot_town/littleroot-town.ts");
/* harmony import */ var _game_player_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/game/player/player */ "./src/game/player/player.ts");
/* harmony import */ var _rendering_camera__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/rendering/camera */ "./src/rendering/camera.ts");
/* harmony import */ var _rendering_layer_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/rendering/layer-manager */ "./src/rendering/layer-manager.ts");
/* harmony import */ var _scenes_game_scene__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/scenes/game-scene */ "./src/scenes/game-scene.ts");
/* harmony import */ var _input_input_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/input/input-manager */ "./src/input/input-manager.ts");









class OverworldScene extends _scenes_game_scene__WEBPACK_IMPORTED_MODULE_7__.GameScene {
    camera;
    player;
    tileMap;
    npcs = [];
    lastExecutionTime = Date.now();
    layerManager;
    collisionSystem;
    constructor() {
        super();
        const gameContext = _core_engine_game_context__WEBPACK_IMPORTED_MODULE_0__.GameContext.getInstance();
        this.layerManager = gameContext.getBean(_rendering_layer_manager__WEBPACK_IMPORTED_MODULE_6__.LayerManager);
        this.collisionSystem = gameContext.getBean(_core_systems_collision_system__WEBPACK_IMPORTED_MODULE_1__.CollisionSystem);
        this.camera = gameContext.getBean(_rendering_camera__WEBPACK_IMPORTED_MODULE_5__.Camera);
        this.player = new _game_player_player__WEBPACK_IMPORTED_MODULE_4__.Player();
        this.initializeLayers();
    }
    async onEnter() {
        await this.loadMap();
        this.initializeLayers();
        this.camera.follow(this.player);
    }
    async loadMap() {
        this.tileMap = await (0,_game_map_littleroot_town_littleroot_town__WEBPACK_IMPORTED_MODULE_3__.createLittleRootTown)();
        this.collisionSystem.setTileMap(this.tileMap);
        this.camera.setBounds(this.tileMap.getMapWidth(), this.tileMap.getMapHeight());
    }
    initializeLayers() {
        _input_input_manager__WEBPACK_IMPORTED_MODULE_8__.Input.initialize();
        this.layerManager.addLayer("background", {
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.BACKGROUND,
            enabled: true,
            update: (delta) => { },
            render: (ctx) => {
                this.tileMap.render(ctx, this.camera, _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.BACKGROUND);
            },
        });
        this.layerManager.addLayer("background_low", {
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.BACKGROUND_LOW,
            enabled: true,
            update: (delta) => { },
            render: (ctx) => {
                this.tileMap.render(ctx, this.camera, _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.BACKGROUND_LOW);
            },
        });
        this.layerManager.addLayer("background_med", {
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.BACKGROUND_MED,
            enabled: true,
            update: (delta) => { },
            render: (ctx) => {
                this.tileMap.render(ctx, this.camera, _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.BACKGROUND_MED);
            },
        });
        this.layerManager.addLayer("entities", {
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.ENTITIES,
            enabled: true,
            update: (delta) => {
                this.player.update(delta);
                this.npcs.forEach((npc) => npc.update(delta));
                this.camera.update(delta);
            },
            render: (ctx) => {
                this.player.render(ctx, this.camera);
                this.npcs.forEach((npc) => npc.render(ctx, this.camera));
            },
        });
        this.layerManager.addLayer("foreground", {
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.FOREGROUND,
            enabled: true,
            update: (delta) => {
                this.tileMap.update(delta, this.player.position);
            },
            render: (ctx) => {
                this.tileMap.render(ctx, this.camera, _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.FOREGROUND);
            },
        });
        this.layerManager.addLayer("ui", {
            priority: _types_render_types__WEBPACK_IMPORTED_MODULE_2__.LayerPriority.UI,
            enabled: true,
            update: (delta) => {
            },
            render: (ctx) => {
                this.drawDebugInfo(ctx);
            },
        });
    }
    update(deltaTime) {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - this.lastExecutionTime) / 1000;
        if (elapsedTime >= 10) {
            console.log("Scene Update - Delta:", deltaTime);
            this.lastExecutionTime = currentTime;
        }
        this.layerManager.update(deltaTime);
    }
    render(ctx) {
        const offsetX = (ctx.canvas.width - this.camera.viewport.width) / 2;
        const offsetY = (ctx.canvas.height - this.camera.viewport.height) / 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(offsetX, offsetY, this.camera.viewport.width, this.camera.viewport.height);
        ctx.clip();
        ctx.imageSmoothingEnabled = false;
        this.layerManager.render(ctx);
        ctx.restore();
    }
    drawDebugInfo(ctx) {
        //this.drawCameraBorders(ctx);
        //this.drawBorderTiles(ctx);
    }
    drawCameraBorders(ctx) {
        const offsetX = (ctx.canvas.width - this.camera.viewport.width) / 2;
        const offsetY = (ctx.canvas.height - this.camera.viewport.height) / 2;
        ctx.fillStyle = "red";
        ctx.font = "12px Arial";
        ctx.fillText(`Position: X:${Math.floor((this.player.position.x - 5) / 32)}, Y:${Math.floor((this.player.position.y - 5) / 32)}`, offsetX + 10, offsetY + 25);
        ctx.fillText(`Camera: X:${this.camera.position.x.toFixed(0)}px, Y:${this.camera.position.y.toFixed(0)}px`, offsetX + 10, offsetY + 45);
        ctx.save();
        ctx.strokeStyle = "red"; // Color del borde
        ctx.lineWidth = 2; // Grosor del borde
        ctx.strokeRect(offsetX, offsetY, this.camera.viewport.width, this.camera.viewport.height);
        ctx.restore();
    }
    drawBorderTiles(ctx) {
        const tileSize = 32;
        const startCol = 0;
        const startRow = 0;
        const endCol = Math.ceil((this.player.position.x + this.camera.viewport.width) / tileSize);
        const endRow = Math.ceil((this.player.position.y + this.camera.viewport.height) / tileSize);
        ctx.save();
        for (let row = startRow; row < endRow; row++) {
            for (let col = startCol; col < endCol; col++) {
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                const x = col * tileSize - this.camera.position.x;
                const y = row * tileSize - this.camera.position.y;
                ctx.strokeRect(x, y, tileSize, tileSize);
                const text = `${row} - ${col}`;
                const textMetrics = ctx.measureText(text);
                const textWidth = textMetrics.width;
                const textHeight = 9;
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.fillRect(x + 2, y + 2, textWidth, textHeight);
                ctx.fillStyle = "black";
                ctx.font = `9px Arial`;
                ctx.fillText(text, x + 2, y + 10);
            }
        }
        ctx.restore();
    }
}


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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_engine_game_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/engine/game-engine */ "./src/core/engine/game-engine.ts");

class GameBootstrapper {
    gameEngine;
    uiElements;
    constructor() {
        this.uiElements = {
            loadingScreen: document.getElementById('loading-screen'),
            progressBar: document.querySelector('.progress'),
            dialogueBox: document.getElementById('dialogue-box'),
            hud: document.getElementById('hud')
        };
        this.initializeEngine();
        this.setupGlobalListeners();
    }
    initializeEngine() {
        const config = {
            canvasId: 'game-canvas',
            uiElements: this.uiElements
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
        this.updateUIPosition();
    }
    updateUIPosition() {
        const canvasRect = this.gameEngine.canvas.getBoundingClientRect();
        this.uiElements.hud.style.transform = `translate(${canvasRect.left}px, ${canvasRect.top}px)`;
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