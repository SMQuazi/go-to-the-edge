package main

import (
	"context"
	"fmt"
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/edgedb/edgedb-go"
)

type Author struct {
	FirstName   string    `edgedb:"first_name"`
	LastName    string    `edgedb:"last_name"`
	MiddleName  string    `edgedb:"middle_name"`
	Institution string    `edgedb:"instituion"`
	DOB         time.Time `edgedb:"dob"`
}

type Articles struct {
	Title        string    `edgedb:"title"`
	Content      string    `edgedb:"content"`
	Author       Author    `edgedb:"author"`
	Publish_date time.Time `edgedb:"publish_date"`
}

func InitDb(ctx context.Context) *edgedb.Client {
	client, err := edgedb.CreateClient(ctx, edgedb.Options{})
	fmt.Println("Creating client")
	errCheck(err)

	return client
}

func getAllArticles(client *edgedb.Client) []Articles {
	ctx := context.Background()
	var articles []Articles
	query :=
		`select Articles {
			title,
			content,
			publish_date,
		  author: {
		  	first_name,
				last_name
			}
		};`

	err := client.Query(ctx, query, &articles)
	errCheck(err)
	fmt.Println("Fetching articles successful.")

	for i := 0; i < len(articles); i++ {
		spew.Dump(articles[i])
		fmt.Println("--")
	}
	return articles
}
