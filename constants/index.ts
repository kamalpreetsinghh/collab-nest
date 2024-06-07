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
  { href: "/", key: "Find Designers", text: "Find Designers" },
  { href: "/", key: "Hire Professionals", text: "Hire Professionals" },
  { href: "/", key: "Go Pro", text: "Go Pro" },
];

export const categoryFilters = [
  "Discover",
  "Animation",
  "Branding",
  "Illustration",
  "Mobile",
  "Web Design",
  "Game Design",
  "Product Design",
  "Typography",
  "Machine Learning",
];

export const footerLinks = [
  "For designers",
  "Hire talent",
  "Inspiration",
  "Advertising",
  "Blog",
  "About",
  "Careers",
  "Support",
];

export const footerLeftLinks = ["Terms", "Privacy", "Cookies"];

export const footerRightLinks = [
  "Jobs",
  "Designers",
  "Freelancers",
  "Resources",
  "Places",
];

export const socialMedia = [
  {
    id: 1,
    img: "/twitter.svg",
    link: "https://twitter.com/",
  },
  {
    id: 2,
    img: "/facebook.svg",
    link: "https://facebook.com/",
  },
  {
    id: 3,
    img: "/instagram.svg",
    link: "https://www.linkedin.com/",
  },
  {
    id: 4,
    img: "/pinterest.svg",
    link: "https://www.pinterest.com/",
  },
];
