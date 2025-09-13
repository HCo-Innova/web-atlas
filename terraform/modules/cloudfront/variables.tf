# Variables for CloudFront Module

variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "bucket_domain_name" {
  description = "Domain name of the S3 bucket"
  type        = string
}

variable "bucket_regional_domain" {
  description = "Regional domain name of the S3 bucket"
  type        = string
}

variable "origin_access_control_id" {
  description = "Origin Access Control ID for S3"
  type        = string
}

variable "domain_name" {
  description = "Custom domain name (optional, for when domain is ready)"
  type        = string
  default     = null
}

variable "certificate_arn" {
  description = "ACM certificate ARN (optional, for when domain is ready)"
  type        = string
  default     = null
}

variable "price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
  
  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.price_class)
    error_message = "Price class must be one of: PriceClass_All, PriceClass_200, PriceClass_100."
  }
}

variable "default_root_object" {
  description = "Default root object"
  type        = string
  default     = "index.html"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}