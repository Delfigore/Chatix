
            import { Base } from "./../../../../../../stories/avatar.stories.tsx";

            const TempoComponent = () => {
              return Base.render(Base.args);
            }

            TempoComponent.getLayout = (page) => page;

            export default TempoComponent;