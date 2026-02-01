// Portfolio Data - M Usman Amjad
import faisalHameed_Testimonials from "../imgs/professional/FaisalHameed_Testimonials.jpg";
import talha_testimonials from "../imgs/professional/talha_testimonials.png";
import Vlad__Testimonials from "../imgs/professional/Vlad__Testimonials.jpg";
import Arthur_testimonials from "../imgs/clients/Arthur_testimonials.jpg";
import Monika_testimonial from "../imgs/clients/Monika_testimonial.png";
import tyler_testimonials from "../imgs/clients/tyler_testimonials.png";
import usmanamjad from "../imgs/others/usmanamjadmain.jpeg";




export const personalInfo = {
  name: "M Usman Amjad",
  title: "Senior Software Engineer",
  tagline: "Building Scalable Solutions with .NET, React & Azure",
  email: "usmanamjad.dev@gmail.com",
  phone: "+92 342-8724610",
  location: "Lahore, Pakistan",
  linkedin: "https://linkedin.com/in/musmanamjad1",
  github: "https://github.com/devusmanamjad",
  upwork: "https://www.upwork.com/freelancers/~0191bd47d8180a628a",
  twitter: "",
  whatsapp: "https://wa.me/923428724610?text=Hi,%20I’m%20Usman,%20a%20passionate%20Full%20Stack%20Developer.%20For%20quick%20discussions%20and%20inquiries,%20you%20can%20connect%20with%20me%20on%20WhatsApp%20directly:",
  photo: usmanamjad,
  about: `Results-driven Software Engineer with over around 5 years of experience specializing in .NET Core, React.js, and Azure Cloud. I've built scalable applications for fintech, SaaS, and enterprise solutions that serve thousands of users daily.

My expertise spans from developing efficient UIs and integrating complex APIs to delivering high-performance cloud solutions. I'm passionate about improving system architecture and maintaining software quality standards that meet diverse client needs across global teams.`,
  resumeUrl: "https://drive.google.com/file/d/1SQysf0RrEqzeeYOcizUcMzBsWnSml6H7/view?usp=sharing"
};

// Professional Testimonials (from colleagues, managers, team leads)
export const professionalTestimonials = [
  {
    id: 1,
    name: "Vladyslav Vorobiov",
    role: "Senior Frontend Engineer",
    company: "Ciklum",
    image: Vlad__Testimonials,
    text: "I've been working with Usman as backend engineer on highly loaded web application for millions of clients over the world. I'd like to point out his professional strengths and technical knowledge in different backend tools and technologies. Really nice team member, always is ready to help with difficult tasks and questions. This is a pleasure to work with Usman in the one team!",
    rating: 5
  },
  {
    id: 2,
    name: "Faisal Hameed",
    role: "Pricipal Software Engineer",
    company: "Tkxel",
    image: faisalHameed_Testimonials,
    text: "I had the pleasure of working closely with Usman Amjad, and I can confidently say he is one of the most talented and dedicated full stack software developers I have encountered. Usman consistently demonstrates a deep understanding of both front-end and back-end development, showcasing his ability to seamlessly integrate complex features and optimize performance across the stack. His problem-solving skills are top-notch, and he always approaches challenges with a calm, logical mindset. Whether it’s debugging a complex issue or coming up with innovative solutions, Usman is quick to dive deep into the problem and provide a clear, efficient path forward. Moreover, Usman is a great team player. He communicates effectively, is always open to feedback, and is quick to assist his colleagues when needed. His positive attitude and dedication to continuous improvement make him a valuable asset to any team. I highly recommend Usman for any role that requires a skilled and versatile full stack developer.",
    rating: 5
  },
  {
    id: 3,
    name: "Talha Munir",
    role: "Co-Founder",
    company: "Netfication",
    image: talha_testimonials,
    text: "I highly recommend Usman based on our work together. Beyond his strong coding abilities, Usman stands out for his proactive communication and his 'can-do' attitude toward challenging bugs. He doesn't just write code; he thinks about the long-term health of the product. He was a dependable teammate who always shared knowledge and helped elevate the work of those around him. 👏",
    rating: 5
  }
];

// Client Testimonials (from Upwork and direct clients)
export const clientTestimonials = [
  {
    id: 1,
    name: "Tyler Shaw",
    role: "Business Development Manager",
    company: "Range Marketing",
    location: "United States",
    image: tyler_testimonials,
    text: " If you're reading this, obviously you're probably interested in working with Usman here. Just wanna let you know, fantastic to work with. His response rate is incredible. He'll hop on video calls, elaborate everything, bring everything out to detail. In his proposals, he brings everything to detail. Very fair and honest guy. I would recommend Usman to anyone looking for his IT services. He's been great to work with. And we had a lot of fun too. It felt more of a partnership than just a business transaction. So again, really appreciate everything you've done for me, Usman, and I look forward to referring and working with Usman as well in the future here.",
    rating: 5,
    platform: "Upwork"
  },
  {
    id: 2,
    name: "Monika Sparring",
    role: "Project Manager",
    company: "Sparring",
    location: "Denmark",
    image: Monika_testimonial,
    text: "Usman was a great collaborator throughout the project. He understood what the project needed, communicated well, and was always easy to reach. His skill and professionalism made everything run smoothly, and he has my highest recommendations.",
    rating: 5,
    platform: "Upwork"
  },
  {
    id: 3,
    name: "Arthur J. ",
    role: "Chief Executive Officer",
    company: "Emformance",
    location: "United States",
    image: Arthur_testimonials,
    text: "Usman is an amazing, professional and very trust worthy Freelancer. My work with him was completely beyond my expectations. I will recommend him anyday and invite him to any software project I have.",
    rating: 5,
    platform: "Upwork"
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
    { name: ".NET", level: 95 },
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
    team: "Multi-national",
    // Extended Details
    fullDescription: "A comprehensive enterprise tax platform serving thousands of tax professionals across the United States. The platform handles complex tax calculations, document management, and compliance workflows for one of the world's largest professional services firms.",
    duration: "Feb 2025 - Present",
    teamSize: "20+ engineers across US, Europe, and Asia",
    responsibilities: [
      "Designed and implemented event-driven microservices using .NET Core and Azure Service Bus",
      "Containerized services with Docker and orchestrated deployments via Kubernetes (AKS)",
      "Built resilient APIs with retry patterns, circuit breakers, and poison-queue strategies",
      "Implemented distributed tracing and structured logging for observability",
      "Developed comprehensive unit and integration test suites, improving code coverage by 40%",
      "Collaborated with architects on system design decisions and technical documentation"
    ],
    challenges: [
      "Ensuring 99.9% uptime during peak tax season with millions of concurrent users",
      "Managing complex data consistency across distributed microservices",
      "Meeting strict compliance requirements for sensitive tax data",
      "Coordinating deployments across multiple time zones with zero downtime"
    ],
    outcomes: [
      "Successfully processing thousands of concurrent tax calculations",
      "Reduced deployment time from hours to minutes with automated CI/CD",
      "Achieved target code coverage across all services",
      "Zero-downtime deployments to production"
    ]
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
    metrics: "45% increase in listing throughput",
    // Extended Details
    fullDescription: "A powerful SaaS platform designed for high-volume marketplace sellers to automate their product listing, pricing strategies, and inventory management across multiple e-commerce platforms including Amazon, eBay, and Walmart.",
    duration: "8 months",
    teamSize: "6 engineers",
    responsibilities: [
      "Architected and built the backend API using .NET Core with clean architecture principles",
      "Developed responsive React.js frontend with real-time inventory dashboards",
      "Implemented bulk listing engine capable of processing 10,000+ SKUs simultaneously",
      "Built intelligent pricing algorithms considering competitor data and profit margins",
      "Integrated with multiple marketplace APIs (Amazon MWS, eBay API, Walmart API)",
      "Designed asynchronous job processing system for heavy operations"
    ],
    challenges: [
      "Handling rate limits from various marketplace APIs efficiently",
      "Processing millions of SKUs without impacting system performance",
      "Maintaining real-time inventory sync across multiple platforms",
      "Building a user-friendly interface for complex bulk operations"
    ],
    outcomes: [
      "45% increase in listing throughput for sellers",
      "Reduced inventory sync delays from hours to minutes",
      "Platform handles 10x more concurrent operations than before",
      "Improved seller retention by 35%"
    ]
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
    metrics: "70% improvement in reporting speed",
    // Extended Details
    fullDescription: "An enterprise-grade analytics platform that provides real-time insights into profit margins, pricing strategies, and operational efficiency. Used by Fortune 500 companies to make data-driven decisions that impact millions in revenue.",
    duration: "1 year",
    teamSize: "12 engineers across 3 countries",
    responsibilities: [
      "Led backend development using .NET Core with Clean Architecture and CQRS patterns",
      "Built interactive React.js dashboards with drill-down capabilities",
      "Optimized database queries and implemented materialized views for reporting",
      "Developed parallel data processing pipelines for real-time analytics",
      "Created comprehensive API documentation and integration guides",
      "Mentored junior developers and conducted code reviews"
    ],
    challenges: [
      "Processing millions of records with sub-second latency requirements",
      "Coordinating development across teams in different time zones",
      "Migrating legacy reports to the new real-time system",
      "Ensuring data accuracy for financial decision-making"
    ],
    outcomes: [
      "70% improvement in reporting and data refresh rates",
      "System processes millions of records with minimal latency",
      "Enabled faster decision-making across departments",
      "Successfully transferred knowledge to client's internal team"
    ]
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
    team: "Distributed",
    // Extended Details
    fullDescription: "A robust payment processing module integrated into an international student exchange program platform. Handles multi-currency transactions, automated invoicing, and compliance with international payment regulations.",
    duration: "6 months",
    teamSize: "4 engineers",
    responsibilities: [
      "Designed and implemented payment gateway integrations (Stripe, PayPal, ACH)",
      "Built automated invoicing system with multi-currency support",
      "Implemented secure payment tokenization and PCI compliance measures",
      "Developed real-time currency exchange rate integration",
      "Created comprehensive payment reconciliation reports",
      "Built webhook handlers for payment status updates"
    ],
    challenges: [
      "Ensuring PCI DSS compliance for payment data handling",
      "Managing multiple payment gateway failovers seamlessly",
      "Handling currency conversion for 30+ currencies",
      "Reconciling payments across different time zones"
    ],
    outcomes: [
      "Reduced payment processing errors by 90%",
      "Automated 100% of invoice generation",
      "Achieved PCI DSS compliance certification",
      "Decreased payment reconciliation time by 75%"
    ]
  },
  // {
  //   id: 5,
  //   name: "Global Study-Abroad Platform",
  //   category: "SaaS",
  //   description: "SaaS platform connecting universities and students across 50+ countries.",
  //   role: "Full-Stack Developer",
  //   tech: [".NET Core", "React.js", "Azure SQL", "REST APIs"],
  //   features: ["Application management", "University partnerships", "Real-time sync"],
  //   industry: "Education",
  //   team: "Global",
  //   metrics: "40% reduction in processing time",
  //   // Extended Details
  //   fullDescription: "A comprehensive SaaS platform that streamlines the study-abroad application process, connecting students with partner universities across 50+ countries. Manages applications, documents, payments, and communications in one unified system.",
  //   duration: "10 months",
  //   teamSize: "8 engineers",
  //   responsibilities: [
  //     "Built full-stack features using .NET Core backend and React.js frontend",
  //     "Designed application workflow engine supporting complex approval chains",
  //     "Implemented real-time notifications and messaging system",
  //     "Developed document management system with OCR capabilities",
  //     "Created analytics dashboards for university partners",
  //     "Built REST APIs for third-party integrations"
  //   ],
  //   challenges: [
  //     "Supporting diverse application requirements across 50+ countries",
  //     "Managing complex document verification workflows",
  //     "Ensuring data privacy compliance (GDPR, local regulations)",
  //     "Scaling to handle seasonal application surges"
  //   ],
  //   outcomes: [
  //     "40% reduction in application processing time",
  //     "Onboarded 200+ university partners globally",
  //     "Processed 50,000+ applications in first year",
  //     "Achieved 98% user satisfaction rating"
  //   ]
  // },
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
    metrics: "60% reduction in manual tasks",
    // Extended Details
    fullDescription: "A direct-to-consumer subscription platform for fresh, personalized pet food. Customers create pet profiles, receive customized meal plans, and get fresh food delivered on a recurring schedule with full logistics tracking.",
    duration: "7 months",
    teamSize: "5 engineers",
    responsibilities: [
      "Architected subscription management system with flexible billing cycles",
      "Built pet profile engine with dietary recommendations algorithm",
      "Integrated with logistics providers for real-time delivery tracking",
      "Implemented inventory management and demand forecasting",
      "Developed customer portal for subscription management",
      "Built admin dashboard for operations team"
    ],
    challenges: [
      "Managing perishable inventory with precise delivery timing",
      "Building flexible subscription system supporting pauses, skips, and modifications",
      "Integrating with multiple logistics providers across regions",
      "Ensuring food safety compliance in delivery tracking"
    ],
    outcomes: [
      "60% reduction in manual operational tasks",
      "Achieved 95% on-time delivery rate",
      "Reduced customer churn by 25%",
      "Scaled to 10,000+ active subscribers"
    ]
  },
  {
    id: 7,
    name: "XPS Solution - Self-Storage Operations Platform",
    category: "Enterprise",
    description: "Platform for 24/7 call-centre support and remote facility management.",
    role: "Full-Stack Developer",
    tech: [".NET Core", "React Native", "Azure", "REST APIs"],
    features: ["Remote management", "Mobile tenant app", "Payment automation"],
    industry: "Real Estate",
    team: "Cross-functional",
    // Extended Details
    fullDescription: "A comprehensive platform enabling remote management of self-storage facilities across multiple locations. Includes a call center management system, tenant mobile app, and automated payment processing for seamless 24/7 operations.",
    duration: "9 months",
    teamSize: "7 engineers",
    responsibilities: [
      "Developed backend APIs for facility management operations",
      "Built React Native mobile app for tenant self-service",
      "Implemented automated payment collection and late fee management",
      "Created call center dashboard for remote facility support",
      "Integrated with access control systems for remote gate management",
      "Built reporting system for facility performance analytics"
    ],
    challenges: [
      "Ensuring 24/7 system availability for access control",
      "Integrating with legacy facility management systems",
      "Building offline-capable mobile app for areas with poor connectivity",
      "Managing security for remote access control operations"
    ],
    outcomes: [
      "Enabled fully remote facility management",
      "Reduced call center response time by 50%",
      "Automated 80% of payment collections",
      "Improved tenant satisfaction scores by 40%"
    ]
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
    team: "Enterprise",
    // Extended Details
    fullDescription: "A comprehensive Loan Management System for Al Baraka Bank supporting both Islamic (Shariah-compliant) and conventional banking products. Handles the complete loan lifecycle from application to disbursement and repayment tracking.",
    duration: "2 years",
    teamSize: "15 engineers",
    responsibilities: [
      "Developed core loan processing modules using .NET Core MVC",
      "Implemented Islamic finance products (Ijarah, Mudaraba, Musharakah)",
      "Built AutoCredit integration with risk scoring engines",
      "Led data migration from legacy systems to new platform",
      "Developed ETL pipelines for core banking integration",
      "Implemented compliance reporting for regulatory requirements"
    ],
    challenges: [
      "Understanding and implementing complex Islamic finance rules",
      "Migrating decades of legacy data without disruption",
      "Integrating with multiple core banking systems",
      "Meeting strict banking regulatory compliance requirements"
    ],
    outcomes: [
      "Successfully processed $100M+ in loan disbursements",
      "Reduced loan approval time from days to hours",
      "Achieved 100% regulatory compliance",
      "Zero data loss during legacy system migration"
    ]
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