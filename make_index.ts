// .envの読み込み
require("dotenv").config();

// PDFローダー
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// テキスト分割
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// 埋め込み
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// ベクトル検索エンジン
import { HNSWLib } from "langchain/vectorstores/hnswlib";

// サンプル用の関数
export const make_index = async () => {
  // ✅ドキュメントの読み込み
	const loader = new PDFLoader("document_Conan.pdf");

  // ✅PDFファイルを500文字ごとに分割
	const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });
  const docs = await loader.loadAndSplit(textSplitter);

  // ✅ドキュメントをベクトル化し、インデックスを生成
  const vectorStore = await HNSWLib.fromDocuments( docs, new OpenAIEmbeddings() );

  // ✅インデックスを保存
  await vectorStore.save("index");    // indexフォルダ
};

make_index();