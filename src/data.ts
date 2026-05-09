export const RESUME_DATA = {
  name: "Mohanvamsi Vura",
  title: "Azure Data Engineer",
  location: "Hyderabad, India",
  email: "mohanvamsivoora@gmail.com",
  phone: "+91-7386531112",
  summary: "Azure Data Engineer with 3+ years of experience designing and implementing end-to-end ETL/ELT data pipelines on the Azure cloud platform. Proficient in Azure Data Factory, Azure Databricks (PySpark), Delta Lake, and Azure Data Lake Storage (ADLS). Skilled in Medallion Architecture, data transformation, and delivering analytical solutions for business intelligence.",
  
  skills: [
    {
      category: "Cloud & Integration",
      items: ["Microsoft Azure", "Azure Data Factory (ADF)", "Event-driven Triggers", "Pipeline Orchestration", "Azure Logic Apps"]
    },
    {
      category: "Big Data & Processing",
      items: ["Azure Databricks", "Apache Spark", "PySpark", "Delta Lake", "Medallion Architecture"]
    },
    {
      category: "Storage & Databases",
      items: ["ADLS Gen2", "Azure SQL Database", "Delta Tables", "SQL Query Tuning"]
    },
    {
      category: "Programming & BI",
      items: ["Python", "SQL", "Power BI", "Data Modeling"]
    }
  ],

  experience: [
    {
      role: "Azure Data Engineer",
      company: "Tata Consultancy Services (TCS)",
      location: "Hyderabad, Telangana",
      period: "Nov 2022 – Present",
      achievements: [
        "Architected ETL/ELT pipelines using ADF to ingest 10+ file feeds daily from SFTP/SharePoint into ADLS Gen2.",
        "Implemented Medallion Architecture (Bronze/Silver/Gold) in Databricks, enabling incremental loads with ACID transactions.",
        "Reduced query latency by ~30% through Delta table optimization for Power BI reporting.",
        "Engineered pipeline observability and idempotency checks, reducing data incidents by ~40%.",
        "Automated file-based triggers in ADF for real-time ingestion.",
        "Integrated Logic Apps for automated alerting and Outlook-to-SharePoint file routing."
      ]
    },
    {
      role: "PPM Support Analyst (Data)",
      company: "Tata Consultancy Services (TCS)",
      location: "Hyderabad, Telangana",
      period: "2021 – 2022",
      achievements: [
        "Designed and optimized SQL queries, views, and stored procedures for business reporting.",
        "Performed back-end data validation and quality checks for high-accuracy BI reports.",
        "Gained hands-on experience in SQL query tuning and report generation in production environments."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology",
      field: "Electronics and Communications Engineering",
      institution: "Gudlavalleru Engineering College",
      period: "2017 – 2021",
      score: "CGPA: 7.5 / 10"
    }
  ],

  certifications: [
    {
      name: "Databricks Certified Data Engineer Associate",
      issuer: "Databricks",
      year: "2025"
    }
  ],

  socials: [
    { name: "Email", url: "mailto:mohanvamsivoora@gmail.com", icon: "Mail" },
    { name: "LinkedIn", url: "#", icon: "Linkedin" },
    { name: "GitHub", url: "#", icon: "Github" }
  ]
};
