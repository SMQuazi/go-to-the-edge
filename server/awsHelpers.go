package main

import (
	"context"
	"fmt"
	"io"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/joho/godotenv"
)

func GetConfig() aws.Config {
	godotenv.Load((".env"))
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}
	return cfg
}

func toS3(svc *s3.Client, body io.Reader, filepath string) (*s3.PutObjectOutput, error) {
	return svc.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String("likwid-webapps"),
		Body:   body,
		Key:    aws.String(fmt.Sprintf("personal-site/%s", filepath)),
	})
}

func ListBuckets(svc *s3.Client) {
	// Build the request with its input parameters
	resp, err := svc.ListBuckets(context.TODO(), &s3.ListBucketsInput{})
	if err != nil {
		log.Fatalf("failed to list buckets; %v", err)
	}

	fmt.Println("Buckets:")
	for _, buckets := range resp.Buckets {
		fmt.Println(aws.ToString(buckets.Name))
	}
}
