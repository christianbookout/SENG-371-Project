import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Content } from "../Content";
import { NewsData } from "./NewsData";

const News = () => {
  return (
    <Content title="News">
      <div className="flex w-full flex-col gap-4">
        <NewsData articles={9} />
      </div>
    </Content>
  );
};

export default News;
