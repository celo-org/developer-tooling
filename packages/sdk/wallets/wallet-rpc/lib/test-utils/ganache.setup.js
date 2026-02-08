"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ganache_setup_1 = require("@celo/dev-utils/lib/ganache-setup");
const network_1 = require("@celo/dev-utils/lib/network");
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\nstarting ganache...');
        yield (0, ganache_setup_1.emptySetup)({});
        yield (0, network_1.waitForPortOpen)('localhost', 8545, 60);
        console.log('...ganache started');
    });
}
exports.default = setup;
//# sourceMappingURL=ganache.setup.js.map