import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Pen, Plus, Trash } from "lucide-react";
import Image from "next/image";
import ErrorText from "@/components/Error";

interface ImagesUploaderProps {
	className?: string;
	setImages: (images: ImageListType) => void;
	images: ImageListType;
	maxNumber: number;
	maxImageSize?: number;
	withRemoveAll?: boolean;
	withUpdate?: boolean;
	withRemove?: boolean;
	multiple?: boolean;
}

export function ImagesUploader({
	images,
	maxNumber,
	setImages,
	withRemove,
	withRemoveAll,
	withUpdate,
	maxImageSize,
	multiple,
}: ImagesUploaderProps) {
	const onChange = (imageList: ImageListType) => {
		// data for submit
		setImages(imageList);
	};

	return (
		<div className="App">
			<ImageUploading
				multiple={multiple}
				value={images}
				onChange={onChange}
				maxNumber={maxNumber}
				dataURLKey="data_url"
				maxFileSize={maxImageSize}
				allowNonImageType={true}
				acceptType={["jpg", "png", "jpeg", "webp"]}
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					dragProps,
					errors,
				}) => (
					// write your building UI
					<div className="upload__image-wrapper flex items-center justify-center">
						{(multiple || imageList.length === 0) && (
							<Button
								className={cn(
									"h-fit bg-gray-400 flex flex-col items-center justify-center  gap-2 animate-pulse w-fit",
									{
										isDragging: "text-red-600",
									}
								)}
								onClick={onImageUpload}
								{...dragProps}
							>
								{/* Click or Drop here */}
								<Plus size={24} />
							</Button>
						)}
						&nbsp;
						{imageList && imageList.length > 0 && withRemoveAll && (
							<Button variant={"ghost"} onClick={onImageRemoveAll}>
								Remove all images
							</Button>
						)}
						<div className="flex flex-wrap gap-2">
							{imageList.map((image, index) => (
								<div className="relative" key={index}>
									<Image
										src={image["data_url"]}
										alt=""
										width="60"
										height="60"
										className="rounded-md h-fit w-[60px]"
									/>
									{(withRemove || withUpdate) && (
										<div className="image-item__btn-wrapper absolute top-0 right-0 bg-blue-400/40 bg-opacity-10 w-full flex justify-around items-center">
											<Button
												variant={"ghost"}
												size={"icon"}
												className="bg-transparent text-white"
												onClick={() => onImageUpdate(index)}
											>
												<Pen size={20} />
											</Button>
											<Button
												variant={"ghost"}
												size={"icon"}
												className="bg-transparent text-white"
												onClick={() => onImageRemove(index)}
											>
												<Trash size={20} />
											</Button>
										</div>
									)}
								</div>
							))}
						</div>
						{/* errors */}
						{errors && (
							<div>
								{errors.maxNumber && (
									<ErrorText
										message={`Number of selected images exceed ${maxNumber}`}
									/>
								)}
								{errors.acceptType && (
									<ErrorText message="selected file type is not allow" />
								)}
								{errors.maxFileSize && maxImageSize && (
									<ErrorText
										message={`Selected file size exceeds ${
											maxImageSize / 10000000
										} MB`}
									/>
								)}
								{errors.resolution && (
									<ErrorText message="Selected file is not match resolution" />
								)}
							</div>
						)}
					</div>
				)}
			</ImageUploading>
		</div>
	);
}
