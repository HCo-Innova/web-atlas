# Terraform Outputs for ATLAS Agro Industrial Website

# S3 Bucket outputs
output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = module.s3_website.bucket_name
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = module.s3_website.bucket_arn
}

output "s3_website_endpoint" {
  description = "S3 website endpoint"
  value       = module.s3_website.website_endpoint
}

# CloudFront outputs
output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = module.cloudfront.distribution_id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = module.cloudfront.domain_name
}

output "cloudfront_url" {
  description = "CloudFront HTTPS URL (temporary access)"
  value       = "https://${module.cloudfront.domain_name}"
}

# Route53 and ACM outputs (conditional)
output "route53_zone_id" {
  description = "Route53 hosted zone ID"
  value       = var.create_domain_resources ? module.route53[0].zone_id : null
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN"
  value       = var.create_domain_resources ? module.acm[0].certificate_arn : null
}

output "website_url" {
  description = "Final website URL"
  value       = var.create_domain_resources ? "https://${var.domain_name}" : "https://${module.cloudfront.domain_name}"
}

# Deployment information
output "deployment_info" {
  description = "Deployment information and next steps"
  value = {
    temporary_url    = "https://${module.cloudfront.domain_name}"
    final_domain     = var.domain_name
    domain_ready     = var.create_domain_resources
    bucket_name      = module.s3_website.bucket_name
    distribution_id  = module.cloudfront.distribution_id
    region          = var.aws_region
  }
}

# GitHub Actions secrets (sensitive)
output "github_secrets_info" {
  description = "Information needed for GitHub Actions secrets"
  value = {
    aws_region           = var.aws_region
    s3_bucket           = module.s3_website.bucket_name
    cloudfront_id       = module.cloudfront.distribution_id
  }
  sensitive = false
}