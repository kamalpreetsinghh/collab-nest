export const errors = {
  name: "Name should be at least 2 characters long, and should only contain letters and spaces.",
  email: "Please enter a valid email address",
  password:
    "Password should contain at least one uppercase letter, one lowercase letter, at least one digit, and at least 8 characters long.",
  confirmPassword: "Passwords do not match.",
  emailAlreadyExisis:
    "Email already exists. Please use a different email address.",
  emailNotExist:
    "Email address doest not exist. Please enter correct email address.",
};

export const regex = {
  name: /^[a-zA-Z-' ]{2,}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

export const NavLinks = [
  { href: "/", key: "Inspiration", text: "Inspiration" },
  { href: "/", key: "Find Projects", text: "Find Projects" },
  { href: "/", key: "Learn Development", text: "Learn Development" },
  { href: "/", key: "Career Advancement", text: "Career Advancement" },
  { href: "/", key: "Hire Developers", text: "Hire Developers" },
];

export const categoryFilters = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "Mobile",
  "UI/UX",
  "Game Dev",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "E-commerce",
  "Chatbots",
];

export const footerLinks = [
  {
    title: "For developers",
    links: [
      "Go Pro!",
      "Explore development work",
      "Development blog",
      "Code podcast",
      "Open-source projects",
      "Refer a Friend",
      "Code of conduct",
    ],
  },
  {
    title: "Hire developers",
    links: [
      "Post a job opening",
      "Post a freelance project",
      "Search for developers",
    ],
  },
  {
    title: "Brands",
    links: ["Advertise with us"],
  },
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Support",
      "Media kit",
      "Testimonials",
      "API",
      "Terms of service",
      "Privacy policy",
      "Cookie policy",
    ],
  },
  {
    title: "Directories",
    links: [
      "Development jobs",
      "Developers for hire",
      "Freelance developers for hire",
      "Tags",
      "Places",
    ],
  },
  {
    title: "Development assets",
    links: [
      "Code Marketplace",
      "GitHub Marketplace",
      "NPM Registry",
      "Packagephobia",
    ],
  },
  {
    title: "Development Resources",
    links: [
      "Freelancing",
      "Development Hiring",
      "Development Portfolio",
      "Development Education",
      "Creative Process",
      "Development Industry Trends",
    ],
  },
];
