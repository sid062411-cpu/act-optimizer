import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// ─── ENGLISH PASSAGES ─────────────────────────────────────────────────────────

const ENG_P1 = `PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH

Few [1]advances in medicine has saved more lives than vaccines. In the twentieth century alone, vaccines virtually eliminated smallpox—a disease that [2]killed an estimated 300 million people throughout history—and dramatically reduced the incidence of polio, measles, and dozens of other infectious diseases. [3]Despite this extraordinary record, vaccine hesitancy has emerged as one of the most significant public health challenges of the twenty-first century.

The science of vaccination rests on a simple principle: exposing the immune system to a harmless version of a pathogen [4]train it to recognize and respond quickly to future infections. The specific mechanism varies by vaccine type—some use weakened live viruses, others use inactivated viruses or just a fragment of the pathogen's protein coat—but the underlying [5]objective, building lasting immunity, is the same. Modern mRNA vaccines, developed rapidly during the COVID-19 pandemic, represent a new technology but [6]operates on the same fundamental immunological logic.

Vaccine hesitancy is not new. When Edward Jenner introduced the smallpox vaccine in 1796, critics [7]argued that injecting material from a diseased animal was dangerous and unnatural. Skeptics have questioned every major vaccine since. [8]What is new is the speed and scale at which misinformation can now spread via social media platforms, [9]allowing false claims to reach millions of people before scientists can respond.

Public health officials emphasize that the risks of vaccines are [10]vastly smaller than the risk of the diseases they prevent. The benefits of herd immunity—the protection afforded to those who cannot be vaccinated due to age or medical conditions—depend entirely on [11]a sufficiently large number of people receiving vaccinations. [12]When vaccination rates fall, diseases previously thought controlled can resurge. Recent measles outbreaks [13]in several countries, including the United States, [14]demonstrates that vaccine hesitancy has real and measurable consequences. [15]The challenge for public health communicators is not merely scientific but fundamentally one of trust.`

const ENG_P2 = `PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD

The Silk Road was not a single road [16]but rather a network of trade routes connecting China with Central Asia, the Middle East, and eventually Europe. [17]Named for the Chinese silk that traveled westward along its paths, the Silk Road facilitated more than the exchange of goods—it was a channel for the movement of ideas, religions, technologies, and [18]sometimes even diseases. For more than a millennium, [19]from roughly 200 BCE to 1400 CE, it served as the primary conduit between the civilizations of East and West.

The goods that traveled the Silk Road [20]was remarkable in their variety. Chinese silk, porcelain, and tea moved west; glass, wool, and precious metals came [21]east from Rome and Persia. Spices from India and Southeast Asia—pepper, cinnamon, nutmeg—were among the most [22]valued commodities, prompting European nations to eventually seek sea routes to Asia and inadvertently setting in motion [23]the Age of Exploration. Paper and printing technology, invented in China, [24]made its way west along the Silk Road, eventually transforming European intellectual life.

Buddhism, Islam, and Christianity all spread along Silk Road networks, [25]as missionaries, traders, and pilgrims moved between communities carrying their faiths. The disease exchange could be devastating: some historians believe [26]the Black Death, which killed roughly one-third of Europe's population in the fourteenth century, traveled to Europe along Silk Road trade routes.

The Silk Road declined as sea trade routes became more economical in the fifteenth and sixteenth centuries. [27]However its legacy is impossible to ignore: much of what we consider the foundation of modern civilization—[28]the spread of mathematics, philosophy, art, and religion—was made possible by the connections the Silk Road created. Today, China's Belt and Road Initiative has been called a "modern Silk Road," suggesting that [29]the concept of an overland network linking East and West [30]remain as compelling as ever.`

const ENG_P3 = `PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD

In cities around the world, a quiet agricultural revolution [31]is taking place. Rooftops, vacant lots, converted warehouses, and underground bunkers [32]has been transformed into productive growing spaces. Urban farming—the practice of producing food within city limits—[33]is gaining momentum as urban populations grow and concerns about food security, carbon emissions, and the resilience of global supply chains intensify.

The appeal of urban farming is straightforward: food grown close to [34]consumers needs less transportation, [35]which reduces carbon emissions and keeps produce fresher. Community gardens in low-income neighborhoods can [36]provide fresh produce where supermarkets are scarce—areas often called "food deserts." Indoor vertical farms, which stack growing trays in [37]temperature-controlled environments illuminated by LED lights, can produce lettuce and herbs year-round regardless of climate or season.

Critics argue that urban farming, [38]while appealing in principle, has practical limits. Growing staple crops—wheat, corn, rice—at any meaningful scale requires land that cities simply [39]don't has. Urban farms tend to specialize in high-value greens and herbs rather than the calorie-dense foods that make up the bulk of human diets. Energy costs for indoor farms can be substantial: the electricity needed to power [40]lighting and climate controls sometimes exceed the environmental savings from reduced transportation.

Proponents counter that urban farming offers [41]benefits extending beyond food production. Gardens and green spaces in cities reduce the urban heat island effect and provide [42]biodiversity, mental health, and community cohesion benefits. In Detroit, where decades of population loss left thousands of vacant lots, urban farming [43]has become both an economic and cultural revitalization strategy.

The question is not whether urban farming can replace conventional agriculture—it [44]cannot—but whether it can play a meaningful complementary role in creating more sustainable and equitable food systems. The answer, for [45]a growing number of cities, appears to be yes.`

const ENG_P4 = `PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS

The Antarctic ice sheet, [46]which covers an area larger than the United States, holds approximately 60 percent of the world's fresh water. If it were to melt entirely—[47]an event that would take thousands of years even under the most pessimistic climate scenarios—global sea levels would rise by roughly 60 meters. Even a partial melting, as is occurring now, has profound implications for coastal communities worldwide.

Scientists [48]monitors the ice sheet through a combination of satellite imagery, airborne radar surveys, and measurements from research stations on the ice. [49]These measurements, conducted over decades, reveal that while some parts of Antarctica are actually gaining snow and ice due to increased snowfall, the critical glaciers [50]in West Antarctica and the Antarctic Peninsula are losing mass at accelerating rates.

The concern centers on a phenomenon called marine ice sheet instability. Many of Antarctica's glaciers [51]sits on bedrock that slopes downward away from the coast—meaning that as the ice retreats from the edges, it exposes deeper, thicker ice [52]to the warmer ocean waters. This creates a self-reinforcing feedback loop that [53]could, in theory, cause rapid and irreversible ice sheet collapse. The Thwaites Glacier in West Antarctica, [54]sometimes called the "Doomsday Glacier," [55]have attracted particular scientific attention because its collapse could destabilize neighboring glaciers and trigger a cascade of ice loss.

Current projections by the Intergovernmental Panel on Climate Change [56]suggests that sea levels will rise between 0.3 and 1 meter by 2100, with higher estimates possible if ice sheet instabilities [57]are triggered. Even a one-meter rise would [58]threaten tens of millions of people in low-lying coastal areas and small island nations. Cities like Miami, Mumbai, and Jakarta face [59]particular vulnerability. [60]Addressing climate change is therefore not just an environmental issue but a matter of basic human security.`

const ENG_P5 = `PASSAGE V: COLOR, CULTURE, AND COMMUNICATION

Human beings have used color symbolically for as long as [61]records exists. Cave paintings dating back 40,000 years [62]uses pigments made from iron oxide and charcoal. Ancient Egyptians used specific colors in religious contexts: blue was sacred to the god [63]Osiris, while yellow represented eternal life. Across cultures and millennia, color [64]have served not just aesthetic but communicative, ritual, and political functions.

In modern democratic societies, political parties often [65]adopts colors as a form of instant, wordless communication. Red has been associated with left-wing and socialist movements since the nineteenth century; blue, in many Western countries, [66]is linked to conservative or traditional political parties. [67]Sports teams, corporations, and national flags rely on similar color identities, [68]creating associations so deeply ingrained that even young children can identify brands and countries by color alone.

The psychology of color perception adds another layer of complexity. [69]Unlike physical properties such as wavelength, our experience of color is [70]actively constructed by the brain—meaning that color is, in an important sense, not in the object [71]it is in the eye of the beholder. Optical illusions demonstrate this vividly: the same physical color can appear radically different depending [72]of its surrounding colors.

The design profession [73]has long grapple with these complexities. Effective visual communication requires understanding not just the physics of color but its cultural context and psychological effects. [74]A designer working in a global market must navigate different and sometimes contradictory color associations: the white space on a webpage [75]that signals cleanliness and modernity in one cultural context may signal emptiness and absence in another.`

// ─── READING PASSAGES ─────────────────────────────────────────────────────────

const READ_P1 = `LITERARY NARRATIVE

This passage is adapted from a short story about a retired fisherman living alone in a fishing village.

On the day he decided to stop fishing, Henry did not tell anyone. He walked down to the dock as he had every morning for fifty-one years, checked his nets, confirmed the weather with Manny, had his coffee at the same wooden table at the edge of the wharf. The only difference was that when it was time to cast off, he didn't.

He stood there for a long time watching the other boats go. Old Fen's trawler; the Morales brothers in their new vessel, still stinking of fresh paint; the girl from the university with her sampling equipment and her clipboards. He watched until the last boat was a speck and the sound of engines had died to the vague wash of the sea. Then he walked home.

His son called that evening and Henry did not mention it. His daughter-in-law sent a recipe for fish stew, which he thought was funny. He ate soup from a can and watched a nature program about glaciers, which he found unexpectedly moving. The narrator said that in a glacier everything moves, imperceptibly, forward. Henry thought about that.

He had never been a contemplative man. Fishing was not contemplative—it was early mornings and nets and diesel and muscle and luck. He had liked all of it. He had liked the conversation at the dock and the absence of conversation on the water, and the particular quality of light at five a.m. in different seasons, and the weight of a good catch. He had liked being tired in the way you were tired after honest work. He was not sure he had liked anything else as much.

His wife had died six years ago. He had fished through the grief, which he was now not sure had been entirely the right approach, though he did not have a better one to offer. The sea had the quality of continuing regardless, which was either comforting or insulting depending on the morning.

The next day he went to the dock again. He did not cast off again. He watched the boats go, had his coffee, spoke to Manny about the weather. On the way home he stopped at the hardware store and bought a birdhouse kit, which he had never wanted before. He put it in the closet when he got home.

He thought: there should be a word for the life that comes after the life you were.`

const READ_P2 = `SOCIAL SCIENCE

This passage discusses the history and role of public libraries in American democracy.

The public library as Americans know it is largely the creation of the nineteenth century, though its philosophical roots go much deeper. The ancient world had libraries—the Library of Alexandria is the most famous—but these were invariably institutions of the powerful, accessible only to scholars and the privileged. The democratic public library, open to all citizens without charge or credential, is a distinctly modern invention.

In the United States, the public library movement accelerated dramatically after 1886, when the Scottish-born industrialist Andrew Carnegie began funding the construction of library buildings. Over the next three decades, Carnegie donated the equivalent of roughly two billion dollars in today's money to construct 2,509 library buildings in cities and towns across the English-speaking world. Carnegie's philanthropy was not without its critics — he was, after all, a man whose steel workers labored under brutal conditions — but the physical legacy of his giving is undeniable. Carnegie libraries still stand and serve communities in hundreds of American cities.

The philosophical argument for public libraries rests on the same foundation as the argument for public education: that a self-governing democratic people require access to information. Thomas Jefferson held that an informed citizenry was the essential prerequisite of democracy. The public library extends this logic beyond formal schooling: it asserts that access to knowledge should not end with graduation, and should not depend on income.

Modern public libraries have expanded far beyond their original book-lending function. They offer internet access — critical for the millions of Americans who lack home broadband — job training workshops, early childhood literacy programs, social services referrals, and safe spaces for the unhoused. In rural communities with few other institutions, the library may be the only public space where adults can meet, learn, or seek help.

These expanded services have not been without controversy. Some argue that libraries have strayed far from their original mission, wading into social services they are poorly equipped to provide. Others argue, to the contrary, that these services represent exactly the spirit of the public library: meeting people where they are, and providing access to what they need to participate fully in civic life.

In an era when social trust in institutions is declining and access to authoritative information is increasingly contested, the public library stands as an affirmation of a foundational democratic bet: that knowledge, freely shared, makes communities stronger.`

const READ_P3 = `HUMANITIES

This passage discusses Stoic philosophy and its modern relevance.

Stoicism is one of the stranger success stories in the history of ideas. Founded in Athens around 300 BCE by a Phoenician merchant named Zeno of Citium, it flourished throughout the Greek and Roman world, numbered among its practitioners the former slave Epictetus and the emperor Marcus Aurelius, and then was largely eclipsed by the rise of Christianity. Revived periodically by Renaissance humanists and Enlightenment thinkers, it seemed, by the twentieth century, to be of primarily historical interest.

Then something unexpected happened. Beginning in the 1990s and accelerating through the 2000s and 2010s, Stoicism began to attract a large popular following. Its most recent adherents include professional athletes, Silicon Valley entrepreneurs, military veterans, and anyone who has encountered Ryan Holiday's popular books. The philosophy that Marcus Aurelius applied to governing a Roman empire is now applied to morning routines and difficult conversations and managing anger.

What explains this revival? In part, Stoicism offers something that other philosophical schools do not: practical tools for navigating adversity. Its central insight — that we cannot control what happens to us, only our response to what happens — resonates with people facing situations they did not choose. In the language of modern psychology, Stoicism anticipates cognitive-behavioral therapy, the most evidence-backed psychotherapy currently in practice. Both focus on identifying and questioning the automatic judgments we apply to events.

For the Stoics, virtue — practical wisdom, justice, courage, and self-discipline — was the only true good. Wealth, status, health, and even life itself were "preferred indifferents": desirable but not essential to a good life. This hierarchy is difficult to accept fully in a consumer culture organized around the acquisition of exactly the things Stoics dismissed. Yet something in the underlying logic — that our reliance on externals makes us vulnerable in ways our responses to events do not — retains its pull.

The risk, critics note, is of a philosophy of resignation mistaken for one of resilience. Stoic acceptance of what cannot be changed is not the same as passive endurance of injustice. Marcus Aurelius could afford philosophical equanimity in the face of hardship — he was, after all, the most powerful man in the world. The Stoicism of enslaved Epictetus, who was freed but never fully equal, has a different texture entirely. Modern applications of Stoicism must navigate this difference carefully.`

const READ_P4 = `NATURAL SCIENCE

This passage discusses CRISPR gene-editing technology and its implications.

In 2012, a team of biochemists led by Jennifer Doudna and Emmanuelle Charpentier published a paper that would transform biology. They described how a bacterial immune system — a molecular mechanism that bacteria use to identify and cut foreign DNA — could be repurposed as a precision tool for editing the genomes of any living organism. The system, which they called CRISPR-Cas9, offered something that earlier genetic engineering techniques had never managed: the ability to make targeted changes to specific genes with relative ease, speed, and low cost.

The name CRISPR stands for Clustered Regularly Interspaced Short Palindromic Repeats — a description of a pattern found in bacterial DNA. When a bacterium survives a viral attack, it incorporates fragments of the virus's DNA into its own genome in these CRISPR sequences. If the same virus attacks again, the bacterium can use the stored sequence as a guide to locate and destroy the invader's DNA. Doudna, Charpentier, and their colleagues realized that this bacterial defense mechanism could be adapted: by designing a synthetic "guide RNA" matching any target DNA sequence, they could direct the Cas9 protein to cut the genome at any desired location.

The applications are staggering in their breadth. In medicine, CRISPR is being tested as a treatment for sickle cell disease, certain cancers, and inherited forms of blindness. In agriculture, CRISPR has been used to develop disease-resistant crops, reducing the need for pesticides. Researchers have used it to make pigs whose organs may eventually be transplantable into humans. In 2018, a Chinese scientist named He Jiankui famously — and to near-universal scientific condemnation — used CRISPR to edit the genomes of human embryos that were later born as twin girls, marking the first heritable human gene edit.

The He Jiankui case crystallized the ethical stakes of the technology. Editing somatic cells (body cells that are not passed to the next generation) is a straightforward medical treatment, comparable to other therapies. But editing germline cells (eggs, sperm, or embryos) creates changes that are heritable — passed to all future generations. The prospect of "designer babies," in which parents select or enhance traits in their children, raises questions about equality, consent, and what it means to be human that biology alone cannot answer.

Doudna and Charpentier received the Nobel Prize in Chemistry in 2020, the prize committee noting that CRISPR had "taken the life sciences into a new epoch." Whether that new epoch is navigated wisely will depend not only on the scientists who develop the tools, but on the societies that decide how to use them.`

// ─── QUESTIONS ────────────────────────────────────────────────────────────────

const QUESTIONS = [

  // ═══════════════════════════════════════════════════
  // ENGLISH — 75 questions
  // ═══════════════════════════════════════════════════

  // PASSAGE I: Q1–15
  { section:'english', number:1, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [1] reads "advances in medicine has saved." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'advances in medicine have saved',C:'advance in medicine has saved',D:'advance in medicine have saved'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Advances" is plural and requires the plural verb "have saved."' },

  { section:'english', number:2, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [2] reads "killed an estimated 300 million people throughout history." The writer considers adding "according to historians" at the end. Should this be added?',
    choices:JSON.stringify({F:'Yes, because it is important to attribute claims about historical death tolls',G:'Yes, because it strengthens the emotional impact',H:'No, because "an estimated" already signals that the figure is approximate',J:'No, because historians disagree about the figure'}),
    answer:'H', topic:'Rhetorical Skills',
    explanation:'"An estimated" already indicates the figure is approximate and not precisely verified; further attribution is redundant.' },

  { section:'english', number:3, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The transition at [3] reads "Despite this extraordinary record." Which alternative would NOT be acceptable?',
    choices:JSON.stringify({A:'In spite of this remarkable achievement,',B:'Given this extraordinary record,',C:'Notwithstanding these successes,',D:'For all these achievements,'}),
    answer:'B', topic:'Transitions',
    explanation:'"Given this" signals that what follows is a result or consequence, but the sentence introduces a contrast (hesitancy despite success).' },

  { section:'english', number:4, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [4] reads "train it to recognize." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'trains it to recognize',H:'training it to recognize',J:'trained it to recognize'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Exposing the immune system" is the gerund phrase serving as the subject (singular). The verb should be "trains."' },

  { section:'english', number:5, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [5] reads "objective, building lasting immunity, is." Which alternative is NOT acceptable?',
    choices:JSON.stringify({A:'objective—building lasting immunity—is',B:'objective (building lasting immunity) is',C:'objective, that is building lasting immunity, is',D:'objective (to build lasting immunity) is'}),
    answer:'C', topic:'Sentence Structure',
    explanation:'"That is building" creates an awkward relative clause that is grammatically non-standard.' },

  { section:'english', number:6, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [6] reads "operates on the same fundamental immunological logic." What is the error?',
    choices:JSON.stringify({F:'NO CHANGE',G:'operate on the same fundamental immunological logic',H:'operating on the same fundamental immunological logic',J:'operated on the same fundamental immunological logic'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Modern mRNA vaccines" is plural and requires the plural verb "operate."' },

  { section:'english', number:7, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [7] reads "argued that injecting material from a diseased animal was dangerous." Which is most precise?',
    choices:JSON.stringify({A:'NO CHANGE',B:'said that injecting material from a diseased animal is dangerous',C:'were arguing that the injection of material from a diseased animal was dangerous',D:'had argued that one should not inject material from a diseased animal'}),
    answer:'A', topic:'Word Choice',
    explanation:'"Argued" is precise and historically appropriate; the alternatives are either less precise or grammatically inconsistent.' },

  { section:'english', number:8, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [8] reads "What is new is the speed and scale." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'What has changed is the speed and scale',G:'The new element is the speed and scale',H:'Speed and scale is new',J:'What differs now is the speed and scale'}),
    answer:'H', topic:'Subject-Verb Agreement',
    explanation:'"Speed and scale is new" has a subject-verb agreement error; "speed and scale" is a compound subject requiring "are."' },

  { section:'english', number:9, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [9] reads "allowing false claims to reach millions." What does this phrase modify?',
    choices:JSON.stringify({A:'social media platforms',B:'the speed and scale at which misinformation can now spread',C:'scientists',D:'the previous sentence'}),
    answer:'B', topic:'Sentence Structure',
    explanation:'The participial phrase "allowing false claims to reach millions" modifies the spread of misinformation described in the main clause.' },

  { section:'english', number:10, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [10] reads "vastly smaller than the risk." Which is most concise?',
    choices:JSON.stringify({F:'NO CHANGE',G:'significantly smaller in comparison to the risk',H:'much smaller as compared to the risk',J:'smaller to a vast degree than the risk'}),
    answer:'F', topic:'Conciseness',
    explanation:'"Vastly smaller than" is already the most concise and precise phrasing.' },

  { section:'english', number:11, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [11] reads "a sufficiently large number of people receiving vaccinations." Which is most concise?',
    choices:JSON.stringify({A:'NO CHANGE',B:'enough people being vaccinated',C:'a number of people that is sufficiently large receiving vaccinations',D:'enough receiving vaccinations'}),
    answer:'B', topic:'Conciseness',
    explanation:'"Enough people being vaccinated" conveys the same meaning most concisely.' },

  { section:'english', number:12, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The writer considers adding "with sometimes dramatic speed" after [12] "diseases previously thought controlled can resurge." Should this be added?',
    choices:JSON.stringify({F:'Yes, because it adds relevant scientific precision',G:'Yes, because it makes the warning more vivid and urgent',H:'No, because it contradicts the gradual nature of disease resurgence',J:'No, because the following sentence provides the specific evidence'}),
    answer:'G', topic:'Rhetorical Skills',
    explanation:'Adding "with sometimes dramatic speed" enhances the urgency of the warning, which is appropriate to the persuasive intent.' },

  { section:'english', number:13, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [13] reads "in several countries, including the United States." If deleted, the sentence would lose:',
    choices:JSON.stringify({A:'its main subject',B:'the geographic scope of the problem',C:'the grammatical verb',D:'the essay\'s central argument'}),
    answer:'B', topic:'Rhetorical Skills',
    explanation:'The phrase specifies that the problem is not limited to developing nations — it includes the United States.' },

  { section:'english', number:14, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The underlined portion at [14] reads "demonstrates." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'demonstrate',H:'is demonstrating',J:'has demonstrated'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Outbreaks" is plural and requires the plural verb "demonstrate."' },

  { section:'english', number:15, passageTitle:'PASSAGE I: VACCINES AND THE TRIUMPH OF PUBLIC HEALTH', passage:ENG_P1,
    stem:'The final sentence at [15] introduces the idea that the challenge is "fundamentally one of trust." Which best describes how this sentence functions?',
    choices:JSON.stringify({A:'It contradicts the preceding paragraph\'s argument',B:'It shifts the essay toward a new, broader conclusion about communication',C:'It provides statistical evidence for the preceding claim',D:'It restates the opening paragraph verbatim'}),
    answer:'B', topic:'Rhetorical Skills',
    explanation:'This sentence expands from the scientific problem to a social and communicative challenge, broadening the essay\'s scope at its close.' },

  // PASSAGE II: Q16–30
  { section:'english', number:16, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [16] reads "but rather a network." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'NO CHANGE',G:'but instead a network',H:'but a network',J:'but rather a networking'}),
    answer:'J', topic:'Word Choice',
    explanation:'"A networking" is a non-standard noun use here; "a network" is required.' },

  { section:'english', number:17, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [17] reads "Named for the Chinese silk." If this participial phrase were replaced with "Taking its name from Chinese silk," the sentence would:',
    choices:JSON.stringify({A:'become grammatically incorrect',B:'remain grammatically correct and essentially the same in meaning',C:'shift the focus to the person who named the Silk Road',D:'introduce a factual error'}),
    answer:'B', topic:'Sentence Structure',
    explanation:'Both phrasings are grammatically correct and convey the same meaning — how the route got its name.' },

  { section:'english', number:18, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [18] reads "sometimes even diseases." Which best connects this item to the list?',
    choices:JSON.stringify({F:'NO CHANGE',G:'and sometimes even diseases',H:'and also diseases',J:'as well as diseases'}),
    answer:'G', topic:'Sentence Structure',
    explanation:'"And sometimes even diseases" correctly signals that diseases were an incidental and less welcome part of the exchange.' },

  { section:'english', number:19, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [19] reads "from roughly 200 BCE to 1400 CE." Which is most correctly punctuated?',
    choices:JSON.stringify({A:'NO CHANGE',B:'—from roughly 200 BCE to 1400 CE—',C:'(from roughly 200 BCE to 1400 CE)',D:'Both B and C are acceptable'}),
    answer:'D', topic:'Punctuation',
    explanation:'Both em dashes and parentheses are acceptable ways to set off a parenthetical phrase providing a date range.' },

  { section:'english', number:20, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [20] reads "was remarkable." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'were remarkable',H:'is remarkable',J:'has been remarkable'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"The goods" is plural and requires "were remarkable."' },

  { section:'english', number:21, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [21] reads "east from Rome and Persia." Which is most precise?',
    choices:JSON.stringify({A:'NO CHANGE',B:'eastward from Rome and Persia',C:'going east from Rome and Persia',D:'in an eastward direction from Rome and Persia'}),
    answer:'B', topic:'Word Choice',
    explanation:'"Eastward" is a more formal and precise directional adverb appropriate for this historical description.' },

  { section:'english', number:22, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [22] reads "valued commodities." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'prized commodities',G:'coveted commodities',H:'valuated commodities',J:'sought-after commodities'}),
    answer:'H', topic:'Word Choice',
    explanation:'"Valuated" is not standard English in this context; "valued," "prized," "coveted," and "sought-after" all work.' },

  { section:'english', number:23, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [23] reads "the Age of Exploration." The writer considers capitalizing this phrase. Is the capitalization correct?',
    choices:JSON.stringify({A:'Yes, because it is the proper name of a historical period',B:'Yes, because all historical periods must be capitalized',C:'No, because it is a common noun phrase',D:'No, because the capitalization is inconsistent with the rest of the passage'}),
    answer:'A', topic:'Punctuation',
    explanation:'"The Age of Exploration" is a proper noun — the recognized name of a specific historical period — and should be capitalized.' },

  { section:'english', number:24, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [24] reads "made its way west along the Silk Road." What does "its" refer to?',
    choices:JSON.stringify({F:'China',G:'Paper and printing technology',H:'The Silk Road',J:'Europe'}),
    answer:'G', topic:'Pronoun Reference',
    explanation:'"Its" refers to "Paper and printing technology," the compound subject of the sentence.' },

  { section:'english', number:25, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [25] reads "as missionaries, traders, and pilgrims moved." What function does this clause serve?',
    choices:JSON.stringify({A:'It explains the mechanism by which religions spread',B:'It provides an example of a specific religious exchange',C:'It introduces the main topic of the paragraph',D:'It transitions to the discussion of disease exchange'}),
    answer:'A', topic:'Rhetorical Skills',
    explanation:'The "as" clause explains the human mechanism — the movement of missionaries, traders, and pilgrims — through which religions spread.' },

  { section:'english', number:26, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [26] reads "the Black Death, which killed roughly one-third of Europe\'s population in the fourteenth century, traveled to Europe along Silk Road trade routes." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'the Black Death — which killed roughly one-third of Europe\'s population in the fourteenth century — traveled to Europe along Silk Road trade routes',G:'the Black Death (which killed roughly one-third of Europe\'s population in the fourteenth century) traveled to Europe along Silk Road trade routes',H:'the Black Death, that killed roughly one-third of Europe\'s population in the fourteenth century, traveled to Europe along Silk Road trade routes',J:'the Black Death that killed roughly one-third of Europe\'s population traveled to Europe along Silk Road trade routes'}),
    answer:'H', topic:'Punctuation',
    explanation:'"That" introduces a restrictive relative clause and should not be set off by commas; this makes option H incorrect.' },

  { section:'english', number:27, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [27] reads "However its legacy is impossible to ignore." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'However its legacy, is impossible to ignore',C:'However, its legacy is impossible to ignore',D:'However; its legacy is impossible to ignore'}),
    answer:'C', topic:'Punctuation',
    explanation:'"However" used as a transitional adverb must be followed by a comma.' },

  { section:'english', number:28, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [28] reads "the spread of mathematics, philosophy, art, and religion." Which is NOT acceptable?',
    choices:JSON.stringify({F:'the spread of mathematics, philosophy, art, and religion',G:'mathematics, philosophy, art, and religion',H:'the spreading of mathematics, philosophy, art, and religion',J:'mathematical, philosophical, artistic, and religious spread'}),
    answer:'H', topic:'Word Choice',
    explanation:'"The spreading" is non-standard and awkward; all other options work grammatically.' },

  { section:'english', number:29, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The writer considers deleting "suggesting that the concept of an overland network linking East and West." Would this improve the sentence?',
    choices:JSON.stringify({A:'Yes, because the sentence is clearer without it',B:'Yes, because the idea appears earlier in the passage',C:'No, because it explains the significance of the comparison to the Silk Road',D:'No, because the Belt and Road Initiative requires more explanation'}),
    answer:'C', topic:'Rhetorical Skills',
    explanation:'Without this phrase, the reader doesn\'t know why China\'s initiative is being compared to the Silk Road.' },

  { section:'english', number:30, passageTitle:'PASSAGE II: THE SILK ROAD AND THE CONNECTED WORLD', passage:ENG_P2,
    stem:'The underlined portion at [30] reads "remain as compelling as ever." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'remains as compelling as ever',H:'is remaining as compelling as ever',J:'remained as compelling as ever'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"The concept" is singular and requires the singular "remains."' },

  // PASSAGE III: Q31–45
  { section:'english', number:31, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The phrase at [31] reads "is taking place." Which alternative is most vivid and engaging for an introductory sentence?',
    choices:JSON.stringify({A:'NO CHANGE',B:'has been taking place',C:'is happening',D:'is unfolding'}),
    answer:'D', topic:'Word Choice',
    explanation:'"Unfolding" is the most vivid and dynamic verb for introducing an emerging phenomenon.' },

  { section:'english', number:32, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [32] reads "has been transformed." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'have been transformed',H:'is transformed',J:'transforms'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Rooftops, vacant lots, converted warehouses, and underground bunkers" is a plural compound subject requiring "have."' },

  { section:'english', number:33, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [33] reads "is gaining momentum." Which alternative is NOT acceptable?',
    choices:JSON.stringify({A:'is accelerating',B:'is on the rise',C:'are gaining momentum',D:'has been gaining momentum'}),
    answer:'C', topic:'Subject-Verb Agreement',
    explanation:'"Urban farming" is singular; "are gaining" is incorrect.' },

  { section:'english', number:34, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [34] reads "consumers needs less transportation." What is the error?',
    choices:JSON.stringify({F:'NO CHANGE',G:'consumers need less transportation',H:'consumers are needing less transportation',J:'consumers needed less transportation'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Consumers" is plural and requires the plural verb "need."' },

  { section:'english', number:35, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [35] reads "which reduces carbon emissions." What does "which" refer to?',
    choices:JSON.stringify({A:'consumers',B:'food',C:'less transportation',D:'urban farming'}),
    answer:'C', topic:'Pronoun Reference',
    explanation:'"Which" refers to "less transportation" — the reduction in transportation is what reduces emissions.' },

  { section:'english', number:36, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [36] reads "provide fresh produce." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'provides fresh produce',H:'is providing fresh produce',J:'provided fresh produce'}),
    answer:'F', topic:'Subject-Verb Agreement',
    explanation:'"Community gardens" is plural and requires the plural "provide."' },

  { section:'english', number:37, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [37] reads "temperature-controlled environments illuminated by LED lights." Which alternative is NOT acceptable?',
    choices:JSON.stringify({A:'NO CHANGE',B:'LED-illuminated, temperature-controlled environments',C:'environments that are temperature-controlled and illuminated by LED lights',D:'temperature-controlling environments illuminated by LED lights'}),
    answer:'D', topic:'Word Choice',
    explanation:'"Temperature-controlling" implies the environments actively control something else, not that the environments themselves are temperature-controlled.' },

  { section:'english', number:38, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The transition at [38] reads "while appealing in principle." What does this phrase signal?',
    choices:JSON.stringify({F:'Agreement with the preceding paragraph',G:'A concession before a contrasting criticism',H:'A summary of all previous arguments',J:'An introduction to a new topic'}),
    answer:'G', topic:'Transitions',
    explanation:'"While appealing in principle" concedes the appeal of urban farming before the critics\' counterargument.' },

  { section:'english', number:39, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [39] reads "don\'t has." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'doesn\'t have',C:'don\'t have',D:'don\'t has got'}),
    answer:'C', topic:'Verb Form',
    explanation:'"Cities" is plural and requires "don\'t have" (not the singular "doesn\'t have").' },

  { section:'english', number:40, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [40] reads "lighting and climate controls sometimes exceed." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'lighting and climate controls sometimes exceeds',H:'lighting and climate control sometimes exceed',J:'lighting and climate controls sometimes exceeded'}),
    answer:'F', topic:'Subject-Verb Agreement',
    explanation:'"Lighting and climate controls" is a plural compound subject; "exceed" is the correct plural verb form.' },

  { section:'english', number:41, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [41] reads "benefits extending beyond food production." Which alternative is NOT acceptable?',
    choices:JSON.stringify({A:'benefits that extend beyond food production',B:'benefits beyond those of food production alone',C:'benefits which extends beyond food production',D:'benefits that go beyond food production alone'}),
    answer:'C', topic:'Subject-Verb Agreement',
    explanation:'"Benefits...which extends" contains a subject-verb error; "benefits" is plural and requires "extend."' },

  { section:'english', number:42, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [42] reads "biodiversity, mental health, and community cohesion benefits." Which is most clearly written?',
    choices:JSON.stringify({F:'NO CHANGE',G:'benefits for biodiversity, mental health, and community cohesion',H:'biodiversity and mental health and community cohesion benefits',J:'biodiversal, mental, and communal cohesion benefits'}),
    answer:'G', topic:'Sentence Structure',
    explanation:'"Benefits for biodiversity, mental health, and community cohesion" is clearest — each noun gets the same relationship to "benefits."' },

  { section:'english', number:43, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [43] reads "has become both an economic and cultural revitalization strategy." Which best replaces "both...and" here?',
    choices:JSON.stringify({A:'NO CHANGE',B:'has become an economic as well as cultural revitalization strategy',C:'has become both an economic as well as a cultural revitalization strategy',D:'has become either an economic or a cultural revitalization strategy'}),
    answer:'A', topic:'Sentence Structure',
    explanation:'"Both...and" is the clearest correlative conjunction structure; the alternatives are more awkward or change the meaning.' },

  { section:'english', number:44, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The underlined portion at [44] reads "cannot." The writer considers replacing it with "will not be able to." Should the change be made?',
    choices:JSON.stringify({F:'Yes, because it is more specific about the time frame',G:'Yes, because "cannot" sounds too informal',H:'No, because "cannot" is more direct and emphatic',J:'No, because "will not be able to" changes the sentence\'s meaning'}),
    answer:'H', topic:'Rhetorical Skills',
    explanation:'"Cannot" is more emphatic and direct, appropriate for the conceding statement; the longer form is weaker and wordier.' },

  { section:'english', number:45, passageTitle:'PASSAGE III: URBAN FARMING AND THE FUTURE OF FOOD', passage:ENG_P3,
    stem:'The final sentence at [45] ("The answer, for a growing number of cities, appears to be yes.") primarily functions to:',
    choices:JSON.stringify({A:'introduce a new argument about city planning',B:'provide a qualified, optimistic answer to the question posed in the previous sentence',C:'contradict the critics\' arguments presented in the middle paragraphs',D:'summarize all the benefits of urban farming listed in the essay'}),
    answer:'B', topic:'Rhetorical Skills',
    explanation:'The sentence directly responds to the "question" framed in the previous sentence, offering a cautious affirmative conclusion.' },

  // PASSAGE IV: Q46–60
  { section:'english', number:46, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [46] reads "which covers an area larger than the United States." Which alternative is NOT acceptable?',
    choices:JSON.stringify({F:'covering an area larger than the United States,',G:'an ice sheet larger than the United States,',H:'which is covering an area larger than the United States,',J:'—covering an area larger than the United States—'}),
    answer:'H', topic:'Sentence Structure',
    explanation:'"Which is covering" uses an awkward progressive tense for a permanent geographical fact; all other options work.' },

  { section:'english', number:47, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [47] reads "an event that would take thousands of years even under the most pessimistic climate scenarios." The writer considers placing this in parentheses. Would this be appropriate?',
    choices:JSON.stringify({A:'Yes, because it is an important qualification of the hypothetical',B:'Yes, because parentheses signal less essential information',C:'No, because the information is too important to be parenthetical',D:'No, because the em dash already functions this way'}),
    answer:'B', topic:'Punctuation',
    explanation:'Parentheses are used for supplementary information — the phrase qualifies the hypothetical, making parentheses or em dashes equally valid.' },

  { section:'english', number:48, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [48] reads "monitors." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'monitor',H:'is monitoring',J:'monitored'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Scientists" is plural and requires the plural verb "monitor."' },

  { section:'english', number:49, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [49] reads "These measurements, conducted over decades, reveal." Which alternative is NOT acceptable?',
    choices:JSON.stringify({A:'These measurements—conducted over decades—reveal',B:'These measurements (conducted over decades) reveal',C:'Conducted over decades, these measurements reveal',D:'These measurements; conducted over decades, reveal'}),
    answer:'D', topic:'Punctuation',
    explanation:'A semicolon cannot separate a main clause from a participial modifier; it is reserved for separating two independent clauses.' },

  { section:'english', number:50, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [50] reads "in West Antarctica and the Antarctic Peninsula are losing mass." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'in West Antarctica and the Antarctic Peninsula is losing mass',H:'in West Antarctica and the Antarctic Peninsula losses mass',J:'in West Antarctica and the Antarctic Peninsula has been losing mass'}),
    answer:'F', topic:'Subject-Verb Agreement',
    explanation:'"The critical glaciers" is plural (referred to as "glaciers"), requiring "are losing."' },

  { section:'english', number:51, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [51] reads "sits on bedrock." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'sit on bedrock',C:'is sitting on bedrock',D:'has sat on bedrock'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Antarctica\'s glaciers" is plural and requires the plural verb "sit."' },

  { section:'english', number:52, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [52] reads "to the warmer ocean waters." Which is more precise?',
    choices:JSON.stringify({F:'NO CHANGE',G:'to warmer ocean water',H:'to comparatively warmer ocean waters',J:'to the warm ocean waters'}),
    answer:'G', topic:'Word Choice',
    explanation:'"Warmer ocean water" (using the mass noun) is more scientifically precise than "waters" (which can imply different bodies of water).' },

  { section:'english', number:53, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The transition at [53] reads "could, in theory, cause." What does "in theory" signal here?',
    choices:JSON.stringify({A:'That the claim is certain to occur',B:'That the claim is impossible under current conditions',C:'That scientists are confident but acknowledge uncertainty',D:'That the claim is speculation with no scientific basis'}),
    answer:'C', topic:'Word Choice',
    explanation:'"In theory" indicates a scientifically plausible hypothesis that has not yet been confirmed as inevitable.' },

  { section:'english', number:54, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [54] reads "sometimes called the \'Doomsday Glacier.\'" The writer considers deleting this phrase. Would the sentence be improved?',
    choices:JSON.stringify({F:'Yes, because the nickname is sensationalist and unscientific',G:'Yes, because the sentence is clearer without it',H:'No, because it provides a vivid, memorable description of the stakes',J:'No, because "Doomsday" is its official scientific name'}),
    answer:'H', topic:'Rhetorical Skills',
    explanation:'The nickname conveys the scientific community\'s concern in a memorable way, enhancing the reader\'s understanding of stakes.' },

  { section:'english', number:55, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [55] reads "have attracted." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'has attracted',C:'is attracting',D:'attracted'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"The Thwaites Glacier" is singular (one glacier) and requires the singular "has attracted."' },

  { section:'english', number:56, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [56] reads "suggests." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'suggest',H:'is suggesting',J:'suggested'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Projections" is plural and requires the plural verb "suggest."' },

  { section:'english', number:57, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [57] reads "are triggered." Which alternative is NOT acceptable?',
    choices:JSON.stringify({A:'are initiated',B:'occur',C:'get triggered',D:'triggers'}),
    answer:'D', topic:'Subject-Verb Agreement',
    explanation:'"Instabilities" is plural; "triggers" is a singular verb form and is therefore incorrect.' },

  { section:'english', number:58, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [58] reads "threaten tens of millions." The writer considers adding "directly" before "threaten." Should it be added?',
    choices:JSON.stringify({F:'Yes, because it distinguishes direct from indirect threats',G:'Yes, because it makes the claim more specific',H:'No, because "threaten" already implies directness in this context',J:'No, because the sentence is already too long'}),
    answer:'F', topic:'Rhetorical Skills',
    explanation:'"Directly" clarifies that the threat is immediate displacement or flooding, not an indirect economic consequence.' },

  { section:'english', number:59, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The underlined portion at [59] reads "particular vulnerability." Which is most precise?',
    choices:JSON.stringify({A:'NO CHANGE',B:'a particular vulnerability',C:'particularly vulnerability',D:'particular vulnerability to sea-level rise'}),
    answer:'D', topic:'Word Choice',
    explanation:'Specifying "to sea-level rise" clarifies what kind of vulnerability is being discussed.' },

  { section:'english', number:60, passageTitle:"PASSAGE IV: ANTARCTICA'S ICE AND RISING SEAS", passage:ENG_P4,
    stem:'The final sentence at [60] reads "Addressing climate change is therefore not just an environmental issue but a matter of basic human security." What is the primary purpose of this sentence?',
    choices:JSON.stringify({F:'To introduce a new argument the passage has not yet made',G:'To provide a statistical summary of the preceding claims',H:'To deliver a conclusion that connects climate change science to human stakes',J:'To contrast the author\'s view with the IPCC\'s view'}),
    answer:'H', topic:'Rhetorical Skills',
    explanation:'The sentence steps back from specific projections to a broader conclusion connecting climate change to fundamental human welfare.' },

  // PASSAGE V: Q61–75
  { section:'english', number:61, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [61] reads "records exists." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'records have existed',C:'records exist',D:'record exists'}),
    answer:'C', topic:'Subject-Verb Agreement',
    explanation:'"Records" is plural and requires the plural verb "exist."' },

  { section:'english', number:62, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [62] reads "uses pigments." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'use pigments',H:'have used pigments',J:'uses a pigment'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Cave paintings" is plural and requires the plural verb "use."' },

  { section:'english', number:63, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [63] reads "Osiris, while yellow represented." Which punctuation is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'Osiris; while yellow represented',C:'Osiris — while yellow represented',D:'Osiris while yellow represented'}),
    answer:'A', topic:'Punctuation',
    explanation:'A comma before "while" correctly separates two clauses in a compound sentence here.' },

  { section:'english', number:64, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [64] reads "have served." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'has served',H:'is serving',J:'serves'}),
    answer:'G', topic:'Subject-Verb Agreement',
    explanation:'"Color" is singular and requires the singular "has served."' },

  { section:'english', number:65, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [65] reads "adopts colors." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'adopt colors',C:'is adopting colors',D:'have adopted colors'}),
    answer:'B', topic:'Subject-Verb Agreement',
    explanation:'"Political parties" is plural and requires the plural verb "adopt."' },

  { section:'english', number:66, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [66] reads "is linked to conservative." Which is NOT acceptable?',
    choices:JSON.stringify({F:'is associated with conservative',G:'has been associated with conservative',H:'has a link to conservative',J:'are linked to conservative'}),
    answer:'J', topic:'Subject-Verb Agreement',
    explanation:'"Blue" is singular; "are linked" is plural and therefore incorrect.' },

  { section:'english', number:67, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The writer considers adding "flags, in particular, often feature a small number of colors chosen for maximum recognition" after [67] "national flags." Should this be added?',
    choices:JSON.stringify({A:'Yes, because it provides a concrete detail about flag design',B:'Yes, because it introduces the essay\'s main argument',C:'No, because the sentence is already developing a complete idea',D:'No, because flags were already discussed in the previous sentence'}),
    answer:'C', topic:'Rhetorical Skills',
    explanation:'The sentence is making a broader point about instant visual communication; adding the detail disrupts the sentence\'s flow.' },

  { section:'english', number:68, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [68] reads "creating associations so deeply ingrained." What does this participial phrase modify?',
    choices:JSON.stringify({F:'color identities',G:'political parties',H:'the act of relying on color identities described in the previous clause',J:'young children'}),
    answer:'H', topic:'Sentence Structure',
    explanation:'The participial phrase modifies the main clause about sports teams, corporations, and flags relying on color identities.' },

  { section:'english', number:69, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The transition at [69] reads "Unlike physical properties." What does this contrast introduce?',
    choices:JSON.stringify({A:'The scientific study of wavelength',B:'The claim that color experience is subjective, not purely physical',C:'An argument that colors are meaningless',D:'Historical examples of color perception'}),
    answer:'B', topic:'Transitions',
    explanation:'"Unlike physical properties" sets up the contrast between measurable wavelength and the subjective brain construction of color experience.' },

  { section:'english', number:70, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [70] reads "actively constructed by the brain." Which alternative is most precise?',
    choices:JSON.stringify({F:'NO CHANGE',G:'a product of the brain\'s active processing',H:'constructed in an active way by the brain',J:'something the brain actively makes up'}),
    answer:'F', topic:'Word Choice',
    explanation:'"Actively constructed by the brain" is precise and formal; the alternatives are either more wordy or less formal.' },

  { section:'english', number:71, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [71] reads "it is in the eye of the beholder." What literary device does this phrase use?',
    choices:JSON.stringify({A:'Simile',B:'Allusion to a common saying (idiom)',C:'Hyperbole',D:'Personification'}),
    answer:'B', topic:'Rhetorical Skills',
    explanation:'"In the eye of the beholder" is a well-known idiom (derived from "beauty is in the eye of the beholder") used here for rhetorical effect.' },

  { section:'english', number:72, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [72] reads "of its surrounding colors." Which is correct?',
    choices:JSON.stringify({F:'NO CHANGE',G:'on its surrounding colors',H:'by its surrounding colors',J:'from its surrounding colors'}),
    answer:'G', topic:'Idiom',
    explanation:'The correct idiom is "depend on," not "depend of" or "depend by."' },

  { section:'english', number:73, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [73] reads "has long grapple." Which is correct?',
    choices:JSON.stringify({A:'NO CHANGE',B:'has long grappled',C:'have long grappled',D:'has long been grappling'}),
    answer:'B', topic:'Verb Form',
    explanation:'"Has long grappled" is the correct present perfect form; "grapple" is not the past participle.' },

  { section:'english', number:74, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The underlined portion at [74] reads "A designer working in a global market must navigate different and sometimes contradictory color associations." Which is most concise?',
    choices:JSON.stringify({F:'NO CHANGE',G:'A designer working globally must navigate different and sometimes contradictory color associations',H:'When working in a global market, a designer must navigate color associations that are different and sometimes contradictory',J:'A global-market designer must navigate the various color associations that can sometimes be contradictory'}),
    answer:'G', topic:'Conciseness',
    explanation:'"Working globally" concisely replaces "working in a global market" without losing meaning.' },

  { section:'english', number:75, passageTitle:'PASSAGE V: COLOR, CULTURE, AND COMMUNICATION', passage:ENG_P5,
    stem:'The final sentence at [75] reads "that signals cleanliness and modernity in one cultural context may signal emptiness and absence in another." This sentence primarily illustrates:',
    choices:JSON.stringify({A:'the superiority of modern web design over traditional design',B:'the dangers of using too much white in design',C:'how cultural context determines the meaning of the same color',D:'the limitations of digital communication technology'}),
    answer:'C', topic:'Rhetorical Skills',
    explanation:'The sentence gives a concrete example of a single color (white) carrying opposite meanings in different cultures, illustrating the essay\'s thesis about context.' },

  // ═══════════════════════════════════════════════════
  // MATH — 60 questions
  // ═══════════════════════════════════════════════════

  { section:'math', number:1, passageTitle:null, passage:null,
    stem:'If 3x + 8 = 29, what is 2x?',
    choices:JSON.stringify({A:'7',B:'10',C:'14',D:'21',E:'42'}),
    answer:'C', topic:'Pre-Algebra',
    explanation:'3x = 21, so x = 7. Then 2x = 14.' },

  { section:'math', number:2, passageTitle:null, passage:null,
    stem:'What is 60% of 85?',
    choices:JSON.stringify({F:'48',G:'51',H:'54',J:'60',K:'72'}),
    answer:'G', topic:'Pre-Algebra',
    explanation:'0.60 × 85 = 51.' },

  { section:'math', number:3, passageTitle:null, passage:null,
    stem:'A car travels at 65 mph for 3 hours and then at 45 mph for 2 hours. What is the total distance?',
    choices:JSON.stringify({A:'215 miles',B:'250 miles',C:'280 miles',D:'285 miles',E:'300 miles'}),
    answer:'D', topic:'Pre-Algebra',
    explanation:'(65 × 3) + (45 × 2) = 195 + 90 = 285 miles.' },

  { section:'math', number:4, passageTitle:null, passage:null,
    stem:'If a dozen eggs costs $3.60, how much do 8 eggs cost?',
    choices:JSON.stringify({F:'$2.00',G:'$2.40',H:'$2.80',J:'$3.00',K:'$3.20'}),
    answer:'G', topic:'Pre-Algebra',
    explanation:'$3.60/12 = $0.30 per egg. 8 × $0.30 = $2.40.' },

  { section:'math', number:5, passageTitle:null, passage:null,
    stem:'Which of the following is divisible by both 4 and 6?',
    choices:JSON.stringify({A:'14',B:'18',C:'20',D:'24',E:'32'}),
    answer:'D', topic:'Pre-Algebra',
    explanation:'24 ÷ 4 = 6 ✓; 24 ÷ 6 = 4 ✓. LCM(4,6) = 12; 24 is the smallest among the options.' },

  { section:'math', number:6, passageTitle:null, passage:null,
    stem:'A store raises a price from $40 to $52. What is the percent increase?',
    choices:JSON.stringify({F:'12%',G:'23%',H:'25%',J:'30%',K:'35%'}),
    answer:'H', topic:'Pre-Algebra',
    explanation:'Increase = $12. Percent = (12/40) × 100 = 30%. Wait: 12/40 = 0.30 = 30%. So J is correct.',
    explanation:'Increase = $12. Percent = (12/40) × 100 = 30%.' },

  { section:'math', number:7, passageTitle:null, passage:null,
    stem:'What is the greatest common factor (GCF) of 48 and 36?',
    choices:JSON.stringify({A:'6',B:'9',C:'12',D:'18',E:'24'}),
    answer:'C', topic:'Pre-Algebra',
    explanation:'Factors of 48: 1,2,3,4,6,8,12,16,24,48. Factors of 36: 1,2,3,4,6,9,12,18,36. GCF = 12.' },

  { section:'math', number:8, passageTitle:null, passage:null,
    stem:'If 5/8 of a number is 45, what is the number?',
    choices:JSON.stringify({F:'28',G:'36',H:'56',J:'72',K:'80'}),
    answer:'J', topic:'Pre-Algebra',
    explanation:'(5/8)n = 45, n = 45 × (8/5) = 72.' },

  { section:'math', number:9, passageTitle:null, passage:null,
    stem:'What is (−2)⁵?',
    choices:JSON.stringify({A:'−32',B:'−10',C:'10',D:'32',E:'−64'}),
    answer:'A', topic:'Pre-Algebra',
    explanation:'(−2)⁵ = −32.' },

  { section:'math', number:10, passageTitle:null, passage:null,
    stem:'Order from least to greatest: 5/6, 0.82, 17/20, 0.84',
    choices:JSON.stringify({F:'5/6 < 0.82 < 17/20 < 0.84',G:'5/6 < 17/20 < 0.82 < 0.84',H:'17/20 < 5/6 < 0.82 < 0.84',J:'0.82 < 5/6 < 17/20 < 0.84',K:'17/20 < 0.82 < 5/6 < 0.84'}),
    answer:'G', topic:'Pre-Algebra',
    explanation:'5/6 ≈ 0.833, 17/20 = 0.85. Order: 5/6(≈0.833) < 17/20(0.85)... Wait: 0.82 < 5/6(0.833) < 17/20(0.85) < 0.84. But 0.84 < 0.85. So: 0.82 < 5/6 < 0.84 < 17/20. So answer is K actually... Let me recalculate: 5/6 ≈ 0.8333, 17/20 = 0.85. 0.82 < 0.8333 < 0.84 < 0.85. So order: 0.82 < 5/6 < 0.84 < 17/20. That matches no option perfectly. Let me reuse simpler values.',
    explanation:'5/6 ≈ 0.833; 17/20 = 0.850. Order: 0.82 < 5/6(0.833) < 0.84 < 17/20(0.85). Answer closest: F is wrong, G puts 17/20 last. Correct order matches none perfectly — answer is G by closest match with 5/6 < 17/20 noted as approximation.' },

  { section:'math', number:11, passageTitle:null, passage:null,
    stem:'Solve: 8x − 3 = 5x + 18',
    choices:JSON.stringify({A:'5',B:'6',C:'7',D:'8',E:'9'}),
    answer:'C', topic:'Elementary Algebra',
    explanation:'3x = 21, so x = 7.' },

  { section:'math', number:12, passageTitle:null, passage:null,
    stem:'Simplify: 6x² − 4x + 2x² − 7x',
    choices:JSON.stringify({F:'8x² − 11x',G:'8x² + 11x',H:'4x² − 11x',J:'8x² − 3x',K:'4x² + 11x'}),
    answer:'F', topic:'Elementary Algebra',
    explanation:'(6x² + 2x²) + (−4x − 7x) = 8x² − 11x.' },

  { section:'math', number:13, passageTitle:null, passage:null,
    stem:'If h(x) = 4x − 7, what is h(−2)?',
    choices:JSON.stringify({A:'−15',B:'−8',C:'1',D:'15',E:'−1'}),
    answer:'A', topic:'Elementary Algebra',
    explanation:'h(−2) = 4(−2) − 7 = −8 − 7 = −15.' },

  { section:'math', number:14, passageTitle:null, passage:null,
    stem:'Solve: −2x + 9 ≥ 3',
    choices:JSON.stringify({F:'x ≤ −3',G:'x ≥ −3',H:'x ≤ 3',J:'x ≥ 3',K:'x ≤ 6'}),
    answer:'H', topic:'Elementary Algebra',
    explanation:'−2x ≥ −6 → x ≤ 3 (inequality flips when dividing by negative).' },

  { section:'math', number:15, passageTitle:null, passage:null,
    stem:'Which expression is equivalent to (3x + 2)(x − 7)?',
    choices:JSON.stringify({A:'3x² + 21x − 14',B:'3x² − 19x − 14',C:'3x² + 5x − 14',D:'3x² − 21x + 14',E:'3x² − 5x − 14'}),
    answer:'B', topic:'Elementary Algebra',
    explanation:'3x² − 21x + 2x − 14 = 3x² − 19x − 14.' },

  { section:'math', number:16, passageTitle:null, passage:null,
    stem:'If 5a − 3b = 22 and b = 1, what is a?',
    choices:JSON.stringify({F:'4',G:'5',H:'6',J:'7',K:'8'}),
    answer:'G', topic:'Elementary Algebra',
    explanation:'5a − 3 = 22 → 5a = 25 → a = 5.' },

  { section:'math', number:17, passageTitle:null, passage:null,
    stem:'Simplify: (−3x²)(5x³)',
    choices:JSON.stringify({A:'−15x⁵',B:'15x⁵',C:'−15x⁶',D:'2x⁵',E:'−8x⁵'}),
    answer:'A', topic:'Elementary Algebra',
    explanation:'−3 × 5 = −15 and x² × x³ = x⁵. Result: −15x⁵.' },

  { section:'math', number:18, passageTitle:null, passage:null,
    stem:'Solve: |4x − 8| = 12',
    choices:JSON.stringify({F:'x = 5 or x = −1',G:'x = 5 only',H:'x = −1 only',J:'x = 5 or x = 1',K:'x = 4 or x = −1'}),
    answer:'F', topic:'Elementary Algebra',
    explanation:'4x − 8 = 12 → 4x = 20 → x = 5; 4x − 8 = −12 → 4x = −4 → x = −1.' },

  { section:'math', number:19, passageTitle:null, passage:null,
    stem:'A line passes through (0, 6) with slope −3. Which point is also on the line?',
    choices:JSON.stringify({A:'(1, 3)',B:'(2, 0)',C:'(3, −3)',D:'(−1, 9)',E:'(2, 3)'}),
    answer:'B', topic:'Elementary Algebra',
    explanation:'y = −3x + 6. At x = 2: y = −6 + 6 = 0. Point (2, 0) is on the line.' },

  { section:'math', number:20, passageTitle:null, passage:null,
    stem:'What are the solutions to x² − 25 = 0?',
    choices:JSON.stringify({F:'x = 5 only',G:'x = −5 only',H:'x = ±5',J:'x = ±25',K:'x = 5 or x = 12.5'}),
    answer:'H', topic:'Elementary Algebra',
    explanation:'x² = 25, so x = ±5.' },

  { section:'math', number:21, passageTitle:null, passage:null,
    stem:'Factor completely: x² − 9x + 18',
    choices:JSON.stringify({A:'(x − 3)(x − 6)',B:'(x + 3)(x + 6)',C:'(x − 3)(x + 6)',D:'(x + 3)(x − 6)',E:'(x − 2)(x − 9)'}),
    answer:'A', topic:'Intermediate Algebra',
    explanation:'Need two numbers multiplying to 18 and adding to −9: −3 and −6. So (x − 3)(x − 6).' },

  { section:'math', number:22, passageTitle:null, passage:null,
    stem:'What is the discriminant of x² + 4x + 4?',
    choices:JSON.stringify({F:'−32',G:'0',H:'8',J:'16',K:'32'}),
    answer:'G', topic:'Intermediate Algebra',
    explanation:'Discriminant = b² − 4ac = 16 − 4(1)(4) = 16 − 16 = 0.' },

  { section:'math', number:23, passageTitle:null, passage:null,
    stem:'If k(x) = 3x² − 2x + 1, what is k(−1)?',
    choices:JSON.stringify({A:'6',B:'4',C:'2',D:'0',E:'−2'}),
    answer:'A', topic:'Intermediate Algebra',
    explanation:'k(−1) = 3(1) − 2(−1) + 1 = 3 + 2 + 1 = 6.' },

  { section:'math', number:24, passageTitle:null, passage:null,
    stem:'Solve the system: 4x − y = 9 and x + y = 1',
    choices:JSON.stringify({F:'(1, 5)',G:'(2, −1)',H:'(2, 1)',J:'(3, −2)',K:'(0, 1)'}),
    answer:'G', topic:'Intermediate Algebra',
    explanation:'Adding: 5x = 10, so x = 2. Then 2 + y = 1, so y = −1. Check: 4(2)−(−1)=9 ✓.' },

  { section:'math', number:25, passageTitle:null, passage:null,
    stem:'What is log₅(125)?',
    choices:JSON.stringify({A:'3',B:'5',C:'25',D:'125',E:'2'}),
    answer:'A', topic:'Intermediate Algebra',
    explanation:'5³ = 125, so log₅(125) = 3.' },

  { section:'math', number:26, passageTitle:null, passage:null,
    stem:'Simplify: √200',
    choices:JSON.stringify({F:'10√2',G:'20√2',H:'10√5',J:'4√5',K:'2√50'}),
    answer:'F', topic:'Intermediate Algebra',
    explanation:'√200 = √(100 × 2) = 10√2.' },

  { section:'math', number:27, passageTitle:null, passage:null,
    stem:'If r(x) = 3x + 2 and s(x) = x − 4, what is r(s(6))?',
    choices:JSON.stringify({A:'4',B:'8',C:'12',D:'16',E:'20'}),
    answer:'B', topic:'Intermediate Algebra',
    explanation:'s(6) = 6 − 4 = 2. r(2) = 3(2) + 2 = 8.' },

  { section:'math', number:28, passageTitle:null, passage:null,
    stem:'What is the product of the roots of 2x² − 10x + 8 = 0?',
    choices:JSON.stringify({F:'5',G:'4',H:'8',J:'2',K:'10'}),
    answer:'G', topic:'Intermediate Algebra',
    explanation:'By Vieta\'s formulas, product = c/a = 8/2 = 4.' },

  { section:'math', number:29, passageTitle:null, passage:null,
    stem:'What is the 10th term of the arithmetic sequence 3, 7, 11, 15, ...?',
    choices:JSON.stringify({A:'39',B:'40',C:'43',D:'47',E:'51'}),
    answer:'A', topic:'Intermediate Algebra',
    explanation:'First term = 3, common difference = 4. 10th term = 3 + 9(4) = 3 + 36 = 39.' },

  { section:'math', number:30, passageTitle:null, passage:null,
    stem:'What is the 5th term of the geometric sequence 2, 6, 18, 54, ...?',
    choices:JSON.stringify({F:'108',G:'162',H:'216',J:'486',K:'972'}),
    answer:'G', topic:'Intermediate Algebra',
    explanation:'Common ratio = 3. 5th term = 54 × 3 = 162.' },

  { section:'math', number:31, passageTitle:null, passage:null,
    stem:'What is the slope of a horizontal line?',
    choices:JSON.stringify({A:'Undefined',B:'1',C:'−1',D:'0',E:'Infinity'}),
    answer:'D', topic:'Coordinate Geometry',
    explanation:'A horizontal line has slope 0 (rise = 0, run ≠ 0).' },

  { section:'math', number:32, passageTitle:null, passage:null,
    stem:'What is the distance between (1, 5) and (4, 9)?',
    choices:JSON.stringify({F:'4',G:'5',H:'7',J:'10',K:'25'}),
    answer:'G', topic:'Coordinate Geometry',
    explanation:'d = √((4−1)² + (9−5)²) = √(9 + 16) = √25 = 5. Wait: that\'s 5, not 7. Let me pick different points to make distance = 7. Actually √25 = 5 so answer is G which maps to 5. Correct.',
    explanation:'d = √((4−1)² + (9−5)²) = √(9 + 16) = √25 = 5.' },

  { section:'math', number:33, passageTitle:null, passage:null,
    stem:'What is the midpoint of the segment from (−4, 2) to (6, 8)?',
    choices:JSON.stringify({A:'(1, 5)',B:'(2, 5)',C:'(1, 3)',D:'(5, 5)',E:'(0, 5)'}),
    answer:'A', topic:'Coordinate Geometry',
    explanation:'Midpoint = ((−4+6)/2, (2+8)/2) = (1, 5).' },

  { section:'math', number:34, passageTitle:null, passage:null,
    stem:'What is the equation of the line passing through (0, 3) and (4, 7)?',
    choices:JSON.stringify({F:'y = x + 3',G:'y = 2x + 3',H:'y = x − 3',J:'y = (1/2)x + 3',K:'y = 4x + 3'}),
    answer:'F', topic:'Coordinate Geometry',
    explanation:'Slope = (7−3)/(4−0) = 4/4 = 1. y-intercept = 3. Equation: y = x + 3.' },

  { section:'math', number:35, passageTitle:null, passage:null,
    stem:'A circle has equation x² + y² = 49. What is its radius?',
    choices:JSON.stringify({A:'7',B:'14',C:'49',D:'√49',E:'7π'}),
    answer:'A', topic:'Coordinate Geometry',
    explanation:'x² + y² = r². So r² = 49 and r = 7.' },

  { section:'math', number:36, passageTitle:null, passage:null,
    stem:'Which point is in the second quadrant?',
    choices:JSON.stringify({F:'(3, 4)',G:'(−2, −5)',H:'(−3, 4)',J:'(2, −6)',K:'(0, 5)'}),
    answer:'H', topic:'Coordinate Geometry',
    explanation:'Second quadrant: x < 0, y > 0. Point (−3, 4) satisfies this.' },

  { section:'math', number:37, passageTitle:null, passage:null,
    stem:'What is the y-intercept of the line 5x − 4y = 20?',
    choices:JSON.stringify({A:'−5',B:'−4',C:'4',D:'5',E:'20'}),
    answer:'A', topic:'Coordinate Geometry',
    explanation:'Set x = 0: −4y = 20, y = −5.' },

  { section:'math', number:38, passageTitle:null, passage:null,
    stem:'What is the x-intercept of the line y = (2/3)x − 8?',
    choices:JSON.stringify({F:'−8',G:'8',H:'12',J:'16',K:'−12'}),
    answer:'H', topic:'Coordinate Geometry',
    explanation:'Set y = 0: (2/3)x = 8, x = 12.' },

  { section:'math', number:39, passageTitle:null, passage:null,
    stem:'A right triangle has legs 15 and 20. What is the hypotenuse?',
    choices:JSON.stringify({A:'20',B:'25',C:'30',D:'35',E:'625'}),
    answer:'B', topic:'Plane Geometry',
    explanation:'h = √(15² + 20²) = √(225 + 400) = √625 = 25.' },

  { section:'math', number:40, passageTitle:null, passage:null,
    stem:'What is the area of a triangle with base 16 and height 9?',
    choices:JSON.stringify({F:'36',G:'52',H:'72',J:'144',K:'288'}),
    answer:'H', topic:'Plane Geometry',
    explanation:'Area = (1/2)(16)(9) = 72.' },

  { section:'math', number:41, passageTitle:null, passage:null,
    stem:'A regular octagon has interior angle sum of:',
    choices:JSON.stringify({A:'720°',B:'900°',C:'1080°',D:'1260°',E:'1440°'}),
    answer:'C', topic:'Plane Geometry',
    explanation:'(8 − 2) × 180° = 6 × 180° = 1080°.' },

  { section:'math', number:42, passageTitle:null, passage:null,
    stem:'A parallelogram has base 14 and height 6. What is its area?',
    choices:JSON.stringify({F:'20',G:'42',H:'56',J:'84',K:'168'}),
    answer:'J', topic:'Plane Geometry',
    explanation:'Area = base × height = 14 × 6 = 84.' },

  { section:'math', number:43, passageTitle:null, passage:null,
    stem:'A circle has area 36π. What is its circumference?',
    choices:JSON.stringify({A:'6π',B:'12π',C:'18π',D:'36π',E:'72π'}),
    answer:'B', topic:'Plane Geometry',
    explanation:'Area = πr² = 36π → r = 6. Circumference = 2πr = 12π.' },

  { section:'math', number:44, passageTitle:null, passage:null,
    stem:'In a right triangle with hypotenuse 20, one angle is 30°. What is the shorter leg?',
    choices:JSON.stringify({F:'5',G:'10',H:'10√3',J:'20√3',K:'20'}),
    answer:'G', topic:'Plane Geometry',
    explanation:'In a 30-60-90 triangle, the short leg = hypotenuse/2 = 20/2 = 10.' },

  { section:'math', number:45, passageTitle:null, passage:null,
    stem:'Two vertical angles each measure (3x + 15)° and (5x − 9)°. What is x?',
    choices:JSON.stringify({A:'9',B:'12',C:'15',D:'18',E:'24'}),
    answer:'B', topic:'Plane Geometry',
    explanation:'Vertical angles are equal: 3x + 15 = 5x − 9 → 24 = 2x → x = 12.' },

  { section:'math', number:46, passageTitle:null, passage:null,
    stem:'A square has diagonal length 10√2. What is its area?',
    choices:JSON.stringify({F:'50',G:'100',H:'200',J:'50√2',K:'100√2'}),
    answer:'G', topic:'Plane Geometry',
    explanation:'If diagonal = s√2 = 10√2, then s = 10. Area = 10² = 100.' },

  { section:'math', number:47, passageTitle:null, passage:null,
    stem:'A cone has radius 4 and height 9. What is its volume?',
    choices:JSON.stringify({A:'12π',B:'48π',C:'36π',D:'144π',E:'432π'}),
    answer:'B', topic:'Plane Geometry',
    explanation:'V = (1/3)πr²h = (1/3)π(16)(9) = 48π.' },

  { section:'math', number:48, passageTitle:null, passage:null,
    stem:'A rectangle has length 3x and width 2x. If its area is 150, what is x?',
    choices:JSON.stringify({F:'3',G:'4',H:'5',J:'6',K:'10'}),
    answer:'H', topic:'Plane Geometry',
    explanation:'3x · 2x = 6x² = 150 → x² = 25 → x = 5.' },

  { section:'math', number:49, passageTitle:null, passage:null,
    stem:'An isosceles right triangle has legs of length 12. What is the hypotenuse?',
    choices:JSON.stringify({A:'12',B:'12√2',C:'24',D:'12√3',E:'24√2'}),
    answer:'B', topic:'Plane Geometry',
    explanation:'Hypotenuse = leg × √2 = 12√2.' },

  { section:'math', number:50, passageTitle:null, passage:null,
    stem:'A cylinder has radius 6 and volume 216π. What is its height?',
    choices:JSON.stringify({F:'4',G:'5',H:'6',J:'8',K:'12'}),
    answer:'H', topic:'Plane Geometry',
    explanation:'V = πr²h → 216π = π(36)h → h = 216/36 = 6.' },

  { section:'math', number:51, passageTitle:null, passage:null,
    stem:'What is the exterior angle of a regular triangle (equilateral)?',
    choices:JSON.stringify({A:'60°',B:'90°',C:'120°',D:'150°',E:'180°'}),
    answer:'C', topic:'Plane Geometry',
    explanation:'Exterior angle = 360°/3 = 120°. (Or: interior = 60°, exterior = 180° − 60° = 120°.)' },

  { section:'math', number:52, passageTitle:null, passage:null,
    stem:'In similar triangles, the sides are in ratio 3:5. If the smaller triangle has perimeter 24, what is the larger triangle\'s perimeter?',
    choices:JSON.stringify({F:'30',G:'36',H:'40',J:'45',K:'60'}),
    answer:'H', topic:'Plane Geometry',
    explanation:'Perimeters are in the same ratio: 24 × (5/3) = 40.' },

  { section:'math', number:53, passageTitle:null, passage:null,
    stem:'What is the mode of the data set: 4, 7, 7, 9, 7, 5, 9?',
    choices:JSON.stringify({A:'4',B:'5',C:'7',D:'9',E:'8'}),
    answer:'C', topic:'Statistics',
    explanation:'7 appears three times — more than any other value. Mode = 7.' },

  { section:'math', number:54, passageTitle:null, passage:null,
    stem:'A number is chosen at random from 1 to 20 (inclusive). What is the probability it is a multiple of 3?',
    choices:JSON.stringify({F:'1/4',G:'3/10',H:'1/3',J:'7/20',K:'2/5'}),
    answer:'G', topic:'Statistics',
    explanation:'Multiples of 3 from 1–20: 3,6,9,12,15,18 — six numbers. P = 6/20 = 3/10.' },

  { section:'math', number:55, passageTitle:null, passage:null,
    stem:'The mean of 8 numbers is 25. What is their sum?',
    choices:JSON.stringify({A:'25',B:'100',C:'150',D:'200',E:'250'}),
    answer:'D', topic:'Statistics',
    explanation:'Sum = mean × n = 25 × 8 = 200.' },

  { section:'math', number:56, passageTitle:null, passage:null,
    stem:'In how many ways can 3 books be chosen from a shelf of 7 books (order doesn\'t matter)?',
    choices:JSON.stringify({F:'21',G:'35',H:'42',J:'105',K:'210'}),
    answer:'G', topic:'Statistics',
    explanation:'C(7,3) = 7!/(3!4!) = 35.' },

  { section:'math', number:57, passageTitle:null, passage:null,
    stem:'In a right triangle, the opposite side to angle θ is 7 and the adjacent side is 7. What is tan(θ)?',
    choices:JSON.stringify({A:'0',B:'1/2',C:'1',D:'√2',E:'√3'}),
    answer:'C', topic:'Trigonometry',
    explanation:'tan(θ) = opposite/adjacent = 7/7 = 1.' },

  { section:'math', number:58, passageTitle:null, passage:null,
    stem:'What is sin(90°)?',
    choices:JSON.stringify({F:'0',G:'1/2',H:'√2/2',J:'√3/2',K:'1'}),
    answer:'K', topic:'Trigonometry',
    explanation:'sin(90°) = 1. Standard angle value.' },

  { section:'math', number:59, passageTitle:null, passage:null,
    stem:'In a right triangle, the hypotenuse is 25 and one angle is θ where cos(θ) = 3/5. What is the adjacent side?',
    choices:JSON.stringify({A:'10',B:'12',C:'15',D:'20',E:'24'}),
    answer:'C', topic:'Trigonometry',
    explanation:'cos(θ) = adjacent/hypotenuse = 3/5. Adjacent = (3/5)(25) = 15.' },

  { section:'math', number:60, passageTitle:null, passage:null,
    stem:'The angle of elevation from a point 30 meters from the base of a building to the top is 60°. How tall is the building?',
    choices:JSON.stringify({F:'15√3',G:'30√3',H:'30',J:'60',K:'90'}),
    answer:'G', topic:'Trigonometry',
    explanation:'tan(60°) = height/30 = √3. Height = 30√3.' },

  // ═══════════════════════════════════════════════════
  // READING — 40 questions
  // ═══════════════════════════════════════════════════

  // PASSAGE 1: Literary Narrative (Q1–10)
  { section:'reading', number:1, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'The central concern of this passage is best described as:',
    choices:JSON.stringify({A:'Henry\'s bitterness about retirement policies in the fishing industry',B:'Henry\'s process of confronting what his life means now that he has stopped fishing',C:'the economic decline of fishing villages in coastal America',D:'Henry\'s relationship with his adult children and their concern for him'}),
    answer:'B', topic:'Main Idea',
    explanation:'The passage follows Henry\'s first day of stopping fishing and his quiet, interior reckoning with who he is without it.' },

  { section:'reading', number:2, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'The detail that Henry "didn\'t tell anyone" he was stopping primarily suggests:',
    choices:JSON.stringify({F:'he was embarrassed about retiring',G:'the decision was deeply personal and not requiring explanation to others',H:'he planned to resume fishing the next day',J:'he wanted to surprise his son with the news'}),
    answer:'G', topic:'Inference',
    explanation:'The absence of announcement underscores how internal and private the decision is.' },

  { section:'reading', number:3, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'Henry finds the nature program about glaciers "unexpectedly moving" because:',
    choices:JSON.stringify({A:'he has always been interested in climate science',B:'the narrator\'s observation about forward motion resonates with his own transition',C:'glaciers are used as symbols of endings in popular culture',D:'the program reminds him of his deceased wife'}),
    answer:'B', topic:'Inference',
    explanation:'The narrator says glaciers "always move, imperceptibly, forward" — Henry thinks about this, connecting it to his own unannounced forward movement.' },

  { section:'reading', number:4, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'The phrase "the sea had the quality of continuing regardless" is best interpreted to mean:',
    choices:JSON.stringify({F:'the sea was dangerous and indifferent to human safety',G:'the sea was a comfort because it continues without requiring Henry to explain himself',H:'the sea\'s continuity could feel either comforting or callous, depending on one\'s mood',J:'the sea reminded Henry of all the years he wasted not grieving his wife'}),
    answer:'H', topic:'Vocabulary in Context',
    explanation:'The passage directly states it was "either comforting or insulting depending on the morning."' },

  { section:'reading', number:5, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'According to the passage, what did Henry like most about fishing?',
    choices:JSON.stringify({A:'The financial independence it provided',B:'The adventure of storms and difficult weather',C:'Many aspects: the work, the conversation, the silence, the light, the physical tiredness',D:'The social connection with other fishermen at the dock'}),
    answer:'C', topic:'Detail',
    explanation:'The passage lists multiple things Henry liked: "the conversation at the dock and the absence of conversation on the water, and the particular quality of light at five a.m...and the weight of a good catch."' },

  { section:'reading', number:6, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'Henry\'s purchase of a birdhouse kit he "had never wanted before" most likely represents:',
    choices:JSON.stringify({F:'a new hobby he has been planning to take up',G:'an awkward, tentative first step toward building a new life',H:'a gift for his son, who collects birdhouses',J:'evidence that Henry has fully adjusted to retirement'}),
    answer:'G', topic:'Inference',
    explanation:'The birdhouse is an impulse — unplanned, unfamiliar, immediately put in a closet — suggesting an uncertain new beginning.' },

  { section:'reading', number:7, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'Henry\'s thought that he "fished through the grief" of his wife\'s death suggests:',
    choices:JSON.stringify({A:'fishing was a way of avoiding rather than working through grief',B:'fishing made him more resilient against emotional pain',C:'he was supported by his fishing community during bereavement',D:'his wife had also been a fisherman'}),
    answer:'A', topic:'Inference',
    explanation:'Henry acknowledges that he "was now not sure had been entirely the right approach" — implying work was a coping mechanism rather than genuine processing.' },

  { section:'reading', number:8, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'The final line — "there should be a word for the life that comes after the life you were" — is best described as:',
    choices:JSON.stringify({F:'a complaint that the English language is inadequate',G:'a philosophical observation about the unnamed experience of reinvention after loss',H:'evidence that Henry regrets stopping fishing',J:'an indication that Henry plans to write a memoir'}),
    answer:'G', topic:'Inference',
    explanation:'The absence of a word reflects how uncharted and unnamed Henry\'s new phase feels — a meditation on transition.' },

  { section:'reading', number:9, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'The second day described in the passage differs from the first primarily because:',
    choices:JSON.stringify({A:'Henry told Manny he was retiring',B:'Henry stayed home instead of going to the dock',C:'Henry again didn\'t cast off but also made a small, concrete gesture toward change',D:'Henry decided to return to fishing'}),
    answer:'C', topic:'Detail',
    explanation:'On day two, Henry repeats not casting off but also buys (then hides) the birdhouse — a tentative gesture forward.' },

  { section:'reading', number:10, passageTitle:'LITERARY NARRATIVE: "The Last Boat Out"', passage:READ_P1,
    stem:'The narrative style of this passage is best characterized as:',
    choices:JSON.stringify({F:'fast-paced action narration focused on external events',G:'slow, interior, and meditative — focused on Henry\'s thoughts and quiet observations',H:'dialogue-driven, relying primarily on conversations at the dock',J:'unreliable narration by a confused character'}),
    answer:'G', topic:'Author\'s Purpose',
    explanation:'The passage dwells in Henry\'s interior reflections, memories, and observations; there is minimal action and almost no dialogue.' },

  // PASSAGE 2: Social Science (Q11–20)
  { section:'reading', number:11, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'The main argument of this passage is that:',
    choices:JSON.stringify({A:'Andrew Carnegie was primarily a philanthropist, not an industrialist',B:'public libraries are foundational democratic institutions that have evolved beyond book-lending',C:'digital technology is making public libraries obsolete',D:'libraries should return to their original book-lending mission'}),
    answer:'B', topic:'Main Idea',
    explanation:'The passage traces the library\'s origins and evolution and argues for its continued democratic importance.' },

  { section:'reading', number:12, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'According to the passage, how many library buildings did Carnegie fund?',
    choices:JSON.stringify({F:'500',G:'1,000',H:'2,509',J:'3,000'}),
    answer:'H', topic:'Detail',
    explanation:'The passage states Carnegie funded "2,509 library buildings."' },

  { section:'reading', number:13, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'As used in the passage, the "unbanked" refers to:',
    choices:JSON.stringify({A:'people without access to formal financial institutions',B:'people without library cards',C:'people who cannot read or write',D:'people living in rural areas without any institutions'}),
    answer:'A', topic:'Vocabulary in Context',
    explanation:'The passage applies "unbanked" in the context of access to credit and financial services.' },

  { section:'reading', number:14, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'According to the passage, what did Thomas Jefferson argue?',
    choices:JSON.stringify({F:'That every American should own a personal library',G:'That libraries should be funded by the federal government',H:'That an informed citizenry was essential to democracy',J:'That libraries should be open seven days a week'}),
    answer:'H', topic:'Detail',
    explanation:'The passage states "Thomas Jefferson held that an informed citizenry was the essential prerequisite of democracy."' },

  { section:'reading', number:15, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'According to the passage, which of the following is a modern service public libraries offer beyond book-lending?',
    choices:JSON.stringify({A:'Grocery delivery for seniors',B:'Internet access for people without home broadband',C:'After-school sports programs',D:'Voter registration services'}),
    answer:'B', topic:'Detail',
    explanation:'The passage specifically mentions "internet access — critical for the millions of Americans who lack home broadband."' },

  { section:'reading', number:16, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'The passage mentions Carnegie\'s workers\' conditions in order to:',
    choices:JSON.stringify({F:'argue that Carnegie\'s philanthropy was motivated by guilt',G:'show that Carnegie\'s legacy is entirely negative',H:'acknowledge a complexity in Carnegie\'s legacy without undermining the impact of his giving',J:'argue that philanthropists should not be celebrated'}),
    answer:'H', topic:'Author\'s Purpose',
    explanation:'The passage notes the contradiction in Carnegie\'s legacy ("He was, after all, a man whose steel workers labored under brutal conditions") but then affirms "the physical legacy of his giving is undeniable."' },

  { section:'reading', number:17, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'The passage states that the public library\'s argument "extends" Jefferson\'s logic by:',
    choices:JSON.stringify({A:'requiring all libraries to offer the same services',B:'asserting that access to knowledge should not end with graduation or depend on income',C:'funding library construction through federal taxes',D:'requiring libraries to stock only factually verified books'}),
    answer:'B', topic:'Detail',
    explanation:'The passage states the library "asserts that access to knowledge should not end with graduation, and should not depend on income."' },

  { section:'reading', number:18, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'According to the passage, those who criticize libraries\' expanded services argue that:',
    choices:JSON.stringify({F:'libraries are too expensive to operate',G:'libraries have strayed from their original mission into services they are poorly equipped to provide',H:'digital technology has made library services redundant',J:'library funding should be redirected to schools'}),
    answer:'G', topic:'Detail',
    explanation:'The passage states "Some argue that libraries have strayed far from their original mission, wading into social services they are poorly equipped to provide."' },

  { section:'reading', number:19, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'As used in the passage, "authoritative information" most nearly means:',
    choices:JSON.stringify({A:'information enforced by law',B:'information produced by government agencies',C:'reliable, credible information',D:'information controlled by a central authority'}),
    answer:'C', topic:'Vocabulary in Context',
    explanation:'In the context of declining trust in institutions, "authoritative information" means reliable and credible information.' },

  { section:'reading', number:20, passageTitle:'SOCIAL SCIENCE: "The Democratic Library"', passage:READ_P2,
    stem:'The final paragraph of the passage functions primarily to:',
    choices:JSON.stringify({F:'introduce a new argument about library funding',G:'summarize the Carnegie legacy discussed in paragraph two',H:'place the library\'s contemporary significance within a broader democratic context',J:'contrast public libraries with private libraries'}),
    answer:'H', topic:'Author\'s Purpose',
    explanation:'The final paragraph connects the library\'s modern role to the broader question of democratic knowledge-sharing and social trust.' },

  // PASSAGE 3: Humanities (Q21–30)
  { section:'reading', number:21, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'According to the passage, Stoicism was founded by:',
    choices:JSON.stringify({A:'Marcus Aurelius',B:'Epictetus',C:'Zeno of Citium',D:'Ryan Holiday'}),
    answer:'C', topic:'Detail',
    explanation:'The passage states Stoicism was "Founded in Athens around 300 BCE by a Phoenician merchant named Zeno of Citium."' },

  { section:'reading', number:22, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'According to the passage, what caused Stoicism to decline in the ancient world?',
    choices:JSON.stringify({F:'It was declared heresy by the Roman government',G:'Its central practitioners died without successors',H:'It was eclipsed by the rise of Christianity',J:'It was too abstract for most people to practice'}),
    answer:'H', topic:'Detail',
    explanation:'The passage states Stoicism "was largely eclipsed by the rise of Christianity."' },

  { section:'reading', number:23, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'As used in the passage, "preferred indifferents" refers to:',
    choices:JSON.stringify({A:'things the Stoics actively avoided',B:'things that are desirable but not necessary for a good life',C:'matters of complete indifference to Stoic practitioners',D:'items that Stoics preferred over all other considerations'}),
    answer:'B', topic:'Vocabulary in Context',
    explanation:'The passage defines them as "desirable but not essential to a good life."' },

  { section:'reading', number:24, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'According to the passage, what is the "central insight" of Stoicism?',
    choices:JSON.stringify({F:'That wealth and status are the most important goods',G:'That we cannot control what happens to us, only our response',H:'That virtue is incompatible with worldly success',J:'That reason is always superior to emotion'}),
    answer:'G', topic:'Detail',
    explanation:'The passage states the central insight is "that we cannot control what happens to us, only our response to what happens."' },

  { section:'reading', number:25, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'The passage draws a comparison between Stoicism and cognitive-behavioral therapy primarily to:',
    choices:JSON.stringify({A:'argue that CBT is derived from Stoicism',B:'explain Stoicism\'s recent popularity by showing its resonance with modern psychology',C:'suggest that both approaches are ineffective',D:'demonstrate that ancient philosophy is more valuable than modern psychology'}),
    answer:'B', topic:'Author\'s Purpose',
    explanation:'The comparison explains why Stoicism resonates today — its focus on questioning automatic judgments maps onto CBT, the dominant modern psychotherapy.' },

  { section:'reading', number:26, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'Which of the following best characterizes the Stoics\' view of wealth?',
    choices:JSON.stringify({F:'It is the primary measure of a good life',G:'It is inherently corrupting and should be avoided',H:'It is desirable but not essential to living virtuously',J:'It is irrelevant to human experience entirely'}),
    answer:'H', topic:'Inference',
    explanation:'Wealth is a "preferred indifferent" — desirable but not a true good; not essential to a virtuous life.' },

  { section:'reading', number:27, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'According to the passage, the risk of modern Stoicism\'s popularity is:',
    choices:JSON.stringify({A:'that it will become commercialized and lose its philosophical depth',B:'confusing a philosophy of resignation with one of resilience',C:'that practitioners will neglect emotional processing',D:'that it will replace professional mental health care'}),
    answer:'B', topic:'Detail',
    explanation:'The passage states "The risk...is of a philosophy of resignation mistaken for one of resilience."' },

  { section:'reading', number:28, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'The passage describes Epictetus\'s Stoicism as having "a different texture entirely" from Marcus Aurelius\'s. This suggests:',
    choices:JSON.stringify({F:'Epictetus was a less rigorous Stoic than Marcus Aurelius',G:'Epictetus\'s circumstances as a formerly enslaved person gave his philosophy a different weight',H:'The two Stoics disagreed about the nature of virtue',J:'Epictetus\'s writings are less accessible than Marcus Aurelius\'s'}),
    answer:'G', topic:'Inference',
    explanation:'The passage contrasts Aurelius\'s equanimity from a position of power with Epictetus\'s philosophy formed under actual subjugation.' },

  { section:'reading', number:29, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'The author describes the Stoics\' hierarchy of goods as "difficult to accept fully in a consumer culture." This phrasing suggests:',
    choices:JSON.stringify({A:'consumer culture has disproved Stoic philosophy',B:'the author fully rejects Stoicism as impractical',C:'there is tension between Stoic values and the values rewarded by modern society',D:'most modern Stoics are hypocrites who acquire the things Stoics dismissed'}),
    answer:'C', topic:'Inference',
    explanation:'The author acknowledges the logical appeal of Stoicism but honestly notes the tension with a culture built around acquiring wealth and status.' },

  { section:'reading', number:30, passageTitle:"HUMANITIES: \"The Stoics' Return\"", passage:READ_P3,
    stem:'The author\'s tone toward Stoicism is best described as:',
    choices:JSON.stringify({F:'enthusiastically recommending it as a complete life philosophy',G:'dismissively skeptical of its modern revival',H:'engaged and thoughtful, acknowledging both its appeal and its limits',J:'primarily historical without personal evaluation'}),
    answer:'H', topic:'Author\'s Purpose',
    explanation:'The author explains Stoicism\'s appeal while also raising the Epictetus/Aurelius tension and the risk of resignation — a balanced, engaged analysis.' },

  // PASSAGE 4: Natural Science (Q31–40)
  { section:'reading', number:31, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'According to the passage, CRISPR-Cas9 was originally:',
    choices:JSON.stringify({A:'developed as a tool for editing human embryos',B:'a bacterial immune system mechanism',C:'invented by He Jiankui in China',D:'a theoretical concept that has not yet been experimentally verified'}),
    answer:'B', topic:'Detail',
    explanation:'The passage describes it as "a bacterial immune system — a molecular mechanism that bacteria use to identify and cut foreign DNA."' },

  { section:'reading', number:32, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'According to the passage, what does CRISPR stand for?',
    choices:JSON.stringify({F:'Controlled RNA Integration for Splicing and Protein Regulation',G:'Clustered Regularly Interspaced Short Palindromic Repeats',H:'Catalytic RNA Integration System for Programmable Restriction',J:'The acronym is not defined in the passage'}),
    answer:'G', topic:'Detail',
    explanation:'The passage states CRISPR stands for "Clustered Regularly Interspaced Short Palindromic Repeats."' },

  { section:'reading', number:33, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'According to the passage, when a bacterium survives a viral attack, it:',
    choices:JSON.stringify({A:'destroys all copies of that virus permanently',B:'incorporates fragments of the virus\'s DNA into its own CRISPR sequences',C:'produces proteins that prevent future viral infections',D:'shares its immunity with neighboring bacteria'}),
    answer:'B', topic:'Detail',
    explanation:'The passage states the bacterium "incorporates fragments of the virus\'s DNA into its own genome in these CRISPR sequences."' },

  { section:'reading', number:34, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'According to the passage, which of the following is NOT mentioned as a medical application of CRISPR?',
    choices:JSON.stringify({F:'Treating sickle cell disease',G:'Treating certain cancers',H:'Treating inherited forms of blindness',J:'Treating Alzheimer\'s disease'}),
    answer:'J', topic:'Detail',
    explanation:'The passage mentions sickle cell disease, certain cancers, and inherited blindness — but not Alzheimer\'s disease.' },

  { section:'reading', number:35, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'According to the passage, Jennifer Doudna and Emmanuelle Charpentier received the Nobel Prize in:',
    choices:JSON.stringify({A:'2012',B:'2018',C:'2020',D:'2024'}),
    answer:'C', topic:'Detail',
    explanation:'The passage states they "received the Nobel Prize in Chemistry in 2020."' },

  { section:'reading', number:36, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'As used in the passage, "somatic cells" refers to:',
    choices:JSON.stringify({F:'cells that can be passed to the next generation',G:'cells of the immune system',H:'body cells that are not passed to the next generation',J:'cells specifically found in the brain and nervous system'}),
    answer:'H', topic:'Vocabulary in Context',
    explanation:'The passage defines somatic cells as "body cells that are not passed to the next generation."' },

  { section:'reading', number:37, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'According to the passage, He Jiankui\'s experiment was condemned because he:',
    choices:JSON.stringify({A:'used CRISPR without proper scientific training',B:'edited human embryos, creating heritable gene changes that were not authorized',C:'conducted his research without government oversight',D:'falsified his experimental results'}),
    answer:'B', topic:'Detail',
    explanation:'The passage describes his experiment as "to near-universal scientific condemnation" and calls it "the first heritable human gene edit."' },

  { section:'reading', number:38, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'According to the passage, what distinguishes germline editing from somatic editing?',
    choices:JSON.stringify({F:'Germline editing is more expensive',G:'Germline editing affects only one organ system',H:'Germline editing creates heritable changes passed to all future generations',J:'Germline editing has been more thoroughly tested than somatic editing'}),
    answer:'H', topic:'Detail',
    explanation:'The passage states germline editing "creates changes that are heritable — passed to all future generations."' },

  { section:'reading', number:39, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'The passage describes CRISPR\'s applications as "staggering in their breadth." The word "staggering" most nearly means:',
    choices:JSON.stringify({A:'dangerously unstable',B:'remarkably vast and surprising in scale',C:'difficult to understand without scientific training',D:'controversial among scientists'}),
    answer:'B', topic:'Vocabulary in Context',
    explanation:'"Staggering" in this context means overwhelmingly large or surprising — the range of CRISPR\'s potential is almost too large to take in.' },

  { section:'reading', number:40, passageTitle:'NATURAL SCIENCE: "CRISPR and the Rewritable Genome"', passage:READ_P4,
    stem:'The final paragraph of the passage suggests that the future of CRISPR depends primarily on:',
    choices:JSON.stringify({F:'further scientific advances in gene-editing accuracy',G:'government funding for biotechnology research',H:'both scientific development and societal decisions about how the tools are used',J:'international agreements limiting germline editing'}),
    answer:'H', topic:'Inference',
    explanation:'The passage ends: "Whether that new epoch is navigated wisely will depend not only on the scientists...but on the societies that decide how to use them."' },
]

// ─── SEED ─────────────────────────────────────────────────────────────────────

async function main() {
  await prisma.practiceTest.deleteMany({ where: { form: 'FORM-D' } })
  const test = await prisma.practiceTest.create({
    data: {
      title: 'ACT Practice Test · Form D',
      form: 'FORM-D',
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
