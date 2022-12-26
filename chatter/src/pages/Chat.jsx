import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "../components/Message";
import { io } from "socket.io-client";
const Chat = () => {
  const [UserAvatar, setUserAvatar] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [UsersSelected, setUsersSelected] = useState(undefined);
  /*   const [UserMsg, setUserMsg] = useState([]);
   */ const socket = useRef();
  const getUsers = async () => {
    const avatarImg = await JSON.parse(
      localStorage.getItem("user-Avatar-details")
    );

    setUserAvatar(avatarImg);

    try {
      const getUsers = await axios.get(`/chat/${avatarImg._id}`);
      setfilterData(getUsers.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  /*  useEffect(() => {
    if (UserAvatar) {
      socket.current = io("httP://localhost:5000");
      socket.current.emit("add-user", UserAvatar._id);
    }
  }, [UserAvatar]); */

  return (
    <>
      <Container>
        <Contacts>
          <UserImg
            src={`data:image/svg+xml;base64,${UserAvatar.AvatarImage}`}
            alt="avatar"
          />
          <AllUsers>
            {filterData.map((e, index) => {
              return (
                <div
                  key={index}
                  className="filterdata"
                  onClick={() => {
                    setUsersSelected(index);
                  }}
                >
                  <AllUsersImg
                    src={`data:image/svg+xml;base64,${e.AvatarImage}`}
                    alt="avatar"
                  />
                  <h3>{e.name}</h3>
                </div>
              );
            })}
          </AllUsers>
        </Contacts>
        <MsgContainer>
          {UsersSelected === undefined ? (
            <h1>
              Welcome,click someOne from your contact to start the message
            </h1>
          ) : (
            <Message
              UsersSelected={UsersSelected}
              filterData={filterData}
              UserAvatar={UserAvatar}
              socket={socket}
            />
          )}
        </MsgContainer>
      </Container>
    </>
  );
};

export default Chat;

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  height: 100vh;
`;
const Contacts = styled.div`
  width: 20%;
  height: 80vh;
`;
const UserImg = styled.img`
  height: 50px;
  width: 100px;
`;
const AllUsers = styled.div`
  margin-top: 30px;

  width: 65%;
  padding-right: 10px;

  .filterdata {
    display: flex;
    padding-bottom: 15px;
    padding-top: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    :hover {
      background-color: #2efd2e;
    }
  }
`;
const AllUsersImg = styled.img`
  height: 50px;
  width: 100px;
`;
const MsgContainer = styled.div`
  border: 1px solid whitesmoke;
  flex: 1;
  margin-top: 20px;
  height: 80vh;
`;
