// file: routes/birdRoutes.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); 
const Place = require('../models/Place');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434/api/generate'; 

// Known Penang Areas
const PENANG_AREAS = [
    'Batu Ferringhi', 'George Town', 'Georgetown', 'Air Itam', 'Ayer Itam',
    'Bayan Lepas', 'Tanjung Bungah', 'Tanjung Tokong', 'Gurney', 'Pulau Tikus',
    'Gelugor', 'Balik Pulau', 'Teluk Bahang', 'Butterworth', 'Bukit Mertajam',
    'Seberang Perai', 'Nibong Tebal', 'Kepala Batas'
];

// Comprehensive category keyword mappings for all 47 MongoDB categories
const CATEGORY_KEYWORDS = {
    'clan houses': ['clan house', 'clan houses', 'kongsi', 'ancestral hall', 'association hall', 'chinese clan'],
    'clan jetty': ['clan jetty', 'clan jetties', 'chew jetty', 'tan jetty', 'lee jetty', 'wooden pier', 'water village'],
    'beaches': ['beach', 'beaches', 'pantai', 'coast', 'coastal', 'seaside', 'sea', 'shore', 'bay', 'sunset spot', 'sand', 'beachfront', 'island'],
    'nature & parks': ['nature', 'park', 'national park', 'botanical', 'hill', 'garden', 'forest', 'hiking', 'flora', 'tree', 'green', 'waterfall', 'outdoors', 'river'],
    'Cafes': ['cafe', 'cafes', 'coffee', 'kopi', 'tea', 'matcha', 'latte', 'espresso', 'brunch'],
    'Dessert and Pastry': ['dessert', 'pastry', 'cake', 'bakery', 'waffle', 'ice cream', 'cendol', 'ais kacang', 'boba', 'sweet'],
    'Hawker Centres & Food Courts': ['hawker', 'food court', 'stall', 'medan selera', 'kopitiam', 'street food', 'char kway teow', 'laksa', 'hokkien mee'],
    'food & beverages': ['food', 'makan', 'restaurant', 'dinner', 'lunch', 'breakfast', 'noodle', 'rice', 'seafood', 'dining'],
    'Halal restaurant': ['halal', 'muslim', 'nasi kandar', 'roti canai', 'mee goreng', 'murtabak', 'briyani'],
    'Street Art & Murals': ['street art', 'mural', 'wall art', 'armenian street art', 'graffiti', 'painting', 'artwork'],
    'Museums & Galleries': ['museum', 'gallery', 'art exhibition', 'peranakan', 'wonderfood', 'heritage museum'],
    'places of worship': ['temple', 'mosque', 'church', 'shrine', 'pagoda', 'kek lok si', 'kapitan keling', 'st george', 'wat', 'worship'],
    'cultural & heritage': ['heritage', 'history', 'historic', 'historical sites', 'historic buildings', 'monuments', 'fort', 'colonial', 'unesco', 'mausoleums & cemeteries'],
    'Accommodations & Hotels': ['hotel', 'stay', 'resort', 'homestay', 'hostel', 'inn', 'lodge', 'apartments', 'suite', 'villa'],
    'adventure': ['adventure', 'escape', 'theme park', 'water park', 'zip line', 'thrill', 'kayak'],
    'bars & bistros': ['bar', 'bistro', 'pub', 'cocktail', 'nightlife', 'wine', 'beer', 'lounge'],
    'Night Markets (Pasar Malam)': ['night market', 'pasar malam', 'evening market'],
    'shopping & malls': ['shopping', 'mall', 'gurney plaza', 'queensbay', 'store', 'plaza', 'local handicrafts & souvenirs'],
    'Wellness & Spas': ['spa', 'wellness', 'massage', 'reflexology'],
};

const STOP_WORDS = new Set([
    'add', 'me', 'one', 'two', 'three', 'four', 'five', 'or', 'and', 'i', 'want', 'to', 'go',
    'visit', 'find', 'see', 'any', 'the', 'a', 'an', 'in', 'at', 'on', 'near', 'around', 'area',
    'please', 'can', 'you', 'recommend', 'suggest', 'where', 'what', 'good', 'best', 'some',
    'for', 'looking', 'spot', 'spots', 'place', 'places', 'option', 'options', 'bring',
    'show', 'give', 'tell', 'about', 'like', 'with', 'from', 'help'
]);

// Helper: Determine if category is primarily outdoor
function isOutdoorCategory(category = '') {
    const cat = category.toLowerCase();
    return cat.includes('beach') || 
           cat.includes('nature') || 
           cat.includes('park') || 
           cat.includes('street art') || 
           cat.includes('mural') || 
           cat.includes('adventure') ||
           cat.includes('jetty');
}

// --- 🔍 MONGODB PLACE QUERY ENGINE ---
async function findPlacesFromMongo(queryText) {
    try {
        const lowerQuery = queryText.toLowerCase().trim();
        const cleanInput = queryText.replace(/[^\w\s]/g, ' ').trim();
        const rawWords = cleanInput.split(/\s+/).filter(w => w.length > 1);
        const significantWords = rawWords.filter(w => !STOP_WORDS.has(w.toLowerCase()) && w.length > 1);

        // --- PHASE 1: DIRECT SPECIFIC PLACE NAME SEARCH ---
        if (significantWords.length > 0) {
            const phrase = significantWords.join(' ');
            
            let directNameMatches = await Place.find({
                place_name: { $regex: phrase, $options: 'i' }
            }).limit(2);

            if (directNameMatches.length === 0 && significantWords.length > 1) {
                const wordAndQueries = significantWords.map(w => ({ place_name: { $regex: w, $options: 'i' } }));
                directNameMatches = await Place.find({ $and: wordAndQueries }).limit(2);
            }

            if (directNameMatches.length > 0) {
                if (directNameMatches.length === 1) {
                    const primary = directNameMatches[0];
                    const complementary = await Place.find({
                        _id: { $ne: primary._id },
                        $or: [
                            { place_category: primary.place_category },
                            { place_address: { $regex: (primary.place_address || '').split(',')[0] || 'George Town', $options: 'i' } }
                        ]
                    }).limit(1);

                    if (complementary.length > 0) {
                        return [primary, complementary[0]];
                    }
                }
                return directNameMatches;
            }
        }

        // --- PHASE 2: AREA & CATEGORY SMART SEARCH ---
        let matchedArea = null;
        for (const area of PENANG_AREAS) {
            if (lowerQuery.includes(area.toLowerCase())) {
                matchedArea = area;
                break;
            }
        }

        let matchedCategories = [];
        for (const [catName, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
            for (const kw of keywords) {
                if (lowerQuery.includes(kw)) {
                    matchedCategories.push(catName);
                    break;
                }
            }
        }

        const words = significantWords.filter(w => !matchedArea || !matchedArea.toLowerCase().includes(w.toLowerCase()));

        let candidates = [];

        // Category conditions
        if (matchedCategories.length > 0) {
            const catConditions = [
                { place_category: { $in: matchedCategories.map(c => new RegExp(`^${c}$`, 'i')) } }
            ];

            for (const cat of matchedCategories) {
                const kws = CATEGORY_KEYWORDS[cat] || [];
                for (const kw of kws) {
                    catConditions.push({ place_name: { $regex: kw, $options: 'i' } });
                }
            }

            let catQuery = { $or: catConditions };
            if (matchedArea) {
                catQuery = {
                    $and: [
                        { $or: catConditions },
                        {
                            $or: [
                                { place_address: { $regex: matchedArea, $options: 'i' } },
                                { place_summary: { $regex: matchedArea, $options: 'i' } },
                                { place_name: { $regex: matchedArea, $options: 'i' } }
                            ]
                        }
                    ]
                };
            }

            candidates = await Place.find(catQuery).limit(10);
        }

        // Keyword query
        if (candidates.length === 0 && words.length > 0) {
            const wordConditions = [];
            for (const w of words) {
                wordConditions.push({ place_name: { $regex: w, $options: 'i' } });
                wordConditions.push({ place_summary: { $regex: w, $options: 'i' } });
            }

            let wordQuery = { $or: wordConditions };
            if (matchedArea) {
                wordQuery = {
                    $and: [
                        { $or: wordConditions },
                        { place_address: { $regex: matchedArea, $options: 'i' } }
                    ]
                };
            }

            candidates = await Place.find(wordQuery).limit(10);
        }

        // Score and rank candidates
        const scored = candidates.map(p => {
            let score = 0;
            const nameLower = (p.place_name || '').toLowerCase();
            const catLower = (p.place_category || '').toLowerCase();
            const summaryLower = (p.place_summary || '').toLowerCase();

            for (const cat of matchedCategories) {
                if (catLower === cat.toLowerCase()) score += 15;
                const kws = CATEGORY_KEYWORDS[cat] || [];
                for (const kw of kws) {
                    if (nameLower.includes(kw.toLowerCase())) score += 10;
                    if (summaryLower.includes(kw.toLowerCase())) score += 3;
                }
            }

            for (const w of words) {
                if (nameLower.includes(w)) score += 8;
                if (catLower.includes(w)) score += 5;
                if (summaryLower.includes(w)) score += 2;
            }

            if (matchedArea && (p.place_address || '').toLowerCase().includes(matchedArea.toLowerCase())) {
                score += 5;
            }

            return { place: p, score };
        });

        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, 2).map(s => s.place);
    } catch (err) {
        console.error("MongoDB place lookup error:", err.message);
        return [];
    }
}

function extractArea(place) {
    if (place.place_address) {
        for (const area of PENANG_AREAS) {
            if (place.place_address.toLowerCase().includes(area.toLowerCase())) {
                return area;
            }
        }
    }
    return 'Penang';
}

// Helper: Query indoor backup recommendations from MongoDB
async function getIndoorBackupPlaces(count = 3) {
    try {
        const indoorCats = ['Museums & Galleries', 'cultural & heritage', 'Cafes', 'Dessert and Pastry', 'shopping & malls'];
        const places = await Place.find({
            place_category: { $in: indoorCats }
        }).limit(count * 2);

        return places.slice(0, count);
    } catch (e) {
        return [];
    }
}

// --- 📚 FEW-SHOT REFERENCE DATASET ---
const referenceDataset = `
REFERENCE SCENARIOS (Learn from these examples):

Situation A: The user wants to stop, cancel, or end their ongoing trip.
User: "I want to stop the trip now."
Bird: "Okay boss, I have stopped your current journey! Do you want to rest or plan a new one? [INTENT: CANCEL_TRIP]"

Situation B: The user wants to finalize, save, or lock the drafted itinerary, but dates are unknown.
User: "Save and plan my trip now" or "Lock it in"
Bird: "Jom! Let's lock it in! When will you be visiting Penang? [INTENT: REQUIRE_DATES]"

Situation C: The user wants to lock/start after dates are set.
User: "The plan is ready, let's start!"
Bird: "Ngam! I have locked your itinerary. Get ready for an amazing day! Jom! [INTENT: LOCK_TRIP]"

Situation D: Normal conversation (no tags needed).
User: "Where is the toilet?"
Bird: "Chop-chop, let me find the nearest restroom for you!"
`;

// --- 🧠 CORE AI CHAT LOGIC ---
async function chatWithBird(userInput, hasActiveTrip, placesFound, hasTravelDates) {
    const userContext = hasActiveTrip 
        ? "Note: The user currently has an ONGOING active trip." 
        : "Note: The user is currently drafting a trip or asking companion questions.";

    let dbPlacesContext = "";
    if (placesFound && placesFound.length > 0) {
        dbPlacesContext = "\nREAL PENANG MONGODB PLACES FOUND:\n";
        placesFound.forEach((p, idx) => {
            const area = extractArea(p);
            dbPlacesContext += `Option ${idx + 1}: Name: "${p.place_name}", Area: "${area}", Category: "${p.place_category}", Details: "${p.place_summary || p.place_address}"\n`;
        });
        dbPlacesContext += `
CRITICAL INSTRUCTIONS:
1. The user's query is: "${userInput}".
2. You MUST directly answer the user's query by introducing Option 1 (and Option 2).
3. Specifically highlight what makes "${placesFound[0].place_name}" unique using its Details (history, architecture, features, food, or vibe).
4. NEVER recommend random cafes or say you lack data when places are provided above!
5. Tell the user they can tap 'Add Option 1' below, or tap the 🗺️ icon in the top right to check the list and lock when ready!
`;
    }

    const systemPrompt = `
    You are 'Kia-Kia Penang Pink Bird', a friendly, food-loving travel guide mascot for Penang, Malaysia. 
    Keep your answers concise (under 85 words), cheerful, helpful, and use occasional simple Manglish (like 'Jom!', 'lah', 'ho chiak').
    
    ${userContext}
    Travel Dates Known: ${hasTravelDates ? "YES" : "NO"}
    ${dbPlacesContext}
    ${referenceDataset}
    
    SPECIAL RULE FOR TRIP FINALIZATION:
    If the user asks to save, lock, plan, or finalize the trip, and Travel Dates Known is NO, you MUST reply asking for travel dates and append [INTENT: REQUIRE_DATES].
    If the user wants to cancel the trip, append [INTENT: CANCEL_TRIP].
    If the user wants to lock/start and dates are already known, append [INTENT: LOCK_TRIP].
    `;

    console.log('\n--- 🤖 [AI PROMPT CONTEXT SENT TO gemma4:cloud] ---');
    console.log(JSON.stringify({
        model: "gemma4:cloud",
        userPrompt: userInput,
        hasTravelDates,
        placesGroundingCount: placesFound.length,
        systemInstructionLength: systemPrompt.length
    }, null, 2));

    const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: "gemma4:cloud", 
            system: systemPrompt,
            prompt: userInput,
            stream: false,
            temperature: 0.4 
        })
    });
    
    const data = await response.json();
    if (data.error) throw new Error(`API Error: ${data.error}`);
    
    return data.response.trim();
}

// --- 🌐 API ENDPOINT FOR FLUTTER CHAT ---
router.post('/chat', async (req, res) => {
    try {
        console.log('\n======================================================');
        console.log('📥 [USER CHAT REQUEST JSON]:');
        console.log(JSON.stringify(req.body, null, 2));
        console.log('======================================================');

        const { message, hasActiveTrip = false, travel_dates = null } = req.body; 

        if (!message) {
            return res.status(400).json({ success: false, error: "Message is required" });
        }

        const hasTravelDates = !!(travel_dates && travel_dates.start_date);

        // 1. Check MongoDB for relevant places in Penang
        const placesFound = await findPlacesFromMongo(message);
        console.log(`\n🔍 [MONGODB PLACES RETRIEVAL]: Found ${placesFound.length} matching places`);

        // 2. Query gemma4:cloud with places context
        const rawReply = await chatWithBird(message, hasActiveTrip, placesFound, hasTravelDates);
        
        // --- PARSE INTENTS AND EMOTIONS ---
        let cleanReply = rawReply;
        let action = "NONE";
        let emotion = "happy";

        const intentMatch = rawReply.match(/\[INTENT:\s*(.*?)\]/);
        if (intentMatch) {
            action = intentMatch[1].trim();
            cleanReply = rawReply.replace(/\[INTENT:\s*.*?\]/, '').trim();
        }

        // Fallback: If user asks to plan/lock but dates are missing, enforce REQUIRE_DATES
        const lowerMsg = message.toLowerCase();
        if ((lowerMsg.includes('save and plan') || lowerMsg.includes('plan trip') || lowerMsg.includes('lock trip') || lowerMsg.includes('lock itinerary')) && !hasTravelDates) {
            action = "REQUIRE_DATES";
            cleanReply = "Jom! Let's lock in your Penang adventure! When will you be traveling? Please select your dates.";
        }

        if (action === "LOCK_TRIP") {
            emotion = "success";
        } else if (action === "CANCEL_TRIP") {
            emotion = "sad";
        } else if (action === "REQUIRE_DATES") {
            emotion = "happy";
        }

        // 3. Format structured suggested places for Flutter UI
        const structuredPlaces = placesFound.map((p, idx) => {
            const coords = (p.place_location && p.place_location.coordinates) || [100.328, 5.414];
            return {
                id: p._id ? p._id.toString() : `mongo_${idx}_${Date.now()}`,
                name: p.place_name,
                area: extractArea(p),
                description: p.place_summary || p.place_address || 'Penang attraction',
                lat: coords[1], // Latitude
                lng: coords[0], // Longitude
                category: p.place_category || 'Attraction',
                estimatedStayMinutes: p.place_category === 'Cafes' ? 45 : 60
            };
        });

        const responsePayload = { 
            success: true, 
            reply: cleanReply,
            action: action,
            emotion: emotion,
            model: "gemma4:cloud",
            suggestedPlaces: structuredPlaces
        };

        console.log('\n📤 [RESPONSE JSON SENT TO FLUTTER APP]:');
        console.log(JSON.stringify(responsePayload, null, 2));
        console.log('======================================================\n');

        res.json(responsePayload);

    } catch (err) {
        console.error("Bird API Error:", err.message);
        res.status(500).json({ success: false, error: "Failed to communicate with Travel Bird via gemma4:cloud." });
    }
});

// --- 🧭 AI ITINERARY OPTIMIZATION & TIME SCHEDULER ENDPOINT ---
router.post('/plan-itinerary', async (req, res) => {
    try {
        console.log('\n======================================================');
        console.log('📥 [ITINERARY PLANNING REQUEST RECEIVED]:');
        console.log(JSON.stringify(req.body, null, 2));
        console.log('======================================================');

        const { places = [], travel_dates = null, weather_info = null, user_overrides = [] } = req.body;

        if (!Array.isArray(places) || places.length === 0) {
            return res.status(400).json({ success: false, error: "At least one place is required to plan an itinerary." });
        }

        // Phase 2 Date Gatekeeper
        if (!travel_dates || !travel_dates.start_date) {
            return res.json({
                success: false,
                require_dates: true,
                action: "REQUIRE_DATES",
                mascot_message: "Before I can schedule your itinerary and check venue opening hours, what date will you be visiting Penang? [INTENT: REQUIRE_DATES]"
            });
        }

        // Calculate Target Day of Week (e.g. "monday", "tuesday")
        const travelStartDate = new Date(travel_dates.start_date);
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const targetDay = daysOfWeek[travelStartDate.getDay()] || 'monday';
        const formattedDateString = travel_dates.start_date;

        console.log(`📅 Target Travel Date: ${formattedDateString} (${targetDay.toUpperCase()})`);

        // 1. Enrich places with MongoDB data (business hours for target day, category, coordinates)
        const enrichedPlaces = [];
        let hasOutdoorStops = false;

        for (const p of places) {
            let dbPlace = null;
            if (p.name) {
                dbPlace = await Place.findOne({ place_name: { $regex: `^${p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } })
                    || await Place.findOne({ place_name: { $regex: p.name.split(' ')[0], $options: 'i' } });
            }

            const category = p.category || dbPlace?.place_category || 'Attraction';
            const isOutdoor = isOutdoorCategory(category);
            if (isOutdoor) hasOutdoorStops = true;

            const bHoursObj = dbPlace?.place_business_hours || {};
            const todayHours = (bHoursObj[targetDay] || '9:00 AM - 6:00 PM').trim();
            const isClosedToday = todayHours.toLowerCase().includes('closed');

            enrichedPlaces.push({
                id: p.id || dbPlace?._id?.toString() || `stop_${Date.now()}_${Math.random()}`,
                name: p.name,
                area: p.area || (dbPlace ? extractArea(dbPlace) : 'Penang'),
                category: category,
                isOutdoor: isOutdoor,
                estimatedStayMinutes: p.estimatedStayMinutes || (category.toLowerCase().includes('cafe') ? 45 : 60),
                lat: p.lat || (dbPlace?.place_location?.coordinates ? dbPlace.place_location.coordinates[1] : 5.414),
                lng: p.lng || (dbPlace?.place_location?.coordinates ? dbPlace.place_location.coordinates[0] : 100.328),
                description: p.description || dbPlace?.place_summary || '',
                todayHours: todayHours,
                isClosedToday: isClosedToday
            });
        }

        // Check Weather Forecast
        const isRainyWeather = !!(weather_info && (
            (weather_info.condition && weather_info.condition.toLowerCase().includes('rain')) ||
            (weather_info.condition && weather_info.condition.toLowerCase().includes('thunderstorm')) ||
            (weather_info.condition && weather_info.condition.toLowerCase().includes('drizzle')) ||
            (weather_info.precipitation_probability && weather_info.precipitation_probability > 50)
        ));

        // 2. Formulate Prompt for gemma4:cloud with Scheduling, Heat & Free-Time rules
        const prompt = `
You are 'Kia-Kia Penang Pink Bird', an expert AI travel guide for Penang, Malaysia.
The user is planning a trip on ${formattedDateString} (${targetDay.toUpperCase()}) with ${enrichedPlaces.length} selected places.

SELECTED PLACES ON ${targetDay.toUpperCase()}:
${enrichedPlaces.map((p, i) => `${i + 1}. "${p.name}" (Area: ${p.area}, Category: ${p.category}, Outdoor: ${p.isOutdoor}, Hours: "${p.todayHours}", Closed: ${p.isClosedToday}, Coordinates: [${p.lng}, ${p.lat}])`).join('\n')}

SCHEDULING & SEQUENCING RULES:
1. **Cool Morning / Late Afternoon**: Schedule outdoor/nature/beach spots during cooler hours (08:30 AM - 10:30 AM or 05:00 PM - 07:00 PM).
2. **Midday Peak Heat**: Schedule indoor museums, cultural mansions, air-conditioned cafes or food courts during midday (11:00 AM - 03:00 PM).
3. **Soft Conflict Warnings**:
   - If an outdoor spot must be visited during midday (11:00 AM - 03:00 PM), set "warning_flag": "PEAK_HEAT".
   - If a place is closed on ${targetDay}, set "warning_flag": "CLOSED".
   - Otherwise, set "warning_flag": null.
4. **Bridge-Based "Free Time" Block (自由时间)**:
   - Insert exactly ONE 1.5 to 2.0-hour "free_time" block (e.g. 01:30 PM - 03:00 PM) bridging distinct geographic zones or after lunch.
   - For this free_time block, generate 3 localized options:
     * Option A: Spontaneous activity near previous stop.
     * Option B: Early transit & light activity near next stop.
     * Option C: Rest / unstructured free roaming.
5. Provide a short tip for each stop.

Respond ONLY with a valid JSON object matching this schema:
{
  "mascot_message": "Cheerful overview in Penang Manglish (e.g. Jom, lah, ho chiak)",
  "timeline": [
    {
      "type": "stop",
      "place_name": "Exact place name",
      "time_slot": "09:00 AM - 10:30 AM",
      "tip": "Short visit tip",
      "warning_flag": null
    },
    {
      "type": "free_time",
      "time_slot": "01:30 PM - 03:00 PM",
      "duration": "1.5 hours",
      "options": {
        "A": "Option A near previous stop",
        "B": "Option B near next stop",
        "C": "Rest and relax"
      }
    }
  ]
}
`;

        console.log('🤖 [Calling gemma4:cloud for Multi-Phase Itinerary Generation]...');

        let parsedPlan = null;
        try {
            const response = await fetch(OLLAMA_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "gemma4:cloud",
                    prompt: prompt,
                    stream: false,
                    format: "json",
                    temperature: 0.3
                })
            });

            const data = await response.json();
            if (!data.error && data.response) {
                let rawOutput = data.response.trim();
                if (rawOutput.startsWith('```json')) {
                    rawOutput = rawOutput.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
                } else if (rawOutput.startsWith('```')) {
                    rawOutput = rawOutput.replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
                }
                parsedPlan = JSON.parse(rawOutput);
            }
        } catch (e) {
            console.error("LLM Generation failed or timed out, generating deterministic timeline:", e.message);
        }

        // 3. Assemble Final Timeline Items with Strict Contract
        const timeline = [];
        const usedPlaces = new Set();

        if (parsedPlan && Array.isArray(parsedPlan.timeline) && parsedPlan.timeline.length > 0) {
            for (const item of parsedPlan.timeline) {
                if (item.type === 'free_time') {
                    timeline.push({
                        type: 'free_time',
                        time_slot: item.time_slot || '01:30 PM - 03:00 PM',
                        duration: item.duration || '1.5 hours',
                        options: {
                            A: item.options?.A || 'Explore local cafes and street art nearby.',
                            B: item.options?.B || 'Head early towards the next area for seaside views.',
                            C: item.options?.C || 'Free exploration or rest at accommodation.'
                        }
                    });
                } else if (item.type === 'stop' || item.place_name || item.name) {
                    const stopName = (item.place_name || item.name || '').toLowerCase().trim();
                    const ep = enrichedPlaces.find(p => p.name.toLowerCase().includes(stopName) || stopName.includes(p.name.toLowerCase()))
                               || enrichedPlaces.find((_, idx) => !usedPlaces.has(idx))
                               || enrichedPlaces[0];

                    if (ep) {
                        usedPlaces.add(ep.name);
                        let warningFlag = item.warning_flag || null;
                        if (ep.isClosedToday) {
                            warningFlag = 'CLOSED';
                        } else if (!warningFlag && ep.isOutdoor && ((item.time_slot || '').includes('12:') || (item.time_slot || '').includes('01:') || (item.time_slot || '').includes('02:'))) {
                            warningFlag = 'PEAK_HEAT';
                        }

                        timeline.push({
                            type: 'stop',
                            place_name: ep.name,
                            area: ep.area,
                            category: ep.category,
                            lat: ep.lat,
                            lng: ep.lng,
                            time_slot: item.time_slot || '10:00 AM - 11:30 AM',
                            tip: item.tip || `Enjoy exploring ${ep.name}!`,
                            warning_flag: warningFlag
                        });
                    }
                }
            }
        }

        // Fallback: If LLM didn't return all places or failed, build deterministically
        if (timeline.filter(t => t.type === 'stop').length < enrichedPlaces.length) {
            timeline.length = 0; // reset
            let currentHour = 9;
            let currentMinute = 0;

            const outdoorStops = enrichedPlaces.filter(p => p.isOutdoor);
            const indoorStops = enrichedPlaces.filter(p => !p.isOutdoor);
            const ordered = [...outdoorStops.slice(0, 1), ...indoorStops, ...outdoorStops.slice(1)];

            ordered.forEach((p, idx) => {
                // Insert Free Time after 2nd stop or at 1:30 PM
                if (idx === Math.min(2, ordered.length - 1) && ordered.length >= 2) {
                    timeline.push({
                        type: 'free_time',
                        time_slot: '01:30 PM - 03:00 PM',
                        duration: '1.5 hours',
                        options: {
                            A: `Stay in ${p.area} for famous Penang desserts & street art.`,
                            B: `Head early to ${ordered[Math.min(idx + 1, ordered.length - 1)]?.area || 'next stop'} for a breezy coffee.`,
                            C: 'Unstructured rest & recharge at accommodation.'
                        }
                    });
                    currentHour = 15;
                    currentMinute = 0;
                }

                const startH = currentHour.toString().padStart(2, '0');
                const startM = currentMinute.toString().padStart(2, '0');
                const startPeriod = currentHour >= 12 ? 'PM' : 'AM';
                const dispStartH = currentHour > 12 ? currentHour - 12 : currentHour;

                const endTotalMin = currentHour * 60 + currentMinute + (p.estimatedStayMinutes || 60);
                const endH = Math.floor(endTotalMin / 60);
                const endM = endTotalMin % 60;
                const endPeriod = endH >= 12 ? 'PM' : 'AM';
                const dispEndH = endH > 12 ? endH - 12 : endH;

                const timeSlot = `${dispStartH}:${startM} ${startPeriod} - ${dispEndH}:${endM.toString().padStart(2, '0')} ${endPeriod}`;
                
                let warningFlag = null;
                if (p.isClosedToday) {
                    warningFlag = 'CLOSED';
                } else if (p.isOutdoor && currentHour >= 11 && currentHour <= 14) {
                    warningFlag = 'PEAK_HEAT';
                }

                timeline.push({
                    type: 'stop',
                    place_name: p.name,
                    area: p.area,
                    category: p.category,
                    lat: p.lat,
                    lng: p.lng,
                    time_slot: timeSlot,
                    tip: p.isOutdoor ? 'Wear sunscreen and stay hydrated!' : 'Great spot to enjoy indoors during the day.',
                    warning_flag: warningFlag
                });

                currentHour = endH;
                currentMinute = endM + 20; // 20 mins transit
                if (currentMinute >= 60) {
                    currentHour += Math.floor(currentMinute / 60);
                    currentMinute %= 60;
                }
            });
        }

        // 4. Generate Rainy-Day Backup Plan if Rainy & Outdoor Stops Exist
        let weatherAlert = null;
        let backupPlan = null;

        if (isRainyWeather && hasOutdoorStops) {
            const indoorAlts = await getIndoorBackupPlaces(3);
            weatherAlert = {
                is_rainy: true,
                condition: weather_info.condition || 'Rain',
                description: weather_info.description || 'rain showers forecasted',
                date: formattedDateString,
                message: `Rain is forecasted for your travel date on ${formattedDateString}! We've created an indoor rainy-day backup plan with top cultural and museum spots.`
            };

            backupPlan = [
                {
                    type: 'stop',
                    place_name: indoorAlts[0]?.place_name || 'Pinang Peranakan Mansion',
                    area: indoorAlts[0]?.place_address?.split(',')[0] || 'George Town',
                    category: 'Museums & Galleries',
                    lat: indoorAlts[0]?.place_location?.coordinates ? indoorAlts[0].place_location.coordinates[1] : 5.418,
                    lng: indoorAlts[0]?.place_location?.coordinates ? indoorAlts[0].place_location.coordinates[0] : 100.340,
                    time_slot: '09:30 AM - 11:30 AM',
                    tip: 'Stunning indoor heritage mansion sheltered from the rain.',
                    warning_flag: null
                },
                {
                    type: 'stop',
                    place_name: indoorAlts[1]?.place_name || 'Wonderfood Museum Penang',
                    area: 'George Town',
                    category: 'Museums & Galleries',
                    lat: indoorAlts[1]?.place_location?.coordinates ? indoorAlts[1].place_location.coordinates[1] : 5.416,
                    lng: indoorAlts[1]?.place_location?.coordinates ? indoorAlts[1].place_location.coordinates[0] : 100.341,
                    time_slot: '11:45 AM - 01:15 PM',
                    tip: 'Fun, air-conditioned indoor food-art exhibition!',
                    warning_flag: null
                },
                {
                    type: 'free_time',
                    time_slot: '01:15 PM - 02:45 PM',
                    duration: '1.5 hours',
                    options: {
                        A: 'Enjoy warm Teh Tarik & Nyonya Kuih in a covered cafe.',
                        B: 'Browse vintage collectibles inside indoor heritage arcades.',
                        C: 'Rest and recharge.'
                    }
                },
                {
                    type: 'stop',
                    place_name: indoorAlts[2]?.place_name || 'Penang State Museum & Art Gallery',
                    area: 'George Town',
                    category: 'Museums & Galleries',
                    lat: indoorAlts[2]?.place_location?.coordinates ? indoorAlts[2].place_location.coordinates[1] : 5.420,
                    lng: indoorAlts[2]?.place_location?.coordinates ? indoorAlts[2].place_location.coordinates[0] : 100.339,
                    time_slot: '03:00 PM - 04:30 PM',
                    tip: 'Immerse in Penang history without worrying about wet weather.',
                    warning_flag: null
                }
            ];
        }

        const responsePayload = {
            success: true,
            mascot_message: parsedPlan?.mascot_message || "Ngam lah! Here is your AI-optimized itinerary timeline with best visit times!",
            timeline: timeline,
            weather_alert: weatherAlert,
            backup_plan: backupPlan,
            travel_dates: travel_dates,
            emotion: "success"
        };

        console.log('\n📤 [OPTIMIZED TIMELINE RESPONSE]:');
        console.log(JSON.stringify(responsePayload, null, 2));
        console.log('======================================================\n');

        res.json(responsePayload);

    } catch (err) {
        console.error("Itinerary Planning API Error:", err.message);
        res.status(500).json({ success: false, error: "Failed to optimize and plan itinerary." });
    }
});

module.exports = router;



// # DATE REQUIREMENT RULE
// If the user wants to lock or finalize the trip, you MUST check if the travel dates are known. 
// - If dates are UNKNOWN, reply asking for the dates and append [INTENT: REQUIRE_DATES].
// - Example: "Let's lock it in! But wait, when are you traveling? [INTENT: REQUIRE_DATES]"

// # SCHEDULING & BUSINESS HOURS RULE
// When generating the final timeline with known dates, strictly respect the provided operating hours for each location. Do not schedule a visit when a place is closed (e.g., closed on Mondays).

// # THE "FREE TIME" RULE
// When generating a full-day itinerary, you MUST include at least one "Free Time (自由时间)" block of 1.5 to 2 hours (e.g., after lunch or before dinner). 
// - Label it clearly as "Free Time / 自由时间" in the schedule.
// - If the user later asks "What should I do during my free time?", suggest 2-3 spontaneous nearby activities (like a hidden cafe, street art hunting, or local dessert) based on their last scheduled location.

// # ADVICE VS. OVERRIDE RULE
// - You have strong domain knowledge of Penang's weather and optimal visiting windows (e.g., beaches at sunset, indoor heritage mansions during midday heat).
// - When generating the initial itinerary, always place outdoor/beach activities in the early morning or late afternoon (after 5:00 PM).
// - If the user insists on visiting an outdoor/beach place at midday (11:00 AM - 3:00 PM):
//   1. Respect their choice and assign the requested time.
//   2. Add a friendly, lighthearted warning about the heat/sun.
//   3. Suggest carrying sun protection or staying hydrated.

