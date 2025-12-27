"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";

interface MonitoredRenderContextType {
	happyNewYearCount: number; // number of times happy new year animation is rendered
	increaseHappyNewYearCount: () => void;
}
const MonitoredRenderContext = createContext<MonitoredRenderContextType | null>(
	null
);

interface MonitoredRenderProviderProps {
	children: ReactNode;
}
export function MonitoredRenderProvider({
	children,
}: MonitoredRenderProviderProps) {
	const [happyNewYearCount, setHappyNewYearCount] = useState(0);

	const increaseHappyNewYearCount = useCallback(() => {
		const newValue = happyNewYearCount + 1;
		setHappyNewYearCount(newValue);
	}, [happyNewYearCount]);

	return (
		<MonitoredRenderContext.Provider
			value={{ happyNewYearCount, increaseHappyNewYearCount }}
		>
			{children}
		</MonitoredRenderContext.Provider>
	);
}

export const useMonitoredRender = () => {
	const context = useContext(MonitoredRenderContext);
	if (!context)
		throw new Error(
			"useMonitoredRender must be used inside the MonitoredRenderProvider"
		);
	return context as MonitoredRenderContextType;
};
