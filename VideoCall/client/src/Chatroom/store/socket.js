import io from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

// socket.on("connect", () => {
//   // Emit user ID once connected
//   const user = useRecoilValue(authUserAtom);
//   socket.emit("userId", user.id);
// });

export default socket;
