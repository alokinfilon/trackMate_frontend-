export const strings = {
  headerTitle: 'Travel Preferences',
  saveBtn: 'Save Preferences',
  finishBtn: 'Finish',
  nextBtn: 'Next →',
  successTitle: 'Preferences Saved',
  successMsg: 'Your travel preferences have been successfully synchronized!',
};

export const FALLBACK_PREFERENCES = [
  {
    category: "fav_country",
    title: "Favorite Countries",
    subtitle: "Select the countries you enjoy visiting most",
    options: [
      { id: "in", label: "India", emoji: "🇮🇳" },
      { id: "jp", label: "Japan", emoji: "🇯🇵" },
      { id: "ch", label: "Switzerland", emoji: "🇨🇭" },
      { id: "us", label: "United States", emoji: "🇺🇸" },
      { id: "it", label: "Italy", emoji: "🇮🇹" },
      { id: "th", label: "Thailand", emoji: "🇹🇭" },
      { id: "fr", label: "France", emoji: "🇫🇷" },
      { id: "ae", label: "United Arab Emirates", emoji: "🇦🇪" },
      { id: "gb", label: "United Kingdom", emoji: "🇬🇧" },
      { id: "au", label: "Australia", emoji: "🇦🇺" },
      { id: "sg", label: "Singapore", emoji: "🇸🇬" },
      { id: "ca", label: "Canada", emoji: "🇨🇦" }
    ]
  },
  {
    category: "dream_destination",
    title: "Dream Destinations",
    subtitle: "Where is on your ultimate travel bucket list?",
    options: [
      { id: "is", label: "Iceland", emoji: "🇮🇸" },
      { id: "nz", label: "New Zealand", emoji: "🇳🇿" },
      { id: "no", label: "Norway (Northern Lights)", emoji: "🇳🇴" },
      { id: "gr", label: "Greece (Santorini)", emoji: "🇬🇷" },
      { id: "eg", label: "Egypt", emoji: "🇪🇬" },
      { id: "mv", label: "Maldives", emoji: "🇲🇻" },
      { id: "za", label: "South Africa (Safari)", emoji: "🇿🇦" },
      { id: "pe", label: "Peru (Machu Picchu)", emoji: "🇵🇪" },
      { id: "br", label: "Brazil (Rio de Janeiro)", emoji: "🇧🇷" },
      { id: "at", label: "Austria (Vienna & Alps)", emoji: "🇦🇹" },
      { id: "cr", label: "Costa Rica", emoji: "🇨🇷" },
      { id: "fi", label: "Finland (Lapland)", emoji: "🇫🇮" }
    ]
  },
  {
    category: "travel_budget",
    title: "Travel Budget",
    subtitle: "What is your typical budget per day/trip?",
    options: [
      { id: "tier_1", label: "0 - 5,000 INR (Budget / Day trip)", emoji: "💵" },
      { id: "tier_2", label: "5,000 - 15,000 INR (Weekend getaway)", emoji: "💰" },
      { id: "tier_3", label: "15,000 - 40,000 INR (Short domestic holiday)", emoji: "💳" },
      { id: "tier_4", label: "40,000 - 1,00,000 INR (Standard vacation / Budget international)", emoji: "👜" },
      { id: "tier_5", label: "1,00,000 - 2,50,000 INR (Comfortable international trip)", emoji: "✈️" },
      { id: "tier_6", label: "2,50,000+ INR (Luxury / Premium experience)", emoji: "👑" },
      { id: "custom", label: "Custom Budget (User defined)", emoji: "⚙️" }
    ]
  },
  {
    category: "trip_type_preference",
    title: "Trip Type Preference",
    subtitle: "Who do you usually travel with?",
    options: [
      { id: "solo", label: "Solo Travel", emoji: "🧑" },
      { id: "couple", label: "Couple / Romantic", emoji: "💑" },
      { id: "family", label: "Family with Kids", emoji: "👨‍👩‍👧‍👦" },
      { id: "friends", label: "Group of Friends", emoji: "👥" },
      { id: "business", label: "Business & Leisure (Bleisure)", emoji: "💼" }
    ]
  },
  {
    category: "travel_history",
    title: "Travel History",
    subtitle: "How would you describe your travel history?",
    options: [
      { id: "beginner", label: "Beginner (Mostly domestic)", emoji: "🧭" },
      { id: "occasional", label: "Occasional (1-2 international trips)", emoji: "✈️" },
      { id: "frequent", label: "Frequent Explorer (3+ trips a year)", emoji: "🗺️" },
      { id: "nomad", label: "Digital Nomad / Full-time traveler", emoji: "💻" }
    ]
  },
  {
    category: "language_spoken",
    title: "Languages Spoken",
    subtitle: "What languages do you speak or prefer?",
    options: [
      { id: "en", label: "English", emoji: "🇺🇸" },
      { id: "es", label: "Spanish", emoji: "🇪🇸" },
      { id: "hi", label: "Hindi", emoji: "🇮🇳" },
      { id: "fr", label: "French", emoji: "🇫🇷" },
      { id: "ja", label: "Japanese", emoji: "🇯🇵" },
      { id: "de", label: "German", emoji: "🇩🇪" }
    ]
  },
  {
    category: "interest_hobbies",
    title: "Interests & Hobbies",
    subtitle: "What activities do you enjoy during trips?",
    options: [
      { id: "history", label: "History & Culture", emoji: "🏛️" },
      { id: "adventure", label: "Adventure & Hiking", emoji: "🪂" },
      { id: "food", label: "Food & Culinary Tours", emoji: "🍕" },
      { id: "nature", label: "Nature & Wildlife", emoji: "🦁" },
      { id: "nightlife", label: "Nightlife & Entertainment", emoji: "🍻" },
      { id: "relaxation", label: "Beaches & Relaxation", emoji: "🏖️" }
    ]
  },
  {
    category: "seasonal_preference",
    title: "Seasonal Preference",
    subtitle: "Which seasons do you prefer for vacation?",
    options: [
      { id: "winter", label: "Winter / Snow & Skiing", emoji: "❄️" },
      { id: "summer", label: "Summer / Sun & Beaches", emoji: "☀️" },
      { id: "spring", label: "Spring / Blossoms & Mild Weather", emoji: "🌸" },
      { id: "autumn", label: "Autumn / Fall Foliage", emoji: "🍂" }
    ]
  },
  {
    category: "travel_frequency",
    title: "Travel Frequency",
    subtitle: "How often do you travel?",
    options: [
      { id: "weekly", label: "Weekly", emoji: "📅" },
      { id: "monthly", label: "Monthly", emoji: "🗓️" },
      { id: "frequently", label: "Frequently", emoji: "✈️" },
      { id: "2_in_3_months", label: "2 times in 3 months", emoji: "⏰" },
      { id: "2_in_6_months", label: "2 times in 6 months", emoji: "⏳" },
      { id: "rarely", label: "Once a year or less", emoji: "🛑" }
    ]
  },
  {
    category: "travel_preference",
    title: "Travel Style",
    subtitle: "What pace of travel do you prefer?",
    options: [
      { id: "relaxed", label: "Relaxed & Slow-paced", emoji: "🛋️" },
      { id: "balanced", label: "Balanced (Sightseeing + Downtime)", emoji: "⚖️" },
      { id: "fast", label: "Action-packed & Fast-paced", emoji: "⚡" }
    ]
  }
];
