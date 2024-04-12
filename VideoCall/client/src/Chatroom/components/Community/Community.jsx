import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { currentCommunityAtom } from "../../store/communityStore";
import ChatRoomLeft from "../ChatRoomLeft/ChatRoomLeft";
import "./Community.css";
import EnterCommunity from "./EnterCommunity/EnterCommunity";
import CommunityRight from "./CommunityRight/CommunityRight";
import NewCommunity from "./NewCommunity/NewCommunity";

const Community = () => {
  const currentCommunity = useRecoilValue(currentCommunityAtom);
  const [newCommunityForm, setNewCommunityForm] = useState(false);
  return (
    <div className="community">
      <ChatRoomLeft
        for="community"
        open={newCommunityForm}
        setOpen={setNewCommunityForm}
      />
      <NewCommunity open={newCommunityForm} setOpen={setNewCommunityForm} />
      {currentCommunity.name ? <CommunityRight /> : <EnterCommunity />}
    </div>
  );
};

export default Community;
