import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { StockData } from "./StockData";
import { Content } from "./Content";
const Stocks = () => {
  const [user, loading] = useAuthState(auth);
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
      // alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  });
  return (
    <Content title="My Stocks">
      <div className="flex w-full gap-4">
        {" "}
        {/* Stock display container */}
        <StockData symbol="IBM" />
        <StockData symbol="GOOG" />
      </div>
    </Content>
  );
};
export default Stocks;
