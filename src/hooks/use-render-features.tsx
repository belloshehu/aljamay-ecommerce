/*
Hook to determine if centained features should be rendered.
This hook takes an array of visible features, an array of hidden features, and a condition.
Array of visible features are features that should be rendered when the condition is true.
Array of hidden features are features that should be rendered when the condition is false.
*/

const useRenderFeatures = (
	visibleFeatures: string[],
	hiddenFeatures: string[],
	condition: boolean
) => {
	// Check if features is an array and condition is a boolean
	const enabledFeatures: any = {};
	const disabledFeatures: any = {};
	visibleFeatures.forEach((feature) => {
		enabledFeatures[feature] = condition;
	});
	// anything in the hiddenFeatures array with value of true will be disabled
	hiddenFeatures.forEach((feature) => {
		disabledFeatures[feature] = condition;
	});

	return {
		enabledFeatures,
		disabledFeatures,
	};
};
export default useRenderFeatures;
