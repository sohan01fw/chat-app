import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BiSend } from "react-icons/bi";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import axios from "axios";
const Message = ({ UsersSelected, filterData, UserAvatar, socket }) => {
  const [emojiPicker, setemojiPicker] = useState(false);
  const [msg, setmsg] = useState("");
  const [message, setmessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    if (UserAvatar) {
      const getdata = async () => {
        const getData = await axios.post("/getMsg", {
          from: UserAvatar._id,
          to: filterData[UsersSelected]._id,
        });
        setmessage(getData.data);
      };
      getdata();
    }
  }, [UsersSelected, filterData, UserAvatar]);
  const handleEmojiPicker = () => {
    setemojiPicker(!emojiPicker);
  };
  const ToMsg = (value) => {
    let message = msg;
    message += value.native;
    setmsg(message);
  };

  const sendMsg = async () => {
    try {
      const sendMsgs = await axios.post("/addMsg", {
        from: UserAvatar._id,
        to: filterData[UsersSelected]._id,
        message: msg,
      });
      console.log(sendMsgs);
      /* socket.current.emit("send-msg", {
        from: UserAvatar._id,
        to: filterData[UsersSelected]._id,
        message: msg,
      });
      const msgs = [...message];
      msgs.push({ fromSelf: true, message: msg });
      setmessage(msgs); */

      setmsg("");
    } catch (error) {
      console.log(error);
    }
  };
  /*  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]); */
  /* useEffect(() => {
    arrivalMessage && setmessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]); */
  /* useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]); */
  return (
    <Container>
      <div className="chatHeader">
        <img
          src={`data:image/svg+xml;base64,${filterData[UsersSelected].AvatarImage}`}
          alt=""
          height="60px"
          width="80px"
        />
        <h3>{filterData[UsersSelected].name}</h3>
      </div>
      <ChatMessage>
        {message &&
          message.map((msg, index) => {
            return (
              <div
                /* ref={scrollRef}
                key={uuidv4()} */
                /*  key={index} */

                className={msg.fromSelf ? "sendMsg" : "receiveMsg"}
              >
                {msg.message}
              </div>
            );
          })}
      </ChatMessage>
      <ChatContainer>
        <div className="emoji">
          <BsFillEmojiSmileFill onClick={handleEmojiPicker} />
          {emojiPicker && <Picker data={data} onEmojiSelect={ToMsg} />}
        </div>

        <ChatInput
          type="text"
          name="msg"
          onChange={(e) => {
            setmsg(e.target.value);
          }}
          placeholder="write your message here"
          value={msg}
        />
        <div className="sendIcon" onClick={sendMsg}>
          <BiSend className="send" />
        </div>
      </ChatContainer>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  .chatHeader {
    display: flex;
  }
`;
const ChatContainer = styled.div`
  display: flex;

  .sendIcon {
    border: 1px solid white;
    margin: 10px;
    cursor: pointer;
    :hover {
      background-color: #77f477;
    }
  }
  .send {
    font-size: 30px;
  }
  .input {
    border: 1px solid white;
    width: 100%;
    /*   padding-right: 30px; */
  }
`;
const ChatInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;
const ChatMessage = styled.div`
  border: 1px solid white;
  height: 71vh;
  padding-top: 20px;
  .receiveMsg {
    border: 1px solid blueviolet;
    width: 20%;
    padding-left: 3%;
    margin-bottom: 10px;
  }
  .sendMsg {
    border: 1px solid greenyellow;
    margin-left: 85%;
    padding-right: 3%;
    margin-top: 10px;
  }
`;
