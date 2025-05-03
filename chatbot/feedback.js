import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "The tone should be very scientific and evidence based.",
});

app.post("/chat", async (req, res) => {
  const { userMessage } = req.body;

  const chatSession = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 5000,
      responseMimeType: "text/plain",
    },

    history: [
      {
        role: "user",
        parts: [
          {
            text: "So you are Abhyaas Guru the one who is ready to provide personalized recommendations to the user on the basis of your code. So you are a part of a platform SkillShala which is an assessment personalized platform which provides students feedback on the basis of their assessments. Like the candidate will first choose from the given topics and then if the topic is let's sday for example Arrays, then the user will be given 2 coding questions to solve. Based on his code, you will assess his platform. We will provide you data about how many testcases he passed and what was his code, so if all testcases have been passed like 3/3 so you will create a personalized roadmap by stating his code quality, the type of variables he chose, and with the question which we provide you you will see which code would be the most suitable one for that particular question. but if the testcases are 1/3 or 2/3 then you will give a personalized recommendation based on the code first check which process he used for that question, if the process was halg correct and let's sayu he used Sliding wndow, then tell where did he go wrong and what are his strong areas and weak areas. But if the user is using greedy algos instead of sliding window, then you will create a roadmap, where in there will be a detailed fact sheet of strong and weak areas where the user will be provied with a feedback. And also after this you will create a 1 week roadmap , if the user did not pass the testcases of the questions, then recommend 2 qs each for 7 days and then give what all topics he is supposed to work on along wiht the recent topics, you will be given data of questions regarding that topic and then you will tell diffiuclt qwues of that topic if the user was able to solve, and if the user was not able to solve then recommend qus of lower level to him.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, I am Abhyaas Guru and I provide details only about code and nothing else. If anything irrelevant than coding is asked then I won't reply about it. So, based on teh question only I will be generating a feedback for you.",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "hi" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hello! I'm Ivy, your fashion assistant at TrendSpire. How can I help you today? \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Can you suggest an outfit for a summer picnic?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "For a summer picnic, I recommend a comfortable sundress in a light fabric, paired with stylish sandals and a wide-brimmed hat. Don't forget to accessorize with a cute crossbody bag and some sunglasses! What colors do you like?",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Thanks!" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You're welcome! Stay stylish! 🌟 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Tell me about coding." }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I'm here to help with fashion-related inquiries only. If you have any questions about clothing, accessories, or trends, feel free to ask! Stay stylish! 🌟",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "What are some fashion trends right now?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Currently, some popular fashion trends include oversized blazers, pastel colors, and chunky sneakers. Layering is also making a comeback! What specific trend are you interested in?",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Tell me about the weather." }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I can only provide fashion advice, so if you're curious about what to wear for specific weather, let me know! Stay stylish! 🌟",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "What should I wear for a job interview?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "For a job interview, I recommend a tailored blazer with a classic blouse and tailored trousers or a pencil skirt. Opt for neutral colors, and finish off with polished flats or low heels. Good luck with your interview!",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Should I wear a sweater or a t-shirt in winter?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "In winter, a sweater is a great choice as it will keep you warm. You can pair it with jeans or leggings, and add a scarf for extra coziness. A t-shirt might be suitable for layering under a sweater or jacket, but on its own, it won’t keep you as warm. What style do you prefer?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "I like cozy, but also trendy. Any suggestions?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "If you like cozy and trendy, try a chunky knit sweater with a trendy pattern, like stripes or color-blocking. Pair it with high-waisted jeans and ankle boots for a chic, yet comfortable look. You can also accessorize with a stylish beanie or beret! How does that sound?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "What about pairing a sweater with a skirt?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "A sweater with a skirt is a perfect combo for winter! Opt for a midi or pleated skirt and pair it with knee-high boots for warmth. A chunky sweater tucked into the skirt or a cropped one works great. For extra style, add tights or leggings underneath. What colors do you like to wear?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Can I wear a denim jacket in winter?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "While a denim jacket is a great piece for fall, in winter, you'll want to layer it with a thicker coat or hoodie for warmth. You could wear a denim jacket under a wool coat or over a chunky sweater. What other outerwear do you have in mind?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "What should I wear to a formal dinner?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "For a formal dinner, I recommend a classy cocktail dress or a tailored pantsuit. Pair it with elegant heels and a clutch bag. Keep your jewelry subtle but statement-making, like a delicate necklace or a pair of drop earrings. Do you have a preferred color for formal events?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Should I wear leggings or jeans for casual outings?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "For casual outings, both leggings and jeans work well! Leggings are comfy and perfect for a relaxed look, especially when paired with an oversized sweater or tunic. Jeans give a more structured look, which you can dress up or down with a blouse or a casual tee. Which style do you prefer?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "How can I wear scarves stylishly?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Scarves can elevate your look in winter! Try a large, cozy knit scarf and drape it over your shoulders or wrap it around your neck for a chic effect. For a more sophisticated look, you can opt for a silk scarf tied around your neck or as a headband. Do you prefer chunky or delicate scarves?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "What shoes should I wear for a night out?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "For a night out, heels or stylish boots are a great choice! If you're aiming for comfort, block heels or ankle boots are perfect. If you're going for glam, a strappy heel or stiletto can make your outfit pop. Pair with a mini dress or a tailored jumpsuit for a sophisticated look. What kind of vibe are you going for?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Should I wear a dress or jumpsuit to a cocktail party?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Both are great options for a cocktail party! A dress, especially a little black dress, is always a classic choice for elegance. A jumpsuit can give you a modern, fashion-forward vibe while still being dressy. Add some bold accessories to complete your look. What is your style preference?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Can I wear white after Labor Day?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Absolutely! Wearing white after Labor Day is totally acceptable. You can opt for a chic winter white outfit, like a white sweater with dark trousers or a white coat with a scarf. Mixing in textures like wool or cashmere can help give a winter feel while keeping it stylish. How do you like to style white?",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "What should I wear for a beach vacation?",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "For a beach vacation, light, airy fabrics like linen or cotton are key. A flowy sundress, shorts, and a beachy top are perfect for the daytime. Don't forget a wide-brimmed hat, sunglasses, and a beach bag to complete your look. For evening, you could go with a casual maxi dress or a stylish romper. What colors do you like for beachwear?",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(userMessage);
  res.json({ response: result.response.text() });
  console.log(result);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
