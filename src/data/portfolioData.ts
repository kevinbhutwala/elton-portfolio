import { Project, Service, ProcessStage, Testimonial, StatItem, BTSFrame } from '@/types';

export const bioData = {
  name: "Elton D'Mello",
  primaryTitle: 'Video Editor & Visual Storyteller',
  secondaryTitles: ['Video Editor', 'Visual Storyteller', 'Colorist'],
  tagline: 'Cutting moments. Shaping rhythm. Creating emotion.',
  supportingLine: 'Goa & Bangalore, India · Available Globally',
  location: 'GOA / BLR, INDIA',
  instagramUrl: 'https://www.instagram.com/_elton.dmello___/',
  instagramHandle: '@_elton.dmello___',
  photo: '/images/elton-dmello.jpg',
  availability: 'AVAILABLE FOR PROJECTS',
  aboutHeading: 'About Elton',
  aboutBio:
    'Elton D’Mello is a professional video editor and visual storyteller based in Goa and Bangalore, India. Specializing in high-impact commercial films, music visuals, luxury automotive reels, and high-retention vertical content, he shapes raw footage into polished, rhythm-driven stories that captivate audiences.',
  quote: 'Editing isn’t about joining shots. It’s about dictating how people feel between the cuts.',
  specs: [
    { label: 'Primary Focus', value: 'Commercial Films · Music Videos · 9:16 Reels' },
    { label: 'Software Suites', value: 'DaVinci Resolve Studio · Adobe Premiere Pro' },
    { label: 'Finishing Craft', value: 'Color Grading · Sound Design · Pacing' },
    { label: 'Location & Base', value: 'Goa · Bangalore · Global Remote' },
  ],
};

export const projectsData: Project[] = [
  {
    id: 'wayanad-cinematics',
    number: '01',
    title: 'WAYANAD CINEMATICS',
    subtitle: 'Widescreen Travel & Nature Odyssey',
    client: 'Kerala Tourism & Independent Production',
    year: '2025',
    category: 'Commercial',
    duration: '01:28',
    aspect: '16:9 / 2.39:1 Horizontal',
    fps: '24.000 FPS',
    camera: 'Sony FX3 + Cine Primes',
    software: ['Premiere Pro', 'DaVinci Resolve Studio'],
    videoUrl: '/videos/wayanad-cinematics.mov',
    isVertical: false,
    synopsis:
      'A breathtaking widescreen landscape film tracking mist-shrouded mountain peaks, lush valleys, and atmospheric Kerala wilderness with deliberate, breathing cuts.',
    concept:
      'Allow the majestic scale of nature to command the frame. Long, patient camera moves paired with subtle speed transitions and rich emerald/earth color grading.',
    editDecisions: [
      'Extended negative space holds before transitioning on drone horizon reveals',
      'Gentle dissolve and match cuts aligned to acoustic string resonances',
      'Rich contrast grading preserving deep shadow detail in misty rainforest canopies',
    ],
    rawImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80',
    gradeImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
    ],
    soundDesignNotes:
      'Binaural forest recordings, wind rustling through tea estate foliage, deep sub-ambient pulses.',
  },
  {
    id: 'supercars-dubai',
    number: '02',
    title: 'SUPERCARS DUBAI',
    subtitle: 'High-Octane Luxury Automotive Reel',
    client: 'Exotic Motors Dubai',
    year: '2025',
    category: 'Commercial',
    duration: '00:38',
    aspect: '9:16 Vertical',
    fps: '60.000 / 24.000 FPS',
    camera: 'Sony FX3 + G Master Lenses',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    videoUrl: '/videos/supercars-dubai.mp4',
    isVertical: true,
    synopsis:
      'A razor-sharp vertical edit capturing elite hypercars cruising nocturnal Dubai boulevards with precision match cutting and turbo audio transients.',
    concept:
      'Match cuts on headlights, spinning wheels, and aerodynamic carbon fiber curves synchronized with roaring V10 exhausts and bass drops.',
    editDecisions: [
      'Sub-second whip transitions between drifting maneuvers',
      'Punched-in macro cuts on emblems and digital speedometers',
      'High-contrast neon city grade with deep carbon blacks',
    ],
    rawImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80',
    gradeImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    ],
    soundDesignNotes:
      'High-displacement exhaust rumbles, twin-turbo spool wheezes, and visceral tire squeal foley.',
  },
  {
    id: 'goa-auto-expo',
    number: '03',
    title: 'GOA AUTO EXPO',
    subtitle: 'Event & Exhibition Reel',
    client: 'Goa Automotive Showcase',
    year: '2025',
    category: 'Campaign',
    duration: '00:52',
    aspect: '9:16 Vertical',
    fps: '50.000 / 25.000 FPS',
    camera: 'Blackmagic Pocket Cinema 6K',
    software: ['Premiere Pro', 'DaVinci Resolve'],
    videoUrl: '/videos/goa-auto-expo.mp4',
    isVertical: true,
    synopsis:
      'Fast-paced event film documenting custom modifications, vintage classics, and performance tuning at the Goa Auto Expo.',
    concept:
      'Deliver high retention and excitement for modern social algorithms while honoring the craftsmanship of motor engineers.',
    editDecisions: [
      'Rhythmic speed ramps highlighting custom rims and paint reflections',
      'Staggered bass hits aligned with crowd reactions and rev battles',
      'Warm coastal sunset color palette contrasted against chrome metal',
    ],
    rawImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1800&q=80',
    gradeImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
    ],
    soundDesignNotes:
      'Engine rev crescendos, energetic electronic beat syncs, and spatial applause.',
  },
  {
    id: 'dj-doel-blr',
    number: '04',
    title: 'DJ DOEL 21A BLR',
    subtitle: 'High-Energy Music & Nightclub Visual',
    client: '21A Club Bangalore',
    year: '2024',
    category: 'Music Video',
    duration: '00:44',
    aspect: '9:16 Vertical',
    fps: '24.000 FPS',
    camera: 'Sony A7S III',
    software: ['Premiere Pro', 'After Effects'],
    videoUrl: '/videos/dj-doel-blr.mp4',
    isVertical: true,
    synopsis:
      'An electric club recap capturing DJ Doel rocking Bangalore’s 21A with strobe cuts, bass drops, and infectious dancefloor momentum.',
    concept:
      'The timeline is locked to the beat. Every laser pulse, mixer knob twist, and crowd jump lands on exact 16th-note subdivisions.',
    editDecisions: [
      'Flash frame strobes mimicking club lighting fixtures',
      'Glitch displacement cuts connecting the DJ deck to screaming festival crowds',
      'Saturated magenta and neon cyan color grading',
    ],
    rawImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1800&q=80',
    gradeImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    ],
    soundDesignNotes:
      'Heavily processed synth drops, reverse snare risers, and crowd roar sweeps.',
  },
  {
    id: 'goa-cinematics',
    number: '05',
    title: 'GOA CINEMATICS',
    subtitle: 'Coastal Mood & Travel Visual Story',
    client: 'Coastal Explorers & Travel Media',
    year: '2024',
    category: 'Documentary',
    duration: '01:05',
    aspect: '9:16 Vertical',
    fps: '24.000 FPS',
    camera: 'Sony FX3',
    software: ['Premiere Pro', 'DaVinci Resolve'],
    videoUrl: '/videos/goa-cinematics.mp4',
    isVertical: true,
    synopsis:
      'A poetic visual poem exploring Portuguese heritage streets, serene coastal tides, and vibrant Goan sunsets.',
    concept:
      'Gentle rhythms that mirror coastal ocean waves. Pacing allows the viewer to soak in the vintage textures and warm twilight glow.',
    editDecisions: [
      'Lyrical J-cuts bringing ocean soundscapes into vintage alleyway scenes',
      'Warm film print emulation with soft halation around golden hour highlights',
      'Seamless flow from bustling markets to tranquil twilight shores',
    ],
    rawImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=80',
    gradeImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    ],
    soundDesignNotes:
      'Shoreline surf washes, acoustic nylon guitar plucks, gentle seagull atmospheres.',
  },
  {
    id: 'turtle-matcha-cafe',
    number: '06',
    title: 'TURTLE MATCHA CAFE',
    subtitle: 'Artisanal Beverage & Cafe Commercial',
    client: 'Turtle Matcha Cafe',
    year: '2024',
    category: 'Commercial',
    duration: '00:30',
    aspect: '9:16 Vertical',
    fps: '60.000 / 24.000 FPS Slow-Mo',
    camera: 'Sony A7S III + Macro 90mm',
    software: ['Premiere Pro', 'DaVinci Resolve'],
    videoUrl: '/videos/turtle-matcha-cafe.mov',
    isVertical: true,
    synopsis:
      'Sensory, mouth-watering macro commercial showcasing ceremonial grade matcha whisking, ice clinks, and creamy milk pours.',
    concept:
      'ASMR-inspired editing with high sensory feedback. Every milk swirl and bamboo whisk rotation is paired with pristine foley audio.',
    editDecisions: [
      'Ultra slow-motion milk pour match-cut into freshly brewed matcha froth',
      'Vibrant matcha green color grade with clean porcelain whites',
      'Snappy, crisp cuts tailored for Instagram Reels and TikTok foodies',
    ],
    rawImage: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1800&q=80',
    gradeImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    ],
    soundDesignNotes:
      'Crisp ice cube clinks, bamboo whisk scraping textured ceramic, milk pour splashes.',
  },
  {
    id: 'flake-house',
    number: '07',
    title: 'FLAKE HOUSE',
    subtitle: 'Fashion & Urban Lifestyle Reel',
    client: 'Flake House Collective',
    year: '2024',
    category: 'Fashion',
    duration: '00:45',
    aspect: '9:16 Vertical',
    fps: '24.000 FPS',
    camera: 'Canon C70 + Vintage Glass',
    software: ['Premiere Pro', 'After Effects'],
    videoUrl: '/videos/flake-house.mov',
    isVertical: true,
    synopsis:
      'An edgy streetwear and urban lifestyle editorial film spotlighting contemporary fashion, typography, and youthful rebellion.',
    concept:
      'Vintage tape grain paired with kinetic text wipes and fast jump cuts. Street fashion presented with cinematic weight.',
    editDecisions: [
      'Analog film grain and VHS distortion punctuation on outfit changes',
      'Directional momentum match cuts keeping model eye lines centered',
      'Desaturated film look with glowing amber streetlamp highlights',
    ],
    rawImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=80',
    gradeImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    ],
    soundDesignNotes:
      'Heavy boom-bap drum beats, vinyl crackle, subway rumble foley.',
  },
  {
    id: 'hair-salon-work',
    number: '08',
    title: 'LUXE HAIR SALON',
    subtitle: 'Beauty & Hair Transformation Campaign',
    client: 'Luxe Salon & Academy',
    year: '2023',
    category: 'Fashion',
    duration: '00:40',
    aspect: '9:16 Vertical',
    fps: '60.000 / 24.000 FPS',
    camera: 'Sony A7S III',
    software: ['Premiere Pro', 'DaVinci Resolve'],
    videoUrl: '/videos/hair-salon-work.mov',
    isVertical: true,
    synopsis:
      'Sleek, glamorous beauty reel demonstrating precision haircutting, color balayage, and breathtaking final styling reveals.',
    concept:
      'Rhythmic scissor snaps matched with acoustic music beats. Close-up texture highlights demonstrating glossy, flowing hair movement.',
    editDecisions: [
      'Audio sync on scissor snips creating a musical percussive baseline',
      'Speed ramp whips showing before-and-after transformation in one continuous motion',
      'Radiant, warm skin tone grading with luminous hair shine accents',
    ],
    rawImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80',
    gradeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    ],
    soundDesignNotes:
      'Crisp scissor snip clicks, blow dryer swooshes, uplifting modern pop rhythm.',
  },
];

export const servicesData: Service[] = [
  {
    id: 'narrative-editing',
    number: '01',
    title: 'COMMERCIAL & BRAND EDITING',
    tag: 'High-Impact Narratives',
    description:
      'Sculpting high-stakes commercial narratives that capture brand identity, establish emotional resonance, and hold viewer attention through every single frame.',
    deliverables: [
      'Director’s Cut & Agency Broadcast Versions (16:9, 4:5, 9:16)',
      'High-velocity match cutting & kinetic transitions',
      'Comprehensive offline editorial assembly',
      'Re-timing and narrative structure optimization',
    ],
    previewImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'social-vertical',
    number: '02',
    title: '9:16 VERTICAL CINEMA & REELS',
    tag: 'Retention & Velocity',
    description:
      'Re-engineering horizontal and vertical footage into thumb-stopping social films built specifically for modern mobile screens without sacrificing cinematic grit.',
    deliverables: [
      'High-retention speed ramps & whip transitions',
      'First 3-second hook optimization',
      'Kinetic subtitles and animated sound captions',
      'Batch export tailored for Instagram, TikTok & YouTube Shorts',
    ],
    previewImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'music-visuals',
    number: '03',
    title: 'MUSIC VIDEOS & VISUALIZERS',
    tag: 'Rhythm-Driven Storytelling',
    description:
      'Deeply synchronized audio-visual journeys where the timeline functions as an extension of the music itself, fusing percussion with visual velocity.',
    deliverables: [
      'Stem-synced micro-frame cutting',
      'Glitch, film burn, and analog distortion accents',
      'Performance pacing & lip-sync precision',
      'Official music video and teaser cuts',
    ],
    previewImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'color-grading',
    number: '04',
    title: 'COLOR GRADING & FINISHING',
    tag: 'Atmosphere & Celluloid Mood',
    description:
      'Grading raw camera logs into evocative filmic worlds using DaVinci Resolve Studio. Film print emulation, skin tone perfection, and visual continuity.',
    deliverables: [
      'ACES & Color Managed Davinci YRGB Color Workflows',
      'Bespoke Show LUT design for specific film looks',
      'Kodak / Fuji 35mm & 16mm celluloid emulation',
      'SDR & HDR mastering for broadcast and digital',
    ],
    previewImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sound-design',
    number: '05',
    title: 'SOUND DESIGN & AUDIO FINISHING',
    tag: 'Visceral Sonic Landscape',
    description:
      'Video is only half the experience. Building immersive multi-layer soundscapes with punchy foley, bass drops, spatial panning, and dialogue polish.',
    deliverables: [
      'Custom foley and mechanical effect synthesis',
      'Dialogue denoising and clarity mastering',
      'Dynamic sub-drops, risers, and impact textures',
      'Broadcast-compliant LUFS loudness mastering',
    ],
    previewImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'motion-titles',
    number: '06',
    title: 'MOTION DESIGN & TITLE SEQUENCES',
    tag: 'Cinematic Typography',
    description:
      'Crafting opening title sequences, credit rolls, kinetic graphic overlays, and interface designs that elevate footage into high-art productions.',
    deliverables: [
      'Custom editorial film title sequences',
      '3D kinetic typography & tracker integration',
      'HUD & UI motion design elements',
      'Clean modular motion toolkits',
    ],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
  },
];

export const processStages: ProcessStage[] = [
  {
    step: '01',
    title: 'INGEST & SCRIPTURE',
    subtitle: 'Organization & Immersion',
    duration: 'Day 1–2',
    description:
      'Reviewing every frame of raw footage, building select reels, logging emotional beats, and understanding the director’s core vision.',
    tools: ['DaVinci Resolve', 'Kyno', 'Premiere Pro'],
  },
  {
    step: '02',
    title: 'THE ASSEMBLY',
    subtitle: 'Building the Spine',
    duration: 'Day 3–5',
    description:
      'Constructing the skeleton of the narrative. No music crutches—making sure the story holds up on visual momentum and pure dialogue pacing alone.',
    tools: ['Dual Monitor NLE Setup', 'Pacing Deck'],
  },
  {
    step: '03',
    title: 'THE SCULPT',
    subtitle: 'Rhythm, Emotion & Cut',
    duration: 'Day 6–8',
    description:
      'Trimming redundant frames, introducing kinetic match cuts, pacing pauses, and establishing the exact heartbeat of the project.',
    tools: ['Speed Ramps', 'Jump Cuts', 'Rhythm Maps'],
  },
  {
    step: '04',
    title: 'THE POLISH',
    subtitle: 'Color, Sound & Texture',
    duration: 'Day 9–11',
    description:
      'Color grading for cinematic mood, sculpting multi-layered sound design, and adding analog grain textures for a rich filmic finish.',
    tools: ['DaVinci Color Nodes', 'Logic Pro Audio', 'Dehancer Pro'],
  },
  {
    step: '05',
    title: 'THE MASTER',
    subtitle: 'Finishing & Multi-Aspect Delivery',
    duration: 'Day 12',
    description:
      'Final export in DCI 4K ProRes 4444 XQ, social verticals, trailer teasers, and broadcast spec archival packages.',
    tools: ['ProRes Master', 'H.265 / AV1', 'Framed Deliverables'],
  },
];

export const testimonialsData: Testimonial[] = [
  {
    quote:
      'Elton understands that editing isn’t about putting clips together. It’s about knowing exactly when a moment should breathe and when it should hit like a freight train.',
    author: 'Marcus Vance',
    role: 'Executive Creative Director',
    company: 'Monolith Film Lab, London',
  },
  {
    quote:
      'We sent Elton 40 hours of scattered festival footage with no clear script. In 5 days he returned a 90-second cut that gave the entire executive board goosebumps.',
    author: 'Elena Rostova',
    role: 'Head of Brand Content',
    company: 'Aura Sound & Motion, Berlin',
  },
  {
    quote:
      'His sense of rhythm is musical. The way he cuts to audio transients and builds tension through silence is something you rarely see in video editors today.',
    author: 'Devendra Patel',
    role: 'Film Director',
    company: 'Redline Cinematics, Mumbai',
  },
];

export const statsData: StatItem[] = [
  {
    label: 'COMMERCIAL & NARRATIVE EDITS',
    value: 50,
    suffix: '+',
    description: 'Films delivered across luxury, automotive, and music',
  },
  {
    label: 'YEARS IN THE TIMELINE',
    value: 4,
    suffix: '+',
    description: 'Relentless craft refining cuts, color, and rhythm',
  },
  {
    label: 'AUDIENCE REACH',
    value: 20,
    suffix: 'M+',
    description: 'Organic views across broadcast and social campaigns',
  },
  {
    label: 'ATTENTION TO DETAIL',
    value: 100,
    suffix: '%',
    description: 'Every cut purposeful, zero arbitrary frames',
  },
];

export const btsFramesData: BTSFrame[] = [
  {
    id: 'bts-1',
    title: 'Timeline Architecture',
    category: 'NLE Setup',
    timecode: 'TC 00:12:44:18',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bts-2',
    title: 'Vectorscope & Scopes',
    category: 'DaVinci Resolve',
    timecode: 'TC 01:04:19:02',
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bts-3',
    title: 'Sound Design Stems',
    category: 'Audio Foley',
    timecode: 'TC 02:18:02:11',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bts-4',
    title: 'On-Set Monitor Feed',
    category: 'ARRI Alexa Mini',
    timecode: 'TC 03:45:30:24',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bts-5',
    title: 'Macro Color Timing',
    category: 'Color Calibration',
    timecode: 'TC 04:02:11:08',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bts-6',
    title: 'Celluloid Film Emulation',
    category: '16mm Kodak Vision3',
    timecode: 'TC 05:22:15:16',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
];

export const clientLogos = [
  { name: 'EXOTIC MOTORS DUBAI', role: 'Commercial Film' },
  { name: 'KERALA TOURISM', role: 'Travel Film' },
  { name: '21A BLR NIGHTLIFE', role: 'Music Visuals' },
  { name: 'TURTLE MATCHA CAFE', role: 'Commercial Aesthetic' },
  { name: 'FLAKE HOUSE', role: 'Fashion Campaign' },
  { name: 'GOA AUTO EXPO', role: 'Exhibition Reel' },
  { name: 'LUXE SALON', role: 'Beauty Editorial' },
  { name: 'COASTAL EXPLORERS', role: 'Documentary' },
];

export const editTimelineStages = [
  {
    stage: '01',
    name: 'RAW FOOTAGE',
    desc: 'Uncut camera log rushes from Wayanad and Dubai sets, flat profile, uncurated takes',
    color: '#555566',
    v1: 'WAYANAD_RUSHES_A001.MOV',
    v2: 'MUTED',
    a1: 'SCRATCH_AUDIO.WAV',
    a2: 'EMPTY',
    a3: 'EMPTY',
    previewVideo: '/videos/wayanad-cinematics.mov',
    previewImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    lut: 'CAMERA RAW (LOG-C)',
  },
  {
    stage: '02',
    name: 'ASSEMBLY CUT',
    desc: 'Story spine constructed, rough narrative sequence blocked out',
    color: '#D4AF37',
    v1: 'SELECTS_TAKE_04.MOV',
    v2: 'INSERT_SHOT_08.MOV',
    a1: 'DIALOGUE_BOOM.WAV',
    a2: 'TEMP_SFX.WAV',
    a3: 'TEMP_SCORE.MP3',
    previewVideo: '/videos/supercars-dubai.mp4',
    previewImg: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    lut: 'TEMP 709 MONITOR',
  },
  {
    stage: '03',
    name: 'RHYTHM & PACING',
    desc: 'Micro-trims on breath and exhaust rumble, kinetic jump cuts, dynamic motion',
    color: '#E5383B',
    v1: 'RHYTHM_L_CUT_FINAL.MOV',
    v2: 'OVERLAY_MATCH_CUT.MOV',
    a1: 'SYNC_DIALOGUE_EDITED.WAV',
    a2: 'FOLEY_SWEEPS.WAV',
    a3: 'BASS_TRANSIENTS.WAV',
    previewVideo: '/videos/dj-doel-blr.mp4',
    previewImg: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
    lut: 'CONTRAST CURVE +2',
  },
  {
    stage: '04',
    name: 'COLOR GRADE',
    desc: 'DaVinci Resolve node tree: Kodak 2383 film print emulation & rich greens',
    color: '#D4AF37',
    v1: 'COLOR_MANAGED_ACES.MOV',
    v2: 'FILM_GRAIN_OVERLAY.MOV',
    a1: 'SYNC_DIALOGUE.WAV',
    a2: 'FOLEY_PASS.WAV',
    a3: 'SCORE_PASS.WAV',
    previewVideo: '/videos/turtle-matcha-cafe.mov',
    previewImg: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    lut: 'ELTON_CINEMA_KODAK_2383',
  },
  {
    stage: '05',
    name: 'SOUND DESIGN',
    desc: 'Multi-track spatial audio, V10 engine roars, club bass, crisp dialogue',
    color: '#4DA6FF',
    v1: 'PICTURE_LOCK.MOV',
    v2: 'TITLES_AND_GFX.MOV',
    a1: 'MASTER_DIALOGUE_EQ.WAV',
    a2: 'CUSTOM_BINAURAL_FOLEY.WAV',
    a3: 'ORCHESTRAL_STEMS_MIX.WAV',
    previewVideo: '/videos/goa-auto-expo.mp4',
    previewImg: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    lut: 'ELTON_CINEMA_KODAK_2383',
  },
  {
    stage: '06',
    name: 'FINAL MASTER',
    desc: 'Picture lock, DCI 4K ProRes 4444 XQ & 9:16 vertical exports ready for broadcast',
    color: '#00E676',
    v1: 'WAYANAD_MASTER_4K.MOV',
    v2: 'END_TITLES_PRORES.MOV',
    a1: '5.1_SURROUND_MIX.WAV',
    a2: 'STEREO_BROADCAST_-14LUFS.WAV',
    a3: 'M&E_ISOLATED_STEMS.WAV',
    previewVideo: '/videos/wayanad-cinematics.mov',
    previewImg: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    lut: 'DCI-P3 / REC.709 MASTER',
  },
];
