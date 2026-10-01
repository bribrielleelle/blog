import { Author, Category, Post } from '../types';

export const primaryAuthor: Author = {
  name: 'Brielle Davis',
  role: 'Designer, Writer & Creative Technologist',
  bio: 'Exploring the intersection of deliberate design, slow living, and digital craftsmanship. Writing from a sunlit studio with a cup of ceremonial sencha.',
  avatar: '/src/assets/images/author_portrait_1790823212358.jpg',
  location: 'Pacific Northwest',
  socials: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
  },
};

export const categories: Category[] = [
  {
    id: 'design',
    name: 'Design & Craft',
    slug: 'design-craft',
    description: 'Explorations in physical spaces, typography, interface poetry, and timeless aesthetic restraint.',
    count: 4,
  },
  {
    id: 'slow-living',
    name: 'Slow Living',
    slug: 'slow-living',
    description: 'Rituals of stillness, morning silence, seasonal rhythms, and resisting the friction of constant acceleration.',
    count: 3,
  },
  {
    id: 'creative-work',
    name: 'Creative Practice',
    slug: 'creative-practice',
    description: 'Notebooks, tactile tools, drafting habits, overcoming creative dry spells, and shipping honest work.',
    count: 3,
  },
  {
    id: 'mindful-tech',
    name: 'Mindful Tech',
    slug: 'mindful-tech',
    description: 'Calm computing, digital hygiene, decluttering interfaces, and reclaiming cognitive sovereignty.',
    count: 2,
  },
];

export const posts: Post[] = [
  {
    id: '1',
    slug: 'the-architecture-of-light-and-shadow',
    title: 'The Architecture of Light and Shadow in Daily Spaces',
    subtitle: 'How natural daylight shapes our circadian focus, spatial intimacy, and creative clarity.',
    excerpt: 'We often think of rooms as compositions of timber and stone, forgetting that daylight is the true architect of how a room feels. Here is what happened when I redesigned my living quarters around morning sun angles.',
    coverImage: '/src/assets/images/post_architecture_light_1790823232716.jpg',
    coverImageCaption: 'Fig. 01 — Morning limestone reflections in the south studio at 07:45 AM.',
    category: 'Design & Craft',
    tags: ['Architecture', 'Natural Light', 'Minimalism', 'Interior Space'],
    date: '2026-09-22',
    formattedDate: 'September 22, 2026',
    readTime: '6 min read',
    featured: true,
    author: primaryAuthor,
    sections: [
      {
        id: 'the-unseen-material',
        title: 'Light as an Unseen Building Material',
        content: [
          'In traditional Japanese carpentry, light is not treated as an external visitor that merely illuminates objects; it is sculpted as an active physical dimension of the room itself. Jun’ichirō Tanizaki famously observed in In Praise of Shadows that beauty loses its essence when exposed to relentless overhead brilliance. Instead, it is found in the gradation of dimness, where amber shadows pool gently along warm timber joints.',
          'For the past four months, I observed the sunlight tracking across my desk. By removing heavy fabric drapes and replacing them with unbleached organic linen scrims, the room transformed from a static box into an hourglass measuring the quiet progression of the day.',
        ],
        quote: 'A room with one generous source of daylight will always feel calmer than a room drowned in twelve recessed ceiling LEDs.',
        subsections: [
          {
            id: 'raking-morning-light',
            title: 'Raking Morning Light and Circadian Reset',
            content: [
              'Morning light contains a higher frequency of blue-enriched photons that prompt our adrenal rhythm without the spike of harsh stimulants. Positioning writing surfaces perpendicularly to east-facing casements prevents glare on paper while ensuring that the eye constantly rests upon soft horizon illumination.',
            ],
          },
          {
            id: 'the-geometry-of-openings',
            title: 'The Geometry of Apertures',
            content: [
              'It is not the size of a window that matters, but its depth in the wall. Deep jambs bevel the transition between the bright exterior and the dim interior, eliminating visual shock and giving light a soft, liquid threshold to cascade over.',
            ],
          },
        ],
      },
      {
        id: 'eliminating-visual-friction',
        title: 'Eliminating Overhead Visual Friction',
        content: [
          'Most modern homes suffer from ceiling clutter: a constellation of recessed cans, fire sensors, and fluorescent glare that mimics an industrial warehouse. When we replace overhead illumination with floor lamps positioned below eye level, our nervous system relaxes into the evening.',
          'Consider using warm incandescent-spectrum bulbs (2200K to 2400K) or honest beeswax tapers for after-dinner hours. The human retina is biologically wired to anticipate low-angled embers as the sun slips below the tree canopy.',
        ],
        quote: 'When the shadows are permitted to stay, the room begins to breathe.',
      },
      {
        id: 'practical-adjustments',
        title: 'Three Practical Shifts for Your Quarters',
        content: [
          '1. Align your primary creative seat so that light falls over your non-dominant shoulder, preventing hand cast shadows during handwriting or sketching.',
          '2. Swap slick reflective surfaces for matte limewash, unfinished walnut, or unglazed ceramic vessels that absorb harsh reflections.',
          '3. Keep one corner of your study in deliberate semi-darkness. Every room needs a quiet recess where the eye can retreat from continuous stimulation.',
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'the-lost-art-of-the-analog-morning',
    title: 'The Lost Art of the Analog Morning: Reclaiming the First Hour',
    subtitle: 'Why leaving your phone in another room until 08:30 will quietly transform your creative output.',
    excerpt: 'For seven years, my mornings began with the blue-lit rectangle of notifications. Stepping into an intentional analog ritual revealed just how much cognitive energy was being siphoned before my feet even touched the floor.',
    coverImage: '/src/assets/images/post_slow_living_1790823243303.jpg',
    coverImageCaption: 'Fig. 02 — Steeping coarse-cut green tea on the raw cedar sill.',
    category: 'Slow Living',
    tags: ['Slow Living', 'Rituals', 'Analog', 'Mindfulness'],
    date: '2026-09-14',
    formattedDate: 'September 14, 2026',
    readTime: '5 min read',
    featured: false,
    author: primaryAuthor,
    sections: [
      {
        id: 'the-notification-trap',
        title: 'The Notification Ambush',
        content: [
          'To wake up and immediately unlock a glass screen is to invite five hundred distant voices, breaking headlines, and pending obligations directly into your bedroom before your eyes have even accommodated to natural daylight.',
          'The psychological consequence is immediate reactivity: you enter the waking world defensively, responding to other people’s priorities rather than establishing your own center of gravity.',
        ],
        quote: 'Your mind upon waking is like fresh snow; whatever walks across it first leaves deep footprints that linger all day.',
      },
      {
        id: 'building-the-analog-buffer',
        title: 'Building the Analog Buffer',
        content: [
          'The solution is disarmingly simple, yet requires deliberate friction: a mechanical wind-up alarm clock on your bedside table, and your smartphone charging outside the bedroom door.',
          'During the first forty-five minutes of the day, no digital device is engaged. Instead, the sequence is rooted in tactile, sensory engagement: boiling water in a cast-iron kettle, grinding beans by hand, and opening a blank notebook to record whatever residue of dreams or loose thoughts remain.',
        ],
        subsections: [
          {
            id: 'the-physical-journal',
            title: 'Why Ink on Paper Still Outperforms Glass',
            content: [
              'There is no cursor blinking aggressively in a paper notebook. Paper does not notify you of someone else’s status update. The physical resistance of a fountain pen nib creates a natural pacing mechanism, forcing thoughts to slow down to the speed of your hand.',
            ],
          },
        ],
      },
      {
        id: 'the-ripple-effect',
        title: 'The Ripple Effect Through Midday',
        content: [
          'What happens in those first sixty minutes determines the cognitive tone for the entire afternoon. Readers who adopt this simple analog buffer report a marked decline in midday brain fog and a renewed appetite for deep, single-task work.',
        ],
      },
    ],
  },
  {
    id: '3',
    slug: 'the-craft-of-tangible-tools',
    title: 'The Craft of Tangible Tools: Why Physical Mediums Endure',
    subtitle: 'In an era of fleeting software and digital ephemera, why physical artifacts bring deep grounding.',
    excerpt: 'Software tools updates vanish overnight, leaving no trace behind. But pick up a fifty-year-old drafting compass or a brass mechanical pencil, and the patina tells a story of enduring human intentionality.',
    coverImage: '/src/assets/images/post_creative_process_1790823253220.jpg',
    coverImageCaption: 'Fig. 03 — Specimen sheets, iron gall ink, and walnut drafting triangle.',
    category: 'Creative Practice',
    tags: ['Tools', 'Craftsmanship', 'Stationery', 'Creative Practice'],
    date: '2026-08-28',
    formattedDate: 'August 28, 2026',
    readTime: '7 min read',
    featured: false,
    author: primaryAuthor,
    sections: [
      {
        id: 'the-problem-with-immateriality',
        title: 'The Problem with Immateriality',
        content: [
          'Digital files are frictionless to create, yet that very lack of friction often diminishes our emotional commitment to the work. When an idea can be endlessly duplicated, backed up, and erased with a keystroke, it risks feeling inconsequential.',
          'A physical notebook, by contrast, possesses heft and spatial memory. You remember that a specific insight lived on the top-right corner of a cream page with a faint coffee ring near the binding.',
        ],
        quote: 'Physical objects anchor our thoughts in geographic reality. They resist being swept away in the digital torrent.',
      },
      {
        id: 'anatomy-of-a-lifetime-tool',
        title: 'Anatomy of a Lifetime Tool',
        content: [
          'What separates an disposable commodity from a heirloom tool? It comes down to repairability, honest materials, and an aesthetic that improves with abrasion.',
          'Consider brass instruments: unlacquered brass oxidizes over years of human touch, developing a darkened golden sheen that is unique to the owner’s fingertips.',
        ],
        subsections: [
          {
            id: 'choosing-with-care',
            title: 'Choosing with Care over Accumulation',
            content: [
              'Slow craft is never about collecting excessive gear. In truth, it is the exact opposite: identifying the two or three instruments that sit naturally in your grip, and using them until they become extensions of your thought.',
            ],
          },
        ],
      },
      {
        id: 'preserving-the-archive',
        title: 'Preserving the Archive of Self',
        content: [
          'When you look back through ten years of handwritten journals on a studio shelf, you see your own growth preserved with forensic honesty. You see the hesitation in a faded ink stroke and the confidence in a bold strike of the pen.',
        ],
      },
    ],
  },
  {
    id: '4',
    slug: 'designing-a-quiet-workspace',
    title: 'Designing a Quiet Workspace: A Field Guide to Stillness',
    subtitle: 'Principles for sculpting a domestic studio that invites deep concentration and calm focus.',
    excerpt: 'The spaces where we think shape what we think. By carefully curating desk depth, acoustic buffers, and visual calm, we can build a physical sanctuary against endless online distraction.',
    coverImage: '/src/assets/images/hero_editorial_workspace_1790823223395.jpg',
    coverImageCaption: 'Fig. 04 — The northwest corner of my working table with unbleached cotton blotter.',
    category: 'Design & Craft',
    tags: ['Workspace', 'Deep Work', 'Studio Design', 'Focus'],
    date: '2026-08-10',
    formattedDate: 'August 10, 2026',
    readTime: '6 min read',
    featured: false,
    author: primaryAuthor,
    sections: [
      {
        id: 'the-desktop-as-cognitive-field',
        title: 'The Desktop as a Cognitive Field',
        content: [
          'Every object in your peripheral vision makes a subtle claim on your brain’s attentional budget. An open stack of unopened mail, a tangled web of black cables, or a flashing battery indicator constantly whispers in the background.',
          'When you clear the perimeter of your working table to bare wood, your gaze has room to expand. Mental stamina increases because the brain is no longer expending micro-joules filtering out peripheral noise.',
        ],
        quote: 'A clean desk is not an act of sterile perfectionism; it is a kindness paid to your future attention span.',
      },
      {
        id: 'sensory-acoustics',
        title: 'Sensory Acoustics and Tactile Depth',
        content: [
          'Hard, echoey rooms tire the auditory system. Introducing woven wool rugs, heavy linen drapery, and shelves lined with unjacketed books creates a gentle acoustic deadening that mimics the tranquility of a library reading room.',
          'In such an environment, the soft scritch of a graphite lead on rag paper sounds like music rather than a lonely chore.',
        ],
      },
      {
        id: 'the-three-zone-desk',
        title: 'The Three-Zone System',
        content: [
          'In my own studio, the desk is strictly partitioned into three physical sectors:',
          'Zone 1 (Center): The active work zone. Only the current draft or project is permitted here.',
          'Zone 2 (Left): The analog staging area. A notebook, a water glass, and reference index cards.',
          'Zone 3 (Right): The tool dock. Pen rest, brass clip tray, and mechanical timer.',
        ],
      },
    ],
  },
  {
    id: '5',
    slug: 'the-quiet-revolution-of-calm-interfaces',
    title: 'The Quiet Revolution of Calm Interfaces',
    subtitle: 'Moving away from red badges, algorithmic dopamine loops, and manufactured urgency.',
    excerpt: 'What would technology look like if it were designed like a quiet park bench rather than a flashing casino floor? A personal manifesto on gentle software.',
    coverImage: '/src/assets/images/post_architecture_light_1790823232716.jpg',
    coverImageCaption: 'Fig. 05 — Restrained monochrome interfaces displaying high visual dignity.',
    category: 'Mindful Tech',
    tags: ['UX Design', 'Calm Tech', 'Typography', 'Digital Wellbeing'],
    date: '2026-07-19',
    formattedDate: 'July 19, 2026',
    readTime: '5 min read',
    featured: false,
    author: primaryAuthor,
    sections: [
      {
        id: 'the-tyranny-of-red-dots',
        title: 'The Tyranny of the Red Dot',
        content: [
          'Evolution trained primates to treat sudden flashes of red as existential signals: ripe fruit, blood, or danger. When modern software designers hijacked that color for routine marketing pings and engagement reminders, they weaponized our biology against us.',
          'Calm technology respects human limits. It waits patiently in the background until invoked, and delivers its information with the gentle clarity of a wristwatch.',
        ],
        quote: 'Good technology should inform without demanding worship or panic.',
      },
      {
        id: 'principles-of-gentle-design',
        title: 'Principles of Gentle Digital Craft',
        content: [
          '1. Asynchronous by default: Never assume the recipient must respond within seconds.',
          '2. High typographic contrast with low chroma: Let readable letterforms carry meaning rather than bright candy colors.',
          '3. Clear boundaries: A software tool should have a definitive state of "done for today" instead of infinite algorithmic feeds.',
        ],
      },
    ],
  },
  {
    id: '6',
    slug: 'on-keeping-a-commonplace-book',
    title: 'On Keeping a Commonplace Book: An Intellectual Treasury',
    subtitle: 'How centuries of thinkers curated their own personal knowledge before bookmarks existed.',
    excerpt: 'Long before search engines and browser bookmarks, Erasmus, Virginia Woolf, and Marcus Aurelius maintained hand-bound volumes of quotes, recipes, sketches, and epiphanies.',
    coverImage: '/src/assets/images/post_creative_process_1790823253220.jpg',
    coverImageCaption: 'Fig. 06 — Bound cloth ledger with handwritten marginalia and indexed quotes.',
    category: 'Creative Practice',
    tags: ['Commonplace Book', 'Reading', 'Writing', 'Thinking'],
    date: '2026-06-30',
    formattedDate: 'June 30, 2026',
    readTime: '4 min read',
    featured: false,
    author: primaryAuthor,
    sections: [
      {
        id: 'what-is-a-commonplace',
        title: 'What Is a Commonplace Book?',
        content: [
          'A commonplace book is not a personal diary of emotional grievances, nor is it a sterile index of textbook definitions. It is a curated intellectual compost pile: passages that arrested you in a novel, fragments of overheard conversations, architectural dimensions, and poetic lines that made your pulse quicken.',
        ],
        quote: 'We read to find words for things we have always felt but could never articulate.',
      },
      {
        id: 'how-to-begin',
        title: 'How to Begin Your Own Archive',
        content: [
          'Choose a durable hardbound volume with acid-free paper. Whenever you read something that strikes a chord, do not merely highlight it on an e-reader to be forgotten in cloud storage. Copy it out by hand.',
          'The motor act of forming the letters cements the insight in your memory, transforming an author’s passing thought into a permanent tenant of your mind.',
        ],
      },
    ],
  },
];

export const initialComments: Record<string, import('../types').Comment[]> = {
  '1': [
    {
      id: 'c1',
      postId: '1',
      author: 'Clara Vance',
      avatarInitials: 'CV',
      date: 'September 23, 2026',
      content: 'The distinction between window size and window jamb depth resonated so deeply. I recently replaced our bedroom curtains with raw linen scrims and the morning light is practically liquid now.',
      likes: 12,
    },
    {
      id: 'c2',
      postId: '1',
      author: 'Julian Thorne',
      avatarInitials: 'JT',
      date: 'September 24, 2026',
      content: 'Tanizaki’s book completely altered my view on interior lighting. Thank you for bringing that philosophy into modern domestic design with such warmth.',
      likes: 8,
    },
  ],
  '2': [
    {
      id: 'c3',
      postId: '2',
      author: 'Marcus Lin',
      avatarInitials: 'ML',
      date: 'September 15, 2026',
      content: 'Bought a classic mechanical alarm clock after reading this draft last week. Leaving my phone downstairs overnight has eliminated morning doomscrolling entirely.',
      likes: 19,
    },
  ],
  '3': [
    {
      id: 'c4',
      postId: '3',
      author: 'Evelyn St. Clair',
      avatarInitials: 'ES',
      date: 'August 29, 2026',
      content: 'The patina of brass and the tactile resistance of cotton rag paper cannot be simulated. This essay makes me want to pull out my fountain pen immediately.',
      likes: 14,
    },
  ],
};
