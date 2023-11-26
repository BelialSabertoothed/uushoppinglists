//@@viewOn:imports
import { createComponent, useState } from "uu5g05";
import UserContext from "./user-context";
import Config from "./config/config";

//@@viewOff:imports

const userList = [
  {
    id: "777-555",
    name: "Luna Purrington",
    img: "./assets/luna.webp",
  },
  {
    id: "777-666",
    name: "Oliver Whiskertail",
    img: "./assets/oliver.jpeg",
  },
  {
    id: "123-456",
    name: "Bella Flutterwings",
    img: "./assets/bella.png",
  },
  {
    id: "789-012",
    name: "Rocky Howler",
    img: "./assets/rocky.avif",
  },
  {
    id: "345-678",
    name: "Leo Snufflepaws",
    img: "./assets/leo.png",
  },
  {
    id: "901-234",
    name: "Ruby Hoppington",
    img: "./assets/ruby.png",
  },
  {
    id: "567-890",
    name: "Chloe Squeaknose",
    img: "./assets/chloe.png",
  },
  {
    id: "456-789",
    name: "Jasper Bumblebuzz",
    img: "./assets/jasper.webp",
  },
  {
    id: "678-901",
    name: "Rosie Quackletail",
    img: "./assets/rosie.jpeg",
  },
];

export const UserProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [loggedUser, setLoggedUser] = useState(userList[0]);

    const value = {
      loggedUser,
      userList,
      setLoggedUser,
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <UserContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </UserContext.Provider>
    );
    //@@viewOff:render
  },
});

export default UserProvider;
