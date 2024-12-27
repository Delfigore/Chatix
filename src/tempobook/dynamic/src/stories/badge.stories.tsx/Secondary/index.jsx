
            import { Secondary } from "./../../../../../../stories/badge.stories.tsx";

            const TempoComponent = () => {
              return Secondary.render(Secondary.args);
            }

            TempoComponent.getLayout = (page) => page;

            export default TempoComponent;