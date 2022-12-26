import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Avatar = () => {
  const [AvatarArr, setAvatarArr] = useState([]);
  const [SelectedAv, setSelectedAv] = useState(undefined);
  const [IsLoading, setIsLoading] = useState(0);
  /* console.log(SelectedAv) */
  const nav = useNavigate();

  useEffect(() => {
    randomValueGen();
  }, []);

  const randomValueGen = async () => {
    try {
      const arrAV = [];
      for (let i = 0; i < 4; i++) {
        const randomValue = Math.floor(Math.random() * 1000);

        const avatarApi = await axios.get(
          `https://api.multiavatar.com/${randomValue}`
        );

        const buffer = new Buffer(avatarApi.data);

        arrAV.push(buffer.toString("base64"));
        console.log(arrAV);
      }
      setAvatarArr(arrAV);
      console.log(arrAV);
      if (arrAV.length === 4) {
        setIsLoading(1);
      }
    } catch (error) {
      alert("please refresh the page");
    }
  };
  const setProfile = async () => {
    if (SelectedAv === undefined) {
      alert("selected the profile picture below");
    } else {
      const user = await JSON.parse(localStorage.getItem("user-login"));

      const sendingData = await axios.post("/chat", {
        userId: user._id,

        AvatarImg: AvatarArr[SelectedAv],
      });

      if (sendingData.status === 200) {
        user.isAvatarImgSet = sendingData.data.isAvatarImgSet;
        user.AvatarImage = sendingData.data.AvatarImg;

        localStorage.setItem("user-Avatar-details", JSON.stringify(user));
        nav("/chat");
      }
    }
  };
  return (
    <>
      {IsLoading === 0 ? (
        <Loader>
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </Loader>
      ) : (
        <AllContainer>
          <h1>Pick An Avatar as your profile</h1>
          <Container>
            {AvatarArr.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`${SelectedAv === index ? "selected" : ""}`}
                >
                  <Img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    onClick={() => {
                      setSelectedAv(index);
                    }}
                    alt="avatar"
                  />
                </div>
              );
            })}
          </Container>
          <div className="btn">
            <Btn onClick={setProfile}>Select avatar</Btn>
          </div>
        </AllContainer>
      )}
    </>
  );
};

export default Avatar;
const AllContainer = styled.div`
  display: grid;
  place-items: center;

  .selected {
    border: 10px solid red;
    border-radius: 40px;
  }
`;
const Container = styled.div`
  display: flex;
  margin-top: 10%;
  cursor: pointer;
  margin-bottom: 5%;
`;
const Btn = styled.button`
  padding: 15px;
  cursor: pointer;
  border-radius: 20px;
  background-color: #12aff29c;
  margin-top: 10px;
`;
const Img = styled.img`
  margin-right: 30px;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  height: 100px;
`;
const Loader = styled.div`
  height: 30rem;
  display: grid;
  place-items: center;
`;
