# S3 Website Module for ATLAS Agro Industrial
# Creates S3 bucket configured for static website hosting

# S3 bucket for website hosting
resource "aws_s3_bucket" "website" {
  bucket = var.bucket_name
  tags   = var.tags
}

# S3 bucket versioning
resource "aws_s3_bucket_versioning" "website" {
  bucket = aws_s3_bucket.website.id
  versioning_configuration {
    status = "Enabled"
  }
}

# S3 bucket server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

# S3 bucket website configuration
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = var.default_root_object
  }

  error_document {
    key = "error.html"
  }

  # SPA routing - redirect 404s to index.html
  routing_rule {
    condition {
      http_error_code_returned_equals = "404"
    }
    redirect {
      replace_key_with = var.default_root_object
    }
  }
}

# S3 bucket public access block (allow public read for website)
resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Origin Access Control for CloudFront
resource "aws_cloudfront_origin_access_control" "website" {
  name                              = "${var.bucket_name}-oac"
  description                       = "Origin access control for ${var.bucket_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# S3 bucket policy to allow CloudFront access
resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontAccess"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.website.arn}/*"
      }
    ]
  })
  
  depends_on = [aws_s3_bucket_public_access_block.website]
}

# Data source for current AWS account ID
data "aws_caller_identity" "current" {}