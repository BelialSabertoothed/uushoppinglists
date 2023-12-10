//@@viewOn:imports
import { createVisualComponent, useScreenSize, useRoute, useMemo, Lsi} from "uu5g05";
import { Grid, PlaceholderBox } from "uu5g05-elements";

import { useShoppingListListContext } from "../shopping-list-list/shopping-list-list-context.js";
import { useUserContext } from "../user-list/user-context.js";

import ItemList from "./item-list.js";
//import PieChart from "./pie-chart.js";

import Config from "./config/config.js";
import MemberList from "./member-list.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
// TODO work 1h 45min
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { data: {} },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [screenSize] = useScreenSize();
    const [route] = useRoute();
    const detailId = route.params.id;
    const { shoppingListList, handleUpdate, handleToggleState, handleDelete } = useShoppingListListContext();
    const { loggedUser } = useUserContext();

  

    const shoppingListDetail = useMemo(() => {
      return shoppingListList.find((shoppingList) => {
        return shoppingList.id === detailId;
      });
    }, [shoppingListList, detailId]);

    const isOwner = loggedUser.id === shoppingListDetail?.owner;
    const isMember =
      loggedUser.id === shoppingListDetail?.owner || shoppingListDetail?.memberList?.includes(loggedUser.id);


    //@@viewOff:private

    //@@viewOn:render
    return (
      <div style={{ margin: '0 auto', maxWidth: '1800px', padding: '0 20px' }}>

        {!shoppingListDetail && (
          <PlaceholderBox code={"forbidden"} header={ <Lsi import={importLsi} path={["Detail", "warning"]} />} />
        )}
        {shoppingListDetail && !isMember && (
          <PlaceholderBox code={"permission"} header={<Lsi import={importLsi} path={["Detail", "warning2"]} />} />
        )}
        {shoppingListDetail && isMember && (
          <Grid templateColumns={["xs", "s"].includes(screenSize) ? "100%" : "60% 40%"}>
            <ItemList
              {...{
                loggedUser,
                isOwner,
                shoppingListDetail,
                handleUpdate,
                handleToggleState,
                handleDelete,
              }}
            />
            <MemberList {...{ loggedUser, isOwner, shoppingListDetail, handleUpdate }} />
          </Grid>
        )}
      </div>
      
    );
    //<PieChart/>
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
