package main

import (
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gofiber/fiber/v2"
)

func errCheck(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {

	app := fiber.New(fiber.Config{
		BodyLimit: 1000 * 1024 * 1024,
	})

	app.Get("/api", func(c *fiber.Ctx) error {
		return c.SendString("Hello from the API!")
	})

	app.Post("/api/upload", func(c *fiber.Ctx) error {
		file, err := c.FormFile("File")
		errCheck(err)

		localFilePath := fmt.Sprintf("./uploads/%s", file.Filename)
		fmt.Println(localFilePath)

		err = c.SaveFile(file, localFilePath)
		errCheck(err)

		osFile, err := os.Open(localFilePath)
		errCheck(err)

		s3Service := s3.NewFromConfig(GetConfig())
		output, err := toS3(s3Service, osFile, file.Filename)
		errCheck(err)

		fmt.Println(output.ResultMetadata)

		return c.SendStatus(200)
	})

	app.Listen(":5000")
}
