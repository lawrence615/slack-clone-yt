import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import {
  addDoc,
  collection,
  db,
  doc,
  getDoc,
  serverTimestamp,
} from "../services/firebase";

function ChatInput({ channelId, channelName }) {
  const inputRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("message 1", inputRef.current.value);
    if (!channelId) {
      return false;
    }
    console.log("message 2", inputRef.current.value);

    // addDoc(collection(db, "rooms"), {
    //   timestamp: serverTimestamp(),
    // });

    // addDoc(collection(db, "rooms").doc(channelId).collection("messages"), {
    //   message: inputRef.current.value,
    //   timestamp: serverTimestamp(),
    // });

    //   const docRef = doc(db, "rooms", channelId);

    //   const docSnap = await getDoc(docRef);

    const docRef = doc(db, "rooms", channelId);
    const colRef = collection(docRef, "messages");
    addDoc(colRef, {
      message: inputRef.current.value,
      timestamp: serverTimestamp(),
    })
      .then(() => {})
      .catch((e) => console.log(e));
  };

  return (
    <ChatInputContainer>
      <form action="POST">
        <input ref={inputRef} placeholder={`Message #ROOM`} />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
