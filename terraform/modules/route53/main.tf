# Route53 Module for ATLAS Agro Industrial
# Creates hosted zone and DNS records for custom domain

# Route53 hosted zone
resource "aws_route53_zone" "website" {
  name = var.domain_name
  
  tags = merge(var.tags, {
    Name = "${var.domain_name} Hosted Zone"
  })
}

# A record for root domain pointing to CloudFront
resource "aws_route53_record" "website_root" {
  zone_id = aws_route53_zone.website.zone_id
  name    = var.domain_name
  type    = "A"
  
  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}

# A record for www subdomain pointing to CloudFront
resource "aws_route53_record" "website_www" {
  zone_id = aws_route53_zone.website.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"
  
  alias {
    name                   = var.cloudfront_domain_name
    zone_id                = var.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}