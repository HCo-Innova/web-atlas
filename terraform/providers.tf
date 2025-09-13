# Terraform providers configuration
terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Primary AWS Provider - São Paulo (sa-east-1)
# Used for S3, CloudWatch, and other regional resources
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "ATLAS Agro Industrial"
      Environment = var.environment
      Repository  = "web-atlas"
      ManagedBy   = "terraform"
      Owner       = "HCo-Innova"
    }
  }
}

# Secondary AWS Provider - US East 1 (us-east-1)
# Required for ACM certificates used with CloudFront
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  
  default_tags {
    tags = {
      Project     = "ATLAS Agro Industrial"
      Environment = var.environment
      Repository  = "web-atlas"
      ManagedBy   = "terraform"
      Owner       = "HCo-Innova"
    }
  }
}