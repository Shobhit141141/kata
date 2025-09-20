const questions = [
  {
    id: 1,
    text: "How do you handle stress?",
    options: [
      { text: "Melt but bounce back fast", sweet: "gulab" },
      { text: "Stay layered and cool", sweet: "kaju" },
      { text: "Soak things in slowly", sweet: "rasgulla" },
      { text: "Add spice to chaos", sweet: "jalebi" },
    ],
  },
  {
    id: 2,
    text: "Your vibe at a party?",
    options: [
      { text: "Comfort zone, always in demand", sweet: "gulab" },
      { text: "Smooth talker with depth", sweet: "kaju" },
      { text: "Chill and low-key", sweet: "rasgulla" },
      { text: "Bold and extra", sweet: "jalebi" },
    ],
  },
  {
    id: 3,
    text: "Weekend plan?",
    options: [
      { text: "Binge old classics", sweet: "gulab" },
      { text: "Long drive, music", sweet: "kaju" },
      { text: "Chai tapri hangout", sweet: "rasgulla" },
      { text: "Trying fusion food", sweet: "jalebi" },
    ],
  },
  {
    id: 4,
    text: "How do friends describe you?",
    options: [
      { text: "Reliable & timeless", sweet: "gulab" },
      { text: "Classy & sharp", sweet: "kaju" },
      { text: "Understated but addictive", sweet: "rasgulla" },
      { text: "Dramatic but fun", sweet: "jalebi" },
    ],
  },
  {
    id: 5,
    text: "What’s your work style?",
    options: [
      { text: "Consistent & warm", sweet: "gulab" },
      { text: "Minimal but effective", sweet: "kaju" },
      { text: "Absorb & adapt", sweet: "rasgulla" },
      { text: "Spontaneous & wild", sweet: "jalebi" },
    ],
  },
  {
    id: 6,
    text: "Pick a travel style:",
    options: [
      { text: "Family road trip", sweet: "gulab" },
      { text: "Solo backpacking", sweet: "kaju" },
      { text: "Chill hill station with friends", sweet: "rasgulla" },
      { text: "Last-minute adventure", sweet: "jalebi" },
    ],
  },
  {
    id: 7,
    text: "Favorite season?",
    options: [
      { text: "Winter – cozy vibes", sweet: "gulab" },
      { text: "Autumn – aesthetic mood", sweet: "kaju" },
      { text: "Monsoon – chai + pakora", sweet: "rasgulla" },
      { text: "Summer – chaos but fun", sweet: "jalebi" },
    ],
  },
  {
    id: 8,
    text: "What’s your playlist energy?",
    options: [
      { text: "Old Bollywood classics", sweet: "gulab" },
      { text: "Indie chill vibes", sweet: "kaju" },
      { text: "Lo-fi beats", sweet: "rasgulla" },
      { text: "EDM bangers", sweet: "jalebi" },
    ],
  },
  {
    id: 9,
    text: "Ideal gift for you?",
    options: [
      { text: "Box of sweets", sweet: "gulab" },
      { text: "Sleek watch", sweet: "kaju" },
      { text: "Handwritten letter", sweet: "rasgulla" },
      { text: "Surprise prank gift", sweet: "jalebi" },
    ],
  },
  {
    id: 10,
    text: "Pick a movie genre:",
    options: [
      { text: "Romantic drama", sweet: "gulab" },
      { text: "Psychological thriller", sweet: "kaju" },
      { text: "Slice of life", sweet: "rasgulla" },
      { text: "Comedy chaos", sweet: "jalebi" },
    ],
  },
  {
    id: 11,
    text: "Your morning mood?",
    options: [
      { text: "Lazy but lovable", sweet: "gulab" },
      { text: "Sharp and productive", sweet: "kaju" },
      { text: "Slow starter", sweet: "rasgulla" },
      { text: "All over the place", sweet: "jalebi" },
    ],
  },
  {
    id: 12,
    text: "Pick a drink:",
    options: [
      { text: "Masala chai", sweet: "gulab" },
      { text: "Black coffee", sweet: "kaju" },
      { text: "Sweet lassi", sweet: "rasgulla" },
      { text: "Energy drink", sweet: "jalebi" },
    ],
  },
  {
    id: 13,
    text: "What’s your shopping style?",
    options: [
      { text: "Buy tried & tested", sweet: "gulab" },
      { text: "Pick classy essentials", sweet: "kaju" },
      { text: "Go with the flow", sweet: "rasgulla" },
      { text: "Impulse buyer", sweet: "jalebi" },
    ],
  },
  {
    id: 14,
    text: "Your response to gossip?",
    options: [
      { text: "Laugh and move on", sweet: "gulab" },
      { text: "Analyze it quietly", sweet: "kaju" },
      { text: "Listen silently", sweet: "rasgulla" },
      { text: "Add masala!", sweet: "jalebi" },
    ],
  },
  {
    id: 15,
    text: "Pick a festival:",
    options: [
      { text: "Diwali – warm lights", sweet: "gulab" },
      { text: "Eid – elegant feasts", sweet: "kaju" },
      { text: "Durga Puja – cultural vibes", sweet: "rasgulla" },
      { text: "Holi – chaotic colors", sweet: "jalebi" },
    ],
  },
  {
    id: 16,
    text: "How do you study/work?",
    options: [
      { text: "Group study, helping others", sweet: "gulab" },
      { text: "Alone, focused", sweet: "kaju" },
      { text: "Bit by bit, steady", sweet: "rasgulla" },
      { text: "Last-minute energy burst", sweet: "jalebi" },
    ],
  },
  {
    id: 17,
    text: "Choose a pet:",
    options: [
      { text: "Dog – loyal & warm", sweet: "gulab" },
      { text: "Cat – classy & independent", sweet: "kaju" },
      { text: "Fish – calm & quiet", sweet: "rasgulla" },
      { text: "Parrot – noisy but fun", sweet: "jalebi" },
    ],
  },
  {
    id: 18,
    text: "Pick a comfort food:",
    options: [
      { text: "Paratha & achar", sweet: "gulab" },
      { text: "Pasta alfredo", sweet: "kaju" },
      { text: "Curd rice", sweet: "rasgulla" },
      { text: "Pani puri", sweet: "jalebi" },
    ],
  },
  {
    id: 19,
    text: "What’s your style?",
    options: [
      { text: "Simple cottons", sweet: "gulab" },
      { text: "Sharp formals", sweet: "kaju" },
      { text: "Comfy pyjamas", sweet: "rasgulla" },
      { text: "Flashy streetwear", sweet: "jalebi" },
    ],
  },
  {
    id: 20,
    text: "If life was a game, your role would be:",
    options: [
      { text: "The healer", sweet: "gulab" },
      { text: "The strategist", sweet: "kaju" },
      { text: "The observer", sweet: "rasgulla" },
      { text: "The trickster", sweet: "jalebi" },
    ],
  },
];

export default questions;