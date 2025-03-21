import ollama from "ollama";
const main = async () => {
  try {
    const imagePath = "cat.jpg";
    const response = await ollama.generate({
      model: "gemma3:4b",
      prompt: "describe this image:",
      images: [imagePath],
      stream: true,
    });
    for await (const part of response) {
      process.stdout.write(part.response);
    }
  } catch (err) {
    console.log(err);
  }
};

main();
