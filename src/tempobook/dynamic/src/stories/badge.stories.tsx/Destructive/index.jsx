
            import { Destructive } from "./../../../../../../stories/badge.stories.tsx";

            const TempoComponent = () => {
              return Destructive.render(Destructive.args);
            }

            TempoComponent.getLayout = (page) => page;

            export default TempoComponent;