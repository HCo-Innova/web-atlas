# Outputs for Route53 Module

output "zone_id" {
  description = "Route53 hosted zone ID"
  value       = aws_route53_zone.website.zone_id
}

output "zone_name" {
  description = "Route53 hosted zone name"
  value       = aws_route53_zone.website.name
}

output "name_servers" {
  description = "Route53 hosted zone name servers"
  value       = aws_route53_zone.website.name_servers
}

output "zone_arn" {
  description = "Route53 hosted zone ARN"
  value       = aws_route53_zone.website.arn
}