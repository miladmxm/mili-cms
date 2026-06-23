import AddComment, {
  OpenCommentDialog,
} from "@/features/product/components/comments/addComment";

const ProductComments = ({ productId }: { productId: string }) => {
  return (
    <AddComment productId={productId}>
      <OpenCommentDialog />
    </AddComment>
  );
};

export default ProductComments;
