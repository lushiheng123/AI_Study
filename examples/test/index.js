import ollama from "ollama";

const translateSentence = async () => {
    try {
        const aiMsg = await ollama.generate({
            model: "deepseek-r1:8b",
            prompt: "You are a helpful assistant that translates English to Chinese. Translate this sentence: 'I love programming.'",
            temperature: 0.7,
            maxRetries: 2,
        });
        console.log(aiMsg); // 只打印翻译结果
    } catch (error) {
        console.error("Error translating sentence:", error);
    }
};

translateSentence();