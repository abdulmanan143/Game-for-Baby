import { CategoryInfo, QuizQuestion, Difficulty, CategoryId } from '../types/game';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'math',
    name: 'Math Magic',
    subtitle: 'Numbers, Counting & Puzzles',
    icon: '➕',
    themeColor: 'emerald',
    bgGradient: 'from-emerald-400 to-teal-600',
    buttonClass: 'btn-3d-emerald',
    description: 'Explore addition, subtraction, multiplication, sequences, and visual counting!',
    skillsTaught: ['Mental Math', 'Number Sense', 'Pattern Recognition', 'Comparisons']
  },
  {
    id: 'vocab',
    name: 'Word Quest',
    subtitle: 'Spelling, Phonics & Words',
    icon: '📚',
    themeColor: 'amber',
    bgGradient: 'from-amber-400 to-orange-500',
    buttonClass: 'btn-3d-amber',
    description: 'Learn fun vocabulary, solve missing letters, find opposites, and match pictures!',
    skillsTaught: ['Spelling', 'Vocabulary', 'Opposites & Rhymes', 'Reading Skills']
  },
  {
    id: 'gk',
    name: 'World Explorer',
    subtitle: 'Animals, Space & Nature',
    icon: '🌍',
    themeColor: 'cyan',
    bgGradient: 'from-cyan-400 to-blue-600',
    buttonClass: 'btn-3d-cyan',
    description: 'Discover cool facts about planets, friendly animals, geography, and science!',
    skillsTaught: ['General Knowledge', 'Earth & Space', 'Animal Kingdom', 'Curiosity']
  },
  {
    id: 'memory',
    name: 'Memory Match',
    subtitle: 'Card Flip Matching Game',
    icon: '🃏',
    themeColor: 'purple',
    bgGradient: 'from-purple-400 to-indigo-600',
    buttonClass: 'btn-3d-purple',
    description: 'Flip colorful cards and find matching pairs of animals, space rockets, and fruits!',
    skillsTaught: ['Visual Memory', 'Focus & Attention', 'Spatial Recall', 'Patience']
  },
  {
    id: 'logic',
    name: 'Brain Teasers',
    subtitle: 'Patterns & Riddles',
    icon: '🧩',
    themeColor: 'rose',
    bgGradient: 'from-rose-400 to-pink-600',
    buttonClass: 'btn-3d-rose',
    description: 'Crack funny riddles, identify the odd one out, and complete shape sequences!',
    skillsTaught: ['Deductive Reasoning', 'Classification', 'Critical Thinking', 'Riddle Solving']
  },
  {
    id: 'typing',
    name: 'Key Pop Quest',
    subtitle: 'Typing & Balloon Popping',
    icon: '⌨️',
    themeColor: 'indigo',
    bgGradient: 'from-indigo-400 to-violet-600',
    buttonClass: 'btn-3d-indigo',
    description: 'Pop floating alphabet balloons by pressing keys on your keyboard or screen!',
    skillsTaught: ['Keyboard Familiarity', 'Hand-Eye Coordination', 'Reaction Speed', 'Letter Recognition']
  }
];

export const MATH_QUESTIONS: Record<Difficulty, QuizQuestion[]> = {
  easy: [
    {
      id: 'm_e_1',
      category: 'math',
      difficulty: 'easy',
      type: 'count',
      question: 'How many juicy apples are here?',
      hint: 'Count each red apple one by one!',
      options: ['3', '4', '5', '6'],
      correctIndex: 1, // 4
      explanation: 'Great counting! There are 4 shiny apples: 🍎🍎🍎🍎',
      visualData: { fruitEmoji: '🍎', fruitCount: 4 }
    },
    {
      id: 'm_e_2',
      category: 'math',
      difficulty: 'easy',
      type: 'mcq',
      question: 'What is 2 + 3 = ?',
      hint: 'Hold up 2 fingers, then add 3 more!',
      options: ['4', '5', '6', '7'],
      correctIndex: 1, // 5
      explanation: '2 plus 3 equals 5! ⭐'
    },
    {
      id: 'm_e_3',
      category: 'math',
      difficulty: 'easy',
      type: 'compare',
      question: 'Which number is GREATER?',
      hint: 'Greater means the bigger pile of candies!',
      options: ['4', '9'],
      correctIndex: 1, // 9
      explanation: '9 is greater than 4! 9 > 4.'
    },
    {
      id: 'm_e_4',
      category: 'math',
      difficulty: 'easy',
      type: 'count',
      question: 'How many yellow stars are sparkling?',
      hint: 'Count each star across the row!',
      options: ['4', '5', '6', '7'],
      correctIndex: 2, // 6
      explanation: 'Super job! There are 6 stars: ⭐⭐⭐⭐⭐⭐',
      visualData: { fruitEmoji: '⭐', fruitCount: 6 }
    },
    {
      id: 'm_e_5',
      category: 'math',
      difficulty: 'easy',
      type: 'mcq',
      question: 'What is 5 - 2 = ?',
      hint: 'Start with 5 and take 2 away!',
      options: ['2', '3', '4', '5'],
      correctIndex: 1, // 3
      explanation: '5 minus 2 leaves 3!'
    },
    {
      id: 'm_e_6',
      category: 'math',
      difficulty: 'easy',
      type: 'sequence',
      question: 'Complete the number sequence: 1, 2, 3, 4, ?',
      hint: 'What comes right after 4?',
      options: ['5', '6', '7', '8'],
      correctIndex: 0,
      explanation: '1, 2, 3, 4, 5! High five! 🖐️',
      visualData: { sequence: [1, 2, 3, 4, '?'] }
    },
    {
      id: 'm_e_7',
      category: 'math',
      difficulty: 'easy',
      type: 'compare',
      question: 'Which number is SMALLER?',
      hint: 'Which is the smaller amount?',
      options: ['8', '3'],
      correctIndex: 1, // 3
      explanation: '3 is smaller than 8! 3 < 8.'
    },
    {
      id: 'm_e_8',
      category: 'math',
      difficulty: 'easy',
      type: 'mcq',
      question: 'What is 4 + 4 = ?',
      hint: 'Think of 4 paws on 2 puppies!',
      options: ['6', '7', '8', '9'],
      correctIndex: 2, // 8
      explanation: '4 + 4 is 8! Awesome double!'
    }
  ],
  medium: [
    {
      id: 'm_m_1',
      category: 'math',
      difficulty: 'medium',
      type: 'mcq',
      question: 'What is 5 × 2 = ?',
      hint: 'Count by 5s twice: 5, 10!',
      options: ['7', '10', '12', '15'],
      correctIndex: 1,
      explanation: '5 times 2 equals 10!'
    },
    {
      id: 'm_m_2',
      category: 'math',
      difficulty: 'medium',
      type: 'mcq',
      question: 'What is 10 - 4 = ?',
      hint: 'Start with 10 and count back 4!',
      options: ['4', '5', '6', '7'],
      correctIndex: 2,
      explanation: '10 - 4 = 6! Spot on!'
    },
    {
      id: 'm_m_3',
      category: 'math',
      difficulty: 'medium',
      type: 'sequence',
      question: 'Find the missing number: 2, 4, 6, 8, ?',
      hint: 'We are skip counting by 2!',
      options: ['9', '10', '11', '12'],
      correctIndex: 1,
      explanation: 'The pattern adds 2 each time: 2, 4, 6, 8, 10!',
      visualData: { sequence: [2, 4, 6, 8, '?'] }
    },
    {
      id: 'm_m_4',
      category: 'math',
      difficulty: 'medium',
      type: 'compare',
      question: 'Which number is GREATER?',
      hint: 'Compare the tens digits first!',
      options: ['38', '42'],
      correctIndex: 1,
      explanation: '42 is greater than 38! (42 > 38)'
    },
    {
      id: 'm_m_5',
      category: 'math',
      difficulty: 'medium',
      type: 'mcq',
      question: 'What is 3 × 4 = ?',
      hint: 'Think of 3 groups of 4!',
      options: ['9', '10', '12', '14'],
      correctIndex: 2,
      explanation: '3 × 4 = 12! Perfect multiplication!'
    },
    {
      id: 'm_m_6',
      category: 'math',
      difficulty: 'medium',
      type: 'mcq',
      question: 'If you have 15 cookies and share 7 with friends, how many do you have left?',
      hint: 'Subtract: 15 - 7',
      options: ['6', '7', '8', '9'],
      correctIndex: 2,
      explanation: '15 - 7 = 8 cookies remaining! 🍪'
    },
    {
      id: 'm_m_7',
      category: 'math',
      difficulty: 'medium',
      type: 'sequence',
      question: 'Complete the pattern: 10, 20, 30, 40, ?',
      hint: 'Count up by 10s!',
      options: ['45', '50', '55', '60'],
      correctIndex: 1,
      explanation: 'Counting by tens: 10, 20, 30, 40, 50!',
      visualData: { sequence: [10, 20, 30, 40, '?'] }
    },
    {
      id: 'm_m_8',
      category: 'math',
      difficulty: 'medium',
      type: 'mcq',
      question: 'What is half of 16?',
      hint: 'Divide 16 into 2 equal piles!',
      options: ['6', '7', '8', '9'],
      correctIndex: 2,
      explanation: '16 divided by 2 is 8!'
    }
  ],
  hard: [
    {
      id: 'm_h_1',
      category: 'math',
      difficulty: 'hard',
      type: 'mcq',
      question: 'What is 7 × 8 = ?',
      hint: '5, 6, 7, 8... 56 is 7 times 8!',
      options: ['48', '54', '56', '63'],
      correctIndex: 2,
      explanation: '7 × 8 = 56! A classic math trick: 5, 6, 7, 8!'
    },
    {
      id: 'm_h_2',
      category: 'math',
      difficulty: 'hard',
      type: 'sequence',
      question: 'Complete the sequence: 3, 9, 27, ?',
      hint: 'Multiply each number by 3 to get the next one!',
      options: ['54', '72', '81', '90'],
      correctIndex: 2,
      explanation: '3 × 3 = 9; 9 × 3 = 27; 27 × 3 = 81!',
      visualData: { sequence: [3, 9, 27, '?'] }
    },
    {
      id: 'm_h_3',
      category: 'math',
      difficulty: 'hard',
      type: 'mcq',
      question: 'A pizza has 8 slices. If Leo eats 3 slices and Mia eats 2, what fraction is left?',
      hint: 'How many slices did they eat together? 3 + 2 = 5.',
      options: ['2/8', '3/8', '4/8', '5/8'],
      correctIndex: 1,
      explanation: '8 - (3 + 2) = 3 slices left, which is 3/8! 🍕'
    },
    {
      id: 'm_h_4',
      category: 'math',
      difficulty: 'hard',
      type: 'compare',
      question: 'Which is GREATER: 15 × 4 or 25 × 2?',
      hint: 'Calculate both: 15 × 4 = 60, and 25 × 2 = 50.',
      options: ['15 × 4', '25 × 2', 'They are equal'],
      correctIndex: 0,
      explanation: '15 × 4 = 60, while 25 × 2 = 50. 60 is greater!'
    },
    {
      id: 'm_h_5',
      category: 'math',
      difficulty: 'hard',
      type: 'mcq',
      question: 'What is 144 ÷ 12 = ?',
      hint: '12 × 12 = 144!',
      options: ['10', '11', '12', '14'],
      correctIndex: 2,
      explanation: '144 divided by 12 is 12!'
    },
    {
      id: 'm_h_6',
      category: 'math',
      difficulty: 'hard',
      type: 'sequence',
      question: 'What comes next in the countdown: 100, 85, 70, 55, ?',
      hint: 'Notice each step subtracts 15!',
      options: ['45', '40', '35', '30'],
      correctIndex: 1,
      explanation: '55 - 15 = 40! Excellent pattern solving!',
      visualData: { sequence: [100, 85, 70, 55, '?'] }
    },
    {
      id: 'm_h_7',
      category: 'math',
      difficulty: 'hard',
      type: 'mcq',
      question: 'A rectangle has a length of 9 cm and a width of 6 cm. What is its perimeter?',
      hint: 'Perimeter = 2 × (length + width)',
      options: ['24 cm', '27 cm', '30 cm', '54 cm'],
      correctIndex: 2,
      explanation: '(9 + 6) × 2 = 15 × 2 = 30 cm!'
    }
  ]
};

export const VOCAB_QUESTIONS: Record<Difficulty, QuizQuestion[]> = {
  easy: [
    {
      id: 'v_e_1',
      category: 'vocab',
      difficulty: 'easy',
      type: 'missing_letter',
      question: 'Fill in the missing letter for this loyal pet: C _ T 🐱',
      hint: 'Sound it out: C-A-T!',
      options: ['A', 'E', 'O', 'U'],
      correctIndex: 0,
      explanation: 'C-A-T makes CAT! Meow! 🐱',
      visualData: { missingLetterWord: 'CAT', missingIndex: 1 }
    },
    {
      id: 'v_e_2',
      category: 'vocab',
      difficulty: 'easy',
      type: 'mcq',
      question: 'What is the OPPOSITE of HOT? ☀️',
      hint: 'Think of winter snow or ice cream!',
      options: ['Warm', 'Cold', 'Bright', 'Wet'],
      correctIndex: 1,
      explanation: 'The opposite of Hot is Cold! ❄️'
    },
    {
      id: 'v_e_3',
      category: 'vocab',
      difficulty: 'easy',
      type: 'mcq',
      question: 'Which word rhymes with "SUN"? ☀️',
      hint: 'It has the -UN sound like running for...',
      options: ['Bat', 'Fun', 'Car', 'Pen'],
      correctIndex: 1,
      explanation: 'SUN and FUN rhyme together!'
    },
    {
      id: 'v_e_4',
      category: 'vocab',
      difficulty: 'easy',
      type: 'missing_letter',
      question: 'Fill in the missing letter for: D _ G 🐶',
      hint: 'D-O-G!',
      options: ['A', 'O', 'I', 'U'],
      correctIndex: 1,
      explanation: 'D-O-G spells DOG! Woof woof! 🐕',
      visualData: { missingLetterWord: 'DOG', missingIndex: 1 }
    },
    {
      id: 'v_e_5',
      category: 'vocab',
      difficulty: 'easy',
      type: 'mcq',
      question: 'What is the OPPOSITE of BIG? 🐘',
      hint: 'Think of a tiny little ant!',
      options: ['Small', 'Tall', 'Heavy', 'Wide'],
      correctIndex: 0,
      explanation: 'The opposite of Big is Small! 🐜'
    },
    {
      id: 'v_e_6',
      category: 'vocab',
      difficulty: 'easy',
      type: 'mcq',
      question: 'Which fruit is red and crunchy?',
      hint: 'A is for...',
      options: ['Banana', 'Apple', 'Lemon', 'Blueberry'],
      correctIndex: 1,
      explanation: 'An Apple is red, sweet, and crunchy! 🍎'
    }
  ],
  medium: [
    {
      id: 'v_m_1',
      category: 'vocab',
      difficulty: 'medium',
      type: 'mcq',
      question: 'What compound word do SUN and FLOWER make? 🌻',
      hint: 'Put both words together into one!',
      options: ['Sunplant', 'Sunflower', 'Sunshine', 'Flowerbed'],
      correctIndex: 1,
      explanation: 'Sun + Flower = Sunflower! 🌻'
    },
    {
      id: 'v_m_2',
      category: 'vocab',
      difficulty: 'medium',
      type: 'missing_letter',
      question: 'Which letter completes the word: E L E P H _ N T 🐘',
      hint: 'It is a vowel near the end of elephant.',
      options: ['A', 'E', 'I', 'O'],
      correctIndex: 0,
      explanation: 'ELEPHANT has an A in the last syllable!',
      visualData: { missingLetterWord: 'ELEPHANT', missingIndex: 6 }
    },
    {
      id: 'v_m_3',
      category: 'vocab',
      difficulty: 'medium',
      type: 'mcq',
      question: 'What is the OPPOSITE of "BRAVE"? 🦁',
      hint: 'Feeling scared or timid.',
      options: ['Strong', 'Cowardly', 'Polite', 'Quick'],
      correctIndex: 1,
      explanation: 'The opposite of brave is cowardly or fearful.'
    },
    {
      id: 'v_m_4',
      category: 'vocab',
      difficulty: 'medium',
      type: 'mcq',
      question: 'Which word means "A home for bees"? 🐝',
      hint: 'Starts with an H!',
      options: ['Nest', 'Burrow', 'Hive', 'Den'],
      correctIndex: 2,
      explanation: 'Bees live and make honey in a Hive! 🍯'
    },
    {
      id: 'v_m_5',
      category: 'vocab',
      difficulty: 'medium',
      type: 'mcq',
      question: 'Which word rhymes with "BRIGHT"? 💡',
      hint: 'Starts with N and happens when the moon is out.',
      options: ['Brave', 'Night', 'Breeze', 'Flightless'],
      correctIndex: 1,
      explanation: 'BRIGHT and NIGHT rhyme! 🌙'
    },
    {
      id: 'v_m_6',
      category: 'vocab',
      difficulty: 'medium',
      type: 'mcq',
      question: 'What does "ENORMOUS" mean?',
      hint: 'Think of the size of a giant blue whale!',
      options: ['Extremely small', 'Very friendly', 'Very huge', 'Super fast'],
      correctIndex: 2,
      explanation: 'Enormous means giant or extraordinarily huge!'
    }
  ],
  hard: [
    {
      id: 'v_h_1',
      category: 'vocab',
      difficulty: 'hard',
      type: 'mcq',
      question: 'What is a SYNONYM for the word "COURAGEOUS"?',
      hint: 'A word that means the exact same thing.',
      options: ['Timid', 'Fearless', 'Clever', 'Careful'],
      correctIndex: 1,
      explanation: 'Courageous means bold and fearless!'
    },
    {
      id: 'v_h_2',
      category: 'vocab',
      difficulty: 'hard',
      type: 'mcq',
      question: 'What does an animal that is "NOCTURNAL" do? 🦉',
      hint: 'Like owls and bats!',
      options: ['Sleeps at night', 'Is active during the night', 'Lives underwater', 'Only eats fruits'],
      correctIndex: 1,
      explanation: 'Nocturnal creatures stay awake and active at night!'
    },
    {
      id: 'v_h_3',
      category: 'vocab',
      difficulty: 'hard',
      type: 'missing_letter',
      question: 'Complete the spelling: M I S C H I _ V O U S (playfully causing trouble)',
      hint: 'Remember the "i before e" rule!',
      options: ['E', 'A', 'O', 'U'],
      correctIndex: 0,
      explanation: 'MISCHIEVOUS! Often tricky to spell!',
      visualData: { missingLetterWord: 'MISCHIEVOUS', missingIndex: 7 }
    },
    {
      id: 'v_h_4',
      category: 'vocab',
      difficulty: 'hard',
      type: 'mcq',
      question: 'If something is "TRANSPARENT", what can you do? 🪟',
      hint: 'Think of clear window glass or pure water.',
      options: ['Bend it easily', 'See right through it', 'Bounce on it', 'Hear music from it'],
      correctIndex: 1,
      explanation: 'Transparent materials let light through so you can see through them!'
    },
    {
      id: 'v_h_5',
      category: 'vocab',
      difficulty: 'hard',
      type: 'mcq',
      question: 'What does the idiom "A piece of cake" mean? 🍰',
      hint: 'Not actual dessert!',
      options: ['Very difficult', 'Something very easy to do', 'A birthday party', 'Being greedy'],
      correctIndex: 1,
      explanation: 'If a puzzle is "a piece of cake", it is very easy to do!'
    }
  ]
};

export const GK_QUESTIONS: Record<Difficulty, QuizQuestion[]> = {
  easy: [
    {
      id: 'gk_e_1',
      category: 'gk',
      difficulty: 'easy',
      type: 'mcq',
      question: 'Which friendly bird CANNOT fly? 🐧',
      hint: 'It loves to waddle on snow and slide on ice!',
      options: ['Eagle', 'Penguin', 'Parrot', 'Sparrow'],
      correctIndex: 1,
      explanation: 'Penguins cannot fly in the air, but they swim like torpedoes in water! 🐧'
    },
    {
      id: 'gk_e_2',
      category: 'gk',
      difficulty: 'easy',
      type: 'mcq',
      question: 'What color do you get if you mix BLUE and YELLOW? 🎨',
      hint: 'The color of grass and tree leaves!',
      options: ['Purple', 'Orange', 'Green', 'Brown'],
      correctIndex: 2,
      explanation: 'Blue + Yellow makes vibrant Green! 🌿'
    },
    {
      id: 'gk_e_3',
      category: 'gk',
      difficulty: 'easy',
      type: 'mcq',
      question: 'How many legs does a spider have? 🕷️',
      hint: 'Two more than an insect (which has 6)!',
      options: ['4', '6', '8', '10'],
      correctIndex: 2,
      explanation: 'All spiders have 8 legs! 🕷️'
    },
    {
      id: 'gk_e_4',
      category: 'gk',
      difficulty: 'easy',
      type: 'mcq',
      question: 'What gives Earth daylight and warmth? ☀️',
      hint: 'The big bright star in our solar system!',
      options: ['The Moon', 'The Sun', 'Clouds', 'Mars'],
      correctIndex: 1,
      explanation: 'The Sun lights up our day and keeps our planet warm! 🌞'
    },
    {
      id: 'gk_e_5',
      category: 'gk',
      difficulty: 'easy',
      type: 'mcq',
      question: 'Where do fish live and breathe? 🐠',
      hint: 'They use their gills!',
      options: ['In trees', 'Underground', 'In water', 'In clouds'],
      correctIndex: 2,
      explanation: 'Fish live in rivers, lakes, and oceans using gills to breathe! 🌊'
    }
  ],
  medium: [
    {
      id: 'gk_m_1',
      category: 'gk',
      difficulty: 'medium',
      type: 'mcq',
      question: 'Which is the largest animal on planet Earth? 🐋',
      hint: 'It lives in the deep blue ocean and is bigger than any dinosaur!',
      options: ['African Elephant', 'Blue Whale', 'Great White Shark', 'Giraffe'],
      correctIndex: 1,
      explanation: 'The Blue Whale is the largest creature to ever live on Earth! 🐳'
    },
    {
      id: 'gk_m_2',
      category: 'gk',
      difficulty: 'medium',
      type: 'mcq',
      question: 'Which planet is known as the "Red Planet"? 🪐',
      hint: 'Named after the Roman god of war.',
      options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
      correctIndex: 1,
      explanation: 'Mars looks reddish-orange because of iron oxide (rust) on its surface! 🔴'
    },
    {
      id: 'gk_m_3',
      category: 'gk',
      difficulty: 'medium',
      type: 'mcq',
      question: 'How many continents are there on Earth? 🗺️',
      hint: 'Asia, Africa, North America, South America, Antarctica, Europe, Australia.',
      options: ['5', '6', '7', '8'],
      correctIndex: 2,
      explanation: 'There are 7 continents on Earth! 🌍'
    },
    {
      id: 'gk_m_4',
      category: 'gk',
      difficulty: 'medium',
      type: 'mcq',
      question: 'What gas do plants release into the air for humans and animals to breathe? 🌱',
      hint: 'Starts with O!',
      options: ['Carbon Dioxide', 'Oxygen', 'Helium', 'Nitrogen'],
      correctIndex: 1,
      explanation: 'Plants use sunlight to make food and release pure Oxygen! 🍃'
    },
    {
      id: 'gk_m_5',
      category: 'gk',
      difficulty: 'medium',
      type: 'mcq',
      question: 'Which planet has famous, beautiful wide rings made of ice and dust? 🪐',
      hint: 'The sixth planet from the Sun.',
      options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
      correctIndex: 0,
      explanation: 'Saturn has spectacular rings made of billions of chunks of ice and rock!'
    }
  ],
  hard: [
    {
      id: 'gk_h_1',
      category: 'gk',
      difficulty: 'hard',
      type: 'mcq',
      question: 'What is the hardest natural mineral found on Earth? 💎',
      hint: 'Used in jewelry and cutting tools.',
      options: ['Gold', 'Iron', 'Quartz', 'Diamond'],
      correctIndex: 3,
      explanation: 'Diamond is ranked 10 on the Mohs hardness scale—the hardest natural mineral!'
    },
    {
      id: 'gk_h_2',
      category: 'gk',
      difficulty: 'hard',
      type: 'mcq',
      question: 'Which organ inside the human body pumps blood through the veins and arteries? ❤️',
      hint: 'It beats about 100,000 times a day!',
      options: ['Lungs', 'Heart', 'Stomach', 'Brain'],
      correctIndex: 1,
      explanation: 'Your heart is a powerful muscle that pumps blood non-stop! 💓'
    },
    {
      id: 'gk_h_3',
      category: 'gk',
      difficulty: 'hard',
      type: 'mcq',
      question: 'What is the speed of light approximately? ⚡',
      hint: 'Nothing in the universe can travel faster!',
      options: ['3,000 km/s', '30,000 km/s', '300,000 km/s', '3,000,000 km/s'],
      correctIndex: 2,
      explanation: 'Light zips through space at an astonishing ~300,000 km per second! 🚀'
    },
    {
      id: 'gk_h_4',
      category: 'gk',
      difficulty: 'hard',
      type: 'mcq',
      question: 'Which famous scientist discovered gravity when an apple supposedly fell from a tree? 🍏',
      hint: 'He has three famous laws of motion.',
      options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Thomas Edison'],
      correctIndex: 1,
      explanation: 'Sir Isaac Newton formulated the law of universal gravitation! 🍎'
    }
  ]
};

export const LOGIC_QUESTIONS: Record<Difficulty, QuizQuestion[]> = {
  easy: [
    {
      id: 'l_e_1',
      category: 'logic',
      difficulty: 'easy',
      type: 'odd_one_out',
      question: 'Which one does NOT belong? 🍎 🍌 🥕 🍓',
      hint: 'Three of these are sweet fruits, one is a crunchy vegetable!',
      options: ['Apple 🍎', 'Banana 🍌', 'Carrot 🥕', 'Strawberry 🍓'],
      correctIndex: 2,
      explanation: 'Carrot 🥕 is a root vegetable, while the others are fruits!'
    },
    {
      id: 'l_e_2',
      category: 'logic',
      difficulty: 'easy',
      type: 'sequence',
      question: 'What shape comes next? 🔴 🟦 🔴 🟦 ?',
      hint: 'Red circle, Blue square, Red circle...',
      options: ['🔴 Red circle', '🟦 Blue square', '⭐ Yellow star', '🔺 Green triangle'],
      correctIndex: 0,
      explanation: 'The pattern alternates: Circle, Square, Circle, Square, Circle! 🔴'
    },
    {
      id: 'l_e_3',
      category: 'logic',
      difficulty: 'easy',
      type: 'mcq',
      question: 'Riddle: I have wings and feathers, I lay eggs in a nest, and I chirp. Who am I? 🪺',
      hint: 'Look up in the trees!',
      options: ['Bird 🐦', 'Fish 🐠', 'Bear 🐻', 'Frog 🐸'],
      correctIndex: 0,
      explanation: 'A bird has wings, lays eggs, and chirps sweetly! 🐦'
    },
    {
      id: 'l_e_4',
      category: 'logic',
      difficulty: 'easy',
      type: 'odd_one_out',
      question: 'Which vehicle travels in the SKY? ✈️',
      hint: 'Look for wings!',
      options: ['Bicycle 🚲', 'Airplane ✈️', 'Submarine 🚢', 'School Bus 🚌'],
      correctIndex: 1,
      explanation: 'Airplanes soar through the sky! ✈️'
    }
  ],
  medium: [
    {
      id: 'l_m_1',
      category: 'logic',
      difficulty: 'medium',
      type: 'odd_one_out',
      question: 'Which one is the ODD ONE OUT? 🚗 ✈️ 🚢 🍕',
      hint: 'Three of these are modes of transportation!',
      options: ['Car 🚗', 'Airplane ✈️', 'Ship 🚢', 'Pizza 🍕'],
      correctIndex: 3,
      explanation: 'Pizza is delicious food! The other three are vehicles that carry passengers.'
    },
    {
      id: 'l_m_2',
      category: 'logic',
      difficulty: 'medium',
      type: 'sequence',
      question: 'Complete the pattern: 🐶 🐱 🐱 🐶 🐱 🐱 ?',
      hint: 'One dog, two cats, one dog, two cats...',
      options: ['🐶 Dog', '🐱 Cat', '🐭 Mouse', '🐰 Bunny'],
      correctIndex: 0,
      explanation: 'The pattern repeats: [Dog, Cat, Cat]! Next is a Dog 🐶!'
    },
    {
      id: 'l_m_3',
      category: 'logic',
      difficulty: 'medium',
      type: 'mcq',
      question: 'Riddle: What has hands but cannot clap, and a face but no eyes? ⏰',
      hint: 'Tick, tock, tick, tock...',
      options: ['A Robot', 'A Clock', 'A Teddy Bear', 'A Glove'],
      correctIndex: 1,
      explanation: 'A clock has hour and minute hands, and a clock face! ⏰'
    },
    {
      id: 'l_m_4',
      category: 'logic',
      difficulty: 'medium',
      type: 'mcq',
      question: 'Riddle: What gets wetter the more it dries? 🛁',
      hint: 'You use it right after taking a bath!',
      options: ['A Sponge', 'A Towel', 'A Raincoat', 'The Sun'],
      correctIndex: 1,
      explanation: 'A towel absorbs water to dry you off, getting wetter in the process! 🚿'
    }
  ],
  hard: [
    {
      id: 'l_h_1',
      category: 'logic',
      difficulty: 'hard',
      type: 'mcq',
      question: 'Riddle: I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?',
      hint: 'Yell into a canyon and hear yourself back!',
      options: ['An Echo', 'A Cloud', 'A Shadow', 'A Kite'],
      correctIndex: 0,
      explanation: 'An echo repeats what you say when sound waves bounce back! 🏔️'
    },
    {
      id: 'l_h_2',
      category: 'logic',
      difficulty: 'hard',
      type: 'odd_one_out',
      question: 'Which word is the odd one out? Triangle, Square, Pentagon, Sphere',
      hint: 'Three of these are flat 2D shapes, one is a 3D solid!',
      options: ['Triangle', 'Square', 'Pentagon', 'Sphere'],
      correctIndex: 3,
      explanation: 'A Sphere is a 3D shape (like a ball), whereas triangle, square, and pentagon are 2D polygons!'
    },
    {
      id: 'l_h_3',
      category: 'logic',
      difficulty: 'hard',
      type: 'mcq',
      question: 'If yesterday was Monday, what day will it be two days from tomorrow?',
      hint: 'If yesterday was Monday, today is Tuesday, tomorrow is Wednesday...',
      options: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
      correctIndex: 1,
      explanation: 'Yesterday = Mon -> Today = Tue -> Tomorrow = Wed -> Two days after Wed = Friday!'
    }
  ]
};

// Card pairs for Memory Match
export const MEMORY_CARD_PAIRS = {
  animals: [
    { label: 'Lion', content: '🦁' },
    { label: 'Elephant', content: '🐘' },
    { label: 'Panda', content: '🐼' },
    { label: 'Monkey', content: '🐒' },
    { label: 'Giraffe', content: '🦒' },
    { label: 'Fox', content: '🦊' },
    { label: 'Koala', content: '🐨' },
    { label: 'Tiger', content: '🐯' },
  ],
  space: [
    { label: 'Rocket', content: '🚀' },
    { label: 'Planet', content: '🪐' },
    { label: 'Astronaut', content: '👨‍🚀' },
    { label: 'Star', content: '⭐' },
    { label: 'Alien', content: '👽' },
    { label: 'Telescope', content: '🔭' },
    { label: 'Moon', content: '🌙' },
    { label: 'Comet', content: '☄️' },
  ],
  fruits: [
    { label: 'Strawberry', content: '🍓' },
    { label: 'Watermelon', content: '🍉' },
    { label: 'Banana', content: '🍌' },
    { label: 'Pineapple', content: '🍍' },
    { label: 'Grape', content: '🍇' },
    { label: 'Cherry', content: '🍒' },
    { label: 'Orange', content: '🍊' },
    { label: 'Peach', content: '🍑' },
  ],
  math: [
    { label: '2 + 2', content: '4' },
    { label: '5 + 5', content: '10' },
    { label: '3 × 2', content: '6' },
    { label: '10 - 2', content: '8' },
    { label: '4 × 3', content: '12' },
    { label: '7 + 2', content: '9' },
    { label: '20 ÷ 4', content: '5' },
    { label: '10 + 5', content: '15' },
  ]
};

// Typing challenge items for Key Pop Quest
export const TYPING_CHALLENGES: Record<Difficulty, string[]> = {
  easy: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'R', 'S', 'T'],
  medium: ['CAT', 'DOG', 'SUN', 'STAR', 'PLAY', 'JUMP', 'MOON', 'FISH', 'BIRD', 'TREE', 'BOOK', 'SNOW'],
  hard: ['ROCKET', 'PLANET', 'MONKEY', 'GIRAFFE', 'FRIEND', 'FLOWER', 'WIZARD', 'EXPLORE', 'PUZZLE', 'WONDER']
};
