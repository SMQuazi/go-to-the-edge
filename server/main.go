package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/davecgh/go-spew/spew"
)

func errCheck(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func handleApiRoot(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello from the API."))
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

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/", handleApiRoot)
	mux.HandleFunc("/api/articles/", handleApiArticles)
	mux.Handle("/", http.FileServer(http.Dir("../client/build")))

	fmt.Print("Server started")
	http.ListenAndServe(":5000", mux)
}
