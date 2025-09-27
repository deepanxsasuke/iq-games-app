// src/utils/gameEngine.js
export const generatePuzzle = (level, type = null) => {
  const puzzleTypes = type ? [type] : 
    ['sequence', 'pattern', 'logic', 'math', 'spatial'];
  
  const selectedType = puzzleTypes[Math.floor(Math.random() * puzzleTypes.length)];
  
  switch (selectedType) {
    case 'sequence':
      return generateSequencePuzzle(level);
    case 'pattern':
      return generatePatternPuzzle(level);
    case 'logic':
      return generateLogicPuzzle(level);
    case 'math':
      return generateMathPuzzle(level);
    case 'spatial':
      return generateSpatialPuzzle(level);
    default:
      return generateSequencePuzzle(level);
  }
};

const generateSequencePuzzle = (level) => {
  const sequences = [
    { 
      sequence: [2, 4, 6, 8, '?'], 
      answer: '10', 
      type: 'sequence',
      description: 'arithmetic sequence (+2)' 
    },
    { 
      sequence: [1, 1, 2, 3, 5, '?'], 
      answer: '8', 
      type: 'sequence',
      description: 'Fibonacci sequence' 
    },
    { 
      sequence: ['A', 'D', 'G', 'J', '?'], 
      answer: 'M', 
      type: 'sequence',
      description: 'alphabet sequence (+3)' 
    },
    { 
      sequence: [3, 9, 27, 81, '?'], 
      answer: '243', 
      type: 'sequence',
      description: 'geometric sequence (×3)' 
    },
    { 
      sequence: [1, 4, 9, 16, '?'], 
      answer: '25', 
      type: 'sequence',
      description: 'square numbers' 
    }
  ];
  return sequences[(level - 1) % sequences.length];
};

const generatePatternPuzzle = (level) => {
  const patterns = [
    {
      pattern: ['▲', '▼', '▲', '▼', '?'],
      answer: '▲',
      type: 'pattern',
      description: 'alternating pattern'
    },
    {
      pattern: ['●', '●●', '●●●', '●●●●', '?'],
      answer: '●●●●●',
      type: 'pattern',
      description: 'increasing pattern'
    },
    {
      pattern: ['♠', '♣', '♥', '♦', '?'],
      answer: '♠',
      type: 'pattern',
      description: 'card suits cycle'
    }
  ];
  return patterns[(level - 1) % patterns.length];
};

const generateLogicPuzzle = (level) => {
  const puzzles = [
    {
      question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are Lazzies. True or False?",
      answer: "true",
      type: "logic",
      description: "logical deduction"
    },
    {
      question: "A bat and a ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost? (in cents)",
      answer: "5",
      type: "logic",
      description: "word problem"
    },
    {
      question: "If you have a bowl with six apples and you take away four, how many do you have?",
      answer: "4",
      type: "logic",
      description: "trick question"
    }
  ];
  return puzzles[(level - 1) % puzzles.length];
};

const generateMathPuzzle = (level) => {
  const puzzles = [
    {
      question: "What is 7 × 8 + 15 ÷ 3?",
      answer: "61",
      type: "math",
      description: "order of operations"
    },
    {
      question: "If x + 2x = 15, what is x?",
      answer: "5",
      type: "math",
      description: "algebra equation"
    },
    {
      question: "What is the square root of 144?",
      answer: "12",
      type: "math",
      description: "basic arithmetic"
    }
  ];
  return puzzles[(level - 1) % puzzles.length];
};

const generateSpatialPuzzle = (level) => {
  const puzzles = [
    {
      question: "How many cubes are in a 3×3×3 cube?",
      answer: "27",
      type: "spatial",
      description: "spatial visualization"
    },
    {
      question: "If you fold a cube, which pattern cannot make a cube? (Answer: pattern number)",
      answer: "4",
      type: "spatial",
      description: "spatial reasoning"
    }
  ];
  return puzzles[(level - 1) % puzzles.length];
};