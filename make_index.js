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
exports.make_index = void 0;
// .envの読み込み
require("dotenv").config();
// PDFローダー
const pdf_1 = require("langchain/document_loaders/fs/pdf");
// テキスト分割
const text_splitter_1 = require("langchain/text_splitter");
// 埋め込み
const openai_1 = require("langchain/embeddings/openai");
// ベクトル検索エンジン
const hnswlib_1 = require("langchain/vectorstores/hnswlib");
// サンプル用の関数
const make_index = () => __awaiter(void 0, void 0, void 0, function* () {
    // ✅ドキュメントの読み込み
    const loader = new pdf_1.PDFLoader("document_Conan.pdf");
    // ✅PDFファイルを500文字ごとに分割
    const textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({ chunkSize: 500 });
    const docs = yield loader.loadAndSplit(textSplitter);
    // ✅ドキュメントをベクトル化し、インデックスを生成
    const vectorStore = yield hnswlib_1.HNSWLib.fromDocuments(docs, new openai_1.OpenAIEmbeddings());
    // ✅インデックスを保存
    yield vectorStore.save("index"); // indexフォルダ
});
exports.make_index = make_index;
(0, exports.make_index)();
