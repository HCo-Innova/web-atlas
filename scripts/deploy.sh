#!/bin/bash

# Deployment script for ATLAS Agro Industrial Website
# This script builds the React app and deploys it to S3 + CloudFront

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="production"
SKIP_BUILD=false
SKIP_INVALIDATION=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --skip-invalidation)
            SKIP_INVALIDATION=true
            shift
            ;;
        --environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --skip-build         Skip the build process"
            echo "  --skip-invalidation  Skip CloudFront invalidation"
            echo "  --environment ENV    Environment to deploy to (default: production)"
            echo "  --help               Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

echo -e "${BLUE}🚀 Deploying ATLAS Agro Industrial Website${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Get AWS configuration from Terraform outputs
echo -e "${YELLOW}📋 Getting AWS configuration from Terraform...${NC}"
cd terraform

# Check if Terraform state exists
if [ ! -f ".terraform/terraform.tfstate" ] && [ ! -f "terraform.tfstate" ]; then
    echo -e "${RED}❌ Terraform state not found. Please run 'terraform apply' first.${NC}"
    exit 1
fi

# Get outputs from Terraform
S3_BUCKET=$(terraform output -raw s3_bucket_name 2>/dev/null || echo "")
CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null || echo "")
AWS_REGION=$(terraform output -raw github_secrets_info | jq -r '.aws_region' 2>/dev/null || echo "sa-east-1")

if [ -z "$S3_BUCKET" ] || [ -z "$CLOUDFRONT_ID" ]; then
    echo -e "${RED}❌ Could not get AWS configuration from Terraform outputs.${NC}"
    echo -e "${RED}Please ensure Terraform has been applied successfully.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS Configuration:${NC}"
echo -e "${GREEN}   S3 Bucket: ${S3_BUCKET}${NC}"
echo -e "${GREEN}   CloudFront ID: ${CLOUDFRONT_ID}${NC}"
echo -e "${GREEN}   AWS Region: ${AWS_REGION}${NC}"
echo

cd ..

# Build the React app (unless skipped)
if [ "$SKIP_BUILD" = false ]; then
    echo -e "${YELLOW}🏗️  Building React application...${NC}"
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Installing dependencies...${NC}"
        npm install
    fi
    
    # Build the application
    npm run build
    
    if [ ! -d "dist" ]; then
        echo -e "${RED}❌ Build failed - dist directory not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Build completed${NC}"
else
    echo -e "${YELLOW}⏭️  Skipping build process${NC}"
fi

# Deploy to S3
echo -e "${YELLOW}☁️  Deploying to S3...${NC}"
aws s3 sync dist/ s3://$S3_BUCKET/ \
    --region $AWS_REGION \
    --delete \
    --exclude "*.map" \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "service-worker.js"

# Upload HTML files with shorter cache
aws s3 sync dist/ s3://$S3_BUCKET/ \
    --region $AWS_REGION \
    --exclude "*" \
    --include "*.html" \
    --include "service-worker.js" \
    --cache-control "public, max-age=300"

echo -e "${GREEN}✅ Files uploaded to S3${NC}"

# Invalidate CloudFront cache (unless skipped)
if [ "$SKIP_INVALIDATION" = false ]; then
    echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
    
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id $CLOUDFRONT_ID \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)
    
    echo -e "${GREEN}✅ CloudFront invalidation created: ${INVALIDATION_ID}${NC}"
    echo -e "${YELLOW}⏳ Waiting for invalidation to complete (this may take a few minutes)...${NC}"
    
    aws cloudfront wait invalidation-completed \
        --distribution-id $CLOUDFRONT_ID \
        --id $INVALIDATION_ID
    
    echo -e "${GREEN}✅ CloudFront invalidation completed${NC}"
else
    echo -e "${YELLOW}⏭️  Skipping CloudFront invalidation${NC}"
fi

# Get the website URL
WEBSITE_URL=$(cd terraform && terraform output -raw website_url)

echo
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo
echo -e "${BLUE}Website URL: ${WEBSITE_URL}${NC}"
echo -e "${BLUE}S3 Bucket: ${S3_BUCKET}${NC}"
echo -e "${BLUE}CloudFront Distribution: ${CLOUDFRONT_ID}${NC}"
echo
echo -e "${YELLOW}Note: It may take a few minutes for changes to propagate globally.${NC}"