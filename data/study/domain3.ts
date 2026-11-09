import type { StudyTopic } from "@/lib/types";

export const domain3Topics: StudyTopic[] = [
  // ─── 1. AWS Global Infrastructure ───────────────────────────────────
  {
    title: "AWS Global Infrastructure",
    slug: "global-infrastructure",
    sections: [
      {
        heading: "Regions",
        points: [
          "A Region is a physical location with multiple, isolated data centers (Availability Zones).",
          "AWS has 30+ Regions worldwide (and growing).",
          "Each Region is completely independent; data does not replicate across Regions unless you configure it.",
          "Region selection criteria: compliance/data residency, latency to end users, service availability, and pricing.",
          "Not all AWS services are available in every Region -- always check the Region table.",
        ],
        tip: "Exam loves asking about Region selection. Remember the four factors: compliance, latency, service availability, and cost.",
      },
      {
        heading: "Availability Zones (AZs)",
        points: [
          "Each Region has a minimum of 3 AZs (most have 3).",
          "An AZ is one or more discrete data centers with redundant power, networking, and connectivity.",
          "AZs within a Region are connected by high-bandwidth, low-latency networking.",
          "Deploying across multiple AZs provides high availability and fault tolerance.",
          "AZ names (e.g., us-east-1a) are mapped differently per AWS account to distribute load.",
        ],
        tip: "For high availability, always deploy across at least 2 AZs. This is the most common HA pattern on the exam.",
      },
      {
        heading: "Edge Locations, Local Zones, and More",
        points: [
          "Edge Locations: Used by CloudFront and Route 53 to cache content closer to users. 400+ edge locations globally.",
          "Regional Edge Caches: Sit between origin and edge locations; hold less-popular content longer.",
          "Local Zones: Extensions of a Region placed closer to end users for single-digit ms latency (e.g., Los Angeles).",
          "Wavelength Zones: AWS infrastructure embedded in telecom 5G networks for ultra-low latency mobile apps.",
          "AWS Outposts: Fully managed AWS infrastructure delivered to your on-premises data center -- same APIs, tools, and hardware as in the cloud.",
        ],
        comparison: {
          headers: ["Infrastructure", "Location", "Primary Use Case"],
          rows: [
            ["Region", "AWS-owned facilities", "Full suite of AWS services"],
            ["Availability Zone", "Within a Region", "High availability / fault tolerance"],
            ["Edge Location", "Global PoPs", "Content caching (CloudFront / Route 53)"],
            ["Local Zone", "Near metro areas", "Low-latency compute for specific cities"],
            ["Wavelength Zone", "Telecom 5G networks", "Ultra-low latency mobile/IoT apps"],
            ["AWS Outposts", "Your data center", "Hybrid cloud with consistent AWS APIs"],
          ],
        },
      },
    ],
  },

  // ─── 2. Compute Services ────────────────────────────────────────────
  {
    title: "Compute Services",
    slug: "compute-services",
    sections: [
      {
        heading: "Amazon EC2 (Elastic Compute Cloud)",
        points: [
          "Virtual servers (instances) in the cloud -- you choose OS, instance type, storage, and networking.",
          "Instance families: General Purpose (M/T), Compute Optimized (C), Memory Optimized (R/X), Storage Optimized (I/D), and Accelerated Computing (P/G -- GPUs).",
          "You are responsible for patching the OS, securing the instance, and managing applications (IaaS model).",
          "EC2 instances run inside a VPC and can be placed in specific AZs.",
          "Amazon Machine Image (AMI) is the template used to launch an instance (OS + pre-installed software).",
          "User Data scripts run automatically at first boot for bootstrapping.",
        ],
        services: [
          {
            name: "Amazon EC2",
            description: "Resizable virtual servers in the cloud with full control over the operating system and configuration.",
            keyFact: "Foundation of AWS compute -- IaaS model where you manage the OS and above.",
          },
        ],
        tip: "Know the instance family letter codes: T/M = general, C = compute, R/X = memory, I/D = storage, P/G = GPU/accelerated.",
      },
      {
        heading: "EC2 Purchasing Options",
        points: [
          "On-Demand: Pay by the second (Linux) or hour (Windows) with no commitment. Best for unpredictable workloads.",
          "Reserved Instances (RI): 1- or 3-year commitment for up to 72% discount. Best for steady-state workloads.",
          "Savings Plans: Flexible pricing (1 or 3 years) based on committed $/hr spend. Applies across instance families.",
          "Spot Instances: Up to 90% discount by using spare capacity. Can be interrupted with 2-min notice. Best for fault-tolerant, flexible workloads.",
          "Dedicated Hosts: Physical server dedicated to you. Needed for server-bound software licenses (BYOL) or compliance.",
          "Dedicated Instances: Instances on hardware dedicated to you, but you do not control host placement.",
          "Capacity Reservations: Reserve capacity in a specific AZ -- no billing discount, but guarantees availability.",
        ],
        comparison: {
          headers: ["Option", "Commitment", "Discount", "Best For"],
          rows: [
            ["On-Demand", "None", "None (full price)", "Short-term, unpredictable workloads"],
            ["Reserved (RI)", "1 or 3 years", "Up to 72%", "Steady-state, predictable usage"],
            ["Savings Plans", "1 or 3 years ($/hr)", "Up to 72%", "Flexible commitment across families"],
            ["Spot", "None", "Up to 90%", "Fault-tolerant, batch, flexible jobs"],
            ["Dedicated Host", "On-Demand or RI", "Varies", "Licensing (BYOL), compliance"],
            ["Dedicated Instance", "On-Demand or RI", "Varies", "Hardware isolation without host control"],
          ],
        },
        tip: "Spot = cheapest but can be interrupted. Reserved/Savings Plans = best for predictable workloads. Dedicated Hosts = licensing compliance.",
      },
      {
        heading: "AWS Lambda",
        points: [
          "Serverless compute -- run code without provisioning or managing servers.",
          "Event-driven: code runs in response to triggers (S3 uploads, API Gateway requests, DynamoDB changes, etc.).",
          "Maximum execution time is 15 minutes per invocation.",
          "You pay only for compute time consumed (per ms) and number of requests.",
          "Automatic scaling -- Lambda creates instances of your function in response to events.",
          "Supports many runtimes: Python, Node.js, Java, C#, Go, Ruby, and custom runtimes.",
          "Memory configurable from 128 MB to 10,240 MB; CPU scales proportionally with memory.",
        ],
        services: [
          {
            name: "AWS Lambda",
            description: "Serverless, event-driven compute service that runs your code in response to events and automatically manages the underlying compute resources.",
            keyFact: "15-minute max execution time. Pay per request and compute duration (ms). Zero administration.",
          },
        ],
        tip: "If the exam says 'no servers to manage' or 'event-driven,' think Lambda first.",
      },
      {
        heading: "Container Services",
        points: [
          "Amazon ECS (Elastic Container Service): AWS-native container orchestration service. Manages Docker containers.",
          "Amazon EKS (Elastic Kubernetes Service): Managed Kubernetes on AWS for teams already using Kubernetes.",
          "AWS Fargate: Serverless compute engine for containers (works with both ECS and EKS). No need to manage EC2 instances.",
          "Amazon ECR (Elastic Container Registry): Fully managed Docker container image registry.",
          "ECS is simpler and AWS-native; EKS is for Kubernetes workloads.",
        ],
        services: [
          {
            name: "Amazon ECS",
            description: "Fully managed container orchestration service for running Docker containers at scale.",
            keyFact: "AWS-native. Choose EC2 launch type (you manage instances) or Fargate (serverless).",
          },
          {
            name: "Amazon EKS",
            description: "Managed Kubernetes service that makes it easy to run Kubernetes on AWS.",
            keyFact: "Use when you need Kubernetes compatibility or are migrating existing K8s workloads.",
          },
          {
            name: "AWS Fargate",
            description: "Serverless compute engine for containers. No need to provision or manage servers.",
            keyFact: "Works with both ECS and EKS. Pay for vCPU and memory resources your containers use.",
          },
        ],
      },
      {
        heading: "Other Compute Services",
        points: [
          "Amazon Lightsail: Simplified VPS with bundled compute, storage, and networking at a low monthly price. Great for simple websites and small apps.",
          "AWS Elastic Beanstalk: PaaS -- upload your code and Beanstalk handles deployment, capacity, load balancing, and health monitoring. You still have full control of underlying resources.",
          "AWS Batch: Fully managed batch processing at any scale. Dynamically provisions optimal compute resources based on job requirements.",
        ],
        services: [
          {
            name: "Amazon Lightsail",
            description: "Easy-to-use virtual private server with a simple management interface and predictable pricing.",
            keyFact: "Simplest way to launch a VPS on AWS. Fixed monthly pricing. Good for beginners.",
          },
          {
            name: "AWS Elastic Beanstalk",
            description: "PaaS that deploys, manages, and scales web applications and services automatically.",
            keyFact: "You upload code; Beanstalk handles the rest. Free service -- you pay only for underlying resources.",
          },
          {
            name: "AWS Batch",
            description: "Fully managed batch computing service that plans, schedules, and executes batch workloads.",
            keyFact: "Automatically provisions optimal compute resources. Uses Spot Instances to reduce cost.",
          },
        ],
      },
      {
        heading: "Compute Services Comparison",
        points: [
          "Choose the right service based on control needed, workload type, and management overhead.",
        ],
        comparison: {
          headers: ["Service", "Model", "You Manage", "Best For"],
          rows: [
            ["EC2", "IaaS", "OS, patching, scaling", "Full control, custom configs"],
            ["Lambda", "FaaS (Serverless)", "Code only", "Event-driven, short tasks (<15 min)"],
            ["ECS/EKS", "Containers", "Task definitions, cluster (or Fargate)", "Microservices, containerized apps"],
            ["Fargate", "Serverless Containers", "Task definitions only", "Containers without managing servers"],
            ["Lightsail", "Simplified IaaS", "Minimal -- pre-configured", "Simple websites, small apps"],
            ["Elastic Beanstalk", "PaaS", "Code only (resources auto-managed)", "Quick web app deployment"],
            ["Batch", "Managed Batch", "Job definitions", "Large-scale batch processing"],
          ],
        },
      },
    ],
  },

  // ─── 3. Storage Services ────────────────────────────────────────────
  {
    title: "Storage Services",
    slug: "storage-services",
    sections: [
      {
        heading: "Amazon S3 (Simple Storage Service)",
        points: [
          "Object storage service with virtually unlimited storage capacity.",
          "Objects stored in buckets. Max object size is 5 TB (use multipart upload for objects > 100 MB).",
          "Bucket names are globally unique across all AWS accounts.",
          "Designed for 11 9s (99.999999999%) of durability.",
          "Supports versioning, lifecycle policies, cross-region replication, and event notifications.",
          "S3 is NOT a file system -- it is flat object storage accessed via HTTP/HTTPS.",
          "Use cases: backup, static website hosting, data lakes, media hosting, application assets.",
        ],
        services: [
          {
            name: "Amazon S3",
            description: "Scalable object storage service designed for any amount of data, accessible from anywhere on the web.",
            keyFact: "11 9s durability. Unlimited storage. Objects up to 5 TB. Globally unique bucket names.",
          },
        ],
        tip: "S3 is the answer for almost any 'store files/objects' question. Know the storage classes well -- they are heavily tested.",
      },
      {
        heading: "S3 Storage Classes",
        points: [
          "S3 Standard: Default. High availability (99.99%), low latency, frequent access. Data stored across 3+ AZs.",
          "S3 Standard-IA (Infrequent Access): Lower storage cost, per-GB retrieval fee. Min 30-day storage charge. 3+ AZs.",
          "S3 One Zone-IA: Same as Standard-IA but stored in a single AZ. 20% cheaper. Less resilient.",
          "S3 Glacier Instant Retrieval: Archive storage with millisecond retrieval. Min 90-day storage. Good for quarterly access.",
          "S3 Glacier Flexible Retrieval: Archive with retrieval in minutes to hours (Expedited: 1-5 min, Standard: 3-5 hrs, Bulk: 5-12 hrs). Min 90 days.",
          "S3 Glacier Deep Archive: Cheapest storage. Retrieval in 12-48 hours. Min 180-day storage. For data accessed once or twice a year.",
          "S3 Intelligent-Tiering: Automatically moves objects between tiers based on access patterns. Small monthly monitoring fee. No retrieval fees.",
        ],
        comparison: {
          headers: ["Storage Class", "Access Pattern", "Retrieval Time", "Min Duration", "AZs"],
          rows: [
            ["Standard", "Frequent", "Milliseconds", "None", "3+"],
            ["Standard-IA", "Infrequent", "Milliseconds", "30 days", "3+"],
            ["One Zone-IA", "Infrequent, re-creatable", "Milliseconds", "30 days", "1"],
            ["Glacier Instant Retrieval", "Quarterly", "Milliseconds", "90 days", "3+"],
            ["Glacier Flexible Retrieval", "Archive", "Minutes to hours", "90 days", "3+"],
            ["Glacier Deep Archive", "Rarely accessed", "12-48 hours", "180 days", "3+"],
            ["Intelligent-Tiering", "Unknown/changing", "Milliseconds", "None", "3+"],
          ],
        },
        tip: "Glacier Deep Archive = cheapest but slowest. Intelligent-Tiering = best when access patterns are unpredictable. One Zone-IA = cheapest IA but single AZ risk.",
      },
      {
        heading: "Amazon EBS (Elastic Block Store)",
        points: [
          "Block-level storage volumes for EC2 instances -- like a virtual hard drive.",
          "Attached to a single EC2 instance at a time (except io1/io2 multi-attach).",
          "Persists independently of the instance lifecycle (unlike instance store).",
          "Must be in the same AZ as the EC2 instance.",
          "Volume types: gp3/gp2 (General Purpose SSD), io2/io1 (Provisioned IOPS SSD), st1 (Throughput HDD), sc1 (Cold HDD).",
          "Snapshots are incremental backups stored in S3. Can be used to create volumes in other AZs or Regions.",
          "Instance Store is physically attached ephemeral storage -- very fast but data is lost when the instance stops.",
        ],
        services: [
          {
            name: "Amazon EBS",
            description: "Persistent block storage volumes for Amazon EC2 instances.",
            keyFact: "AZ-specific. Persists after instance termination. Snapshots for backup/migration.",
          },
        ],
      },
      {
        heading: "File Storage Services",
        points: [
          "Amazon EFS (Elastic File System): Managed NFS file system for Linux workloads. Accessible from multiple EC2 instances simultaneously across AZs.",
          "Amazon FSx for Windows File Server: Fully managed Windows-native file system with SMB protocol, Active Directory integration.",
          "Amazon FSx for Lustre: High-performance file system for compute-intensive workloads (HPC, ML, video processing). Integrates with S3.",
          "Key difference: EFS = Linux (NFS), FSx for Windows = Windows (SMB), FSx for Lustre = HPC.",
        ],
        services: [
          {
            name: "Amazon EFS",
            description: "Serverless, elastic, shared file system for Linux-based workloads.",
            keyFact: "Multi-AZ, shared across instances. Automatically scales. Pay for what you use.",
          },
          {
            name: "Amazon FSx",
            description: "Fully managed file systems optimized for specific workloads (Windows or high-performance computing).",
            keyFact: "FSx for Windows = SMB + Active Directory. FSx for Lustre = HPC workloads + S3 integration.",
          },
        ],
        tip: "Shared Linux file storage = EFS. Windows file shares = FSx for Windows. HPC = FSx for Lustre.",
      },
      {
        heading: "Hybrid and Data Transfer",
        points: [
          "AWS Storage Gateway: Hybrid cloud storage that connects on-premises environments to AWS storage (S3, EBS, Glacier).",
          "Storage Gateway types: File Gateway (NFS/SMB to S3), Volume Gateway (iSCSI to EBS snapshots), Tape Gateway (virtual tape library to Glacier).",
          "AWS Snow Family: Physical devices for offline data transfer and edge computing.",
        ],
        services: [
          {
            name: "AWS Storage Gateway",
            description: "Hybrid cloud storage service providing on-premises access to virtually unlimited AWS cloud storage.",
            keyFact: "Bridges on-premises and cloud storage. Caches frequently accessed data locally.",
          },
        ],
      },
      {
        heading: "AWS Snow Family",
        points: [
          "AWS Snowcone: Smallest device. 8 TB HDD or 14 TB SSD. Portable, rugged. Edge computing + data transfer.",
          "AWS Snowball Edge: Storage Optimized (80 TB) or Compute Optimized (42 TB + GPU). For large data transfers and edge computing.",
          "AWS Snowmobile: Exabyte-scale data transfer. 100 PB per Snowmobile (a literal shipping container on a truck).",
          "Use Snow Family when network transfer would take too long or is impractical.",
          "Rule of thumb: If data transfer over the network takes more than a week, consider Snow Family.",
        ],
        services: [
          {
            name: "AWS Snowcone",
            description: "Small, rugged, secure edge computing and data transfer device.",
            keyFact: "8-14 TB capacity. Fits in a backpack. Good for remote/disconnected environments.",
          },
          {
            name: "AWS Snowball Edge",
            description: "Petabyte-scale data transport with on-board storage and compute capabilities.",
            keyFact: "Storage Optimized: 80 TB. Compute Optimized: 42 TB + optional GPU.",
          },
          {
            name: "AWS Snowmobile",
            description: "Exabyte-scale data migration service using a 45-foot shipping container.",
            keyFact: "100 PB per Snowmobile. For massive data center migrations (10+ PB).",
          },
        ],
        comparison: {
          headers: ["Device", "Capacity", "Use Case"],
          rows: [
            ["Snowcone", "8-14 TB", "Small transfers, edge computing, remote locations"],
            ["Snowball Edge", "42-80 TB", "Large transfers, edge computing with compute"],
            ["Snowmobile", "100 PB", "Exabyte-scale data center migrations"],
          ],
        },
      },
      {
        heading: "Storage Type Summary",
        points: [
          "Object storage (S3): Flat structure, accessed via HTTP. Best for files, backups, data lakes.",
          "Block storage (EBS): Attached to EC2. Best for databases, boot volumes, low-latency apps.",
          "File storage (EFS/FSx): Shared file systems. Best for shared access across instances.",
        ],
        comparison: {
          headers: ["Type", "Service", "Protocol", "Access Pattern"],
          rows: [
            ["Object", "S3", "HTTP/HTTPS", "Any number of clients via URL"],
            ["Block", "EBS", "Block-level", "Single EC2 instance (same AZ)"],
            ["File (Linux)", "EFS", "NFS", "Multiple EC2 instances, multi-AZ"],
            ["File (Windows)", "FSx for Windows", "SMB", "Multiple instances, AD integrated"],
            ["File (HPC)", "FSx for Lustre", "POSIX", "High-throughput, S3 integration"],
          ],
        },
      },
    ],
  },

  // ─── 4. Database Services ───────────────────────────────────────────
  {
    title: "Database Services",
    slug: "database-services",
    sections: [
      {
        heading: "Relational Database Services",
        points: [
          "Amazon RDS (Relational Database Service): Managed relational DB. Handles provisioning, patching, backups, and recovery.",
          "RDS supports 6 database engines: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, and Amazon Aurora.",
          "RDS features: Multi-AZ deployment (HA failover), Read Replicas (read scaling), automated backups, encryption at rest.",
          "Multi-AZ = high availability (synchronous replication, automatic failover). Read Replicas = read performance (async replication).",
          "Amazon Aurora: MySQL and PostgreSQL compatible relational database built for the cloud.",
          "Aurora is up to 5x faster than standard MySQL and 3x faster than standard PostgreSQL.",
          "Aurora stores 6 copies of data across 3 AZs. Supports up to 15 read replicas.",
          "Aurora Serverless: Auto-scaling configuration that adjusts capacity based on demand. Pay per second.",
        ],
        services: [
          {
            name: "Amazon RDS",
            description: "Managed relational database service supporting six popular database engines.",
            keyFact: "Handles backups, patching, scaling. Multi-AZ for HA. Read Replicas for read scaling.",
          },
          {
            name: "Amazon Aurora",
            description: "High-performance managed relational database compatible with MySQL and PostgreSQL.",
            keyFact: "5x faster than MySQL. 6 copies across 3 AZs. Up to 15 read replicas. Aurora Serverless available.",
          },
        ],
        tip: "Multi-AZ = availability (failover). Read Replicas = performance (read scaling). These are different concepts!",
      },
      {
        heading: "NoSQL and Key-Value Databases",
        points: [
          "Amazon DynamoDB: Fully managed, serverless NoSQL key-value and document database.",
          "DynamoDB delivers single-digit millisecond performance at any scale.",
          "DynamoDB features: Auto scaling, on-demand capacity, global tables (multi-Region), DynamoDB Streams, point-in-time recovery.",
          "DynamoDB Accelerator (DAX): In-memory cache for DynamoDB providing microsecond read performance.",
          "Amazon DocumentDB: Managed document database compatible with MongoDB workloads.",
          "Amazon Keyspaces: Managed Apache Cassandra-compatible database service. Serverless.",
        ],
        services: [
          {
            name: "Amazon DynamoDB",
            description: "Fully managed, serverless NoSQL database for key-value and document data with single-digit ms latency.",
            keyFact: "Serverless, auto-scaling, single-digit ms latency. Global tables for multi-Region. DAX for microsecond reads.",
          },
          {
            name: "Amazon DocumentDB",
            description: "Managed document database service designed for MongoDB compatibility.",
            keyFact: "Use when migrating MongoDB workloads to AWS.",
          },
          {
            name: "Amazon Keyspaces",
            description: "Serverless, managed Apache Cassandra-compatible database service.",
            keyFact: "Use when migrating Cassandra workloads to AWS. Serverless with pay-per-use.",
          },
        ],
        tip: "DynamoDB is the go-to answer for any 'serverless database,' 'NoSQL,' or 'single-digit ms latency' question.",
      },
      {
        heading: "In-Memory, Graph, and Specialty Databases",
        points: [
          "Amazon ElastiCache: Fully managed in-memory data store. Supports Redis and Memcached.",
          "ElastiCache use cases: caching, session storage, real-time analytics, leaderboards.",
          "Amazon MemoryDB for Redis: Redis-compatible, durable, in-memory database with Multi-AZ durability.",
          "Amazon Neptune: Fully managed graph database for highly connected datasets (social networks, fraud detection, knowledge graphs).",
          "Amazon QLDB (Quantum Ledger Database): Fully managed ledger database with an immutable, cryptographically verifiable transaction log.",
          "Amazon Redshift: Fully managed data warehouse for analytics. Uses SQL. Columnar storage. Handles petabyte-scale data.",
          "Redshift Spectrum allows querying data in S3 without loading it into Redshift.",
        ],
        services: [
          {
            name: "Amazon ElastiCache",
            description: "Fully managed in-memory caching service compatible with Redis and Memcached.",
            keyFact: "Microsecond latency. Use for caching DB queries, session data, real-time analytics.",
          },
          {
            name: "Amazon MemoryDB for Redis",
            description: "Durable, Redis-compatible in-memory database with Multi-AZ transactional log.",
            keyFact: "Unlike ElastiCache, provides full database durability. Use as a primary database, not just a cache.",
          },
          {
            name: "Amazon Neptune",
            description: "Fully managed graph database service for building and running applications with highly connected datasets.",
            keyFact: "Graph database = Neptune. Think social networks, recommendation engines, fraud detection.",
          },
          {
            name: "Amazon QLDB",
            description: "Fully managed ledger database providing a transparent, immutable, and cryptographically verifiable transaction log.",
            keyFact: "Immutable records, cryptographically verifiable. Use for supply chain, financial transactions, audit trails.",
          },
          {
            name: "Amazon Redshift",
            description: "Fully managed, petabyte-scale cloud data warehouse using SQL and BI tools.",
            keyFact: "Data warehouse (OLAP, not OLTP). Columnar storage. Redshift Spectrum queries S3 data directly.",
          },
        ],
      },
      {
        heading: "Choosing the Right Database",
        points: [
          "Relational data with complex queries = RDS or Aurora.",
          "Key-value / NoSQL with low latency = DynamoDB.",
          "Caching layer = ElastiCache.",
          "Data warehouse / analytics = Redshift.",
          "Graph relationships = Neptune.",
          "Immutable ledger = QLDB.",
          "MongoDB migration = DocumentDB.",
          "Cassandra migration = Keyspaces.",
          "Durable in-memory = MemoryDB for Redis.",
        ],
        comparison: {
          headers: ["Service", "Type", "Key Use Case"],
          rows: [
            ["RDS", "Relational (6 engines)", "Traditional relational workloads"],
            ["Aurora", "Relational (MySQL/PG)", "High-performance relational, cloud-native"],
            ["DynamoDB", "Key-value / Document", "Serverless NoSQL, single-digit ms"],
            ["ElastiCache", "In-memory (Redis/Memcached)", "Caching, session store"],
            ["MemoryDB", "In-memory (Redis)", "Durable primary in-memory database"],
            ["Redshift", "Data warehouse", "Analytics, BI, OLAP queries"],
            ["Neptune", "Graph", "Social networks, knowledge graphs"],
            ["QLDB", "Ledger", "Immutable audit trails"],
            ["DocumentDB", "Document (MongoDB)", "MongoDB-compatible workloads"],
            ["Keyspaces", "Wide-column (Cassandra)", "Cassandra-compatible workloads"],
          ],
        },
        tip: "The exam often describes a scenario and asks which database to use. Match the data model and access pattern to the right service.",
      },
    ],
  },

  // ─── 5. Networking Services ─────────────────────────────────────────
  {
    title: "Networking Services",
    slug: "networking-services",
    sections: [
      {
        heading: "Amazon VPC (Virtual Private Cloud)",
        points: [
          "A logically isolated section of the AWS cloud where you launch resources in a virtual network you define.",
          "You control IP address ranges (CIDR blocks), subnets, route tables, and network gateways.",
          "Subnets exist within a single AZ. Public subnets have a route to an Internet Gateway; private subnets do not.",
          "Internet Gateway (IGW): Allows communication between your VPC and the internet. Attached to the VPC.",
          "NAT Gateway: Allows instances in private subnets to access the internet for updates while preventing inbound internet traffic. Placed in a public subnet.",
          "Route Tables: Rules that determine where network traffic is directed. Each subnet is associated with a route table.",
          "VPC Flow Logs: Capture IP traffic information going to and from network interfaces in your VPC.",
          "Default VPC is created in every Region for every new AWS account.",
        ],
        services: [
          {
            name: "Amazon VPC",
            description: "Provision a logically isolated section of the AWS cloud where you launch resources in a virtual network you define.",
            keyFact: "Foundation of AWS networking. You define subnets, route tables, gateways. Spans a single Region.",
          },
        ],
        tip: "Public subnet = route to IGW. Private subnet = no direct internet route. NAT Gateway = outbound-only internet for private subnets.",
      },
      {
        heading: "Security Groups vs NACLs",
        points: [
          "Security Groups: Operate at the instance (ENI) level. Stateful -- return traffic is automatically allowed.",
          "Security Groups are ALLOW-only rules. Default: all inbound denied, all outbound allowed.",
          "Network ACLs (NACLs): Operate at the subnet level. Stateless -- you must define both inbound and outbound rules.",
          "NACLs support both ALLOW and DENY rules. Default NACL allows all traffic. Custom NACLs deny all by default.",
          "Rules are evaluated in order (lowest number first) for NACLs. Security Groups evaluate all rules.",
          "Use Security Groups as your primary firewall. Use NACLs for an additional layer of defense.",
        ],
        comparison: {
          headers: ["Feature", "Security Group", "Network ACL"],
          rows: [
            ["Level", "Instance (ENI)", "Subnet"],
            ["Statefulness", "Stateful", "Stateless"],
            ["Rule Type", "Allow only", "Allow and Deny"],
            ["Rule Evaluation", "All rules evaluated", "Rules in order (by number)"],
            ["Default", "Deny all inbound, allow all outbound", "Default NACL allows all"],
            ["Scope", "Applied to specific instances", "Applied to all instances in subnet"],
          ],
        },
        tip: "Security Groups = stateful, instance-level, allow-only. NACLs = stateless, subnet-level, allow + deny. This is a very common exam topic.",
      },
      {
        heading: "VPC Connectivity Options",
        points: [
          "VPC Peering: Private connection between two VPCs (same or different accounts/Regions). Not transitive -- each pair needs its own peering connection.",
          "AWS Transit Gateway: Central hub that connects VPCs and on-premises networks. Simplifies network topology (hub-and-spoke model). Transitive routing.",
          "AWS PrivateLink (VPC Endpoints): Privately access AWS services or your own services without traversing the internet. Traffic stays on the AWS network.",
          "Interface Endpoint: ENI with a private IP (powered by PrivateLink). For most AWS services.",
          "Gateway Endpoint: Route table target. Only for S3 and DynamoDB. Free.",
        ],
        services: [
          {
            name: "AWS Transit Gateway",
            description: "Network transit hub that connects VPCs and on-premises networks through a central gateway.",
            keyFact: "Hub-and-spoke model. Transitive routing (unlike VPC Peering). Simplifies complex network topologies.",
          },
          {
            name: "AWS PrivateLink",
            description: "Provides private connectivity between VPCs, AWS services, and on-premises applications without exposing traffic to the public internet.",
            keyFact: "Keeps traffic on AWS network. No IGW, NAT, or VPN needed. Uses Interface VPC Endpoints.",
          },
        ],
        tip: "VPC Peering is NOT transitive. If VPC A peers with B and B peers with C, A cannot talk to C through B. Use Transit Gateway for that.",
      },
      {
        heading: "Content Delivery and DNS",
        points: [
          "Amazon CloudFront: Global Content Delivery Network (CDN). Caches content at 400+ edge locations worldwide.",
          "CloudFront reduces latency by serving content from the nearest edge location to the user.",
          "CloudFront can serve both static and dynamic content. Supports HTTPS, custom domains, and DDoS protection (with Shield).",
          "Amazon Route 53: Highly available, scalable DNS web service. Domain registration + DNS routing + health checking.",
          "Route 53 routing policies: Simple, Weighted, Latency-based, Failover, Geolocation, Geoproximity, Multivalue Answer.",
          "Route 53 can route traffic to AWS resources (ELB, S3, CloudFront) or any public endpoint.",
        ],
        services: [
          {
            name: "Amazon CloudFront",
            description: "Fast, secure, globally distributed content delivery network (CDN) service.",
            keyFact: "400+ edge locations. Caches content close to users. Works with S3, ELB, EC2, and custom origins.",
          },
          {
            name: "Amazon Route 53",
            description: "Scalable DNS web service for domain registration, DNS routing, and health checking.",
            keyFact: "100% availability SLA. Named after DNS port 53. Supports multiple routing policies.",
          },
        ],
      },
      {
        heading: "Hybrid Connectivity",
        points: [
          "AWS Site-to-Site VPN: Encrypted tunnel over the public internet from your on-premises network to your VPC.",
          "VPN is quick to set up (minutes), lower cost, but bandwidth is limited by internet connection and latency varies.",
          "AWS Direct Connect: Dedicated, private network connection from your data center to AWS.",
          "Direct Connect provides consistent latency, higher bandwidth (up to 100 Gbps), and does not traverse the public internet.",
          "Direct Connect takes weeks to months to establish. More expensive but more reliable and performant.",
          "AWS Global Accelerator: Directs user traffic to the optimal AWS endpoint using the AWS global network. Improves availability and performance.",
          "Global Accelerator provides static Anycast IP addresses and routes traffic over the AWS backbone network.",
        ],
        services: [
          {
            name: "AWS Direct Connect",
            description: "Dedicated private network connection from your premises to AWS, bypassing the public internet.",
            keyFact: "Consistent low latency, up to 100 Gbps. Takes weeks to set up. More expensive than VPN.",
          },
          {
            name: "AWS Global Accelerator",
            description: "Networking service that directs traffic to optimal AWS endpoints over the AWS global network.",
            keyFact: "Static IP addresses + AWS backbone routing. Improves performance for global users by up to 60%.",
          },
        ],
        comparison: {
          headers: ["Feature", "Site-to-Site VPN", "Direct Connect"],
          rows: [
            ["Connection", "Encrypted over public internet", "Dedicated private line"],
            ["Setup Time", "Minutes", "Weeks to months"],
            ["Cost", "Lower", "Higher"],
            ["Bandwidth", "Limited by internet", "Up to 100 Gbps"],
            ["Latency", "Variable", "Consistent, low"],
            ["Encryption", "Yes (IPSec)", "Not by default (add VPN for encryption)"],
            ["Best For", "Quick setup, backup, lower cost", "Consistent performance, high bandwidth"],
          ],
        },
        tip: "VPN = quick, cheap, encrypted, over internet. Direct Connect = dedicated, consistent, higher bandwidth, takes time to set up.",
      },
      {
        heading: "Elastic Load Balancing (ELB)",
        points: [
          "Automatically distributes incoming application traffic across multiple targets (EC2, containers, IPs, Lambda).",
          "Application Load Balancer (ALB): Layer 7 (HTTP/HTTPS). Path-based and host-based routing. Best for web applications and microservices.",
          "Network Load Balancer (NLB): Layer 4 (TCP/UDP/TLS). Ultra-high performance, millions of requests per second. Static IPs. Best for extreme performance or non-HTTP protocols.",
          "Gateway Load Balancer (GLB): Layer 3. Deploys, scales, and manages third-party virtual appliances (firewalls, IDS/IPS). Uses GENEVE protocol.",
          "ELB performs health checks and only routes traffic to healthy targets.",
          "ELB integrates with Auto Scaling Groups for automatic scaling.",
        ],
        services: [
          {
            name: "Elastic Load Balancing",
            description: "Automatically distributes incoming traffic across multiple targets in one or more Availability Zones.",
            keyFact: "ALB = HTTP/HTTPS (L7). NLB = TCP/UDP (L4, ultra-fast). GLB = network appliances (L3).",
          },
        ],
        comparison: {
          headers: ["Load Balancer", "Layer", "Protocol", "Best For"],
          rows: [
            ["ALB", "7 (Application)", "HTTP, HTTPS, gRPC", "Web apps, microservices, path/host routing"],
            ["NLB", "4 (Transport)", "TCP, UDP, TLS", "Extreme performance, static IPs, non-HTTP"],
            ["GLB", "3 (Network)", "IP (GENEVE)", "Third-party firewalls, security appliances"],
          ],
        },
      },
    ],
  },

  // ─── 6. Application Integration ─────────────────────────────────────
  {
    title: "Application Integration Services",
    slug: "application-integration",
    sections: [
      {
        heading: "Amazon SQS (Simple Queue Service)",
        points: [
          "Fully managed message queue service for decoupling and scaling microservices.",
          "Messages are stored in a queue until a consumer retrieves and processes them.",
          "Standard queues: Nearly unlimited throughput, at-least-once delivery, best-effort ordering.",
          "FIFO queues: Exactly-once processing, strict ordering. Up to 300 messages/second (3,000 with batching).",
          "Messages can be retained for 1 minute to 14 days (default 4 days).",
          "Dead Letter Queue (DLQ): Receives messages that fail processing after a configured number of retries.",
          "Visibility Timeout: Period during which a message is invisible to other consumers after being read.",
        ],
        services: [
          {
            name: "Amazon SQS",
            description: "Fully managed message queuing service for decoupling distributed system components.",
            keyFact: "Pull-based. Messages processed by ONE consumer. Decouples producers from consumers. Standard or FIFO.",
          },
        ],
      },
      {
        heading: "Amazon SNS (Simple Notification Service)",
        points: [
          "Fully managed pub/sub messaging service for sending notifications.",
          "Publishers send messages to topics; subscribers receive messages from topics they are subscribed to.",
          "Supports multiple subscriber types: SQS, Lambda, HTTP/HTTPS, email, SMS, mobile push.",
          "Push-based delivery -- messages are pushed to all subscribers immediately.",
          "Fan-out pattern: SNS topic sends the same message to multiple SQS queues for parallel processing.",
          "SNS FIFO topics work with SQS FIFO queues for ordered, exactly-once delivery.",
        ],
        services: [
          {
            name: "Amazon SNS",
            description: "Fully managed pub/sub messaging service for sending notifications to multiple subscribers.",
            keyFact: "Push-based. One-to-many delivery (fan-out). Supports email, SMS, HTTP, SQS, Lambda subscribers.",
          },
        ],
      },
      {
        heading: "SQS vs SNS",
        points: [
          "SQS is a queue (pull model) -- one consumer processes each message.",
          "SNS is pub/sub (push model) -- many subscribers can receive the same message.",
          "Common pattern: SNS + SQS fan-out -- SNS publishes to multiple SQS queues for parallel processing.",
        ],
        comparison: {
          headers: ["Feature", "SQS", "SNS"],
          rows: [
            ["Model", "Queue (pull)", "Pub/Sub (push)"],
            ["Consumers", "One consumer per message", "Many subscribers per message"],
            ["Delivery", "Consumer polls for messages", "Messages pushed to subscribers"],
            ["Persistence", "Messages stored until consumed", "No persistence (deliver or fail)"],
            ["Use Case", "Decoupling, work queues", "Notifications, fan-out, alerts"],
          ],
        },
        tip: "SQS = decouple components, 1:1. SNS = notify many subscribers, 1:many. SNS + SQS = fan-out pattern.",
      },
      {
        heading: "Amazon EventBridge and AWS Step Functions",
        points: [
          "Amazon EventBridge: Serverless event bus that connects applications using events from AWS services, SaaS apps, or custom sources.",
          "EventBridge allows you to create rules that match events and route them to targets (Lambda, SQS, SNS, Step Functions, etc.).",
          "EventBridge Schema Registry discovers and stores event schemas automatically.",
          "AWS Step Functions: Serverless workflow orchestration service that coordinates multiple AWS services into serverless workflows.",
          "Step Functions use state machines defined in Amazon States Language (JSON). Visual workflow designer available.",
          "Step Functions support Standard workflows (up to 1 year, exactly-once) and Express workflows (up to 5 min, at-least-once).",
        ],
        services: [
          {
            name: "Amazon EventBridge",
            description: "Serverless event bus for building event-driven applications at scale.",
            keyFact: "Central event bus. Routes events from AWS, SaaS, and custom apps to targets. Rules-based filtering.",
          },
          {
            name: "AWS Step Functions",
            description: "Serverless workflow orchestration service for coordinating distributed applications and microservices.",
            keyFact: "Visual workflows. Coordinates Lambda, ECS, API Gateway, and more. Standard (long) or Express (fast).",
          },
        ],
      },
    ],
  },

  // ─── 7. Management & Governance ─────────────────────────────────────
  {
    title: "Management and Governance",
    slug: "management-governance",
    sections: [
      {
        heading: "Amazon CloudWatch",
        points: [
          "Monitoring and observability service for AWS resources and applications.",
          "CloudWatch Metrics: Collects metrics from AWS services (CPU, network, disk). Custom metrics supported.",
          "CloudWatch Alarms: Watch a metric and trigger actions (SNS notification, Auto Scaling, EC2 action) when a threshold is breached.",
          "CloudWatch Logs: Collect, monitor, and analyze log files from EC2, Lambda, CloudTrail, and more.",
          "CloudWatch Dashboards: Customizable views of your metrics and alarms in a single page.",
          "CloudWatch Events / EventBridge: Respond to state changes in AWS resources (now part of EventBridge).",
          "Basic monitoring: 5-minute intervals (free). Detailed monitoring: 1-minute intervals (paid).",
        ],
        services: [
          {
            name: "Amazon CloudWatch",
            description: "Monitoring and observability service providing data and actionable insights for AWS resources.",
            keyFact: "Metrics, Logs, Alarms, Dashboards. Central monitoring for all AWS services. Triggers Auto Scaling.",
          },
        ],
        tip: "CloudWatch = monitoring and alarms. CloudTrail = API audit logging. Do not confuse them!",
      },
      {
        heading: "AWS CloudFormation",
        points: [
          "Infrastructure as Code (IaC) service. Define your entire infrastructure in JSON or YAML templates.",
          "Templates describe all AWS resources and their configurations. CloudFormation provisions them in the correct order.",
          "Stacks: A single unit of managed resources created from a template.",
          "Change Sets: Preview changes before applying them to a stack.",
          "Drift Detection: Identifies if actual resource configurations differ from the template.",
          "CloudFormation is free -- you pay only for the resources it creates.",
          "Supports rollback on failure to maintain infrastructure consistency.",
        ],
        services: [
          {
            name: "AWS CloudFormation",
            description: "Infrastructure as Code service for modeling and provisioning AWS resources using templates.",
            keyFact: "JSON/YAML templates. Automates infrastructure provisioning. Supports rollback and drift detection.",
          },
        ],
        tip: "CloudFormation = AWS-native IaC. If the exam mentions 'template,' 'infrastructure as code,' or 'repeatable deployments,' think CloudFormation.",
      },
      {
        heading: "Operational Management Tools",
        points: [
          "AWS Systems Manager (SSM): Unified interface to view operational data and automate tasks across AWS resources.",
          "SSM Session Manager: Secure shell access to EC2 without opening SSH ports or managing keys.",
          "SSM Patch Manager: Automates patching of managed instances.",
          "SSM Parameter Store: Secure, hierarchical storage for configuration data and secrets.",
          "AWS Config: Continuously monitors and records AWS resource configurations. Evaluates compliance rules.",
          "AWS Config is NOT for monitoring performance (that is CloudWatch) -- it tracks configuration changes.",
        ],
        services: [
          {
            name: "AWS Systems Manager",
            description: "Operations hub for managing AWS and on-premises resources at scale.",
            keyFact: "Session Manager (no SSH needed), Patch Manager, Parameter Store, Run Command. Unified operations.",
          },
        ],
      },
      {
        heading: "Advisory and Best Practice Tools",
        points: [
          "AWS Trusted Advisor: Automated best-practice checks across five categories: cost optimization, performance, security, fault tolerance, and service limits.",
          "Basic and Developer support: 7 core checks (S3 bucket permissions, MFA on root, etc.).",
          "Business and Enterprise support: Full set of Trusted Advisor checks.",
          "AWS Health Dashboard - Service Health: Shows the health of all AWS services across all Regions.",
          "AWS Health Dashboard - Your Account Health (formerly Personal Health Dashboard): Proactive alerts for AWS events that may affect YOUR resources.",
          "AWS Well-Architected Tool: Review your workloads against the 6 pillars of the Well-Architected Framework.",
        ],
        services: [
          {
            name: "AWS Trusted Advisor",
            description: "Online tool providing real-time guidance based on AWS best practices across five categories.",
            keyFact: "5 categories: Cost, Performance, Security, Fault Tolerance, Service Limits. Full checks need Business+ support.",
          },
          {
            name: "AWS Health Dashboard",
            description: "Provides visibility into AWS service health and personalized alerts for events affecting your account.",
            keyFact: "Service Health = global AWS status. Account Health = personalized alerts for YOUR resources.",
          },
        ],
        tip: "Trusted Advisor checks 5 pillars. Full checks require Business or Enterprise support plan.",
      },
    ],
  },

  // ─── 8. Developer Tools ─────────────────────────────────────────────
  {
    title: "Developer Tools",
    slug: "developer-tools",
    sections: [
      {
        heading: "CI/CD Services",
        points: [
          "AWS CodeCommit: Managed source control (Git repositories) hosted by AWS. Fully managed, secure, highly available.",
          "AWS CodeBuild: Fully managed build service. Compiles source code, runs tests, produces deployable artifacts. Scales automatically.",
          "AWS CodeDeploy: Automated deployment service to EC2, on-premises, Lambda, or ECS. Supports in-place and blue/green deployments.",
          "AWS CodePipeline: Fully managed continuous delivery service that orchestrates build, test, and deploy phases.",
          "CodePipeline integrates CodeCommit, CodeBuild, CodeDeploy, and third-party tools (GitHub, Jenkins) into a unified pipeline.",
          "AWS CodeArtifact: Managed artifact repository for software packages (npm, Maven, pip, etc.).",
        ],
        services: [
          {
            name: "AWS CodeCommit",
            description: "Fully managed source control service hosting private Git repositories.",
            keyFact: "AWS-managed Git. Encrypted, integrated with IAM for access control.",
          },
          {
            name: "AWS CodeBuild",
            description: "Fully managed continuous integration service that compiles code, runs tests, and produces artifacts.",
            keyFact: "No build servers to manage. Pay per minute of build time. Scales automatically.",
          },
          {
            name: "AWS CodeDeploy",
            description: "Automated deployment service for deploying applications to EC2, Lambda, ECS, or on-premises servers.",
            keyFact: "Supports rolling, blue/green, and in-place deployments. Works with on-premises servers too.",
          },
          {
            name: "AWS CodePipeline",
            description: "Fully managed continuous delivery service for fast and reliable application updates.",
            keyFact: "Orchestrates the full CI/CD pipeline: source, build, test, deploy. Integrates with third-party tools.",
          },
        ],
        tip: "CodeCommit = source. CodeBuild = build/test. CodeDeploy = deploy. CodePipeline = orchestrates all three.",
      },
      {
        heading: "Other Developer Tools",
        points: [
          "AWS Cloud9: Cloud-based integrated development environment (IDE) accessible from a web browser.",
          "AWS X-Ray: Distributed tracing service for analyzing and debugging distributed applications and microservices.",
          "X-Ray provides an end-to-end view of requests as they travel through your application. Identifies bottlenecks and errors.",
          "AWS CloudShell: Browser-based shell environment with AWS CLI, Python, Node.js, and other tools pre-installed. Free. No setup needed.",
        ],
        services: [
          {
            name: "AWS Cloud9",
            description: "Cloud-based IDE that lets you write, run, and debug code from a web browser.",
            keyFact: "Browser-based. Pre-configured for AWS development. Includes terminal with AWS CLI.",
          },
          {
            name: "AWS X-Ray",
            description: "Distributed tracing service for analyzing requests flowing through distributed applications.",
            keyFact: "Trace requests across microservices. Visualize service maps. Find bottlenecks and errors.",
          },
          {
            name: "AWS CloudShell",
            description: "Browser-based shell with AWS CLI and common development tools pre-installed.",
            keyFact: "Free, no setup. 1 GB persistent storage per Region. Pre-authenticated with your console credentials.",
          },
        ],
      },
    ],
  },

  // ─── 9. Machine Learning & AI Services ──────────────────────────────
  {
    title: "Machine Learning and AI Services",
    slug: "ml-ai-services",
    sections: [
      {
        heading: "ML Platform",
        points: [
          "Amazon SageMaker: Fully managed service to build, train, and deploy machine learning models at scale.",
          "SageMaker provides Jupyter notebooks, training infrastructure, model hosting, and MLOps capabilities.",
          "For the CCP exam, know that SageMaker is the comprehensive ML platform. You do not need deep ML knowledge.",
        ],
        services: [
          {
            name: "Amazon SageMaker",
            description: "Comprehensive, fully managed machine learning platform for building, training, and deploying ML models.",
            keyFact: "The go-to service for custom ML models on AWS. End-to-end ML lifecycle management.",
          },
        ],
      },
      {
        heading: "AI Services (Pre-Trained, No ML Expertise Needed)",
        points: [
          "These are managed AI services -- you use APIs, no ML expertise required.",
          "Amazon Rekognition: Image and video analysis (face detection, object recognition, content moderation, celebrity recognition).",
          "Amazon Comprehend: Natural Language Processing (NLP) -- sentiment analysis, entity recognition, topic modeling, language detection.",
          "Amazon Polly: Text-to-speech service. Converts text into lifelike speech in multiple languages and voices.",
          "Amazon Transcribe: Automatic speech-to-text (speech recognition). Supports real-time and batch transcription.",
          "Amazon Translate: Neural machine translation for real-time and batch language translation.",
          "Amazon Lex: Build conversational interfaces (chatbots) with voice and text. Same technology that powers Alexa.",
          "Amazon Textract: Extract text, handwriting, and structured data from scanned documents (OCR+).",
          "Amazon Kendra: Intelligent enterprise search service powered by ML. Finds answers across documents.",
          "Amazon Personalize: Real-time personalized recommendations (like Amazon.com product recommendations).",
          "Amazon Forecast: Time-series forecasting using ML. Predict future points (demand, revenue, capacity).",
        ],
        services: [
          {
            name: "Amazon Rekognition",
            description: "Image and video analysis service using deep learning for faces, objects, text, and content moderation.",
            keyFact: "Image/video analysis = Rekognition. Facial recognition, object detection, content moderation.",
          },
          {
            name: "Amazon Comprehend",
            description: "Natural Language Processing service that finds insights and relationships in text.",
            keyFact: "NLP service: sentiment, entities, key phrases, language detection.",
          },
          {
            name: "Amazon Polly",
            description: "Text-to-speech service that turns text into lifelike speech.",
            keyFact: "Text to speech = Polly.",
          },
          {
            name: "Amazon Transcribe",
            description: "Automatic speech recognition service that converts speech to text.",
            keyFact: "Speech to text = Transcribe.",
          },
          {
            name: "Amazon Translate",
            description: "Neural machine translation service for fluent language translation.",
            keyFact: "Language translation = Translate.",
          },
          {
            name: "Amazon Lex",
            description: "Build conversational chatbot interfaces with voice and text using the same technology as Alexa.",
            keyFact: "Chatbots = Lex. Powers Alexa.",
          },
          {
            name: "Amazon Textract",
            description: "Extract text and structured data from scanned documents using ML.",
            keyFact: "Document text/data extraction = Textract. Goes beyond simple OCR.",
          },
          {
            name: "Amazon Kendra",
            description: "Intelligent search service powered by ML for enterprise document search.",
            keyFact: "Enterprise search = Kendra. ML-powered answers from your documents.",
          },
          {
            name: "Amazon Personalize",
            description: "Real-time personalized recommendation service using the same ML as Amazon.com.",
            keyFact: "Recommendations = Personalize. Product suggestions, content personalization.",
          },
          {
            name: "Amazon Forecast",
            description: "Managed service for accurate time-series forecasting using machine learning.",
            keyFact: "Time-series forecasting = Forecast. Demand planning, resource planning.",
          },
        ],
        tip: "For the exam, match the service name to its function: Rekognition=images, Comprehend=NLP text, Polly=text-to-speech, Transcribe=speech-to-text, Lex=chatbots, Textract=documents, Kendra=search.",
      },
    ],
  },

  // ─── 10. Other Important Services ───────────────────────────────────
  {
    title: "Other Important Services",
    slug: "other-services",
    sections: [
      {
        heading: "Identity and API Services",
        points: [
          "Amazon Cognito: Add user sign-up, sign-in, and access control to web and mobile apps.",
          "Cognito User Pools: User directory for authentication (sign-up/sign-in). Returns JWT tokens.",
          "Cognito Identity Pools: Provide temporary AWS credentials for accessing AWS services (authorization).",
          "Cognito supports social identity providers (Google, Facebook, Apple) and SAML/OIDC enterprise providers.",
          "AWS AppSync: Managed GraphQL API service. Real-time data synchronization and offline capabilities.",
          "AppSync connects to DynamoDB, Lambda, HTTP data sources, and more via resolvers.",
        ],
        services: [
          {
            name: "Amazon Cognito",
            description: "User authentication and authorization service for web and mobile applications.",
            keyFact: "User Pools = authentication (who are you). Identity Pools = authorization (temporary AWS credentials).",
          },
          {
            name: "AWS AppSync",
            description: "Managed GraphQL service for building real-time, data-driven applications.",
            keyFact: "GraphQL API = AppSync. Real-time updates, offline sync, multiple data sources.",
          },
        ],
      },
      {
        heading: "Data Streaming",
        points: [
          "Amazon Kinesis: Platform for real-time streaming data at any scale.",
          "Kinesis Data Streams: Capture, process, and store real-time data streams. You manage consumers.",
          "Kinesis Data Firehose: Easiest way to load streaming data into S3, Redshift, Elasticsearch, or Splunk. Fully managed, near-real-time.",
          "Kinesis Data Analytics: Analyze streaming data in real-time using SQL or Apache Flink.",
          "Kinesis Video Streams: Capture, process, and store video streams.",
          "Use case examples: real-time analytics, log/event data collection, IoT data ingestion, clickstream analysis.",
        ],
        services: [
          {
            name: "Amazon Kinesis",
            description: "Platform for collecting, processing, and analyzing real-time streaming data.",
            keyFact: "Real-time streaming = Kinesis. Data Streams (custom), Firehose (managed delivery), Analytics (SQL on streams).",
          },
        ],
        tip: "Kinesis = real-time data streaming. SQS = message queuing (decoupling). They serve different purposes.",
      },
      {
        heading: "Auto Scaling and Elasticity",
        points: [
          "Amazon EC2 Auto Scaling: Automatically adjusts the number of EC2 instances based on demand.",
          "Auto Scaling Group (ASG) defines min, max, and desired capacity.",
          "Scaling policies: Target Tracking (maintain a metric), Step Scaling (scale based on alarm), Scheduled (scale at set times).",
          "Auto Scaling works with Elastic Load Balancing to distribute traffic to healthy instances.",
          "AWS Auto Scaling: Broader service that creates scaling plans for multiple resources (EC2, ECS, DynamoDB, Aurora).",
          "Elasticity is a core cloud benefit -- scale out when demand increases, scale in when it decreases.",
        ],
        tip: "Horizontal scaling (add more instances) = scale out. Vertical scaling (bigger instance) = scale up. AWS favors horizontal scaling.",
      },
      {
        heading: "Migration Services",
        points: [
          "AWS Migration Hub: Central location to track migration progress across AWS tools.",
          "AWS Application Migration Service (MGN): Lift-and-shift migration of servers to AWS. Formerly CloudEndure Migration.",
          "AWS Database Migration Service (DMS): Migrate databases to AWS with minimal downtime. Supports homogeneous and heterogeneous migrations.",
          "AWS Schema Conversion Tool (SCT): Convert database schema from one engine to another (e.g., Oracle to Aurora).",
          "Use DMS + SCT together for heterogeneous migrations (different source and target engines).",
        ],
        services: [
          {
            name: "AWS Database Migration Service",
            description: "Migrate databases to AWS quickly and securely with minimal downtime.",
            keyFact: "Supports ongoing replication. Source DB stays operational during migration. Works with SCT for engine changes.",
          },
        ],
      },
      {
        heading: "Domain 3 Key Exam Strategies",
        points: [
          "This domain is 34% of the exam -- the largest. Know the core services and their differentiators.",
          "For each service, know: what it does, when to use it, and how it differs from similar services.",
          "Common question patterns: 'Which service should you use for X?' -- match the requirement to the service.",
          "Remember: serverless services (Lambda, DynamoDB, Fargate, S3, SNS, SQS) = no infrastructure management.",
          "Managed services (RDS, ECS on EC2, ElastiCache) = AWS manages infrastructure but you manage some configuration.",
          "Know the difference between HA (Multi-AZ), durability (data protection), and scalability (handling more load).",
          "S3 storage classes, EC2 purchasing options, and database service selection are the most heavily tested topics.",
          "Networking basics: VPC, subnets, Security Groups vs NACLs, and connectivity options (VPN vs Direct Connect).",
        ],
        tip: "Focus your study time proportionally: Domain 3 = 34%, so spend about a third of your study time here. Know the top 20 services deeply.",
      },
    ],
  },
];
