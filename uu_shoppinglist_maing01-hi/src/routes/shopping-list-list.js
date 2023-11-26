import { Utils, createVisualComponent } from "uu5g05";
import { RouteController, withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import PositionBar from "../core/position-bar.js";
import ListView from "../core/shopping-list-list/view.js"; 
import ListProvider from "../core/shopping-list-list/shopping-list-list-provider.js";

let ShoppingListList = createVisualComponent({
  uu5Tag: Config.TAG + "ShoppingListList",

  propTypes: {},

  defaultProps: {},

  render(props) {
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
         <PositionBar />
        <ListProvider>
        {(shoppinglistDataList) => (
           <RouteController routeDataObject={shoppinglistDataList}>
           <div className={Config.Css.css({ padding: "16px 32px" })}>
          <ListView shoppinglistDataList={shoppinglistDataList}/> 
        </div>
        </RouteController>
          )}
        </ListProvider>
      </div>
    );
  },
});

ShoppingListList = withRoute(ShoppingListList, { authenticated: true });
export { ShoppingListList };
export default ShoppingListList;