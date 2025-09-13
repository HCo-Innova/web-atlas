# Terraform Variables for ATLAS Agro Industrial Website

# Environment configuration
variable "environment" {
  description = "Environment name (production, staging, etc.)"
  type        = string
  default     = "production"
  
  validation {
    condition     = contains(["production", "staging", "development"], var.environment)
    error_message = "Environment must be one of: production, staging, development."
  }
}

# AWS Region
variable "aws_region" {
  description = "AWS region for resources (except ACM which must be in us-east-1)"
  type        = string
  default     = "sa-east-1"
}

# Project configuration
variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "atlas"
}

variable "bucket_name" {
  description = "S3 bucket name for static website hosting"
  type        = string
  default     = "atlas"
  
  validation {
    condition     = can(regex("^[a-z0-9.-]{3,63}$", var.bucket_name))
    error_message = "Bucket name must be between 3 and 63 characters, and contain only lowercase letters, numbers, dots, and hyphens."
  }
}

# Domain configuration
variable "domain_name" {
  description = "Primary domain name (will be used when DNS is configured)"
  type        = string
  default     = "atlasaisa.com.py"
}

variable "create_domain_resources" {
  description = "Whether to create Route53 and ACM resources (set to false for temporary deployment)"
  type        = bool
  default     = false
}

# CloudFront configuration
variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
  
  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.cloudfront_price_class)
    error_message = "Price class must be one of: PriceClass_All, PriceClass_200, PriceClass_100."
  }
}

variable "default_root_object" {
  description = "Default root object for CloudFront"
  type        = string
  default     = "index.html"
}

# Tags
variable "tags" {
  description = "Additional tags to apply to resources"
  type        = map(string)
  default     = {}
}