import Image from "next/image";

const Avatar = ({ imageUrl }: { imageUrl: string }) => {
	return (
		<Image
			src={imageUrl ? imageUrl : "/images/users/man.png"}
			alt="user-avatar"
			width={40}
			height={40}
			className="object-cover aspect-square object-center rounded-full"
		/>
	);
};

export default Avatar;
