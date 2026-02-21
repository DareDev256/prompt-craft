import { ContentItem, Category } from "@/types/game";

// ─── PROMPT CRAFT CURRICULUM ───
// 10 starter items across Basic Prompts & Context Setting

export interface ResponseTiers {
  bad: string;
  ok: string;
  good: string;
  excellent: string;
}

export interface PromptItem extends ContentItem {
  goal: string;           // what player must achieve
  masterPrompt: string;   // ideal COSTAR prompt
  responses: ResponseTiers;
}

export const categories: Category[] = [
  {
    id: "basic-prompts",
    title: "Basic Prompts",
    description: "Single clear instructions — your first forge strikes",
    icon: "⚒",
    levels: [{ id: 1, name: "First Sparks", items: ["bp-001", "bp-002", "bp-003", "bp-004", "bp-005"], requiredXp: 0, gameMode: "standard" }],
  },
  {
    id: "context-setting",
    title: "Context Setting",
    description: "Adding background info — heating the metal",
    icon: "🔥",
    levels: [{ id: 1, name: "Forge Heat", items: ["cs-001", "cs-002", "cs-003", "cs-004", "cs-005"], requiredXp: 0, gameMode: "standard" }],
  },
];

export const items: PromptItem[] = [
  {
    id: "bp-001", category: "basic-prompts", difficulty: "easy",
    prompt: "Get AI to write a haiku about coding",
    goal: "Get AI to write a haiku about coding",
    answer: "Write a haiku (5-7-5 syllable pattern) about debugging code late at night. Use vivid imagery.",
    masterPrompt: "You are a poet. Write a haiku in 5-7-5 syllable format about debugging code at 2am. Use vivid, sensory imagery. Keep the tone wistful. Aimed at developers. Output as plain text with line breaks.",
    responses: {
      bad: "Code is fun to write.\nBugs happen sometimes you know.\nFixing them is hard.",
      ok: "Screen glows in the dark,\nSearching through the tangled code,\nBug fixed, dawn arrives.",
      good: "Cursor blinks alone,\nStack traces like midnight rain—\nOne semicolon.",
      excellent: "Red errors cascade,\nCoffee cold, the world asleep—\nGreen. All tests now pass.",
    },
    enrichment: { whyItMatters: "Even simple tasks benefit from specificity. 'Write a haiku' gives generic output. Adding constraints (topic, mood, imagery) yields creative results.", realWorldExample: "Content creators who specify tone and angle get 3x better first drafts.", proTip: "Constraints fuel creativity. More specific = more creative AI output." },
  },
  {
    id: "bp-002", category: "basic-prompts", difficulty: "easy",
    prompt: "Get AI to explain recursion simply",
    goal: "Get AI to explain recursion to a beginner",
    answer: "Explain recursion in simple terms with a real-world analogy. Use friendly tone for beginners.",
    masterPrompt: "You are a patient CS tutor. Explain recursion to a complete beginner using a real-world analogy like Russian nesting dolls. Keep it friendly and encouraging. Use bullet points for key concepts.",
    responses: {
      bad: "Recursion is when a function calls itself. It needs a base case to stop. It's used in many algorithms.",
      ok: "Recursion is like looking at a mirror reflecting another mirror — it keeps going until something stops it. In code, a function calls itself with a smaller problem each time.",
      good: "Think of Russian nesting dolls — open one, there's a smaller one inside. Recursion works the same way:\n• A function calls itself with a smaller version of the problem\n• Eventually hits the smallest doll (base case)\n• Then builds the answer back up",
      excellent: "Imagine you're in a line and want to know your position. You ask the person ahead: 'What's your number?' They ask the person ahead of them. This chain continues until someone at the front says '1!' Then each person adds 1 and passes it back.\n\n• **The asking** = recursive call\n• **Person at front** = base case\n• **Passing back** = returning the result\n\nThat's recursion: break a big question into smaller identical questions until you hit an answer you already know.",
    },
    enrichment: { whyItMatters: "How you frame 'explain X' determines whether the output is a textbook definition or genuine understanding.", realWorldExample: "Technical writers who specify audience level and analogy type get documentation that actually helps people.", proTip: "Always specify WHO the explanation is for — it changes everything." },
  },
  {
    id: "bp-003", category: "basic-prompts", difficulty: "easy",
    prompt: "Get AI to write a professional email declining a meeting",
    goal: "Write a polite email declining a meeting invitation",
    answer: "Write a professional, concise email declining a meeting. Keep the tone warm but direct.",
    masterPrompt: "You are an executive assistant. Write a professional email (3-4 sentences) politely declining a meeting invitation due to a scheduling conflict. Tone: warm but direct. Suggest an alternative time next week. Format: subject line + body.",
    responses: {
      bad: "Hi, I can't make the meeting. Sorry about that. Let me know if there's another time.",
      ok: "Hi [Name],\n\nThank you for the invitation. Unfortunately, I have a conflict at that time. Could we find another slot?\n\nBest regards",
      good: "Subject: Re: Meeting Request\n\nHi [Name],\n\nThank you for the invitation. Unfortunately, I have a prior commitment during that time slot. I'd love to connect — would any time next Tuesday or Wednesday afternoon work for you?\n\nBest regards",
      excellent: "Subject: Re: Meeting Request — Alternative Times\n\nHi [Name],\n\nThank you for thinking of me for this discussion. Unfortunately, I have a prior commitment on that date.\n\nI'm keen to connect on this topic. Would either of these work for you?\n• Tuesday 2-3pm\n• Wednesday 10-11am\n\nHappy to adjust if neither fits. Looking forward to it.\n\nWarm regards",
    },
    enrichment: { whyItMatters: "Vague prompts produce vague emails. Specifying length, tone, and what to include (alternative times) gets send-ready drafts.", realWorldExample: "Professionals using AI for email spend 60% less time on revisions when they specify tone and format upfront.", proTip: "Include the ACTION you want the reader to take — it shapes the entire email structure." },
  },
  {
    id: "bp-004", category: "basic-prompts", difficulty: "easy",
    prompt: "Get AI to create a workout plan",
    goal: "Create a 3-day beginner workout plan",
    answer: "Create a 3-day beginner workout plan with specific exercises, sets, and reps. Format as a structured schedule.",
    masterPrompt: "You are a certified personal trainer. Create a 3-day beginner workout plan for someone with no gym experience. Include warm-up, 4-5 exercises per day with sets and reps, and cool-down. Tone: encouraging. Format: structured daily schedule with bullet points.",
    responses: {
      bad: "Do push-ups, squats, and running. Try to work out 3 times a week. Don't forget to stretch.",
      ok: "Day 1: Upper body — push-ups 3x10, dumbbell rows 3x10\nDay 2: Lower body — squats 3x12, lunges 3x10\nDay 3: Full body — planks, burpees, jumping jacks",
      good: "**3-Day Beginner Plan**\n\n**Day 1 — Upper Body**\n• Warm-up: 5 min light cardio\n• Push-ups: 3×8\n• Dumbbell rows: 3×10\n• Overhead press: 3×8\n• Bicep curls: 3×10\n• Cool-down: 5 min stretch\n\n**Day 2 — Lower Body**\n• Warm-up: 5 min walking\n• Bodyweight squats: 3×12\n• Lunges: 3×10 each leg\n• Glute bridges: 3×12\n• Calf raises: 3×15\n• Cool-down: 5 min stretch",
      excellent: "**Beginner 3-Day Program** 🏋️\n*Rest 60-90 seconds between sets. Start light — form over weight.*\n\n**Day 1 — Push (Chest/Shoulders/Triceps)**\n• Warm-up: 5 min incline walk + arm circles\n• Push-ups (knees ok): 3×8-10\n• Dumbbell shoulder press: 3×10 @ 5-10lb\n• Tricep dips (bench): 3×8\n• Chest flyes: 3×10 @ 5lb\n• Cool-down: chest & shoulder stretch, 5 min\n\n**Day 2 — Pull (Back/Biceps)** \n• Warm-up: 5 min rowing or walking\n• Dumbbell rows: 3×10 @ 10lb\n• Lat pulldowns: 3×10\n• Bicep curls: 3×10 @ 5-8lb\n• Face pulls (band): 3×12\n• Cool-down: back & arm stretch\n\n**Day 3 — Legs & Core**\n• Warm-up: 5 min bike or walk\n• Goblet squats: 3×12 @ 10lb\n• Walking lunges: 3×10/leg\n• Glute bridges: 3×15\n• Plank: 3×20 sec\n• Dead bugs: 3×8/side\n• Cool-down: full lower body stretch\n\n*Progress: Add 1-2 reps per week. When you hit the top of the range, increase weight by 2.5-5lb.*",
    },
    enrichment: { whyItMatters: "Without specifying experience level, exercise count, and format, AI produces either too vague or too advanced plans.", realWorldExample: "Fitness influencers who prompt with specific parameters create content their audience can actually follow.", proTip: "Always specify the person's experience level — it's the single biggest lever for useful fitness content." },
  },
  {
    id: "bp-005", category: "basic-prompts", difficulty: "easy",
    prompt: "Get AI to write a product description for headphones",
    goal: "Write a compelling product description for wireless headphones",
    answer: "Write an engaging product description for wireless noise-cancelling headphones. Highlight key features and benefits.",
    masterPrompt: "You are a senior copywriter at a tech brand. Write a product description (100-150 words) for premium wireless noise-cancelling headphones priced at $299. Tone: confident and aspirational. Target audience: professionals who work in noisy environments. Highlight: 40hr battery, ANC, comfort for all-day wear. Format: headline + body + 3 bullet points.",
    responses: {
      bad: "These headphones are wireless and have noise cancelling. They sound good and the battery lasts a long time. You should buy them.",
      ok: "Experience superior sound with our wireless noise-cancelling headphones. Featuring long battery life and comfortable ear cushions, these headphones are perfect for music lovers and professionals alike.",
      good: "**SoundPro X1 — Your World, Your Sound**\n\nBlock out distractions and immerse yourself in crystal-clear audio. The SoundPro X1 combines advanced noise cancellation with premium comfort for all-day listening.\n\n• 40-hour battery life\n• Adaptive noise cancellation\n• Memory foam ear cushions",
      excellent: "**SoundPro X1 — Silence Is Your Superpower**\n\nThe open office disappears. The coffee shop fades away. What's left is just you and your work, wrapped in studio-grade sound.\n\nThe SoundPro X1 was built for professionals who refuse to let noise steal their focus. Adaptive ANC reads your environment 200 times per second, while memory foam cushions make you forget you're wearing them — even at hour 8.\n\n• **40-hour battery** — a full work week on a single charge\n• **Adaptive ANC** — blocks chatter, lets through announcements\n• **All-day comfort** — 237g with pressure-free headband\n\nYour best work happens in silence. At $299, that's a sound investment.",
    },
    enrichment: { whyItMatters: "Generic product prompts get generic copy. Specifying brand voice, target customer, price point, and format gets launch-ready content.", realWorldExample: "E-commerce teams that prompt with customer pain points see 40% higher conversion on product pages.", proTip: "Lead with the BENEFIT (silence, focus) not the FEATURE (noise cancellation). Prompt for benefits-first copy." },
  },
  // ─── Context Setting Category ───
  {
    id: "cs-001", category: "context-setting", difficulty: "easy",
    prompt: "Get AI to debug a Python error — but you need to give it context",
    goal: "Get useful debugging help by providing error context",
    answer: "Share the error message, relevant code, what you expected, and what happened instead.",
    masterPrompt: "You are a senior Python developer. I'm getting a TypeError: 'NoneType' object is not subscriptable on line 15 of my data processing script. The function fetches JSON from an API and accesses response['data']['items']. The API sometimes returns null for the data field. Help me fix this with proper null checking. Show the corrected code with comments explaining each guard.",
    responses: {
      bad: "You probably have a null value somewhere. Try adding some if statements to check for None before accessing the data.",
      ok: "The error means you're trying to access a key on a None value. You should add a check:\n```python\nif response and response.get('data'):\n    items = response['data']['items']\n```",
      good: "The `TypeError: 'NoneType' object is not subscriptable` means `response['data']` is `None`, so accessing `['items']` fails.\n\n**Fix with safe access:**\n```python\ndata = response.get('data')\nif data is not None:\n    items = data.get('items', [])\nelse:\n    items = []\n    logging.warning('API returned null data')\n```\n\nUse `.get()` with defaults to prevent crashes on missing keys.",
      excellent: "**Root cause:** The API occasionally returns `null` for the `data` field, so `response['data']` evaluates to `None`. When you then access `None['items']`, Python raises `TypeError`.\n\n**Corrected code:**\n```python\ndef process_response(response: dict) -> list:\n    \"\"\"Safely extract items from API response.\"\"\"\n    # Guard 1: Ensure response exists\n    if not response:\n        logging.error('Empty API response')\n        return []\n    \n    # Guard 2: Safely access nested 'data' field\n    data = response.get('data')\n    if data is None:\n        logging.warning('API returned null data field')\n        return []\n    \n    # Guard 3: Safely access 'items' with fallback\n    items = data.get('items', [])\n    \n    if not items:\n        logging.info('No items in response')\n    \n    return items\n```\n\n**Why this works:** Each level of nesting gets its own guard. `.get()` returns `None` (or a default) instead of raising `KeyError`. The logging helps you trace which guard caught the issue in production.",
    },
    enrichment: { whyItMatters: "Debugging prompts without context force AI to guess. Including the error, code, and expected behavior turns AI into a senior pair programmer.", realWorldExample: "Developers who paste full error context get working solutions 80% of the time vs 20% for 'my code doesn't work' prompts.", proTip: "Always include: error message, relevant code, expected vs actual behavior, and what you've already tried." },
  },
  {
    id: "cs-002", category: "context-setting", difficulty: "easy",
    prompt: "Get AI to help plan a birthday party — with context about the person",
    goal: "Get a personalized party plan by providing context about the birthday person",
    answer: "Include details about the person's interests, age, budget, guest count, and preferences.",
    masterPrompt: "You are an event planner. Help me plan a 30th birthday party for my friend who loves 90s hip-hop, sneaker culture, and arcade games. Budget: $500. Guest count: 20 people. Venue: my backyard. They're introverted so no surprise element. Suggest a theme, decorations, food, playlist approach, and one memorable activity. Format: organized sections.",
    responses: {
      bad: "For a birthday party, you could get a cake, some decorations, and play music. Maybe order pizza and have some games.",
      ok: "For a 30th birthday, consider a themed party! You could do a retro theme with classic snacks, a playlist of their favorite music, and some fun activities. Set up a photo booth and get a custom cake.",
      good: "**90s Hip-Hop Birthday Bash**\n\n**Theme:** 'Fresh Prince' backyard jam\n**Decorations:** Gold & black balloons, boombox centerpieces, sneaker display\n**Food ($200):** Slider bar, loaded nachos, custom cake with sneaker topper\n**Music:** 90s hip-hop playlist (Tribe, Wu-Tang, Biggie, Outkast)\n**Activity:** Sneaker customization station with fabric markers\n**Vibe:** Chill, no surprises — let the birthday person arrive first and settle in",
      excellent: "**'FRESH KICKS & CLASSIC HITS' — 30th Birthday Bash**\n\n🎂 **The Vibe:** A chill backyard hangout that feels like a 90s block party, not a surprise ambush. Your friend arrives first, helps set the mood.\n\n**🎨 Decor ($80)**\n• Gold & black balloon arch (DIY kit ~$25)\n• Printable 90s album covers as wall art\n• Sneaker display shelf with fairy lights\n• Boombox centerpieces from thrift stores\n\n**🍔 Food & Drinks ($200)**\n• Build-your-own slider bar (beef, chicken, veggie)\n• Loaded nacho station\n• '90s candy table (Ring Pops, Gushers, Dunkaroos)\n• Custom cake: sneaker box design, ordered from local baker\n• Themed drinks: 'Gin & Juice', 'California Love' mocktail\n\n**🎵 Music**\n• Pre-party: Lo-fi hip-hop\n• Main: curated 90s playlist (Tribe, Wu-Tang, Biggie, Lauryn Hill, OutKast)\n• Wind-down: 90s R&B (D'Angelo, Erykah Badu)\n\n**🎮 Activity ($120)**\n• Rent a retro arcade cabinet (1-2 machines)\n• Sneaker customization station with fabric markers & stencils\n• 'Best Bars' card game — guests write/vote on lyrics\n\n**💡 Introvert-Friendly Touches**\n• No surprise entrance — friend arrives 30 min early\n• Multiple zones: loud zone (arcade/music) + quiet zone (seating/snacks)\n• Group activities are opt-in, never forced\n\n**Remaining budget: ~$100** for drinks, supplies, and a backup fund.",
    },
    enrichment: { whyItMatters: "Without context about the person, AI generates generic party advice. Context transforms generic into deeply personal.", realWorldExample: "Event planners who feed AI specific client preferences cut planning time by 70% while delivering more personalized experiences.", proTip: "The more specific your context, the less editing you'll need. Include personality traits, not just demographics." },
  },
  {
    id: "cs-003", category: "context-setting", difficulty: "easy",
    prompt: "Get AI to write a cover letter — provide your background",
    goal: "Get a tailored cover letter by giving AI your professional context",
    answer: "Include your experience, the specific role, key achievements, and why you want this particular job.",
    masterPrompt: "You are a career coach. Write a cover letter for a Senior Frontend Developer role at Shopify. My background: 5 years React/TypeScript, led migration from Angular to React at a fintech startup (40% performance improvement), passionate about accessibility. I'm drawn to Shopify because of their merchant-first philosophy and open-source contributions. Tone: confident but genuine. Format: 3 paragraphs, under 300 words.",
    responses: {
      bad: "Dear Hiring Manager,\n\nI am writing to apply for the developer position at your company. I have experience with programming and would be a great fit. I am a hard worker and team player.\n\nSincerely,\n[Name]",
      ok: "Dear Hiring Manager,\n\nI'm excited to apply for the Senior Frontend Developer role at Shopify. With 5 years of experience in React and TypeScript, I believe I'd be a strong addition to your team.\n\nIn my current role, I've led significant projects and improved application performance. I'm particularly interested in Shopify's approach to developer tools.\n\nI look forward to discussing how my experience can benefit your team.\n\nBest regards",
      good: "Dear Shopify Hiring Team,\n\nI'm applying for the Senior Frontend Developer position because Shopify's merchant-first philosophy aligns with how I think about building software — every technical decision should serve real people.\n\nOver 5 years of React and TypeScript development, I've specialized in large-scale frontend architecture. At [Fintech Startup], I led our Angular-to-React migration, resulting in a 40% performance improvement and significantly better developer experience. I'm also passionate about web accessibility and have implemented WCAG 2.1 AA compliance across multiple products.\n\nI'm drawn to Shopify's commitment to open source and would love to bring my architecture and accessibility expertise to your team.\n\nBest regards",
      excellent: "Dear Shopify Hiring Team,\n\nI've spent the last 5 years obsessed with one question: how do you build frontends that are fast for users AND maintainable for teams? That question led me to React, TypeScript, and eventually to this role — because Shopify answers it better than anyone.\n\nAt [Fintech Startup], I led our Angular-to-React migration serving 200K+ users. The result: 40% faster load times, 60% fewer UI bugs, and a component library that let our team ship features 3x faster. I didn't just write the code — I designed the migration strategy that let us ship incrementally with zero downtime. I've also become the team's accessibility champion, implementing WCAG 2.1 AA compliance because I believe great UX means UX for everyone.\n\nShopify's merchant-first philosophy resonates deeply with me. Your open-source contributions to React tooling (Hydrogen, Polaris) show a company that builds for the ecosystem, not just themselves. I want to bring my architecture and a11y expertise to that mission.\n\nI'd love to discuss how I can contribute to your frontend team.\n\nWarm regards",
    },
    enrichment: { whyItMatters: "AI can't write about your specific achievements without context. The difference between a generic and compelling cover letter is YOUR details.", realWorldExample: "Job seekers who provide specific metrics and company-specific reasons get 5x more interview callbacks.", proTip: "Include WHY this company specifically — it's the #1 thing hiring managers look for and the #1 thing candidates skip." },
  },
  {
    id: "cs-004", category: "context-setting", difficulty: "easy",
    prompt: "Get AI to suggest a tech stack — but give it your project constraints",
    goal: "Get relevant tech recommendations by providing project context",
    answer: "Include project type, team size, timeline, budget constraints, and what your team already knows.",
    masterPrompt: "You are a solutions architect. I'm building a real-time dashboard for IoT sensor data. Constraints: 2-person team, both strong in Python, weak in DevOps. Timeline: MVP in 6 weeks. Budget: $0 for tools (open-source only). Expected load: 50 sensors sending data every 5 seconds. Must run on a $20/month VPS. Suggest a tech stack with brief justification for each choice. Format: table with columns: Layer, Choice, Why.",
    responses: {
      bad: "Use React for the frontend, Node.js for the backend, and MongoDB for the database. Add WebSockets for real-time data.",
      ok: "For a real-time IoT dashboard, consider:\n- Frontend: React with Chart.js\n- Backend: FastAPI (since you know Python)\n- Database: InfluxDB for time-series data\n- Real-time: WebSockets\n- Deploy: Docker on your VPS",
      good: "**IoT Dashboard Stack (Python-focused, budget-friendly)**\n\n| Layer | Choice | Why |\n|-------|--------|-----|\n| Frontend | React + Recharts | Lightweight charting, good docs |\n| Backend | FastAPI | Python, async support, auto-docs |\n| Database | TimescaleDB | Time-series on Postgres (you may know it) |\n| Real-time | Server-Sent Events | Simpler than WebSockets for one-way data |\n| Deploy | Docker Compose | Single command deploy, fits $20 VPS |\n\nThis keeps everything in your Python comfort zone while handling 50 sensors easily.",
      excellent: "**IoT Dashboard Stack — Optimized for Your Constraints**\n\n*Team: 2 Python devs | Timeline: 6 weeks | Budget: $0 tools, $20/month infra*\n\n| Layer | Choice | Why This, Not That |\n|-------|--------|--------------------|\n| **API** | FastAPI | Python-native, async, auto OpenAPI docs. Not Flask — you need async for 50 concurrent sensor streams |\n| **Real-time** | SSE (Server-Sent Events) | One-way server→client is all you need. Not WebSockets — simpler, no library needed, works through proxies |\n| **Time-series DB** | QuestDB | Purpose-built for IoT, SQL interface (familiar), 10x faster ingest than TimescaleDB on small hardware |\n| **Frontend** | HTMX + Alpine.js | No build step, no React learning curve. SSE support built-in. MVP in days, not weeks |\n| **Charts** | Lightweight Charts (TradingView) | 50KB, GPU-accelerated, handles streaming data natively |\n| **Deploy** | Docker Compose + Caddy | One `docker-compose up`. Caddy handles HTTPS automatically. Fits in 1GB RAM easily |\n\n**Why this works on $20/month:**\n• QuestDB + FastAPI + Caddy ≈ 600MB RAM\n• 50 sensors × 1 msg/5sec = 10 msg/sec — trivial load\n• No external services, no API costs\n\n**6-Week Timeline:**\n• Week 1-2: FastAPI + QuestDB ingestion pipeline\n• Week 3-4: HTMX dashboard with live charts\n• Week 5: Alerting + historical queries\n• Week 6: Polish + deploy",
    },
    enrichment: { whyItMatters: "Without constraints, AI recommends the 'best' stack overall — which is rarely the best stack for YOU. Context about team skills, timeline, and budget changes everything.", realWorldExample: "CTOs who specify constraints in architecture prompts avoid the trap of over-engineered solutions their team can't maintain.", proTip: "Always include what your team DOESN'T know — it's as important as what they do know for stack decisions." },
  },
  {
    id: "cs-005", category: "context-setting", difficulty: "easy",
    prompt: "Get AI to write a commit message — give it the diff context",
    goal: "Get a meaningful commit message by providing change context",
    answer: "Include what changed, why it changed, and what it affects. Not just the file names.",
    masterPrompt: "You are a senior developer following conventional commits. Write a commit message for this change: I refactored the user authentication middleware to use JWT refresh tokens instead of session cookies. This fixes the issue where users were getting logged out every 30 minutes on mobile browsers that aggressively clear cookies. The change affects: auth middleware, login endpoint, and the React auth context. No breaking API changes — the login response now includes a refreshToken field alongside the existing token.",
    responses: {
      bad: "Updated auth files",
      ok: "refactor: update authentication to use JWT refresh tokens\n\nChanged from session cookies to refresh tokens to fix mobile logout issues.",
      good: "refactor(auth): migrate from session cookies to JWT refresh tokens\n\nMobile browsers aggressively clearing cookies caused users to be logged out\nevery 30 minutes. Refresh tokens persist through cookie purges.\n\nAffected: auth middleware, login endpoint, React auth context\nNo breaking changes — refreshToken added alongside existing token field",
      excellent: "refactor(auth): replace session cookies with JWT refresh tokens\n\nFixes #247 — users on mobile Safari and Chrome were involuntarily\nlogged out every ~30 minutes due to aggressive cookie clearing\npolicies (ITP on Safari, SameSite enforcement on Chrome).\n\nChanges:\n- Auth middleware now validates refresh tokens from Authorization header\n- Login endpoint returns { token, refreshToken } (non-breaking addition)\n- React AuthContext handles silent token refresh on 401 responses\n- Refresh tokens expire in 7 days (configurable via AUTH_REFRESH_TTL)\n\nTesting:\n- Verified 8-hour session persistence on iOS Safari\n- Existing session-based auth still works during migration window\n- Added refresh token rotation to prevent replay attacks\n\nMigration: Existing users will be asked to re-login once. No data loss.",
    },
    enrichment: { whyItMatters: "Commit messages without context are archaeological nightmares. Future you (and your team) will thank present you for explaining WHY, not just WHAT.", realWorldExample: "Teams with descriptive commit messages resolve production incidents 50% faster because they can trace changes to their reasoning.", proTip: "The best commit messages answer three questions: What changed? Why? What does someone reviewing this need to know?" },
  },
];

export function getItemsByCategory(categoryId: string): ContentItem[] {
  return items.filter((item) => item.category === categoryId);
}

export function getItemsByLevel(categoryId: string, levelId: number): ContentItem[] {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return [];
  const level = category.levels.find((l) => l.id === levelId);
  if (!level) return [];
  return level.items
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is PromptItem => item !== undefined);
}

export function getPromptItem(id: string): PromptItem | undefined {
  return items.find((item) => item.id === id);
}
