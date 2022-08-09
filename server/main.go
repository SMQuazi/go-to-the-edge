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

type LoginInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserInfo struct {
	Id          int    `json:"id"`
	Username    string `json:"username"`
	DisplayName string `json:"displayName"`
}

func handleApiLogin(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var loginInfo LoginInfo
	err := decoder.Decode(&loginInfo)
	errCheck(err)

	if loginInfo.Username == "test" && loginInfo.Password == "test" {
		returnUser := UserInfo{Id: 1, Username: "test", DisplayName: "Tester 1"}

		b, err := json.Marshal(returnUser)
		errCheck(err)
		fmt.Println(b)
		w.Write(b)
		return
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/", handleApiRoot)
	mux.HandleFunc("/api/login", handleApiLogin)
	mux.HandleFunc("/api/articles/", handleApiArticles)
	mux.Handle("/", http.FileServer(http.Dir("../client/build")))

	fmt.Println("Server started")
	http.ListenAndServe(":5000", mux)
}
