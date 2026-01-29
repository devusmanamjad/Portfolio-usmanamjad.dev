// Portfolio Data - M Usman Amjad

export const personalInfo = {
  name: "M Usman Amjad",
  title: "Senior Software Engineer",
  tagline: "Building Scalable Solutions with .NET, React & Azure",
  email: "usmanamjad.dev@gmail.com",
  phone: "+92 342-8724610",
  location: "Lahore, Pakistan",
  linkedin: "https://linkedin.com/in/musmanamjad1",
  github: "https://github.com/devusmanamjad",
  upwork: "https://www.upwork.com/freelancers/raheem",
  twitter: "https://twitter.com/usmanamjad_dev",
  photo: "https://customer-assets.emergentagent.com/job_e9cf7992-ed2e-48c4-bd9f-f04fd6499616/artifacts/7zea1djo_1732606616323.jpeg",
  about: `Results-driven Software Engineer with around 5 years of experience specializing in .NET Core, React.js, and Azure Cloud. I've built scalable applications for fintech, SaaS, and enterprise solutions that serve thousands of users daily.

My expertise spans from developing efficient UIs and integrating complex APIs to delivering high-performance cloud solutions. I'm passionate about improving system architecture and maintaining software quality standards that meet diverse client needs across global teams.`,
  resumeUrl: "#"
};

// Professional Testimonials (from colleagues, managers, team leads)
export const professionalTestimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Engineering Manager",
    company: "Ciklum",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Usman is an exceptional engineer who consistently delivers high-quality code. His expertise in .NET and Azure has been instrumental in our Deloitte project. He's a great team player who mentors junior developers effectively.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Technical Lead",
    company: "Tkxel",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Working with Usman was a pleasure. His ability to understand complex business requirements and translate them into elegant technical solutions is remarkable. He played a key role in delivering our ProfitOptics platform.",
    rating: 5
  },
  {
    id: 3,
    name: "Muhammad Ali",
    role: "Senior Developer",
    company: "Autosoft Dynamics",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "Usman's fintech expertise and problem-solving skills are outstanding. He led critical data migrations and implemented core banking integrations flawlessly. A true professional who raises the bar for the entire team.",
    rating: 5
  }
];

// Client Testimonials (from Upwork and direct clients)
export const clientTestimonials = [
  {
    id: 1,
    name: "James Wilson",
    role: "CEO",
    company: "TechStart Inc.",
    location: "United States",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Usman delivered our e-commerce automation platform ahead of schedule. His communication was excellent, and he went above and beyond to ensure every feature worked perfectly. Highly recommend!",
    rating: 5,
    platform: "Upwork"
  },
  {
    id: 2,
    name: "Emma Thompson",
    role: "Product Manager",
    company: "EduGlobal",
    location: "United Kingdom",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "We hired Usman to build our study-abroad management platform. He understood our vision immediately and delivered a scalable solution that now serves students across 50+ countries. Exceptional work!",
    rating: 5,
    platform: "Direct"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder",
    company: "PetFresh Co.",
    location: "Canada",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    text: "Usman transformed our subscription platform completely. The new system reduced our manual tasks by 60% and our customers love the improved experience. He's now our go-to developer for all projects.",
    rating: 5,
    platform: "Upwork"
  },
  {
    id: 4,
    name: "Lisa Anderson",
    role: "Operations Director",
    company: "StoragePlus",
    location: "Australia",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    text: "Outstanding developer! Usman built our self-storage operations platform with incredible attention to detail. The mobile app he developed has significantly improved our tenant satisfaction scores.",
    rating: 5,
    platform: "Direct"
  }
];

export const skills = {
  languages: [
    { name: "C#", level: 95 },
    { name: "JavaScript (ES6+)", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "SQL/T-SQL", level: 90 },
    { name: "HTML/CSS", level: 85 }
  ],
  frameworks: [
    { name: ".NET 6/8", level: 95 },
    { name: "ASP.NET Core", level: 95 },
    { name: "React.js", level: 90 },
    { name: "Entity Framework Core", level: 90 },
    { name: "Tailwind CSS", level: 85 }
  ],
  cloud: [
    { name: "Azure Service Bus", level: 90 },
    { name: "Azure Functions", level: 85 },
    { name: "Azure SQL", level: 90 },
    { name: "Docker", level: 85 },
    { name: "Kubernetes (AKS)", level: 80 }
  ],
  databases: [
    { name: "SQL Server", level: 95 },
    { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "DynamoDB", level: 75 }
  ],
  tools: [
    "Git", "Azure DevOps", "Jira", "VS Code", "Docker", "Kubernetes"
  ]
};

export const experiences = [
  {
    id: 1,
    role: "Mid-Level Software Engineer",
    company: "Ciklum",
    project: "Deloitte US Tax",
    location: "Lahore, Pakistan (Remote)",
    period: "Feb 2025 – Present",
    type: "current",
    description: "Building and integrating microservices for an enterprise tax platform for Deloitte US Tax.",
    highlights: [
      "Event-driven architecture on .NET with Azure Service Bus, Azure SQL, Key Vault",
      "Containerizing services with Docker and orchestrating via Kubernetes",
      "Designing resilient APIs with retry/poison-queue strategies and observability",
      "Ownership of unit & integration tests, raising code coverage across services",
      "Collaborating with multi-national team across time zones"
    ],
    tech: [".NET Core", "Azure", "Docker", "Kubernetes", "Azure Service Bus"]
  },
  {
    id: 2,
    role: "Senior Software Engineer",
    company: "Tkxel",
    location: "Lahore, Pakistan",
    period: "Jun 2023 – Feb 2025",
    type: "past",
    description: "Building complete .NET Core applications and user-friendly React.js interfaces.",
    highlights: [
      "Built complete .NET Core applications from start to finish",
      "Developed user-friendly interfaces using React.js",
      "Collaborated with international teams across America, India, and Portugal",
      "Managed multiple projects across various business areas",
      "Provided consultancy to international clients"
    ],
    tech: [".NET Core", "React.js", "Azure", "SQL Server", "RESTful APIs"]
  },
  {
    id: 3,
    role: "Software Engineer",
    company: "Autosoft Dynamics – Contour Software",
    location: "Lahore, Pakistan",
    period: "Mar 2021 – Jun 2023",
    type: "past",
    description: "Working on Fintech products for major banking sectors, specializing in Islamic and Conventional Banking.",
    highlights: [
      "Spearheaded Fintech Product Loan Management System (LMS) for Al Baraka Bank",
      "Led data migration and implemented business processes",
      "Implemented AutoCredit with Risk Scoring and Core Banking integration",
      "Gained expertise in Islamic loan management (Ijarah and Mudaraba)",
      "Rapid conflict resolution on live production tasks"
    ],
    tech: [".NET Core MVC", "SQL Server", "Microservices", "PowerBuilder"]
  }
];

export const projects = [
  {
    id: 1,
    name: "Deloitte US Tax Platform",
    category: "Enterprise",
    description: "Enterprise tax platform with microservices architecture for Deloitte US.",
    role: "Software Engineer",
    tech: [".NET Core", "Azure Service Bus", "Docker", "Kubernetes", "Azure SQL"],
    features: ["Event-driven architecture", "Distributed tracing", "CI/CD pipelines"],
    industry: "Tax & Finance",
    team: "Multi-national"
  },
  {
    id: 2,
    name: "E-Commerce Automation Platform",
    category: "SaaS",
    description: "SaaS platform automating bulk product listing, pricing, and inventory for marketplace sellers.",
    role: "Full-Stack Developer",
    tech: [".NET Core", "React.js", "Azure", "SQL Server", "REST APIs"],
    features: ["Bulk listing automation", "Pricing optimization", "Inventory sync"],
    industry: "E-Commerce",
    team: "Cross-functional",
    metrics: "45% increase in listing throughput"
  },
  {
    id: 3,
    name: "ProfitOptics - Margin Optimization",
    category: "Enterprise",
    description: "Enterprise platform for advanced analytics, pricing intelligence, and process automation.",
    role: "Senior Developer",
    tech: [".NET Core", "React.js", "Azure", "EF Core", "PowerBI"],
    features: ["Real-time dashboards", "Margin analytics", "Process automation"],
    industry: "Enterprise",
    team: "US, India, Portugal",
    metrics: "70% improvement in reporting speed"
  },
  {
    id: 4,
    name: "ISEP - Payment Integration",
    category: "Fintech",
    description: "Payment and finance module with Stripe, PayPal, and ACH integrations.",
    role: "Backend Developer",
    tech: ["ASP.NET MVC", ".NET Core", "Azure", "Stripe", "PayPal"],
    features: ["Multi-gateway payments", "Auto-invoicing", "Currency exchange"],
    industry: "Fintech",
    team: "Distributed"
  },
  {
    id: 5,
    name: "Global Study-Abroad Platform",
    category: "SaaS",
    description: "SaaS platform connecting universities and students across 50+ countries.",
    role: "Full-Stack Developer",
    tech: [".NET Core", "React.js", "Azure SQL", "REST APIs"],
    features: ["Application management", "University partnerships", "Real-time sync"],
    industry: "Education",
    team: "Global",
    metrics: "40% reduction in processing time"
  },
  {
    id: 6,
    name: "Fresh Pet-Food Subscription",
    category: "SaaS",
    description: "D2C platform for personalized pet meal subscriptions with logistics integration.",
    role: "Backend Developer",
    tech: [".NET Core", "React.js", "Azure", "Payment APIs", "Logistics APIs"],
    features: ["Meal customization", "Subscription management", "Delivery tracking"],
    industry: "D2C / Pet Care",
    team: "Product Team",
    metrics: "60% reduction in manual tasks"
  },
  {
    id: 7,
    name: "Self-Storage Operations Platform",
    category: "Enterprise",
    description: "Platform for 24/7 call-centre support and remote facility management.",
    role: "Full-Stack Developer",
    tech: [".NET Core", "React Native", "Azure", "REST APIs"],
    features: ["Remote management", "Mobile tenant app", "Payment automation"],
    industry: "Real Estate",
    team: "Cross-functional"
  },
  {
    id: 8,
    name: "Al Baraka Bank - LMS",
    category: "Fintech",
    description: "Loan Management System for Islamic and Conventional Banking products.",
    role: "Software Engineer",
    tech: [".NET Core MVC", "SQL Server", "Microservices", "ETL"],
    features: ["Ijarah loans", "Mudaraba loans", "Risk scoring integration"],
    industry: "Banking",
    team: "Enterprise"
  }
];

export const caseStudies = [
  {
    id: 1,
    title: "Enterprise Tax Platform Modernization",
    project: "Deloitte US Tax",
    context: "Deloitte needed to modernize their enterprise tax platform to handle thousands of concurrent users and complex tax calculations across multiple jurisdictions.",
    problem: "Legacy monolithic architecture was causing scalability issues, slow deployments, and difficulty in maintaining compliance across different tax regions.",
    constraints: [
      "Must maintain 99.9% uptime during migration",
      "Strict compliance requirements for tax data",
      "Multi-region deployment requirements",
      "Integration with existing Deloitte systems"
    ],
    approach: "Adopted event-driven microservices architecture with Azure Service Bus for reliable message processing. Implemented containerization with Docker and Kubernetes for scalable deployments.",
    architecture: [
      "Microservices with .NET Core for domain separation",
      "Azure Service Bus for async communication",
      "Azure SQL with optimized indexing strategies",
      "Key Vault for secrets management",
      "Application Insights for observability"
    ],
    implementation: [
      "Designed idempotent consumers with retry/poison-queue strategies",
      "Implemented structured logging and distributed tracing",
      "Built CI/CD pipelines with GitHub Actions/Azure DevOps",
      "Created comprehensive unit and integration test suites"
    ],
    results: [
      "Successfully processing thousands of concurrent tax calculations",
      "Reduced deployment time from hours to minutes",
      "Achieved target code coverage across all services",
      "Zero-downtime deployments to production"
    ],
    improvements: "Would explore implementing CQRS pattern for complex read scenarios and adding more sophisticated caching strategies.",
    tech: [".NET Core", "Azure", "Docker", "Kubernetes", "Service Bus"]
  },
  {
    id: 2,
    title: "E-Commerce Automation at Scale",
    project: "E-Commerce Automation Platform",
    context: "High-volume marketplace sellers needed a platform to automate bulk product listing, pricing, and inventory management across multiple marketplaces.",
    problem: "Existing platform struggled with scalability - sellers couldn't process large SKU volumes efficiently, leading to missed sales opportunities and inventory sync issues.",
    constraints: [
      "Handle millions of SKUs across multiple marketplaces",
      "Real-time inventory synchronization",
      "Rate limiting from marketplace APIs",
      "Peak load during sale events"
    ],
    approach: "Introduced asynchronous job processing for heavy listing operations. Optimized backend workflows and enhanced marketplace API integrations with smart batching.",
    architecture: [
      "Queue-based job processing for bulk operations",
      "Optimized database queries with strategic indexing",
      "API rate limiting and retry mechanisms",
      "Caching layer for frequently accessed data"
    ],
    implementation: [
      "Built async job queue with priority handling",
      "Implemented smart batching for marketplace API calls",
      "Created real-time inventory sync engine",
      "Developed responsive UI for monitoring operations"
    ],
    results: [
      "45% increase in listing throughput",
      "Significant reduction in system latency during peak",
      "Improved seller satisfaction and retention",
      "Platform now handles 10x more concurrent operations"
    ],
    improvements: "Would implement event sourcing for better audit trails and add ML-based pricing suggestions.",
    tech: [".NET Core", "React.js", "Azure", "SQL Server", "Redis"]
  },
  {
    id: 3,
    title: "Real-Time Profit Analytics Engine",
    project: "ProfitOptics - Margin Optimization",
    context: "Enterprise clients needed real-time insights into margin performance and operational efficiency to make data-driven pricing decisions.",
    problem: "Legacy architecture couldn't handle the data volume needed for real-time reporting. Dashboards were slow, and decision-makers lacked actionable insights.",
    constraints: [
      "Process millions of records with minimal latency",
      "Support real-time dashboard updates",
      "Integration with multiple data sources",
      "Global team collaboration requirements"
    ],
    approach: "Modernized backend data pipelines with parallel processing. Introduced optimized database indexing and re-architected the front-end for faster load times.",
    architecture: [
      "Clean Architecture with Dependency Injection",
      "Parallel data processing pipelines",
      "Optimized SQL queries with materialized views",
      "React.js frontend with efficient state management"
    ],
    implementation: [
      "Re-designed data aggregation layer",
      "Implemented incremental data refresh",
      "Built interactive dashboards with drill-down",
      "Created comprehensive API documentation"
    ],
    results: [
      "70% improvement in reporting and data refresh rates",
      "System processes millions of records with minimal latency",
      "Decision-making became faster across departments",
      "Successful knowledge transfer to client team"
    ],
    improvements: "Would explore adding predictive analytics and automated alerting for margin anomalies.",
    tech: [".NET Core", "React.js", "Azure", "PowerBI", "SQL Server"]
  }
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  institution: "The Islamia University of Bahawalpur",
  period: "2016 - 2020",
  cgpa: "3.61/4.0"
};

export const categories = ["All", "Enterprise", "SaaS", "Fintech"];

export const techFilters = [
  "All",
  ".NET Core",
  "React.js",
  "Azure",
  "Docker",
  "Kubernetes",
  "SQL Server"
];