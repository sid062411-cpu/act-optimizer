import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// ─── ENGLISH PASSAGES ─────────────────────────────────────────────────────────

const ENG_P1 = `PASSAGE I: THE BIRTH OF PHOTOGRAPHY

In 1839, Louis Daguerre [1]have unveiled a remarkable invention—a process that could fix a permanent image onto a silver-coated copper plate. [2]Although, the concept of capturing light had been explored for decades before his announcement, Daguerre's method was the first to gain widespread recognition. The daguerreotype, [3]as it was called was celebrated and criticized in equal measure. Supporters marveled at [4]its ability to record fine details that no painter could match; [5]critics, however worry about the effect of photography on traditional portraiture.

Within just a few decades, photography [6]will become accessible to ordinary people. The invention of smaller, simpler cameras—[7]most notably the Kodak box camera introduced in 1888—meant that [8]taking photographs no longer required professional training. Families [9]begins to document their lives in ways previously impossible. Wedding days, holidays, and [10]everyday ordinary moments were captured for posterity.

The twentieth century brought further [11]innovations—including, color film, instant photography, and eventually digital imaging. Each advancement made photography [12]more widely available then before. [13]In spite of this progress, some photographers have returned to older techniques, arguing that the imperfections of film give [14]they're work a warmth that digital images lack. Whether analog or digital, photography [15]remain one of humanity's most powerful tools for communication and memory.`

const ENG_P2 = `PASSAGE II: URBAN PLANNING AND THE MODERN CITY

Modern cities [16]faces a unique set of challenges: growing populations, aging infrastructure, and rising environmental concerns. Urban planners [17]who works in this field must balance competing priorities—economic growth, social equity, and environmental sustainability. Cities [18]like Portland, Oregon, and Curitiba, Brazil, [19]has become models for sustainable urban development.

One key strategy is investing in public transportation. Studies show that every dollar invested in transit generates [20]approximately five dollars in economic returns. Furthermore, robust public transit systems [21]reduces traffic congestion and lowers air pollution. [22]For example Houston Texas has expanded its light rail system to connect isolated neighborhoods with employment centers.

Green spaces also play a [23]crucial role in urban planning. Parks [24]and other natural areas not only provide recreational opportunities but also improve air quality and reduce the urban heat island effect—a phenomenon where [25]city's temperatures rise significantly above surrounding rural areas. [26]Despite being expensive to maintain, researchers have found that residents of cities with ample green space report higher levels of wellbeing.

The future of urban planning [27]lie in data-driven decision-making. Sensors embedded in infrastructure collect real-time information about traffic, [28]energy usage and waste production. This data [29]allows planners to make more informed, data-driven decisions and [30]ultimately creates cities that are cleaner, safer, and more equitable for all residents.`

const ENG_P3 = `PASSAGE III: THE SCIENCE OF SLEEP

Sleep is not merely a passive state of rest; [31]it is a dynamic biological process essential for physical and mental health. During sleep, the brain [32]consolidates memories, flushes out toxins, and regulate vital functions. Recent research has revealed that sleep [33]deprivation—even of just one or two nights—can impair cognitive performance as severely as alcohol intoxication.

Scientists have identified two main types of sleep: REM sleep and non-REM sleep. [34]They cycle through these stages multiple times each night. During REM sleep, the brain [35]is highly active—dreaming occurs, and emotional memories [36]is processed. Non-REM sleep, [37]on the other hand consists of deeper, more restorative stages during which the body repairs tissue and strengthens the immune system.

The recommended amount of sleep for adults [38]are between seven and nine hours per night, yet surveys suggest that nearly [39]one in three Americans regularly fall short of this goal. The consequences of chronic sleep deprivation are serious: [40]it increases the risk of obesity, diabetes, and cardiovascular disease. [41]Moreover, impaired judgment resulting from insufficient sleep contributes to thousands of traffic fatalities each year.

Good sleep hygiene—the habits [42]that promotes restful sleep—includes maintaining a consistent bedtime, limiting screen time before bed, and [43]to avoid caffeine in the evening. [44]Although some people believe they can train themselves to function on less sleep, research indicates that true physiological adaptation is virtually impossible. For most people, [45]prioritizing sleep is among the most important steps toward long-term health.`

const ENG_P4 = `PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM

Jazz music [46]emerging from the African American communities of New Orleans in the late nineteenth and early twentieth centuries. Born from a fusion of blues, ragtime, and West African musical traditions, jazz [47]represents a uniquely American art form that has influenced musicians around the world. [48]Unlike classical European music, which is written and performed from notation, jazz celebrates improvisation—the art of [49]creating music spontaneously in the moment of performance.

The 1920s, often called the Jazz Age, [50]seen the music reach unprecedented popularity. Legendary musicians such as Louis Armstrong, Duke Ellington, and Bessie Smith [51]brought jazz to concert halls, dance floors, and radio stations across America. [52]Armstrongs virtuosic trumpet playing, in particular, elevated jazz to an art form that demanded serious critical attention.

By the 1940s, a new style known as bebop [53]had emerged. Bebop musicians played [54]fast complex melodies with intricate harmonies that challenged listeners as well as performers. [55]More adventurous than traditional jazz styles, bebop pushed the boundaries of musical possibility. Not everyone [56]were pleased, however; some critics felt that bebop had abandoned the danceability that had made jazz so beloved.

In subsequent decades, jazz [57]continued to evolve, spawning subgenres like cool jazz, jazz fusion, and free jazz. Today, jazz remains a living art form that [58]continue to inspire musicians across genres. [59]Most importantly, its influence on rock, hip-hop, and even classical music is undeniable. [60]Whether or not one fully appreciates jazz, its cultural legacy is impossible to deny.`

const ENG_P5 = `PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY

Each fall, millions of monarch butterflies [61]undertakes one of nature's most extraordinary migrations. Traveling up to 3,000 miles from their breeding grounds in Canada and the northern United States, these insects navigate to specific forests in central Mexico [62]that they had never visited previously before. The fact that individual butterflies—which live only a few months—can locate [63]the exact wintering site used by there ancestors remains one of science's great mysteries.

Scientists believe monarchs use a combination of cues to navigate. They use the position of the sun as a compass, adjusting for the time of day using an internal clock. [64]Additionally, researchers have discovered that monarchs can detect Earth's magnetic field, providing a backup navigation system for cloudy days.

The monarch's life cycle is closely [65]tied with the milkweed plant. Female monarchs [66]lay they're eggs exclusively on milkweed leaves, and the caterpillars that hatch feed solely on the plant. [67]Milkweed contains toxic compounds called cardenolides, [68]that makes monarchs unpalatable to most predators. This chemical defense is so [69]effective that predators who eat monarchs quickly learn to avoid them.

[70]Unfortunately, monarch populations have declined dramatically in recent decades. Loss of milkweed habitat [71]due largely to the widespread use of herbicides in agricultural areas has reduced the number of sites where monarchs can breed. Climate change [72]also effect migration timing, potentially disrupting the butterflies' arrival at their Mexican wintering grounds.

Conservation efforts are [73]underway to protect this remarkable insect. Organizations are planting milkweed corridors along migration routes and [74]working with Mexican landowners. [75]This cooperation between governments, conservation groups, and local communities represents the best hope for the monarch's survival.`

// ─── READING PASSAGES ─────────────────────────────────────────────────────────

const READ_P1 = `LITERARY NARRATIVE

This passage is adapted from a short story about a young woman returning to her family home.

Elena had not been back to her grandmother's house since the funeral, three weeks ago. She stood at the end of the long gravel driveway, her city shoes sinking slightly into the soft earth, and looked at the white clapboard house as if she were seeing it for the first time. The porch swing still hung at its slight angle, the one her grandfather had never gotten around to fixing.

Inside, the house seemed to hold its breath. The smell of lavender—her grandmother always kept dried bundles above the kitchen doorway—still lingered in the air, as though the old woman had only stepped out for a moment and would return any minute with her arms full of garden herbs. Elena set her bag down by the door and listened to the floorboards creak under her feet, each step as familiar as a childhood song.

She had come to sort through her grandmother's things, to decide what to keep and what to give away. It was a practical task, the kind that Elena was usually good at. But standing in the front room, she found herself unable to begin. Instead, she sat down in her grandmother's chair—the weathered blue armchair positioned to catch the morning light—and breathed.

It was on the small side table that she found it: a journal, its brown leather cover worn smooth from years of handling. Elena ran her fingers over it slowly, feeling the grain of the leather, the slight indentation where the clasp had pressed for decades.

She opened it to a random page and read: "Made bread today. A small thing, but right." Another entry: "The roses came back after all. Small victories." And another: "Elena called. Heard her laugh. My heart is full."

Elena closed the journal and held it in her lap. The numbness she had carried for three weeks—through the phone calls, the arrangements, the condolences—began to loosen, replaced by something warmer and more complicated. She had always assumed her grandmother was simply content, simply steady. It had not occurred to her that steadiness might be its own kind of courage. She looked around the room—at the quilts folded on the shelf, the photographs lined up on the mantle, the garden visible through the window—and understood, suddenly, that she was not here to clear out a house. She was here to learn something.

Outside, a cardinal landed on the fence post, regarded the house briefly with one bright eye, and flew away into the autumn light.`

const READ_P2 = `SOCIAL SCIENCE

This passage discusses the development and impact of microfinance programs.

For most of human history, access to credit was a privilege reserved for the wealthy. If a small-scale farmer in Bangladesh or a seamstress in Bolivia needed money to invest in their business, a traditional bank would not help them. They had no collateral, no credit history, and no connections. They were, in the language of economists, "unbanked."

That began to change in the 1970s, when an economist named Muhammad Yunus began experimenting with a radical idea: what if very small loans could help the poor lift themselves out of poverty? In 1983, Yunus founded the Grameen Bank in Bangladesh, one of the world's first and most influential microfinance institutions. The bank's model was straightforward: lend small amounts to groups of borrowers, who would support and hold each other accountable. Average loan size was approximately $200, but the impact was often transformational.

Today, microfinance institutions operate in more than sixty countries, serving an estimated 140 million clients. The term "financial inclusion" has entered the global development vocabulary, describing the goal of ensuring that all people—regardless of income level—have access to useful and affordable financial products and services. For millions of people, a microloan represents not just money, but a pathway to economic dignity.

The evidence for microfinance's effectiveness is encouraging, though not without nuance. Studies have found that borrowers, particularly women, tend to invest their loans productively and repay at high rates. Women borrowers, research shows, are more likely than men to reinvest profits in their families—improving nutrition, education, and health outcomes for children. These secondary effects have made women the primary focus of many microfinance programs.

Yet critics have raised important concerns. In some regions, interest rates charged by microfinance institutions have been alarmingly high—sometimes exceeding 80 percent annually—effectively trapping the poor in cycles of debt rather than freeing them. The most vulnerable borrowers, critics argue, may be the least equipped to navigate the risks of credit. And reaching the most remote, isolated communities remains a persistent obstacle for the industry.

The microfinance movement continues to evolve in response to these critiques, incorporating digital payment systems, financial literacy programs, and more flexible loan structures. For Amara, a tailor in rural Senegal who used a $150 loan to purchase a second sewing machine and now employs two neighbors, the debate is largely academic. "I built this," she says. "With my own hands and a little help."`

const READ_P3 = `HUMANITIES

This passage discusses the Bauhaus school and its influence on modern design.

In 1919, in the German city of Weimar, architect Walter Gropius opened a school unlike any that had existed before. He called it the Bauhaus—German for "building house"—and his vision was nothing less than a revolution in the way art and industry related to each other. For centuries, the fine arts and the crafts had been separate: painters painted, weavers wove, and never the twain shall meet. Gropius proposed to tear down that wall.

The Bauhaus operated on a deceptively simple principle: "form follows function." Good design, in the Bauhaus view, was not decoration applied to an object after the fact. It was the expression of an object's essential purpose. A chair should be as comfortable and structurally sound as it was beautiful. A teapot should pour cleanly. A typeface should be legible. These were not radical ideas in themselves, but the rigor with which Bauhaus applied them was revolutionary.

To realize this vision, Gropius assembled a remarkable faculty. Artists of international reputation—among them the painter Paul Klee and the abstract artist Wassily Kandinsky—came to teach alongside master craftsmen in wood, metal, weaving, and ceramics. The school's workshops were simultaneously art studios and proto-factories, producing objects meant not for gallery walls but for everyday use.

The Bauhaus aesthetic emphasized clean lines, geometric forms, and the honest use of industrial materials. Students learned to strip away ornament and ask what a thing needed to be. This approach produced furniture, lamps, textiles, and typography that looked startlingly modern—and in many cases, still do.

Political pressures forced the school to move twice: from Weimar to Dessau in 1925, and from Dessau to Berlin in 1932. In 1933, the Nazi government, which viewed the school as a hotbed of communist and degenerate ideas, forced it to close permanently. Many faculty emigrated to the United States, spreading Bauhaus ideas across American design education.

The legacy of the Bauhaus is visible everywhere: in the spare geometry of a mid-century modern chair, in the clean sans-serif fonts on your screen, in the layout of a well-designed kitchen. Few schools have cast so long and so wide a shadow.`

const READ_P4 = `NATURAL SCIENCE

This passage discusses bioluminescence in deep-sea organisms.

Turn off the lights in a perfectly dark room, and you will see nothing. Descend half a mile below the ocean's surface where no sunlight penetrates, and the darkness is absolute—and yet it glows. The deep sea is filled with light produced not by the sun but by the organisms themselves: a phenomenon called bioluminescence.

Bioluminescence is the production of light through chemical reactions occurring within a living organism. The process involves a light-producing molecule called luciferin—the name derives from the Latin "lucifer," meaning "light-bearer"—which reacts with oxygen in the presence of an enzyme called luciferase. The result is light emitted with remarkably little heat: what physicists call "cold light," or chemiluminescence. Evolution has invented this trick independently more than forty times, producing bioluminescent bacteria, fungi, fish, squid, jellyfish, and hundreds of other organisms.

In the deep ocean, below roughly 200 meters, where photosynthesis is impossible and permanent darkness reigns, bioluminescence is astonishingly common. Studies using deep-sea cameras have estimated that approximately 76 percent of deep-sea organisms produce light of some kind.

Why so much light in so much darkness? Bioluminescent organisms use their light for several distinct purposes. Some use it to hunt: the anglerfish dangles a bioluminescent lure above its enormous mouth to attract prey. Others use it for defense—squirting luminous clouds to confuse predators, or using counterillumination to camouflage their silhouettes. Still others use it to communicate: certain species of firefly squid produce precisely timed light pulses to attract mates.

Despite its prevalence, bioluminescence remains poorly understood, largely because the deep sea is so difficult and expensive to study. Most of what scientists know comes from specimens collected by trawling nets or observed from submersibles. New camera technologies and underwater robots are beginning to change this picture, revealing a world of light-based interaction far more complex than previously imagined.

What is clear is that in the deep ocean, light is not an absence of darkness. It is a language—spoken in flashes, pulses, and glows by creatures that have never seen the sun.`

// ─── QUESTIONS ────────────────────────────────────────────────────────────────

const QUESTIONS = [

  // ═══════════════════════════════════════════════════
  // ENGLISH — 75 questions across 5 passages
  // ═══════════════════════════════════════════════════

  // PASSAGE I: Q1–15
  { section:'english', number:1, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [1] reads "have unveiled." Which choice corrects the error?',
    choices:JSON.stringify({A:'NO CHANGE',B:'unveiled',C:'has unveiled',D:'had been unveiling'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Daguerre" is singular; simple past "unveiled" matches the historical narrative.' },

  { section:'english', number:2, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [2] reads "Although,". Which is best?',
    choices:JSON.stringify({F:'NO CHANGE',G:'Although',H:'Despite,',J:'However,'}),
    answer:'G', topic:'Punctuation',
    explanation:'"Although" introduces a subordinate clause and should not be followed by a comma.' },

  { section:'english', number:3, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [3] reads "as it was called was." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'as it was called, was',C:'as it was called; was',D:'called, was'}),
    answer:'B', topic:'Punctuation',
    explanation:'The parenthetical phrase "as it was called" requires a comma after it to set it off.' },

  { section:'english', number:4, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [4] reads "its ability." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'NO CHANGE',G:"it's ability",H:'its remarkable ability',J:'the ability of the daguerreotype'}),
    answer:'G', topic:'Pronoun Usage',
    explanation:'"It\'s" means "it is." The possessive "its" (no apostrophe) is required.' },

  { section:'english', number:5, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [5] reads "critics, however worry." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'critics, however, worry',C:'critics however, worry',D:'critics—however worry'}),
    answer:'B', topic:'Punctuation',
    explanation:'The transitional word "however" must be set off by commas on both sides.' },

  { section:'english', number:6, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [6] reads "will become." The passage describes historical events. Which is best?',
    choices:JSON.stringify({F:'NO CHANGE',G:'became',H:'is becoming',J:'had been becoming'}),
    answer:'G', topic:'Verb Tense',
    explanation:'The passage uses past tense throughout; "became" is consistent with the historical narrative.' },

  { section:'english', number:7, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [7] reads "most notably the Kodak box camera introduced in 1888." Which alternative is NOT acceptable?',
    choices:JSON.stringify({A:'NO CHANGE',B:'particularly the Kodak box camera, introduced in 1888,',C:'especially the Kodak box camera, which was introduced in 1888,',D:'the Kodak box camera most notably introduced in 1888'}),
    answer:'D', topic:'Sentence Structure',
    explanation:'Placing "most notably" after the noun creates an awkward misplaced modifier.' },

  { section:'english', number:8, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The writer wants to emphasize photography\'s accessibility to ordinary people. The underlined portion at [8] reads "taking photographs." Which best accomplishes this?',
    choices:JSON.stringify({F:'NO CHANGE',G:'using these costly new devices',H:'operating the complex machinery of photography',J:'engaging with photographic processes'}),
    answer:'F', topic:'Word Choice',
    explanation:'"Taking photographs" is the clearest, most everyday phrase and best conveys accessibility.' },

  { section:'english', number:9, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [9] reads "begins." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'began',C:'have begun',D:'are beginning'}),
    answer:'B', topic:'Verb Tense',
    explanation:'The historical narrative requires past tense; "began" is consistent with the surrounding verbs.' },

  { section:'english', number:10, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [10] reads "everyday ordinary moments." Which is most concise?',
    choices:JSON.stringify({F:'NO CHANGE',G:'everyday moments',H:'ordinary, everyday moments',J:'common and ordinary moments'}),
    answer:'G', topic:'Conciseness',
    explanation:'"Everyday" and "ordinary" are redundant; one word is sufficient.' },

  { section:'english', number:11, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [11] reads "innovations—including, color film." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'innovations—including color film,',C:'innovations, including, color film,',D:'innovations: including color film,'}),
    answer:'B', topic:'Punctuation',
    explanation:'No comma is needed after "including"; the em-dash already separates the list from the main clause.' },

  { section:'english', number:12, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [12] reads "more widely available then before." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'more widely available than before',H:'more widely available, then before',J:'more widely available then it had been'}),
    answer:'G', topic:'Word Choice',
    explanation:'In comparisons, "than" (not "then") is the correct word.' },

  { section:'english', number:13, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined transition at [13] reads "In spite of this progress." Does it work logically here?',
    choices:JSON.stringify({A:'NO CHANGE',B:'Because of this progress,',C:'Therefore,',D:'Similarly,'}),
    answer:'A', topic:'Transitions',
    explanation:'The sentence shifts to a contrasting idea (return to film), making "In spite of" the correct transition.' },

  { section:'english', number:14, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [14] reads "they\'re work." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'their work',H:'there work',J:'the work of them'}),
    answer:'G', topic:'Pronoun Usage',
    explanation:'"They\'re" means "they are." The possessive "their" is required.' },

  { section:'english', number:15, passageTitle:'PASSAGE I: THE BIRTH OF PHOTOGRAPHY', passage:ENG_P1,
    stem:'The underlined portion at [15] reads "remain." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'remains',C:'is remaining',D:'have remained'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Photography" is singular and requires the singular verb "remains."' },

  // PASSAGE II: Q16–30
  { section:'english', number:16, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [16] reads "faces." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'face',H:'is facing',J:'have faced'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Cities" is plural and requires the plural verb "face."' },

  { section:'english', number:17, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [17] reads "who works." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'who work',C:'that works',D:'which works'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Planners" is plural; the relative clause verb must be "work."' },

  { section:'english', number:18, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The writer considers replacing "like Portland, Oregon, and Curitiba, Brazil" with "in major metropolitan areas." Should the writer make this change?',
    choices:JSON.stringify({F:'Yes, because the examples are irrelevant to the argument',G:'Yes, because the replacement is more concise',H:'No, because specific named examples make the claim more credible',J:'No, because Portland and Curitiba are insufficiently well-known'}),
    answer:'H', topic:'Rhetorical Skills',
    explanation:'Specific, named examples provide concrete evidence that strengthens the argument.' },

  { section:'english', number:19, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [19] reads "has become." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'have become',C:'is becoming',D:'had become'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'The compound subject "Portland...and Curitiba" is plural and requires "have become."' },

  { section:'english', number:20, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [20] reads "approximately five dollars in economic returns." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'NO CHANGE',G:'around five dollars in economic returns',H:'roughly five dollars in economic benefit',J:'five dollars, approximately, in economic returns'}),
    answer:'J', topic:'Sentence Structure',
    explanation:'Inserting "approximately" as a parenthetical mid-phrase creates an awkward, non-standard construction.' },

  { section:'english', number:21, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [21] reads "reduces." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'reduce',C:'is reducing',D:'had reduced'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Systems" is plural and requires the plural verb "reduce."' },

  { section:'english', number:22, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [22] reads "For example Houston Texas." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'For example, Houston, Texas,',H:'For example: Houston, Texas',J:'For example; Houston, Texas,'}),
    answer:'G', topic:'Punctuation',
    explanation:'"For example" requires a comma after it; city and state names are separated by commas.' },

  { section:'english', number:23, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'If the writer begins a new paragraph at [23], what would be most important to include at the start?',
    choices:JSON.stringify({A:'A quote from a city planner about parks',B:'A statistic about the cost of park maintenance',C:'A transitional phrase acknowledging the shift from transit to green spaces',D:'A list of the ten cities with the most parkland'}),
    answer:'C', topic:'Rhetorical Skills',
    explanation:'A transition is needed to signal the shift from discussing public transit to green spaces.' },

  { section:'english', number:24, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [24] reads "and other natural areas not only provide recreational opportunities but also improve air quality." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'NO CHANGE',G:'and other natural areas provide not only recreational opportunities but also improved air quality',H:'and other natural areas, providing recreational opportunities and improving air quality,',J:'and other natural areas; not only do they provide recreational opportunities, they also improve air quality'}),
    answer:'H', topic:'Sentence Structure',
    explanation:'This choice turns the main verb into a participial phrase, leaving the sentence without a main verb.' },

  { section:'english', number:25, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [25] reads "city\'s temperatures." Which is most clear and precise?',
    choices:JSON.stringify({A:'NO CHANGE',B:"cities' temperatures",C:'the temperatures of the city',D:'urban temperatures'}),
    answer:'D', topic:'Word Choice',
    explanation:'"Urban temperatures" is the most concise and precise phrasing in this scientific context.' },

  { section:'english', number:26, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [26] reads "Despite being expensive to maintain, researchers have found." What is wrong with this construction?',
    choices:JSON.stringify({F:'NO CHANGE',G:'Although expensive to maintain, researchers have found',H:'Despite green spaces being expensive to maintain, researchers have found',J:'Because they are expensive to maintain, researchers have found'}),
    answer:'H', topic:'Sentence Structure',
    explanation:'The phrase "Despite being expensive to maintain" incorrectly modifies "researchers." Naming "green spaces" fixes the dangling modifier.' },

  { section:'english', number:27, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [27] reads "lie." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'lies',C:'is lying',D:'had lied'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Future" is singular and requires the singular verb "lies."' },

  { section:'english', number:28, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [28] reads "energy usage and waste production." Which correctly adds an Oxford comma to this three-item list?',
    choices:JSON.stringify({F:'NO CHANGE',G:'energy usage, and waste production',H:'energy-usage and waste-production',J:'energy and waste usage and production'}),
    answer:'G', topic:'Punctuation',
    explanation:'In a list of three items (traffic, energy usage, waste production), the Oxford comma before "and" is standard.' },

  { section:'english', number:29, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'The underlined portion at [29] reads "allows planners to make more informed, data-driven decisions." Which is most concise?',
    choices:JSON.stringify({A:'NO CHANGE',B:'allows planners to make more informed decisions',C:'gives planners the ability to make decisions more informed by data',D:'allows planners to make decisions driven by data and information'}),
    answer:'B', topic:'Conciseness',
    explanation:'"Data-driven" is redundant in a sentence already about data collection; removing it tightens the prose.' },

  { section:'english', number:30, passageTitle:'PASSAGE II: URBAN PLANNING AND THE MODERN CITY', passage:ENG_P2,
    stem:'If the final sentence of the passage were deleted, the essay would primarily lose:',
    choices:JSON.stringify({F:'a transition connecting urban planning to global policy',G:'the conclusion summarizing the essay\'s vision for cities',H:'evidence that sensors reduce crime',J:'a counterargument to data-driven planning'}),
    answer:'G', topic:'Rhetorical Skills',
    explanation:'The final sentence provides a summative vision ("cleaner, safer, more equitable") that rounds off the essay.' },

  // PASSAGE III: Q31–45
  { section:'english', number:31, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'Which alternative to the underlined portion at [31] would be LEAST acceptable?',
    choices:JSON.stringify({A:'NO CHANGE',B:'an active biological process vital to health',C:'a process critical to physical and mental functioning',D:'something that helps people feel rested'}),
    answer:'D', topic:'Word Choice',
    explanation:'"Something that helps people feel rested" is vague and loses the scientific precision of the original.' },

  { section:'english', number:32, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The underlined portion at [32] reads "consolidates memories, flushes out toxins, and regulate vital functions." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'consolidates memories, flushes out toxins, and regulates vital functions',H:'consolidating memories, flushing out toxins, and regulating vital functions',J:'consolidates memories, flushes out toxins, and is regulating vital functions'}),
    answer:'G', topic:'Parallel Structure',
    explanation:'All three verbs must match: "consolidates," "flushes," and "regulates."' },

  { section:'english', number:33, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The writer considers adding "which affects millions worldwide" after [33] "deprivation—even of just one or two nights—." Should it be added?',
    choices:JSON.stringify({A:'Yes, because it provides helpful context about the scope of the problem',B:'Yes, because it clarifies the definition of sleep deprivation',C:'No, because it interrupts the causal link between deprivation and cognitive effects',D:'No, because the information appears elsewhere in the essay'}),
    answer:'C', topic:'Rhetorical Skills',
    explanation:'Inserting this phrase breaks the cause-and-effect relationship between "deprivation" and "can impair."' },

  { section:'english', number:34, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The underlined portion at [34] reads "They cycle through these stages." "They" has no clear antecedent. Which choice fixes this?',
    choices:JSON.stringify({F:'NO CHANGE',G:'People cycle through these stages',H:'These stages cycle through themselves',J:'The brain and body each cycle through these stages'}),
    answer:'G', topic:'Pronoun Reference',
    explanation:'"They" is ambiguous; naming "People" removes the unclear antecedent.' },

  { section:'english', number:35, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The underlined portion at [35] reads "is highly active." Which alternative is most concise?',
    choices:JSON.stringify({A:'NO CHANGE',B:'works in a highly active manner',C:'is very active in its processing functions',D:'operates with a high degree of activity'}),
    answer:'A', topic:'Conciseness',
    explanation:'"Is highly active" is the most direct and economical phrasing.' },

  { section:'english', number:36, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The underlined portion at [36] reads "is processed." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'are processed',H:'is being processed',J:'gets processed'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Memories" is plural and requires the plural verb "are processed."' },

  { section:'english', number:37, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The underlined portion at [37] reads "on the other hand consists." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'on the other hand, consists',C:'on the other hand: consists',D:'on the other hand; consists'}),
    answer:'B', topic:'Punctuation',
    explanation:'The transitional phrase "on the other hand" must be set off by a comma.' },

  { section:'english', number:38, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The underlined portion at [38] reads "are between." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'is between',H:'are anywhere between',J:'is at between'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Amount" is singular and requires the singular verb "is."' },

  { section:'english', number:39, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The writer considers replacing "nearly one in three Americans regularly fall short of this goal" with "many people don\'t get enough sleep." Should the replacement be made?',
    choices:JSON.stringify({A:'Yes, because the replacement is clearer',B:'Yes, because the original statistic is imprecise',C:'No, because the original provides a specific, compelling statistic',D:'No, because the original is grammatically superior'}),
    answer:'C', topic:'Rhetorical Skills',
    explanation:'A specific statistic is more persuasive and informative than the vague claim "many people."' },

  { section:'english', number:40, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The underlined portion at [40] reads "it increases the risk." What is the problem, and which choice fixes it?',
    choices:JSON.stringify({F:'NO CHANGE',G:'they increase the risk',H:'chronic sleep deprivation increases the risk',J:'this increases the risk'}),
    answer:'H', topic:'Pronoun Reference',
    explanation:'"It" has an ambiguous antecedent. Naming "chronic sleep deprivation" removes the ambiguity.' },

  { section:'english', number:41, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The transition at [41] reads "Moreover." Which alternative would NOT be acceptable?',
    choices:JSON.stringify({A:'NO CHANGE',B:'In addition,',C:'Furthermore,',D:'However,'}),
    answer:'D', topic:'Transitions',
    explanation:'"However" signals contrast, but the sentence adds another related consequence rather than opposing one.' },

  { section:'english', number:42, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The underlined portion at [42] reads "that promotes." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'that promote',H:'which promotes',J:'promoting'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Habits" is plural; the relative clause verb must be "promote."' },

  { section:'english', number:43, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The underlined portion at [43] reads "to avoid caffeine." Which corrects the parallel structure error?',
    choices:JSON.stringify({A:'NO CHANGE',B:'to avoiding caffeine',C:'avoiding caffeine',D:'the avoidance of caffeine'}),
    answer:'C', topic:'Parallel Structure',
    explanation:'The series uses gerunds: "maintaining," "limiting," and "avoiding." "To avoid" breaks the parallel structure.' },

  { section:'english', number:44, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The writer wants to rewrite the opening of the sentence at [44] while keeping the same meaning. Which is best?',
    choices:JSON.stringify({F:'NO CHANGE',G:'While it is commonly believed that sleeping less is something one can adapt to,',H:'Even though many people think they can train themselves to need less sleep,',J:'Some people believe they can train themselves, but in reality'}),
    answer:'H', topic:'Sentence Structure',
    explanation:'Choice H preserves the concessive meaning of "Although" and restates the claim clearly and concisely.' },

  { section:'english', number:45, passageTitle:'PASSAGE III: THE SCIENCE OF SLEEP', passage:ENG_P3,
    stem:'The writer considers an alternative ending: "So turn off the screens, set a bedtime, and let your body do what it evolved to do—sleep." Would this be an improvement?',
    choices:JSON.stringify({A:'Yes, because it provides direct, actionable advice',B:'Yes, because it is shorter',C:'No, because the informal tone clashes with the essay\'s scientific register',D:'No, because it introduces factually inaccurate information'}),
    answer:'C', topic:'Rhetorical Skills',
    explanation:'The essay maintains a scientific, informative tone throughout; a colloquial imperative would be inconsistent.' },

  // PASSAGE IV: Q46–60
  { section:'english', number:46, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [46] reads "emerging from." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'emerged from',H:'is emerging from',J:'emerges from'}),
    answer:'G', topic:'Verb Tense',
    explanation:'The sentence needs a finite main verb in past tense; "emerging" is a participle, not a complete verb.' },

  { section:'english', number:47, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The writer wants to add "—and one that continues to evolve" after [47] "art form." Would this strengthen the paragraph?',
    choices:JSON.stringify({A:'Yes, because it previews the later discussion of jazz\'s ongoing development',B:'Yes, because it corrects a factual error in the sentence',C:'No, because it contradicts the paragraph\'s focus on jazz\'s origins',D:'No, because this idea is already stated in the final paragraph'}),
    answer:'A', topic:'Rhetorical Skills',
    explanation:'This addition previews the essay\'s later discussion of jazz\'s evolution, creating forward cohesion.' },

  { section:'english', number:48, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [48] reads "Unlike classical European music." If changed to "Like classical European music," the passage would:',
    choices:JSON.stringify({F:'need no other changes',G:'require a different main verb',H:'undermine the contrast explaining what makes jazz distinctive',J:'need to redefine improvisation'}),
    answer:'H', topic:'Rhetorical Skills',
    explanation:'"Unlike" establishes the contrast that defines jazz\'s unique quality; replacing it with "Like" destroys that logic.' },

  { section:'english', number:49, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [49] reads "creating music spontaneously in the moment of performance." Which is most concise?',
    choices:JSON.stringify({A:'NO CHANGE',B:'creating music spontaneously',C:'creating, in the moment of performance, spontaneous music',D:'creating music that is spontaneous and immediate'}),
    answer:'B', topic:'Conciseness',
    explanation:'"In the moment of performance" is redundant since "spontaneously" already conveys immediacy.' },

  { section:'english', number:50, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [50] reads "seen the music." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'saw the music',H:'had saw the music',J:'have seen the music'}),
    answer:'G', topic:'Verb Tense',
    explanation:'Simple past "saw" is required; "seen" needs a helping verb and "had saw" is nonstandard.' },

  { section:'english', number:51, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The writer considers adding "and even international venues" after [51] "radio stations." Would this addition be effective?',
    choices:JSON.stringify({A:'Yes, because it emphasizes jazz\'s global reach',B:'Yes, because it corrects a factual omission',C:'No, because the paragraph is focused on jazz\'s rise in America',D:'No, because concert halls are themselves international venues'}),
    answer:'C', topic:'Rhetorical Skills',
    explanation:'The paragraph describes jazz\'s American popularity; adding international venues shifts the focus prematurely.' },

  { section:'english', number:52, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [52] reads "Armstrongs." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:"Armstrong's",H:"Armstrongs'",J:"The Armstrongs'"}),
    answer:'G', topic:'Punctuation',
    explanation:'A singular possessive apostrophe is needed: "Armstrong\'s virtuosic trumpet playing."' },

  { section:'english', number:53, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [53] reads "had emerged." Which alternative is NOT acceptable in this historical context?',
    choices:JSON.stringify({A:'emerged',B:'arose',C:'had developed',D:'has emerged'}),
    answer:'D', topic:'Verb Tense',
    explanation:'Present perfect "has emerged" is inconsistent with the historical past context of the surrounding paragraph.' },

  { section:'english', number:54, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [54] reads "fast complex melodies." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'fast, complex melodies',H:'fast-complex melodies',J:'fast and complex melodies'}),
    answer:'G', topic:'Punctuation',
    explanation:'Coordinate adjectives each independently modifying the noun are separated by a comma.' },

  { section:'english', number:55, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [55] reads "More adventurous than traditional jazz styles." Which would be LEAST acceptable as a replacement?',
    choices:JSON.stringify({A:'Bolder than earlier forms of jazz,',B:'Going further than traditional jazz in musical risk,',C:'More jazz-like than traditional forms,',D:'In ways that exceeded earlier jazz in terms of complexity,'}),
    answer:'C', topic:'Word Choice',
    explanation:'"More jazz-like than traditional forms" is self-contradictory and meaningless in context.' },

  { section:'english', number:56, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [56] reads "were pleased." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'was pleased',H:'are pleased',J:'have been pleased'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Everyone" is always singular and requires the singular verb "was pleased."' },

  { section:'english', number:57, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'If the sentence at [57] about jazz evolving were deleted, the paragraph would primarily lose:',
    choices:JSON.stringify({A:'evidence that bebop was controversial',B:'the bridge connecting mid-century bebop to modern jazz forms',C:'an explanation of why jazz declined in popularity',D:'the names of specific jazz musicians from the 1960s'}),
    answer:'B', topic:'Rhetorical Skills',
    explanation:'This sentence establishes jazz\'s continued evolution from bebop into later subgenres, connecting past to present.' },

  { section:'english', number:58, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The underlined portion at [58] reads "continue to inspire." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'continues to inspire',H:'is continuing to inspire',J:'had continued to inspire'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Jazz" is singular and requires the singular verb "continues."' },

  { section:'english', number:59, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The transition at [59] reads "Most importantly." Which alternative would NOT be acceptable?',
    choices:JSON.stringify({A:'NO CHANGE',B:'Above all,',C:'Of greatest significance,',D:'In contrast,'}),
    answer:'D', topic:'Transitions',
    explanation:'"In contrast" signals opposition, but the sentence adds a culminating point, not a contrasting one.' },

  { section:'english', number:60, passageTitle:"PASSAGE IV: JAZZ: AMERICA'S ORIGINAL ART FORM", passage:ENG_P4,
    stem:'The writer considers deleting "Whether or not one fully appreciates jazz" from [60]. Would deletion improve the sentence?',
    choices:JSON.stringify({F:'Yes, because the clause is unrelated to cultural legacy',G:'Yes, because it makes the sentence more direct',H:'No, because it acknowledges varying opinions while still affirming jazz\'s importance',J:'No, because it contains the essay\'s central argument'}),
    answer:'H', topic:'Rhetorical Skills',
    explanation:'The concessive clause acknowledges reader skepticism, making the final claim more rhetorically effective.' },

  // PASSAGE V: Q61–75
  { section:'english', number:61, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The underlined portion at [61] reads "undertakes." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'undertake',C:'is undertaking',D:'has undertaken'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Millions" is plural and requires the plural verb "undertake."' },

  { section:'english', number:62, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The underlined portion at [62] reads "that they had never visited previously before." Which is most concise?',
    choices:JSON.stringify({F:'NO CHANGE',G:'that they had never visited',H:'that no butterfly had ever previously visited before',J:'which they had never before previously visited'}),
    answer:'G', topic:'Conciseness',
    explanation:'"Previously" and "before" are redundant. "That they had never visited" is clearest and most concise.' },

  { section:'english', number:63, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The underlined portion at [63] reads "there ancestors." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'their ancestors',C:"they're ancestors",D:'them ancestors'}),
    answer:'B', topic:'Pronoun Usage',
    explanation:'"There" indicates a place. The possessive pronoun "their" is required.' },

  { section:'english', number:64, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The writer considers adding "unlike nocturnal insects, which navigate by stars" to the end of the sentence at [64]. Should this be added?',
    choices:JSON.stringify({F:'Yes, because it provides helpful context about insect navigation generally',G:'Yes, because it makes monarchs seem more impressive by comparison',H:'No, because it introduces irrelevant information about other insects',J:'No, because monarch butterflies do in fact navigate by stars'}),
    answer:'H', topic:'Rhetorical Skills',
    explanation:'The paragraph is specifically about monarch navigation; a comparison to other insects is a distraction.' },

  { section:'english', number:65, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'After [65], the writer considers adding: "This ability may be related to magnetite crystals found in monarch bodies." Should this be added?',
    choices:JSON.stringify({A:'Yes, because it offers a plausible scientific mechanism for magnetic navigation',B:'Yes, because it makes the paragraph longer',C:'No, because it contradicts the previous sentence',D:'No, because it should open a new paragraph instead'}),
    answer:'A', topic:'Rhetorical Skills',
    explanation:'Adding a scientific explanation strengthens the credibility of the claim about magnetic navigation.' },

  { section:'english', number:66, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The underlined portion at [65] reads "tied with the milkweed plant." Which is idiomatically correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'tied to the milkweed plant',H:'tied up in the milkweed plant',J:'tied by the milkweed plant'}),
    answer:'G', topic:'Idiom',
    explanation:'The correct idiom is "tied to," meaning closely linked or connected to.' },

  { section:'english', number:67, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The underlined portion at [66] reads "lay they\'re eggs." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'lay their eggs',C:'lay there eggs',D:"lays they're eggs"}),
    answer:'B', topic:'Pronoun Usage',
    explanation:'"They\'re" means "they are." The possessive "their" is required.' },

  { section:'english', number:68, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'If the sentence about milkweed were deleted, the paragraph would primarily lose:',
    choices:JSON.stringify({F:'an explanation of how monarchs locate milkweed',G:'the reason cardenolides make monarchs toxic to predators',H:'a description of the monarch\'s winter habitat',J:'the connection between herbicide use and milkweed loss'}),
    answer:'G', topic:'Rhetorical Skills',
    explanation:'The sentence explains that milkweed cardenolides make monarchs unpalatable—removing it loses that causal link.' },

  { section:'english', number:69, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The underlined portion at [68] reads "that makes monarchs unpalatable." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'that make monarchs unpalatable',C:'which makes monarchs unpalatable',D:'making monarchs unpalatable'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Compounds" is plural; the relative clause verb must be "make."' },

  { section:'english', number:70, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The underlined portion at [69] includes "effective that predators who eat monarchs quickly learn to avoid them." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'effective enough that predators who eat monarchs quickly learn to avoid them',G:'effective; predators who eat monarchs quickly learn to avoid them',H:'effective, so predators who eat monarchs quickly learn to avoid them',J:'effective, which predators who eat monarchs quickly learning to avoid'}),
    answer:'J', topic:'Sentence Structure',
    explanation:'"Learning" creates an ungrammatical participial construction; the other choices are all acceptable alternatives.' },

  { section:'english', number:71, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The transition at [70] reads "Unfortunately." What does this word signal to the reader?',
    choices:JSON.stringify({A:'A contrast with an earlier claim',B:'That the following information is negative or concerning',C:'Surprise at a counterintuitive finding',D:'That the previous paragraph contained an error'}),
    answer:'B', topic:'Transitions',
    explanation:'"Unfortunately" signals that the following information is unwelcome—appropriate for a paragraph about population decline.' },

  { section:'english', number:72, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The underlined portion at [71] reads "due largely to the widespread use of herbicides." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'mostly because of the widespread use of herbicides',G:'largely as a result of the widespread use of herbicides',H:'in large part because of the widespread use of herbicides',J:'largely being due to the widespread use of herbicides'}),
    answer:'J', topic:'Sentence Structure',
    explanation:'"Largely being due to" is awkward and redundant; the other three are idiomatic alternatives.' },

  { section:'english', number:73, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The writer wants to specify why breeding sites matter. Which addition best accomplishes this?',
    choices:JSON.stringify({A:'NO CHANGE',B:'where monarchs breed and find food',C:'where sufficient milkweed grows for successful monarch breeding',D:'where monarchs spend their summer months'}),
    answer:'C', topic:'Rhetorical Skills',
    explanation:'Specifying that milkweed must be present connects the breeding sites directly to the habitat-loss problem.' },

  { section:'english', number:74, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The underlined portion at [72] reads "also effect migration timing." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'also affects migration timing',H:'also effects migration timing',J:'also affected migration timing'}),
    answer:'G', topic:'Word Choice',
    explanation:'"Effect" as a verb means "to bring about." The correct verb here is "affects" (to have an influence on).' },

  { section:'english', number:75, passageTitle:"PASSAGE V: THE MONARCH BUTTERFLY'S EPIC JOURNEY", passage:ENG_P5,
    stem:'The final sentence at [75] ("This cooperation...monarch\'s survival") primarily serves to:',
    choices:JSON.stringify({A:'introduce a new argument about international conservation law',B:'provide a hopeful conclusion tying together the essay\'s conservation themes',C:'argue that individual action is insufficient',D:'summarize the scientific findings about monarch navigation'}),
    answer:'B', topic:'Rhetorical Skills',
    explanation:'The final sentence names cooperative effort as the monarch\'s best hope—a fitting, optimistic conclusion.' },

  // ═══════════════════════════════════════════════════
  // MATH — 60 questions
  // ═══════════════════════════════════════════════════

  { section:'math', number:1, passageTitle:null, passage:null,
    stem:'If 4x + 9 = 33, what is the value of 3x?',
    choices:JSON.stringify({A:'6',B:'12',C:'18',D:'24',E:'27'}),
    answer:'C', topic:'Pre-Algebra',
    explanation:'4x = 24, so x = 6. Then 3x = 18.' },

  { section:'math', number:2, passageTitle:null, passage:null,
    stem:'What is 40% of 75?',
    choices:JSON.stringify({F:'25',G:'30',H:'35',J:'40',K:'45'}),
    answer:'G', topic:'Pre-Algebra',
    explanation:'0.40 × 75 = 30.' },

  { section:'math', number:3, passageTitle:null, passage:null,
    stem:'The average of five numbers is 14. Four of the numbers are 10, 12, 16, and 18. What is the fifth number?',
    choices:JSON.stringify({A:'10',B:'14',C:'16',D:'18',E:'20'}),
    answer:'B', topic:'Pre-Algebra',
    explanation:'Sum = 14 × 5 = 70. Sum of four known = 56. Fifth = 70 − 56 = 14.' },

  { section:'math', number:4, passageTitle:null, passage:null,
    stem:'A car travels 315 miles in 4.5 hours. What is its average speed in miles per hour?',
    choices:JSON.stringify({F:'60',G:'65',H:'70',J:'75',K:'80'}),
    answer:'H', topic:'Pre-Algebra',
    explanation:'315 ÷ 4.5 = 70 mph.' },

  { section:'math', number:5, passageTitle:null, passage:null,
    stem:'Two numbers are in the ratio 3:5. Their sum is 48. What is the larger number?',
    choices:JSON.stringify({A:'18',B:'24',C:'28',D:'30',E:'36'}),
    answer:'D', topic:'Pre-Algebra',
    explanation:'8 parts = 48, so 1 part = 6. Larger number = 5 × 6 = 30.' },

  { section:'math', number:6, passageTitle:null, passage:null,
    stem:'A shirt originally costs $45 and is on sale for 20% off. What is the sale price?',
    choices:JSON.stringify({F:'$9',G:'$25',H:'$36',J:'$38',K:'$40'}),
    answer:'H', topic:'Pre-Algebra',
    explanation:'Discount = 0.20 × 45 = $9. Sale price = $45 − $9 = $36.' },

  { section:'math', number:7, passageTitle:null, passage:null,
    stem:'Which of the following is a prime number?',
    choices:JSON.stringify({A:'51',B:'57',C:'63',D:'67',E:'69'}),
    answer:'D', topic:'Pre-Algebra',
    explanation:'67 is prime. 51=3×17, 57=3×19, 63=9×7, 69=3×23.' },

  { section:'math', number:8, passageTitle:null, passage:null,
    stem:'If 3/4 of a number is 54, what is the number?',
    choices:JSON.stringify({F:'40',G:'60',H:'72',J:'81',K:'108'}),
    answer:'H', topic:'Pre-Algebra',
    explanation:'(3/4)n = 54 → n = 54 × (4/3) = 72.' },

  { section:'math', number:9, passageTitle:null, passage:null,
    stem:'What is the value of |−8 + 3|?',
    choices:JSON.stringify({A:'−11',B:'−5',C:'5',D:'11',E:'24'}),
    answer:'C', topic:'Pre-Algebra',
    explanation:'−8 + 3 = −5. |−5| = 5.' },

  { section:'math', number:10, passageTitle:null, passage:null,
    stem:'Which of the following is between 2/3 and 3/4?',
    choices:JSON.stringify({F:'0.60',G:'0.65',H:'0.70',J:'0.78',K:'0.80'}),
    answer:'H', topic:'Pre-Algebra',
    explanation:'2/3 ≈ 0.667 and 3/4 = 0.750. Only 0.70 falls between them.' },

  { section:'math', number:11, passageTitle:null, passage:null,
    stem:'Solve: 5x − 3 = 3x + 11',
    choices:JSON.stringify({A:'4',B:'5',C:'6',D:'7',E:'8'}),
    answer:'D', topic:'Elementary Algebra',
    explanation:'2x = 14, so x = 7.' },

  { section:'math', number:12, passageTitle:null, passage:null,
    stem:'Simplify: 4x² + 7x − 2x² − 3x',
    choices:JSON.stringify({F:'2x² + 4x',G:'6x² + 4x',H:'2x² − 4x',J:'6x² + 10x',K:'2x + 4x²'}),
    answer:'F', topic:'Elementary Algebra',
    explanation:'(4x² − 2x²) + (7x − 3x) = 2x² + 4x.' },

  { section:'math', number:13, passageTitle:null, passage:null,
    stem:'If f(x) = 3x² − 5, what is f(3)?',
    choices:JSON.stringify({A:'22',B:'24',C:'27',D:'30',E:'32'}),
    answer:'A', topic:'Elementary Algebra',
    explanation:'f(3) = 3(9) − 5 = 27 − 5 = 22.' },

  { section:'math', number:14, passageTitle:null, passage:null,
    stem:'Solve the inequality: 3x + 5 > 20',
    choices:JSON.stringify({F:'x > 3',G:'x > 4',H:'x > 5',J:'x > 6',K:'x > 8'}),
    answer:'H', topic:'Elementary Algebra',
    explanation:'3x > 15, so x > 5.' },

  { section:'math', number:15, passageTitle:null, passage:null,
    stem:'Which expression is equivalent to (x + 4)(x − 6)?',
    choices:JSON.stringify({A:'x² − 2x − 24',B:'x² + 2x − 24',C:'x² − 2x + 24',D:'x² + 2x + 24',E:'x² − 24'}),
    answer:'A', topic:'Elementary Algebra',
    explanation:'x² − 6x + 4x − 24 = x² − 2x − 24.' },

  { section:'math', number:16, passageTitle:null, passage:null,
    stem:'If 3a − b = 14 and a = 5, what is b?',
    choices:JSON.stringify({F:'−1',G:'0',H:'1',J:'3',K:'5'}),
    answer:'H', topic:'Elementary Algebra',
    explanation:'3(5) − b = 14 → 15 − b = 14 → b = 1.' },

  { section:'math', number:17, passageTitle:null, passage:null,
    stem:'Simplify: (3x³)(4x²)',
    choices:JSON.stringify({A:'7x⁵',B:'7x⁶',C:'12x⁵',D:'12x⁶',E:'12x⁸'}),
    answer:'C', topic:'Elementary Algebra',
    explanation:'3 × 4 = 12 and x³ × x² = x⁵. Result: 12x⁵.' },

  { section:'math', number:18, passageTitle:null, passage:null,
    stem:'Solve: |2x − 4| = 10',
    choices:JSON.stringify({F:'x = 7 only',G:'x = −3 only',H:'x = 7 or x = −3',J:'x = 7 or x = 3',K:'x = −7 or x = 3'}),
    answer:'H', topic:'Elementary Algebra',
    explanation:'2x − 4 = 10 → x = 7; 2x − 4 = −10 → x = −3.' },

  { section:'math', number:19, passageTitle:null, passage:null,
    stem:'A line has slope 3 and passes through (0, −2). What is its equation?',
    choices:JSON.stringify({A:'y = 3x + 2',B:'y = 3x − 2',C:'y = −2x + 3',D:'y = 2x − 3',E:'y = −3x − 2'}),
    answer:'B', topic:'Elementary Algebra',
    explanation:'Slope-intercept form: y = 3x + (−2) = 3x − 2.' },

  { section:'math', number:20, passageTitle:null, passage:null,
    stem:'If x² = 144, which gives all solutions?',
    choices:JSON.stringify({F:'x = 12',G:'x = −12',H:'x = ±12',J:'x = ±14',K:'x = 72'}),
    answer:'H', topic:'Elementary Algebra',
    explanation:'x² = 144 has two solutions: x = 12 and x = −12, written as ±12.' },

  { section:'math', number:21, passageTitle:null, passage:null,
    stem:'Factor: x² − 8x + 15',
    choices:JSON.stringify({A:'(x − 3)(x − 5)',B:'(x + 3)(x + 5)',C:'(x − 3)(x + 5)',D:'(x + 3)(x − 5)',E:'(x − 1)(x − 15)'}),
    answer:'A', topic:'Intermediate Algebra',
    explanation:'Need two numbers multiplying to 15 and adding to −8: −3 and −5. So (x − 3)(x − 5).' },

  { section:'math', number:22, passageTitle:null, passage:null,
    stem:'Solve: x² + x − 12 = 0',
    choices:JSON.stringify({F:'x = 3, x = −4',G:'x = −3, x = 4',H:'x = 3, x = 4',J:'x = −3, x = −4',K:'x = 6, x = −2'}),
    answer:'F', topic:'Intermediate Algebra',
    explanation:'(x + 4)(x − 3) = 0, so x = −4 or x = 3.' },

  { section:'math', number:23, passageTitle:null, passage:null,
    stem:'If g(x) = x² − 3x + 1, what is g(−1)?',
    choices:JSON.stringify({A:'−1',B:'3',C:'5',D:'6',E:'7'}),
    answer:'C', topic:'Intermediate Algebra',
    explanation:'g(−1) = (−1)² − 3(−1) + 1 = 1 + 3 + 1 = 5.' },

  { section:'math', number:24, passageTitle:null, passage:null,
    stem:'Solve the system: 2x + y = 10 and x − y = 2',
    choices:JSON.stringify({F:'(3, 4)',G:'(4, 2)',H:'(4, 3)',J:'(5, 0)',K:'(2, 6)'}),
    answer:'G', topic:'Intermediate Algebra',
    explanation:'Adding: 3x = 12, x = 4. Then 4 − y = 2, y = 2. Solution: (4, 2).' },

  { section:'math', number:25, passageTitle:null, passage:null,
    stem:'What is log₃(81)?',
    choices:JSON.stringify({A:'3',B:'4',C:'9',D:'27',E:'243'}),
    answer:'B', topic:'Intermediate Algebra',
    explanation:'3⁴ = 81, so log₃(81) = 4.' },

  { section:'math', number:26, passageTitle:null, passage:null,
    stem:'Simplify: √72',
    choices:JSON.stringify({F:'6√2',G:'4√3',H:'8√3',J:'6√3',K:'3√8'}),
    answer:'F', topic:'Intermediate Algebra',
    explanation:'√72 = √(36 × 2) = 6√2.' },

  { section:'math', number:27, passageTitle:null, passage:null,
    stem:'If h(x) = 2x + 3, what is h(h(4))?',
    choices:JSON.stringify({A:'19',B:'22',C:'23',D:'24',E:'25'}),
    answer:'E', topic:'Intermediate Algebra',
    explanation:'h(4) = 2(4) + 3 = 11. h(11) = 2(11) + 3 = 25.' },

  { section:'math', number:28, passageTitle:null, passage:null,
    stem:'What is the product of the roots of x² − 7x + 10 = 0?',
    choices:JSON.stringify({F:'7',G:'10',H:'−7',J:'−10',K:'17'}),
    answer:'G', topic:'Intermediate Algebra',
    explanation:'By Vieta\'s formulas, product of roots = c/a = 10/1 = 10.' },

  { section:'math', number:29, passageTitle:null, passage:null,
    stem:'Simplify: (x² − 16)/(x − 4)',
    choices:JSON.stringify({A:'x − 4',B:'x + 4',C:'x² + 4',D:'x + 16',E:'x − 16'}),
    answer:'B', topic:'Intermediate Algebra',
    explanation:'x² − 16 = (x − 4)(x + 4). Dividing by (x − 4) gives x + 4.' },

  { section:'math', number:30, passageTitle:null, passage:null,
    stem:'Which sequence is arithmetic?',
    choices:JSON.stringify({F:'3, 6, 12, 24',G:'2, 5, 9, 14',H:'4, 7, 10, 13',J:'1, 4, 9, 16',K:'2, 3, 5, 8'}),
    answer:'H', topic:'Intermediate Algebra',
    explanation:'An arithmetic sequence has a constant difference. 4→7→10→13 all increase by 3.' },

  { section:'math', number:31, passageTitle:null, passage:null,
    stem:'What is the slope of the line passing through (1, 3) and (5, 11)?',
    choices:JSON.stringify({A:'1',B:'2',C:'3',D:'4',E:'8'}),
    answer:'B', topic:'Coordinate Geometry',
    explanation:'Slope = (11 − 3)/(5 − 1) = 8/4 = 2.' },

  { section:'math', number:32, passageTitle:null, passage:null,
    stem:'What is the midpoint of the segment from (−2, 4) to (8, −6)?',
    choices:JSON.stringify({F:'(3, −1)',G:'(3, 1)',H:'(5, 1)',J:'(5, −1)',K:'(6, −2)'}),
    answer:'F', topic:'Coordinate Geometry',
    explanation:'Midpoint = ((−2+8)/2, (4+(−6))/2) = (3, −1).' },

  { section:'math', number:33, passageTitle:null, passage:null,
    stem:'What is the distance between (0, 0) and (8, 6)?',
    choices:JSON.stringify({A:'8',B:'10',C:'12',D:'14',E:'100'}),
    answer:'B', topic:'Coordinate Geometry',
    explanation:'d = √(8² + 6²) = √(64 + 36) = √100 = 10.' },

  { section:'math', number:34, passageTitle:null, passage:null,
    stem:'What is the y-intercept of the line 4x − 2y = 12?',
    choices:JSON.stringify({F:'−6',G:'−3',H:'3',J:'6',K:'12'}),
    answer:'F', topic:'Coordinate Geometry',
    explanation:'Set x = 0: −2y = 12, y = −6.' },

  { section:'math', number:35, passageTitle:null, passage:null,
    stem:'Which line is parallel to y = 3x − 7?',
    choices:JSON.stringify({A:'y = 3x + 2',B:'y = −3x + 2',C:'y = (1/3)x + 2',D:'y = −(1/3)x − 7',E:'y = 4x − 7'}),
    answer:'A', topic:'Coordinate Geometry',
    explanation:'Parallel lines have equal slopes. y = 3x + 2 has slope 3, same as the given line.' },

  { section:'math', number:36, passageTitle:null, passage:null,
    stem:'A circle is centered at the origin with radius 5. Which point lies ON the circle?',
    choices:JSON.stringify({F:'(2, 4)',G:'(3, 4)',H:'(4, 4)',J:'(5, 5)',K:'(6, 1)'}),
    answer:'G', topic:'Coordinate Geometry',
    explanation:'Check: 3² + 4² = 9 + 16 = 25 = 5². Point (3, 4) is on the circle.' },

  { section:'math', number:37, passageTitle:null, passage:null,
    stem:'What is the equation of a line with slope −2 passing through (0, 5)?',
    choices:JSON.stringify({A:'y = −2x + 5',B:'y = 2x + 5',C:'y = −2x − 5',D:'y = 5x − 2',E:'y = 5x + 2'}),
    answer:'A', topic:'Coordinate Geometry',
    explanation:'y = mx + b = −2x + 5.' },

  { section:'math', number:38, passageTitle:null, passage:null,
    stem:'A line has equation y = (1/3)x − 4. What is its x-intercept?',
    choices:JSON.stringify({F:'−4',G:'−12',H:'4',J:'12',K:'3'}),
    answer:'J', topic:'Coordinate Geometry',
    explanation:'Set y = 0: (1/3)x = 4, x = 12.' },

  { section:'math', number:39, passageTitle:null, passage:null,
    stem:'Two angles of a triangle measure 48° and 74°. What is the third angle?',
    choices:JSON.stringify({A:'48°',B:'52°',C:'58°',D:'62°',E:'68°'}),
    answer:'C', topic:'Plane Geometry',
    explanation:'180 − 48 − 74 = 58°.' },

  { section:'math', number:40, passageTitle:null, passage:null,
    stem:'A rectangle has length 18 and width 7. What is its perimeter?',
    choices:JSON.stringify({F:'25',G:'50',H:'63',J:'126',K:'252'}),
    answer:'G', topic:'Plane Geometry',
    explanation:'P = 2(18 + 7) = 2(25) = 50.' },

  { section:'math', number:41, passageTitle:null, passage:null,
    stem:'A circle has radius 9. What is its area?',
    choices:JSON.stringify({A:'9π',B:'18π',C:'27π',D:'81π',E:'729π'}),
    answer:'D', topic:'Plane Geometry',
    explanation:'Area = πr² = π(81) = 81π.' },

  { section:'math', number:42, passageTitle:null, passage:null,
    stem:'A right triangle has legs of length 9 and 12. What is the hypotenuse?',
    choices:JSON.stringify({F:'13',G:'14',H:'15',J:'16',K:'17'}),
    answer:'H', topic:'Plane Geometry',
    explanation:'h = √(81 + 144) = √225 = 15.' },

  { section:'math', number:43, passageTitle:null, passage:null,
    stem:'A square has side length 11. What is its area?',
    choices:JSON.stringify({A:'44',B:'88',C:'121',D:'132',E:'144'}),
    answer:'C', topic:'Plane Geometry',
    explanation:'Area = 11² = 121.' },

  { section:'math', number:44, passageTitle:null, passage:null,
    stem:'Two supplementary angles are in the ratio 2:7. What is the measure of the smaller angle?',
    choices:JSON.stringify({F:'20°',G:'30°',H:'36°',J:'40°',K:'45°'}),
    answer:'J', topic:'Plane Geometry',
    explanation:'9 parts = 180°, so 1 part = 20°. Smaller angle = 2 × 20° = 40°.' },

  { section:'math', number:45, passageTitle:null, passage:null,
    stem:'What is the measure of each interior angle of a regular pentagon?',
    choices:JSON.stringify({A:'90°',B:'108°',C:'120°',D:'135°',E:'144°'}),
    answer:'B', topic:'Plane Geometry',
    explanation:'(5−2)×180/5 = 540/5 = 108°.' },

  { section:'math', number:46, passageTitle:null, passage:null,
    stem:'An isosceles triangle has a vertex angle of 50°. What is each base angle?',
    choices:JSON.stringify({F:'50°',G:'60°',H:'65°',J:'70°',K:'90°'}),
    answer:'H', topic:'Plane Geometry',
    explanation:'(180 − 50)/2 = 130/2 = 65°.' },

  { section:'math', number:47, passageTitle:null, passage:null,
    stem:'A circle has diameter 14. What is its circumference?',
    choices:JSON.stringify({A:'7π',B:'14π',C:'28π',D:'49π',E:'196π'}),
    answer:'B', topic:'Plane Geometry',
    explanation:'C = πd = 14π.' },

  { section:'math', number:48, passageTitle:null, passage:null,
    stem:'A rectangle has area 132 and width 11. What is its length?',
    choices:JSON.stringify({F:'11',G:'12',H:'13',J:'14',K:'15'}),
    answer:'G', topic:'Plane Geometry',
    explanation:'Length = 132/11 = 12.' },

  { section:'math', number:49, passageTitle:null, passage:null,
    stem:'When two parallel lines are cut by a transversal, alternate interior angles are:',
    choices:JSON.stringify({A:'supplementary',B:'complementary',C:'equal',D:'always obtuse',E:'always acute'}),
    answer:'C', topic:'Plane Geometry',
    explanation:'Alternate interior angles formed by parallel lines cut by a transversal are always congruent (equal).' },

  { section:'math', number:50, passageTitle:null, passage:null,
    stem:'A rectangular box has dimensions 8 × 5 × 4. What is its volume?',
    choices:JSON.stringify({F:'40',G:'80',H:'100',J:'160',K:'200'}),
    answer:'J', topic:'Plane Geometry',
    explanation:'V = 8 × 5 × 4 = 160.' },

  { section:'math', number:51, passageTitle:null, passage:null,
    stem:'A triangle has base 20 and height 11. What is its area?',
    choices:JSON.stringify({A:'55',B:'80',C:'110',D:'220',E:'440'}),
    answer:'C', topic:'Plane Geometry',
    explanation:'Area = (1/2)(20)(11) = 110.' },

  { section:'math', number:52, passageTitle:null, passage:null,
    stem:'A 45-45-90 triangle has legs of length 7. What is the hypotenuse?',
    choices:JSON.stringify({F:'7',G:'7√2',H:'7√3',J:'14',K:'14√2'}),
    answer:'G', topic:'Plane Geometry',
    explanation:'In a 45-45-90 triangle, hypotenuse = leg × √2 = 7√2.' },

  { section:'math', number:53, passageTitle:null, passage:null,
    stem:'A student scored 68, 74, 82, 90, and 91 on five tests. What is the median?',
    choices:JSON.stringify({A:'74',B:'80',C:'82',D:'85',E:'90'}),
    answer:'C', topic:'Statistics',
    explanation:'Sorted: 68, 74, 82, 90, 91. The middle value is 82.' },

  { section:'math', number:54, passageTitle:null, passage:null,
    stem:'A bag contains 4 red, 3 blue, and 5 green marbles. What is the probability of drawing a blue marble?',
    choices:JSON.stringify({F:'1/4',G:'1/3',H:'5/12',J:'1/2',K:'3/4'}),
    answer:'F', topic:'Statistics',
    explanation:'P(blue) = 3/12 = 1/4.' },

  { section:'math', number:55, passageTitle:null, passage:null,
    stem:'The mean of 6 numbers is 15. A 7th number is added and the new mean is 16. What is the 7th number?',
    choices:JSON.stringify({A:'16',B:'17',C:'21',D:'22',E:'28'}),
    answer:'D', topic:'Statistics',
    explanation:'Original sum = 90. New sum = 7 × 16 = 112. 7th number = 112 − 90 = 22.' },

  { section:'math', number:56, passageTitle:null, passage:null,
    stem:'How many different 3-letter arrangements can be made from A, B, C, D (no repeats)?',
    choices:JSON.stringify({F:'12',G:'18',H:'24',J:'36',K:'64'}),
    answer:'H', topic:'Statistics',
    explanation:'4 × 3 × 2 = 24 arrangements.' },

  { section:'math', number:57, passageTitle:null, passage:null,
    stem:'What is the value of sin(30°)?',
    choices:JSON.stringify({A:'0',B:'1/2',C:'√2/2',D:'√3/2',E:'1'}),
    answer:'B', topic:'Trigonometry',
    explanation:'sin(30°) = 1/2. Standard angle value.' },

  { section:'math', number:58, passageTitle:null, passage:null,
    stem:'In a right triangle, the side opposite angle θ is 5 and the hypotenuse is 13. What is sin(θ)?',
    choices:JSON.stringify({F:'5/13',G:'12/13',H:'5/12',J:'13/5',K:'13/12'}),
    answer:'F', topic:'Trigonometry',
    explanation:'sin(θ) = opposite/hypotenuse = 5/13.' },

  { section:'math', number:59, passageTitle:null, passage:null,
    stem:'What is the value of cos(60°)?',
    choices:JSON.stringify({A:'0',B:'1/2',C:'√2/2',D:'√3/2',E:'1'}),
    answer:'B', topic:'Trigonometry',
    explanation:'cos(60°) = 1/2. Standard angle value.' },

  { section:'math', number:60, passageTitle:null, passage:null,
    stem:'In a right triangle, tan(θ) = 5/12. If the adjacent side is 24, what is the opposite side?',
    choices:JSON.stringify({F:'5',G:'8',H:'10',J:'12',K:'20'}),
    answer:'H', topic:'Trigonometry',
    explanation:'tan = opp/adj = 5/12. Adjacent is 24 = 2×12, so opposite = 2×5 = 10.' },

  // ═══════════════════════════════════════════════════
  // READING — 40 questions across 4 passages
  // ═══════════════════════════════════════════════════

  // PASSAGE 1: Literary Narrative (Q1–10)
  { section:'reading', number:1, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'The main purpose of this passage is to:',
    choices:JSON.stringify({A:'argue that people should visit deceased relatives\' homes',B:'contrast Elena\'s city life with her grandmother\'s rural lifestyle',C:'portray Elena\'s emotional journey toward understanding her grandmother',D:'explain the tradition of keeping personal journals'}),
    answer:'C', topic:'Main Idea',
    explanation:'The passage traces Elena\'s shift from numbness to a deeper, more complicated appreciation of her grandmother\'s inner life.' },

  { section:'reading', number:2, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'When Elena "ran her fingers over" the journal cover, this action most likely suggests she:',
    choices:JSON.stringify({F:'was searching for a hidden clasp to open it',G:'felt a sense of emotional connection with her grandmother',H:'was frustrated by the journal\'s deteriorated condition',J:'wanted to determine whether the journal had monetary value'}),
    answer:'G', topic:'Inference',
    explanation:'The slow, deliberate gesture conveys tenderness and connection rather than any practical purpose.' },

  { section:'reading', number:3, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'As used in the passage, the word "weathered" (describing the armchair) most nearly means:',
    choices:JSON.stringify({A:'damaged by rain and storms',B:'recently repaired and restored',C:'aged and worn through long use',D:'brightly faded from sun exposure'}),
    answer:'C', topic:'Vocabulary in Context',
    explanation:'In this context, "weathered" describes an armchair made soft and familiar through many years of use.' },

  { section:'reading', number:4, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'When Elena discovers the journal, her emotional state shifts from:',
    choices:JSON.stringify({F:'grief to anger at her grandmother',G:'numbness to something warmer and more complicated',H:'confusion to complete and immediate peace',J:'joy to unexpected sorrow'}),
    answer:'G', topic:'Inference',
    explanation:'The passage states "the numbness she had carried for three weeks...began to loosen, replaced by something warmer and more complicated."' },

  { section:'reading', number:5, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'The phrase "the house seemed to hold its breath" is best interpreted to mean:',
    choices:JSON.stringify({A:'the house needed better air circulation',B:'everything inside was still and expectant',C:'Elena believed the house was haunted',D:'all windows and doors were tightly sealed'}),
    answer:'B', topic:'Vocabulary in Context',
    explanation:'This personification suggests the house was quiet and almost waiting, mirroring Elena\'s suspended emotional state.' },

  { section:'reading', number:6, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'The grandmother\'s journal entries about "small victories" suggest she:',
    choices:JSON.stringify({F:'had participated in athletic competitions',G:'found deep meaning and joy in ordinary daily moments',H:'kept a detailed record of her financial achievements',J:'had strong opinions about Elena\'s career path'}),
    answer:'G', topic:'Inference',
    explanation:'Entries like "Made bread today. A small thing, but right" reveal she found genuine value in everyday acts.' },

  { section:'reading', number:7, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'The passage is narrated primarily from the point of view of:',
    choices:JSON.stringify({A:'the grandmother, through flashbacks in her journal',B:'an omniscient narrator who knows all characters\' thoughts',C:'Elena, through a close third-person perspective',D:'a neighbor observing Elena\'s return from outside'}),
    answer:'C', topic:'Author\'s Purpose',
    explanation:'The narration follows Elena\'s perceptions and emotional realizations throughout, though written in third person.' },

  { section:'reading', number:8, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'The final image of the cardinal most likely suggests:',
    choices:JSON.stringify({F:'Elena will sell the house immediately after her visit',G:'the grandmother\'s spirit literally remains in the garden',H:'life continues moving, and Elena has received what she came for',J:'the author disapproves of Elena\'s approach to grief'}),
    answer:'H', topic:'Inference',
    explanation:'The bird\'s brief pause and departure mirrors Elena\'s own moment of stillness before returning to life with new understanding.' },

  { section:'reading', number:9, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'The author\'s use of sensory details—lavender smell, creaking floorboards—primarily serves to:',
    choices:JSON.stringify({A:'establish the time period in which the story is set',B:'make the setting emotionally alive and tied to memory',C:'prove that Elena\'s memory of the house is distorted',D:'demonstrate the poor maintenance of the property'}),
    answer:'B', topic:'Author\'s Purpose',
    explanation:'The sensory details immerse the reader in Elena\'s experience and reinforce her deep emotional connection to the space.' },

  { section:'reading', number:10, passageTitle:'LITERARY NARRATIVE: "The Summer Journal"', passage:READ_P1,
    stem:'Which best describes Elena\'s relationship with her grandmother as portrayed in the passage?',
    choices:JSON.stringify({F:'Distant and formal, based purely on obligation',G:'Competitive and often strained',H:'Loving but marked by missed opportunities for deeper understanding',J:'Purely practical, focused on inheritance matters'}),
    answer:'H', topic:'Inference',
    explanation:'Elena realizes she had underestimated her grandmother\'s inner life—a combination of love and regret for what was never explored.' },

  // PASSAGE 2: Social Science (Q11–20)
  { section:'reading', number:11, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'The central argument of this passage is that:',
    choices:JSON.stringify({A:'traditional banks are fundamentally corrupt institutions',B:'small loans have helped many people escape poverty',C:'all foreign aid programs ultimately prove ineffective',D:'entrepreneurs primarily need access to large capital investments'}),
    answer:'B', topic:'Main Idea',
    explanation:'The passage argues throughout that microloans—despite their limitations—have helped many build economic independence.' },

  { section:'reading', number:12, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'According to the passage, the average size of a microloan is approximately:',
    choices:JSON.stringify({F:'$30',G:'$200',H:'$500',J:'$1,000'}),
    answer:'G', topic:'Detail',
    explanation:'The passage states "Average loan size was approximately $200."' },

  { section:'reading', number:13, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'As used in the passage, to "bootstrap" a business most nearly means to:',
    choices:JSON.stringify({A:'quickly fail and start over',B:'rely solely on online resources',C:'build something from very little through one\'s own effort',D:'receive a substantial government grant'}),
    answer:'C', topic:'Vocabulary in Context',
    explanation:'The passage uses the term in the context of poor entrepreneurs building enterprises from minimal resources.' },

  { section:'reading', number:14, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'The Grameen Bank is described in the passage as:',
    choices:JSON.stringify({F:'a government-run institution headquartered in India',G:'one of the world\'s first and most influential microfinance institutions',H:'an experiment in poverty reduction that ultimately failed',J:'a bank that exclusively serves wealthy entrepreneurs'}),
    answer:'G', topic:'Detail',
    explanation:'The passage describes it as "one of the world\'s first and most influential microfinance institutions."' },

  { section:'reading', number:15, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'According to the passage, critics of microfinance most frequently argue that:',
    choices:JSON.stringify({A:'loan amounts are too large for small businesses to manage',B:'high interest rates can trap borrowers in cycles of debt',C:'only men benefit meaningfully from microloan programs',D:'the system operates too slowly to help people in need'}),
    answer:'B', topic:'Detail',
    explanation:'The passage states rates "have been alarmingly high—sometimes exceeding 80 percent annually—effectively trapping the poor in cycles of debt."' },

  { section:'reading', number:16, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'As used in the passage, "financial inclusion" refers to:',
    choices:JSON.stringify({F:'requiring all banks to accept every loan applicant',G:'ensuring all people have access to useful and affordable financial services',H:'including financial literacy in school curricula',J:'international agreements between national banking systems'}),
    answer:'G', topic:'Vocabulary in Context',
    explanation:'The passage directly defines it as "ensuring that all people...have access to useful and affordable financial products and services."' },

  { section:'reading', number:17, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'The author\'s overall attitude toward microfinance is best described as:',
    choices:JSON.stringify({A:'harshly and uniformly critical',B:'cautiously optimistic',C:'unconditionally enthusiastic',D:'neutral and completely detached'}),
    answer:'B', topic:'Author\'s Purpose',
    explanation:'The author presents substantial evidence of success while honestly acknowledging limitations and criticisms.' },

  { section:'reading', number:18, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'Women borrowers are highlighted in the passage primarily because:',
    choices:JSON.stringify({F:'they represent the majority of the global unbanked population',G:'they repay loans at lower rates than men',H:'research shows they reinvest profits in their families at higher rates',J:'microfinance was originally designed exclusively for women'}),
    answer:'H', topic:'Detail',
    explanation:'The passage states women "are more likely than men to reinvest profits in their families—improving nutrition, education, and health outcomes."' },

  { section:'reading', number:19, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'According to the passage, which obstacle is described as "persistent" for microfinance?',
    choices:JSON.stringify({A:'Government regulations that limit loan amounts',B:'Insufficient demand from potential borrowers',C:'Reaching the most remote and isolated communities',D:'High default rates on outstanding loans'}),
    answer:'C', topic:'Detail',
    explanation:'The passage states "reaching the most remote, isolated communities remains a persistent obstacle for the industry."' },

  { section:'reading', number:20, passageTitle:'SOCIAL SCIENCE: "Microfinance and Poverty Reduction"', passage:READ_P2,
    stem:'The second paragraph of the passage primarily serves to:',
    choices:JSON.stringify({F:'introduce the essay\'s central argument',G:'provide historical background on microfinance\'s origins',H:'describe a specific case study of a successful borrower',J:'argue against traditional banking practices'}),
    answer:'G', topic:'Author\'s Purpose',
    explanation:'The second paragraph traces microfinance\'s history from Yunus in the 1970s to the founding of Grameen Bank in 1983.' },

  // PASSAGE 3: Humanities (Q21–30)
  { section:'reading', number:21, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'According to the passage, the Bauhaus school was founded in:',
    choices:JSON.stringify({A:'Berlin, Germany',B:'Munich, Germany',C:'Weimar, Germany',D:'Dessau, Germany'}),
    answer:'C', topic:'Detail',
    explanation:'The passage states Gropius opened the school "in the German city of Weimar."' },

  { section:'reading', number:22, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'As described in the passage, the principle "form follows function" means that:',
    choices:JSON.stringify({F:'beautiful objects always cost more to produce',G:'decoration should be added to objects after construction',H:'design should first and foremost serve its practical purpose',J:'all mass-produced objects look identical'}),
    answer:'H', topic:'Vocabulary in Context',
    explanation:'The passage defines it as the idea that good design "was the expression of an object\'s essential purpose."' },

  { section:'reading', number:23, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'According to the passage, Walter Gropius is best described as:',
    choices:JSON.stringify({A:'a rival who competed against the Bauhaus',B:'the architect who founded the Bauhaus',C:'a student who later became the school\'s director',D:'a furniture designer who applied Bauhaus principles commercially'}),
    answer:'B', topic:'Detail',
    explanation:'The passage states "architect Walter Gropius opened a school unlike any that had existed before."' },

  { section:'reading', number:24, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'In what year, according to the passage, was the Bauhaus forced to close permanently?',
    choices:JSON.stringify({F:'1919',G:'1925',H:'1932',J:'1933'}),
    answer:'J', topic:'Detail',
    explanation:'The passage states "In 1933, the Nazi government...forced it to close permanently."' },

  { section:'reading', number:25, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'The passage argues the Bauhaus influenced modern design primarily by:',
    choices:JSON.stringify({A:'focusing exclusively on painting and abstract sculpture',B:'teaching only traditional handcraft techniques',C:'merging fine arts with industrial production for everyday objects',D:'rejecting modern industrial materials in favor of natural ones'}),
    answer:'C', topic:'Main Idea',
    explanation:'The passage emphasizes the Bauhaus synthesis of art and industry, producing objects "meant not for gallery walls but for everyday use."' },

  { section:'reading', number:26, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'As used in the passage, "aesthetic" most nearly means:',
    choices:JSON.stringify({F:'relating to medical anesthesia',G:'relating to practical function',H:'relating to visual beauty and artistic design',J:'relating to financial or commercial value'}),
    answer:'H', topic:'Vocabulary in Context',
    explanation:'"The Bauhaus aesthetic emphasized clean lines, geometric forms"—the word refers to the visual and artistic character of the school\'s work.' },

  { section:'reading', number:27, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'Which artists are named in the passage as Bauhaus faculty members?',
    choices:JSON.stringify({A:'Picasso and Monet',B:'Paul Klee and Wassily Kandinsky',C:'Only German-born artists',D:'Primarily architects rather than fine artists'}),
    answer:'B', topic:'Detail',
    explanation:'The passage names "the painter Paul Klee and the abstract artist Wassily Kandinsky" as faculty.' },

  { section:'reading', number:28, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'Based on the passage, which modern product best reflects Bauhaus principles?',
    choices:JSON.stringify({F:'A heavily ornamented Victorian chair with carved wood details',G:'A sleek, minimalist chair that prioritizes comfort and clean lines',H:'A traditionally decorated ceramic vase',J:'A detailed, figurative oil painting'}),
    answer:'G', topic:'Inference',
    explanation:'Bauhaus emphasized "clean lines, geometric forms" and stripping away ornament—a minimalist functional chair embodies this.' },

  { section:'reading', number:29, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'According to the passage, why did the Nazis close the Bauhaus?',
    choices:JSON.stringify({A:'They objected to the school\'s high operating costs',B:'They viewed it as promoting communist and degenerate ideas',C:'They believed all of its faculty had already left Germany',D:'They wanted to relocate the school to Berlin under state control'}),
    answer:'B', topic:'Detail',
    explanation:'The passage states the Nazis "viewed the school as a hotbed of communist and degenerate ideas."' },

  { section:'reading', number:30, passageTitle:'HUMANITIES: "Bauhaus: Where Art Met Industry"', passage:READ_P3,
    stem:'The primary purpose of this passage is to:',
    choices:JSON.stringify({F:'argue that modern design has declined since the Bauhaus era',G:'explain the origins, principles, and lasting influence of the Bauhaus',H:'compare Bauhaus to the French Impressionist movement',J:'criticize the Nazi government\'s suppression of artistic freedom'}),
    answer:'G', topic:'Main Idea',
    explanation:'The passage traces the school\'s founding, philosophy, faculty, and global legacy—a comprehensive account of its origins and influence.' },

  // PASSAGE 4: Natural Science (Q31–40)
  { section:'reading', number:31, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'According to the passage, bioluminescence is defined as:',
    choices:JSON.stringify({A:'light reflected off fish scales in dark water',B:'light produced through chemical reactions in living organisms',C:'fluorescence triggered by ultraviolet light',D:'electrical signals passing through an organism\'s nerve cells'}),
    answer:'B', topic:'Detail',
    explanation:'The passage defines it as "the production of light through chemical reactions occurring within a living organism."' },

  { section:'reading', number:32, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'According to the passage, luciferin is:',
    choices:JSON.stringify({F:'a species of deep-sea fish found at extreme depths',G:'the light-producing molecule in bioluminescent organisms',H:'a protein that inhibits the production of bioluminescent light',J:'a Latin word meaning "darkness"'}),
    answer:'G', topic:'Detail',
    explanation:'The passage states luciferin is "a light-producing molecule...which reacts with oxygen in the presence of an enzyme called luciferase."' },

  { section:'reading', number:33, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'According to the passage, approximately what percentage of deep-sea organisms produce light?',
    choices:JSON.stringify({A:'25%',B:'50%',C:'76%',D:'95%'}),
    answer:'C', topic:'Detail',
    explanation:'The passage states "approximately 76 percent of deep-sea organisms produce light of some kind."' },

  { section:'reading', number:34, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'According to the passage, bioluminescent organisms use their light for which purposes?',
    choices:JSON.stringify({F:'Hunting only',G:'Defense only',H:'Hunting, defense, and communication',J:'Navigation and temperature regulation'}),
    answer:'H', topic:'Detail',
    explanation:'The passage describes hunting (anglerfish lure), defense (luminous clouds), and mating communication (firefly squid).' },

  { section:'reading', number:35, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'According to the passage, how does the anglerfish use bioluminescence?',
    choices:JSON.stringify({A:'It dangles a glowing lure above its mouth to attract prey',B:'It blinds predators with sudden bright flashes',C:'It signals to potential mates using timed light pulses',D:'It camouflages itself against the ocean floor'}),
    answer:'A', topic:'Detail',
    explanation:'The passage states the anglerfish "dangles a bioluminescent lure above its enormous mouth to attract prey."' },

  { section:'reading', number:36, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'According to the passage, the name "luciferin" derives from Latin words meaning:',
    choices:JSON.stringify({F:'"deep water"',G:'"light-bearer"',H:'"cold fire"',J:'"invisible glow"'}),
    answer:'G', topic:'Detail',
    explanation:'The passage states the name derives from "the Latin \'lucifer,\' meaning \'light-bearer.\'"' },

  { section:'reading', number:37, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'Which of the following is NOT mentioned in the passage as a function of bioluminescence?',
    choices:JSON.stringify({A:'Attracting prey',B:'Confusing predators',C:'Regulating body temperature',D:'Attracting mates'}),
    answer:'C', topic:'Detail',
    explanation:'The passage mentions hunting, defense, and mating—but never mentions temperature regulation.' },

  { section:'reading', number:38, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'The author\'s main purpose in writing this passage is to:',
    choices:JSON.stringify({F:'argue that deep-sea research deserves more government funding',G:'describe the evolutionary history of all marine life',H:'explain what bioluminescence is, how it works, and why organisms use it',J:'compare deep-sea bioluminescent organisms to land-based fireflies'}),
    answer:'H', topic:'Main Idea',
    explanation:'The passage introduces bioluminescence, explains its chemistry, quantifies its prevalence, and describes its biological functions.' },

  { section:'reading', number:39, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'As used in the passage, "chemiluminescence" refers to:',
    choices:JSON.stringify({A:'light produced by electrical discharge in water',B:'light emitted through chemical reactions without generating significant heat',C:'light reflected from chemical compounds on the ocean floor',D:'radiation produced during nuclear reactions in cells'}),
    answer:'B', topic:'Vocabulary in Context',
    explanation:'The passage calls bioluminescent light "cold light...what physicists call \'cold light,\' or chemiluminescence"—specifically noting the absence of heat.' },

  { section:'reading', number:40, passageTitle:'NATURAL SCIENCE: "Light in the Deep: Bioluminescence"', passage:READ_P4,
    stem:'According to the passage, bioluminescence is especially common in which environment?',
    choices:JSON.stringify({F:'Shallow coastal coral reefs',G:'River mouths and freshwater estuaries',H:'The deep ocean below roughly 200 meters',J:'Arctic ocean regions near the polar ice caps'}),
    answer:'H', topic:'Detail',
    explanation:'The passage states bioluminescence is "astonishingly common" in "the deep ocean, below roughly 200 meters."' },
]

// ─── SEED ─────────────────────────────────────────────────────────────────────

async function main() {
  await prisma.practiceTest.deleteMany({ where: { form: 'FORM-B' } })
  const test = await prisma.practiceTest.create({
    data: {
      title: 'ACT Practice Test · Form B',
      form: 'FORM-B',
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
  const e = QUESTIONS.filter(q => q.section === 'english').length
  const m = QUESTIONS.filter(q => q.section === 'math').length
  const r = QUESTIONS.filter(q => q.section === 'reading').length
  console.log(`✓ Seeded ${test.title}`)
  console.log(`  English: ${e} | Math: ${m} | Reading: ${r} | Total: ${QUESTIONS.length}`)
}

main().catch(console.error).finally(() => pool.end())
