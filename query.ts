// .envの読み込み
require("dotenv").config();

// モデル
import { OpenAI } from "langchain/llms/openai";
// 埋め込み
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// ベクトル検索エンジン
import { HNSWLib } from "langchain/vectorstores/hnswlib";
// チェーン
import { RetrievalQAChain } from "langchain/chains";

// サンプル用の関数
export const runLlm = async () => {  
  // ✅作成済みのインデックスを読み込む
  const vectorStore = await HNSWLib.load(
    "index",    // indexフォルダ
    new OpenAIEmbeddings()
  );

  // ✅モデル
  const model = new OpenAI({});   // OpenAIモデル
  // ✅チェーン
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  // ✅質問する
  const res = await chain.call({
    query: "ピンガはどんなキャラクターですか？",
  });
  
  console.log({ res });
};

runLlm();