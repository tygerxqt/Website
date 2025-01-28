import {
	DefaultNodeTypes,
	SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import {
	JSXConvertersFunction,
	LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react";

type NodeTypes = DefaultNodeTypes;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	const { value, relationTo } = linkNode.fields.doc!;
	if (typeof value !== "object") {
		throw new Error("Expected value to be an object");
	}
	const slug = value.slug;
	return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

export const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters,
}) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
});
