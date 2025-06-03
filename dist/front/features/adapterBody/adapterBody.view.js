import { uiHelpers } from "@wxn0brp/flanker-ui";
import "./adapter.scss";
import { adapterStructureView } from "./adapterStructure.view.js";
import $store from "../../store.js";
class AdapterBodyView {
    element;
    constructor() { }
    mount() {
        this.element = document.querySelector("#adapter-body");
        adapterStructureView.mount();
        $store.selectedCollection.subscribe(() => adapterStructureView.load());
        uiHelpers.storeHide(this.element.querySelector("#adapter-structure"), $store.selectedCollection);
    }
}
const adapterBodyView = new AdapterBodyView();
export default adapterBodyView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlckJvZHkudmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mcm9udC9mZWF0dXJlcy9hZGFwdGVyQm9keS9hZGFwdGVyQm9keS52aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3RCxPQUFPLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUU3QixNQUFNLGVBQWU7SUFDakIsT0FBTyxDQUFpQjtJQUV4QixnQkFBZ0IsQ0FBQztJQUVqQixLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZELG9CQUFvQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2RSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDckcsQ0FBQztDQUNKO0FBRUQsTUFBTSxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUM5QyxlQUFlLGVBQWUsQ0FBQyJ9