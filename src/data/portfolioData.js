export const personalInfo = {
  name: "NIKHIL KUMAR PANDEY",
  title: "SOFTWARE DEVELOPER | FULL STACK DEVELOPER",
  location: "Greater Noida, India",
  email: "nikhilpandya829@gmail.com",
  phone: "7070031705",
  formattedPhone: "+91 7070031705",
  github: "https://github.com/Nikhil70700",
  linkedin: "https://www.linkedin.com/in/nikhil-kumar-pandey-747047190/",
  resume: "Nikhil_Kumar_Pandey_Resume.pdf",
  about: "Full-stack developer with hands-on experience building responsive, production-grade web applications using React.js, Node.js, and Express.js. Skilled in developing SaaS dashboards, API integrations, and role-based systems, with growing exposure to Generative AI and Agentic AI tooling for accelerated development.",
  objectiveSummary: [
    "Practical Software Developer with hands-on full-stack experience.",
    "Specialized in React.js, Node.js, Express.js, and modern database architectures.",
    "Proven experience building SaaS applications (GymSaathi) & custom WordPress solutions.",
    "Versatile with AI-assisted development tools, Generative AI, Agentic AI, and Prompt Engineering."
  ],
  stats: [
    { label: "Live Impact", value: "20+ Gyms", desc: "300+ members on GymSaathi" },
    { label: "Primary Stack", value: "React & Node", desc: "MERN / Full-Stack SaaS" },
    { label: "Certifications", value: "2 Badges", desc: "Coding Ninjas Java & DSA" },
    { label: "Special Focus", value: "AI Workflows", desc: "Generative & Agentic AI" }
  ]
};

// Exact 17 CV-accurate tech skills — do not add technologies not present in the CV
export const technicalProfile = [
  {
    category: "Programming",
    color: "#38BDF8",
    skills: [
      {
        name: "Java",
        icon: "Coffee",
        description: "Object-oriented programming with Java. Certified by Coding Ninjas for Java and Data Structures in Java."
      },
      {
        name: "JavaScript",
        icon: "Code2",
        description: "Core language used across frontend and backend development in full-stack web applications."
      },
      {
        name: "TypeScript",
        icon: "FileCode",
        description: "Used alongside JavaScript to add type safety in web application development."
      },
      {
        name: "SQL",
        icon: "Database",
        description: "Used for relational database queries, MySQL schema management, and phpMyAdmin operations."
      }
    ]
  },
  {
    category: "Frontend",
    color: "#00F0FF",
    skills: [
      {
        name: "React.js",
        icon: "Atom",
        description: "Primary frontend framework. Built dashboards, SaaS UI modules, reusable components, and responsive layouts."
      },
      {
        name: "HTML5",
        icon: "Layout",
        description: "Used consistently across all web development projects for semantic markup and structure."
      },
      {
        name: "CSS3",
        icon: "Palette",
        description: "Applied for responsive layouts, animations, and custom styling across frontend and WordPress projects."
      },
      {
        name: "Bootstrap",
        icon: "Grid",
        description: "Used for rapid responsive UI scaffolding in full-stack and WordPress development projects."
      },
      {
        name: "Tailwind CSS",
        icon: "Wind",
        description: "Utility-first CSS framework used in full-stack React projects for consistent design systems."
      },
      {
        name: "jQuery",
        icon: "FileJson",
        description: "Used for DOM manipulation and AJAX-based interactions, particularly in WordPress plugin development."
      }
    ]
  },
  {
    category: "Backend",
    color: "#10B981",
    skills: [
      {
        name: "Node.js",
        icon: "Server",
        description: "Server-side JavaScript runtime used for building backend services in full-stack and SaaS applications."
      },
      {
        name: "Express.js",
        icon: "Server",
        description: "Web framework used on top of Node.js for REST API development, routing, and business logic across full-stack projects."
      }
    ]
  },
  {
    category: "Database",
    color: "#F59E0B",
    skills: [
      {
        name: "MongoDB",
        icon: "HardDrive",
        description: "NoSQL document database used in MERN stack applications for flexible data storage and retrieval."
      },
      {
        name: "MySQL",
        icon: "Database",
        description: "Relational database management used in WordPress and full-stack projects with phpMyAdmin."
      }
    ]
  },
  {
    category: "CMS",
    color: "#8B5CF6",
    skills: [
      {
        name: "WordPress",
        icon: "Globe",
        description: "Custom theme development with PHP, AJAX plugin creation, Elementor customization, and site deployment."
      }
    ]
  },
  {
    category: "AI",
    color: "#EC4899",
    skills: [
      {
        name: "Generative AI",
        icon: "Sparkles",
        description: "Applied generative AI tools to accelerate development workflows and improve productivity."
      },
      {
        name: "Agentic AI",
        icon: "Bot",
        description: "Experience working with agentic AI systems to automate and assist development tasks."
      },
      {
        name: "Prompt Engineering",
        icon: "Terminal",
        description: "Crafting structured prompts to effectively use AI tools in software development workflows."
      }
    ]
  }
];

export const mainProject = {
  id: "gymsaathi",
  title: "GymSaathi — Gym Management & Member Engagement Platform",
  tagline: "Full-stack SaaS ecosystem for gym operations, subscription automation, and WhatsApp communication.",
  techStack: ["React.js", "Node.js", "Express.js", "REST APIs", "MongoDB", "WhatsApp Integration"],
  highlights: [
    "Full-Stack SaaS Architecture: Developed a comprehensive gym management system now used by 20+ gyms and 300+ members to streamline operations and enhance member engagement.",
    "Member Onboarding Workflow: Implemented automated onboarding with controlled credential delivery based on payment verification and BCA charges logic.",
    "Role-Based Access Control: Designed distinct, secure dashboards for Super Admin and Gym Admin users.",
    "Gym & Member Management: Engineered gym creation, active member management, and automated subscription handling.",
    "QR Payment Verification: Built QR-based payment tracking with manual verification workflow for non-gateway transactions.",
    "Billing & Invoice Engine: Developed complex subscription logic including automatic monthly invoice generation for annual plans.",
    "WhatsApp API Integration: Integrated WhatsApp automated messaging for instant notification updates and login credential delivery.",
    "Performance & UI Optimization: Enhanced responsiveness, speed, and cross-device experience across 10+ modules, including dashboards, workout planners, and billing screens."
  ],
  architectureFlow: [
    { step: "01", title: "Member Onboarding", desc: "Registration input + BCA charge verification" },
    { step: "02", title: "Payment Workflow", desc: "QR scan / manual payment approval engine" },
    { step: "03", title: "Role Dashboard", desc: "Super Admin & Gym Admin operational controls" },
    { step: "04", title: "WhatsApp Integration", desc: "Automated credential & subscription alerts" }
  ]
};

export const experiences = [
  {
    role: "Software Developer Intern / Software Developer",
    company: "GymSaathi",
    duration: "November 2025 – Present",
    durationShort: "Nov 2025 – Present",
    location: "Greater Noida",
    type: "Current Role",
    accentColor: "#00F0FF",
    techTags: [
      "React.js", "JavaScript", "Node.js", "Express.js",
      "SaaS", "APIs", "Dashboards", "Reusable UI",
      "Performance Optimization", "AI-Assisted Dev"
    ],
    responsibilities: [
      "Developed and maintained a responsive gym management SaaS using React.js, JavaScript, Node.js and Express.js, currently serving 20+ gyms and 300+ end members.",
      "Built workout planner modules, dashboards, reusable UI components and member management features.",
      "Integrated APIs, fixed bugs and optimized performance, responsiveness and user experience.",
      "Leveraged AI-assisted development tools to accelerate development and collaborated on deployment-ready releases."
    ]
  },
  {
    role: "Full Stack Developer Intern",
    company: "ENut Technologies Pvt Ltd",
    duration: "May 2025 – October 2025",
    durationShort: "May 2025 – Oct 2025",
    location: "Full Stack Team",
    type: "Internship",
    accentColor: "#38BDF8",
    techTags: [
      "JavaScript", "Node.js", "MongoDB",
      "Full-Stack Apps", "Backend Enhancements",
      "Database Management", "Bug Fixing", "Performance Optimization"
    ],
    responsibilities: [
      "Developed and maintained full-stack web applications using JavaScript, Node.js and MongoDB.",
      "Managed MongoDB databases, fixed bugs and implemented backend feature enhancements.",
      "Collaborated with the development team to optimize application performance and user experience."
    ]
  },
  {
    role: "WordPress Developer Trainee",
    company: "White SoftInfo",
    duration: "June 2025 – September 2025",
    durationShort: "Jun 2025 – Sep 2025",
    location: "Uttar Pradesh",
    type: "Traineeship",
    accentColor: "#8B5CF6",
    techTags: [
      "PHP", "WordPress", "HTML", "CSS", "JavaScript",
      "AJAX", "MySQL", "phpMyAdmin", "Elementor",
      "Theme/Plugin Integration", "Live Deployment"
    ],
    responsibilities: [
      "Developed custom WordPress themes using PHP, HTML, CSS and JavaScript following secure coding practices.",
      "Built a custom AJAX-based form plugin with database storage and email integration.",
      "Created and customized responsive websites using Elementor with theme and plugin integration.",
      "Performed debugging, cross-device testing, MySQL/phpMyAdmin management and assisted with live deployments."
    ]
  }
];

export const education = [
  {
    degree: "Master of Computer Applications",
    institution: "JIS College of Engineering",
    location: "Kalyani, West Bengal, India",
    duration: "08/2022 – 08/2024",
    badge: "Master's Degree"
  },
  {
    degree: "Bachelor of Science — Information Technology",
    institution: "Marwari College",
    location: "Bhagalpur, Bihar, India",
    duration: "08/2018 – 02/2022",
    badge: "Bachelor's Degree"
  },
  {
    degree: "Higher Secondary Education — Information Technology",
    institution: "Jawahar Navodaya Vidyalaya",
    location: "Katihar, Bihar, India",
    duration: "08/2016 – 08/2018",
    badge: "Senior Secondary"
  }
];

export const certifications = [
  {
    title: "Certificate of Excellence in Java",
    issuer: "Coding Ninjas",
    badge: "Certificate of Excellence",
    icon: "Award",
    type: "Java Programming"
  },
  {
    title: "Certificate of Completion — Data Structures in Java",
    issuer: "Coding Ninjas",
    badge: "Certificate of Completion",
    icon: "Award",
    type: "Data Structures in Java"
  }
];