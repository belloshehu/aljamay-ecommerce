import AwesomeSlider from "react-awesome-slider";
// @ts-expect-error it is a type error
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
const AutoplaySlider = withAutoplay(AwesomeSlider);

export default function Slider() {
	return (
		<div className="w-full shadow-2xl">
			<AutoplaySlider
				play={true}
				cancelOnInteraction={false} // should stop playing on user interaction
				interval={2000}
				animation="foldOutAnimation"
				media={[
					{
						source: "/images/bakery.jpg",
					},
					{
						source: "/images/spices.jpg",
					},
				]}
			/>
		</div>
	);
}
