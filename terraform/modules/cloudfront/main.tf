# CloudFront Distribution Module for ATLAS Agro Industrial
# Creates CloudFront distribution for global CDN

# CloudFront distribution
resource "aws_cloudfront_distribution" "website" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = var.default_root_object
  price_class         = var.price_class
  
  # Alternative domain names (when domain is configured)
  aliases = var.domain_name != null ? [var.domain_name, "www.${var.domain_name}"] : []

  # Origin configuration (S3 bucket)
  origin {
    domain_name              = var.bucket_regional_domain
    origin_id                = "S3-${var.bucket_name}"
    origin_access_control_id = var.origin_access_control_id
  }

  # Default cache behavior
  default_cache_behavior {
    target_origin_id       = "S3-${var.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    
    # Cache settings optimized for SPA
    min_ttl     = 0
    default_ttl = 86400   # 24 hours
    max_ttl     = 31536000 # 1 year
  }
  
  # Cache behavior for static assets (longer cache)
  ordered_cache_behavior {
    path_pattern           = "/static/*"
    target_origin_id       = "S3-${var.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    
    min_ttl     = 31536000 # 1 year
    default_ttl = 31536000 # 1 year
    max_ttl     = 31536000 # 1 year
  }
  
  # Cache behavior for assets folder (longer cache)
  ordered_cache_behavior {
    path_pattern           = "/assets/*"
    target_origin_id       = "S3-${var.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    
    min_ttl     = 31536000 # 1 year
    default_ttl = 31536000 # 1 year
    max_ttl     = 31536000 # 1 year
  }

  # Geographic restrictions
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # SSL certificate configuration
  viewer_certificate {
    cloudfront_default_certificate = var.certificate_arn == null
    acm_certificate_arn           = var.certificate_arn
    ssl_support_method            = var.certificate_arn != null ? "sni-only" : null
    minimum_protocol_version      = "TLSv1.2_2021"
  }

  # Custom error responses for SPA routing
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }
  
  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  tags = var.tags
}