package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/edgedb/edgedb-go"
)

func errCheck(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func InitDb(ctx context.Context) *edgedb.Client {
	client, err := edgedb.CreateClient(ctx, edgedb.Options{})
	fmt.Println("Creating client")
	errCheck(err)

	return client
}

func handleApiRoot(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello from the API."))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/login", handleApiLogin)
	mux.HandleFunc("/api/articles/", handleApiArticles)
	mux.HandleFunc("/api/", handleApiRoot)
	mux.Handle("/", http.FileServer(http.Dir("../client/build")))

	fmt.Println("Server started")
	http.ListenAndServe(":5000", mux)
}
