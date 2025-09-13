# Main Terraform configuration for ATLAS Agro Industrial Website
# 
# This configuration creates:
# - S3 bucket for static website hosting
# - CloudFront distribution for CDN
# - Route53 hosted zone (when domain is ready)
# - ACM SSL certificate (when domain is ready)

# Local values for consistent naming
locals {
  common_tags = merge(var.tags, {
    Project     = "ATLAS Agro Industrial"
    Environment = var.environment
    Repository  = "web-atlas"
    ManagedBy   = "terraform"
  })
  
  bucket_name_full = "${var.bucket_name}-${var.environment}-${random_id.bucket_suffix.hex}"
}

# Random ID for unique bucket naming
resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# S3 Website Module
module "s3_website" {
  source = "./modules/s3-website"
  
  bucket_name          = local.bucket_name_full
  default_root_object  = var.default_root_object
  tags                 = local.common_tags
}

# CloudFront Distribution Module
module "cloudfront" {
  source = "./modules/cloudfront"
  
  bucket_name             = module.s3_website.bucket_name
  bucket_domain_name      = module.s3_website.bucket_domain_name
  bucket_regional_domain  = module.s3_website.bucket_regional_domain_name
  origin_access_control_id = module.s3_website.origin_access_control_id
  
  domain_name             = var.create_domain_resources ? var.domain_name : null
  certificate_arn         = null  # Always null for initial deployment
  
  price_class             = var.cloudfront_price_class
  default_root_object     = var.default_root_object
  
  tags = local.common_tags
  
  depends_on = [module.s3_website]
}

# Route53 Hosted Zone Module (conditional)
module "route53" {
  count  = var.create_domain_resources ? 1 : 0
  source = "./modules/route53"
  
  domain_name                = var.domain_name
  cloudfront_domain_name     = module.cloudfront.domain_name
  cloudfront_hosted_zone_id  = module.cloudfront.hosted_zone_id
  tags                       = local.common_tags
  
  depends_on = [module.cloudfront]
}

# ACM Certificate Module (conditional)
module "acm" {
  count  = var.create_domain_resources ? 1 : 0
  source = "./modules/acm"
  
  domain_name = var.domain_name
  zone_id     = module.route53[0].zone_id
  tags        = local.common_tags
  
  providers = {
    aws = aws.us_east_1
  }
  
  depends_on = [module.route53]
}