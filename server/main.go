package main

import (
	"fmt"
	"log"

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
		return c.SendString("Hello from the API.")
	})

	app.Post("/api/upload", func(c *fiber.Ctx) error {
		file, err := c.FormFile("File")
		errCheck(err)

		test, err := file.Open()
		errCheck(err)

		s3Service := s3.NewFromConfig(GetConfig())
		output, _ := ToS3(s3Service, test, file.Filename)

		fmt.Println(output)

		return c.SendStatus(200)
	})

	app.Listen(":5000")
}
