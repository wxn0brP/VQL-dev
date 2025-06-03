import $store from "../../store.js";
import { createComponent } from "@wxn0brp/flanker-ui";
export const adapterCollectionsView = (element, adapterId) => {
    return createComponent({
        selector: element,
        data: {
            adapterId
        },
        autoLoad: [
            `<button data-collection="{{}}" data-click="collection">{{}}</button>`,
            `${adapterId} getCollections`
        ],
        events: {
            collection({ collection }) {
                $store.selectedAdapter.set(adapterId);
                $store.selectedCollection.set(collection);
            }
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlckNvbGxlY3Rpb25zLnZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZnJvbnQvZmVhdHVyZXMvYWRhcHRlcnNMaXN0L2FkYXB0ZXJDb2xsZWN0aW9ucy52aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEQsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxPQUF1QixFQUFFLFNBQWlCLEVBQUUsRUFBRTtJQUNqRixPQUFPLGVBQWUsQ0FBQztRQUNuQixRQUFRLEVBQUUsT0FBTztRQUNqQixJQUFJLEVBQUU7WUFDRixTQUFTO1NBQ1o7UUFDRCxRQUFRLEVBQUU7WUFDTixzRUFBc0U7WUFDdEUsR0FBRyxTQUFTLGlCQUFpQjtTQUNoQztRQUNELE1BQU0sRUFBRTtZQUNKLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRTtnQkFDckIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUMsQ0FBQztTQUNKO0tBQ0osQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIn0=