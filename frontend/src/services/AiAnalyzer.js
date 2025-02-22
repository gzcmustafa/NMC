import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_AI_TOKEN;
console.log("API Key loaded:", API_KEY ? "Yes" : "No"); // Debug için

const genAI = new GoogleGenerativeAI(API_KEY);

export const deviceReport = async (sensorData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
    As a device health analyst, review this device's battery and temperature data and provide insights:
     Device Data:
     Battery: Currently at ${sensorData.battery}%
     Battery History: ${sensorData.battery_history.join(", ")}%
     Temperature: Currently at ${sensorData.temperature}°C
     Temperature History: ${sensorData.temperature_history.join(", ")}°C


    And give inforamtion  about;
    1)"🔋"BATTERY HEALTH ASSESSMENT
     Explain what the battery history tells us
    Identified problems: [Mention any issues you notice]
    2)"🌡️"TEMPERATURE ASSESSMENT
     Explain what the temperature history tells us
    Identified problems: [Mention any issues you notice, idenftified any potential risks]
    OVERALL DEVICE HEALTH
    Health Score: [0-100]
    Summary: [Give a brief, summary of the device's overall health based on these metrics 2 sentences]
    RECOMMENDATIONS
    Based on devices information, give recoomandation 2 sentences
    Note: If you spot any critical issues, mark them with "⚠️" and explain why they're concerning.
    `;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    if (!responseText) throw new Error("Invalid API response");

    return responseText;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "An error occurred while analyzing the sensor data.";
  }
};

// fast analysis
export const getQuickAnalysis = async (sensorData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
      Don't leave too much space in the text
      Provide a quick 2-sentence analysis of this sensor:
      Battery: ${
        sensorData.battery
      }% (History: ${sensorData.battery_history.join(", ")}%)
      Temperature: ${
        sensorData.temperature
      }°C (History: ${sensorData.temperature_history.join(", ")}°C)
      
      Focus on the most critical information and any immediate actions needed.
      `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    if (!responseText) throw new Error("Invalid API response");

    return responseText;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Quick analysis failed.";
  }
};

// detect anomaly
export const detectAnomalies = async (sensorData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
      Don't leave too much space in the text
      Analyze this sensor data for anomalies:
      Temperature History: ${sensorData.temperature_history.join(", ")}°C
      Battery History: ${sensorData.battery_history.join(", ")}%
  
      List any anomalies found in this format:
      1. Temperature Anomalies: 
      2. Battery Anomalies: 
      3. Risk Level: (High/Medium/Low)

      
      `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    if (!responseText) throw new Error("Invalid API response");

    return responseText;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Anomaly detection failed.";
  }
};
