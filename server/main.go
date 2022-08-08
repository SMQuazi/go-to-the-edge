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
		fmt.Println("**")
	}

	b, err := json.Marshal(allArticles)
	errCheck(err)
	fmt.Println("Marshalled")
	fmt.Println(b)

	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

func main() {
	mux := http.NewServeMux()
	// http.HandleFunc("/api/upload", handleApiUpload)
	mux.HandleFunc("/api/articles/", handleApiArticles)
	mux.HandleFunc("/api", handleApiRoot)
	mux.Handle("/", http.FileServer(http.Dir("../client/build")))

	http.ListenAndServe(":5000", mux)

}
