import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef } from "react";

const CommentsModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isCommenting } =
    usePostComment();
  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    await handlePostComment(
      post.id,
      commentRef.current.value
    );
    commentRef.current.value = "";
  };

  useEffect(() => {
    const animateScroll = () => {
      const container = commentsContainerRef.current;
      const scrollHeight = container.scrollHeight;
      const start = container.scrollTop;
      const end = scrollHeight - container.clientHeight;
      const duration = 400; // アニメーションの時間（ミリ秒）

      let startTime = null;

      const easeOut = (t) => {
        return t * (2  - t);
      };

      const scrollStep = (currentTime) => {
        if (!startTime) {
          startTime = currentTime;
        }
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(1, elapsedTime / duration); // スクロール進行度（0から1の間）
        const easedProgress = easeOut(scrollProgress); // イージング関数を適用
        const scrollTo = start + (end - start) * easedProgress;
        container.scrollTop = scrollTo;

        if (elapsedTime < duration) {
          requestAnimationFrame(scrollStep); // 次のフレームでアニメーションを続行
        }
      };

      requestAnimationFrame(scrollStep); // 最初のフレームでアニメーションを開始
    };
    setTimeout((isOpen) => {
      animateScroll();
      
    }, 200);

  }, [isOpen, commentsContainerRef, post.comments.length]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInLeft"
    >
      <ModalOverlay />
      <ModalContent
        bg={"black"}
        border={"1px solid gray"}
        maxW={"400px"}
      >
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            ref={commentsContainerRef}
          >
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <form
            style={{ marginTop: "2rem" }}
            onSubmit={handleSubmitComment}
          >
            <Input
              placeholder="Comment"
              size={"sm"}
              ref={commentRef}
            />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default CommentsModal;
