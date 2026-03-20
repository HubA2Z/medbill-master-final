import axios from 'axios';
import { Router } from 'express';

const router = Router();

const synonymMap: { [key: string]: string } = {
  "sugar": "diabetes",
  "high blood pressure": "hypertension",
  "heart attack": "myocardial infarction",
  "stroke": "cerebrovascular accident",
  "flu": "influenza",
  "sore throat": "pharyngitis"
};

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') return res.status(400).json({ message: "No query" });

    // 1. Handle Synonyms
    const searchTerm = query.toLowerCase().trim();
    const mappedQuery = synonymMap[searchTerm] || searchTerm;
    const safeQuery = encodeURIComponent(mappedQuery);

    // 2. The Proven ICD-10 URL Structure
    // Using v3 with sf/df parameters exactly as in your sample
    const url = `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&df=code,name&terms=${safeQuery}`;

    console.log(`📡 Requesting ICD-10: ${url}`);

    const response = await axios.get(url, { timeout: 5000 });
    
    // 3. Extract data from index [3]
    const rawData = response.data && Array.isArray(response.data[3]) ? response.data[3] : [];

    // 4. Map to the frontend format { code, description }
    const formatted = rawData.map((item: any) => ({
      code: item[0] || "N/A",
      description: item[1] || "No description available"
    }));

    return res.json(formatted);

  } catch (error: any) {
    console.error("❌ BACKEND ERROR:", error.message);
    // Return empty results instead of crashing, so the frontend stays clean
    return res.status(200).json([]); 
  }
});

export default router;
