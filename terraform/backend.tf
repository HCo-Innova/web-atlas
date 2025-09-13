# Terraform Backend Configuration
# This will store the Terraform state in S3 with DynamoDB locking
# 
# IMPORTANT: Create these resources manually before running terraform init:
# 
# 1. S3 Bucket for state:
# aws s3 mb s3://atlas-terraform-state-sa-east-1 --region sa-east-1
# 
# 2. DynamoDB table for locking:
# aws dynamodb create-table \
#   --table-name atlas-terraform-locks \
#   --attribute-definitions AttributeName=LockID,AttributeType=S \
#   --key-schema AttributeName=LockID,KeyType=HASH \
#   --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
#   --region sa-east-1
# 
# 3. Enable versioning on S3 bucket:
# aws s3api put-bucket-versioning \
#   --bucket atlas-terraform-state-sa-east-1 \
#   --versioning-configuration Status=Enabled

terraform {
  backend "s3" {
    # S3 bucket to store terraform state
    bucket = "atlas-terraform-state-sa-east-1"
    
    # Path within the bucket
    key = "atlas-website/terraform.tfstate"
    
    # AWS region where the bucket exists
    region = "sa-east-1"
    
    # DynamoDB table for state locking
    dynamodb_table = "atlas-terraform-locks"
    
    # Enable encryption at rest
    encrypt = true
  }
}