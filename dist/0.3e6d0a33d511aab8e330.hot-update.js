"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 3:
/***/ ((module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("aeb7834e0f41480ba79a")
/******/ })();
/******/ 
/******/ }
;