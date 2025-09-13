# Outputs for S3 Website Module

output "bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.website.bucket
}

output "bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.website.arn
}

output "bucket_domain_name" {
  description = "Bucket domain name"
  value       = aws_s3_bucket.website.bucket_domain_name
}

output "bucket_regional_domain_name" {
  description = "Bucket regional domain name"
  value       = aws_s3_bucket.website.bucket_regional_domain_name
}

output "website_endpoint" {
  description = "Website endpoint"
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "origin_access_control_id" {
  description = "Origin Access Control ID for CloudFront"
  value       = aws_cloudfront_origin_access_control.website.id
}