import React from "react";
import Chatroom from "./Chatroom/Chatroom";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Chatroom />
      </RecoilRoot>
    </div>
  );
};

export default App;
