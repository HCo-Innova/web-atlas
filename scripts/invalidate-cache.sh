#!/bin/bash

# CloudFront Cache Invalidation Script for ATLAS Agro Industrial
# This script invalidates the CloudFront cache

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
PATHS="/*"
WAIT=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --paths)
            PATHS="$2"
            shift 2
            ;;
        --wait)
            WAIT=true
            shift
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --paths PATHS    Paths to invalidate (default: /*)"
            echo "  --wait           Wait for invalidation to complete"
            echo "  --help           Show this help message"
            echo
            echo "Examples:"
            echo "  $0                           # Invalidate everything"
            echo "  $0 --paths '/index.html'     # Invalidate specific file"
            echo "  $0 --paths '/assets/*'       # Invalidate assets folder"
            echo "  $0 --wait                    # Invalidate and wait for completion"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

echo -e "${BLUE}🔄 Invalidating CloudFront cache for ATLAS Agro Industrial${NC}"
echo -e "${BLUE}Paths: ${PATHS}${NC}"
echo

# Get CloudFront distribution ID from Terraform
echo -e "${YELLOW}📋 Getting CloudFront distribution ID from Terraform...${NC}"

if [ ! -d "terraform" ]; then
    echo -e "${RED}❌ terraform directory not found. Please run this script from the project root.${NC}"
    exit 1
fi

cd terraform

# Check if Terraform state exists
if [ ! -f ".terraform/terraform.tfstate" ] && [ ! -f "terraform.tfstate" ]; then
    echo -e "${RED}❌ Terraform state not found. Please run 'terraform apply' first.${NC}"
    exit 1
fi

# Get CloudFront distribution ID
CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null || echo "")

if [ -z "$CLOUDFRONT_ID" ]; then
    echo -e "${RED}❌ Could not get CloudFront distribution ID from Terraform outputs.${NC}"
    echo -e "${RED}Please ensure Terraform has been applied successfully.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ CloudFront Distribution ID: ${CLOUDFRONT_ID}${NC}"
echo

cd ..

# Create invalidation
echo -e "${YELLOW}🔄 Creating CloudFront invalidation...${NC}"

INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_ID \
    --paths "$PATHS" \
    --query 'Invalidation.Id' \
    --output text)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ CloudFront invalidation created: ${INVALIDATION_ID}${NC}"
else
    echo -e "${RED}❌ Failed to create CloudFront invalidation${NC}"
    exit 1
fi

# Wait for completion if requested
if [ "$WAIT" = true ]; then
    echo -e "${YELLOW}⏳ Waiting for invalidation to complete (this may take a few minutes)...${NC}"
    
    aws cloudfront wait invalidation-completed \
        --distribution-id $CLOUDFRONT_ID \
        --id $INVALIDATION_ID
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ CloudFront invalidation completed${NC}"
    else
        echo -e "${RED}❌ Error waiting for invalidation completion${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}💡 Use --wait flag to wait for completion, or check status in AWS Console${NC}"
fi

echo
echo -e "${BLUE}Invalidation details:${NC}"
echo -e "${BLUE}  Distribution ID: ${CLOUDFRONT_ID}${NC}"
echo -e "${BLUE}  Invalidation ID: ${INVALIDATION_ID}${NC}"
echo -e "${BLUE}  Paths: ${PATHS}${NC}"
echo
echo -e "${GREEN}🎉 Cache invalidation completed!${NC}"