package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
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

func handleApiArticles(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	db := InitDb(ctx)
	allArticles := getAllArticles(db)
	for i := 0; i < len(allArticles); i++ {
		spew.Dump(allArticles[i])
	}

	b, err := json.Marshal(allArticles)
	errCheck(err)
	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
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

	return articles
}
