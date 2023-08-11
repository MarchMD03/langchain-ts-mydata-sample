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
exports.runLlm = void 0;
// .envの読み込み
require("dotenv").config();
// モデル
const openai_1 = require("langchain/llms/openai");
// 埋め込み
const openai_2 = require("langchain/embeddings/openai");
// ベクトル検索エンジン
const hnswlib_1 = require("langchain/vectorstores/hnswlib");
// チェーン
const chains_1 = require("langchain/chains");
// サンプル用の関数
const runLlm = () => __awaiter(void 0, void 0, void 0, function* () {
    // ✅作成済みのインデックスを読み込む
    const vectorStore = yield hnswlib_1.HNSWLib.load("index", // indexフォルダ
    new openai_2.OpenAIEmbeddings());
    // ✅モデル
    const model = new openai_1.OpenAI({}); // OpenAIモデル
    // ✅チェーン
    const chain = chains_1.RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    // ✅質問する
    const res = yield chain.call({
        query: "ピンガはどんなキャラクターですか？",
    });
    console.log({ res });
});
exports.runLlm = runLlm;
(0, exports.runLlm)();
