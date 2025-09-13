#!/bin/bash

# Setup AWS Infrastructure for ATLAS Agro Industrial
# This script creates the initial S3 bucket and DynamoDB table for Terraform state

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REGION="sa-east-1"
STATE_BUCKET="atlas-terraform-state-sa-east-1"
LOCK_TABLE="atlas-terraform-locks"

echo -e "${BLUE}🚀 Setting up AWS infrastructure for ATLAS Agro Industrial${NC}"
echo -e "${BLUE}Region: ${REGION}${NC}"
echo -e "${BLUE}State Bucket: ${STATE_BUCKET}${NC}"
echo -e "${BLUE}Lock Table: ${LOCK_TABLE}${NC}"
echo

# Check if AWS CLI is installed and configured
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials are not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI is configured${NC}"

# Create S3 bucket for Terraform state
echo -e "${YELLOW}📦 Creating S3 bucket for Terraform state...${NC}"
if aws s3api head-bucket --bucket "$STATE_BUCKET" --region "$REGION" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  S3 bucket $STATE_BUCKET already exists${NC}"
else
    aws s3api create-bucket \
        --bucket "$STATE_BUCKET" \
        --region "$REGION" \
        --create-bucket-configuration LocationConstraint="$REGION"
    echo -e "${GREEN}✅ S3 bucket $STATE_BUCKET created${NC}"
fi

# Enable versioning on S3 bucket
echo -e "${YELLOW}🔄 Enabling versioning on S3 bucket...${NC}"
aws s3api put-bucket-versioning \
    --bucket "$STATE_BUCKET" \
    --versioning-configuration Status=Enabled
echo -e "${GREEN}✅ Versioning enabled${NC}"

# Enable encryption on S3 bucket
echo -e "${YELLOW}🔒 Enabling encryption on S3 bucket...${NC}"
aws s3api put-bucket-encryption \
    --bucket "$STATE_BUCKET" \
    --server-side-encryption-configuration '{
        "Rules": [
            {
                "ApplyServerSideEncryptionByDefault": {
                    "SSEAlgorithm": "AES256"
                },
                "BucketKeyEnabled": true
            }
        ]
    }'
echo -e "${GREEN}✅ Encryption enabled${NC}"

# Create DynamoDB table for state locking
echo -e "${YELLOW}🗃️  Creating DynamoDB table for state locking...${NC}"
if aws dynamodb describe-table --table-name "$LOCK_TABLE" --region "$REGION" &> /dev/null; then
    echo -e "${YELLOW}⚠️  DynamoDB table $LOCK_TABLE already exists${NC}"
else
    aws dynamodb create-table \
        --table-name "$LOCK_TABLE" \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
        --region "$REGION" \
        --tags Key=Project,Value="ATLAS Agro Industrial" Key=Environment,Value="production" Key=ManagedBy,Value="terraform"
    
    echo -e "${YELLOW}⏳ Waiting for DynamoDB table to be active...${NC}"
    aws dynamodb wait table-exists --table-name "$LOCK_TABLE" --region "$REGION"
    echo -e "${GREEN}✅ DynamoDB table $LOCK_TABLE created${NC}"
fi

echo
echo -e "${GREEN}🎉 AWS infrastructure setup completed successfully!${NC}"
echo
echo -e "${BLUE}Next steps:${NC}"
echo -e "${BLUE}1. cd terraform${NC}"
echo -e "${BLUE}2. terraform init${NC}"
echo -e "${BLUE}3. terraform plan${NC}"
echo -e "${BLUE}4. terraform apply${NC}"
echo
echo -e "${YELLOW}Note: The infrastructure will be created in temporary mode.${NC}"
echo -e "${YELLOW}Set create_domain_resources = true in terraform.tfvars when your domain is ready.${NC}"