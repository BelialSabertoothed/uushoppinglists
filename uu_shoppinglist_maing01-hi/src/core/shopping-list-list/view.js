//@@viewOn:imports
import { Utils, createVisualComponent, useState, useRoute, useMemo, Lsi } from "uu5g05";
import Uu5Elements, { Modal } from "uu5g05-elements";
import { Form, FormText, SubmitButton } from "uu5g05-forms";

import { withRoute } from "uu_plus4u5g02-app";

import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";

import Tile from "./tile.js";

import { useUserContext } from "../user-list/user-context.js";
import { useShoppingListListContext } from "./shopping-list-list-context.js";

import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps
  render() {
    //@@viewOn:private
    const { loggedUser } = useUserContext();
    const { userShoppingList, handleCreate } = useShoppingListListContext();
    const [showOpenedOnly, setShowOpenedOnly] = useState(true);
    const [isCreateModalOpened, setIsCreateModalOpened] = useState();
    const [, setRoute] = useRoute();

    const filteredShoppingItemList = useMemo(() => {
      if (showOpenedOnly) {
        return userShoppingList.filter((shoppingList) => !shoppingList.archived);
      } else {
        return userShoppingList;
      }
    }, [userShoppingList, showOpenedOnly]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={filteredShoppingItemList || []}>
        <Uu5Elements.Block
          header={<Lsi import={importLsi} path={["List", "header"]} />}
          headerSeparator
          headerType={"title"}
          actionList={[
            {
              icon: "uugds-plus",
              onClick: () => setIsCreateModalOpened(true),
              className: Config.Css.css({
                color: "black",
                fontSize: "18px",  
              }),
            },
            {
              icon: showOpenedOnly ? "uugds-lock-closed" : "uugds-lock-open",
              children: showOpenedOnly ? <Lsi import={importLsi} path={["List", "buttonLabel"]} />:<Lsi import={importLsi} path={["List", "buttonLabel2"]} />,
              onClick: () => setShowOpenedOnly((current) => !current),
              className: Config.Css.css({
              backgroundColor: showOpenedOnly ? "#D9D9D9" : "rgba(9, 173, 234, 0.31)",
              color: "#5A5A5A",
              }),
            },
            { component: <Uu5TilesControls.SearchButton /> },
          ]}
          footer={<Uu5TilesControls.Counter />}
        >
          {isCreateModalOpened && (
            <Form.Provider
              onSubmit={(e) => {
                const id = Utils.String.generateId(4);
                handleCreate({ id, name: e.data.value.name, owner: loggedUser.id, memberList: [], itemList: [] });
                setIsCreateModalOpened(false);
                setRoute("shoppingListDetail", { id });
              }}
            >
              <Modal
                header={<Lsi import={importLsi} path={["List", "create"]} />}
                open={true}
                onClose={() => setIsCreateModalOpened(false)}
                footer={
                  <div style={{ float: "right" }}>
                    <SubmitButton />
                  </div>
                }
              >
                <FormText label={<Lsi import={importLsi} path={["List", "inputLabel"]} />} name={"name"} required />
              </Modal>
            </Form.Provider>
          )}
          <Uu5TilesElements.Grid tileMinWidth={300} tileMaxWidth={400}>
            {Tile}
          </Uu5TilesElements.Grid>
        </Uu5Elements.Block>
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

View = withRoute(View, { authenticated: true });

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
