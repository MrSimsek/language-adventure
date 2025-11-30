"use client";

import { useState, useEffect } from "react";

// German word translations dictionary
const translations: Record<string, string> = {
  // Articles
  "der": "the (masculine)",
  "die": "the (feminine/plural)",
  "das": "the (neuter)",
  "ein": "a/an (masculine/neuter)",
  "eine": "a/an (feminine)",
  "einen": "a/an (accusative masculine)",
  "einer": "a/an (dative feminine)",
  "einem": "a/an (dative masculine/neuter)",
  "den": "the (accusative masculine/dative plural)",
  "dem": "the (dative masculine/neuter)",
  
  // Pronouns
  "ich": "I",
  "du": "you (informal)",
  "er": "he",
  "sie": "she/they",
  "es": "it",
  "wir": "we",
  "Sie": "you (formal)",
  
  // Common verbs
  "geht": "goes",
  "ist": "is",
  "sind": "are",
  "hat": "has",
  "haben": "have",
  "macht": "makes/does",
  "sieht": "sees",
  "findet": "finds",
  "braucht": "needs",
  "kauft": "buys",
  "bezahlt": "pays",
  "trinkt": "drinks",
  "isst": "eats",
  "liest": "reads",
  "spielt": "plays",
  "setzt": "sits",
  "genießt": "enjoys",
  "wacht": "wakes",
  "fährt": "drives/goes",
  "beginnt": "begins",
  "arbeitet": "works",
  "liebt": "loves",
  "besucht": "visits",
  "wohnen": "live",
  "hilft": "helps",
  "fühlt": "feels",
  "sucht": "searches/looks for",
  "leiht": "lends/borrows",
  "aus": "out",
  
  // Nouns
  "Café": "café",
  "Kaffee": "coffee",
  "Buch": "book",
  "Tag": "day",
  "Park": "park",
  "Bäume": "trees",
  "Baum": "tree",
  "Sonne": "sun",
  "Kinder": "children",
  "Kind": "child",
  "Fußball": "soccer/football",
  "Bank": "bench",
  "Ruhe": "quiet/peace",
  "Supermarkt": "supermarket",
  "Lebensmittel": "groceries/food",
  "Brot": "bread",
  "Milch": "milk",
  "Äpfel": "apples",
  "Apfel": "apple",
  "Menschen": "people",
  "Mensch": "person",
  "Kasse": "cash register/checkout",
  "Morgen": "morning",
  "Uhr": "o'clock/hour",
  "Arbeit": "work",
  "Büro": "office",
  "Lehrerin": "teacher (female)",
  "Beruf": "profession/job",
  "Wochenende": "weekend",
  "Samstag": "Saturday",
  "Großeltern": "grandparents",
  "Dorf": "village",
  "Garten": "garden",
  "Mittag": "noon/lunch",
  "Sonntag": "Sunday",
  "Hause": "home",
  "Bibliothek": "library",
  "Bücher": "books",
  "Geschichte": "history/story",
  "Wochen": "weeks",
  "Woche": "week",
  
  // Adjectives
  "heiß": "hot",
  "langsam": "slowly",
  "schöner": "beautiful/nice",
  "schön": "beautiful/nice",
  "viele": "many",
  "groß": "big/large",
  "kleinen": "small (dative)",
  "klein": "small",
  "interessantes": "interesting",
  "ruhig": "quiet",
  "entspannt": "relaxed",
  "typischer": "typical",
  "regelmäßig": "regularly",
  "neue": "new (plural)",
  "neuen": "new (accusative plural)",
  "neues": "new (neuter)",
  
  // Adverbs and other words
  "ins": "into the",
  "in": "in/into",
  "im": "in the",
  "am": "on the/at",
  "zur": "to the",
  "zurück": "back",
  "nach": "to/after",
  "für": "for",
  "über": "about/over",
  "mit": "with",
  "auf": "on/up",
  "an": "at/on",
  "und": "and",
  "oder": "or",
  "aber": "but",
  "dann": "then",
  "als": "as",
  "zusammen": "together",
  "sehr": "very",
  "zwei": "two",
  "sieben": "seven",
  "neun": "nine",
  "alle": "all",
  "alles": "everything",
  "jeden": "every (accusative)",
  "jeder": "every",
  "sich": "oneself/themselves",
  "ihren": "her/their (accusative plural)",
  "seine": "his",
  "ihre": "her/their",
  "ihrem": "her/their (dative)",
  "ihr": "her/their/you (plural informal)",
  "sein": "his/to be",
  "seinem": "his (dative)",
};

interface InteractiveStoryProps {
  text: string;
}

export default function InteractiveStory({ text }: InteractiveStoryProps) {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [tappedWord, setTappedWord] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Split text into words, preserving punctuation and spaces
  const words = text.split(/(\s+|[.,!?;:])/).filter(w => w.length > 0);

  const getTranslation = (word: string): string => {
    // Remove punctuation for lookup
    const cleanWord = word.replace(/[.,!?;:]/g, "").trim();
    if (!cleanWord) return "";
    
    const lowerWord = cleanWord.toLowerCase();
    
    // Try exact match first
    if (translations[lowerWord]) {
      return translations[lowerWord];
    }
    
    // Try capitalized version
    const capitalized = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase();
    if (translations[capitalized]) {
      return translations[capitalized];
    }
    
    // Try original case
    if (translations[cleanWord]) {
      return translations[cleanWord];
    }
    
    return "Translation not available";
  };

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[.,!?;:]/g, "").trim();
    if (!cleanWord) return;
    
    if (isMobile) {
      // Toggle tap on mobile
      setTappedWord(tappedWord === cleanWord ? null : cleanWord);
      setHoveredWord(null);
    }
  };

  const handleWordHover = (word: string) => {
    if (!isMobile) {
      const cleanWord = word.replace(/[.,!?;:]/g, "").trim();
      if (cleanWord) {
        setHoveredWord(cleanWord);
      }
    }
  };

  const handleWordLeave = () => {
    if (!isMobile) {
      setHoveredWord(null);
    }
  };

  return (
    <div className="relative">
      <div className="text-lg md:text-xl leading-relaxed text-gray-900">
        {words.map((word, index) => {
          const cleanWord = word.replace(/[.,!?;:]/g, "").trim();
          const isPunctuation = /^[.,!?;:]+$/.test(word);
          const isWhitespace = /^\s+$/.test(word);
          const translation = getTranslation(cleanWord);
          const isHovered = hoveredWord === cleanWord;
          const isTapped = tappedWord === cleanWord;
          const showTranslation = (isHovered || isTapped) && !isPunctuation && !isWhitespace;

          if (isPunctuation || isWhitespace) {
            return <span key={index}>{word}</span>;
          }

          return (
            <span
              key={index}
              className={`relative inline-block ${
                showTranslation
                  ? "bg-yellow-200 rounded px-1 cursor-pointer"
                  : "hover:bg-yellow-100 rounded px-1 cursor-pointer transition-colors"
              }`}
              onMouseEnter={() => handleWordHover(cleanWord)}
              onMouseLeave={handleWordLeave}
              onClick={() => handleWordClick(word)}
              onTouchStart={(e) => {
                // Prevent double-tap zoom on mobile
                if (e.touches.length === 1) {
                  handleWordClick(word);
                }
              }}
            >
              {word}
              {showTranslation && (
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                  {translation}
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></span>
                </span>
              )}
            </span>
          );
        })}
      </div>
      
      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
        <div className="text-sm text-blue-800">
          <strong>💡 Tip:</strong>{" "}
          <span className="hidden md:inline">Hover over words to see translations</span>
          <span className="md:hidden">Tap words to see translations</span>
        </div>
      </div>
    </div>
  );
}

