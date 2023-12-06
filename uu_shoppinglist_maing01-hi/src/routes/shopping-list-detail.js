import { Utils, createVisualComponent, useRoute } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import PositionBar from "../core/position-bar.js";
import DetailView from "../core/shopping-list-detail/view.js";


let ShoppingListDetail = createVisualComponent({
  uu5Tag: Config.TAG + "ShoppingListDetail",

  propTypes: {},

  defaultProps: {},

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <PositionBar />
        <div className={Config.Css.css({ padding: "16px 32px" })}>
          <DetailView />
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

ShoppingListDetail = withRoute(ShoppingListDetail, { authenticated: true });

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports