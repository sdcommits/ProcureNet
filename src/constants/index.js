import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  tripguide2,
  tripguide3,
  tripguide4,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Tenders-Live",
    icon: starbucks, // Replace with the correct icon
    path: "/tenders-live", // Path to TendersLive component
  },
  {
    title: "Create-Room",
    icon: starbucks, // Replace with the correct icon
    path: "/create-room",
     // Path to CreateRoom component
    
    
  },
  {
    title: "PRODUCTS",
    icon: starbucks, // Replace with the correct icon
    path: "/add-product", // Path to AddProduct component
  },
  {
    title: "Join-Room",
    icon: starbucks, // Replace with the correct icon
    path: "/join-room", // Path to JoinRoom component
  },
];

// const technologies = [
//   {
//     name: "HTML 5",
//     icon: html,
//   },
//   {
//     name: "CSS 3",
//     icon: css,
//   },
//   {
//     name: "JavaScript",
//     icon: javascript,
//   },
//   {
//     name: "TypeScript",
//     icon: typescript,
//   },
//   {
//     name: "React JS",
//     icon: reactjs,
//   },
//   {
//     name: "Redux Toolkit",
//     icon: redux,
//   },
//   {
//     name: "Tailwind CSS",
//     icon: tailwind,
//   },
//   {
//     name: "Node JS",
//     icon: nodejs,
//   },
//   {
//     name: "MongoDB",
//     icon: mongodb,
//   },
//   {
//     name: "Three JS",
//     icon: threejs,
//   },
//   {
//     name: "git",
//     icon: git,
//   },
//   {
//     name: "figma",
//     icon: figma,
//   },
//   {
//     name: "docker",
//     icon: docker,
//   },
// ];

const experiences = [
  {
    title: "Antiques & Collectibles",
    // company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Explore timeless treasures in our antiques and collectibles category, featuring vintage furniture, rare coins, classic artwork, and more. Each item carries unique history and craftsmanship. Perfect for collectors seeking one-of-a-kind pieces.",
    ],
  },
  {
    title: "Memorabilia",
    // company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Dive into nostalgia with iconic memorabilia, from sports collectibles and autographed items to movie props and historical artifacts. These pieces connect you to memorable events and legendary figures. Ideal for passionate fans and history enthusiasts.",
    ],
  },
  {
    title: "Jewelry & Watches",
    // company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Discover luxury and elegance with our exquisite collection of fine jewelry and watches. Featuring diamond rings, gold necklaces, and premium timepieces, these items blend beauty and value. Perfect for collectors and those seeking timeless style..",
    ],
  },
  {
    title: "Vehicles & Automobiles",
    // company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Rev up your passion with classic cars, vintage motorcycles, and collectible vehicles that define automotive history. Each vehicle represents a blend of performance, design, and nostalgia. A must-see for auto enthusiasts and collectors alike.",
    ],
  },
];

// const testimonials = [
//   {
//     testimonial:
//       "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
//     name: "Sara Lee",
//     designation: "CFO",
//     company: "Acme Co",
//     image: "https://randomuser.me/api/portraits/women/4.jpg",
//   },
//   {
//     testimonial:
//       "I've never met a web developer who truly cares about their clients' success like Rick does.",
//     name: "Chris Brown",
//     designation: "COO",
//     company: "DEF Corp",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//   },
//   {
//     testimonial:
//       "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
//     name: "Lisa Wang",
//     designation: "CTO",
//     company: "456 Enterprises",
//     image: "https://randomuser.me/api/portraits/women/6.jpg",
//   },
// ];

const projects = [
  {
    name: "Vintage Wooden Baseball Bat with Classic Ball",
    description:
      "This weathered wooden baseball bat, paired with a classic aged ball, captures the nostalgia of mid-20th-century baseball. The bat’s natural wear and faded grain reflect its history, making it a perfect addition to any sports memorabilia collection or rustic decor. A true piece of sports history, ideal for collectors and enthusiasts alike.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Heritage french style home",
    description:
      "This beautifully preserved heritage home embodies classic French architectural charm with its intricate stonework, steep roofs, and elegant wrought-iron accents. The interior features high ceilings, vintage moldings, and rustic wood finishes, creating a blend of luxury and warmth. Perfect for those seeking a blend of history, style, and sophistication in a timeless setting",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Vintage Wall Clock",
    description:
      "This classic vintage wall clock features a beautifully aged wooden frame and ornate detailing, bringing a touch of old-world charm to any space. With its antique brass hands and Roman numerals, it evokes a sense of nostalgia and sophistication. A perfect statement piece for those who appreciate both history and style in their home decor.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
  {
    name: "old age small wooden trinket",
    description:
      "This small, handcrafted wooden trinket box exudes rustic charm with its worn edges and rich patina developed over time. The box's intricate carvings and weathered finish hint at years of careful use, making it perfect for storing tiny treasures or as a decorative piece. A delightful vintage item that adds a touch of history and warmth to any setting.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide2,
    source_code_link: "https://github.com/",
  },
  {
    name: "Vintage cafe racer",
    description:
      "This vintage cafe racer motorcycle is a timeless icon of rebellion and craftsmanship, featuring a stripped-down design with low handlebars, a sleek fuel tank, and minimalist seating. Its raw metal finish, retro speedometer, and roaring engine capture the essence of 1960s motorcycle culture. A perfect ride for enthusiasts who value both performance and heritage in their machines.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide3,
    source_code_link: "https://github.com/",
  },
  {
    name: "Spinning vinyle from 1968",
    description:
      "This original 1968 vinyl record, with its classic grooves and vintage label, spins timeless tracks that capture the essence of an iconic era in music. The well-preserved record brings rich, warm sound with every spin, transporting you back to the golden age of rock, soul, and pop. A perfect addition for audiophiles and collectors who cherish authentic retro sound and style.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide4,
    source_code_link: "https://github.com/",
  },
];

export { services,  experiences, projects };
