import $store from "../../store.js";
import { createComponent } from "@wxn0brp/flanker-ui";
import { formatUnifiedTypes } from "./helpers.js";
export const adapterStructureView = createComponent({
    selector: "#adapter-structure-content",
    autoLoad: [
        `{{#each data}}<div><b>{{0}}:</b> <span>{{1}}</span></div>{{/each}}`,
        {
            query: (limit = 10) => $store.selectedAdapter.get() + " " + $store.selectedCollection.get() + " o.max = " + limit,
            transform: (data) => ({ data: Object.entries(formatUnifiedTypes(data, true)) })
        }
    ]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlclN0cnVjdHVyZS52aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Zyb250L2ZlYXR1cmVzL2FkYXB0ZXJCb2R5L2FkYXB0ZXJTdHJ1Y3R1cmUudmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUvQyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQUM7SUFDaEQsUUFBUSxFQUFFLDRCQUE0QjtJQUN0QyxRQUFRLEVBQUU7UUFDTixvRUFBb0U7UUFDcEU7WUFDSSxLQUFLLEVBQUUsQ0FBQyxRQUFnQixFQUFFLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxXQUFXLEdBQUcsS0FBSztZQUN6SCxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ2xGO0tBQ0o7Q0FDSixDQUFDLENBQUMifQ==