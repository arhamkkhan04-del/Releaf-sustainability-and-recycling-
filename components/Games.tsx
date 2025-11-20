import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { 
  Gamepad2, Brain, CheckCircle, XCircle, Play, Trophy, 
  Recycle, Trash2, Sprout, Timer, Leaf, CloudRain, Wind,
  Waves, ArrowLeft, Shuffle
} from 'lucide-react';

interface GamesProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

type GameType = 'menu' | 'trivia' | 'sorter' | 'memory' | 'carbon' | 'ocean' | 'scramble';

// --- DATA FOR GAMES ---

const TRIVIA_QUESTIONS = [
  { question: "Which of these items takes the longest to decompose?", options: ["Banana Peel", "Plastic Bottle", "Aluminum Can", "Glass Bottle"], correct: 3 },
  { question: "What percentage of plastic is actually recycled globally?", options: ["9%", "25%", "50%", "75%"], correct: 0 },
  { question: "Which country recycles the most waste?", options: ["USA", "Germany", "Japan", "China"], correct: 1 },
  { question: "What is the 'Great Pacific Garbage Patch' mostly made of?", options: ["Shipwrecks", "Microplastics", "Oil", "Fishing Nets"], correct: 1 },
  { question: "Can pizza boxes be recycled?", options: ["Yes, always", "No, never", "Only if not greasy", "Yes, with plastic"], correct: 2 }
];

const SORTER_ITEMS = [
  { name: "Banana Peel", type: "compost", icon: "🍌" },
  { name: "Plastic Bottle", type: "recycle", icon: "🥤" },
  { name: "Pizza Box (Greasy)", type: "compost", icon: "🍕" },
  { name: "Glass Jar", type: "recycle", icon: "🫙" },
  { name: "Styrofoam Cup", type: "trash", icon: "🥤" },
  { name: "Newspaper", type: "recycle", icon: "📰" },
  { name: "Chip Bag", type: "trash", icon: "🥡" },
  { name: "Apple Core", type: "compost", icon: "🍎" },
  { name: "Aluminum Can", type: "recycle", icon: "🥫" },
  { name: "Diaper", type: "trash", icon: "👶" },
];

const CARBON_PAIRS = [
  { a: { name: "Beef Burger", val: 100 }, b: { name: "Veggie Burger", val: 10 }, question: "Which has a higher carbon footprint?" },
  { a: { name: "Driving 10km", val: 50 }, b: { name: "Cycling 10km", val: 0 }, question: "Which produces more CO2?" },
  { a: { name: "Plastic Bag", val: 20 }, b: { name: "Cotton Bag (1 use)", val: 500 }, question: "Which takes more energy to produce initially?" }, // Tricky one!
  { a: { name: "Local Apple", val: 10 }, b: { name: "Imported Banana", val: 80 }, question: "Which has higher transport emissions?" },
];

const SCRAMBLE_WORDS = [
  { word: "RECYCLE", hint: "Process of converting waste into new materials" },
  { word: "SUSTAINABLE", hint: "Able to be maintained at a certain rate or level" },
  { word: "COMPOST", hint: "Decayed organic material used as plant fertilizer" },
  { word: "PLASTIC", hint: "Synthetic material that takes centuries to decompose" },
  { word: "OCEAN", hint: "Vast body of salt water that needs protection" },
];

const MEMORY_ICONS = ["🌍", "🌱", "♻️", "🔋", "🌊", "🚲", "🥕", "☀️"];

// --- MAIN COMPONENT ---

export const Games: React.FC<GamesProps> = ({ user, onUpdateUser }) => {
  const [activeGame, setActiveGame] = useState<GameType>('menu');
  const [gameScore, setGameScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // Trivia State
  const [triviaQ, setTriviaQ] = useState(0);
  const [triviaSelected, setTriviaSelected] = useState<number | null>(null);

  // Sorter State
  const [sorterItem, setSorterItem] = useState(SORTER_ITEMS[0]);
  const [sorterIndex, setSorterIndex] = useState(0);
  const [sorterFeedback, setSorterFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Memory State
  const [memoryCards, setMemoryCards] = useState<{id: number, icon: string, flipped: boolean, matched: boolean}[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  // Carbon State
  const [carbonIndex, setCarbonIndex] = useState(0);
  
  // Ocean Clicker State
  const [oceanItems, setOceanItems] = useState<{id: number, x: number, y: number, type: string}[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  // Scramble State
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [scrambleInput, setScrambleInput] = useState("");
  const [scrambleFeedback, setScrambleFeedback] = useState("");

  // --- HELPER FUNCTIONS ---

  const awardPoints = (points: number) => {
    if (points > 0) {
        onUpdateUser({ ...user, points: user.points + points });
    }
  };

  const resetGameState = () => {
    setGameScore(0);
    setGameFinished(false);
    setTriviaQ(0);
    setTriviaSelected(null);
    setSorterIndex(0);
    setSorterItem(SORTER_ITEMS[Math.floor(Math.random() * SORTER_ITEMS.length)]); // Random start
    setCarbonIndex(0);
    setTimeLeft(15);
    setScrambleIndex(0);
    setScrambleInput("");
    setScrambleFeedback("");
    setOceanItems([]);
  };

  // --- GAME LOGIC HANDLERS ---

  // Trivia
  const handleTriviaAnswer = (idx: number) => {
    if (triviaSelected !== null) return;
    setTriviaSelected(idx);
    
    const isCorrect = idx === TRIVIA_QUESTIONS[triviaQ].correct;
    const newScore = gameScore + (isCorrect ? 1 : 0);
    if (isCorrect) setGameScore(newScore);

    setTimeout(() => {
      if (triviaQ < TRIVIA_QUESTIONS.length - 1) {
        setTriviaQ(q => q + 1);
        setTriviaSelected(null);
      } else {
        setGameFinished(true);
        // Calculate final points: correct answers * 10
        const finalPoints = newScore * 10;
        awardPoints(finalPoints);
      }
    }, 1000);
  };

  // Sorter
  const handleSort = (type: string) => {
    if (sorterFeedback) return;
    const isCorrect = sorterItem.type === type;
    const pointValue = isCorrect ? 10 : 0;
    const newScore = gameScore + pointValue;

    if (isCorrect) {
      setGameScore(newScore);
      setSorterFeedback('correct');
    } else {
      setSorterFeedback('wrong');
    }

    setTimeout(() => {
      setSorterFeedback(null);
      const nextIndex = sorterIndex + 1;
      if (nextIndex < 10) { // Play 10 rounds
        setSorterIndex(nextIndex);
        setSorterItem(SORTER_ITEMS[Math.floor(Math.random() * SORTER_ITEMS.length)]);
      } else {
        setGameFinished(true);
        awardPoints(newScore);
      }
    }, 800);
  };

  // Memory
  const initMemory = () => {
    const icons = [...MEMORY_ICONS, ...MEMORY_ICONS];
    const shuffled = icons.sort(() => Math.random() - 0.5).map((icon, i) => ({
      id: i, icon, flipped: false, matched: false
    }));
    setMemoryCards(shuffled);
    setFlippedIndices([]);
    setGameScore(0);
    setGameFinished(false);
  };

  const handleCardClick = (idx: number) => {
    if (flippedIndices.length === 2 || memoryCards[idx].flipped || memoryCards[idx].matched) return;

    const newCards = [...memoryCards];
    newCards[idx].flipped = true;
    setMemoryCards(newCards);
    
    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first].icon === memoryCards[second].icon) {
        setTimeout(() => {
          const matchedCards = [...memoryCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          matchedCards[first].flipped = true; 
          matchedCards[second].flipped = true;
          setMemoryCards(matchedCards);
          setFlippedIndices([]);
          
          const newScore = gameScore + 20;
          setGameScore(newScore);
          
          if (matchedCards.every(c => c.matched)) {
            setGameFinished(true);
            awardPoints(newScore + 50); // Score + Bonus
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...memoryCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setMemoryCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  // Carbon Guess
  const handleCarbonGuess = (choice: 'a' | 'b') => {
    const pair = CARBON_PAIRS[carbonIndex];
    const isCorrect = choice === 'a' ? pair.a.val >= pair.b.val : pair.b.val >= pair.a.val;
    
    const pointValue = isCorrect ? 15 : 0;
    const newScore = gameScore + pointValue;
    if (isCorrect) setGameScore(newScore);

    if (carbonIndex < CARBON_PAIRS.length - 1) {
      setCarbonIndex(i => i + 1);
    } else {
      setGameFinished(true);
      awardPoints(newScore);
    }
  };

  // Ocean Clicker Logic
  const initOcean = () => {
    resetGameState();
    setActiveGame('ocean');
    setTimeLeft(20);
  };

  // Ocean Timer
  useEffect(() => {
    // Fix: Use 'any' type for timer instead of NodeJS.Timeout to avoid namespace errors
    let timer: any;
    if (activeGame === 'ocean' && !gameFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (activeGame === 'ocean' && timeLeft === 0 && !gameFinished) {
      setGameFinished(true);
      awardPoints(gameScore); // Award points when time runs out
    }
    return () => clearInterval(timer);
  }, [activeGame, timeLeft, gameFinished]); 
  // Note: Removed gameScore from dependency array to avoid timer flicker, 
  // but awardPoints in the 'timeLeft === 0' block will use current closure state.
  // For perfect accuracy we rely on the render cycle being fast enough or use a Ref.
  // Since React state is updated, the re-render will trigger the effect check.

  // Ocean Spawner
  useEffect(() => {
    // Fix: Use 'any' type for spawner instead of NodeJS.Timeout to avoid namespace errors
    let spawner: any;
    if (activeGame === 'ocean' && !gameFinished) {
      spawner = setInterval(() => {
        setOceanItems(prev => {
          if (prev.length > 8) return prev; 
          return [...prev, {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            type: Math.random() > 0.6 ? 'trash' : 'fish'
          }];
        });
      }, 800);
    }
    return () => clearInterval(spawner);
  }, [activeGame, gameFinished]);

  const handleOceanClick = (id: number, type: string) => {
    if (gameFinished) return;
    setOceanItems(prev => prev.filter(i => i.id !== id));
    if (type === 'trash') {
      setGameScore(s => s + 5);
    } else {
      setGameScore(s => Math.max(0, s - 10)); // Penalty
    }
  };

  // Scramble
  const handleScrambleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = SCRAMBLE_WORDS[scrambleIndex];
    if (scrambleInput.toUpperCase() === current.word) {
      setScrambleFeedback("Correct!");
      const newScore = gameScore + 20;
      setGameScore(newScore);

      setTimeout(() => {
        setScrambleFeedback("");
        setScrambleInput("");
        if (scrambleIndex < SCRAMBLE_WORDS.length - 1) {
          setScrambleIndex(i => i + 1);
        } else {
          setGameFinished(true);
          awardPoints(newScore + 20); // Bonus for completion
        }
      }, 1000);
    } else {
      setScrambleFeedback("Try Again!");
    }
  };
  
  const getScrambledWord = (word: string) => {
    // Simple scramble
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  // --- RENDERERS ---

  const renderMenu = () => (
    <>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <Gamepad2 size={40} className="text-releaf-500" />
            Releaf Arcade
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Play minigames, learn sustainability, and earn real points!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 'trivia', name: 'Eco Trivia', icon: Brain, color: 'from-purple-500 to-indigo-600', desc: 'Test your knowledge on sustainability basics.' },
          { id: 'sorter', name: 'Waste Sorter', icon: Recycle, color: 'from-green-500 to-emerald-600', desc: 'Sort trash, compost, and recycling quickly!' },
          { id: 'memory', name: 'Eco Memory', icon: Sprout, color: 'from-teal-400 to-teal-600', desc: 'Match the eco-friendly symbols.' },
          { id: 'carbon', name: 'Carbon Guess', icon: CloudRain, color: 'from-gray-500 to-slate-600', desc: 'Which activity uses more CO2?' },
          { id: 'ocean', name: 'Ocean Clicker', icon: Waves, color: 'from-blue-400 to-blue-600', desc: 'Clean the ocean before time runs out!' },
          { id: 'scramble', name: 'Word Scramble', icon: Shuffle, color: 'from-orange-400 to-orange-600', desc: 'Unscramble the green vocabulary.' },
        ].map(game => (
          <div key={game.id} className="bg-white dark:bg-[#1F2937] rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 group hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className={`h-40 bg-gradient-to-br ${game.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 bg-black"></div>
                {/* Use React.createElement to render icon component dynamically */}
                {React.createElement(game.icon, { size: 80, className: "text-white/20 absolute -right-4 -bottom-4 rotate-12 group-hover:scale-110 transition-transform" })}
                {React.createElement(game.icon, { size: 48, className: "text-white relative z-10" })}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{game.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-1">{game.desc}</p>
                <button 
                  onClick={() => {
                    resetGameState();
                    if (game.id === 'memory') initMemory();
                    if (game.id === 'ocean') initOcean();
                    else setActiveGame(game.id as GameType);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center gap-2 hover:bg-releaf-600 dark:hover:bg-releaf-400 transition-colors"
                >
                  <Play size={18} /> Play Now
                </button>
              </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderResult = () => (
    <div className="max-w-md mx-auto bg-white dark:bg-[#1F2937] rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8 text-center animate-[float_0.3s_ease-out]">
      <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500">
          <Trophy size={48} fill="currentColor" />
      </div>
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Game Over!</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-6">You did great!</p>
      
      <div className="bg-releaf-50 dark:bg-releaf-900/20 p-6 rounded-2xl mb-8">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Points Scored</p>
          <p className="text-5xl font-bold text-releaf-600 dark:text-releaf-400">{gameScore}</p>
      </div>

      <div className="flex gap-4">
          <button 
            onClick={() => setActiveGame('menu')}
            className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Menu
          </button>
          <button 
            onClick={() => {
              resetGameState();
              if (activeGame === 'memory') initMemory();
              if (activeGame === 'ocean') initOcean();
            }}
            className="flex-1 py-3 rounded-xl bg-releaf-600 hover:bg-releaf-700 text-white font-bold transition-colors"
          >
            Replay
          </button>
      </div>
    </div>
  );

  // --- GAME SCREENS ---

  if (gameFinished) return renderResult();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[600px]">
      {activeGame !== 'menu' && (
        <button 
          onClick={() => setActiveGame('menu')}
          className="flex items-center gap-2 text-slate-500 hover:text-releaf-600 dark:text-slate-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Arcade
        </button>
      )}

      {activeGame === 'menu' && renderMenu()}

      {activeGame === 'trivia' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#1F2937] rounded-3xl shadow-2xl p-8 border border-slate-100 dark:border-slate-700">
           <div className="flex justify-between mb-6">
             <span className="text-slate-400 font-bold">Question {triviaQ + 1}/{TRIVIA_QUESTIONS.length}</span>
             <span className="bg-releaf-100 dark:bg-releaf-900/30 text-releaf-600 dark:text-releaf-400 px-3 py-1 rounded-full font-bold">Score: {gameScore}</span>
           </div>
           <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{TRIVIA_QUESTIONS[triviaQ].question}</h3>
           <div className="space-y-3">
             {TRIVIA_QUESTIONS[triviaQ].options.map((opt, idx) => (
               <button
                 key={idx}
                 onClick={() => handleTriviaAnswer(idx)}
                 className={`w-full p-4 rounded-xl text-left font-medium border-2 transition-all ${
                   triviaSelected !== null
                     ? idx === TRIVIA_QUESTIONS[triviaQ].correct 
                        ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : idx === triviaSelected 
                          ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'border-transparent opacity-50 dark:text-slate-400'
                     : 'border-transparent bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-releaf-50 dark:hover:bg-releaf-900/20 hover:border-releaf-500'
                 }`}
               >
                 {opt}
               </button>
             ))}
           </div>
        </div>
      )}

      {activeGame === 'sorter' && (
        <div className="max-w-2xl mx-auto text-center">
           <div className="mb-8">
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Where does this go?</h3>
             <p className="text-slate-500">Sort items into the correct bin.</p>
           </div>

           <div className="h-48 flex items-center justify-center mb-8">
             <div className={`text-9xl transition-transform duration-300 ${sorterFeedback ? 'scale-0' : 'scale-100'}`}>
               {sorterItem.icon}
             </div>
           </div>
           
           <div className="text-xl font-bold text-slate-900 dark:text-white mb-8">{sorterItem.name}</div>

           {sorterFeedback && (
             <div className={`text-2xl font-bold mb-4 animate-bounce ${sorterFeedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
               {sorterFeedback === 'correct' ? 'Correct! +10' : 'Oops!'}
             </div>
           )}

           <div className="grid grid-cols-3 gap-4">
              <button onClick={() => handleSort('recycle')} className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-6 rounded-2xl flex flex-col items-center gap-2 transition-colors">
                <Recycle size={32} />
                <span className="font-bold">Recycle</span>
              </button>
              <button onClick={() => handleSort('compost')} className="bg-green-100 hover:bg-green-200 text-green-700 p-6 rounded-2xl flex flex-col items-center gap-2 transition-colors">
                <Leaf size={32} />
                <span className="font-bold">Compost</span>
              </button>
              <button onClick={() => handleSort('trash')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-6 rounded-2xl flex flex-col items-center gap-2 transition-colors">
                <Trash2 size={32} />
                <span className="font-bold">Trash</span>
              </button>
           </div>
        </div>
      )}

      {activeGame === 'memory' && (
        <div className="max-w-xl mx-auto">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Match the Pairs</h3>
              <span className="text-releaf-500 font-bold">Score: {gameScore}</span>
           </div>
           <div className="grid grid-cols-4 gap-4">
             {memoryCards.map((card, idx) => (
               <button
                 key={idx}
                 onClick={() => handleCardClick(idx)}
                 className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-all duration-300 transform ${
                   card.flipped ? 'bg-white dark:bg-[#1F2937] rotate-y-180 shadow-lg' : 'bg-releaf-500 text-transparent hover:bg-releaf-600'
                 }`}
               >
                 {card.flipped ? card.icon : ''}
               </button>
             ))}
           </div>
        </div>
      )}

      {activeGame === 'carbon' && (
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{CARBON_PAIRS[carbonIndex].question}</h3>
          
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
             <button onClick={() => handleCarbonGuess('a')} className="flex-1 w-full bg-white dark:bg-[#1F2937] p-8 rounded-3xl shadow-xl hover:scale-105 transition-all border border-slate-100 dark:border-slate-700 group">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-900 dark:text-white font-bold text-2xl">A</div>
                <p className="text-xl font-bold text-slate-800 dark:text-white">{CARBON_PAIRS[carbonIndex].a.name}</p>
             </button>
             
             <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500">VS</div>

             <button onClick={() => handleCarbonGuess('b')} className="flex-1 w-full bg-white dark:bg-[#1F2937] p-8 rounded-3xl shadow-xl hover:scale-105 transition-all border border-slate-100 dark:border-slate-700 group">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-900 dark:text-white font-bold text-2xl">B</div>
                <p className="text-xl font-bold text-slate-800 dark:text-white">{CARBON_PAIRS[carbonIndex].b.name}</p>
             </button>
          </div>
        </div>
      )}

      {activeGame === 'ocean' && (
        <div className="relative w-full h-[500px] bg-gradient-to-b from-blue-400 to-blue-700 rounded-3xl overflow-hidden shadow-2xl cursor-crosshair">
           <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-3 rounded-xl text-white font-bold z-10">
              <div className="flex items-center gap-2"><Timer size={18} /> {timeLeft}s</div>
              <div>Score: {gameScore}</div>
           </div>
           
           {oceanItems.map(item => (
             <div
               key={item.id}
               onClick={(e) => { e.stopPropagation(); handleOceanClick(item.id, item.type); }}
               className="absolute text-4xl animate-bounce transition-transform hover:scale-110 cursor-pointer select-none"
               style={{ left: `${item.x}%`, top: `${item.y}%` }}
             >
               {item.type === 'trash' ? '🥤' : '🐠'}
             </div>
           ))}
           
           <div className="absolute bottom-0 w-full text-center text-white/50 pb-2 pointer-events-none">
             Click the trash (🥤), avoid the fish (🐠)!
           </div>
        </div>
      )}

      {activeGame === 'scramble' && (
        <div className="max-w-xl mx-auto text-center bg-white dark:bg-[#1F2937] p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
           <h3 className="text-xl text-slate-500 dark:text-slate-400 mb-6">Unscramble the Word</h3>
           
           <div className="text-4xl font-mono font-bold text-releaf-600 dark:text-releaf-400 mb-2 tracking-widest">
             {getScrambledWord(SCRAMBLE_WORDS[scrambleIndex].word)}
           </div>
           <p className="text-sm text-slate-400 mb-8">Hint: {SCRAMBLE_WORDS[scrambleIndex].hint}</p>

           <form onSubmit={handleScrambleSubmit} className="flex gap-3">
             <input 
               type="text" 
               value={scrambleInput}
               onChange={(e) => setScrambleInput(e.target.value)}
               className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border-transparent focus:border-releaf-500 outline-none text-slate-900 dark:text-white font-bold text-center uppercase"
               placeholder="TYPE HERE"
             />
             <button type="submit" className="bg-releaf-600 hover:bg-releaf-700 text-white px-6 py-3 rounded-xl font-bold">
               Check
             </button>
           </form>
           
           {scrambleFeedback && (
             <p className={`mt-4 font-bold ${scrambleFeedback === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>
               {scrambleFeedback}
             </p>
           )}
        </div>
      )}
    </div>
  );
};