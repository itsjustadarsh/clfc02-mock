import type { StudyTopic } from "@/lib/types";

export const domain1Topics: StudyTopic[] = [
  {
    title: "Cloud Computing Fundamentals",
    slug: "cloud-computing-fundamentals",
    sections: [
      {
        heading: "What Is Cloud Computing?",
        points: [
          "Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing",
          "Instead of buying, owning, and maintaining physical data centers and servers, you access technology services (compute, storage, databases) from a cloud provider like AWS",
          "Cloud computing eliminates the need for upfront capital investment in hardware and reduces the undifferentiated heavy lifting of managing infrastructure",
          "AWS operates a shared responsibility model: AWS manages the infrastructure, you manage what you put in the cloud",
        ],
        tip: "The exam defines cloud computing using the NIST definition. Know all 5 characteristics by name.",
      },
      {
        heading: "5 NIST Characteristics of Cloud Computing",
        points: [
          "On-Demand Self-Service: Provision resources (servers, storage, networks) automatically without requiring human interaction with the provider",
          "Broad Network Access: Resources are available over the network and accessed through standard mechanisms (e.g., HTTPS, APIs, CLI, SDKs)",
          "Resource Pooling: Provider's resources are pooled to serve multiple consumers using a multi-tenant model; physical and virtual resources are dynamically assigned based on demand",
          "Rapid Elasticity: Capabilities can be elastically provisioned and released to scale outward and inward with demand, appearing unlimited to the consumer",
          "Measured Service: Resource usage is monitored, controlled, reported, and billed transparently (pay only for what you consume)",
        ],
        tip: "NIST characteristics are a frequent exam topic. Remember the acronym BRRMO: Broad network access, Resource pooling, Rapid elasticity, Measured service, On-demand self-service.",
      },
      {
        heading: "Benefits of Cloud Computing",
        points: [
          "Agility: Spin up resources in minutes instead of weeks; experiment and innovate faster",
          "Elasticity: Automatically scale resources up or down to match actual demand, avoiding over-provisioning",
          "Cost Savings: Convert large upfront capital expenses (CapEx) into smaller variable operational expenses (OpEx)",
          "Global Reach: Deploy applications in multiple AWS Regions worldwide in minutes",
          "Reliability: AWS infrastructure is designed for high availability with multiple Availability Zones and Regions",
          "Security: AWS provides a secure global infrastructure with hundreds of compliance certifications and security controls",
          "Performance: Access to the latest hardware and technologies without managing procurement cycles",
        ],
      },
    ],
  },
  {
    title: "6 Advantages of Cloud Computing",
    slug: "six-advantages-of-cloud",
    sections: [
      {
        heading: "AWS 6 Advantages of Cloud Computing",
        points: [
          "These are AWS's official 6 advantages, frequently tested on the exam",
          "They form the foundation of the cloud value proposition and appear throughout multiple exam questions",
          "You should be able to identify which advantage applies to a given scenario",
        ],
        tip: "Know all 6 advantages by heart. The exam will describe a scenario and ask which advantage it represents.",
      },
      {
        heading: "1. Trade Fixed Expense for Variable Expense",
        points: [
          "Instead of investing heavily in data centers and servers before knowing how you will use them, pay only when you consume resources",
          "CapEx (Capital Expenditure) = upfront cost of buying physical infrastructure (servers, data centers)",
          "OpEx (Operational Expenditure) = ongoing cost of running services, pay-as-you-go",
          "Cloud shifts spending from CapEx to OpEx, reducing financial risk",
          "No long-term contracts or upfront commitments required for most services (On-Demand pricing)",
        ],
      },
      {
        heading: "2. Benefit from Massive Economies of Scale",
        points: [
          "AWS aggregates usage from hundreds of thousands of customers, achieving higher economies of scale",
          "Higher economies of scale translate into lower pay-as-you-go prices for you",
          "You could never achieve the same volume discounts on hardware, power, and cooling as AWS can",
          "AWS has reduced prices over 100 times since 2006",
        ],
      },
      {
        heading: "3. Stop Guessing Capacity",
        points: [
          "In traditional IT, if you over-provision you waste money on idle resources; if you under-provision you suffer performance issues",
          "Cloud lets you access as much or as little capacity as you need and scale up and down as required",
          "Auto Scaling automatically adjusts capacity based on demand, so you never over- or under-provision",
          "You only pay for what you actually use, eliminating the guessing game",
        ],
      },
      {
        heading: "4. Increase Speed and Agility",
        points: [
          "New IT resources are a click away, reducing the time to make resources available from weeks to minutes",
          "Dramatically increases agility for the organization since the cost and time to experiment is significantly lower",
          "Developers can test new ideas quickly without large upfront investments",
          "Fail fast: if an experiment does not work, you can deprovision resources immediately with minimal cost",
        ],
      },
      {
        heading: "5. Stop Spending Money Running and Maintaining Data Centers",
        points: [
          "Focus on projects that differentiate your business, not on the infrastructure",
          "Eliminate the undifferentiated heavy lifting: racking servers, managing power/cooling, physical security",
          "Let AWS handle the operational burden of managing infrastructure so your teams can focus on customers",
          "No need to hire staff for hardware procurement, maintenance, and data center operations",
        ],
      },
      {
        heading: "6. Go Global in Minutes",
        points: [
          "Deploy your application in multiple AWS Regions around the world with just a few clicks",
          "Provide lower latency and a better experience for customers at minimal cost",
          "AWS has 30+ Regions globally with 90+ Availability Zones",
          "Use services like Amazon CloudFront (CDN) to cache content at 400+ edge locations worldwide",
        ],
      },
    ],
  },
  {
    title: "Cloud Deployment Models",
    slug: "cloud-deployment-models",
    sections: [
      {
        heading: "Overview of Deployment Models",
        points: [
          "The deployment model defines WHERE your cloud infrastructure lives and WHO manages it",
          "The three primary models are Public Cloud, Private Cloud, and Hybrid Cloud",
          "Multi-cloud is also tested on the exam as a strategy using multiple cloud providers",
          "The right model depends on business requirements: security, compliance, budget, and control needs",
        ],
        tip: "The exam loves hybrid cloud scenarios. If a question mentions on-premises + AWS together, the answer is almost always hybrid cloud.",
      },
      {
        heading: "Public Cloud",
        points: [
          "Cloud resources (servers, storage) are owned and operated by a third-party provider and delivered over the internet",
          "AWS, Microsoft Azure, and Google Cloud Platform are examples of public cloud providers",
          "All hardware, software, and supporting infrastructure is owned and managed by the cloud provider",
          "You share the underlying infrastructure with other tenants (multi-tenant) but your data is logically isolated",
          "Lowest cost model: no hardware to purchase, pay only for what you use",
          "Highest agility: resources available on-demand in minutes",
        ],
      },
      {
        heading: "Private Cloud (On-Premises)",
        points: [
          "Cloud infrastructure is provisioned for exclusive use by a single organization",
          "Can be hosted on-premises in your own data center or by a third-party provider",
          "Gives you full control over hardware, security, and data",
          "Higher cost due to purchasing, maintaining, and managing your own infrastructure",
          "AWS Outposts brings AWS infrastructure and services to your on-premises data center (still managed by AWS)",
          "Also called on-premises or \"on-prem\" deployment",
          "Used when regulatory or compliance requirements mandate full control over data location",
        ],
      },
      {
        heading: "Hybrid Cloud",
        points: [
          "Combines public cloud (AWS) with private cloud / on-premises infrastructure",
          "Allows you to keep sensitive data on-premises while leveraging the public cloud for scalable workloads",
          "Common during migration: run some workloads on-premises while gradually moving others to AWS",
          "AWS services for hybrid: AWS Outposts, AWS Direct Connect, AWS VPN, AWS Storage Gateway",
          "Provides flexibility to choose where each workload runs based on requirements",
          "Example: Keep a legacy database on-premises while running the web tier in AWS",
        ],
        services: [
          {
            name: "AWS Outposts",
            description: "Run AWS infrastructure and services on-premises for a consistent hybrid experience",
            keyFact: "Fully managed by AWS, extends AWS to your data center",
          },
          {
            name: "AWS Direct Connect",
            description: "Dedicated private network connection from on-premises to AWS",
            keyFact: "Provides consistent, low-latency connectivity (does NOT go over the public internet)",
          },
          {
            name: "AWS Storage Gateway",
            description: "Hybrid cloud storage that connects on-premises environments with AWS cloud storage",
            keyFact: "Caches frequently accessed data on-premises while storing full dataset in S3",
          },
        ],
      },
      {
        heading: "Multi-Cloud",
        points: [
          "Using two or more cloud providers simultaneously (e.g., AWS + Azure + GCP)",
          "Avoids vendor lock-in and leverages best-of-breed services from each provider",
          "Increases complexity in management, networking, and security",
          "Not the same as hybrid cloud (hybrid = cloud + on-premises; multi-cloud = multiple cloud providers)",
          "May be required for compliance or redundancy reasons",
        ],
        tip: "Do not confuse hybrid cloud with multi-cloud. Hybrid = on-prem + cloud. Multi-cloud = cloud + cloud.",
      },
    ],
  },
  {
    title: "Cloud Service Models (IaaS, PaaS, SaaS)",
    slug: "cloud-service-models",
    sections: [
      {
        heading: "Overview of Service Models",
        points: [
          "Service models define the level of control, flexibility, and management responsibility you have",
          "IaaS gives you the most control; SaaS gives you the least control but the least management burden",
          "As you move from IaaS to SaaS, the cloud provider manages more and you manage less",
          "Understanding the service model helps you choose the right AWS service for a given scenario",
        ],
      },
      {
        heading: "IaaS (Infrastructure as a Service)",
        points: [
          "Provides the basic building blocks of cloud IT: compute, storage, networking",
          "Highest level of flexibility and control over your IT resources",
          "You manage the OS, middleware, runtime, applications, and data",
          "The provider manages the physical hardware, networking, and virtualization layer",
          "Most similar to existing on-premises IT resources",
          "Example scenario: You need full control over the OS and want to install custom software",
        ],
        services: [
          {
            name: "Amazon EC2",
            description: "Virtual servers in the cloud with full control over the OS and configuration",
            keyFact: "IaaS flagship service. You choose instance type, OS, storage, and networking.",
          },
          {
            name: "Amazon VPC",
            description: "Logically isolated virtual network that you define and control",
            keyFact: "You control subnets, route tables, gateways, and security groups",
          },
          {
            name: "Amazon EBS",
            description: "Block-level storage volumes for use with EC2 instances",
            keyFact: "Persistent storage that exists independently of EC2 instance lifecycle",
          },
        ],
      },
      {
        heading: "PaaS (Platform as a Service)",
        points: [
          "Removes the need to manage underlying infrastructure (OS, patching, hardware)",
          "You focus on deploying and managing your applications; the provider handles the platform",
          "Reduces operational complexity and lets developers focus on code, not infrastructure",
          "You manage your application code and data; the provider manages everything else",
          "Example scenario: Developer wants to deploy a web app without managing servers or OS patches",
        ],
        services: [
          {
            name: "AWS Elastic Beanstalk",
            description: "Deploy and manage web applications without worrying about the infrastructure",
            keyFact: "Upload your code and Beanstalk handles capacity provisioning, load balancing, scaling, and health monitoring. You still have full control of underlying resources if needed.",
          },
          {
            name: "Amazon RDS",
            description: "Managed relational database service (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora)",
            keyFact: "AWS manages backups, patching, scaling, and replication. You manage the data and queries.",
          },
          {
            name: "AWS Lambda",
            description: "Run code without provisioning or managing servers (serverless compute)",
            keyFact: "Sometimes classified as FaaS (Function as a Service). Pay only for compute time consumed.",
          },
        ],
      },
      {
        heading: "SaaS (Software as a Service)",
        points: [
          "Completed software product that the provider runs and manages",
          "You only use the application; all infrastructure, platform, and software is managed for you",
          "Typically accessed via a web browser or API",
          "Least amount of management responsibility on your part",
          "Example scenario: Company needs email or video conferencing without managing any infrastructure",
        ],
        services: [
          {
            name: "Amazon WorkSpaces",
            description: "Managed virtual desktop service (Desktop as a Service)",
            keyFact: "Fully managed Windows or Linux desktops accessible from any device",
          },
          {
            name: "Amazon Chime",
            description: "Communications service for online meetings, video conferencing, and chat",
            keyFact: "SaaS product: no infrastructure to manage, just use the service",
          },
          {
            name: "Amazon Connect",
            description: "Cloud-based contact center service",
            keyFact: "Pay-per-use cloud contact center, no upfront costs or long-term commitments",
          },
        ],
      },
      {
        heading: "Service Model Comparison",
        points: [
          "The key differentiator is WHO manages WHAT in the technology stack",
          "On-premises (traditional IT): You manage everything from physical servers to applications",
          "IaaS: Provider manages hardware/virtualization; you manage OS through application",
          "PaaS: Provider manages hardware through runtime; you manage application and data",
          "SaaS: Provider manages everything; you just use the software",
        ],
        comparison: {
          headers: [
            "Layer",
            "On-Premises",
            "IaaS",
            "PaaS",
            "SaaS",
          ],
          rows: [
            ["Applications", "You", "You", "You", "Provider"],
            ["Data", "You", "You", "You", "Provider"],
            ["Runtime", "You", "You", "Provider", "Provider"],
            ["Middleware", "You", "You", "Provider", "Provider"],
            ["Operating System", "You", "You", "Provider", "Provider"],
            ["Virtualization", "You", "Provider", "Provider", "Provider"],
            ["Servers", "You", "Provider", "Provider", "Provider"],
            ["Storage", "You", "Provider", "Provider", "Provider"],
            ["Networking", "You", "Provider", "Provider", "Provider"],
          ],
        },
        tip: "The exam may describe a scenario and ask you to identify the service model. Focus on who is managing what. If you manage the OS, it is IaaS. If you only manage code, it is PaaS. If you manage nothing, it is SaaS.",
      },
    ],
  },
  {
    title: "AWS Well-Architected Framework",
    slug: "well-architected-framework",
    sections: [
      {
        heading: "Overview",
        points: [
          "The AWS Well-Architected Framework provides best practices and guidance for designing cloud architectures",
          "Originally had 5 pillars; the Sustainability pillar was added in 2021 making it 6 pillars total",
          "Each pillar has design principles and a set of questions to evaluate your architecture",
          "AWS provides a free Well-Architected Tool in the console to review your workloads against best practices",
          "This framework is HEAVILY tested on the CLF-C02 exam. Know all 6 pillars and their key principles.",
        ],
        tip: "Remember the 6 pillars with the acronym SCROPS: Security, Cost Optimization, Reliability, Operational Excellence, Performance Efficiency, Sustainability.",
      },
      {
        heading: "1. Operational Excellence",
        points: [
          "Focus: Run and monitor systems to deliver business value and continually improve supporting processes",
          "Perform operations as code (Infrastructure as Code / IaC)",
          "Make frequent, small, reversible changes rather than large infrequent changes",
          "Refine operations procedures frequently based on lessons learned",
          "Anticipate failure: perform pre-mortem exercises and game days",
          "Learn from all operational events and failures",
        ],
        services: [
          {
            name: "AWS CloudFormation",
            description: "Infrastructure as Code: define and provision AWS resources using templates",
            keyFact: "Enables operations as code, a core Operational Excellence principle",
          },
          {
            name: "AWS Config",
            description: "Track resource configurations and changes over time",
            keyFact: "Enables compliance auditing and change management",
          },
          {
            name: "Amazon CloudWatch",
            description: "Monitoring and observability service for AWS resources and applications",
            keyFact: "Central service for metrics, logs, alarms, and dashboards",
          },
        ],
      },
      {
        heading: "2. Security",
        points: [
          "Focus: Protect information, systems, and assets while delivering business value through risk assessment and mitigation",
          "Implement a strong identity foundation: principle of least privilege, centralize identity management (IAM)",
          "Enable traceability: monitor, alert, and audit all actions and changes (CloudTrail)",
          "Apply security at all layers (edge, VPC, subnet, instance, OS, application)",
          "Automate security best practices using templates and automation",
          "Protect data in transit (TLS/SSL) and at rest (encryption with KMS)",
          "Keep people away from data: reduce need for direct access to data",
          "Prepare for security events: run incident response simulations",
        ],
        services: [
          {
            name: "AWS IAM",
            description: "Manage access to AWS services and resources securely",
            keyFact: "Foundation of security: controls WHO can do WHAT on WHICH resources",
          },
          {
            name: "AWS CloudTrail",
            description: "Log, monitor, and retain account activity across your AWS infrastructure",
            keyFact: "Records API calls for your account. Answers WHO did WHAT and WHEN.",
          },
          {
            name: "AWS KMS",
            description: "Create and manage encryption keys for data protection",
            keyFact: "Central service for encryption key management across AWS",
          },
        ],
      },
      {
        heading: "3. Reliability",
        points: [
          "Focus: Ensure a workload performs its intended function correctly and consistently when expected",
          "Automatically recover from failure using health checks and automated recovery",
          "Test recovery procedures: simulate failures to validate recovery processes",
          "Scale horizontally to increase aggregate workload availability (many small resources vs. one large)",
          "Stop guessing capacity: use Auto Scaling to match demand",
          "Manage change in automation: use Infrastructure as Code to make infrastructure changes predictable",
          "Key concepts: fault tolerance, high availability, disaster recovery",
        ],
        services: [
          {
            name: "Amazon CloudWatch",
            description: "Monitor resources and trigger alarms for automated recovery",
            keyFact: "Detects failures and can trigger Auto Scaling or SNS notifications",
          },
          {
            name: "AWS Auto Scaling",
            description: "Automatically adjust resource capacity to maintain steady, predictable performance",
            keyFact: "Enables automatic recovery and eliminates capacity guessing",
          },
          {
            name: "Amazon S3",
            description: "Object storage with 99.999999999% (11 nines) durability",
            keyFact: "Automatically replicates data across multiple AZs within a Region",
          },
        ],
      },
      {
        heading: "4. Performance Efficiency",
        points: [
          "Focus: Use computing resources efficiently to meet system requirements and maintain efficiency as demand changes",
          "Democratize advanced technologies: use managed services instead of building your own (e.g., use RDS instead of managing your own database server)",
          "Go global in minutes: deploy workloads in multiple Regions for lower latency",
          "Use serverless architectures to remove the operational burden of managing servers",
          "Experiment more often: comparative testing is easy in the cloud",
          "Consider mechanical sympathy: use the right resource type for your workload (e.g., compute-optimized vs. memory-optimized instances)",
        ],
        services: [
          {
            name: "AWS Lambda",
            description: "Serverless compute that runs code without provisioning servers",
            keyFact: "Enables serverless architectures for maximum performance efficiency",
          },
          {
            name: "Amazon CloudFront",
            description: "Content delivery network (CDN) that caches content at edge locations globally",
            keyFact: "Reduces latency by serving content from locations closest to users",
          },
          {
            name: "Amazon ElastiCache",
            description: "In-memory caching service (Redis or Memcached)",
            keyFact: "Improves application performance by caching frequently accessed data",
          },
        ],
      },
      {
        heading: "5. Cost Optimization",
        points: [
          "Focus: Run systems to deliver business value at the lowest price point",
          "Implement cloud financial management: dedicate a team to manage cloud costs",
          "Adopt a consumption model: pay only for what you use",
          "Measure overall efficiency: track business output vs. cost",
          "Stop spending money on undifferentiated heavy lifting: use managed services",
          "Analyze and attribute expenditure: use tags and cost allocation to understand where money goes",
          "Right-size resources: match instance types and sizes to workload requirements",
          "Use the right pricing model: Reserved Instances, Savings Plans, Spot Instances",
        ],
        services: [
          {
            name: "AWS Cost Explorer",
            description: "Visualize, understand, and manage your AWS costs and usage over time",
            keyFact: "Provides cost forecasting and recommendations for Reserved Instances",
          },
          {
            name: "AWS Budgets",
            description: "Set custom cost and usage budgets and receive alerts",
            keyFact: "Alerts you when costs exceed or are forecasted to exceed your budget",
          },
          {
            name: "AWS Trusted Advisor",
            description: "Recommends optimizations across cost, performance, security, fault tolerance, and service limits",
            keyFact: "Identifies idle resources and underutilized instances for cost savings",
          },
        ],
      },
      {
        heading: "6. Sustainability",
        points: [
          "Focus: Minimize the environmental impacts of running cloud workloads",
          "Newest pillar, added in December 2021 - expect it on the CLF-C02 exam",
          "Understand your impact: measure the environmental impact of your cloud workloads",
          "Establish sustainability goals: set goals for each workload",
          "Maximize utilization: right-size resources so you use what you need and reduce waste",
          "Adopt new, more efficient hardware and software offerings as they become available",
          "Use managed services: shared services reduce per-customer resource usage",
          "Reduce the downstream impact of your cloud workloads: minimize data transfer and resources consumed by end users",
        ],
        tip: "Sustainability is the newest pillar and is tested on CLF-C02. The key theme is reducing environmental impact by maximizing resource efficiency.",
      },
    ],
  },
  {
    title: "AWS Cloud Adoption Framework (CAF)",
    slug: "cloud-adoption-framework",
    sections: [
      {
        heading: "Overview of AWS CAF",
        points: [
          "AWS CAF provides guidance to help organizations plan and execute their cloud adoption journey",
          "Organizes guidance into 6 perspectives that cover the key areas of cloud transformation",
          "The 6 perspectives are divided into two groups: Business capabilities and Technical capabilities",
          "Business capabilities: Business, People, Governance",
          "Technical capabilities: Platform, Security, Operations",
          "Each perspective is owned by specific stakeholders in the organization",
        ],
        tip: "Know which perspectives are Business-focused (Business, People, Governance) and which are Technical-focused (Platform, Security, Operations). The exam will test this grouping.",
      },
      {
        heading: "Business Perspective",
        points: [
          "Ensures cloud investments align with business objectives and accelerate business outcomes",
          "Key stakeholders: CEO, CFO, COO, CIO, CTO",
          "Focuses on: business case development, strategy alignment, financial management",
          "Helps ensure IT is aligned with business needs and IT investments are traceable to business results",
          "Key capabilities: strategy management, portfolio management, innovation management, data monetization",
        ],
      },
      {
        heading: "People Perspective",
        points: [
          "Helps HR and workforce leaders prepare the organization for cloud adoption",
          "Key stakeholders: CIO, COO, CTO, Cloud Director, HR leaders",
          "Focuses on: organizational change management, training, and workforce transformation",
          "Evaluates organizational structures and roles to identify skill gaps",
          "Key capabilities: culture evolution, transformational leadership, cloud fluency, workforce transformation",
        ],
      },
      {
        heading: "Governance Perspective",
        points: [
          "Aligns IT strategy with business strategy and ensures benefits from cloud are maximized while risks are minimized",
          "Key stakeholders: CTO, CFO, CDO (Chief Data Officer), CIO",
          "Focuses on: risk management, compliance, program and project management, cloud financial management",
          "Ensures you have processes and governance to manage cloud at scale",
          "Key capabilities: program and project management, benefits management, risk management, cloud financial management",
        ],
      },
      {
        heading: "Platform Perspective",
        points: [
          "Helps build an enterprise-grade, scalable, hybrid cloud platform",
          "Key stakeholders: CTO, IT Managers, Solutions Architects, Engineers",
          "Focuses on: building the cloud platform infrastructure and architecture",
          "Includes principles for implementing new solutions and migrating existing workloads",
          "Key capabilities: platform architecture, data architecture, platform engineering, provisioning automation",
        ],
      },
      {
        heading: "Security Perspective",
        points: [
          "Helps achieve confidentiality, integrity, and availability of data and cloud workloads",
          "Key stakeholders: CISO (Chief Information Security Officer), CCO (Chief Compliance Officer), security teams",
          "Focuses on: identity and access management, security controls, threat detection, incident response",
          "Aligns with the AWS Shared Responsibility Model",
          "Key capabilities: security governance, security assurance, identity and access management, threat detection, vulnerability management, infrastructure protection, data protection, application security, incident response",
        ],
      },
      {
        heading: "Operations Perspective",
        points: [
          "Helps ensure cloud services are delivered at a level that meets business needs",
          "Key stakeholders: IT Operations Managers, IT Support Managers, SRE teams",
          "Focuses on: managing day-to-day cloud operations, monitoring, incident management",
          "Ensures workloads are operated to the degree needed to support business processes",
          "Key capabilities: observability, event management, incident and problem management, change and release management, performance and capacity management, configuration management, patch management, availability and continuity management",
        ],
        tip: "CAF Operations perspective is about running cloud day-to-day. Do not confuse it with the Well-Architected Operational Excellence pillar (which is about improving processes and automation).",
      },
    ],
  },
  {
    title: "Migration Strategies (7 Rs)",
    slug: "migration-strategies-7rs",
    sections: [
      {
        heading: "Overview",
        points: [
          "The 7 Rs are migration strategies for moving workloads to the cloud",
          "Each strategy represents a different level of change to the application during migration",
          "Choosing the right strategy depends on time, cost, effort, and business requirements",
          "Some workloads may use different strategies: not everything should be rehosted or refactored",
          "AWS Migration Hub helps track the progress of migrations across multiple strategies",
        ],
        tip: "The exam will present scenarios and ask which migration strategy is best. Focus on the level of effort and change involved.",
      },
      {
        heading: "1. Rehost (Lift and Shift)",
        points: [
          "Move applications to the cloud without making any changes (as-is)",
          "Fastest and easiest migration strategy; lowest effort",
          "Good for large-scale legacy migrations when you need to migrate quickly",
          "No cloud-native optimization: you move the same application to cloud infrastructure",
          "Example: Move an on-premises VM directly to an Amazon EC2 instance",
          "Tools: AWS Application Migration Service (MGN), VM Import/Export",
          "Cost savings come from avoiding on-premises infrastructure costs, but you may not get full cloud benefits",
        ],
      },
      {
        heading: "2. Replatform (Lift, Tinker, and Shift)",
        points: [
          "Make a few cloud optimizations during migration without changing the core architecture",
          "Moderate effort; more optimized than rehost but less effort than refactoring",
          "Example: Migrate an on-premises MySQL database to Amazon RDS (managed database) instead of running MySQL on EC2",
          "Example: Move an application to Elastic Beanstalk for managed deployment",
          "You gain some cloud benefits (managed services, scaling) without a full re-architecture",
        ],
      },
      {
        heading: "3. Refactor / Re-architect",
        points: [
          "Redesign the application using cloud-native features and architecture",
          "Highest effort and cost but provides the most cloud benefits",
          "Driven by a strong business need for cloud-native features: scalability, microservices, serverless",
          "Example: Break a monolithic application into microservices using containers (ECS/EKS) or serverless (Lambda)",
          "Example: Redesign an application to use Amazon DynamoDB instead of a relational database",
          "Best long-term ROI but requires the most time and investment",
        ],
      },
      {
        heading: "4. Repurchase (Drop and Shop)",
        points: [
          "Replace the existing application with a different product, typically a SaaS solution",
          "Example: Move from an on-premises CRM to Salesforce",
          "Example: Move from a self-managed email server to Microsoft 365 or Amazon WorkMail",
          "Example: Move from an on-premises HR system to Workday",
          "Involves changing the license model or moving to a cloud-native product",
          "May require retraining users on the new platform",
        ],
      },
      {
        heading: "5. Retire",
        points: [
          "Identify applications that are no longer useful and turn them off",
          "Reduces the attack surface, complexity, and cost of your portfolio",
          "Up to 10-20% of an enterprise IT portfolio is no longer useful",
          "Ask: Is anyone still using this? Does it provide business value?",
          "Frees up resources (budget, team, focus) for applications that matter",
        ],
      },
      {
        heading: "6. Retain (Revisit)",
        points: [
          "Keep applications in the current environment (do not migrate now)",
          "May not be ready for migration due to compliance, complexity, or dependency issues",
          "Plan to revisit in the future when migration becomes feasible",
          "Example: A mainframe application with no clear cloud migration path",
          "Example: Recently purchased on-premises software with a long-term license commitment",
          "Not everything needs to move to the cloud immediately",
        ],
      },
      {
        heading: "7. Relocate",
        points: [
          "Move infrastructure to the cloud without purchasing new hardware or rewriting applications",
          "Specifically refers to moving VMware workloads to VMware Cloud on AWS",
          "The hypervisor-level migration: move entire virtual machines as-is",
          "Minimal disruption since applications, processes, and operating model stay the same",
          "Example: Move an on-premises VMware vSphere environment to VMware Cloud on AWS",
          "Lowest effort for organizations already running VMware",
        ],
        tip: "Relocate is the newest R. Remember it is specifically about VMware Cloud on AWS for moving VMware workloads. Do not confuse it with Rehost.",
      },
      {
        heading: "7 Rs Comparison",
        points: [
          "Effort increases from Retire (least) to Refactor (most)",
          "Cloud optimization increases from Rehost (least) to Refactor (most)",
          "Cost savings potential increases with cloud-native optimization",
        ],
        comparison: {
          headers: ["Strategy", "Effort Level", "Cloud Benefits", "Example"],
          rows: [
            ["Rehost", "Low", "Low", "Move VM to EC2 as-is"],
            ["Replatform", "Medium", "Medium", "Move DB to RDS"],
            ["Refactor", "High", "Highest", "Rebuild as microservices on Lambda"],
            ["Repurchase", "Medium", "Medium", "Switch from on-prem CRM to Salesforce"],
            ["Retire", "None", "N/A", "Decommission unused legacy app"],
            ["Retain", "None", "None", "Keep mainframe on-prem for now"],
            ["Relocate", "Low", "Low-Medium", "Move VMware to VMware Cloud on AWS"],
          ],
        },
      },
    ],
  },
  {
    title: "Cloud Economics and Pricing",
    slug: "cloud-economics-pricing",
    sections: [
      {
        heading: "Total Cost of Ownership (TCO)",
        points: [
          "TCO is the total cost of building, operating, and maintaining IT infrastructure over its entire lifecycle",
          "On-premises TCO includes: hardware, software licenses, data center space, power, cooling, networking, IT staff salaries, maintenance, and decommissioning",
          "Cloud TCO is significantly lower because you eliminate CapEx and reduce OpEx for infrastructure management",
          "AWS TCO savings typically range from 30-70% compared to on-premises",
          "Hidden on-premises costs: overprovisioning, unused capacity, hardware refresh cycles, disaster recovery sites",
          "When comparing TCO, include ALL costs: not just server costs but also labor, facilities, and opportunity costs",
        ],
        tip: "The exam frequently asks about TCO benefits of cloud. Remember that cloud eliminates hidden costs like overprovisioning, power/cooling, and IT labor for infrastructure management.",
      },
      {
        heading: "CapEx vs. OpEx",
        points: [
          "CapEx (Capital Expenditure): Upfront payment for physical assets (servers, data centers, networking equipment). Depreciates over time.",
          "OpEx (Operational Expenditure): Ongoing costs for running services. Pay-as-you-go, no long-term commitment.",
          "Cloud computing converts CapEx to OpEx: instead of buying a $10M data center, you pay monthly for what you use",
          "OpEx model provides financial flexibility: start small, scale as needed, and reduce costs when demand drops",
          "OpEx is better for startups and variable workloads; CapEx can be advantageous for predictable long-term workloads (but Reserved Instances bridge this gap)",
        ],
      },
      {
        heading: "AWS Pricing Models Overview",
        points: [
          "Pay-as-you-go (On-Demand): Pay for compute or services by the hour or second with no long-term commitment. Highest flexibility, highest per-unit cost.",
          "Reserved Instances / Savings Plans: Commit to 1 or 3 years of usage for up to 72% discount. Best for steady-state, predictable workloads.",
          "Spot Instances: Bid for unused AWS capacity at up to 90% discount. Can be interrupted with 2-minute warning. Best for fault-tolerant, flexible workloads (batch processing, CI/CD, data analysis).",
          "Dedicated Hosts: Physical server fully dedicated to your use. Most expensive. Required for server-bound software licenses or strict compliance needs.",
          "Free Tier: Some services are always free (IAM, VPC), some are free for 12 months (EC2 t2.micro, S3 5GB), some have short trials.",
        ],
        comparison: {
          headers: ["Pricing Model", "Discount", "Commitment", "Best For"],
          rows: [
            ["On-Demand", "None (full price)", "None", "Short-term, unpredictable workloads"],
            ["Reserved / Savings Plans", "Up to 72%", "1 or 3 years", "Steady-state, predictable workloads"],
            ["Spot Instances", "Up to 90%", "None (can be interrupted)", "Fault-tolerant, flexible workloads"],
            ["Dedicated Hosts", "None (premium pricing)", "On-Demand or Reserved", "Compliance, licensing requirements"],
          ],
        },
        tip: "For exam questions about cost savings: Spot = highest discount (up to 90%) but can be interrupted. Reserved/Savings Plans = best for predictable workloads (up to 72% off). On-Demand = most flexible, most expensive.",
      },
      {
        heading: "Right-Sizing",
        points: [
          "Right-sizing means matching instance types and sizes to your workload requirements at the lowest possible cost",
          "It is the process of analyzing deployed instances to identify opportunities to eliminate or downsize without sacrificing performance",
          "Right-sizing should be done continuously, not just at migration time",
          "AWS Cost Explorer provides right-sizing recommendations based on actual usage",
          "AWS Compute Optimizer uses machine learning to recommend optimal instance types based on utilization data",
          "Example: If a c5.2xlarge instance is consistently using only 10% CPU, downsize to a c5.large",
          "Right-sizing before purchasing Reserved Instances maximizes savings",
        ],
        services: [
          {
            name: "AWS Compute Optimizer",
            description: "Recommends optimal AWS compute resources based on utilization metrics",
            keyFact: "Uses machine learning to analyze historical usage and recommend right-sizing",
          },
          {
            name: "AWS Cost Explorer",
            description: "Visualize costs and provides right-sizing recommendations for EC2",
            keyFact: "Shows cost trends and forecasts; identifies underutilized instances",
          },
        ],
      },
      {
        heading: "AWS Pricing Calculator",
        points: [
          "Free web-based tool to estimate the cost of AWS services for your use case",
          "Available at calculator.aws (replaced the old Simple Monthly Calculator)",
          "Lets you model your solution architecture and estimate monthly costs before deploying anything",
          "Can create and share cost estimates with stakeholders to build a business case",
          "Supports estimates for most AWS services including EC2, S3, RDS, Lambda, and more",
          "Useful for comparing pricing models (On-Demand vs. Reserved) and regions",
        ],
        tip: "AWS Pricing Calculator = estimate costs BEFORE deployment. AWS Cost Explorer = analyze costs AFTER deployment. Do not confuse the two.",
      },
      {
        heading: "Additional Cost Benefits of Cloud",
        points: [
          "No upfront cost: Start using services immediately without procurement processes",
          "No long-term contracts: Most services are pay-as-you-go with no minimum commitment",
          "Volume discounts: AWS pricing includes tiered discounts as usage grows (e.g., S3 storage pricing)",
          "Automatic price reductions: AWS has reduced prices over 100 times since launch",
          "Free data transfer IN: Transferring data into AWS is always free from the internet",
          "Data transfer OUT is metered and charged (a common exam topic for cost awareness)",
          "Reserved capacity: Significant discounts for predictable usage (RIs, Savings Plans)",
          "Cost allocation tags: Tag resources to track and allocate costs to specific projects, teams, or environments",
          "Consolidated Billing: Use AWS Organizations to consolidate billing across multiple accounts and benefit from aggregated volume discounts",
        ],
      },
    ],
  },
];
