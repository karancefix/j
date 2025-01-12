const HUGGING_FACE_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN;

export async function generateImage(prompt: string): Promise<Blob> {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
    {
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to generate image');
  }
  
  return response.blob();
}