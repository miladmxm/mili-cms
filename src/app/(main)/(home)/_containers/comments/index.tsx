import CommentCarusel from "@/components/ui/commentCarusel";
import H3 from "@/components/ui/h2";

import CommentsBackground from "./commentsBackground";

const Comments = () => {
  return (
    <section className="py-14 md:py-22">
      <CommentsBackground>
        <div className="container">
          <H3>نظرات</H3>
          <CommentCarusel />
        </div>
      </CommentsBackground>
    </section>
  );
};

export default Comments;
