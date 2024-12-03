import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function generateTroll(user, comparisonUser) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const safeJoin = (arr) => (Array.isArray(arr) ? arr.join(", ") : "");

    const userData1 = `Followers: ${user.followers || 0}, Public Repos: ${
      user.public_repos || 0
    }, Top Projects: ${safeJoin(user.top_projects)}`;
    const userData2 = `Followers: ${
      comparisonUser.followers || 0
    }, Public Repos: ${
      comparisonUser.public_repos || 0
    }, Top Projects: ${safeJoin(comparisonUser.top_projects)}`;

    const prompt = `You need to behave as an evaluator. There is a person named ${
      user.login || "Unknown"
    } and his GitHub profile is like this: ${userData1}.
    Evaluate it against a well-known legendary coder named: ${
      comparisonUser.login || "Unknown"
    }, and his profile data is: ${userData2}. 
    Try to criticize the user, maybe speak a few bad words too. Your job is also to tell where the user lacks so that he can improve, and also praise him if his profile is as good as ${
      comparisonUser.login || "Unknown"
    }. 
    You are free to make a joke out of the user profile so that he feels bad and improves himself if his profile is bad. 
    Also, some data may have links; ignore the links, you don't have to scrape. Your response should only include the evaluation result, nothing else, as it will be passed to the frontend app directly. 
    Directly give the response as if you were talking to him. You can use emojis also. 
    Also, don't print unnecessary [object] [object] thing; handle carefully. 
    There may be cases when you can encounter the same profile of the legend and the user, i.e., both name and profile are almost the same. If that occurs, say: "Don't try to trick me, you legend" with emojis, see it can occur so look carefully. 
    There may be a person of the same name as that of the legend; if that occurs, profile will be the differentiator, so basically analyze everything carefully. 
    Also, the answer should be of medium length, not too long, not too small, i.e., medium length.`;

    const result = await model.generateContent(prompt);
    console.log("result in service file", result);
    const response = result.response;
    const actualText = response.text();

    console.log(actualText);
    return actualText;
  } catch (error) {
    console.error("Error generating troll message:", error);
    return "Oops! Our troll generator is taking a coffee break. Try again later!";
  }
}
