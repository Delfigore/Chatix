
            import { Base } from "./../../../../../../stories/alert-dialog.stories.tsx";

            const TempoComponent = () => {
              return Base.render(Base.args);
            }

            TempoComponent.getLayout = (page) => page;

            export default TempoComponent;