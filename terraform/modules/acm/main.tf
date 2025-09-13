# ACM Certificate Module for ATLAS Agro Industrial
# Creates SSL certificate for custom domain
# MUST be created in us-east-1 for CloudFront usage

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# ACM certificate for domain and www subdomain
resource "aws_acm_certificate" "website" {
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"
  
  tags = merge(var.tags, {
    Name = "${var.domain_name} SSL Certificate"
  })
  
  lifecycle {
    create_before_destroy = true
  }
}

# DNS validation records
resource "aws_route53_record" "certificate_validation" {
  for_each = {
    for dvo in aws_acm_certificate.website.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = var.zone_id
}

# Certificate validation
resource "aws_acm_certificate_validation" "website" {
  certificate_arn         = aws_acm_certificate.website.arn
  validation_record_fqdns = [for record in aws_route53_record.certificate_validation : record.fqdn]
  
  timeouts {
    create = "5m"
  }
}