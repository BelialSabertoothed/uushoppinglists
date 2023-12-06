//@@viewOn:imports
import React from "react";
import { createVisualComponent, useRoute, Lsi } from "uu5g05";
import { Grid, ListItem, Icon } from "uu5g05-elements";

import Uu5TilesElements from "uu5tilesg02-elements";

import User from "../../bricks/user.js";
import { useUserContext } from "../user-list/user-context.js";
import importLsi from "../../lsi/import-lsi.js";
import Config from "./config/config.js";
//@@viewOff:imports

const Tile = createVisualComponent({
  uu5Tag: "Tile",
  propTypes: {},
  defaultProps: {},
  render(props) {
    let { data, ...otherProps } = props;
    const { userList } = useUserContext();
    const [, setRoute] = useRoute();

    const owner = userList.find((user) => user.id === data.owner);
    const itemListCount = data.itemList?.length || 0;
    const checkedItemListCount = data.itemList.filter((item) => item.checked)?.length || 0;

    return (
      <Uu5TilesElements.Tile {...otherProps} headerOverlap>
        {({ padding }) => {
          return (
            <Grid
              className={Config.Css.css({
                backgroundColor: data.archived ? "#D9D9D9" : "rgba(9, 173, 234, 0.31)",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "8px",
                paddingTop: padding.top,
                paddingRight: padding.right,
                paddingBottom: padding.bottom,
                paddingLeft: padding.left,
                display: "grid",
                rowGap: "12px",
              })}
            >
              <div
                onClick={() => setRoute("shoppingListDetail", { id: data.id })}
                style={{ cursor: "pointer" }}
              >
                <ListItem
                  icon={data.archived ? "uugds-lock-closed" : "uugds-lock-open"}
                >
                  <strong>{data.name}</strong>
                </ListItem>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    margin: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <Icon icon={"uugdsstencil-shape-circle"} colorScheme={"negative"} />
                    {itemListCount - checkedItemListCount}
                    <div>/</div>
                    <Icon icon={"uugds-check-circle"} colorScheme={"positive"} />
                    {checkedItemListCount}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div style={{ fontStyle: "italic", color: "grey" }}> <Lsi import={importLsi} path={["List", "owner"]} /> </div>
                    <User img={owner.img} name={owner.name} />
                  </div>
                </div>
              </div>
            </Grid>
          );
        }}
      </Uu5TilesElements.Tile>
    );
  },
});

export default Tile;
