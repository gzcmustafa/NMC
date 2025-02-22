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
    🔋 Battery: Currently at ${sensorData.battery}%
    📊 Battery History: ${sensorData.battery_history.join(", ")}%
    🌡️ Temperature: Currently at ${sensorData.temperature}°C
    📈 Temperature History: ${sensorData.temperature_history.join(", ")}°C

    Please analyze the data and provide your professional opinion in this format:

    BATTERY HEALTH REVIEW
    Current State: [Describe the current battery level and if it's healthy]
    Trend Analysis: [Explain the battery consumption pattern you observe]
    Concerns: [Mention any concerning patterns or issues you notice]

    TEMPERATURE ASSESSMENT
    Current State: [Describe if current temperature is within normal range]
    Pattern Overview: [Explain what the temperature history tells us]
    Risk Assessment: [Discuss any potential risks or concerns]

    OVERALL DEVICE HEALTH
    Health Score: [0-100]
    Summary: [Give a brief, conversational summary of the device's overall health based on these metrics]

    RECOMMENDATIONS
    Based on my analysis, give recoomandation
  

    Note: If you spot any critical issues, mark them with "⚠️" and explain why they're concerning.
    Keep the analysis focused on battery and temperature patterns, and how they affect device health.
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
      Provide a quick 2-sentence analysis of this sensor:
      Battery: ${sensorData.battery}% (History: ${sensorData.battery_history.join(', ')}%)
      Temperature: ${sensorData.temperature}°C (History: ${sensorData.temperature_history.join(', ')}°C)
      
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
      Analyze this sensor data for anomalies:
      Temperature History: ${sensorData.temperature_history.join(', ')}°C
      Battery History: ${sensorData.battery_history.join(', ')}%
  
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