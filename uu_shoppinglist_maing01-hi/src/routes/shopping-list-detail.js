import { Utils, createVisualComponent, useRoute } from "uu5g05";
import { withRoute, RouteController } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import PositionBar from "../core/position-bar.js";
import DetailView from "../core/shopping-list-detail/view.js";
import DetailProvider from "../core/shopping-list-detail/list-detail-provider.js";

let ShoppingListDetail = createVisualComponent({
  uu5Tag: Config.TAG + "ShoppingListDetail",

  propTypes: {},

  defaultProps: {},

  render(props) {
    const [route, setRoute] = useRoute();
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <PositionBar />
        <DetailProvider>
        {(detailDataList) => (
        <RouteController routeDataObject={detailDataList}>
        <div className={Config.Css.css({ padding: "16px 32px" })}>
          <DetailView detailDataList={detailDataList}/>
        </div>
        </RouteController>
        )}
        </DetailProvider>
      </div>
    );
  },
});

ShoppingListDetail = withRoute(ShoppingListDetail, { authenticated: true });
export { ShoppingListDetail };
export default ShoppingListDetail;