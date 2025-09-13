# Terraform Variables for ATLAS Agro Industrial - Production Environment

# Environment
environment = "production"

# AWS Configuration
aws_region = "sa-east-1"  # São Paulo, Brasil

# Project Configuration
project_name = "atlas"
bucket_name  = "atlas"     # Will become atlas-production-{random}

# Domain Configuration (set to false for temporary deployment)
domain_name              = "atlasaisa.com.py"
create_domain_resources  = false  # Set to true when domain DNS is configured

# CloudFront Configuration
cloudfront_price_class = "PriceClass_100"  # US, Canada, Europe, Asia
default_root_object    = "index.html"

# Additional Tags
tags = {
  Company    = "ATLAS Agro Industrial"
  Country    = "Paraguay"
  Department = "IT"
  Contact    = "admin@atlasaisa.com.py"
}