import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Content } from "./Content";
import { NewsData } from "./NewsData";

const News = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      fetchUserName();
    }, [user, loading]);
    return (
      <Content title="News">
        <div className="w-full flex flex-col gap-4">
          <NewsData articles={9}/>
        </div>
      </Content>
    );
  }
  export default News;