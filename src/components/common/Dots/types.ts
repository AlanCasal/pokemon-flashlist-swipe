export type DotsPosition = {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
};

export type DotsProps = {
	position?: DotsPosition;
	size?: number;
	color?: string;
	opacity?: number;
	testID?: string;
};
