import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
import { SET_USER } from "../contexts/actionTypes";
import {
  UserReducer,
  UserInitialState,
} from "../contexts/reducers/UserReducers";

interface IAuthor {
  firstName: string;
  lastName: string;
  middleName: string;
  institution: string;
  DOB: Date;
}

interface IArticles {
  title: string;
  content: string;
  author: string;
  publish_date: Date;
}

const Articles = () => {
  return (
    <Card>
      <Grid>test</Grid>
    </Card>
  );
};

export default Articles;
