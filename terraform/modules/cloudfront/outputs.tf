# Outputs for CloudFront Module

output "distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.website.id
}

output "domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "hosted_zone_id" {
  description = "CloudFront distribution hosted zone ID"
  value       = aws_cloudfront_distribution.website.hosted_zone_id
}

output "arn" {
  description = "CloudFront distribution ARN"
  value       = aws_cloudfront_distribution.website.arn
}

output "status" {
  description = "Current status of the distribution"
  value       = aws_cloudfront_distribution.website.status
}

output "etag" {
  description = "Current version of the distribution's information"
  value       = aws_cloudfront_distribution.website.etag
}