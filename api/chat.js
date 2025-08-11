const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const apiKey = "AIzaSyBWkhNKnZkh3_A6ISmQIUA8j_Om2bTfzkA";

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }

  const timetable = {
    "Mon": {
      "1": "-",
      "2": "-",
      "3": "-",
      "4": "-",
      "5": "-",
      "6": "-",
      "7": "-",
      "8": "-",
      "9": "-",
      "10": "-",
      "11": "-",
      "12": "-",
      "13": "23UC0013-S    - S-23    -RoomNo-BASKETBALL COURT",
      "14": "-",
      "15": "-",
      "16": "-",
      "17": "24UC0022-P    - S-202    -RoomNo-A307",
      "18": "24UC0022-P    - S-202    -RoomNo-A306",
      "19": "-",
      "20": "-",
      "21": "-",
      "22": "-",
      "23": "-",
      "24": "-"
    },
    "Tue": {
      "1": "-",
      "2": "-",
      "3": "24MT2012-L    - S-205    -RoomNo-C122",
      "4": "24MT2012-L    - S-205    -RoomNo-C122",
      "5": "24CS2101R-L    - S-203    -RoomNo-M102",
      "6": "24CS2101R-L    - S-203    -RoomNo-M102",
      "7": "24AD2001A-T    - S-205    -RoomNo-C511",
      "8": "-",
      "9": "24SDCS01E-L    - S-204    -RoomNo-C410",
      "10": "-",
      "11": "-",
      "12": "-",
      "13": "-",
      "14": "-",
      "15": "-",
      "16": "-",
      "17": "-",
      "18": "-",
      "19": "-",
      "20": "-",
      "21": "-",
      "22": "-",
      "23": "-",
      "24": "-"
    },
    "Wed": {
      "1": "-",
      "2": "-",
      "3": "24AD2001A-P    - S-205    -RoomNo-M001",
      "4": "24AD2001A-P    - S-205    -RoomNo-M001",
      "5": "24SDCS01E-S    - S-204    -RoomNo-C422",
      "6": "24SDCS01E-S    - S-204    -RoomNo-C422",
      "7": "24SC2006-L    - S-220    -RoomNo-C421B1",
      "8": "-",
      "9": "24SDCS01E-T    - S-204    -RoomNo-C420A",
      "10": "24SC2006-S    - S-220    -RoomNo-C623",
      "11": "24SC2006-S    - S-220    -RoomNo-C623",
      "12": "-",
      "13": "-",
      "14": "-",
      "15": "-",
      "16": "-",
      "17": "-",
      "18": "-",
      "19": "-",
      "20": "-",
      "21": "-",
      "22": "-",
      "23": "-",
      "24": "-"
    },
    "Thu": {
      "1": "24AD2001A-L    - S-205    -RoomNo-C511",
      "2": "24AD2001A-L    - S-205    -RoomNo-C511",
      "3": "24SDCS01E-S    - S-204    -RoomNo-L309",
      "4": "24SDCS01E-S    - S-204    -RoomNo-L309",
      "5": "24MT2012-T    - S-205    -RoomNo-C407",
      "6": "24MT2012-T    - S-205    -RoomNo-C407",
      "7": "24AD2103R-L    - S-206    -RoomNo-M207",
      "8": "-",
      "9": "24AD01HF-L    - S-208    -RoomNo-C321B2",
      "10": "24AD2103R-L    - S-206    -RoomNo-C511",
      "11": "24AD2103R-L    - S-206    -RoomNo-C511",
      "12": "-",
      "13": "23UC0013-S    - S-23    -RoomNo-BASKETBALL COURT",
      "14": "-",
      "15": "-",
      "16": "-",
      "17": "-",
      "18": "-",
      "19": "-",
      "20": "-",
      "21": "-",
      "22": "-",
      "23": "-",
      "24": "-"
    },
    "Fri": {
      "1": "-",
      "2": "-",
      "3": "24AD2001A-L    - S-205    -RoomNo-C511",
      "4": "24AD2001A-L    - S-205    -RoomNo-C511",
      "5": "24SC2006-L    - S-220    -RoomNo-C423",
      "6": "24SC2006-L    - S-220    -RoomNo-C423",
      "7": "24AD01HF-L    - S-208    -RoomNo-C608",
      "8": "-",
      "9": "24SDCS01E-L    - S-204    -RoomNo-L303",
      "10": "24SC2006-P    - S-220    -RoomNo-C219",
      "11": "24SC2006-P    - S-220    -RoomNo-C219",
      "12": "-",
      "13": "-",
      "14": "-",
      "15": "-",
      "16": "-",
      "17": "-",
      "18": "-",
      "19": "-",
      "20": "-",
      "21": "-",
      "22": "-",
      "23": "-",
      "24": "-"
    },
    "Sat": {
      "1": "-",
      "2": "-",
      "3": "24CS2101R-P    - S-203    -RoomNo-C317A",
      "4": "24CS2101R-P    - S-203    -RoomNo-C317A",
      "5": "24AD2103R-P    - S-206    -RoomNo-C219",
      "6": "24AD2103R-P    - S-206    -RoomNo-C219",
      "7": "24CS2101R-L    - S-203    -RoomNo-C307",
      "8": "-",
      "9": "24AD01HF-L    - S-208    -RoomNo-C608",
      "10": "24AD01HF-P    - S-208    -RoomNo-C619",
      "11": "24AD01HF-P    - S-208    -RoomNo-C619",
      "12": "-",
      "13": "-",
      "14": "-",
      "15": "-",
      "16": "-",
      "17": "-",
      "18": "-",
      "19": "-",
      "20": "-",
      "21": "-",
      "22": "-",
      "23": "-",
      "24": "-"
    }
  };

  const attendance = [
    {
      "#": "1",
      "Coursecode": "24SC2006",
      "Coursedesc": "OBJECT ORIENTED PROGRAMMING",
      "Ltps": "L",
      "Section": "S-220-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "10",
      "Total Attended": "9",
      "Total Absent": "1",
      "Tcbr": "0",
      "Percentage": "90%",
      "Attendance Register": "Register"
    },
    {
      "#": "2",
      "Coursecode": "24SC2006",
      "Coursedesc": "OBJECT ORIENTED PROGRAMMING",
      "Ltps": "P",
      "Section": "S-220-C",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "6",
      "Total Attended": "6",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "3",
      "Coursecode": "24SC2006",
      "Coursedesc": "OBJECT ORIENTED PROGRAMMING",
      "Ltps": "S",
      "Section": "S-220-B",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "8",
      "Total Attended": "8",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "4",
      "Coursecode": "24AD01HF",
      "Coursedesc": "DATA ANALYTICS AND VISUALIZATION",
      "Ltps": "L",
      "Section": "S-208-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "11",
      "Total Attended": "11",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "5",
      "Coursecode": "24AD01HF",
      "Coursedesc": "DATA ANALYTICS AND VISUALIZATION",
      "Ltps": "P",
      "Section": "S-208-C",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "8",
      "Total Attended": "6",
      "Total Absent": "2",
      "Tcbr": "0",
      "Percentage": "75%",
      "Attendance Register": "Register"
    },
    {
      "#": "6",
      "Coursecode": "24MT2012",
      "Coursedesc": "MATHEMATICAL OPTIMIZATION",
      "Ltps": "L",
      "Section": "S-205-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "8",
      "Total Attended": "8",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "7",
      "Coursecode": "24MT2012",
      "Coursedesc": "MATHEMATICAL OPTIMIZATION",
      "Ltps": "T",
      "Section": "S-205-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "8",
      "Total Attended": "8",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "8",
      "Coursecode": "24AD2001A",
      "Coursedesc": "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING",
      "Ltps": "L",
      "Section": "S-205-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "14",
      "Total Attended": "12",
      "Total Absent": "2",
      "Tcbr": "0",
      "Percentage": "86%",
      "Attendance Register": "Register"
    },
    {
      "#": "9",
      "Coursecode": "24AD2001A",
      "Coursedesc": "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING",
      "Ltps": "T",
      "Section": "S-205-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "4",
      "Total Attended": "4",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "10",
      "Coursecode": "24AD2001A",
      "Coursedesc": "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING",
      "Ltps": "P",
      "Section": "S-205-C",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "8",
      "Total Attended": "8",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "11",
      "Coursecode": "24SDCS01E",
      "Coursedesc": "FRONT END DEVELOPMENT FRAMEWORKS",
      "Ltps": "L",
      "Section": "S-204-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "6",
      "Total Attended": "6",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "12",
      "Coursecode": "24SDCS01E",
      "Coursedesc": "FRONT END DEVELOPMENT FRAMEWORKS",
      "Ltps": "T",
      "Section": "S-204-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "3",
      "Total Attended": "2",
      "Total Absent": "1",
      "Tcbr": "0",
      "Percentage": "67%",
      "Attendance Register": "Register"
    },
    {
      "#": "13",
      "Coursecode": "24SDCS01E",
      "Coursedesc": "FRONT END DEVELOPMENT FRAMEWORKS",
      "Ltps": "S",
      "Section": "S-204-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "16",
      "Total Attended": "16",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "14",
      "Coursecode": "24CS2101R",
      "Coursedesc": "OPERATING SYSTEMS",
      "Ltps": "L",
      "Section": "S-203-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "10",
      "Total Attended": "10",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "15",
      "Coursecode": "24CS2101R",
      "Coursedesc": "OPERATING SYSTEMS",
      "Ltps": "P",
      "Section": "S-203-C",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "8",
      "Total Attended": "8",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "16",
      "Coursecode": "24AD2103R",
      "Coursedesc": "DATABASE MANAGEMENT SYSTEMS",
      "Ltps": "L",
      "Section": "S-206-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "12",
      "Total Attended": "11",
      "Total Absent": "1",
      "Tcbr": "0",
      "Percentage": "92%",
      "Attendance Register": "Register"
    },
    {
      "#": "17",
      "Coursecode": "24AD2103R",
      "Coursedesc": "DATABASE MANAGEMENT SYSTEMS",
      "Ltps": "P",
      "Section": "S-206-C",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "8",
      "Total Attended": "8",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    },
    {
      "#": "18",
      "Coursecode": "23UC0013",
      "Coursedesc": "GLOBAL LOGIC BUILDING CONTEST PRACTICUM",
      "Ltps": "S",
      "Section": "S-23-MA",
      "Year": "2025-2026",
      "Semester": "Odd Sem",
      "Fr Date": "Y",
      "Total Conducted": "1",
      "Total Attended": "1",
      "Total Absent": "0",
      "Tcbr": "0",
      "Percentage": "100%",
      "Attendance Register": "Register"
    }
  ];

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const systemPrompt = `You are an attendance and timetable assistant for a university student portal.
You ONLY answer questions related to the timetable, attendance percentage, and attendance predictions.
If a user asks something unrelated, politely refuse and remind them you can only answer timetable and attendance queries.
You have access to the current attendance percentage and timetable provided by the app.
When predicting attendance changes, clearly explain the calculation.
Always be concise and friendly.
Act as if you have access to the current time and date in India and use the provided timetable data accordingly.

Here is the current timetable:
${JSON.stringify(timetable, null, 2)}

Here is the current attendance data:
${JSON.stringify(attendance, null, 2)}
`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Start a new chat session with the system prompt
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Okay, I am ready to assist with your timetable and attendance questions." }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 500, // Adjust as needed
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ error: 'Error communicating with the AI model', details: error.message });
  }
};