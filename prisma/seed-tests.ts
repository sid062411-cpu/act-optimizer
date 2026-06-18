import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// ─── Shared passages ────────────────────────────────────────────────────────

const CHESS_PASSAGE = `The history of competitive chess stretches back over fifteen centuries. Originating in ancient India as a war game called Chaturanga, chess [1]spread westward into Persia and then through the Arab world before [2]reaching medieval Europe. The rules as we recognize them today were largely standardized by the fifteenth century. In 1886, [3]the first official World Chess Championship was held, which established a framework for formal competition that endures to this day.

Modern tournament chess is governed by FIDE, the International Chess Federation, [4]which organizes international events and maintains official player rankings. Grandmasters, the highest designation a player [5]can earn, must achieve a rating of at least 2500 and meet other strict performance requirements. The path to a grandmaster title [6]demands years of study and competitive play.

Perhaps the most significant transformation in chess [7]have occurred in recent decades with the rise of computer programs. Engines like Stockfish and AlphaZero have changed how players prepare for competition, allowing [8]them to analyze billions of positions with near-perfect accuracy. Some observers worry that this abundance of computer assistance [9]threatens the creativity that has long defined the game at the highest level. [10]Nevertheless others believe that access to powerful analysis tools has elevated the overall quality of play.`

const ARCTIC_PASSAGE = `Of all the world's migratory animals, few travel as far as the Arctic tern. This small seabird, barely larger than a robin, undertakes one of the most extraordinary journeys in the natural world: an annual round trip between the Arctic and Antarctic that can exceed 50,000 miles.

Arctic terns breed during the Arctic summer, nesting on coastal shorelines near the North Pole. As autumn approaches and the Arctic sun begins to set for weeks at a time, the birds begin their long journey south. Rather than flying the most direct route, they often take a winding path that takes advantage of favorable wind currents. Some populations follow the western coast of Africa; others cross the Atlantic toward South America before swinging south.

The birds arrive in Antarctica just as the austral summer begins—a precise synchronization that allows them to experience near-continuous daylight for much of the year. Scientists estimate that a long-lived tern may complete this journey more than thirty times over its lifetime, meaning some individuals travel the equivalent of three round trips to the moon.

Researchers have tracked Arctic terns using lightweight electronic tags attached to their legs. The data have revealed that the birds' routes are far more varied and complex than previously understood. The terns don't simply follow a predetermined path; they navigate dynamically, adjusting course based on wind and weather conditions. This flexibility appears to be critical to their survival, allowing them to locate food sources more efficiently throughout their journey.`

// ─── Questions ──────────────────────────────────────────────────────────────

const QUESTIONS = [
  // ── ENGLISH (10 questions, chess passage) ──────────────────────────────
  {
    section: 'english', number: 1,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 1: The underlined portion [1] reads "spread westward into Persia and then through the Arab world before." Which of the following alternatives would NOT be acceptable?',
    choices: JSON.stringify({ A: 'NO CHANGE', B: 'moved westward into Persia and then through the Arab world before', C: 'traveled westward into Persia and then through the Arab world before', D: 'spreading westward into Persia and then through the Arab world before' }),
    answer: 'D', topic: 'Verb Forms',
    explanation: 'The verb must be parallel with "spread" in the same clause. "Spreading" changes the structure to a participial phrase, which doesn\'t work here.',
  },
  {
    section: 'english', number: 2,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 2: The underlined portion [2] is "reaching medieval Europe." The writer wants to maintain the most concise wording. Which choice does that best?',
    choices: JSON.stringify({ A: 'NO CHANGE', B: 'and eventually, it would reach medieval Europe', C: 'so that it could reach medieval Europe', D: 'and reaching into medieval Europe' }),
    answer: 'A', topic: 'Conciseness',
    explanation: '"Reaching medieval Europe" is already the most concise participial phrase. The alternatives add unnecessary words.',
  },
  {
    section: 'english', number: 3,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 3: The underlined portion [3] reads "the first official World Chess Championship was held, which established." Which is the best revision?',
    choices: JSON.stringify({ A: 'NO CHANGE', B: 'the first official World Chess Championship was held which established', C: 'the first official World Chess Championship was held; establishing', D: 'the first official World Chess Championship, which established, was held' }),
    answer: 'A', topic: 'Punctuation',
    explanation: 'The comma before "which" correctly introduces a nonrestrictive relative clause. The sentence is correct as written.',
  },
  {
    section: 'english', number: 4,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 4: The underlined portion [4] reads "which organizes international events and maintains official player rankings." If this clause were deleted, the sentence would lose:',
    choices: JSON.stringify({ A: 'an explanation of how chess became popular worldwide', B: 'a specific detail about what FIDE does', C: 'the definition of what a grandmaster title requires', D: 'a contrast between old and modern chess organizations' }),
    answer: 'B', topic: 'Rhetorical Skills',
    explanation: 'The clause gives specific information about FIDE\'s functions. Without it, we\'d know FIDE exists but not what it does.',
  },
  {
    section: 'english', number: 5,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 5: The underlined portion [5] is "can earn." Which choice is grammatically correct in context?',
    choices: JSON.stringify({ A: 'NO CHANGE', B: 'can earns', C: 'could of earned', D: 'can be earned' }),
    answer: 'A', topic: 'Verb Forms',
    explanation: '"Can earn" is correct. "Can earns" has a subject-verb agreement error; "could of earned" is incorrect phrasing; "can be earned" changes the meaning.',
  },
  {
    section: 'english', number: 6,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 6: The underlined portion [6] is "demands years of study and competitive play." The writer considers replacing "demands" with "requiring." Should this change be made?',
    choices: JSON.stringify({ A: 'Yes, because "requiring" is more formal and precise.', B: 'Yes, because it creates better parallel structure with the previous sentence.', C: 'No, because "demands" is the main verb of the sentence and "requiring" would create a fragment.', D: 'No, because "demanding" is more idiomatic than "requiring."' }),
    answer: 'C', topic: 'Sentence Structure',
    explanation: '"The path...demands" is a complete sentence. Replacing "demands" with "requiring" turns it into a fragment with no main verb.',
  },
  {
    section: 'english', number: 7,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 7: The underlined portion [7] reads "have occurred." Which is correct?',
    choices: JSON.stringify({ A: 'NO CHANGE', B: 'has occurred', C: 'had occurred', D: 'is occurring' }),
    answer: 'B', topic: 'Subject-Verb Agreement',
    explanation: 'The subject is "the most significant transformation" (singular), so it requires the singular verb "has occurred."',
  },
  {
    section: 'english', number: 8,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 8: The underlined portion [8] is "them." To what does "them" refer?',
    choices: JSON.stringify({ A: 'chess engines and programs', B: 'players preparing for competition', C: 'billions of positions', D: 'observers and critics' }),
    answer: 'B', topic: 'Pronoun Reference',
    explanation: '"Allowing them to analyze" refers to what the engines allow—namely, players—to do.',
  },
  {
    section: 'english', number: 9,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 9: The underlined portion [9] is "threatens the creativity that has long defined the game at the highest level." If this phrase were deleted, the paragraph would lose:',
    choices: JSON.stringify({ A: 'the main argument of the entire passage', B: 'a specific concern some observers have about computer assistance', C: 'evidence that computer programs improve player rankings', D: 'an explanation of how engines like Stockfish work' }),
    answer: 'B', topic: 'Rhetorical Skills',
    explanation: 'This phrase explains the specific worry held by "some observers"—that computer assistance reduces creativity. Removing it eliminates that detail.',
  },
  {
    section: 'english', number: 10,
    passageTitle: 'The History of Competitive Chess', passage: CHESS_PASSAGE,
    stem: 'Question 10: The underlined portion [10] reads "Nevertheless others believe." Which punctuation is correct?',
    choices: JSON.stringify({ A: 'NO CHANGE', B: 'Nevertheless, others believe', C: 'Nevertheless; others believe', D: 'Nevertheless: others believe' }),
    answer: 'B', topic: 'Punctuation',
    explanation: 'Transitional words like "Nevertheless" at the start of a clause should be followed by a comma.',
  },

  // ── MATH (12 questions) ─────────────────────────────────────────────────
  {
    section: 'math', number: 1,
    stem: 'If 4x − 5 = 19, what is the value of x?',
    choices: JSON.stringify({ A: '3', B: '4', C: '5', D: '6', E: '7' }),
    answer: 'D', topic: 'Pre-Algebra',
    explanation: '4x = 24, so x = 6.',
  },
  {
    section: 'math', number: 2,
    stem: 'A store marks up the price of a jacket by 50%. During a sale, the jacket is discounted 20% from the marked-up price. What is the net percentage change from the original price?',
    choices: JSON.stringify({ A: '30% increase', B: '20% increase', C: '10% increase', D: 'no change', E: '10% decrease' }),
    answer: 'B', topic: 'Percentages',
    explanation: 'New price = 1.5 × 0.8 = 1.20 times the original, a 20% increase.',
  },
  {
    section: 'math', number: 3,
    stem: 'What is the value of f(−2) if f(x) = x² + 3x − 4?',
    choices: JSON.stringify({ A: '−6', B: '−4', C: '−2', D: '0', E: '2' }),
    answer: 'C', topic: 'Functions',
    explanation: 'f(−2) = (−2)² + 3(−2) − 4 = 4 − 6 − 4 = −6. Wait, that\'s −6. Let me recalc: 4 − 6 − 4 = −6. Answer A.',
  },
  {
    section: 'math', number: 4,
    stem: 'Which of the following is equivalent to (x + 4)(x − 3)?',
    choices: JSON.stringify({ A: 'x² + x − 12', B: 'x² − x − 12', C: 'x² + x + 12', D: 'x² − 7x − 12', E: 'x² + 7x − 12' }),
    answer: 'A', topic: 'Algebra',
    explanation: 'FOIL: x² − 3x + 4x − 12 = x² + x − 12.',
  },
  {
    section: 'math', number: 5,
    stem: 'The average (arithmetic mean) of six numbers is 14. If five of the numbers are 10, 12, 15, 17, and 18, what is the sixth number?',
    choices: JSON.stringify({ A: '10', B: '11', C: '12', D: '13', E: '14' }),
    answer: 'C', topic: 'Statistics',
    explanation: 'Total = 6 × 14 = 84. Sum of five = 72. Sixth = 84 − 72 = 12.',
  },
  {
    section: 'math', number: 6,
    stem: 'In the coordinate plane, what is the distance between points (2, 1) and (5, 5)?',
    choices: JSON.stringify({ A: '3', B: '4', C: '5', D: '6', E: '7' }),
    answer: 'C', topic: 'Coordinate Geometry',
    explanation: '√((5−2)² + (5−1)²) = √(9 + 16) = √25 = 5.',
  },
  {
    section: 'math', number: 7,
    stem: 'If 2x + y = 10 and x − y = 2, what is the value of x?',
    choices: JSON.stringify({ A: '2', B: '3', C: '4', D: '5', E: '6' }),
    answer: 'C', topic: 'Systems of Equations',
    explanation: 'Adding: 3x = 12, so x = 4.',
  },
  {
    section: 'math', number: 8,
    stem: 'A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?',
    choices: JSON.stringify({ A: '11', B: '12', C: '13', D: '14', E: '17' }),
    answer: 'C', topic: 'Geometry',
    explanation: '√(25 + 144) = √169 = 13.',
  },
  {
    section: 'math', number: 9,
    stem: 'If x² − 16 = 0, what are the possible values of x?',
    choices: JSON.stringify({ A: 'x = 4 only', B: 'x = −4 only', C: 'x = 4 or x = −4', D: 'x = 8 or x = −8', E: 'no real solutions' }),
    answer: 'C', topic: 'Algebra',
    explanation: 'x² = 16, so x = ±4.',
  },
  {
    section: 'math', number: 10,
    stem: 'What is 45% of 120?',
    choices: JSON.stringify({ A: '48', B: '52', C: '54', D: '56', E: '60' }),
    answer: 'C', topic: 'Pre-Algebra',
    explanation: '0.45 × 120 = 54.',
  },
  {
    section: 'math', number: 11,
    stem: 'If a line passes through points (0, 3) and (4, 11), what is its slope?',
    choices: JSON.stringify({ A: '½', B: '1', C: '2', D: '3', E: '4' }),
    answer: 'C', topic: 'Coordinate Geometry',
    explanation: 'Slope = (11 − 3) / (4 − 0) = 8/4 = 2.',
  },
  {
    section: 'math', number: 12,
    stem: 'A bag contains 4 red marbles, 3 blue marbles, and 5 green marbles. If one marble is drawn at random, what is the probability it is NOT red?',
    choices: JSON.stringify({ A: '1/3', B: '2/3', C: '4/12', D: '5/12', E: '7/12' }),
    answer: 'B', topic: 'Probability',
    explanation: '8 non-red out of 12 total = 8/12 = 2/3.',
  },

  // ── READING (8 questions, Arctic tern passage) ──────────────────────────
  {
    section: 'reading', number: 1,
    passageTitle: 'The Arctic Tern\'s Extraordinary Journey', passage: ARCTIC_PASSAGE,
    stem: 'The main purpose of this passage is to:',
    choices: JSON.stringify({ A: 'argue that Arctic terns need greater environmental protection', B: 'describe the Arctic tern\'s migration patterns and the research that revealed their complexity', C: 'explain how scientists developed electronic tracking tags for birds', D: 'compare the Arctic tern\'s journey to the migrations of other seabirds' }),
    answer: 'B', topic: 'Main Idea',
    explanation: 'The passage describes the migration and discusses what research has revealed. It does not argue for protection, focus on tag development, or compare terns to other birds.',
  },
  {
    section: 'reading', number: 2,
    passageTitle: 'The Arctic Tern\'s Extraordinary Journey', passage: ARCTIC_PASSAGE,
    stem: 'According to the passage, Arctic terns begin their journey south when:',
    choices: JSON.stringify({ F: 'Antarctic weather conditions become favorable', G: 'Arctic autumn begins and the sun starts to set for extended periods', H: 'they have finished raising their chicks to independence', J: 'food supplies in Arctic waters run out each year' }),
    answer: 'G', topic: 'Detail',
    explanation: '"As autumn approaches and the Arctic sun begins to set for weeks at a time, the birds begin their long journey south."',
  },
  {
    section: 'reading', number: 3,
    passageTitle: 'The Arctic Tern\'s Extraordinary Journey', passage: ARCTIC_PASSAGE,
    stem: 'The phrase "a precise synchronization" in the third paragraph refers to:',
    choices: JSON.stringify({ A: 'the coordination of multiple tern flocks across different migration routes', B: 'the timing of the terns\' arrival in Antarctica to coincide with the start of the austral summer', C: 'the synchronization of electronic tracking devices with satellite systems', D: 'the matching of terns\' internal clocks to day length changes at the poles' }),
    answer: 'B', topic: 'Vocabulary in Context',
    explanation: 'The sentence says "The birds arrive in Antarctica just as the austral summer begins"—that timing is the synchronization.',
  },
  {
    section: 'reading', number: 4,
    passageTitle: 'The Arctic Tern\'s Extraordinary Journey', passage: ARCTIC_PASSAGE,
    stem: 'According to the passage, how did scientists learn that tern migration routes are more varied than previously believed?',
    choices: JSON.stringify({ F: 'By analyzing multi-generational records of tern nesting sites', G: 'By comparing the routes of Arctic terns to those of other polar birds', H: 'By attaching lightweight electronic tracking tags to the birds\' legs', J: 'By studying photographs taken by satellites over the Arctic and Antarctic' }),
    answer: 'H', topic: 'Detail',
    explanation: '"Researchers have tracked Arctic terns using lightweight electronic tags attached to their legs."',
  },
  {
    section: 'reading', number: 5,
    passageTitle: 'The Arctic Tern\'s Extraordinary Journey', passage: ARCTIC_PASSAGE,
    stem: 'The author compares a long-lived tern\'s lifetime travel to "three round trips to the moon" most likely to:',
    choices: JSON.stringify({ A: 'suggest that terns navigate using the moon as a guide', B: 'imply that tern migration is as technologically sophisticated as space travel', C: 'help readers grasp the extraordinary total distance covered over a tern\'s life', D: 'argue that terns should be classified as the greatest navigators in the animal kingdom' }),
    answer: 'C', topic: 'Author\'s Purpose',
    explanation: 'The comparison provides a familiar reference point to make the enormous distance more concrete for readers.',
  },
  {
    section: 'reading', number: 6,
    passageTitle: 'The Arctic Tern\'s Extraordinary Journey', passage: ARCTIC_PASSAGE,
    stem: 'Based on the passage, what best explains why Arctic terns follow winding rather than direct migration routes?',
    choices: JSON.stringify({ F: 'Direct routes cross mountain ranges the birds cannot fly over', G: 'They adjust their path dynamically based on wind and weather to find food more efficiently', H: 'Different genetic populations have inherited preferences for different fixed routes', J: 'Winding routes are actually shorter in distance between the two poles' }),
    answer: 'G', topic: 'Inference',
    explanation: '"They navigate dynamically, adjusting course based on wind and weather conditions. This flexibility appears to be critical to their survival, allowing them to locate food sources more efficiently."',
  },
  {
    section: 'reading', number: 7,
    passageTitle: 'The Arctic Tern\'s Extraordinary Journey', passage: ARCTIC_PASSAGE,
    stem: 'As used in the first paragraph, the word "extraordinary" most nearly means:',
    choices: JSON.stringify({ A: 'frightening', B: 'well-documented', C: 'remarkable and unusual', D: 'dangerous and unpredictable' }),
    answer: 'C', topic: 'Vocabulary in Context',
    explanation: 'In context, "extraordinary" describes how impressive and unusual the tern\'s journey is—"remarkable and unusual" is the closest match.',
  },
  {
    section: 'reading', number: 8,
    passageTitle: 'The Arctic Tern\'s Extraordinary Journey', passage: ARCTIC_PASSAGE,
    stem: 'The passage\'s final paragraph primarily serves to:',
    choices: JSON.stringify({ F: 'argue that electronic tracking should be used on all migratory birds', G: 'describe how the tracking technology works in technical detail', H: 'present recent scientific findings that added complexity to our understanding of tern migration', J: 'suggest that tern populations are declining due to unpredictable weather patterns' }),
    answer: 'H', topic: 'Paragraph Purpose',
    explanation: 'The final paragraph introduces what researchers discovered using tracking tags—that routes are more varied and complex than previously understood.',
  },
]

async function main() {
  // Fix the wrong explanation for math Q3
  const fixedQ = QUESTIONS.find(q => q.section === 'math' && q.number === 3)
  if (fixedQ) {
    fixedQ.answer = 'A'
    fixedQ.explanation = 'f(−2) = (−2)² + 3(−2) − 4 = 4 − 6 − 4 = −6.'
    fixedQ.choices = JSON.stringify({ A: '−6', B: '−4', C: '−2', D: '0', E: '2' })
  }

  await prisma.practiceTest.deleteMany()

  const test = await prisma.practiceTest.create({
    data: {
      title: 'ACT Practice Test · Form A',
      form: 'FORM-A',
      source: 'ACT-Style Original',
      questions: {
        create: QUESTIONS.map(q => ({
          section: q.section,
          number: q.number,
          passageTitle: q.passageTitle ?? null,
          passage: q.passage ?? null,
          stem: q.stem,
          choices: q.choices,
          answer: q.answer,
          topic: q.topic ?? null,
          explanation: q.explanation ?? null,
        })),
      },
    },
  })

  console.log(`✓ Seeded: ${test.title} (${QUESTIONS.length} questions)`)
  console.log(`  English: ${QUESTIONS.filter(q => q.section === 'english').length}`)
  console.log(`  Math:    ${QUESTIONS.filter(q => q.section === 'math').length}`)
  console.log(`  Reading: ${QUESTIONS.filter(q => q.section === 'reading').length}`)
}

main()
  .catch(console.error)
  .finally(() => pool.end())
