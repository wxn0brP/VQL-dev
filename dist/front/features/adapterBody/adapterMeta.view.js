import $store from "../../store.js";
class AdapterMetaView {
    element;
    render(adapter) {
        this.element.innerHTML =
            Object.entries(adapter)
                .map(([key, value]) => `<p><strong>${key}</strong>: ${value}</p>`)
                .join("");
    }
    mount() {
        this.element = document.querySelector("#adapter-meta");
        $store.selectedAdapter.subscribe((adapterId) => {
            const adapter = $store.adapters.get().find((adapter) => adapter.logic_id === adapterId);
            if (!adapter)
                return console.warn(`Adapter ${adapterId} not found`);
            this.render(adapter);
        });
    }
}
const adapterMetaView = new AdapterMetaView();
export default adapterMetaView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlck1ldGEudmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mcm9udC9mZWF0dXJlcy9hZGFwdGVyQm9keS9hZGFwdGVyTWV0YS52aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUk3QixNQUFNLGVBQWU7SUFDakIsT0FBTyxDQUFpQjtJQUV4QixNQUFNLENBQUMsT0FBMkI7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO1lBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2lCQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsY0FBYyxHQUFHLGNBQWMsS0FBSyxNQUFNLENBQUM7aUJBQ2pFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV2RCxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxPQUFPO2dCQUFFLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLFNBQVMsWUFBWSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQUVELE1BQU0sZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7QUFDOUMsZUFBZSxlQUFlLENBQUMifQ==