const commonTransitions = {
  on: {
    HELP: "help",
  },
  keywords: {
    HELP: ["human", "support", "help"],
    YES: ["yes", "ok", "alright", "yup"],
    NO: ["no", "nope"],
  }
};

// Conversation States 
export const apartmentFinderMachine = {
  initial: "root",
  states: {
    root: {
      message: "Hi, I’m here to help you find the right apartment. Are you ready to start?",
      fallback: "I’m sorry, I didn’t understand you. Please type yes to begin.",
      on: { YES: "askBudget", NO: "help", ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: false
    },

    // ================================
    // BUDGET CHOICE
    // ================================
    askBudget: {
      message: "What is your monthly budget range? Low-end (<$1000), mid-range ($1000-$2000), or high-end ($2000+)?",
      fallback: "I’m sorry, please answer with low, mid, or high.",
      on: { LOW: "lowRoommates", MID: "midModernOrOld", HIGH: "highAmenities", ...commonTransitions.on },
      keywords: {
        LOW: ["cheap", "budget", "low", "affordable", "under 1000"],
        MID: ["mid", "average", "normal", "1000", "2000"],
        HIGH: ["high", "expensive", "premium", "luxury", "2000+"],
        ...commonTransitions.keywords
      },
      terminal: false
    },

    // ================================
    // LOW BUDGET BRANCH
    // ================================
    lowRoommates: {
      message: "Would you share the apartment with roommates?",
      fallback: "Please answer yes or no.",
      on: { YES: "recommendCoLiving", NO: "lowDowntownOrSuburb", ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: false
    },

    lowDowntownOrSuburb: {
      message: "Do you need to be near downtown, or is the suburb okay?",
      fallback: "Please answer downtown or suburb.",
      on: { DOWNTOWN: "recommendMicroStudent", SUBURB: "lowOldBuilding", ...commonTransitions.on },
      keywords: {
        DOWNTOWN: ["downtown", "city", "center", "urban"],
        SUBURB: ["suburb", "outside", "commute"],
        ...commonTransitions.keywords
      },
      terminal: false
    },

    lowOldBuilding: {
      message: "Would you consider older buildings with fewer amenities to save money?",
      fallback: "Please answer yes or no.",
      on: { YES: "recommendOlderStock", NO: "recommendBudgetModern", ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: false
    },

    // Low Budget Recommendations
    recommendCoLiving: {
      message: "We recommend co-living or shared housing for maximum affordability.",
      fallback: "Yay! That’s all for now. Reset anytime to explore more housing options!",
      on: { ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: true
    },
    recommendMicroStudent: {
      message: "We recommend micro-apartments or student housing near downtown for cost savings.",
      fallback: "Yay! That’s all for now. Reset anytime to explore more housing options!",
      on: { ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: true
    },
    recommendOlderStock: {
      message: "We recommend older apartment buildings with fewer amenities but lower rent.",
      fallback: "Yay! That’s all for now. Reset anytime to explore more housing options!",
      on: { ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: true
    },
    recommendBudgetModern: {
      message: "We recommend budget-friendly modern complexes in suburbs.",
      fallback: "Yay! That’s all for now. Reset anytime to explore more housing options!",
      on: { ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: true
    },

    // ================================
    // MID-RANGE BRANCH
    // ================================
    midModernOrOld: {
      message: "Do you prefer a modern building or older charm?",
      fallback: "Please answer modern or old.",
      on: { MODERN: "midLaundry", OLD: "midLaundry", ...commonTransitions.on },
      keywords: {
        MODERN: ["modern", "new", "updated"],
        OLD: ["old", "vintage", "classic", "charm"],
        ...commonTransitions.keywords
      },
      terminal: false
    },

    midLaundry: {
      message: "Do you want in-unit laundry?",
      fallback: "Please answer yes or no.",
      on: { YES: "midTransportOrParking", NO: "midTransportOrParking", ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: false
    },

    midTransportOrParking: {
      message: "Do you prefer being closer to public transport or having a parking space?",
      fallback: "Please answer transport or parking.",
      on: { TRANSPORT: "recommendMidTransport", PARKING: "recommendMidParking", ...commonTransitions.on },
      keywords: {
        TRANSPORT: ["transport", "metro", "subway", "bus", "train"],
        PARKING: ["parking", "car", "garage"],
        ...commonTransitions.keywords
      },
      terminal: false
    },

    // Mid-Range Recommendations
    recommendMidTransport: {
      message: "We recommend mid-range apartments near city centers or metro stations for convenience.",
      fallback: "Yay! That’s all for now. Reset anytime to explore more housing options!",
      on: { ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: true
    },
    recommendMidParking: {
      message: "We recommend mid-range suburban apartments with parking or commuter-friendly access.",
      fallback: "Yay! That’s all for now. Reset anytime to explore more housing options!",
      on: { ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: true
    },

    // ================================
    // HIGH-END BRANCH
    // ================================
    highAmenities: {
      message: "Are you looking for all amenities included? (pool, gym, concierge, etc.)",
      fallback: "Please answer yes or no.",
      on: { YES: "highSpaceOrLocation", NO: "highSpaceOrLocation", ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: false
    },

    highSpaceOrLocation: {
      message: "Do you prioritize space or location?",
      fallback: "Please answer space or location.",
      on: { SPACE: "highLeaseFlexibility", LOCATION: "highLeaseFlexibility", ...commonTransitions.on },
      keywords: {
        SPACE: ["space", "bigger", "large", "house"],
        LOCATION: ["location", "city", "downtown", "central"],
        ...commonTransitions.keywords
      },
      terminal: false
    },

    highLeaseFlexibility: {
      message: "Do you need short-term lease flexibility?",
      fallback: "Please answer yes or no.",
      on: { YES: "recommendServiced", NO: "recommendLuxuryLongTerm", ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: false
    },

    // High-End Recommendations
    recommendServiced: {
      message: "We recommend serviced apartments with flexible lease terms.",
      fallback: "Yay! That’s all for now. Reset anytime to explore more housing options!",
      on: { ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: true
    },
    recommendLuxuryLongTerm: {
      message: "We recommend long-term luxury rentals: penthouses, lofts, or large suburban homes.",
      fallback: "Yay! That’s all for now. Reset anytime to explore more housing options!",
      on: { ...commonTransitions.on },
      keywords: { ...commonTransitions.keywords },
      terminal: true
    },

    // ================================
    // HELP / RESET
    // ================================
    help: {
      message: "If you require human help, contact a rental advisor at: 1-800-APARTMENTS. Type help for this info, start/reset to begin again.",
      fallback: "We’re at the end. Please reset to start again.",
      on: { START: "root", ...commonTransitions.on },
      keywords: {
        ...commonTransitions.keywords,
        START: ["restart", "reset", "start", "begin"]
      },
      terminal: false
    }
  }
};


// Mock Data, would use db in real use case if more time is available
export const apartments=  [
  {
    "id": 1,
    "name": "Downtown Micro-Loft",
    "budget": "low",
    "roommates": true,
    "location": "downtown",
    "building": "modern",
    "amenities": ["shared laundry"],
    "lease": "long-term",
    "price": 900,
    "beds": 1
  },
  {
    "id": 2,
    "name": "Maplewood Shared House",
    "budget": "low",
    "roommates": true,
    "location": "suburb",
    "building": "old",
    "amenities": ["none"],
    "lease": "long-term",
    "price": 850,
    "beds": 2
  },
  {
    "id": 3,
    "name": "Parkside Modern Apartments",
    "budget": "low",
    "roommates": false,
    "location": "suburb",
    "building": "modern",
    "amenities": ["parking"],
    "lease": "long-term",
    "price": 950,
    "beds": 1
  },
  {
    "id": 4,
    "name": "Cedar Grove Flats",
    "budget": "mid",
    "building": "modern",
    "laundry": "in-unit",
    "transport": true,
    "parking": false,
    "lease": "long-term",
    "price": 1600,
    "beds": 2
  },
  {
    "id": 5,
    "name": "Heritage Lofts",
    "budget": "mid",
    "building": "old",
    "laundry": "shared",
    "transport": false,
    "parking": true,
    "lease": "long-term",
    "price": 1450,
    "beds": 1
  },
  {
    "id": 6,
    "name": "The Astoria Downtown",
    "budget": "high",
    "building": "modern",
    "amenities": ["gym", "concierge"],
    "priority": "location",
    "lease": "long-term",
    "price": 2600,
    "beds": 2
  },
  {
    "id": 7,
    "name": "Willow Creek Villas",
    "budget": "high",
    "building": "modern",
    "amenities": ["pool", "gym", "parking"],
    "priority": "space",
    "lease": "long-term",
    "price": 3200,
    "beds": 3
  },
  {
    "id": 8,
    "name": "The Grandview Residences",
    "budget": "high",
    "building": "modern",
    "amenities": ["gym", "concierge", "housekeeping"],
    "priority": "location",
    "lease": "short-term",
    "price": 3500,
    "beds": 1
  }
]


/**
 * Returns recommended apartments based on the terminal state. In real application use db query to find recommended apartment
 * @param {string} terminalState - The terminal state name (e.g. "recommendCoLiving").
 * @returns {Array} - Array of matching apartment objects.
 */
export function getApartmentsForTerminalState(terminalState) {
  console.log(terminalState)
  switch (terminalState) {

    case "recommendCoLiving":
      // Low budget, roommates: true
      return apartments.filter(a => a.budget === "low" && a.roommates === true);
    case "recommendMicroStudent":
      // Low budget, downtown, roommates: false
      return apartments.filter(a => a.budget === "low" && a.location === "downtown" && a.roommates === false);
    case "recommendOlderStock":
      // Low budget, building: old, roommates: false
      return apartments.filter(a => a.budget === "low" && a.building === "old" && a.roommates === false);
    case "recommendBudgetModern":
      // Low budget, building: modern, location: suburb, roommates: false
      return apartments.filter(a => a.budget === "low" && a.building === "modern" && a.location === "suburb" && a.roommates === false);
    case "recommendMidTransport":
      // Mid budget, transport: true
      return apartments.filter(a => a.budget === "mid" && a.transport === true);
    case "recommendMidParking":
      // Mid budget, parking: true
      return apartments.filter(a => a.budget === "mid" && a.parking === true);
    case "recommendServiced":
      // High budget, lease: short-term
      return apartments.filter(a => a.budget === "high" && a.lease === "short-term");
    case "recommendLuxuryLongTerm":
      // High budget, lease: long-term
      return apartments.filter(a => a.budget === "high" && a.lease === "long-term");
    default:
      return [];
  }
}