import "./inputTags.css"
import React from "react"

const TagsInput = (props) => {
	const removeTags = indexToRemove => {
		props.setTags([...props.tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value.trim() !== "") {
			props.setTags([...props.tags, event.target.value.trim()]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{props.tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyPress={(event) => event.key === " " ? addTags(event) : null}
				placeholder="Press the spacebar to add tags"
			/>
		</div>
	);
};
export default TagsInput;