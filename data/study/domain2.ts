import type { StudyTopic } from "@/lib/types";

export const domain2Topics: StudyTopic[] = [
  {
    title: "Shared Responsibility Model",
    slug: "shared-responsibility-model",
    sections: [
      {
        heading: "Overview",
        points: [
          "The Shared Responsibility Model defines who is responsible for what in terms of cloud security.",
          "AWS is responsible for 'Security OF the Cloud' - the infrastructure that runs all AWS services (hardware, software, networking, facilities).",
          "The Customer is responsible for 'Security IN the Cloud' - configuration, data, identity management, and application-level security.",
          "The division of responsibility shifts depending on the service type: IaaS, PaaS, or SaaS.",
          "This is one of the most heavily tested concepts on the CLF-C02 exam.",
        ],
        tip: "Remember the phrase: AWS secures the foundation, you secure what you build on it. If a question asks 'who is responsible for patching the guest OS on EC2?' the answer is always the CUSTOMER.",
      },
      {
        heading: "AWS Responsibilities (Security OF the Cloud)",
        points: [
          "Physical security of data centers (environmental controls, surveillance, access management).",
          "Hardware and infrastructure maintenance (servers, storage devices, networking equipment).",
          "Managed services infrastructure (patching underlying OS for services like RDS, Lambda, DynamoDB).",
          "Global network infrastructure (Regions, Availability Zones, Edge Locations).",
          "Hypervisor and host operating system for compute services.",
          "Software for foundational services (compute, storage, database, networking).",
          "Decommissioning storage devices securely (media destruction).",
        ],
      },
      {
        heading: "Customer Responsibilities (Security IN the Cloud)",
        points: [
          "Customer data - encryption, classification, and protection.",
          "Identity and Access Management (IAM users, roles, policies, MFA).",
          "Operating system patching and updates on EC2 instances.",
          "Application-level security and code updates.",
          "Security group and NACL configuration (firewall rules).",
          "Network configuration (VPC design, subnets, routing).",
          "Encryption of data at rest and in transit (choosing to enable it).",
          "Client-side data encryption and data integrity authentication.",
        ],
      },
      {
        heading: "Responsibility by Service Type",
        points: [
          "IaaS (e.g., EC2): Customer manages OS, patching, firewall, data. AWS manages hypervisor and below.",
          "PaaS (e.g., RDS, Elastic Beanstalk): AWS manages OS and patching. Customer manages data, access, and firewall rules.",
          "SaaS (e.g., Amazon Chime, WorkDocs): AWS manages almost everything. Customer manages data and access controls.",
          "Serverless (e.g., Lambda, DynamoDB, S3): AWS manages infrastructure and runtime. Customer manages code (Lambda), data, and access.",
        ],
        comparison: {
          headers: [
            "Responsibility",
            "IaaS (EC2)",
            "PaaS (RDS)",
            "SaaS / Serverless",
          ],
          rows: [
            ["Physical infrastructure", "AWS", "AWS", "AWS"],
            ["Hypervisor", "AWS", "AWS", "AWS"],
            ["Operating System", "Customer", "AWS", "AWS"],
            ["OS Patching", "Customer", "AWS", "AWS"],
            ["Network config (SGs, NACLs)", "Customer", "Customer", "AWS / Shared"],
            ["Application code", "Customer", "Customer", "Customer (Lambda)"],
            ["Data encryption", "Customer", "Customer", "Customer"],
            ["IAM / Access control", "Customer", "Customer", "Customer"],
            ["Customer data", "Customer", "Customer", "Customer"],
          ],
        },
        tip: "The more managed the service, the more AWS handles. EC2 = most customer responsibility. Lambda/S3 = least customer responsibility (but you still own data and access).",
      },
    ],
  },
  {
    title: "AWS Identity and Access Management (IAM)",
    slug: "iam",
    sections: [
      {
        heading: "IAM Core Concepts",
        points: [
          "IAM is a global service - it is not region-specific. Users, groups, roles, and policies are available across all regions.",
          "IAM is free to use - there is no charge for IAM itself.",
          "IAM controls authentication (who can sign in) and authorization (what they can do).",
          "Everything in AWS is an API call - IAM governs access to all API calls.",
          "By default, all permissions are DENIED. You must explicitly grant permissions (implicit deny).",
          "An explicit DENY always overrides an ALLOW.",
        ],
        tip: "If a question mentions 'global service' or 'no additional cost,' IAM is a likely answer.",
      },
      {
        heading: "IAM Users",
        points: [
          "An IAM user represents a single person or application that interacts with AWS.",
          "Each user has a unique name within the AWS account.",
          "Users can authenticate via console password (for AWS Management Console) and/or access keys (for CLI/API).",
          "Access keys consist of an Access Key ID and a Secret Access Key.",
          "New users have NO permissions by default - you must attach policies.",
          "Best practice: create individual users, never share credentials.",
          "You can have up to 5,000 IAM users per AWS account.",
        ],
      },
      {
        heading: "IAM Groups",
        points: [
          "Groups are collections of IAM users for easier permission management.",
          "A user can belong to multiple groups (up to 10).",
          "Groups CANNOT be nested (no groups within groups).",
          "Groups are NOT an identity - you cannot use a group as a principal in a resource-based policy.",
          "Best practice: assign permissions to groups, then add users to groups.",
          "Example: Create a 'Developers' group with EC2 and S3 access, then add developer users.",
        ],
      },
      {
        heading: "IAM Roles",
        points: [
          "Roles provide temporary security credentials (not permanent like users).",
          "Roles are assumed by trusted entities: AWS services, IAM users, external identities (federation).",
          "Common use: EC2 instance role - allows an EC2 instance to call AWS services without storing access keys.",
          "Common use: Cross-account access - allow users in one AWS account to access resources in another.",
          "Common use: Federation - allow external users (corporate directory, Google, Facebook) to access AWS.",
          "Roles use temporary credentials via AWS Security Token Service (STS).",
          "Best practice: use roles instead of access keys whenever possible.",
        ],
        tip: "If a question asks how to give an EC2 instance permission to access S3 or DynamoDB, the answer is an IAM ROLE (never store access keys on the instance).",
      },
      {
        heading: "IAM Policies",
        points: [
          "Policies are JSON documents that define permissions (allow or deny actions on resources).",
          "Policy structure: Version, Statement (Effect, Action, Resource, optional Condition).",
          "AWS Managed Policies: pre-built by AWS (e.g., AmazonS3ReadOnlyAccess). Cannot be edited.",
          "Customer Managed Policies: created and managed by you. Reusable across users/groups/roles.",
          "Inline Policies: embedded directly in a single user, group, or role. Not reusable.",
          "Identity-based policies: attached to users, groups, or roles.",
          "Resource-based policies: attached to resources (e.g., S3 bucket policy, SQS queue policy).",
          "The principle of least privilege: grant only the permissions needed to perform a task.",
        ],
        tip: "Exam questions often ask about least privilege. Always choose the answer that grants the minimum required permissions, not broad '*' access.",
      },
      {
        heading: "Multi-Factor Authentication (MFA)",
        points: [
          "MFA adds a second layer of security beyond username and password.",
          "MFA = something you know (password) + something you have (MFA device).",
          "Supported MFA devices: virtual MFA app (e.g., Google Authenticator, Authy), hardware TOTP token, FIDO2 security key.",
          "Best practice: enable MFA for ALL users, especially the root user.",
          "MFA can be required via IAM policy conditions (aws:MultiFactorAuthPresent).",
          "Hardware MFA key fob and U2F security keys provide the strongest protection.",
        ],
      },
      {
        heading: "Root User",
        points: [
          "The root user is the email address used to create the AWS account.",
          "Root user has COMPLETE, unrestricted access to all AWS services and resources.",
          "Best practice: do NOT use root user for everyday tasks. Create IAM users instead.",
          "Best practice: enable MFA on the root user immediately.",
          "Best practice: lock away root user access keys (delete them if they exist).",
          "Best practice: use a strong password for the root user.",
        ],
        tip: "Questions about 'what can ONLY the root user do' appear frequently. Memorize the list of root-user-only actions.",
      },
      {
        heading: "Root User Exclusive Actions",
        points: [
          "Change the AWS account name, email address, or root user password.",
          "Change the AWS Support plan.",
          "Close the AWS account.",
          "Restore IAM user permissions (if the only IAM admin accidentally revokes their own access).",
          "Enable MFA delete on an S3 bucket.",
          "Create a CloudFront key pair for trusted signers.",
          "Register as a seller in the Reserved Instance Marketplace.",
          "Configure an S3 bucket to enable MFA delete.",
          "View certain tax invoices.",
          "Sign up for GovCloud.",
        ],
      },
      {
        heading: "IAM Identity Center (AWS SSO)",
        points: [
          "Successor to AWS Single Sign-On (SSO) - provides centralized access management.",
          "One login portal for multiple AWS accounts and business applications.",
          "Integrates with Microsoft Active Directory, Okta, and other SAML 2.0 identity providers.",
          "Supports built-in identity store or external identity provider.",
          "Simplifies access for organizations using AWS Organizations with multiple accounts.",
          "Best practice for managing workforce identities and multi-account access.",
          "Provides temporary credentials - more secure than long-term access keys.",
        ],
        tip: "If a question asks about single sign-on to multiple AWS accounts or business apps, the answer is IAM Identity Center (formerly AWS SSO).",
      },
      {
        heading: "IAM Best Practices Summary",
        points: [
          "Lock away the root user access keys.",
          "Enable MFA for root and all IAM users.",
          "Create individual IAM users (never share credentials).",
          "Use groups to assign permissions.",
          "Grant least privilege.",
          "Use IAM roles for applications on EC2.",
          "Use roles to delegate permissions.",
          "Rotate credentials regularly.",
          "Use policy conditions for extra security (e.g., IP restrictions, MFA required).",
          "Use AWS managed policies when possible for common use cases.",
          "Monitor activity with CloudTrail.",
          "Use IAM Access Analyzer to identify unused permissions and external access.",
        ],
      },
    ],
  },
  {
    title: "AWS Security Services",
    slug: "security-services",
    sections: [
      {
        heading: "Overview",
        points: [
          "AWS provides a comprehensive set of security services for detection, investigation, protection, and compliance.",
          "These services are frequently tested on the CLF-C02 exam - know what each one DOES and when to use it.",
          "Many of these services integrate with each other and with AWS Security Hub for centralized management.",
        ],
      },
      {
        heading: "Amazon GuardDuty",
        points: [
          "Intelligent threat detection service that continuously monitors for malicious activity.",
          "Uses machine learning, anomaly detection, and integrated threat intelligence.",
          "Analyzes AWS CloudTrail event logs, VPC Flow Logs, and DNS logs automatically.",
          "Can detect cryptocurrency mining, unauthorized access, compromised instances, and reconnaissance.",
          "One-click enablement - no software to install or infrastructure to manage.",
          "Generates findings that can be sent to EventBridge for automated remediation.",
          "Can protect S3, EKS, RDS, Lambda, and EBS in addition to general account monitoring.",
        ],
        services: [
          {
            name: "Amazon GuardDuty",
            description:
              "Managed threat detection service using ML and threat intelligence to identify malicious activity in your AWS account.",
            keyFact:
              "Analyzes CloudTrail, VPC Flow Logs, and DNS logs automatically - no agents or software needed.",
          },
        ],
        tip: "If a question asks about 'threat detection,' 'malicious activity,' or 'intelligent monitoring,' the answer is GuardDuty.",
      },
      {
        heading: "Amazon Inspector",
        points: [
          "Automated vulnerability management service for EC2 instances, container images in ECR, and Lambda functions.",
          "Continuously scans workloads for software vulnerabilities and unintended network exposure.",
          "Provides a risk score for each finding to help prioritize remediation.",
          "Integrates with Systems Manager (SSM) Agent for EC2 scanning.",
          "Automatically discovers and scans new resources as they are deployed.",
          "Findings can be routed to Security Hub and EventBridge.",
        ],
        services: [
          {
            name: "Amazon Inspector",
            description:
              "Automated vulnerability scanning service for EC2, ECR container images, and Lambda functions.",
            keyFact:
              "Continuously scans for software vulnerabilities (CVEs) and network exposure - provides risk scores.",
          },
        ],
        tip: "Inspector = vulnerability scanning (CVEs, patching). GuardDuty = threat detection (active malicious behavior). These are commonly confused on the exam.",
      },
      {
        heading: "Amazon Macie",
        points: [
          "Fully managed data security and privacy service.",
          "Uses machine learning to discover, classify, and protect sensitive data stored in Amazon S3.",
          "Automatically detects Personally Identifiable Information (PII), financial data, health records, and credentials.",
          "Provides dashboards and alerts for visibility into S3 data security posture.",
          "Helps with compliance requirements (GDPR, HIPAA, PCI DSS).",
          "Can create automated alerts when sensitive data is found in unexpected locations.",
        ],
        services: [
          {
            name: "Amazon Macie",
            description:
              "ML-powered service that discovers and protects sensitive data in S3 (PII, financial data, credentials).",
            keyFact:
              "Specifically designed for S3 data classification - finds PII, credit card numbers, and other sensitive data.",
          },
        ],
        tip: "If a question mentions discovering PII, sensitive data in S3, or data classification, the answer is Macie.",
      },
      {
        heading: "AWS Security Hub",
        points: [
          "Centralized security service that aggregates, organizes, and prioritizes security findings.",
          "Collects findings from GuardDuty, Inspector, Macie, Firewall Manager, IAM Access Analyzer, and third-party tools.",
          "Runs automated compliance checks against best practice standards (AWS Foundational Security Best Practices, CIS, PCI DSS).",
          "Provides a comprehensive security score and dashboard.",
          "Cross-region and cross-account aggregation capability.",
          "Supports automated remediation through EventBridge integration.",
        ],
        services: [
          {
            name: "AWS Security Hub",
            description:
              "Central dashboard that aggregates security findings from multiple AWS services and third-party tools.",
            keyFact:
              "Single pane of glass for security - aggregates findings from GuardDuty, Inspector, Macie, and more.",
          },
        ],
        tip: "If a question asks about a 'centralized view of security' or 'aggregating security findings,' the answer is Security Hub.",
      },
      {
        heading: "Amazon Detective",
        points: [
          "Helps analyze, investigate, and identify the root cause of security findings or suspicious activity.",
          "Automatically collects log data from AWS resources and builds a linked visual graph.",
          "Uses machine learning, statistical analysis, and graph theory.",
          "Works with findings from GuardDuty and other sources.",
          "Helps answer questions like 'what happened?' and 'what was affected?' after a security event.",
          "No upfront costs, data collection, or special software needed.",
        ],
        services: [
          {
            name: "Amazon Detective",
            description:
              "Security investigation service that helps analyze and identify root causes of security findings.",
            keyFact:
              "Goes beyond detection - helps you INVESTIGATE and understand the scope of security issues using graph analysis.",
          },
        ],
        tip: "GuardDuty DETECTS threats. Detective INVESTIGATES them. Security Hub AGGREGATES all findings in one dashboard.",
      },
      {
        heading: "AWS CloudTrail",
        points: [
          "Records ALL API calls made in your AWS account (who, what, when, where).",
          "Enabled by default for all AWS accounts (90-day event history for management events).",
          "Management events: operations on AWS resources (create, delete, modify).",
          "Data events: operations on data within resources (S3 object-level operations, Lambda invocations) - NOT enabled by default.",
          "CloudTrail logs can be delivered to S3 for long-term storage and analysis.",
          "Integrates with CloudWatch Logs for real-time monitoring and alerting.",
          "Essential for governance, compliance, operational auditing, and security analysis.",
          "Insight events can detect unusual API activity patterns.",
          "Trail can be configured for a single region or all regions.",
        ],
        services: [
          {
            name: "AWS CloudTrail",
            description:
              "Records API calls and actions taken in your AWS account for auditing, compliance, and security investigation.",
            keyFact:
              "Answers 'who did what, when, and from where?' - the audit log for every API call in your account.",
          },
        ],
        tip: "CloudTrail = API audit log (who did what). CloudWatch = monitoring and metrics (how is it performing). If a question asks about auditing or tracking user actions, choose CloudTrail.",
      },
      {
        heading: "AWS Config",
        points: [
          "Continuously tracks and records AWS resource configurations and changes over time.",
          "Provides a configuration history for each resource (what changed and when).",
          "Config Rules evaluate whether resource configurations comply with desired settings.",
          "AWS provides managed rules (e.g., 'are all EBS volumes encrypted?', 'are S3 buckets public?').",
          "You can also create custom rules using Lambda functions.",
          "Provides a compliance dashboard showing conformant vs non-conformant resources.",
          "Can trigger automatic remediation using Systems Manager Automation.",
          "Does NOT prevent changes - it detects and alerts on non-compliant configurations.",
        ],
        services: [
          {
            name: "AWS Config",
            description:
              "Tracks resource configuration changes over time and evaluates them against desired compliance rules.",
            keyFact:
              "Answers 'what is my resource configuration, how has it changed, and is it compliant?' - configuration compliance checker.",
          },
        ],
        tip: "Config = resource configuration compliance and history. CloudTrail = API call audit log. They complement each other but serve different purposes.",
      },
      {
        heading: "Security Services Quick Reference",
        points: [
          "GuardDuty: 'Is something malicious happening?' (threat detection)",
          "Inspector: 'Are my workloads vulnerable?' (vulnerability scanning)",
          "Macie: 'Is there sensitive data in my S3 buckets?' (data classification)",
          "Security Hub: 'What is my overall security posture?' (aggregated dashboard)",
          "Detective: 'What exactly happened during this security event?' (investigation)",
          "CloudTrail: 'Who made this API call?' (audit logging)",
          "Config: 'Are my resources configured correctly?' (configuration compliance)",
        ],
        comparison: {
          headers: ["Service", "Primary Purpose", "Key Data Source"],
          rows: [
            [
              "GuardDuty",
              "Threat detection",
              "CloudTrail, VPC Flow Logs, DNS",
            ],
            ["Inspector", "Vulnerability scanning", "EC2, ECR, Lambda workloads"],
            ["Macie", "Sensitive data discovery", "S3 buckets"],
            [
              "Security Hub",
              "Centralized findings",
              "GuardDuty, Inspector, Macie, etc.",
            ],
            [
              "Detective",
              "Security investigation",
              "GuardDuty findings, logs",
            ],
            ["CloudTrail", "API audit logging", "All AWS API calls"],
            ["Config", "Configuration compliance", "Resource configurations"],
          ],
        },
      },
    ],
  },
  {
    title: "Network Security",
    slug: "network-security",
    sections: [
      {
        heading: "Security Groups",
        points: [
          "Security Groups act as a virtual firewall at the INSTANCE level (attached to ENI).",
          "STATEFUL: if you allow inbound traffic, the response is automatically allowed outbound (and vice versa).",
          "Support ALLOW rules only - you cannot create deny rules.",
          "By default, all inbound traffic is DENIED and all outbound traffic is ALLOWED.",
          "You can reference other security groups as sources (e.g., allow traffic from SG-web to SG-db).",
          "Can be attached to multiple instances; an instance can have multiple security groups.",
          "Changes take effect immediately.",
          "Evaluate ALL rules before deciding whether to allow traffic (not evaluated in order).",
        ],
        tip: "Security Groups are STATEFUL and ALLOW-only. NACLs are STATELESS and support ALLOW + DENY. This distinction is tested very frequently.",
      },
      {
        heading: "Network Access Control Lists (NACLs)",
        points: [
          "NACLs act as a firewall at the SUBNET level.",
          "STATELESS: inbound and outbound rules are evaluated independently (return traffic must be explicitly allowed).",
          "Support both ALLOW and DENY rules.",
          "Rules are evaluated in NUMBER ORDER (lowest number first). First match wins.",
          "Default NACL: allows all inbound and outbound traffic.",
          "Custom NACL: denies all inbound and outbound traffic by default.",
          "Each subnet must be associated with exactly one NACL (uses default NACL if not specified).",
          "Good for blocking specific IP addresses at the subnet level.",
        ],
      },
      {
        heading: "Security Groups vs NACLs",
        points: [
          "Security Groups operate at the instance level; NACLs operate at the subnet level.",
          "Security Groups are stateful; NACLs are stateless.",
          "Security Groups have allow rules only; NACLs have allow and deny rules.",
          "Security Groups evaluate all rules; NACLs evaluate rules in order (first match).",
          "Use Security Groups as your primary defense; use NACLs as an additional layer.",
        ],
        comparison: {
          headers: ["Feature", "Security Group", "NACL"],
          rows: [
            ["Operates at", "Instance level (ENI)", "Subnet level"],
            ["Statefulness", "Stateful", "Stateless"],
            ["Rule types", "Allow only", "Allow and Deny"],
            ["Rule evaluation", "All rules evaluated", "Rules in number order"],
            [
              "Default inbound",
              "Deny all",
              "Allow all (default NACL)",
            ],
            [
              "Default outbound",
              "Allow all",
              "Allow all (default NACL)",
            ],
            [
              "Return traffic",
              "Automatically allowed",
              "Must be explicitly allowed",
            ],
            [
              "Best for",
              "Instance-level filtering",
              "Blocking specific IPs",
            ],
          ],
        },
      },
      {
        heading: "AWS WAF (Web Application Firewall)",
        points: [
          "Protects web applications from common web exploits at Layer 7 (HTTP/HTTPS).",
          "Deployed on Amazon CloudFront, Application Load Balancer (ALB), API Gateway, and AppSync.",
          "Protects against SQL injection, cross-site scripting (XSS), and other OWASP Top 10 threats.",
          "Uses Web ACLs (Access Control Lists) with customizable rules.",
          "Rate-based rules can block IPs that exceed a defined request rate (helps with DDoS at application layer).",
          "AWS Managed Rules provide pre-configured rule sets (can be activated quickly).",
          "Can filter based on IP address, country, request size, string patterns, and regex.",
          "Bot Control feature to manage bot traffic.",
        ],
        services: [
          {
            name: "AWS WAF",
            description:
              "Web Application Firewall that protects against common web exploits like SQL injection and XSS at Layer 7.",
            keyFact:
              "Layer 7 (HTTP) protection - deployed on CloudFront, ALB, or API Gateway. NOT the same as Shield.",
          },
        ],
        tip: "WAF = Layer 7 (application layer, HTTP attacks like SQL injection). Shield = Layer 3/4 (network/transport layer, DDoS). They work together but serve different purposes.",
      },
      {
        heading: "AWS Shield",
        points: [
          "Managed DDoS (Distributed Denial of Service) protection service.",
          "AWS Shield Standard: FREE, automatically enabled for all AWS customers.",
          "Shield Standard protects against most common Layer 3/4 DDoS attacks (SYN floods, UDP reflection, etc.).",
          "AWS Shield Advanced: PAID service ($3,000/month), provides enhanced DDoS protection.",
          "Shield Advanced features: 24/7 access to AWS DDoS Response Team (DRT), cost protection (refund scaling charges from DDoS), advanced diagnostics, near real-time visibility.",
          "Shield Advanced covers EC2, ELB, CloudFront, Global Accelerator, and Route 53.",
          "Shield Advanced integrates with WAF (WAF included at no extra cost with Advanced).",
        ],
        services: [
          {
            name: "AWS Shield Standard",
            description:
              "Free, automatic DDoS protection for all AWS customers at Layer 3/4.",
            keyFact:
              "Always on, always free - protects against most common network/transport layer DDoS attacks.",
          },
          {
            name: "AWS Shield Advanced",
            description:
              "Paid DDoS protection with 24/7 DRT access, cost protection, and advanced diagnostics.",
            keyFact:
              "$3,000/month - includes DDoS Response Team, cost protection from DDoS-related scaling charges, and free WAF usage.",
          },
        ],
        comparison: {
          headers: ["Feature", "Shield Standard", "Shield Advanced"],
          rows: [
            ["Cost", "Free", "$3,000/month"],
            ["Activation", "Automatic", "Must be enabled"],
            ["Protection layer", "Layer 3/4", "Layer 3/4/7 (with WAF)"],
            ["DDoS Response Team", "No", "Yes, 24/7"],
            ["Cost protection", "No", "Yes (refund DDoS-caused scaling)"],
            ["Real-time metrics", "No", "Yes"],
            ["WAF included", "No", "Yes, at no extra cost"],
          ],
        },
      },
      {
        heading: "AWS Firewall Manager",
        points: [
          "Centrally manage firewall rules across multiple AWS accounts in an AWS Organization.",
          "Manages AWS WAF rules, Shield Advanced protections, Security Groups, Network Firewall, and Route 53 Resolver DNS Firewall.",
          "Automatically applies rules to new resources as they are created.",
          "Requires AWS Organizations with all features enabled.",
          "Simplifies management when you have many accounts and need consistent security policies.",
        ],
        services: [
          {
            name: "AWS Firewall Manager",
            description:
              "Centrally manages firewall rules (WAF, Shield, Security Groups) across all accounts in an Organization.",
            keyFact:
              "The 'centralized management' answer for WAF/Shield rules across multiple accounts. Requires AWS Organizations.",
          },
        ],
        tip: "If a question mentions managing security rules across MULTIPLE accounts, the answer is Firewall Manager.",
      },
      {
        heading: "VPC Flow Logs",
        points: [
          "Capture information about IP traffic going to and from network interfaces in a VPC.",
          "Can be enabled at VPC level, Subnet level, or ENI (network interface) level.",
          "Logs include source/destination IP, ports, protocol, action (accept/reject), and bytes.",
          "Flow logs can be sent to CloudWatch Logs, S3, or Kinesis Data Firehose.",
          "Used for troubleshooting connectivity issues and monitoring traffic patterns.",
          "Do NOT capture packet content (payload) - only metadata.",
          "Useful for security analysis, especially when combined with GuardDuty.",
          "There is a delay between traffic and when the flow log entry appears.",
        ],
        tip: "VPC Flow Logs capture metadata about network traffic (IPs, ports, accept/reject) but NOT the actual packet payload content.",
      },
    ],
  },
  {
    title: "Encryption and Data Protection",
    slug: "encryption-data-protection",
    sections: [
      {
        heading: "Encryption Fundamentals",
        points: [
          "Encryption at rest: data is encrypted while stored (on disk, in S3, in a database).",
          "Encryption in transit: data is encrypted while being transferred over a network (HTTPS, TLS, SSL).",
          "AWS services support both encryption at rest and in transit.",
          "Server-side encryption (SSE): AWS encrypts data after receiving it.",
          "Client-side encryption: you encrypt data before sending it to AWS.",
          "Most AWS services offer encryption at rest as an option; many enable it by default.",
        ],
        tip: "Know the difference between encryption at rest and in transit. At rest = stored data. In transit = data moving over the network.",
      },
      {
        heading: "AWS Key Management Service (KMS)",
        points: [
          "Managed service to create and control encryption keys used to encrypt your data.",
          "Integrated with most AWS services (S3, EBS, RDS, Redshift, Lambda, SQS, etc.).",
          "AWS managed keys (aws/service-name): created and managed by AWS for each service.",
          "Customer managed keys (CMKs): created by you, full control over key policies and rotation.",
          "Supports automatic key rotation (once per year for customer managed keys).",
          "KMS keys never leave KMS unencrypted - operations happen within the service.",
          "KMS is regional - keys are created in and bound to a specific region.",
          "Envelope encryption: KMS generates a data key, data key encrypts data, KMS key encrypts the data key.",
          "Pay per API call to KMS (encrypt, decrypt, generate data key).",
        ],
        services: [
          {
            name: "AWS KMS",
            description:
              "Managed encryption key service integrated with most AWS services for encryption at rest.",
            keyFact:
              "The default answer for 'how to encrypt data in AWS' - integrates with nearly every AWS service.",
          },
        ],
        tip: "If a question asks about managing encryption keys for AWS services, the answer is KMS. If it asks about dedicated hardware for key management (regulatory/compliance), the answer is CloudHSM.",
      },
      {
        heading: "AWS CloudHSM",
        points: [
          "Dedicated Hardware Security Module (HSM) in the AWS Cloud.",
          "You manage your own encryption keys entirely (AWS has no access to your keys).",
          "FIPS 140-2 Level 3 compliance (KMS is Level 2, with some Level 3).",
          "Single-tenant, dedicated hardware (unlike KMS which is multi-tenant).",
          "Used when regulatory or compliance requirements mandate dedicated hardware key management.",
          "You are responsible for key management, backups, and high availability.",
          "More expensive and complex than KMS.",
        ],
        services: [
          {
            name: "AWS CloudHSM",
            description:
              "Dedicated hardware security module for managing your own encryption keys with full customer control.",
            keyFact:
              "Customer-managed HSM - AWS cannot access your keys. FIPS 140-2 Level 3. For strict regulatory compliance.",
          },
        ],
        comparison: {
          headers: ["Feature", "KMS", "CloudHSM"],
          rows: [
            ["Tenancy", "Multi-tenant (shared)", "Single-tenant (dedicated)"],
            ["Key control", "Shared with AWS", "Customer only"],
            ["FIPS 140-2", "Level 2 (some Level 3)", "Level 3"],
            ["Integration", "Native with AWS services", "Custom integration"],
            ["Management", "AWS managed", "Customer managed"],
            ["Cost", "Per API call", "Per hour (higher)"],
            ["Use case", "Most encryption needs", "Regulatory compliance"],
          ],
        },
      },
      {
        heading: "AWS Certificate Manager (ACM)",
        points: [
          "Provision, manage, and deploy SSL/TLS certificates for HTTPS connections.",
          "Public certificates are FREE when used with integrated AWS services (ELB, CloudFront, API Gateway).",
          "Automatic certificate renewal - no manual rotation needed.",
          "Supports public and private certificates.",
          "Cannot use ACM certificates on EC2 directly (use on ALB/NLB/CloudFront instead).",
          "Simplifies HTTPS setup - eliminates the manual process of purchasing and renewing certificates.",
        ],
        services: [
          {
            name: "AWS Certificate Manager (ACM)",
            description:
              "Manages SSL/TLS certificates for encrypting data in transit. Free public certs with integrated services.",
            keyFact:
              "Free SSL/TLS certificates when used with ELB, CloudFront, or API Gateway. Handles automatic renewal.",
          },
        ],
        tip: "ACM handles encryption IN TRANSIT (HTTPS). KMS handles encryption AT REST. Different purposes entirely.",
      },
      {
        heading: "S3 Encryption Options",
        points: [
          "Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3): default, AWS manages everything. Uses AES-256.",
          "Server-Side Encryption with KMS Keys (SSE-KMS): uses KMS for key management, provides audit trail via CloudTrail.",
          "Server-Side Encryption with Customer-Provided Keys (SSE-C): you provide the encryption key with each request, AWS performs the encryption.",
          "Client-Side Encryption: you encrypt data before uploading to S3.",
          "S3 encrypts all new objects by default (SSE-S3) as of January 2023.",
          "S3 Bucket Keys reduce KMS costs by minimizing KMS API calls.",
          "Encryption in transit: enforce HTTPS using bucket policy condition (aws:SecureTransport).",
        ],
      },
      {
        heading: "Additional Data Protection Services",
        points: [
          "AWS Secrets Manager: securely store, rotate, and retrieve secrets (database credentials, API keys). Supports automatic rotation.",
          "AWS Systems Manager Parameter Store: secure storage for configuration data and secrets. Free tier available. Less feature-rich than Secrets Manager but cheaper.",
          "Amazon S3 Object Lock: WORM (Write Once Read Many) model - prevents object deletion or overwrite for a retention period.",
          "Amazon S3 Glacier Vault Lock: WORM for Glacier vaults - once locked, the policy cannot be changed. Used for compliance.",
        ],
        services: [
          {
            name: "AWS Secrets Manager",
            description:
              "Securely stores and automatically rotates secrets like database credentials and API keys.",
            keyFact:
              "Automatic secret rotation is the key differentiator from Parameter Store. Best for database credentials.",
          },
        ],
        tip: "Secrets Manager = automatic rotation of secrets (especially database passwords). Parameter Store = simpler, cheaper storage of configuration values and secrets (no auto-rotation of DB creds).",
      },
    ],
  },
  {
    title: "Compliance and Governance",
    slug: "compliance-governance",
    sections: [
      {
        heading: "AWS Artifact",
        points: [
          "Self-service portal for on-demand access to AWS compliance reports and agreements.",
          "Artifact Reports: download AWS security and compliance documents (SOC reports, PCI DSS, ISO certifications).",
          "Artifact Agreements: review, accept, and manage agreements (BAA for HIPAA, GDPR DPA).",
          "Free service - no cost to access reports and agreements.",
          "These documents are often required by auditors and compliance teams.",
          "Provides evidence that AWS infrastructure meets compliance standards.",
        ],
        services: [
          {
            name: "AWS Artifact",
            description:
              "Self-service portal for accessing AWS compliance reports (SOC, PCI) and managing agreements (BAA, DPA).",
            keyFact:
              "The answer to 'where do I get AWS compliance documents/reports?' is always Artifact.",
          },
        ],
        tip: "If a question asks about accessing compliance reports, SOC reports, or signing a BAA (Business Associate Addendum for HIPAA), the answer is AWS Artifact.",
      },
      {
        heading: "AWS Audit Manager",
        points: [
          "Continuously audit AWS usage to simplify risk and compliance assessment.",
          "Maps AWS usage to compliance framework requirements (HIPAA, PCI DSS, GDPR, SOC 2).",
          "Automatically collects evidence from AWS services.",
          "Pre-built frameworks and custom frameworks available.",
          "Helps prepare for audits by generating assessment reports.",
          "Reduces manual effort for collecting and organizing audit evidence.",
        ],
        services: [
          {
            name: "AWS Audit Manager",
            description:
              "Automates evidence collection and audit preparation for compliance frameworks.",
            keyFact:
              "Automates audit EVIDENCE collection - maps your AWS usage to compliance framework requirements.",
          },
        ],
      },
      {
        heading: "AWS Organizations",
        points: [
          "Centrally manage and govern multiple AWS accounts.",
          "Consolidated billing: single payment method for all accounts, volume discounts across accounts.",
          "Organizational Units (OUs): group accounts hierarchically for policy application.",
          "Service Control Policies (SCPs): set maximum permission boundaries for member accounts.",
          "SCPs do NOT grant permissions - they restrict what permissions CAN be granted.",
          "SCPs apply to all users and roles in affected accounts, including the account root user.",
          "SCPs do NOT affect the management (master) account.",
          "Free service - no additional charge for AWS Organizations.",
        ],
        services: [
          {
            name: "AWS Organizations",
            description:
              "Central management of multiple AWS accounts with consolidated billing and policy-based governance.",
            keyFact:
              "SCPs (Service Control Policies) restrict maximum permissions across member accounts - they do NOT grant permissions.",
          },
        ],
        tip: "SCPs are guardrails, not permission grants. An SCP that denies EC2 means no one in that account can use EC2, even if their IAM policy allows it. SCPs never affect the management account.",
      },
      {
        heading: "AWS Control Tower",
        points: [
          "Automated setup and governance for a secure, multi-account AWS environment.",
          "Built on top of AWS Organizations, AWS Config, and other services.",
          "Provides a 'landing zone' - a pre-configured, secure multi-account environment.",
          "Guardrails: pre-configured governance rules (preventive and detective).",
          "Preventive guardrails use SCPs to prevent non-compliant actions.",
          "Detective guardrails use AWS Config rules to detect non-compliant resources.",
          "Dashboard for visibility into compliance status across accounts.",
          "Account Factory: automates provisioning of new AWS accounts with pre-approved configurations.",
        ],
        services: [
          {
            name: "AWS Control Tower",
            description:
              "Automated multi-account setup with pre-configured governance guardrails and a landing zone.",
            keyFact:
              "The easiest way to set up a secure multi-account environment. Uses guardrails (SCPs + Config rules) for governance.",
          },
        ],
        tip: "Control Tower = automated multi-account setup with guardrails. Organizations = the underlying service for multi-account management. Control Tower builds ON TOP of Organizations.",
      },
      {
        heading: "Compliance Programs",
        points: [
          "PCI DSS (Payment Card Industry Data Security Standard): required for handling credit card data.",
          "HIPAA (Health Insurance Portability and Accountability Act): required for Protected Health Information (PHI). Requires a BAA with AWS (via Artifact).",
          "SOC 1/2/3 (System and Organization Controls): audit reports on controls relevant to security, availability, and confidentiality.",
          "ISO 27001: international standard for information security management.",
          "FedRAMP: US government compliance framework for cloud services.",
          "GDPR (General Data Protection Regulation): EU data privacy regulation.",
          "AWS Compliance Center provides information on AWS compliance programs.",
          "AWS is compliant for the infrastructure, but the CUSTOMER must ensure their USE of AWS is compliant.",
          "Use AWS Artifact to access compliance reports and agreements.",
        ],
        tip: "The shared responsibility model applies to compliance too. AWS has compliant infrastructure, but YOU are responsible for building compliant workloads on top of it.",
      },
      {
        heading: "Additional Governance Services",
        points: [
          "AWS CloudTrail: governance through API audit logging (who did what, when).",
          "AWS Config: governance through resource configuration tracking and compliance rules.",
          "AWS Trusted Advisor: provides recommendations across 5 categories including security (e.g., open security groups, MFA on root).",
          "IAM Access Analyzer: identifies resources shared with external entities and validates IAM policies.",
          "AWS License Manager: manages software licenses (Windows, Oracle, SAP) across AWS and on-premises.",
          "Amazon CloudWatch: monitoring and alerting on metrics, logs, and events for operational governance.",
        ],
      },
    ],
  },
  {
    title: "DDoS Protection Strategy",
    slug: "ddos-protection",
    sections: [
      {
        heading: "AWS DDoS Mitigation Architecture",
        points: [
          "A comprehensive DDoS protection strategy uses multiple AWS services working together.",
          "This is a common exam topic: know the combination of services that protect against DDoS.",
          "Layer 3/4 attacks (network/transport): volumetric attacks, SYN floods, UDP reflection.",
          "Layer 7 attacks (application): HTTP floods, DNS query floods, web scraping attacks.",
        ],
      },
      {
        heading: "The CloudFront + Shield + WAF Combination",
        points: [
          "Amazon CloudFront (CDN): distributes traffic globally across edge locations, absorbs DDoS at the edge before it reaches your origin.",
          "AWS Shield Standard (free): automatically protects CloudFront distributions against Layer 3/4 attacks.",
          "AWS Shield Advanced (paid): adds 24/7 DRT, cost protection, and advanced analytics for CloudFront and other resources.",
          "AWS WAF (on CloudFront): protects against Layer 7 attacks with rules for SQL injection, XSS, rate limiting, and IP blocking.",
          "Route 53: DNS-level protection, health checks, and failover. Also protected by Shield.",
          "This layered approach is the recommended DDoS mitigation architecture.",
        ],
        tip: "The exam loves questions about DDoS protection. The answer almost always involves CloudFront + Shield + WAF working together. CloudFront absorbs the attack, Shield protects at network layer, WAF protects at application layer.",
      },
      {
        heading: "DDoS Best Practices",
        points: [
          "Use CloudFront to cache content at edge locations and absorb attacks closer to users.",
          "Enable Shield Standard (automatic and free) on all resources.",
          "Use WAF rate-based rules to automatically block IPs sending too many requests.",
          "Design for scalability: use Auto Scaling, ELB, and CloudFront to absorb traffic spikes.",
          "Use Route 53 for DNS with health checks and failover for high availability.",
          "Consider Shield Advanced for mission-critical applications needing 24/7 DRT support.",
          "Use AWS Firewall Manager to apply WAF rules consistently across all accounts.",
          "Monitor with CloudWatch alarms for sudden traffic spikes.",
        ],
      },
    ],
  },
  {
    title: "Root User Security Best Practices",
    slug: "root-user-security",
    sections: [
      {
        heading: "Root User Overview",
        points: [
          "The root user is the identity used to create the AWS account (the email address).",
          "Root has unrestricted access to ALL resources and services in the account.",
          "Root user access CANNOT be restricted by IAM policies or SCPs (SCPs apply to member accounts but not the management account root).",
          "The root user should be secured immediately after account creation.",
        ],
      },
      {
        heading: "Actions ONLY the Root User Can Perform",
        points: [
          "Change the account name, email address, or root user password.",
          "Change or cancel the AWS Support plan.",
          "Close the AWS account.",
          "Restore IAM user permissions (when the only IAM administrator accidentally removes their own access).",
          "Enable MFA Delete on an S3 bucket (requires root to enable via the API).",
          "Create a CloudFront key pair for trusted signers.",
          "Register as a seller in the Reserved Instance Marketplace.",
          "View certain tax invoices.",
          "Sign up for AWS GovCloud.",
          "Configure an S3 bucket for MFA Delete.",
          "Edit or delete an S3 bucket policy that includes an invalid VPC ID or VPC endpoint ID.",
        ],
        tip: "Memorize at least 4-5 root-only actions. The exam commonly asks 'which task requires the root user?' Changing account settings, closing the account, changing support plan, and restoring IAM permissions are the most frequently tested.",
      },
      {
        heading: "Root User Security Best Practices",
        points: [
          "Enable MFA on the root user account immediately (use a hardware MFA device for strongest security).",
          "Do NOT create access keys for the root user. If they exist, delete them.",
          "Do NOT use the root user for everyday tasks - create IAM users instead.",
          "Use a strong, unique password for the root user.",
          "Store root credentials securely (password manager, secure vault).",
          "Set up alternate contacts for billing, operations, and security communications.",
          "Monitor root user activity using CloudTrail (set up alerts for root API calls).",
          "Consider using AWS Organizations to manage multiple accounts - this reduces the need to log in as root.",
        ],
        tip: "Every exam has at least one root user question. Remember: enable MFA, delete access keys, do not use for daily tasks. These three best practices cover most questions.",
      },
    ],
  },
  {
    title: "Domain 2 Exam Strategy",
    slug: "domain2-exam-strategy",
    sections: [
      {
        heading: "Key Exam Tips for Security and Compliance",
        points: [
          "Domain 2 is worth 30% of the exam (approximately 20 out of 65 scored questions) - the highest weighted domain.",
          "The Shared Responsibility Model appears in many questions, even when not explicitly asked. Understand it deeply.",
          "Know the difference between similar services: GuardDuty vs Inspector vs Macie vs Detective.",
          "Security Groups vs NACLs: stateful vs stateless is tested in almost every exam.",
          "Shield Standard (free, automatic) vs Shield Advanced (paid, DRT) - know the differences.",
          "KMS vs CloudHSM: KMS for most cases, CloudHSM for regulatory/compliance requirements.",
          "CloudTrail (who did what) vs Config (how are resources configured) vs CloudWatch (performance metrics).",
          "IAM Roles are the preferred method for granting AWS service permissions (not access keys).",
          "Root user: know what ONLY root can do and the best practices for securing it.",
          "Encryption: at rest (KMS, SSE) vs in transit (TLS/SSL, ACM). Most services support both.",
        ],
      },
      {
        heading: "Common Exam Traps",
        points: [
          "TRAP: 'Security Groups can deny traffic' - FALSE, they only have allow rules. NACLs can deny.",
          "TRAP: 'NACLs are stateful' - FALSE, NACLs are stateless. Security Groups are stateful.",
          "TRAP: 'AWS is responsible for patching EC2 OS' - FALSE, customer patches EC2 OS. AWS patches the hypervisor.",
          "TRAP: 'IAM groups can be nested' - FALSE, groups cannot contain other groups.",
          "TRAP: 'SCPs grant permissions' - FALSE, SCPs only restrict the maximum available permissions.",
          "TRAP: 'CloudTrail tracks resource configuration' - FALSE, that is AWS Config. CloudTrail tracks API calls.",
          "TRAP: 'AWS manages encryption keys in CloudHSM' - FALSE, customer manages keys in CloudHSM. AWS manages the hardware only.",
          "TRAP: 'Shield Standard is a paid service' - FALSE, Shield Standard is free and automatic for all customers.",
          "TRAP: 'Root user can be restricted by IAM policies' - FALSE, root user cannot be limited by IAM policies.",
          "TRAP: 'WAF protects against DDoS at Layer 3' - FALSE, WAF is Layer 7 only. Shield handles Layer 3/4.",
        ],
      },
      {
        heading: "Service Matching Cheat Sheet",
        points: [
          "Threat detection -> GuardDuty",
          "Vulnerability scanning -> Inspector",
          "PII/sensitive data in S3 -> Macie",
          "Centralized security findings -> Security Hub",
          "Investigate security incidents -> Detective",
          "API call logging -> CloudTrail",
          "Configuration compliance -> Config",
          "Web application attacks (SQLi, XSS) -> WAF",
          "DDoS protection -> Shield (+ CloudFront + WAF)",
          "Encryption keys -> KMS (or CloudHSM for dedicated hardware)",
          "SSL/TLS certificates -> ACM",
          "Compliance reports -> Artifact",
          "Multi-account governance -> Organizations + SCPs",
          "Automated multi-account setup -> Control Tower",
          "Single sign-on -> IAM Identity Center",
          "Secrets and credentials -> Secrets Manager",
          "Manage firewall rules across accounts -> Firewall Manager",
        ],
      },
    ],
  },
];
