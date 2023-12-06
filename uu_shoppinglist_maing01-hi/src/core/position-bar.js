//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute, useAppBackground } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5App from "uu_plus4u5g02-app";

import { useUserContext } from "./user-list/user-context.js";
import User from "../bricks/user.js";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

function useDarkMode() {
  const [background, setBackground] = useAppBackground();
  const darkMode = background === "dark";

  const toggleDarkMode = () => {
    setBackground({
      backgroundColor: darkMode
        ? null
        : Uu5Elements.UuGds.ColorPalette.getValue(["building", "dark", "main"]),
    });
  };

  return { darkMode, toggleDarkMode };
}

function getUserItemList({ userList, setLoggedUser }) {
  return userList.map((user) => ({
    children: <User img={user.img} name={user.name} />,
    onClick: () => setLoggedUser(user),
  }));
}

function PositionBar(props) {
  const { userList, loggedUser, setLoggedUser } = useUserContext();
  const [, setRoute] = useRoute();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const renderDarkModeToggle = () => {
    return (
      <Uu5Elements.Toggle
        value={!darkMode}
        onChange={() => toggleDarkMode()}
        iconOff="uugdsstencil-weather-moon"
        iconOn="uugdsstencil-home-lightbulb-glow"
      />
    );
  };
  <Uu5Elements.LanguageSelector labelType="flag-code" />
  const isSmallScreen = props.responsive === "xs" || props.responsive === "s";
  
  const actionList = [
    {
      children: renderDarkModeToggle(),
    },
    {
      children: <Uu5Elements.Icon icon="uugds-home" size= "M" />,
      onClick: () => setRoute("shoppingListList"),
      collapsed: false,
    },
    {
      children: isSmallScreen ? <User img={loggedUser.img} /> : <User img={loggedUser.img} name={loggedUser.name} />,
      colorScheme: "primary",
      significance: "highlighted",
      itemList: getUserItemList({ userList, setLoggedUser }),
      collapsed: false,
    },
  ];
  if (isSmallScreen) {
    actionList.splice(1, 1);
  }
  return (
    <Plus4U5App.PositionBar view={"short"} actionList={actionList} {...props}>
      uuList
    </Plus4U5App.PositionBar>
  );
}

//@@viewOn:exports
export { PositionBar };
export default PositionBar;
//@@viewOff:exports
