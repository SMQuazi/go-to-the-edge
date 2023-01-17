package main

import (
	"encoding/json"
	"net/http"
)

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

	// TODO actual encrypted authentication
	if loginInfo.Username == "test" && loginInfo.Password == "test" {
		returnUser := UserInfo{Id: 1, Username: "test", DisplayName: "Tester 1"}
		b, err := json.Marshal(returnUser)
		errCheck(err)
		w.Write(b)
		return
	}
}
