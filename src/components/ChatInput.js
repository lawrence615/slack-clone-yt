import React, { useRef, useState } from "react";
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

function ChatInput({ channelId, channelName, chatRef }) {
//   const inputRef = useRef(null);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    const docRef = doc(db, "rooms", channelId);
    const colRef = collection(docRef, "messages");
    addDoc(colRef, {
      message: input    ,
      timestamp: serverTimestamp(),
      user:'Peter Boxxe',
      userImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQguXQ1nOHR5nn_bvAJh3WYkJx5lhcoe629Kd8ihrl1Nz_RM_ceahkycj6123JzinuFKt0&usqp=CAU'
    })
      .then(() => setInput(''))
      .catch((e) => console.log(e));

      chatRef?.current?.scrollIntoView({behavior:'smooth'});
  };

  return (
    <ChatInputContainer>
      <form action="POST">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
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
