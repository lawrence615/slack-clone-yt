import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

import ChatInput from "./ChatInput";
import { selectRoomId } from "../features/appSlice";
import { collection, db, doc, orderBy, query } from "../services/firebase";

function Chat() {
  const roomId = useSelector(selectRoomId);
    // console.log(roomId)
  const docRef = roomId && doc(db, "rooms", roomId);
  const [roomDetails] = useDocument(roomId && docRef);
  const [roomMessages] = useCollection(roomId && query(collection(docRef, "messages"), orderBy("timestamp", "asc")))

  console.log('roomDetails',roomDetails?.data())
//   console.log('roomMessages',roomMessages)

  return (
    <ChatContainer>
      <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </HeaderLeft>
          <HeaderRight>
            <p>
              <InfoOutlinedIcon /> Details
            </p>
          </HeaderRight>
        </Header>

        <ChatMessages>{/** List out all messages */}</ChatMessages>

        <ChatInput key={roomId} channelId={roomId} channelName={roomDetails?.data().name} />
      </>
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
  }

  > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    flex-grow: 1;
    overflow-y: scroll;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;
